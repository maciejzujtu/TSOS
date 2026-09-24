# TSOS API Reference

This document describes the TSOS client, authentication models, errors, and supported modules. Detailed endpoint documentation is available on the [official USOS API website](https://apps.usos.uj.edu.pl/developers/api/).

## Table of contents

- [Conventions](#conventions)
- [Client classes](#client-classes)
- [Client configuration](#client-configuration)
- [Authentication model](#authentication-model)
- [Error model](#error-model)

## Conventions

- All service methods use `camelCase` TypeScript names and map parameters to the names required by USOS.
- Optional `fields` parameters are arrays of exported field-name union types. TSOS serializes them to USOS selectors.
- Identifiers accept the exported identifier type shown in the signature. Several USOS identifiers permit both strings and numbers.
- `GET` and `POST` below identify the underlying USOS method definition. TSOS performs request serialization and OAuth signing.
- Deprecated wrapper methods remain available for compatibility and are explicitly marked.

## Client classes

| Class | Construction | Authorization | Services |
| --- | --- | --- | --- |
| `UsosClient` | `new UsosClient(options)` | Anonymous or Consumer | `apiref`, `apisrv`, `calendar`, `courses`, `exams`, `fac`, `grades`, `groups`, `oauth`, `payments`, `progs`, `registrations`, `terms`, `tt`, `users` |
| `UserClient` | `client.withAccessToken(accessToken)` | Consumer and user Access Token | Base services with `attendance` and `oauth` |
| `AdminClient` | `client.asAdministrator()` | Administrative Consumer | Base services with `oauth`; administrative operations may also require a user Access Token |

## Client configuration

```ts
interface ClientOptions {
    baseUrl: string | URL
    fetch?: typeof globalThis.fetch
    timeoutMs?: number
    consumer?: { key: string; secret: string }
}
```

| Option | Required | Description |
| --- | --- | --- |
| `baseUrl` | Yes | Base URL of the available USOS API installations |
| `fetch` | No | Fetch-compatible transport. |
| `timeoutMs` | No | Default request timeout in milliseconds. |
| `consumer` | No | OAuth 1.0a Consumer key and secret. Required for `UserClient` or `AdminClient` objects. |

## Authentication model

TSOS validates endpoint requirements before dispatch. The access labels used in this document have the following meanings:

| Authentication model | Consumer credentials | Access Token | Administrative authorization |
| --- | --- | --- | --- |
| Public | Not required | Not required | Not required |
| Client authentication | Required | Optional or required, depending on the endpoint | Not required |
| Administrator authentication | Required | Endpoint-dependent | Required |

### OAuth 1.0a flow

```ts
const requestToken = await client.oauth.getRequestToken(callbackUrl, ["personal"])
const authorizationUrl = client.oauth.getAuthorizeUrl(
    requestToken.oauth_token,
    "confirm_user",
)

// Redirect the user to authorizationUrl. After the callback:
const accessToken = await client.oauth.getAccessToken(
    requestToken.oauth_token,
    requestToken.oauth_token_secret,
    verifier,
)

const userClient = client.withAccessToken({
    token: accessToken.oauth_token,
    secret: accessToken.oauth_token_secret,
})
```

Consumer secrets, request-token secrets, and Access Token secrets must remain in trusted server-side storage. They must not be embedded in browser code, logs, or source control.

## Error model

| Error | Meaning | Details |
| --- | --- | --- |
| `UsosConfigurationError` | Invalid client configuration. | Message |
| `UsosAuthenticationError` | Required authentication is missing. | Message |
| `UsosApiError` | USOS rejected the request. | `status`, `endpoint`, `responseBody`, `responseJson` |
| `UsosNetworkError` | The request failed, timed out, or was cancelled. | `kind`, `endpoint`, `originalError` |
