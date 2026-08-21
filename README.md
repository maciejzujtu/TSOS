[![CI](https://github.com/maciejzujtu/TSOS/actions/workflows/ci.yml/badge.svg)](https://github.com/maciejzujtu/TSOS/actions/workflows/ci.yml)

# TSOS

An ESM-first TypeScript client for the [USOS API](https://apps.usos.uj.edu.pl/developers/api/). TSOS provides typed service methods, OAuth 1.0a support, and a testable `fetch`-based transport for applications that integrate with USOS.

## Features

- Typed TypeScript API with generated declaration files.
- Public, Consumer, User, and Administrative client contexts.
- OAuth 1.0a request-token, authorization, access-token, proxy, and revocation flows.
- 83 implemented endpoint definitions across API reference, API server, attendance, courses, faculties, groups, OAuth, terms, and users.
- Binary response support for faculty factsheets and user photos.
- Injectable `fetch` for deterministic application and library tests.
- ESM package build, tarball installation smoke test, and GitHub Actions verification.

## Installation

TSOS requires Node.js 20 or newer.

```sh
npm install @maciejzujtu/tsos
```

The package is ready to install from a tarball today. Publish it to npm before using the command above from another project.

## Quick start

Public API calls do not need credentials:

```ts
import {
    JAGIELLONIAN_UNIVERSITY,
    UsosClient,
} from "@maciejzujtu/tsos"

const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
})

console.log(await client.apisrv.getNow())
```

Use a different USOS installation by passing its base URL:

```ts
const client = new UsosClient({
    baseUrl: "https://your-usos-installation.example",
})
```

Each university controls its own API version, Consumer credentials, and available capabilities. Verify the target installation's API reference before enabling an endpoint in production.

## Documentation

| Guide | What it covers |
| --- | --- |
| [API guide](docs/api.md) | Client construction, services, method groups, parameters, return values, and endpoint metadata. |
| [Authentication](docs/authentication.md) | OAuth 1.0a flow, scopes, User clients, administrative access, revocation, and security. |
| [Error handling](docs/errors.md) | TSOS error classes and application error-handling patterns. |
| [Development](#development) | Local setup, quality checks, and package verification. |
| [USOS API reference](https://apps.usos.uj.edu.pl/developers/api/) | Installation-specific authoritative method documentation. |

## Supported modules

| Module | Endpoints | Entry point |
| --- | ---: | --- |
| API reference | 4 | `client.apiref` |
| API server | 5 | `client.apisrv` |
| OAuth | 6 | `client.oauth` |
| Attendance | 10 | `client.attendance` |
| Terms | 4 | `client.terms` |
| Faculties | 6 | `client.fac` |
| Courses | 17 | `client.courses` |
| Groups | 9 | `client.groups` |
| Users | 22 | `client.users` |

See the [API guide](docs/api.md) for the available method groups and exported TypeScript types. Unsupported USOS modules are intentionally not exposed yet.

## Authentication

Consumer credentials are required for protected endpoints. Keep them on a trusted backend, never in a browser bundle.

```ts
import { JAGIELLONIAN_UNIVERSITY, UsosClient } from "@maciejzujtu/tsos"

const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
    consumer: {
        key: process.env.CONSUMER_KEY!,
        secret: process.env.CONSUMER_SECRET!,
    },
})

const requestToken = await client.oauth.getRequestToken(
    "https://your-app.example/oauth/callback",
    ["personal"],
)

const authorizationUrl = client.oauth.getAuthorizeUrl(
    requestToken.oauth_token,
    "confirm_user",
)
```

Redirect the user to `authorizationUrl`, verify the callback, exchange the request token for an access token, and call `client.withAccessToken(...)`. The complete flow is in the [authentication guide](docs/authentication.md).

## Errors

```ts
import { UsosApiError, UsosAuthenticationError } from "@maciejzujtu/tsos"

try {
    await client.users.getUser()
} catch (error) {
    if (error instanceof UsosAuthenticationError) {
        // Add the credentials required by this endpoint.
    } else if (error instanceof UsosApiError) {
        console.error(error.status, error.endpoint, error.responseBody)
    } else {
        throw error
    }
}
```

Read [Error handling](docs/errors.md) before adding retries, logging, or user-facing error messages.
