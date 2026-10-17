import type { AccessTokenCredentials } from '@/core/auth'
import type { LangDict } from '@/types/common'

export type Events2Id = string | number

export type Events2EmptyResult = Record<string, never>

export type Events2Recipients = Record<string, unknown>[]

export type Events2OneTimeCodeToken = string

export interface Events2DistributionChannel {
    id?: Events2Id
    event_type?: Events2EventType | null
    name?: LangDict
}

export interface Events2EventChannel {
    id?: Events2Id
    channel?: Events2DistributionChannel | null
    event_type?: Events2EventType | null
    is_enabled?: boolean
    is_mandatory?: boolean
    send_by_default?: boolean
    user_preferences?: Events2EventPreference[]
}

export interface Events2EventChannelPreference {
    is_enabled?: boolean
    schedule?: Events2NotificationSchedule | null
}

export interface Events2EventPreference {
    id?: Events2Id
    schedule?: Events2NotificationSchedule | null
    is_enabled?: boolean
    event_channel?: Events2EventChannel | null
}

export interface Events2EventType {
    id?: Events2Id
    name?: LangDict
    description?: LangDict
    is_enabled?: boolean
    is_mandatory?: boolean
    send_by_default?: boolean
    default_message?: LangDict | string | null
    channels?: Events2EventChannel[]
    schedules?: Events2EventTypeSchedule[]
}

export interface Events2EventTypeSchedule {
    id?: Events2Id
    schedule?: Events2NotificationSchedule | null
    is_enabled?: boolean
}

export interface Events2NotificationChannel {
    id?: Events2Id
    name?: LangDict
    description?: LangDict
}

export interface Events2NotificationSchedule {
    id?: Events2Id
    name?: LangDict
    days?: number
}

export interface Events2Statement {
    id?: Events2Id
    primary_group?: Record<string, unknown> | null
    title?: LangDict
    content?: LangDict
    is_calendar?: boolean
    location?: Record<string, unknown> | null
    start?: string | null
    end?: string | null
    send_after?: string | null
    sent_at?: string | null
    is_personal?: boolean
    statement_type?: "news" | "statement" | (string & {})
    recipients?: Record<string, unknown>[]
}

export interface Events2OneTimeCode {
    id: Events2Id
    message: string
}

export type Events2Notification = Record<string, unknown>

export interface Events2AddRecipientParams {
    statement_id: string | number
    user_id: string | number
}

