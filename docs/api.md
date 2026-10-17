# TSOS API Reference

This document describes the TSOS client, authentication models, errors, and supported modules. Detailed endpoint documentation is available on the [official USOS API website](https://apps.usos.uj.edu.pl/developers/api/).

## Table of contents

- [Conventions](#conventions)
- [Client classes](#client-classes)
- [Client configuration](#client-configuration)
- [Authentication model](#authentication-model)
- [Error model](#error-model)
- [v0.5 services](#v05-services)

## Conventions

- All service methods use `camelCase` TypeScript names and map parameters to the names required by USOS.
- Optional `fields` parameters are arrays of exported field-name union types. TSOS serializes them to USOS selectors.
- Identifiers accept the exported identifier type shown in the signature. Several USOS identifiers permit both strings and numbers.
- `GET` and `POST` below identify the underlying USOS method definition. TSOS performs request serialization and OAuth signing.
- Deprecated wrapper methods remain available for compatibility and are explicitly marked.

## Client classes

| Class | Construction | Authorization | Services |
| --- | --- | --- | --- |
| `UsosClient` | `new UsosClient(options)` | Anonymous or Consumer | `apiref`, `apisrv`, `calendar`, `courses`, `crstests`, `events`, `events2`, `examrep`, `examrep2`, `exams`, `fac`, `grades`, `groups`, `news`, `oauth`, `payments`, `phones`, `photos`, `progs`, `registrations`, `terms`, `theses`, `tt`, `uprefs`, `users` |
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

## v0.5 services

The six v0.5 services are properties of every client context. Each method takes a typed `options` object, including an optional `accessToken` override when the USOS method accepts a token. TSOS checks credential kind and HTTPS requirements before sending the request; USOS validates scopes and permissions. Field selectors are arrays and are serialized with USOS pipe syntax.

`photos.getPhoto()` returns an `ArrayBuffer`. `photos.updatePhoto()` accepts a `Blob` and an optional `filename`; USOS requires an Administrative Consumer and a user Access Token for the upload. The `events2.update*()` methods send `options.body` as JSON in the POST body. `phones.replace()` JSON encodes its `data` list. Mutations are never retried automatically.

The table below maps every new TSOS method to the [UJ USOS API reference](https://apps.usos.uj.edu.pl/developers/api/). `Consumer` means Consumer credentials are required; `Token` means a user Access Token is required; `Admin` means an Administrative Consumer is required.

| Service method | USOS method | HTTP | Auth |
| --- | --- | --- | --- |
| `client.events.getNotifierStatus()` | [`events/notifier_status`](https://apps.usos.uj.edu.pl/developers/api/services/events/#notifier_status) | GET | Public |
| `client.events.registerFcmToken()` | [`events/register_fcm_token`](https://apps.usos.uj.edu.pl/developers/api/services/events/#register_fcm_token) | POST | Consumer, Token |
| `client.events.getRegisteredFcmTokens()` | [`events/registered_fcm_tokens`](https://apps.usos.uj.edu.pl/developers/api/services/events/#registered_fcm_tokens) | GET | Consumer, Token |
| `client.events.subscribeEvent()` | [`events/subscribe_event`](https://apps.usos.uj.edu.pl/developers/api/services/events/#subscribe_event) | POST | Consumer |
| `client.events.getSubscriptions()` | [`events/subscriptions`](https://apps.usos.uj.edu.pl/developers/api/services/events/#subscriptions) | GET | Consumer |
| `client.events.testMyFcm()` | [`events/test_my_fcm`](https://apps.usos.uj.edu.pl/developers/api/services/events/#test_my_fcm) | POST | Consumer, Token |
| `client.events.unsubscribe()` | [`events/unsubscribe`](https://apps.usos.uj.edu.pl/developers/api/services/events/#unsubscribe) | POST | Consumer |
| `client.events2.addRecipient()` | [`events2/add_recipient`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#add_recipient) | POST | Consumer, Token, scope: events |
| `client.events2.deleteRecipient()` | [`events2/delete_recipient`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#delete_recipient) | POST | Consumer, Token, scope: events |
| `client.events2.deleteStatement()` | [`events2/delete_statement`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#delete_statement) | POST | Optional Consumer |
| `client.events2.getDistributionChannel()` | [`events2/distribution_channel`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#distribution_channel) | GET | Optional Consumer |
| `client.events2.getEventChannel()` | [`events2/event_channel`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#event_channel) | GET | Optional Consumer |
| `client.events2.getEventChannelPreference()` | [`events2/event_channel_preference`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#event_channel_preference) | GET | Consumer, Token, scope: events |
| `client.events2.getEventPreference()` | [`events2/event_preference`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#event_preference) | GET | Consumer, Token, scope: events |
| `client.events2.getEventType()` | [`events2/event_type`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#event_type) | GET | Optional Consumer |
| `client.events2.getEventTypeSchedule()` | [`events2/event_type_schedule`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#event_type_schedule) | GET | Optional Consumer |
| `client.events2.getEventTypesIndex()` | [`events2/event_types_index`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#event_types_index) | GET | Optional Consumer |
| `client.events2.generateOneTimeCode()` | [`events2/generate_one_time_code`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#generate_one_time_code) | POST | Consumer, Token |
| `client.events2.generateOneTimeCode2()` | [`events2/generate_one_time_code2`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#generate_one_time_code2) | POST | Consumer, Token |
| `client.events2.getLatestNotifications()` | [`events2/latest_notifications`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#latest_notifications) | GET | Consumer, Token, scope: events |
| `client.events2.getNotificationChannelsIndex()` | [`events2/notification_channels_index`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#notification_channels_index) | GET | Optional Consumer |
| `client.events2.getNotificationsSchedule()` | [`events2/notifications_schedule`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#notifications_schedule) | GET | Optional Consumer |
| `client.events2.getNotificationsScheduleIndex()` | [`events2/notifications_schedule_index`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#notifications_schedule_index) | GET | Optional Consumer |
| `client.events2.getPersonalizedStatements()` | [`events2/personalized_statements`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#personalized_statements) | GET | Optional Consumer |
| `client.events2.searchStatements()` | [`events2/search_statements`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#search_statements) | GET | Optional Consumer |
| `client.events2.sendNotification()` | [`events2/send_notification`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#send_notification) | POST | Admin |
| `client.events2.getStatement()` | [`events2/statement`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#statement) | GET | Optional Consumer |
| `client.events2.updateEventChannel()` | [`events2/update_event_channel`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#update_event_channel) | POST | Optional Consumer |
| `client.events2.updateEventSchedule()` | [`events2/update_event_schedule`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#update_event_schedule) | POST | Optional Consumer |
| `client.events2.updateEventType()` | [`events2/update_event_type`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#update_event_type) | POST | Consumer, Token |
| `client.events2.updateStatement()` | [`events2/update_statement`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#update_statement) | POST | Optional Consumer |
| `client.events2.updateUserPreference()` | [`events2/update_user_preference`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#update_user_preference) | POST | Optional Consumer |
| `client.events2.getUserPreferences()` | [`events2/user_preferences`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#user_preferences) | GET | Consumer, Token, scope: events |
| `client.events2.validateOneTimeCode()` | [`events2/validate_one_time_code`](https://apps.usos.uj.edu.pl/developers/api/services/events2/#validate_one_time_code) | POST | Consumer, Token |
| `client.news.getArticle()` | [`news/article`](https://apps.usos.uj.edu.pl/developers/api/services/news/#article) | GET | Consumer, optional Token |
| `client.news.getArticles()` | [`news/articles`](https://apps.usos.uj.edu.pl/developers/api/services/news/#articles) | GET | Consumer, optional Token |
| `client.news.getCategoryIndex()` | [`news/category_index`](https://apps.usos.uj.edu.pl/developers/api/services/news/#category_index) | GET | Consumer, optional Token |
| `client.news.search()` | [`news/search`](https://apps.usos.uj.edu.pl/developers/api/services/news/#search) | GET | Consumer, optional Token |
| `client.uprefs.changePreference()` | [`uprefs/change_preference`](https://apps.usos.uj.edu.pl/developers/api/services/uprefs/#change_preference) | POST | Consumer, Token, scope: change_all_preferences |
| `client.uprefs.getPreference()` | [`uprefs/preference`](https://apps.usos.uj.edu.pl/developers/api/services/uprefs/#preference) | GET | Consumer, Token |
| `client.uprefs.getPreferences()` | [`uprefs/preferences`](https://apps.usos.uj.edu.pl/developers/api/services/uprefs/#preferences) | GET | Consumer, optional Token |
| `client.uprefs.getValues()` | [`uprefs/values`](https://apps.usos.uj.edu.pl/developers/api/services/uprefs/#values) | GET | Admin |
| `client.photos.canSeePhoto()` | [`photos/can_see_photo`](https://apps.usos.uj.edu.pl/developers/api/services/photos/#can_see_photo) | GET | Optional Consumer |
| `client.photos.deletePhoto()` | [`photos/delete_photo`](https://apps.usos.uj.edu.pl/developers/api/services/photos/#delete_photo) | POST | Admin, Token |
| `client.photos.getMyPhotoVisibility()` | [`photos/my_photo_visibility`](https://apps.usos.uj.edu.pl/developers/api/services/photos/#my_photo_visibility) | GET | Consumer, Token, scope: photo |
| `client.photos.getPhoto()` | [`photos/photo`](https://apps.usos.uj.edu.pl/developers/api/services/photos/#photo) | GET | Optional Consumer |
| `client.photos.getSettings()` | [`photos/settings`](https://apps.usos.uj.edu.pl/developers/api/services/photos/#settings) | GET | Admin |
| `client.photos.updatePhoto()` | [`photos/update_photo`](https://apps.usos.uj.edu.pl/developers/api/services/photos/#update_photo) | POST | Admin, Token |
| `client.phones.getPhoneNumber()` | [`phones/phone_number`](https://apps.usos.uj.edu.pl/developers/api/services/phones/#phone_number) | GET | Optional Consumer |
| `client.phones.getPhoneType()` | [`phones/phone_type`](https://apps.usos.uj.edu.pl/developers/api/services/phones/#phone_type) | GET | Public |
| `client.phones.replace()` | [`phones/replace`](https://apps.usos.uj.edu.pl/developers/api/services/phones/#replace) | POST | Admin |
| `client.phones.select()` | [`phones/select`](https://apps.usos.uj.edu.pl/developers/api/services/phones/#select) | GET | Admin |
