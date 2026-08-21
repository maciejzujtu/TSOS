# API guide

This guide describes the API currently implemented by TSOS. The generated TypeScript declarations are the authoritative source for every parameter and result type.

## Creating clients

```ts
import {
    JAGIELLONIAN_UNIVERSITY,
    UsosClient,
} from "@maciejzujtu/tsos"

const client = new UsosClient({
    baseUrl: JAGIELLONIAN_UNIVERSITY,
})
```

`baseUrl` accepts a string or `URL`. You can use any USOS installation URL; TSOS also exports constants for Jagiellonian University, University of Warsaw, and University of Wrocław.

Pass a custom `fetch` implementation when testing or when your runtime needs one:

```ts
const client = new UsosClient({
    baseUrl: "https://apps.usos.uj.edu.pl",
    fetch: myFetch,
    timeoutMs: 10_000,
})
```

`timeoutMs` sets the default timeout for every request issued through that client. It is preserved by `withAccessToken(...)` and `asAdministrator()`. Advanced users of the exported `HttpRequester` can also pass an `AbortSignal` or per-request `timeoutMs` in `RequestOptions`.

For Consumer, User, and Administrative authentication, see [Authentication](authentication.md).

## Clients

| Client | Create it with | Use it for |
| --- | --- | --- |
| `UsosClient` | `new UsosClient({ baseUrl, consumer? })` | Public endpoints, Consumer-authenticated endpoints, and starting OAuth. |
| `UserClient` | `client.withAccessToken(accessToken)` | Endpoints requiring an Access Token. |
| `AdminClient` | `client.asAdministrator()` | Endpoints requiring an Administrative Consumer. |

All clients expose the service modules below. The USOS server remains the final authority on Consumer type, token, scope, and installation support.

## Services

TSOS currently implements 83 USOS endpoint definitions in nine modules.

| Service | Endpoints | Typical use |
| --- | ---: | --- |
| `client.apiref` | 4 | Inspect API methods, modules, and scopes. |
| `client.apisrv` | 5 | Read installation metadata and server time. |
| `client.oauth` | 6 | Complete OAuth 1.0a flows, proxy calls, and revoke credentials. |
| `client.attendance` | 10 | Read and manage attendance lists. Requires a User token and `staff_perspective`. |
| `client.terms` | 4 | Search and retrieve academic terms. |
| `client.fac` | 6 | Search and retrieve faculty data and factsheets. |
| `client.courses` | 17 | Retrieve courses, course editions, units, roles, and ECTS data. |
| `client.groups` | 9 | Retrieve course groups and check group roles. |
| `client.users` | 22 | Search and retrieve user, employment, position, and index data. |

The method groups below are a quick navigation reference. Import the exported option and result types from the package when writing an application.

### API reference: `client.apiref`

- `getMethod`
- `getMethodIndex`
- `getModule`
- `getScopes`

### API server: `client.apisrv`

- `getConsumer`
- `getInstallation`
- `getInstallations`
- `getMobileConfig`
- `getNow`

### OAuth: `client.oauth`

- `getRequestToken`
- `getAuthorizeUrl`
- `getAccessToken`
- `proxy`
- `revokeConsumerKey`
- `revokeToken`

### Attendance: `client.attendance`

- `getAttendance`
- `getAttendanceList`
- `getAttendanceLists`
- `changeListMode`
- `createAttendanceList`
- `createFromTimetable`
- `deleteAttendanceList`
- `getGroupAttendanceLists`
- `updateAttendance`
- `getUserAttendanceLists`

### Terms: `client.terms`

- `search`
- `getTerm`
- `getTerms`
- `getTermsIndex`

### Faculties: `client.fac`

- `getFactsheet`
- `getFaculties`
- `getFaculty`
- `resolveFacpattern`
- `search`
- `getSubfacultiesDeep`

### Courses: `client.courses`

- `getClassType`, `getClassTypesIndex`
- `getCoordinatorCourseEditions`
- `getCourse`, `getCourse2`, `getCourses`
- `getCourseEdition`, `getCourseEdition2`
- `getCourseUnit`, `getUnit`, `getUnits`
- `isCoordinator`, `isLecturer`, `isParticipant`
- `search`
- `getUserCourses`, `getUserEctsPoints`

### Groups: `client.groups`

- `getClassGroup`, `getCommonGroups`, `getGroup`, `getGroups`
- `isLecturer`, `isParticipant`
- `getLecturerGroups`, `getParticipantGroups`, `getUserGroups`

### Users: `client.users`

- `change`
- `getEmploymentFunctions`, `getEmploymentGroup`, `getEmploymentGroupsIndex`, `getEmploymentPositions`
- `getByPesel`, `getPhoto`, `getPosition`
- `search`, `searchLegacy`, `searchByEmail`
- `searchCurrentStudents`, `searchCurrentTeachers`, `searchStaff`, `searchStudents`
- `affectSearchHistory`
- `getStaffIndex`, `getStudentIndex`, `getStudentProgrammes`
- `getUser`, `getUser2`, `getUsers`

Deprecated USOS endpoints remain marked as deprecated in the service method documentation where applicable. Prefer the non-deprecated alternatives listed in the TypeScript API.

## Parameters and return values

TSOS converts ergonomic TypeScript names to the parameter names expected by USOS. For example:

```ts
const courses = await client.courses.search({
    lang: "en",
    name: "Algorithms",
    fields: ["name", "description"],
    num: 20,
})
```

- Optional `undefined` and `null` parameters are omitted.
- Arrays are sent in USOS pipe-separated form.
- Object parameters are JSON encoded when an endpoint requires them.
- Empty required identifier collections are rejected before a request is sent.
- `getFactsheet` and `getPhoto` return `ArrayBuffer`; most other methods return typed JSON data.

When an endpoint supports a `fields` selector, request only the fields your application needs. That keeps responses smaller and reduces unnecessary handling of personal data.

## Endpoint definitions

The package also exports endpoint metadata such as `coursesEndpoints`, `usersEndpoints`, and `attendanceEndpoints`. This is useful when building generic tooling or using `client.oauth.proxy`:

```ts
import { attendanceEndpoints } from "@maciejzujtu/tsos"

const result = await client.oauth.proxy(attendanceEndpoints.attendanceList, {
    parameters: {
        list_id: 42,
        fields: ["id", "date"],
    },
})
```

Proxy calls are advanced usage. Read the USOS OAuth documentation and protect browser-facing flows against CSRF.

## Errors

See [Error handling](errors.md) for the error hierarchy and examples.
