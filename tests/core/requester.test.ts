import assert from "node:assert/strict"
import test from "node:test"

import {
    UserClient,
    UsosApiError,
    UsosAuthenticationError,
    UsosClient,
    attendanceEndpoints,
} from '@'

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
