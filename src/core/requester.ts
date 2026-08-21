import type { AccessTokenCredentials, AuthContext } from '@/core/auth'
import type { EndpointDefinition } from '@/core/endpoint'
import {
    UsosApiError,
    UsosAuthenticationError,
    UsosConfigurationError,
    UsosError,
    UsosNetworkError,
} from '@/core/errors'
import { serializeParameters, type RequestParameters } from '@/core/params'
import { OAuth1Signer } from '@/core/oauth1Signer'

export interface RequestOptions<Params> {
    params?: Params
    headers?: HeadersInit
    /** Cancels this individual request without affecting other client requests. */
    signal?: AbortSignal
    /** Overrides the client's request timeout for this individual request. */
    timeoutMs?: number
    // Used for Token Exchange process
    token?: AccessTokenCredentials
    oauthCallback?: string
}

export interface RequesterOptions<Auth extends AuthContext> {
    baseUrl: string | URL
    auth: Auth
    fetch?: typeof globalThis.fetch
    /** Default timeout for every request made by this requester. */
    timeoutMs?: number
}

export interface RequestExecutor {
    readonly baseUrl: URL

    request<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        options?: RequestOptions<Params>,
    ): Promise<Result>
}

interface RequestAbortState {
    signal?: AbortSignal
    isAborted(): boolean
    isTimedOut(): boolean
    cleanup(): void
}

export class HttpRequester<Auth extends AuthContext> implements RequestExecutor {
    public readonly baseUrl: URL

    private readonly auth: Auth
    private readonly fetchImplementation: typeof globalThis.fetch
    private readonly timeoutMs?: number
    private readonly signer = new OAuth1Signer()

    public constructor(options: RequesterOptions<Auth>) {
        this.baseUrl = new URL(options.baseUrl)
        this.auth = options.auth
        this.fetchImplementation = options.fetch ?? globalThis.fetch
        this.assertTimeout(options.timeoutMs)
        this.timeoutMs = options.timeoutMs
    }

    public async request<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        options: RequestOptions<Params> = {},
    ): Promise<Result> {
        this.assertRequirements(endpoint, options)
        const url = new URL(endpoint.path, this.baseUrl)
        const parameters = serializeParameters((options.params ?? {}) as RequestParameters)

        for (const [key, value] of parameters) {
            url.searchParams.append(key, value)
        }

        const headers = new Headers(options.headers)
        headers.set(
            "Accept",
            endpoint.response === "json"
                ? "application/json"
                : endpoint.response === "arrayBuffer"
                    ? "*/*"
                    : "text/plain",
        )
        const shouldSign = endpoint.auth.consumer !== "ignored" && this.auth.kind !== "anonymous"

        if (shouldSign) {
            const token = endpoint.auth.token === "ignored" ? undefined : options.token
            headers.set("Authorization", this.signer.createHeader(this.auth, { 
                token, 
                callback: options.oauthCallback,
                useContextToken: endpoint.auth.token !== "ignored",
            }))
        }

        const abortState = this.createAbortState(options)

        try {
            const response = await this.fetchImplementation(url, {
                method: endpoint.method,
                headers,
                signal: abortState.signal,
            })

            if (!response.ok) {
                const body = await response.text()
                throw new UsosApiError(
                    `${endpoint.method} ${endpoint.path} failed`,
                    response.status,
                    endpoint.path,
                    body,
                    this.parseJson(body),
                )
            }

            if (endpoint.response === "arrayBuffer") {
                return await response.arrayBuffer() as Result
            }

            const body = await response.text()
            return this.decodeResponse(endpoint, body)
        } catch (error) {
            if (error instanceof UsosError) {
                throw error
            }

            // Successful JSON responses should continue to surface malformed JSON directly.
            if (error instanceof SyntaxError && !abortState.isAborted()) {
                throw error
            }

            throw this.createNetworkError(endpoint, abortState, error)
        } finally {
            abortState.cleanup()
        }
    }

    private assertRequirements<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        options: RequestOptions<Params>
    ): void {
        if (endpoint.auth.sslRequired && this.baseUrl.protocol !== "https:") {
            throw new UsosConfigurationError(`${endpoint.path} requires HTTPS`)
        }

        if (endpoint.auth.consumer === "required" && this.auth.kind === "anonymous") {
            throw new UsosAuthenticationError(`${endpoint.path} requires Consumer credentials`)
        }

        if (endpoint.auth.administrativeOnly && this.auth.kind !== "admin") {
            throw new UsosAuthenticationError(`${endpoint.path} requires an Administrative Consumer`)
        }

        const hasToken = options.token !== undefined || this.auth.kind === "user"

        if (endpoint.auth.token === "required" && !hasToken) {
            throw new UsosAuthenticationError(`${endpoint.path} requires an Access Token`)
        }
    }

    private decodeResponse<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        body: string,
    ): Result {
        switch (endpoint.response) {
            case "text":
                return body as Result

            case "form":
                return Object.fromEntries(new URLSearchParams(body)) as Result

            case "json":
                return (body.length === 0 ? undefined : JSON.parse(body)) as Result

            case "arrayBuffer":
                throw new UsosConfigurationError(
                    `${endpoint.path} binary response was decoded as text`,
                )
        }
    }

    private createAbortState<Params>(options: RequestOptions<Params>): RequestAbortState {
        const timeoutMs = options.timeoutMs ?? this.timeoutMs
        this.assertTimeout(timeoutMs)

        if (options.signal === undefined && timeoutMs === undefined) {
            return {
                isAborted: () => false,
                isTimedOut: () => false,
                cleanup: () => {},
            }
        }

        const controller = new AbortController()
        let timedOut = false
        let timeout: ReturnType<typeof setTimeout> | undefined

        const abortFromCaller = (): void => {
            controller.abort(options.signal?.reason)
        }

        if (options.signal?.aborted) {
            abortFromCaller()
        } else {
            options.signal?.addEventListener("abort", abortFromCaller, { once: true })
        }

        if (timeoutMs !== undefined) {
            timeout = setTimeout(() => {
                timedOut = true
                controller.abort()
            }, timeoutMs)
        }

        return {
            signal: controller.signal,
            isAborted: () => controller.signal.aborted,
            isTimedOut: () => timedOut,
            cleanup: () => {
                if (timeout !== undefined) {
                    clearTimeout(timeout)
                }

                options.signal?.removeEventListener("abort", abortFromCaller)
            },
        }
    }

    private createNetworkError<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        abortState: RequestAbortState,
        originalError: unknown,
    ): UsosNetworkError {
        if (abortState.isTimedOut()) {
            return new UsosNetworkError(
                `${endpoint.method} ${endpoint.path} timed out`,
                endpoint.path,
                "timeout",
                originalError,
            )
        }

        if (abortState.isAborted()) {
            return new UsosNetworkError(
                `${endpoint.method} ${endpoint.path} was aborted`,
                endpoint.path,
                "aborted",
                originalError,
            )
        }

        return new UsosNetworkError(
            `${endpoint.method} ${endpoint.path} failed before a response was received`,
            endpoint.path,
            "network",
            originalError,
        )
    }

    private assertTimeout(timeoutMs: number | undefined): void {
        if (
            timeoutMs !== undefined
            && (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
        ) {
            throw new UsosConfigurationError("timeoutMs must be a positive, finite number")
        }
    }

    private parseJson(body: string): unknown | undefined {
        if (body.length === 0) {
            return undefined
        }

        try {
            return JSON.parse(body) as unknown
        } catch {
            return undefined
        }
    }
}
