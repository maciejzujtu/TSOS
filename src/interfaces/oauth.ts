// List of methods for OAuth endpoint module
export enum OAUTH {
    ROOT                = "services/oauth",
    ACCESS_TOKEN        = "services/oauth/access_token",
    AUTHORIZE           = "services/oauth/authorize",
    PROXY               = "services/oauth/proxy",
    REQUEST_TOKEN       = "services/oauth/request_token",
    REVOKE_CONSUMER_KEY = "services/oauth/revoke_consumer_key",
    REVOKE_TOKEN        = "services/oauth/revoke_token"
}


/** /developers/api/authorization/#scopes */
export type RequestTokenScopes =
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


/** /developers/api/services/oauth/#access_token */
export interface ACCESS_TOKEN {
    oauth_token: string
    oauth_token_secret: string
}

/** /developers/api/services/oauth/#proxy */
export interface PROXY {
    method: string
    parameters?: string | Record<string, any>
    scopes?: RequestTokenScopes[] | "all"
    as_user_id?: string
}

/** /developers/api/services/oauth/#request_token */
export interface REQUEST_TOKEN {
    oauth_token: string
    oauth_token_secret: string
    oauth_callback_confirmed?: boolean
}

/** /developers/api/services/oauth/#revoke_consumer_key */
export interface REVOKE_CONSUMER_KEY {
    consumer_key?: string
    consumer_secret?: string
    // format?: "json"
    callback?: string
}

/** /developers/api/services/oauth/#revoke_token */
export interface REVOKE_TOKEN {
    deauthorize?: boolean
}



// Mappings

export interface OAUTH_REQUEST {
    ACCESS_TOKEN:        { oauth_verifier: string }
    AUTHORIZE:           { oauth_token: string; interactivity?: "minimal" | "confirm_user" }
    PROXY:               PROXY
    REQUEST_TOKEN:       { oauth_callback: string; scopes?: string | RequestTokenScopes[] }
    REVOKE_CONSUMER_KEY: REVOKE_CONSUMER_KEY
    REVOKE_TOKEN:        REVOKE_TOKEN
}

export interface OAUTH_RESPONSE {
    ACCESS_TOKEN:        ACCESS_TOKEN
    REQUEST_TOKEN:       REQUEST_TOKEN
    AUTHORIZE:           never
    PROXY:               any
    REVOKE_CONSUMER_KEY: { success: boolean }
    REVOKE_TOKEN:        { success: boolean }
}

