[![CI](https://github.com/maciejzujtu/TSOS/actions/workflows/ci.yml/badge.svg)](https://github.com/maciejzujtu/TSOS/actions/workflows/ci.yml)

# TSOS

TSOS is a TypeScript API wrapper for the [USOS API](https://apps.usos.uj.edu.pl/developers/api/). It provides typed access to supported endpoints, OAuth authentication, and structured error handling.

## Capabilities

- Typed request parameters and response models.
- Anonymous, Consumer, user Access Token, and Administrative Consumer contexts.
- OAuth 1.0a request-token, authorization, access-token, proxy, and revocation operations.
- Endpoint-level authentication and HTTPS requirement validation.
- Request cancellation and configurable timeouts through the transport layer.
- Structured API, configuration, authentication, and network errors.

Available methods, scopes, and response fields may differ between installations. For now only installation URL for `JAGIELLONIAN_UNIVERSITY` was actually tested.

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

TSOS does not automatically retry requests. Mutating operations must not be retried unless the application can establish that the original request was not accepted.

## Available modules

| Module | Client property | Endpoints | Availability | Description |
| --- | --- | ---: | --- | --- |
| Administration documents | — | 0 / 6 | Not implemented | Administration document operations. |
| API reference | `client.apiref` | 4 / 4 | All clients | API method, module, and scope metadata. |
| API server | `client.apisrv` | 5 / 5 | All clients | Installation and API server information. |
| API statistics | — | 0 / 2 | Not implemented | API method usage statistics. |
| Attendance | `userClient.attendance` | 10 / 10 | `UserClient` | Attendance lists and attendance changes. |
| Binary storage | — | 0 / 15 | Not implemented | Binary data storage and retrieval. |
| Calendar | `client.calendar` | 2 / 2 | All clients; operation-specific authorization | University calendar events. |
| Cards | — | 0 / 12 | Not implemented | Student and employee ID cards. |
| Courses | `client.courses` | 17 / 17 | All clients | Courses, editions, units, roles, and ECTS data. |
| Credits | — | 0 / 2 | Not implemented | Study-credit information. |
| Course tests | — | 0 / 54 | Not implemented | Course tests and results. |
| User-defined groups | — | 0 / 6 | Not implemented | User-created groups. |
| EMREX | — | 0 / 4 | Not implemented | Student mobility through EMREX. |
| Events | — | 0 / 7 | Not implemented | Event subscriptions. |
| Events 2 | — | 0 / 27 | Not implemented | Events and notification preferences. |
| Exam reports | — | 0 / 6 | Not implemented | Exam-report information. |
| Exam reports 2 | — | 0 / 13 | Not implemented | Extended exam-report operations. |
| Exams | `client.exams` | 17 / 17 | Operation-specific authorization | Examination registration. |
| Faculties | `client.fac` | 6 / 6 | All clients | Faculty metadata, hierarchy, and search. |
| Faculty permissions | — | 0 / 8 | Not implemented | Per-faculty permissions. |
| File sharing | — | 0 / 3 | Not implemented | File-sharing operations. |
| Geography | — | 0 / 8 | Not implemented | Buildings, rooms, and geographical data. |
| Grades | `client.grades` | 11 / 11 | All clients; operation-specific authorization | Student grade information and administrative updates. |
| Course groups | `client.groups` | 9 / 9 | All clients | Class groups and participant relationships. |
| University guide | — | 0 / 7 | Not implemented | University guide information. |
| Housing | — | 0 / 24 | Not implemented | Dormitories and student housing. |
| Institutional addresses | — | 0 / 8 | Not implemented | Institutional address information. |
| Internships | — | 0 / 2 | Not implemented | Student internships. |
| Mail client | — | 0 / 22 | Not implemented | Email composition. |
| Mailing | — | 0 / 6 | Not implemented | Email delivery. |
| Meetings | — | 0 / 31 | Not implemented | University meetings. |
| Mobility | — | 0 / 48 | Not implemented | Learning Agreements and student mobility. |
| News | — | 0 / 4 | Not implemented | University and faculty news. |
| OAuth | `client.oauth` | 6 / 6 | All client contexts | OAuth 1.0a authorization and tokens. |
| OAuth 2 | — | 0 / 1 | Not implemented | OAuth 2 provider operations. |
| Payments | `client.payments` | 8 / 8 | `UserClient` | Student payments. |
| Phones | — | 0 / 4 | Not implemented | Institutional phone numbers. |
| Photos | — | 0 / 6 | Not implemented | User-photo settings. |
| PIT declarations | — | 0 / 3 | Not implemented | Polish tax declarations. |
| Placement tests | — | 0 / 6 | Not implemented | Placement-test registration and results. |
| Primary groups | — | 0 / 13 | Not implemented | User primary groups. |
| Study programmes | `client.progs` | 8 / 8 | All clients; operation-specific authorization | Student programme information. |
| Registrations | `client.registrations` | 18 / 18 | Operation-specific authorization | University course registrations. |
| Clearance slips | — | 0 / 27 | Not implemented | Student clearance slips. |
| Statements | — | 0 / 7 | Not implemented | Electronic statements and signatures. |
| Surveys | — | 0 / 10 | Not implemented | Satisfaction surveys. |
| Academic terms | `client.terms` | 4 / 4 | All clients | Academic term search and retrieval. |
| Theses | — | 0 / 11 | Not implemented | Theses and diplomas. |
| Timetables | `client.tt` | 12 / 12 | All clients; operation-specific authorization | Activity timetables and calendar feeds. |
| User preferences | — | 0 / 4 | Not implemented | User preference management. |
| Users | `client.users` | 22 / 22 | Operation-specific authorization | User profiles, employment, and search. |
| **Total USOS API coverage** | — | **159 / 576** | **27.6% implemented** | **417 endpoints remain.** |

Authorization is evaluated for each endpoint. The presence of a module on a client does not imply that every operation is permitted in that client's authorization context.

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
