import assert from "node:assert/strict"
import test from "node:test"

import { OAuthService, attendanceEndpoints, oauthEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor"

test("OAuth maps token flows, proxy typing, and revocation", async () => {
    const request = new MockRequestExecutor()
    request.responses.set("services/oauth/request_token", {
        oauth_token: "request-token",
        oauth_token_secret: "request-secret",
        oauth_callback_confirmed: "true",
    })
    request.responses.set("services/oauth/access_token", {
        oauth_token: "access-token",
        oauth_token_secret: "access-secret",
    })
    request.responses.set("services/oauth/proxy", { id: 42, mode: "remote" })
    request.responses.set("services/oauth/revoke_token", { success: true })
    request.responses.set("services/oauth/revoke_consumer_key", { success: true })

    const oauth = new OAuthService(request)
    const requestToken = await oauth.getRequestToken(
        "https://example.com/callback",
        ["staff_perspective"],
    )
    const authorizeUrl = oauth.getAuthorizeUrl(requestToken.oauth_token, "confirm_user")
    const accessToken = await oauth.getAccessToken(
        requestToken.oauth_token,
        requestToken.oauth_token_secret,
        "verifier",
    )
    const proxied = await oauth.proxy(attendanceEndpoints.attendanceList, {
        parameters: {
            list_id: 42,
            fields: ["id", "mode"],
        },
        scopes: ["staff_perspective"],
        accessToken: {
            token: accessToken.oauth_token,
            secret: accessToken.oauth_token_secret,
        },
    })
    await oauth.revokeToken(false, {
        token: accessToken.oauth_token,
        secret: accessToken.oauth_token_secret,
    })
    await oauth.revokeConsumerKey({ callback: "callback" })

    assert.equal(requestToken.oauth_callback_confirmed, true)
    assert.equal(
        authorizeUrl,
        "https://apps.usos.uj.edu.pl/services/oauth/authorize?oauth_token=request-token&interactivity=confirm_user",
    )
    assert.deepEqual(proxied, { id: 42, mode: "remote" })

    const proxyCall = request.calls.find(call => call.path === oauthEndpoints.proxy.path)
    assert.deepEqual(proxyCall?.params, {
        method: attendanceEndpoints.attendanceList.path,
        parameters: JSON.stringify({
            list_id: "42",
            fields: "id|mode",
        }),
        scopes: "staff_perspective",
        as_user_id: undefined,
    })
})
