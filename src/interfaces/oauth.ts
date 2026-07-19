// List of methods for OAuth endpoint module
export enum OAUTH {
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



// !!! TODO 
// Do it later it's too retarded
export interface PROXY {
}



/** /developers/api/services/oauth/#request_token */
export interface REQUEST_TOKEN {
    oauth_callback: "oob" | string | URL
    scopes?: RequestTokenScopes[]
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