export interface Consumer {
    name?: string
    url?: string | null
    email?: string
    date_registered?: string
    administrative_methods?: string[]
    token_scopes?: string[] | null
    is_verified?: boolean
}

export interface Installation {
    base_url?: string
    version?: string
    machine_version?: string
    usos_schema_version?: string
    institution_name?: Record<string, string> | null
    institution?: Record<string, unknown>
    contact_emails?: string[]
    schac_id?: string
    mcards_support?: boolean
    mobile_usos_support?: boolean
}

export interface InstallationSummary {
    base_url?: string
    version?: string
    institution_name?: Record<string, string> | null
    contact_emails?: string[]
}

export interface MobileUsosConfig {
    contact_email?: string
    usosweb_domain?: string
    enable_grades?: boolean
    enable_examreps?: boolean
    enable_tests?: boolean
    enable_employee_tests?: boolean
    enable_timetable?: boolean
    enable_calendar?: boolean
    enable_groups?: boolean
    enable_student_surveys?: boolean
    enable_employee_surveys?: boolean
    enable_mcards?: boolean
    enable_eid?: boolean
    enable_payments?: boolean
    enable_guide?: boolean
    enable_news?: boolean
    enable_map?: boolean
    enable_buildings?: boolean
    enable_qr_scanner?: boolean
    enable_theses?: boolean
    enable_attendance?: boolean
    enable_administrative_docs?: boolean
    enable_registrations?: boolean
    calendar_hide_links?: boolean
    calendar_hide_exam_sessions?: boolean
    calendar_hide_breaks?: boolean
    calendar_hide_holidays?: boolean
    calendar_hide_rector_days?: boolean
    calendar_hide_registrations?: boolean
    payments_show_accounts_tab?: boolean
    eid_show_user_id?: boolean
    usos_mail_show_extra_tabs?: boolean
    map_show_building_id?: boolean
    news_no_faculties_tab?: boolean
    enforce_biometric_for_staff?: boolean
    enforce_biometric_for_all?: boolean
    nfc_salt?: string
}

export type ConsumerFields = keyof Consumer
export type InstallationFields = keyof Installation
export type MobileConfigFields = keyof MobileUsosConfig

export interface ConsumerParams {
    fields: readonly ConsumerFields[]
}

export interface InstallationParams {
    fields?: readonly InstallationFields[]
}

export interface MobileConfigParams {
    fields?: readonly MobileConfigFields[]
}

export type EmptyParams = Record<string, never>
