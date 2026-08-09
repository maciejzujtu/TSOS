# TSOS

TypeScript wrapper for the USOS API.

This README documents the four modules currently in scope:

- `APIREF` — API metadata and discovery
- `APISRV` — USOS installation and server metadata
- `ATTENDANCE` — attendance lists and entries
- `OAUTH` — OAuth 1.0a authorization and permission-restricted proxy calls

The reference describes the wrapper's public methods first and the underlying
USOS endpoint beside each method. It is based on the official USOS API
documentation and the current implementation in `src/`.

## Installation model

Every university has its own USOS API installation, data, version, and Consumer
Keys. Create a client for the installation that issued your Consumer Key.

```ts
import { Server } from "./src"

const usos = new Server(
  "apps.usos.uj.edu.pl",
  process.env.USOS_CONSUMER_KEY!,
  process.env.USOS_CONSUMER_SECRET!,
)
```

Do not send requests to `apps.usos.edu.pl`. It is the USOS “mother server” used
for discovery and documentation, not a normal API target.

The current `University` type accepts these hosts:

| Institution | Host |
| --- | --- |
| Jagiellonian University | `apps.usos.uj.edu.pl` |
| University of Warsaw | `uosapps.uw.edu.pl` |
| University of Wrocław | `usosapps.uni.wroc.pl` |

## Module overview

| Wrapper property | Wrapper method | USOS endpoint |
| --- | --- | --- |
| `usos.apiref` | `getMethod` | `services/apiref/method` |
| `usos.apiref` | `getMethodIndex` | `services/apiref/method_index` |
| `usos.apiref` | `getModule` | `services/apiref/module` |
| `usos.apiref` | `getScopes` | `services/apiref/scopes` |
| `usos.apisrv` | `getConsumer` | `services/apisrv/consumer` |
| `usos.apisrv` | `getInstallation` | `services/apisrv/installation` |
| `usos.apisrv` | `getInstallations` | `services/apisrv/installations` |
| `usos.apisrv` | `getMobileConfig` | `services/apisrv/mobile_usos_config` |
| `usos.apisrv` | `getNow` | `services/apisrv/now` |
| `user.attendance` | `getAttendance` | `services/attendance/attendance` |
| `user.attendance` | `getAttendanceList` | `services/attendance/attendance_list` |
| `user.attendance` | `getAttendanceLists` | `services/attendance/attendance_lists` |
| `user.attendance` | `changeListMode` | `services/attendance/change_list_mode` |
| `user.attendance` | `createAttendanceList` | `services/attendance/create_attendance_list` |
| `user.attendance` | `createFromTimetable` | `services/attendance/create_from_tt` |
| `user.attendance` | `deleteAttendanceList` | `services/attendance/delete_list` |
| `user.attendance` | `getGroupAttendanceLists` | `services/attendance/group` |
| `user.attendance` | `updateAttendance` | `services/attendance/update_attendance` |
| `user.attendance` | `getUserAttendanceLists` | `services/attendance/user` |
| `usos.oauth` | `getRequestToken` | `services/oauth/request_token` |
| `usos.oauth` | `getAuthorizeUrl` | `services/oauth/authorize` |
| `usos.oauth` | `getAccessToken` | `services/oauth/access_token` |
| `usos.oauth` | `proxy` | `services/oauth/proxy` |

USOS uses field selectors on several endpoints. The wrapper accepts selectors as
arrays and serializes them with `|`:

```ts
const installation = await usos.apisrv.getInstallation([
  "institution_name",
  "machine_version",
  "mobile_usos_support",
])
```

Only requested fields are guaranteed to be present. Response fields are
therefore optional in the current TypeScript interfaces.

---

## APIREF

APIREF exposes machine-readable information about USOS modules, methods, scopes,
parameters, and return fields. These endpoints are useful for documentation,
feature discovery, and future code generation.

### `getMethod(module, method, fields?)`

Returns metadata for one USOS API method.

```ts
const metadata = await usos.apiref.getMethod(
  APISRV,
  "INSTALLATION",
  ["name", "arguments", "result_fields"],
)
```

```ts
getMethod<M extends Module>(
  module: M,
  method: keyof M,
  fields?: MethodFields[],
): Promise<METHOD>
```

Parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `module` | `Module` | yes | An endpoint enum such as `APISRV`. |
| `method` | `keyof M` | yes | A key from that enum, such as `"INSTALLATION"`. |
| `fields` | `MethodFields[]` | no | Metadata fields to request. |

Return fields:

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Fully qualified method name. |
| `short_name` | `string` | Method name without its module path. |
| `description` | `string` | HTML-formatted description. |
| `brief_description` | `string` | Short plain-text description. |
| `ref_url` | `string` | URL of the official method reference. |
| `auth_options` | `AuthOptions` | Consumer, token, SSL, scope, and administrative requirements. |
| `arguments` | `MethodArgument[]` | Method parameter definitions. |
| `returns` | `string` | HTML-formatted return-value documentation. |
| `errors` | `string` | HTML-formatted error documentation. |
| `result_fields` | `ResultField[]` | Structured description of selectable result fields. |
| `beta` | `boolean` | Whether the method may change incompatibly. |
| `deprecated` | `DeprecatedInfo \| null` | Replacement and removal information, if deprecated. |
| `admin_access` | `boolean` | Whether the signed Consumer has administrative access. |
| `is_internal` | `boolean` | Whether the endpoint is internal and permanently unstable. |

Nested return objects:

```ts
interface AuthOptions {
  consumer: "required" | "optional" | "ignored"
  token: "required" | "optional" | "ignored"
  administrative_only: boolean
  ssl_required: boolean
  scopes: string[]
}

interface MethodArgument {
  name: string
  is_required: boolean
  is_deprecated: boolean
  type: string
  default_value: string | null
  description: string
}

interface ResultField {
  name: string
  description: string
  is_primary: boolean
  is_secondary: boolean
}

interface DeprecatedInfo {
  deprecated_by: string | null
  present_until: string | null
}
```

Authentication: Consumer optional; Access Token ignored.

### `getMethodIndex()`

Returns brief metadata for all public methods exposed by the selected
installation.

```ts
getMethodIndex(): Promise<METHOD_INDEX[]>
```

Each array item contains:

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Fully qualified method name. |
| `brief_description` | `string` | Short plain-text description. |

Authentication: none.

### `getModule(module)`

Returns metadata for one USOS API module.

```ts
const moduleInfo = await usos.apiref.getModule(APISRV)
```

```ts
getModule(module: Module): Promise<MODULE>
```

Return fields:

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Fully qualified module name. |
| `title` | `string` | Human-readable module title. |
| `brief_description` | `string` | Very short module label. |
| `description` | `string` | HTML-formatted module description. |
| `beta` | `boolean` | Whether the module may change incompatibly. |
| `methods` | `string[]` | Fully qualified methods directly inside the module. |
| `submodules` | `string[]` | Fully qualified child modules. |

Authentication: none.

### `getScopes()`

Returns all OAuth scopes supported by the selected installation.

```ts
getScopes(): Promise<SCOPE[]>
```

Each array item contains:

| Field | Type | Description |
| --- | --- | --- |
| `key` | `string` | Scope identifier used during OAuth authorization. |
| `developers_description` | `string` | HTML-formatted developer description. |

Authentication: none.

Use this method instead of assuming that every installation supports the same
scope set.

---

## APISRV

APISRV describes the current API installation, registered Consumer, all public
installations, Mobile USOS feature configuration, and server time.

### `getConsumer(fields)`

Returns information about the Consumer whose key signed the request.

```ts
const consumer = await usos.apisrv.getConsumer([
  "name",
  "token_scopes",
  "is_verified",
])
```

```ts
getConsumer(fields: ConsumerFields[]): Promise<CONSUMER>
```

`fields` is required by USOS and should be a non-empty array.

Return fields:

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Registered application name. |
| `url` | `string \| null` | Registered application URL. |
| `email` | `string` | Registered contact email. |
| `date_registered` | `string` | Registration datetime. |
| `administrative_methods` | `string[]` | Methods for which the Consumer has administrative access. |
| `token_scopes` | `string[] \| null` | Scopes on the supplied Access Token, or `null` without one. |
| `is_verified` | `boolean` | Whether the Consumer is verified. |

Authentication: Consumer required; Access Token optional. A `Server` request
identifies the Consumer. A user-authorized request can additionally expose
`token_scopes`.

### `getInstallation(fields?)`

Returns metadata for the selected client's installation.

