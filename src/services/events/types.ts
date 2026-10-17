import type { AccessTokenCredentials } from '@/core/auth'

export type EventId = string | number

export type EventSubscriptionType = "crstests/user_grade" | "crstests/user_point" | "grades/grade" | (string & {})

export type EventsEmptyResult = Record<string, never>

export interface EventNotifierStatus {
    daemon_running: boolean
    total_pending_events_count: number
}

export interface FcmRegistration {
    instance_id?: string
    instance_name?: string
    fcm_registration_token?: string
    last_success?: string | null
}

export interface EventSubscription {
    id?: string
    event_type?: EventSubscriptionType
    callback_url?: string
}

export interface CreatedEventSubscription {
    id: string
}

export type EventsNotifierStatusParams = Record<string, never>

export interface EventsNotifierStatusOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface EventsRegisterFcmTokenParams {
    fcm_registration_token: string
    instance_id?: string
    instance_name?: string
}

export interface EventsRegisterFcmTokenOptions {
    fcmRegistrationToken: string
    instanceId?: string
    instanceName?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type EventsRegisteredFcmTokensField = "instance_id" | "instance_name" | "fcm_registration_token" | "last_success" | `${string}[${string}]`

export interface EventsRegisteredFcmTokensParams {
    fields?: readonly EventsRegisteredFcmTokensField[]
}

export interface EventsRegisteredFcmTokensOptions {
    fields?: readonly EventsRegisteredFcmTokensField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface EventsSubscribeEventParams {
    event_type: EventSubscriptionType
    callback_url: string
    verify_token?: string
}

export interface EventsSubscribeEventOptions {
    eventType: EventSubscriptionType
    callbackUrl: string
    verifyToken?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type EventsSubscriptionsField = "id" | "event_type" | "callback_url" | `${string}[${string}]`

export interface EventsSubscriptionsParams {
    fields?: readonly EventsSubscriptionsField[]
}

export interface EventsSubscriptionsOptions {
    fields?: readonly EventsSubscriptionsField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface EventsTestMyFcmParams {
    message: string
}

export interface EventsTestMyFcmOptions {
    message: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface EventsUnsubscribeParams {
    id?: string | number
    event_type?: EventSubscriptionType
    callback_url?: string
}

export interface EventsUnsubscribeOptions {
    id?: string | number
    eventType?: EventSubscriptionType
    callbackUrl?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
