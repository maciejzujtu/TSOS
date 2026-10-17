import assert from "node:assert/strict"
import test from "node:test"
import {
    EventsService, Events2Service, NewsService, UprefsService, PhotosService, PhonesService,
    eventsEndpoints, events2Endpoints, newsEndpoints, uprefsEndpoints, photosEndpoints, phonesEndpoints,
    UsosApiError, UsosAuthenticationError, UsosClient,
} from "@"
import type { EndpointDefinition } from "@"
import type { RequestExecutor, RequestOptions } from "@"

class Recorder implements RequestExecutor {
    readonly baseUrl = new URL("https://apps.usos.uj.edu.pl")
    calls: Array<{ path: string; params?: unknown; body?: BodyInit; token?: unknown }> = []
    async request<P, R>(endpoint: EndpointDefinition<P, R>, options: RequestOptions<P> = {}): Promise<R> {
        this.calls.push({ path: endpoint.path, params: options.params, body: options.body, token: options.token })
        return undefined as R
    }
}

const endpoints = { events: eventsEndpoints, events2: events2Endpoints, news: newsEndpoints, uprefs: uprefsEndpoints, photos: photosEndpoints, phones: phonesEndpoints }
const expected = {
    "events": [
        {
            "key": "notifierStatus",
            "path": "services/events/notifier_status",
            "method": "GET",
            "response": "json",
            "consumer": "ignored",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "registerFcmToken",
            "path": "services/events/register_fcm_token",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "registeredFcmTokens",
            "path": "services/events/registered_fcm_tokens",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "subscribeEvent",
            "path": "services/events/subscribe_event",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "subscriptions",
            "path": "services/events/subscriptions",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "testMyFcm",
            "path": "services/events/test_my_fcm",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "unsubscribe",
            "path": "services/events/unsubscribe",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        }
    ],
    "events2": [
        {
            "key": "addRecipient",
            "path": "services/events2/add_recipient",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": [
                "events"
            ]
        },
        {
            "key": "deleteRecipient",
            "path": "services/events2/delete_recipient",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": [
                "events"
            ]
        },
        {
            "key": "deleteStatement",
            "path": "services/events2/delete_statement",
            "method": "POST",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "distributionChannel",
            "path": "services/events2/distribution_channel",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "eventChannel",
            "path": "services/events2/event_channel",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "eventChannelPreference",
            "path": "services/events2/event_channel_preference",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": [
                "events"
            ]
        },
        {
            "key": "eventPreference",
            "path": "services/events2/event_preference",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": [
                "events"
            ]
        },
        {
            "key": "eventType",
            "path": "services/events2/event_type",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "eventTypeSchedule",
            "path": "services/events2/event_type_schedule",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "eventTypesIndex",
            "path": "services/events2/event_types_index",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "generateOneTimeCode",
            "path": "services/events2/generate_one_time_code",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "generateOneTimeCode2",
            "path": "services/events2/generate_one_time_code2",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "latestNotifications",
            "path": "services/events2/latest_notifications",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": [
                "events"
            ]
        },
        {
            "key": "notificationChannelsIndex",
            "path": "services/events2/notification_channels_index",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "notificationsSchedule",
            "path": "services/events2/notifications_schedule",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "notificationsScheduleIndex",
            "path": "services/events2/notifications_schedule_index",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "personalizedStatements",
            "path": "services/events2/personalized_statements",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "searchStatements",
            "path": "services/events2/search_statements",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "sendNotification",
            "path": "services/events2/send_notification",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": true,
            "scopes": []
        },
        {
            "key": "statement",
            "path": "services/events2/statement",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "updateEventChannel",
            "path": "services/events2/update_event_channel",
            "method": "POST",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "updateEventSchedule",
            "path": "services/events2/update_event_schedule",
            "method": "POST",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "updateEventType",
            "path": "services/events2/update_event_type",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "updateStatement",
            "path": "services/events2/update_statement",
            "method": "POST",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "updateUserPreference",
            "path": "services/events2/update_user_preference",
            "method": "POST",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "userPreferences",
            "path": "services/events2/user_preferences",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": [
                "events"
            ]
        },
        {
            "key": "validateOneTimeCode",
            "path": "services/events2/validate_one_time_code",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        }
    ],
    "news": [
        {
            "key": "article",
            "path": "services/news/article",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "optional",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "articles",
            "path": "services/news/articles",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "optional",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "categoryIndex",
            "path": "services/news/category_index",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "optional",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "search",
            "path": "services/news/search",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "optional",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        }
    ],
    "uprefs": [
        {
            "key": "changePreference",
            "path": "services/uprefs/change_preference",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": [
                "change_all_preferences"
            ]
        },
        {
            "key": "preference",
            "path": "services/uprefs/preference",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "preferences",
            "path": "services/uprefs/preferences",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "values",
            "path": "services/uprefs/values",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": false,
            "administrativeOnly": true,
            "scopes": []
        }
    ],
    "photos": [
        {
            "key": "canSeePhoto",
            "path": "services/photos/can_see_photo",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "deletePhoto",
            "path": "services/photos/delete_photo",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": false,
            "administrativeOnly": true,
            "scopes": []
        },
        {
            "key": "myPhotoVisibility",
            "path": "services/photos/my_photo_visibility",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": [
                "photo"
            ]
        },
        {
            "key": "photo",
            "path": "services/photos/photo",
            "method": "GET",
            "response": "arrayBuffer",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "settings",
            "path": "services/photos/settings",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": false,
            "administrativeOnly": true,
            "scopes": []
        },
        {
            "key": "updatePhoto",
            "path": "services/photos/update_photo",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "required",
            "sslRequired": false,
            "administrativeOnly": true,
            "scopes": []
        }
    ],
    "phones": [
        {
            "key": "phoneNumber",
            "path": "services/phones/phone_number",
            "method": "GET",
            "response": "json",
            "consumer": "optional",
            "token": "optional",
            "sslRequired": false,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "phoneType",
            "path": "services/phones/phone_type",
            "method": "GET",
            "response": "json",
            "consumer": "ignored",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": false,
            "scopes": []
        },
        {
            "key": "replace",
            "path": "services/phones/replace",
            "method": "POST",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": true,
            "scopes": []
        },
        {
            "key": "select",
            "path": "services/phones/select",
            "method": "GET",
            "response": "json",
            "consumer": "required",
            "token": "ignored",
            "sslRequired": true,
            "administrativeOnly": true,
            "scopes": []
        }
    ]
} as const