```ts
getInstallation(fields?: readonly InstallationFields[]): Promise<INSTALLATION>
```

Return fields:

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `string` | Installation base URL. Always use HTTPS for API calls. |
| `version` | `string` | Human-readable version; do not parse it for feature checks. |
| `machine_version` | `string` | Machine-readable `0.0.0.0-0` version. |
| `usos_schema_version` | `string` | Version of the installation's USOS database schema. |
| `institution_name` | `LangDict \| null` | Localized institution name. |
| `institution` | `Record<string, unknown>` | Primary faculty object. Its shape belongs to the `fac` module. |
| `contact_emails` | `string[]` | Local USOS API administrator emails. |
| `schac_id` | `string` | Institution identifier in SCHAC/domain form. |
| `mcards_support` | `boolean` | Whether mCards are supported. |
| `mobile_usos_support` | `boolean` | Whether Mobile USOS is supported. |

```ts
type LangDict = Record<string, string>
```

Authentication: none.

For feature checks, parse each numeric component of `machine_version`.
Lexicographic string comparison is invalid.

### `getInstallations()`

Returns the public USOS API installation list.

```ts
getInstallations(): Promise<INSTALLATIONS[]>
```

Each array item contains:

| Field | Type | Description |
| --- | --- | --- |
| `base_url` | `string` | Installation base URL. |
| `version` | `string` | Human-readable installation version. |
| `institution_name` | `LangDict \| null` | Localized institution name. |
| `contact_emails` | `string[]` | Local administrator emails. |

Authentication: none.

Consumer Keys are installation-specific. Finding an installation here does not
mean an existing key can be reused with it.

### `getMobileConfig(fields?)`

Returns Mobile USOS feature flags for the selected installation.

```ts
getMobileConfig(fields?: readonly MobileConfigFields[]): Promise<MOBILE_USOS_CONFIG>
```

Identity and support fields:

| Field | Type | Description |
| --- | --- | --- |
| `contact_email` | `string` | User-facing university contact email. |
| `usosweb_domain` | `string` | USOSweb installation domain. |
| `nfc_salt` | `string` | Salt used for NFC communication. |

Feature switches:

| Field | Field | Field |
| --- | --- | --- |
| `enable_grades` | `enable_examreps` | `enable_tests` |
| `enable_employee_tests` | `enable_timetable` | `enable_calendar` |
| `enable_groups` | `enable_student_surveys` | `enable_employee_surveys` |
| `enable_mcards` | `enable_eid` | `enable_payments` |
| `enable_guide` | `enable_news` | `enable_map` |
| `enable_buildings` | `enable_qr_scanner` | `enable_theses` |
| `enable_attendance` | `enable_administrative_docs` | `enable_registrations` |

All feature switches are `boolean`.

Display and security switches:

| Field | Description |
| --- | --- |
| `calendar_hide_links` | Hide linkage periods in the calendar. |
| `calendar_hide_exam_sessions` | Hide exam sessions. |
| `calendar_hide_breaks` | Hide breaks. |
| `calendar_hide_holidays` | Hide holidays. |
| `calendar_hide_rector_days` | Hide rector and dean days. |
| `calendar_hide_registrations` | Hide registration periods. |
| `payments_show_accounts_tab` | Show the accounts tab in payments. |
| `eid_show_user_id` | Show the user ID in eID. |
| `usos_mail_show_extra_tabs` | Show extra USOSmail tabs. |
| `map_show_building_id` | Show building IDs on the map. |
| `news_no_faculties_tab` | Hide the “My Faculties” news tab. |
| `enforce_biometric_for_staff` | Require biometric authentication for staff. |
| `enforce_biometric_for_all` | Require biometric authentication for everyone. |

All display and security switches are `boolean`.

Authentication: none.

### `getNow()`

Returns the current installation-local datetime exactly as supplied by USOS.

```ts
getNow(): Promise<string>
```

The value has this form:

```text
yyyy-mm-dd hh:mm:ss.dddddd
```

It intentionally has no timezone offset. The wrapper does not convert it to a
JavaScript `Date`, because doing so in a process running in another timezone
would produce an incorrect instant. OAuth signatures use the standard Unix
system timestamp independently of this endpoint.

Authentication: none.

---

## ATTENDANCE

ATTENDANCE creates, reads, updates, and deletes attendance lists and student
attendance entries.

