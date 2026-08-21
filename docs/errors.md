# Error handling

All TSOS-specific errors extend `UsosError` and are exported from the package root.

| Error | When it is thrown |
| --- | --- |
| `UsosConfigurationError` | The local client configuration cannot satisfy the endpoint, such as using HTTP for an HTTPS-only method. |
| `UsosAuthenticationError` | Required Consumer credentials, Access Token credentials, or Administrative access are missing locally. |
| `UsosApiError` | USOS returned a non-success HTTP response. |
| `UsosError` | Base class for the errors above. |

```ts
import {
    UsosApiError,
    UsosAuthenticationError,
} from "@maciejzujtu/tsos"

try {
    const user = await client.users.getUser()
    console.log(user)
} catch (error) {
    if (error instanceof UsosAuthenticationError) {
        // Configure a Consumer or Access Token for the endpoint being called.
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

Network failures from `fetch`, malformed successful JSON responses, and aborted requests currently propagate their platform-native errors. Handle them separately from `UsosApiError` when your application needs retry, telemetry, or user-facing messaging.

Do not log `Authorization` headers, Consumer Secrets, Access Token Secrets, or full response bodies containing personal data.
