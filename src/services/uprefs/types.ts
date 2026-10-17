import type { AccessTokenCredentials } from '@/core/auth'
import type { LangDict } from '@/types/common'

export type UprefValue = string | number | boolean | null | Readonly<Record<string, unknown>> | readonly unknown[]

export interface UprefListItem {
    value?: string
    title?: LangDict
    summary?: LangDict | null
    [key: string]: unknown
}

export interface UprefPreference {
    id?: string
    type?: "textbox" | "checkbox" | "list" | "group" | (string & {})
    title?: LangDict
    summary?: LangDict | string | null
    enabled?: boolean
    value?: UprefValue
    list_items?: UprefListItem[] | null
    entries?: UprefPreference[]
}

export interface UprefChangeResult {
    success: boolean
    user_messages?: unknown[]
}

export type UprefPreferences = Record<string, UprefPreference | null>

export type UprefValues = Record<string, UprefValue>

export interface UprefsChangePreferenceParams {
    upref_id: string
    value: string | number | boolean
}

export interface UprefsChangePreferenceOptions {
    uprefId: string
    value: string | number | boolean
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type UprefsPreferenceField = "id" | "type" | "title" | "summary" | "enabled" | "value" | "list_items" | "entries" | `${string}[${string}]`

export interface UprefsPreferenceParams {
    upref_id: string
    fields: readonly UprefsPreferenceField[]
    preferred_types?: readonly string[]
}

export interface UprefsPreferenceOptions {
    uprefId: string
    fields: readonly UprefsPreferenceField[]
    preferredTypes?: readonly string[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type UprefsPreferencesField = keyof UprefPreference | `${string}[${string}]`

export interface UprefsPreferencesParams {
    upref_ids: readonly (string | number)[]
    fields: readonly UprefsPreferencesField[]
    preferred_types?: readonly string[]
}

export interface UprefsPreferencesOptions {
    uprefIds: readonly (string | number)[]
    fields: readonly UprefsPreferencesField[]
    preferredTypes?: readonly string[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface UprefsValuesParams {
    upref_id: string
    user_ids: readonly (string | number)[]
}

export interface UprefsValuesOptions {
    uprefId: string
    userIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