Every endpoint in this module is currently BETA and may change incompatibly.
Every request requires:

- a Consumer Key;
- an Access Token;
- the `staff_perspective` scope;
- HTTPS.

For that reason, attendance is exposed on the authenticated `User` client, not
the unauthenticated `Server` client:

```ts
import { User } from "./src"

const user = new User(
  "apps.usos.uj.edu.pl",
  process.env.USOS_CONSUMER_KEY!,
  process.env.USOS_CONSUMER_SECRET!,
  accessToken.oauth_token,
  accessToken.oauth_token_secret,
)
```

### Shared return fields

An `AttendanceEntry` can contain:

| Field | Type | Description |
| --- | --- | --- |
| `student` | `Record<string, unknown>` | Selected fields from the corresponding USOS user object. |
| `attendance_mode` | `AttendanceMode \| null` | Recorded attendance, or `null` when it has not been set. |
| `comment` | `string \| null` | Lecturer comment, or `null`. |

`AttendanceMode` is:

```ts
type AttendanceMode =
  | "intramural"
  | "remote"
  | "justified_absence"
  | "absence"
```

An `AttendanceList` can contain:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string \| number` | Attendance-list ID. |
| `course_unit` | `Record<string, unknown>` | Selected fields from the corresponding course-unit object. |
| `group_number` | `number` | Class-group number. |
| `owner` | `Record<string, unknown>` | Selected fields from the owner user object. |
| `date` | `string` | Meeting datetime in USOS datetime format. |
| `mode` | `MeetingMode` | Mode in which the meeting is conducted. |

`MeetingMode` is:

```ts
type MeetingMode = "intramural" | "remote" | "hybrid"
```

Fields are optional because selector-based endpoints only return requested
fields.

### `getAttendance(options)`

Returns student entries for one attendance list.

```ts
getAttendance({
  listId: string | number
  studentIds?: readonly (string | number)[]
  fields?: readonly AttendanceEntryFields[]
}): Promise<AttendanceEntry[]>
```

`studentIds` filters the result. Without it, USOS returns entries for all
students on the list. The default upstream fields are `student` and
`attendance_mode`. Nested user selectors such as
`student[id|first_name|last_name]` are also accepted.

### `getAttendanceList(listId, fields?)`

Returns one attendance list.

```ts
getAttendanceList(
  listId: string | number,
  fields?: readonly AttendanceListFields[],
): Promise<AttendanceList>
```

The default upstream field is `id`. A missing list produces the USOS
`object_not_found` error with reason `attendance_list_not_found`.

### `getAttendanceLists(listIds, fields?)`

Returns multiple attendance lists in one request.

```ts
getAttendanceLists(
  listIds: readonly (string | number)[],
  fields?: readonly AttendanceListFields[],
): Promise<Record<string, AttendanceList | null>>
```

The response keys are the requested IDs. USOS maps an unknown ID to `null`
instead of failing the entire request.

### `changeListMode(listId, mode)`

Changes the meeting mode of an attendance list.

```ts
changeListMode(
  listId: string | number,
  mode: MeetingMode,
): Promise<Record<string, never>>
```

The list must not contain attendance entries. USOS otherwise returns
`object_invalid` with reason `has_entries`.

### `createAttendanceList(options)`

Creates one attendance list for a class-group meeting.

```ts
createAttendanceList({
  courseUnitId: string
  groupNumber: number
  date: string
  mode: MeetingMode
}): Promise<{ list_id: string | number }>
```

`date` must be a USOS datetime string. Possible USOS error reasons include
`already_exists`, `no_students`, and `group_not_found`.

### `createFromTimetable(options)`

Creates attendance lists from the class group's timetable meetings.

```ts
createFromTimetable({
  courseUnitId: string
  groupNumber: number
  defaultMode: MeetingMode
}): Promise<Record<string, never>>
```

Possible USOS error reasons include `no_students`, `group_not_found`, and
`meeting_not_found`.

### `deleteAttendanceList(listId)`

Deletes a list that has no attendance entries.

```ts
deleteAttendanceList(
  listId: string | number,
): Promise<Record<string, never>>
```

USOS returns `has_entries` when the list is not empty and
`attendance_list_not_found` when it does not exist.

### `getGroupAttendanceLists(options)`

Returns attendance lists belonging to one class group.

```ts
getGroupAttendanceLists({
  courseUnitId: string
  groupNumber: number
  fields?: readonly AttendanceListFields[]
}): Promise<AttendanceList[]>
```

The default upstream field is `id`.

### `updateAttendance(options)`

Sets one student's attendance entry.

```ts
updateAttendance({
  listId: string | number
  studentId: string | number
  attendanceMode: AttendanceMode
  comment?: string
}): Promise<Record<string, never>>
```

Passing `comment: ""` is preserved and can be used to clear a comment. Possible
USOS error reasons include `intramural_attendance_not_allowed`,
`remote_attendance_not_allowed`, `student_not_in_group`, and
`attendance_list_not_found`.

### `getUserAttendanceLists(fields?)`

Returns all attendance lists available to the authenticated user.

```ts
getUserAttendanceLists(
  fields?: readonly AttendanceListFields[],
): Promise<AttendanceList[]>
```

The default upstream field is `id`.

---

## OAUTH

USOS uses three-legged OAuth 1.0a. The normal flow is:

```ts
const requestToken = await usos.oauth.getRequestToken(
  "https://example.com/auth/usos/callback",
  ["personal", "email"],
)

