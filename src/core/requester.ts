import type { AccessTokenCredentials, AuthContext } from '@/core/auth'
import type { EndpointDefinition } from '@/core/endpoint'
import { UsosApiError, UsosAuthenticationError, UsosConfigurationError } from '@/core/errors'
import { serializeParameters, type RequestParameters } from '@/core/params'
import { OAuth1Signer } from '@/core/oauth1Signer'

export interface RequestOptions<Params> {
    params?: Params
    headers?: HeadersInit
    // Used for Token Exchange process
    token?: AccessTokenCredentials
    oauthCallback?: string
}

export interface RequesterOptions<Auth extends AuthContext> {
    baseUrl: string | URL
    auth: Auth
    fetch?: typeof globalThis.fetch
}

export interface RequestExecutor {
    readonly baseUrl: URL

    request<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        options?: RequestOptions<Params>,
    ): Promise<Result>
}

export class HttpRequester<Auth extends AuthContext> implements RequestExecutor {
    public readonly baseUrl: URL

    private readonly auth: Auth
    private readonly fetchImplementation: typeof globalThis.fetch
    private readonly signer = new OAuth1Signer()

    public constructor(options: RequesterOptions<Auth>) {
        this.baseUrl = new URL(options.baseUrl)
        this.auth = options.auth
        this.fetchImplementation = options.fetch ?? globalThis.fetch
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

        const response = await this.fetchImplementation(url, {
            method: endpoint.method,
            headers,
        })

        if (!response.ok) {
            const body = await response.text()
            throw new UsosApiError(
                `${endpoint.method} ${endpoint.path} failed`,
                response.status,
                endpoint.path,
                body,
            )
        }

        if (endpoint.response === "arrayBuffer") {
            return await response.arrayBuffer() as Result
        }

        const body = await response.text()
        return this.decodeResponse(endpoint, body)
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
}
