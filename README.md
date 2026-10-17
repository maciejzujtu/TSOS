[![CI](https://github.com/maciejzujtu/TSOS/actions/workflows/ci.yml/badge.svg)](https://github.com/maciejzujtu/TSOS/actions/workflows/ci.yml)

# TSOS

TSOS is a TypeScript API wrapper for the [USOS API](https://apps.usos.uj.edu.pl/developers/api/). The wrapper provides typed access to supported endpoints, OAuth authentication and structured error handling. As of now the wrapper was only tested and written for Jagiellonian Univeristy's API URL.

## Installation

```sh
npm install @maciejzuj/tsos
```

## Example usage

Public endpoints do not require credentials:

```ts
import { JAGIELLONIAN_UNIVERSITY, UsosClient } from "@maciejzuj/tsos"

const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
    timeoutMs: 10_000,
})

const [installation, serverTime] = await Promise.all([
    client.apisrv.getInstallation(),
    client.apisrv.getNow(),
])

console.log(installation.institution_name, serverTime)
```

### Course search

```ts
const result = await client.courses.search({
    lang: "en",
    name: "algorithms",
    fields: ["course_id", "name", "match"],
    num: 20,
})

for (const course of result.items) {
    console.log(course.course_id, course.name?.en)
}
```

### Consumer and user authorization

Create the primary client with Consumer credentials. Attach an OAuth Access Token to obtain a `UserClient` for user-scoped endpoints:

```ts
const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
    consumer: {
        key: process.env.USOS_CONSUMER_KEY!,
        secret: process.env.USOS_CONSUMER_SECRET!,
    },
})

const userClient = client.withAccessToken({
    token: process.env.USOS_ACCESS_TOKEN!,
    secret: process.env.USOS_ACCESS_TOKEN_SECRET!,
})

const user = await userClient.users.getUser(undefined, [
    "id",
    "first_name",
    "last_name",
])
```

The complete request-token and access-token sequence is documented under [Authentication model](docs/api.md#authentication-model).

### Error handling

```ts
import {
    UsosApiError,
    UsosAuthenticationError,
    UsosNetworkError,
} from "@maciejzuj/tsos"

try {
    await client.users.getUser()
} catch (error) {
    switch (true) {
        case error instanceof UsosAuthenticationError:
            console.error("Endpoint requires a different client context")
            break
        case error instanceof UsosApiError:
            console.error(error.status, error.endpoint, error.responseJson)
            break
        case error instanceof UsosNetworkError:
            console.error(error.kind, error.endpoint)
            break
        default:
            throw error
    }
}
```

## Supported installations

TSOS currently exports a single URL installation for Jagiellonian's University but it is possible to use a different installation as a string to use the client.

```ts
import { JAGIELLONIAN_UNIVERSITY } from "@maciejzuj/tsos"

const client = new UsosClient({
    baseUrl: "https://usos.example.edu", // JAGIELLONIAN_UNIVERSITY
})
```

## Documentation

| Document | Scope |
| --- | --- |
| [TSOS API Reference](docs/api.md) | Client classes, configuration, authentication, errors, and all implemented endpoints. |
| [USOS API Reference](https://apps.usos.uj.edu.pl/developers/api/) | Authoritative installation-specific endpoint behavior, parameters, scopes, and response fields. |

## License

[MIT](LICENSE) © 2026 maciejzujtu