export interface Events2AddRecipientOptions {
    statementId: string | number
    userId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface Events2DeleteRecipientParams {
    statement_id: string | number
    user_id: string | number
}

export interface Events2DeleteRecipientOptions {
    statementId: string | number
    userId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface Events2DeleteStatementParams {
    id: string | number
}

export interface Events2DeleteStatementOptions {
    id: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2DistributionChannelField = "id" | "event_type" | "name" | `${string}[${string}]`

export interface Events2DistributionChannelParams {
    id: string | number
    fields?: readonly Events2DistributionChannelField[]
}

export interface Events2DistributionChannelOptions {
    id: string | number
    fields?: readonly Events2DistributionChannelField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2EventChannelField = "id" | "channel" | "event_type" | "is_enabled" | "is_mandatory" | "send_by_default" | "user_preferences" | `${string}[${string}]`

export interface Events2EventChannelParams {
    event_type_id: string | number
    channel_id: string | number
    fields?: readonly Events2EventChannelField[]
}

export interface Events2EventChannelOptions {
    eventTypeId: string | number
    channelId: string | number
    fields?: readonly Events2EventChannelField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface Events2EventChannelPreferenceParams {
    event_channel_id: string | number
}

export interface Events2EventChannelPreferenceOptions {
    eventChannelId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2EventPreferenceField = "id" | "schedule" | "is_enabled" | "event_channel" | `${string}[${string}]`

export interface Events2EventPreferenceParams {
    event_channel_id: string | number
    fields?: readonly Events2EventPreferenceField[]
}

export interface Events2EventPreferenceOptions {
    eventChannelId: string | number
    fields?: readonly Events2EventPreferenceField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2EventTypeField = "id" | "name" | "description" | "is_enabled" | "is_mandatory" | "send_by_default" | "default_message" | "channels" | "schedules" | `${string}[${string}]`

export interface Events2EventTypeParams {
    id: string | number
    fields?: readonly Events2EventTypeField[]
}

export interface Events2EventTypeOptions {
    id: string | number
    fields?: readonly Events2EventTypeField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2EventTypeScheduleField = "id" | "schedule" | "is_enabled" | `${string}[${string}]`

export interface Events2EventTypeScheduleParams {
    event_type_schedule_id: string | number
    fields?: readonly Events2EventTypeScheduleField[]
}

export interface Events2EventTypeScheduleOptions {
    eventTypeScheduleId: string | number
    fields?: readonly Events2EventTypeScheduleField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2EventTypesIndexField = keyof Events2EventType | `${string}[${string}]`

export interface Events2EventTypesIndexParams {
    fields?: readonly Events2EventTypesIndexField[]
}

export interface Events2EventTypesIndexOptions {
    fields?: readonly Events2EventTypesIndexField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2GenerateOneTimeCodeParams = Record<string, never>

export interface Events2GenerateOneTimeCodeOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2GenerateOneTimeCode2Params = Record<string, never>

export interface Events2GenerateOneTimeCode2Options {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2LatestNotificationsParams = Record<string, never>

export interface Events2LatestNotificationsOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2NotificationChannelsIndexField = "id" | "name" | "description" | `${string}[${string}]`

export interface Events2NotificationChannelsIndexParams {
    fields?: readonly Events2NotificationChannelsIndexField[]
}

export interface Events2NotificationChannelsIndexOptions {
    fields?: readonly Events2NotificationChannelsIndexField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2NotificationsScheduleField = "id" | "name" | "days" | `${string}[${string}]`

export interface Events2NotificationsScheduleParams {
    schedule_id: string | number
    fields?: readonly Events2NotificationsScheduleField[]
}

export interface Events2NotificationsScheduleOptions {
    scheduleId: string | number
    fields?: readonly Events2NotificationsScheduleField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2NotificationsScheduleIndexField = keyof Events2NotificationSchedule | `${string}[${string}]`

export interface Events2NotificationsScheduleIndexParams {
    fields?: readonly Events2NotificationsScheduleIndexField[]
}

export interface Events2NotificationsScheduleIndexOptions {
    fields?: readonly Events2NotificationsScheduleIndexField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2PersonalizedStatementsField = keyof Events2Statement | `${string}[${string}]`

export interface Events2PersonalizedStatementsParams {
    fields?: readonly Events2PersonalizedStatementsField[]
}

export interface Events2PersonalizedStatementsOptions {
    fields?: readonly Events2PersonalizedStatementsField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2SearchStatementsField = keyof Events2Statement | `${string}[${string}]`

export interface Events2SearchStatementsParams {
    start?: number
    end?: string
    for_user?: boolean
    fields?: readonly Events2SearchStatementsField[]
}

export interface Events2SearchStatementsOptions {
    start?: number
    end?: string
    forUser?: boolean
    fields?: readonly Events2SearchStatementsField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface Events2SendNotificationParams {
    message_pl: string
    user_id?: string | number
    user_ids?: readonly (string | number)[]
    message_en?: string
    event_type_id?: string | number
    send_after?: string
    data?: Readonly<Record<string, unknown>>
}

export interface Events2SendNotificationOptions {
    messagePl: string
    userId?: string | number
    userIds?: readonly (string | number)[]
    messageEn?: string
    eventTypeId?: string | number
    sendAfter?: string
    data?: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2StatementField = "id" | "primary_group" | "title" | "content" | "is_calendar" | "location" | "start" | "end" | "send_after" | "sent_at" | "is_personal" | "statement_type" | "recipients" | `${string}[${string}]`

export interface Events2StatementParams {
    id: string | number
    fields?: readonly Events2StatementField[]
}

export interface Events2StatementOptions {
    id: string | number
    fields?: readonly Events2StatementField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2UpdateEventChannelParams = Record<string, never>

export interface Events2UpdateEventChannelOptions {
    body: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2UpdateEventScheduleParams = Record<string, never>

export interface Events2UpdateEventScheduleOptions {
    body: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2UpdateEventTypeParams = Record<string, never>

export interface Events2UpdateEventTypeOptions {
    body: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2UpdateStatementParams = Record<string, never>

export interface Events2UpdateStatementOptions {
    body: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2UpdateUserPreferenceParams = Record<string, never>

export interface Events2UpdateUserPreferenceOptions {
    body: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Events2UserPreferencesField = keyof Events2EventPreference | `${string}[${string}]`

export interface Events2UserPreferencesParams {
    fields?: readonly Events2UserPreferencesField[]
}

export interface Events2UserPreferencesOptions {
    fields?: readonly Events2UserPreferencesField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface Events2ValidateOneTimeCodeParams {
    id: string | number
    code: string
}

export interface Events2ValidateOneTimeCodeOptions {
    id: string | number
    code: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
