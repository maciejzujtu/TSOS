import type { EndpointDefinition } from '@/core/endpoint'
import type * as T from '@/services/events2/types'

export interface Events2Endpoints {
    addRecipient: EndpointDefinition<T.Events2AddRecipientParams, T.Events2Recipients>
    deleteRecipient: EndpointDefinition<T.Events2DeleteRecipientParams, T.Events2Recipients>
    deleteStatement: EndpointDefinition<T.Events2DeleteStatementParams, T.Events2EmptyResult>
    distributionChannel: EndpointDefinition<T.Events2DistributionChannelParams, T.Events2DistributionChannel>
    eventChannel: EndpointDefinition<T.Events2EventChannelParams, T.Events2EventChannel>
    eventChannelPreference: EndpointDefinition<T.Events2EventChannelPreferenceParams, T.Events2EventChannelPreference>
    eventPreference: EndpointDefinition<T.Events2EventPreferenceParams, T.Events2EventPreference>
    eventType: EndpointDefinition<T.Events2EventTypeParams, T.Events2EventType>
    eventTypeSchedule: EndpointDefinition<T.Events2EventTypeScheduleParams, T.Events2EventTypeSchedule>
    eventTypesIndex: EndpointDefinition<T.Events2EventTypesIndexParams, T.Events2EventType[]>
    generateOneTimeCode: EndpointDefinition<T.Events2GenerateOneTimeCodeParams, T.Events2OneTimeCodeToken>
    generateOneTimeCode2: EndpointDefinition<T.Events2GenerateOneTimeCode2Params, T.Events2OneTimeCode>
    latestNotifications: EndpointDefinition<T.Events2LatestNotificationsParams, T.Events2Notification[]>
    notificationChannelsIndex: EndpointDefinition<T.Events2NotificationChannelsIndexParams, T.Events2NotificationChannel[]>
    notificationsSchedule: EndpointDefinition<T.Events2NotificationsScheduleParams, T.Events2NotificationSchedule>
    notificationsScheduleIndex: EndpointDefinition<T.Events2NotificationsScheduleIndexParams, T.Events2NotificationSchedule[]>
    personalizedStatements: EndpointDefinition<T.Events2PersonalizedStatementsParams, T.Events2Statement[]>
    searchStatements: EndpointDefinition<T.Events2SearchStatementsParams, T.Events2Statement[]>
    sendNotification: EndpointDefinition<T.Events2SendNotificationParams, T.Events2EmptyResult>
    statement: EndpointDefinition<T.Events2StatementParams, T.Events2Statement>
    updateEventChannel: EndpointDefinition<T.Events2UpdateEventChannelParams, T.Events2EmptyResult>
    updateEventSchedule: EndpointDefinition<T.Events2UpdateEventScheduleParams, T.Events2EmptyResult>
    updateEventType: EndpointDefinition<T.Events2UpdateEventTypeParams, T.Events2EmptyResult>
    updateStatement: EndpointDefinition<T.Events2UpdateStatementParams, T.Events2EmptyResult>
    updateUserPreference: EndpointDefinition<T.Events2UpdateUserPreferenceParams, T.Events2EmptyResult>
    userPreferences: EndpointDefinition<T.Events2UserPreferencesParams, T.Events2EventPreference[]>
    validateOneTimeCode: EndpointDefinition<T.Events2ValidateOneTimeCodeParams, T.Events2EmptyResult>
}

export const events2Endpoints: Events2Endpoints = {
    addRecipient: {
        path: "services/events2/add_recipient",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["events"],
        },
    },
    deleteRecipient: {
        path: "services/events2/delete_recipient",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["events"],
        },
    },
    deleteStatement: {
        path: "services/events2/delete_statement",
        method: "POST",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    distributionChannel: {
        path: "services/events2/distribution_channel",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    eventChannel: {
        path: "services/events2/event_channel",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    eventChannelPreference: {
        path: "services/events2/event_channel_preference",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["events"],
        },
    },
    eventPreference: {
        path: "services/events2/event_preference",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["events"],
        },
    },
    eventType: {
        path: "services/events2/event_type",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    eventTypeSchedule: {
        path: "services/events2/event_type_schedule",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    eventTypesIndex: {
        path: "services/events2/event_types_index",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    generateOneTimeCode: {
        path: "services/events2/generate_one_time_code",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    generateOneTimeCode2: {
        path: "services/events2/generate_one_time_code2",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    latestNotifications: {
        path: "services/events2/latest_notifications",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["events"],
        },
    },
    notificationChannelsIndex: {
        path: "services/events2/notification_channels_index",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    notificationsSchedule: {
        path: "services/events2/notifications_schedule",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    notificationsScheduleIndex: {
        path: "services/events2/notifications_schedule_index",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    personalizedStatements: {
        path: "services/events2/personalized_statements",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    searchStatements: {
        path: "services/events2/search_statements",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    sendNotification: {
        path: "services/events2/send_notification",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: true,
        },
    },
    statement: {
        path: "services/events2/statement",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    updateEventChannel: {
        path: "services/events2/update_event_channel",
        method: "POST",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    updateEventSchedule: {
        path: "services/events2/update_event_schedule",
        method: "POST",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    updateEventType: {
        path: "services/events2/update_event_type",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    updateStatement: {
        path: "services/events2/update_statement",
        method: "POST",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    updateUserPreference: {
        path: "services/events2/update_user_preference",
        method: "POST",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    userPreferences: {
        path: "services/events2/user_preferences",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["events"],
        },
    },
    validateOneTimeCode: {
        path: "services/events2/validate_one_time_code",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
}