test("v0.5 defines all 52 published UJ endpoints with their auth requirements", () => {
    let total = 0
    for (const [moduleName, entries] of Object.entries(expected)) {
        const definitions = endpoints[moduleName as keyof typeof endpoints] as unknown as Record<string, EndpointDefinition<unknown, unknown>>
        assert.deepEqual(Object.keys(definitions).sort(), entries.map(entry => entry.key).sort())
        for (const entry of entries) {
            const endpoint = definitions[entry.key]
            assert.ok(endpoint, entry.path)
            assert.equal(endpoint.path, entry.path)
            assert.equal(endpoint.method, entry.method)
            assert.equal(endpoint.response, entry.response)
            assert.equal(endpoint.auth.consumer, entry.consumer)
            assert.equal(endpoint.auth.token, entry.token)
            assert.equal(endpoint.auth.sslRequired, entry.sslRequired)
            assert.equal(endpoint.auth.administrativeOnly ?? false, entry.administrativeOnly)
            assert.deepEqual(endpoint.auth.scopes ?? [], entry.scopes)
            total++
        }
    }
    assert.equal(total, 52)
})

const photoBlob = new Blob([new Uint8Array([1, 2, 3])], { type: "image/png" })
const calls = [
    {
        "service": "events",
        "method": "getNotifierStatus",
        "path": "services/events/notifier_status",
        "options": {},
        "params": {}
    },
    {
        "service": "events",
        "method": "registerFcmToken",
        "path": "services/events/register_fcm_token",
        "options": {
            "fcmRegistrationToken": "item-1"
        },
        "params": {
            "fcm_registration_token": "item-1"
        }
    },
    {
        "service": "events",
        "method": "getRegisteredFcmTokens",
        "path": "services/events/registered_fcm_tokens",
        "options": {},
        "params": {}
    },
    {
        "service": "events",
        "method": "subscribeEvent",
        "path": "services/events/subscribe_event",
        "options": {
            "eventType": "item-1",
            "callbackUrl": "item-1"
        },
        "params": {
            "event_type": "item-1",
            "callback_url": "item-1"
        }
    },
    {
        "service": "events",
        "method": "getSubscriptions",
        "path": "services/events/subscriptions",
        "options": {},
        "params": {}
    },
    {
        "service": "events",
        "method": "testMyFcm",
        "path": "services/events/test_my_fcm",
        "options": {
            "message": "item-1"
        },
        "params": {
            "message": "item-1"
        }
    },
    {
        "service": "events",
        "method": "unsubscribe",
        "path": "services/events/unsubscribe",
        "options": {
            "id": "item-1"
        },
        "params": {
            "id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "addRecipient",
        "path": "services/events2/add_recipient",
        "options": {
            "statementId": "item-1",
            "userId": "item-1"
        },
        "params": {
            "statement_id": "item-1",
            "user_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "deleteRecipient",
        "path": "services/events2/delete_recipient",
        "options": {
            "statementId": "item-1",
            "userId": "item-1"
        },
        "params": {
            "statement_id": "item-1",
            "user_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "deleteStatement",
        "path": "services/events2/delete_statement",
        "options": {
            "id": "item-1"
        },
        "params": {
            "id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getDistributionChannel",
        "path": "services/events2/distribution_channel",
        "options": {
            "id": "item-1"
        },
        "params": {
            "id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getEventChannel",
        "path": "services/events2/event_channel",
        "options": {
            "eventTypeId": "item-1",
            "channelId": "item-1"
        },
        "params": {
            "event_type_id": "item-1",
            "channel_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getEventChannelPreference",
        "path": "services/events2/event_channel_preference",
        "options": {
            "eventChannelId": "item-1"
        },
        "params": {
            "event_channel_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getEventPreference",
        "path": "services/events2/event_preference",
        "options": {
            "eventChannelId": "item-1"
        },
        "params": {
            "event_channel_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getEventType",
        "path": "services/events2/event_type",
        "options": {
            "id": "item-1"
        },
        "params": {
            "id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getEventTypeSchedule",
        "path": "services/events2/event_type_schedule",
        "options": {
            "eventTypeScheduleId": "item-1"
        },
        "params": {
            "event_type_schedule_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getEventTypesIndex",
        "path": "services/events2/event_types_index",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "generateOneTimeCode",
        "path": "services/events2/generate_one_time_code",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "generateOneTimeCode2",
        "path": "services/events2/generate_one_time_code2",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "getLatestNotifications",
        "path": "services/events2/latest_notifications",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "getNotificationChannelsIndex",
        "path": "services/events2/notification_channels_index",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "getNotificationsSchedule",
        "path": "services/events2/notifications_schedule",
        "options": {
            "scheduleId": "item-1"
        },
        "params": {
            "schedule_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getNotificationsScheduleIndex",
        "path": "services/events2/notifications_schedule_index",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "getPersonalizedStatements",
        "path": "services/events2/personalized_statements",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "searchStatements",
        "path": "services/events2/search_statements",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "sendNotification",
        "path": "services/events2/send_notification",
        "options": {
            "messagePl": "item-1",
            "userId": "item-1"
        },
        "params": {
            "message_pl": "item-1",
            "user_id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "getStatement",
        "path": "services/events2/statement",
        "options": {
            "id": "item-1"
        },
        "params": {
            "id": "item-1"
        }
    },
    {
        "service": "events2",
        "method": "updateEventChannel",
        "path": "services/events2/update_event_channel",
        "options": {
            "body": {
                "id": "item-1"
            }
        },
        "params": {}
    },
    {
        "service": "events2",
        "method": "updateEventSchedule",
        "path": "services/events2/update_event_schedule",
        "options": {
            "body": {
                "id": "item-1"
            }
        },
        "params": {}
    },
    {
        "service": "events2",
        "method": "updateEventType",
        "path": "services/events2/update_event_type",
        "options": {
            "body": {
                "id": "item-1"
            }
        },
        "params": {}
    },
    {
        "service": "events2",
        "method": "updateStatement",
        "path": "services/events2/update_statement",
        "options": {
            "body": {
                "id": "item-1"
            }
        },
        "params": {}
    },
    {
        "service": "events2",
        "method": "updateUserPreference",
        "path": "services/events2/update_user_preference",
        "options": {
            "body": {
                "id": "item-1"
            }
        },
        "params": {}
    },
    {
        "service": "events2",
        "method": "getUserPreferences",
        "path": "services/events2/user_preferences",
        "options": {},
        "params": {}
    },
    {
        "service": "events2",
        "method": "validateOneTimeCode",
        "path": "services/events2/validate_one_time_code",
        "options": {
            "id": "item-1",
            "code": "item-1"
        },
        "params": {
            "id": "item-1",
            "code": "item-1"
        }
    },
    {
        "service": "news",
        "method": "getArticle",
        "path": "services/news/article",
        "options": {
            "articleId": "item-1"
        },
        "params": {
            "article_id": "item-1"
        }
    },
    {
        "service": "news",
        "method": "getArticles",
        "path": "services/news/articles",
        "options": {
            "articleIds": [
                "one",
                "two"
            ]
        },
        "params": {
            "article_ids": [
                "one",
                "two"
            ]
        }
    },
    {
        "service": "news",
        "method": "getCategoryIndex",
        "path": "services/news/category_index",
        "options": {},
        "params": {}
    },
    {
        "service": "news",
        "method": "search",
        "path": "services/news/search",
        "options": {},
        "params": {}
    },
    {
        "service": "uprefs",
        "method": "changePreference",
        "path": "services/uprefs/change_preference",
        "options": {
            "uprefId": "item-1",
            "value": "enabled"
        },
        "params": {
            "upref_id": "item-1",
            "value": "enabled"
        }
    },
    {
        "service": "uprefs",
        "method": "getPreference",
        "path": "services/uprefs/preference",
        "options": {
            "uprefId": "item-1",
            "fields": [
                "id"
            ]
        },
        "params": {
            "upref_id": "item-1",
            "fields": [
                "id"
            ]
        }
    },
    {
        "service": "uprefs",
        "method": "getPreferences",
        "path": "services/uprefs/preferences",
        "options": {
            "uprefIds": [
                "one",
                "two"
            ],
            "fields": [
                "id"
            ]
        },
        "params": {
            "upref_ids": [
                "one",
                "two"
            ],
            "fields": [
                "id"
            ]
        }
    },
    {
        "service": "uprefs",
        "method": "getValues",
        "path": "services/uprefs/values",
        "options": {
            "uprefId": "item-1",
            "userIds": [
                "one",
                "two"
            ]
        },
        "params": {
            "upref_id": "item-1",
            "user_ids": [
                "one",
                "two"
            ]
        }
    },
    {
        "service": "photos",
        "method": "canSeePhoto",
        "path": "services/photos/can_see_photo",
        "options": {},
        "params": {}
    },
    {
        "service": "photos",
        "method": "deletePhoto",
        "path": "services/photos/delete_photo",
        "options": {},
        "params": {}
    },
    {
        "service": "photos",
        "method": "getMyPhotoVisibility",
        "path": "services/photos/my_photo_visibility",
        "options": {},
        "params": {}
    },
    {
        "service": "photos",
        "method": "getPhoto",
        "path": "services/photos/photo",
        "options": {},
        "params": {}
    },
    {
        "service": "photos",
        "method": "getSettings",
        "path": "services/photos/settings",
        "options": {},
        "params": {}
    },
    {
        "service": "photos",
        "method": "updatePhoto",
        "path": "services/photos/update_photo",
        "options": {
            "photo": photoBlob
        },
        "params": {}
    },
    {
        "service": "phones",
        "method": "getPhoneNumber",
        "path": "services/phones/phone_number",
        "options": {
            "phoneId": "item-1"
        },
        "params": {
            "phone_id": "item-1"
        }
    },
    {
        "service": "phones",
        "method": "getPhoneType",
        "path": "services/phones/phone_type",
        "options": {
            "id": "item-1"
        },
        "params": {
            "id": "item-1"
        }
    },
    {
        "service": "phones",
        "method": "replace",
        "path": "services/phones/replace",
        "options": {
            "data": [
                {
                    "number": "+48 123 456 789"
                }
            ],
            "facId": "item-1"
        },
        "params": {
            "data": "[{\"number\":\"+48 123 456 789\"}]",
            "fac_id": "item-1"
        }
    },
    {
        "service": "phones",
        "method": "select",
        "path": "services/phones/select",
        "options": {},
        "params": {}
    }
] as const

test("every v0.5 public service method dispatches its documented endpoint", async () => {
    const recorder = new Recorder()
    const services: Record<string, Record<string, (options: object) => Promise<unknown>>> = {
        events: new EventsService(recorder) as unknown as Record<string, (options: object) => Promise<unknown>>,
        events2: new Events2Service(recorder) as unknown as Record<string, (options: object) => Promise<unknown>>,
        news: new NewsService(recorder) as unknown as Record<string, (options: object) => Promise<unknown>>,
        uprefs: new UprefsService(recorder) as unknown as Record<string, (options: object) => Promise<unknown>>,
        photos: new PhotosService(recorder) as unknown as Record<string, (options: object) => Promise<unknown>>,
        phones: new PhonesService(recorder) as unknown as Record<string, (options: object) => Promise<unknown>>,
    }
    for (const entry of calls) {
        const service = services[entry.service]
        assert.ok(service)
        const method = service[entry.method]
        assert.equal(typeof method, "function", entry.path)
        await method.call(service, entry.options)
        const call = recorder.calls.at(-1)
        assert.equal(call?.path, entry.path)
        const sent = Object.fromEntries(Object.entries((call?.params ?? {}) as Record<string, unknown>).filter(([, value]) => value !== undefined))
        assert.deepEqual(sent, entry.params)
    }
    assert.equal(recorder.calls.length, 52)
})

test("v0.5 sends JSON update bodies and multipart photo uploads", async () => {
    const sent: Array<{ url: URL; init: RequestInit }> = []
    const client = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "consumer", secret: "secret" },
        fetch: async (input, init = {}) => {
            sent.push({ url: new URL(input instanceof Request ? input.url : input), init })
            return new Response("{}", { status: 200 })
        },
    })

    await client.events2.updateStatement({ body: { id: 7, title: { pl: "Nowość" } } })
    const token = { token: "access", secret: "access-secret" }
    await client.asAdministrator().photos.updatePhoto({
        photo: new Blob(["photo-bytes"], { type: "image/jpeg" }),
        filename: "avatar.jpg",
        accessToken: token,
    })

    assert.equal(sent[0]?.init.method, "POST")
    assert.equal(sent[0]?.init.headers instanceof Headers && sent[0].init.headers.get("Content-Type"), "application/json")
    assert.deepEqual(JSON.parse(String(sent[0]?.init.body)), { id: 7, title: { pl: "Nowość" } })
    assert.equal(sent[1]?.init.method, "POST")
    assert.equal(sent[1]?.url.pathname, "/services/photos/update_photo")
    assert.ok(sent[1]?.init.body instanceof FormData)
    const uploaded = sent[1].init.body.get("photo")
    assert.ok(uploaded instanceof File)
    assert.equal(uploaded.name, "avatar.jpg")
    assert.equal(await uploaded.text(), "photo-bytes")
    assert.match(String((sent[1].init.headers as Headers).get("Authorization")), /oauth_token="access"/)
})

test("v0.5 returns binary photos and enforces protected endpoint auth", async () => {
    let dispatches = 0
    const fetchMock: typeof fetch = async (_input, init) => {
        dispatches++
        assert.equal((init?.headers as Headers).get("Accept"), "*/*")
        return new Response(new Uint8Array([3, 4, 5]), { status: 200 })
    }
    const anonymous = new UsosClient({ baseUrl: "https://apps.usos.uj.edu.pl", fetch: fetchMock })
    await assert.rejects(() => anonymous.news.getArticle({ articleId: 1 }), UsosAuthenticationError)
    await assert.rejects(() => anonymous.events.getRegisteredFcmTokens(), UsosAuthenticationError)
    assert.equal(dispatches, 0)

    const photo = await anonymous.photos.getPhoto({ userId: 12, blankPhoto: true })
    assert.deepEqual([...new Uint8Array(photo)], [3, 4, 5])
    assert.equal(dispatches, 1)
})

test("v0.5 validates ambiguous mutation arguments before dispatch", async () => {
    const recorder = new Recorder()
    await assert.rejects(() => new EventsService(recorder).unsubscribe(), TypeError)
    await assert.rejects(() => new Events2Service(recorder).sendNotification({ messagePl: "x" }), TypeError)
    await assert.rejects(() => new Events2Service(recorder).sendNotification({ messagePl: "x", userIds: [] }), TypeError)
    await assert.rejects(() => new PhonesService(recorder).replace({ data: [{ number: "123" }] }), TypeError)
    await assert.rejects(() => new PhotosService(recorder).getPhoto({ transform: true }), TypeError)
    await assert.rejects(() => new PhotosService(recorder).getPhoto({ maxWidth: 1001 }), RangeError)
    await assert.rejects(() => new NewsService(recorder).getArticles({ articleIds: [] }), TypeError)
    await assert.rejects(() => new UprefsService(recorder).getPreferences({ uprefIds: [], fields: ["id"] }), TypeError)
    await assert.rejects(() => new UprefsService(recorder).getPreference({ uprefId: "x", fields: [] }), TypeError)
    await assert.rejects(() => new UprefsService(recorder).getPreferences({ uprefIds: ["x"], fields: [] }), TypeError)
    await assert.rejects(() => new UprefsService(recorder).getValues({ uprefId: "x", userIds: [] }), TypeError)
    assert.equal(recorder.calls.length, 0)
})

test("v0.5 mutations surface API failures without retrying", async () => {
    let dispatches = 0
    const client = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "consumer", secret: "secret" },
        fetch: async (_input, init) => {
            dispatches++
            assert.equal(init?.method, "POST")
            return new Response(JSON.stringify({ message: "failed" }), { status: 503 })
        },
    })
    await assert.rejects(() => client.events.unsubscribe({ id: "subscription-1" }), UsosApiError)
    assert.equal(dispatches, 1)
})
