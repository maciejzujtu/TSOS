import type { AccessTokenCredentials } from '@/core/auth'
import type { Language } from '@/types/common'

/** The USOS API may return additional installation-specific fields. */
export interface ThesesAuthorshipPreferenceParams {
    "user_ids": readonly (string | number)[]
}

export interface ThesesAuthorshipPreferenceOptions {
    userIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesExamReportFields = "id" | "name" | "status" | "theses" | `${string}[${string}]`
export interface ThesesExamReportResult {
    "id"?: unknown
    "name"?: unknown
    "status"?: unknown
    "theses"?: unknown
}

export interface ThesesExamReportParams {
    "report_id": string | number
    "fields"?: readonly ThesesExamReportFields[]
}

export interface ThesesExamReportOptions {
    reportId: string | number
    fields?: readonly ThesesExamReportFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesExamReportsFields = string

export interface ThesesExamReportsParams {
    "report_ids": readonly (string | number)[]
    "fields"?: readonly ThesesExamReportsFields[]
}

export interface ThesesExamReportsOptions {
    reportIds: readonly (string | number)[]
    fields?: readonly ThesesExamReportsFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesSearchFields = "items" | "next_page" | `${string}[${string}]`
export interface ThesesSearchResult {
    "items"?: unknown
    "next_page"?: unknown
}

export interface ThesesSearchParams {
    "lang": Language
    "fields"?: readonly ThesesSearchFields[]
    "query"?: string
    "type"?: string | readonly string[]
    "fac_ids"?: readonly (string | number)[]
    "num"?: number
    "start"?: number
}

export interface ThesesSearchOptions {
    lang: Language
    fields?: readonly ThesesSearchFields[]
    query?: string
    type?: string | readonly string[]
    facIds?: readonly (string | number)[]
    num?: number
    start?: number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface ThesesSearchHistoryAffectParams {
    "ths_id": string | number
}

export interface ThesesSearchHistoryAffectOptions {
    thsId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface ThesesSignReportParams {
    "report_id": string | number
}

export interface ThesesSignReportOptions {
    reportId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesSignableReportsFields = string

export interface ThesesSignableReportsParams {
    "fields"?: readonly ThesesSignableReportsFields[]
}

export interface ThesesSignableReportsOptions {
    fields?: readonly ThesesSignableReportsFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesThesesFields = string

export interface ThesesThesesParams {
    "ths_ids": readonly (string | number)[]
    "fields": readonly ThesesThesesFields[]
}

export interface ThesesThesesOptions {
    thsIds: readonly (string | number)[]
    fields: readonly ThesesThesesFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesThesisFields = "id" | "type" | "title" | "titles" | "language" | "authors" | "supervisors" | "faculty" | `${string}[${string}]`
export interface ThesesThesisResult {
    "id"?: unknown
    "type"?: unknown
    "title"?: unknown
    "titles"?: unknown
    "language"?: unknown
    "authors"?: unknown
    "supervisors"?: unknown
    "faculty"?: unknown
}

export interface ThesesThesisParams {
    "ths_id": string | number
    "fields"?: readonly ThesesThesisFields[]
}

export interface ThesesThesisOptions {
    thsId: string | number
    fields?: readonly ThesesThesisFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesUserFields = "authored_theses" | `${string}[${string}]`
export interface ThesesUserResult {
    "authored_theses"?: unknown
}

export interface ThesesUserParams {
    "user_id": string | number
    "fields": readonly ThesesUserFields[]
}

export interface ThesesUserOptions {
    userId: string | number
    fields: readonly ThesesUserFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ThesesUsersFields = string

export interface ThesesUsersParams {
    "user_ids": readonly (string | number)[]
    "fields": readonly ThesesUsersFields[]
}

export interface ThesesUsersOptions {
    userIds: readonly (string | number)[]
    fields: readonly ThesesUsersFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
