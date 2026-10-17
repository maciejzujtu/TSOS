import type { EndpointDefinition } from '@/core/endpoint'
import type * as T from '@/services/events/types'

export interface EventsEndpoints {
    notifierStatus: EndpointDefinition<T.EventsNotifierStatusParams, T.EventNotifierStatus>
    registerFcmToken: EndpointDefinition<T.EventsRegisterFcmTokenParams, T.EventsEmptyResult>
    registeredFcmTokens: EndpointDefinition<T.EventsRegisteredFcmTokensParams, T.FcmRegistration[]>
    subscribeEvent: EndpointDefinition<T.EventsSubscribeEventParams, T.CreatedEventSubscription>
    subscriptions: EndpointDefinition<T.EventsSubscriptionsParams, T.EventSubscription[]>
    testMyFcm: EndpointDefinition<T.EventsTestMyFcmParams, T.EventsEmptyResult>
    unsubscribe: EndpointDefinition<T.EventsUnsubscribeParams, T.EventsEmptyResult>
}

export const eventsEndpoints: EventsEndpoints = {
    notifierStatus: {
        path: "services/events/notifier_status",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: true,
        },
    },
    registerFcmToken: {
        path: "services/events/register_fcm_token",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    registeredFcmTokens: {
        path: "services/events/registered_fcm_tokens",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    subscribeEvent: {
        path: "services/events/subscribe_event",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            sslRequired: true,
        },
    },
    subscriptions: {
        path: "services/events/subscriptions",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            sslRequired: true,
        },
    },
    testMyFcm: {
        path: "services/events/test_my_fcm",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    unsubscribe: {
        path: "services/events/unsubscribe",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            sslRequired: true,
        },
    },
}
