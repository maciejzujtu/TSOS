# Error handling

All TSOS-specific errors extend `UsosError` and are exported from the package root.

| Error | When it is thrown |
| --- | --- |
| `UsosConfigurationError` | The local client configuration cannot satisfy the endpoint, such as using HTTP for an HTTPS-only method. |
| `UsosAuthenticationError` | Required Consumer credentials, Access Token credentials, or Administrative access are missing locally. |
| `UsosNetworkError` | The request was cancelled, timed out, or failed before USOS sent a response. Its `kind` is `aborted`, `timeout`, or `network`. |
| `UsosApiError` | USOS returned a non-success HTTP response. |
| `UsosError` | Base class for the errors above. |

```ts
import {
    UsosApiError,
    UsosAuthenticationError,
    UsosNetworkError,
} from "@maciejzujtu/tsos"

try {
    const user = await client.users.getUser()
    console.log(user)
} catch (error) {
    if (error instanceof UsosAuthenticationError) {
        // Configure a Consumer or Access Token for the endpoint being called.
    } else if (error instanceof UsosNetworkError) {
        // `timeout` and `network` may be safe to report or retry at the application layer.
        console.error(error.kind, error.endpoint)
    } else if (error instanceof UsosApiError) {
        console.error(error.status)
        console.error(error.endpoint)
        console.error(error.responseBody)
    } else {
        throw error
    }
}
```

`UsosApiError` provides:

- `status`: the HTTP status code;
- `endpoint`: the USOS service path;
- `responseBody`: the unmodified response body, which may contain a useful USOS error message.
- `responseJson`: the parsed JSON value when the error body is valid JSON; otherwise `undefined`.

Network failures and cancellations from `fetch` become `UsosNetworkError`. A malformed successful JSON response still raises its native `SyntaxError`, so data-contract failures are not confused with transport failures.

TSOS never retries requests automatically. In particular, do not automatically retry mutating `POST` endpoints such as attendance changes, OAuth revocation, or user updates: a retry may duplicate an operation when the first request reached USOS but the response was lost.

Do not log `Authorization` headers, Consumer Secrets, Access Token Secrets, or full response bodies containing personal data.
