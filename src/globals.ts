export type Scheme = 
    | 'https://apps.usos.uj.edu.pl'    // Jagiellonian University
    | 'https://usosapps.uw.edu.pl'     // Warsaw University
    | 'https://usosapps.uni.wroc.pl';  // Wrocław University

export type Scopes =
    | 'adm_documents'
    | 'cards'
    | 'change_all_preferences'
    | 'crstests'
    | 'dorm_admin'
    | 'edit_user_attrs'
    | 'email'
    | 'events'
    | 'grades'
    | 'grades_write'
    | 'mailclient'
    | 'mobile_numbers'
    | 'offline_access'
    | 'other_emails'
    | 'payments'
    | 'personal'
    | 'photo'
    | 'placement_tests'
    | 'session_debugging_perms'
    | 'slips'
    | 'slips_admin'
    | 'staff_perspective'
    | 'student_exams'
    | 'student_exams_write'
    | 'studies'
    | 'surveys_filling'
    | 'surveys_reports'
    | 'theses_protocols_write';

    
export const enum Methods {
    ACCESS_TOKEN =  "/services/oauth/access_token",
    AUTHORIZE = "/services/oauth/authorize",
    REQUEST_TOKEN = "/services/oauth/request_token",
    REVOKE_CONSUMER_KEY = "/services/oauth/revoke_consumer_key",
    REVOKE_TOKEN =  "/services/oauth/revoke_token",
}