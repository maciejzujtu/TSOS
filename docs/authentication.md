# Authentication

TSOS uses the OAuth 1.0a flow exposed by USOS. Keep Consumer Secrets and Access Token Secrets on a trusted server. A browser or mobile app should never contain a long-lived Consumer Secret.

## 1. Create a Consumer client

Register your application with the chosen USOS installation, then create a client with its Consumer credentials:

```ts
import { JAGIELLONIAN_UNIVERSITY, UsosClient } from "@maciejzujtu/tsos"

const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
    consumer: {
        key: process.env.CONSUMER_KEY!,
        secret: process.env.CONSUMER_SECRET!,
    },
})
```

Consumer keys belong to a single USOS installation. Do not reuse a key registered at one university against another university's API.

## 2. Request a temporary token

Provide a callback URL under your application's control and the smallest set of scopes needed by the feature:

```ts
const requestToken = await client.oauth.getRequestToken(
    "https://your-app.example/oauth/callback",
    ["personal"],
)

const authorizationUrl = client.oauth.getAuthorizeUrl(
    requestToken.oauth_token,
    "confirm_user",
)
```

Redirect the user to `authorizationUrl`. If your app cannot receive callbacks, use `"oob"` as the callback and collect the verifier from the user manually.

## 3. Process the callback and exchange the token

USOS redirects to your callback with `oauth_token` and `oauth_verifier`. Verify that the returned token is the request token your application initiated before exchanging it.

```ts
const accessToken = await client.oauth.getAccessToken(
    requestToken.oauth_token,
    requestToken.oauth_token_secret,
    oauthVerifierFromCallback,
)

const user = client.withAccessToken({
    token: accessToken.oauth_token,
    secret: accessToken.oauth_token_secret,
})
```

Store the access-token pair encrypted at rest and associate it with the authenticated user in your application. TSOS does not persist tokens for you.

## 4. Call User endpoints

```ts
const terms = await user.terms.getTermsIndex({ activeOnly: true })
```

Each endpoint has its own Consumer, token, HTTPS, administrative, and scope requirements. TSOS rejects obvious local authentication mistakes, while USOS performs the authoritative access check.

## Administrative Consumers

An Administrative Consumer is granted by the USOS installation. Creating an `AdminClient` does not elevate an ordinary Consumer key:

```ts
const admin = client.asAdministrator()
```

Use administrative credentials only in trusted backend code. Prefer `client.oauth.proxy` when an administrative application must make a request with the end user's reduced permissions.

## Revocation

```ts
await user.oauth.revokeToken()
```

Use `revokeToken(true)` only when you intend to remove the Consumer's saved authorization data as well as the current token. Use `revokeConsumerKey` only when a Consumer key is compromised or being retired.

## Security checklist

- Use HTTPS callbacks in production.
- Keep secrets out of source control, browser bundles, logs, and error reports.
- Request the minimum scopes and fields needed.
- Verify OAuth callback state in your application before token exchange.
- Use a dedicated test account for protected or mutating endpoints.
