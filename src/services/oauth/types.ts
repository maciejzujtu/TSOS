import type { AccessTokenCredentials } from '@/core/auth'

export type RequestTokenScope =
    | "adm_documents"
    | "cards"
    | "change_all_preferences"
    | "crstests"
    | "dorm_admin"
    | "edit_user_attrs"
    | "email"
    | "events"
    | "grades"
    | "grades_write"
    | "mailclient"
    | "mobile_numbers"
    | "offline_access"
    | "other_emails"
    | "payments"
    | "personal"
    | "photo"
    | "placement_tests"
    | "session_debugging_perms"
    | "slips"
    | "slips_admin"
    | "staff_perspective"
    | "student_exams"
    | "student_exams_write"
    | "studies"
    | "surveys_filling"
    | "surveys_reports"
    | "theses_protocols_write"

export type OAuthInteractivity = "minimal" | "confirm_user"

export interface OAuthRequestToken {
    oauth_token: string
    oauth_token_secret: string
    oauth_callback_confirmed: boolean
}

export interface OAuthAccessToken {
    oauth_token: string
    oauth_token_secret: string
}

export interface OAuthRequestTokenResponse {
    oauth_token: string
    oauth_token_secret: string
    oauth_callback_confirmed?: string
}

export interface OAuthAccessTokenResponse {
    oauth_token: string
    oauth_token_secret: string
}

export interface RequestTokenParams {
    oauth_callback: string
    scopes?: readonly RequestTokenScope[]
}

export interface AuthorizeParams {
    oauth_token: string
    interactivity?: OAuthInteractivity
}

export interface AccessTokenParams {
    oauth_verifier: string
}

export interface OAuthProxyParams {
    method: string
    parameters?: string
    scopes?: string
    as_user_id?: string
}

export interface OAuthProxyOptions<Parameters> {
    parameters?: Parameters
    scopes?: readonly RequestTokenScope[] | "all"
    asUserId?: string
    accessToken?: AccessTokenCredentials
}

export interface RevokeConsumerKeyOptions {
    consumerKey?: string
    consumerSecret?: string
    callback?: string
}

export interface RevokeConsumerKeyParams {
    consumer_key?: string
    consumer_secret?: string
    callback?: string
}

export interface RevokeTokenParams {
    deauthorize?: boolean
}

export interface OAuthSuccess {
    success: boolean
}