const authorizeUrl = usos.oauth.getAuthorizeUrl(
  requestToken.oauth_token,
  "confirm_user",
)

// Redirect the user's browser to authorizeUrl.
// Read oauth_verifier from the callback request.

const accessToken = await usos.oauth.getAccessToken(
  requestToken.oauth_token,
  requestToken.oauth_token_secret,
  oauthVerifier,
)
```

Store token secrets only on a trusted server. Never expose the Consumer Secret,
Request Token Secret, or Access Token Secret in browser code or logs.

### `getRequestToken(callback, scopes?)`

Creates a short-lived, unauthorized Request Token.

```ts
getRequestToken(
  callback: string,
  scopes?: RequestTokenScopes[],
): Promise<REQUEST_TOKEN>
```

Parameters:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `callback` | `string` | yes | Callback URI, or `"oob"` for a manual PIN flow. |
| `scopes` | `RequestTokenScopes[]` | no | Permissions requested from the user. |

Return fields:

| Field | Type | Description |
| --- | --- | --- |
| `oauth_token` | `string` | Request Token used in the authorization URL. |
| `oauth_token_secret` | `string` | Secret used when exchanging the token. |
| `oauth_callback_confirmed` | `boolean` | Whether the callback was accepted. |

The USOS response is form-encoded. The wrapper parses it into an object and
ignores unknown response parameters for forward compatibility.

### `getAuthorizeUrl(requestToken, interactivity?)`

Builds the browser URL where the user authorizes the Request Token. This method
does not perform an HTTP request.

```ts
getAuthorizeUrl(
  requestToken: string,
  interactivity?: "minimal" | "confirm_user",
): string
```

| Interactivity | Behavior |
| --- | --- |
| `minimal` | Reuses the signed-in user and existing consent where possible. This is the USOS default. |
| `confirm_user` | Lets the user confirm or change the signed-in account. Prefer this on shared devices. |

After authorization, the callback receives:

| Field | Type | Description |
| --- | --- | --- |
| `oauth_token` | `string` | The authorized Request Token. |
| `oauth_verifier` | `string` | Verifier/PIN required by `getAccessToken`. |

### `getAccessToken(requestToken, requestTokenSecret, verifier)`

Exchanges an authorized Request Token for a reusable Access Token.

```ts
getAccessToken(
  requestToken: string,
  requestTokenSecret: string,
  verifier: string,
): Promise<ACCESS_TOKEN>
```

Return fields:

| Field | Type | Description |
| --- | --- | --- |
| `oauth_token` | `string` | Access Token identifying the authorization. |
| `oauth_token_secret` | `string` | Secret used to sign authorized requests. |

The USOS response is form-encoded. Unknown response parameters are ignored.

### `proxy(module, method, parameters?, scopes?, accessToken?, accessTokenSecret?)`

Calls another USOS method with deliberately reduced permissions.

```ts
proxy<M extends Module, K extends keyof M>(
  module: M,
  method: K,
  parameters?: RequestFor<M, K>,
  scopes?: RequestTokenScopes[] | "all",
  accessToken?: string,
  accessTokenSecret?: string,
): Promise<ResponseFor<M, K>>
```

Parameters:

| Parameter | Required | Description |
| --- | --- | --- |
| `module` | yes | Endpoint enum containing the target method. |
| `method` | yes | Target endpoint key. |
| `parameters` | no | Parameters forwarded to the target method. Arrays are serialized with `|`. |
| `scopes` | no | Scope ceiling for this call, or `"all"`. |
| `accessToken` | no | User Access Token. Required when applying user scopes unless an administrative user context is used. |
| `accessTokenSecret` | no | Secret paired with `accessToken`. |

The return value is the underlying method's response. The proxy cannot call
administrative methods, and it must be protected against CSRF when exposed by a
web application.

### OAuth scopes

`RequestTokenScopes` currently includes:

```text
adm_documents
cards
change_all_preferences
crstests
dorm_admin
edit_user_attrs
email
events
grades
grades_write
mailclient
mobile_numbers
offline_access
other_emails
payments
personal
photo
placement_tests
session_debugging_perms
slips
slips_admin
staff_perspective
student_exams
student_exams_write
studies
surveys_filling
surveys_reports
theses_protocols_write
```

Scope availability varies by installation. Check `usos.apiref.getScopes()` at
runtime.

### OAuth endpoints not wrapped yet

The `OAUTH` enum and interfaces describe these official endpoints, but the
`OAuth` class does not currently expose methods for them:

| Endpoint | Parameters | Return value |
| --- | --- | --- |
| `services/oauth/revoke_consumer_key` | Optional `consumer_key`, `consumer_secret`, and callback/format fields | `{ success: true }` |
| `services/oauth/revoke_token` | Optional `deauthorize` boolean; request must be signed with the token being revoked | `{ success: true }` |

---

## Wrapper design rules

These rules should guide new modules so the wrapper stays predictable:

1. **Keep the wire contract separate from convenience behavior.** A raw endpoint
   type should describe exactly what USOS sends. Conversions such as datetime to
   Unix seconds should be explicit helpers or clearly documented wrapper
   behavior.
2. **Use one options object when a method has several optional arguments.** It
   avoids positional calls such as `proxy(..., undefined, undefined, token,
   secret)` and allows backward-compatible additions.
3. **Model selectors in the return type.** A field-selecting method should
   eventually return `Pick<Response, F[number]>`, so fields not requested are not
   presented as definitely available.
4. **Represent nullability accurately.** Optional means a field may be omitted;
   `null` means USOS returned the field with no value. These are different API
   states.
5. **Centralize serialization.** Arrays, booleans, dates, JSON parameters,
   field selectors, and form-encoded responses should be handled by shared
   transport utilities rather than repeated in each module.
6. **Use structured errors.** Expose status, endpoint, response body, and parsed
   USOS error information in an error class instead of throwing only a formatted
   `Error` string.
7. **Treat installation differences as normal.** Do not assume the newest mother
   server documentation is supported everywhere. Use `machine_version`,
   `getScopes()`, and feature flags for capability checks.
8. **Keep secrets out of public state.** Consumer and token secrets should remain
   private, must not be serialized, and should never appear in error messages.
9. **Export the complete supported public surface.** Every client class, response
   type, selector type, error type, and installation helper intended for users
   should be exported from the package entry point.
10. **Test transport contracts, not the live mother server.** Use recorded or
    mocked responses for deterministic unit tests, plus a small opt-in
    integration suite against an actual university installation.

## Remaining contract gaps

These are documentation-visible differences between the official API and the
current TypeScript implementation:

- The revoke endpoints exist in the `OAUTH` enum and request/response maps but
  have no `OAuth` class methods.
- Attendance `student`, `owner`, and `course_unit` objects are currently typed as
  `Record<string, unknown>`. They can be replaced with shared user and course
  types when those modules are implemented.

## Official references

- [USOS API installations](https://apps.usos.edu.pl/developers/api/definitions/installations/)
- [APIREF module](https://apps.usos.edu.pl/developers/api/services/apiref/)
- [APISRV module](https://apps.usos.edu.pl/developers/api/services/apisrv/)
- [ATTENDANCE module](https://apps.usos.edu.pl/developers/api/services/attendance/)
- [OAUTH module](https://apps.usos.edu.pl/developers/api/services/oauth/)
