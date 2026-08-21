import assert from "node:assert/strict"
import test from "node:test"

import {
    HttpRequester,
    UserClient,
    UsosApiError,
    UsosAuthenticationError,
    UsosClient,
    UsosNetworkError,
    attendanceEndpoints,
} from '@'
import type { EndpointDefinition } from '@'

const jsonEndpoint = {
    path: "services/testing/json",
    method: "GET",
    response: "json",
    auth: {
        consumer: "ignored",
        token: "ignored",
        sslRequired: false,
    },
} satisfies EndpointDefinition<undefined, { value: string }>

function createAnonymousRequester(
    fetch: typeof globalThis.fetch,
    timeoutMs?: number,
): HttpRequester<{ kind: "anonymous" }> {
    return new HttpRequester({
        baseUrl: "https://apps.usos.uj.edu.pl",
        auth: { kind: "anonymous" },
        fetch,
        timeoutMs,
    })
}

test("Requester decodes binary service responses without text conversion", async () => {
    const expected = Uint8Array.from([0x25, 0x50, 0x44, 0x46])
    const client = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        fetch: (async (_input, init) => {
            assert.equal(new Headers(init?.headers).get("Accept"), "*/*")
            return new Response(expected, { status: 200 })
        }) as typeof globalThis.fetch,
    })

    const result = await client.fac.getFactsheet("UJ")
    assert.deepEqual(new Uint8Array(result), expected)
})

test("Requester explicitly requests and decodes successful JSON responses", async () => {
    const requester = createAnonymousRequester((async (_input, init) => {
        assert.equal(new Headers(init?.headers).get("Accept"), "application/json")
        return new Response(JSON.stringify({ value: "ok" }), { status: 200 })
    }) as typeof globalThis.fetch)

    assert.deepEqual(await requester.request(jsonEndpoint), { value: "ok" })
})

test("Requester preserves raw and structured USOS API error responses", async () => {
    const jsonBody = JSON.stringify({ message: "invalid request", code: "bad_request" })
    const jsonRequester = createAnonymousRequester((async () => {
        return new Response(jsonBody, {
            status: 400,
            headers: { "content-type": "application/json" },
        })
    }) as typeof globalThis.fetch)

    await assert.rejects(
        () => jsonRequester.request(jsonEndpoint),
        (error: unknown) => {
            assert.ok(error instanceof UsosApiError)
            assert.equal(error.status, 400)
            assert.equal(error.endpoint, jsonEndpoint.path)
            assert.equal(error.responseBody, jsonBody)
            assert.deepEqual(error.responseJson, {
                message: "invalid request",
                code: "bad_request",
            })
            return true
        },
    )

    const textRequester = createAnonymousRequester((async () => {
        return new Response("Service unavailable", { status: 503 })
    }) as typeof globalThis.fetch)

    await assert.rejects(
        () => textRequester.request(jsonEndpoint),
        (error: unknown) => {
            assert.ok(error instanceof UsosApiError)
            assert.equal(error.status, 503)
            assert.equal(error.responseBody, "Service unavailable")
            assert.equal(error.responseJson, undefined)
            return true
        },
    )
})

test("Requester distinguishes cancellation, timeout, and network failures", async () => {
    const cancellation = new AbortController()
    let receivedSignal: AbortSignal | null | undefined
    const cancellableRequester = createAnonymousRequester(((_input, init) => {
        receivedSignal = init?.signal
        return new Promise<Response>((_resolve, reject) => {
            receivedSignal?.addEventListener("abort", () => {
                reject(new DOMException("Request cancelled", "AbortError"))
            }, { once: true })
        })
    }) as typeof globalThis.fetch)

    const cancelledRequest = cancellableRequester.request(jsonEndpoint, {
        signal: cancellation.signal,
    })
    assert.ok(receivedSignal)
    cancellation.abort()

    await assert.rejects(
        () => cancelledRequest,
        (error: unknown) => {
            assert.ok(error instanceof UsosNetworkError)
            assert.equal(error.kind, "aborted")
            assert.equal(error.endpoint, jsonEndpoint.path)
            return true
        },
    )

    const client = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        timeoutMs: 10,
        fetch: ((_input, init) => {
            return new Promise<Response>((_resolve, reject) => {
                init?.signal?.addEventListener("abort", () => {
                    reject(new DOMException("Request timed out", "AbortError"))
                }, { once: true })
            })
        }) as typeof globalThis.fetch,
    })

    await assert.rejects(
        () => client.apisrv.getNow(),
        (error: unknown) => {
            assert.ok(error instanceof UsosNetworkError)
            assert.equal(error.kind, "timeout")
            return true
        },
    )

    const networkFailure = new TypeError("connection reset")
    const networkRequester = createAnonymousRequester((async () => {
        throw networkFailure
    }) as typeof globalThis.fetch)

    await assert.rejects(
        () => networkRequester.request(jsonEndpoint),
        (error: unknown) => {
            assert.ok(error instanceof UsosNetworkError)
            assert.equal(error.kind, "network")
            assert.equal(error.originalError, networkFailure)
            return true
        },
    )
})

test("Requester omits a User token from token-ignored endpoints", async () => {
    const calls: Array<{ path: string; authorization: string | null }> = []
    const fetchImplementation = (async (input, init) => {
        const url = new URL(String(input))
        calls.push({
            path: url.pathname,
            authorization: new Headers(init?.headers).get("Authorization"),
        })

        if (url.pathname.endsWith("/request_token")) {
            return new Response(
                "oauth_token=request&oauth_token_secret=secret&oauth_callback_confirmed=true",
                { status: 200 },
            )
        }

        return new Response("{}", { status: 200 })
    }) as typeof globalThis.fetch

    const user = new UserClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        fetch: fetchImplementation,
        consumer: {
            key: "consumer-key",
            secret: "consumer-secret",
        },
        accessToken: {
            token: "access-token",
            secret: "access-secret",
        },
    })

    await user.oauth.getRequestToken("https://example.com/callback")
    await user.attendance.getAttendanceList(42)

    assert.match(calls[0]?.authorization ?? "", /oauth_consumer_key/)
    assert.doesNotMatch(calls[0]?.authorization ?? "", /oauth_token=/)
    assert.match(calls[1]?.authorization ?? "", /oauth_token=/)
})

test("Requester enforces credentials, HTTPS, and structured API errors", async () => {
    let fetchCalls = 0
    const fetchImplementation = (async () => {
        fetchCalls += 1
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }) as typeof globalThis.fetch

    const anonymous = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        fetch: fetchImplementation,
    })

    await assert.rejects(
        () => anonymous.oauth.getRequestToken("https://example.com/callback"),
        UsosAuthenticationError,
    )
    assert.equal(fetchCalls, 0)

    const user = new UserClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        fetch: fetchImplementation,
        consumer: { key: "consumer", secret: "secret" },
        accessToken: { token: "token", secret: "secret" },
    })

    await assert.rejects(
        () => user.attendance.getAttendanceList(42),
        (error: unknown) => {
            assert.ok(error instanceof UsosApiError)
            assert.equal(error.status, 400)
            assert.equal(error.endpoint, attendanceEndpoints.attendanceList.path)
            return true
        },
    )

    const insecure = new UserClient({
        baseUrl: "http://apps.usos.uj.edu.pl",
        fetch: fetchImplementation,
        consumer: { key: "consumer", secret: "secret" },
        accessToken: { token: "token", secret: "secret" },
    })

    await assert.rejects(
        () => insecure.attendance.getAttendanceList(42),
        /requires HTTPS/,
    )
})
