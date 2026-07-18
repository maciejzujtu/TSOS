export type Base = 
    | 'apps.usos.uj.edu.pl'    // Jagiellonian University
    | 'uosapps.uw.edu.pl'     // Warsaw University
    | 'usosapps.uni.wroc.pl';  // Wrocław University

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