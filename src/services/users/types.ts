import type { Faculty } from '@/services/fac/types'
import type {
    FacultyId,
    LangDict,
    Language,
    SuccessResponse,
    UserId,
} from '@/types/common'

export type UserStatus = 0 | 1 | 2
export type UserSex = "M" | "F" | (string & {})
export type EmailAccess =
    | "no_email"
    | "no_access"
    | "require_captcha"
    | "plaintext"

export interface UserTitles {
    before: string | null
    after: string | null
}

export interface PreviousName {
    first_name: string
    last_name: string
    until: string
}

export interface CountryReference {
    id: string
}

export interface PostalAddress {
    type: "primary" | "residence" | "correspondence" | "other" | (string & {})
    type_name: LangDict
    address: string
}

export interface ExternalUserIds {
    orcid?: string | null
    pbn_id?: string | null
}

export interface BirthCertificateData {
    first_name?: string
    middle_names?: string | null
    last_name?: string
    sex?: UserSex
}

export type PhotoSize =
    | "50x50"
    | "100x100"
    | "100x125"
    | "200x200"
    | "200x250"
    | "400x400"
    | "400x500"
    | "original"

export interface User {
    id?: UserId
    first_name?: string
    middle_names?: string | null
    last_name?: string
    previous_names?: PreviousName[]
    sex?: UserSex
    titles?: UserTitles
    student_status?: UserStatus | null
    staff_status?: UserStatus
    email_access?: EmailAccess
    email?: string | null
    email_url?: string | null
    has_email?: boolean
    homepage_url?: string | null
    profile_url?: string
    phone_numbers?: string[]
    mobile_numbers?: string[]
    office_hours?: LangDict
    interests?: LangDict
    has_photo?: boolean
    photo_urls?: Partial<Record<PhotoSize, string>>
    student_number?: string | null
    pesel?: string | null
    birth_date?: string | null
    revenue_office_id?: string | null
    citizenship?: CountryReference | null
    room?: Record<string, unknown> | null
    student_programmes?: Array<Record<string, unknown>>
    employment_functions?: EmploymentFunction[]
    employment_positions?: EmploymentPosition[]
    course_editions_conducted?: Array<Record<string, unknown>>
    postal_addresses?: PostalAddress[]
    alt_email?: string | null
    can_i_debug?: boolean
    external_ids?: ExternalUserIds
    phd_student_status?: UserStatus | null
    library_card_id?: string | null
    birth_certificate_data?: BirthCertificateData | null
}

export type UserFields =
    | keyof User
    | `photo_urls[${string}]`
    | `room[${string}]`
    | `student_programmes[${string}]`
    | `employment_functions[${string}]`
    | `employment_positions[${string}]`
    | `external_ids[${string}]`

export interface User2 {
    id?: UserId
    first_name?: string
    student_number?: string | null
    middle_names?: string | null
    last_name?: string
    student_status?: UserStatus | null
    staff_status?: UserStatus
}

export type User2Fields = keyof User2

export interface EmploymentFunction {
    function?: LangDict
    faculty?: Pick<Faculty, "id" | "name">
    is_official?: boolean
}

export type EmploymentFunctionFields = keyof EmploymentFunction

export interface EmploymentGroup {
    id?: string
    name?: LangDict
    university_teachers?: boolean
}

export type EmploymentGroupFields = keyof EmploymentGroup

export interface EmploymentPosition {
    position?: Position
    faculty?: Pick<Faculty, "id" | "name">
}

export type EmploymentPositionFields =
    | keyof EmploymentPosition
    | `position[${string}]`

export interface Position {
    id?: string
    name?: LangDict
    employment_group?: EmploymentGroup
}

export type PositionFields =
    | keyof Position
    | `employment_group[${string}]`

export interface StudentProgrammeSummary {
    id: string
    name: LangDict
}

export interface LegacyUserSearchItem {
    user_id: UserId
    match: string
    active_student_programmes?: Array<Record<string, unknown>>
    active_employment_functions?: EmploymentFunction[]
}

export interface LegacyUserSearchResult {
    items: LegacyUserSearchItem[]
    next_page: boolean
}

export interface UserSearchItem {
    user?: User
    match?: string
}

export interface UserSearchResult {
    items?: UserSearchItem[]
    next_page?: boolean
}

export type UserSearchFields =
    | keyof UserSearchResult
    | `items[${string}]`

export interface UserIndexResult {
    users?: User[]
    next_page?: boolean
    total?: number
}

export type UserIndexFields =
    | keyof UserIndexResult
    | `users[${string}]`

export type SearchAmong =
    | "all"
    | "students"
    | "current_students"
    | "staff"
    | "current_staff"
    | "current_teachers"

export type IncludePast = boolean | "auto"

export interface ChangeUserOptions {
    userId?: UserId
    email?: string
    alternateEmail?: string
    homepageUrl?: string
    phoneNumbers?: readonly string[]
    mobileNumbers?: readonly string[]
    roomId?: string
    revenueOfficeId?: string
}

export interface EmploymentFunctionsOptions {
    userId?: UserId
    fields?: readonly EmploymentFunctionFields[]
    includePast?: IncludePast
}

export interface EmploymentPositionsOptions {
    userId?: UserId
    includePast?: boolean
    fields?: readonly EmploymentPositionFields[]
}

export interface LegacyUserSearchOptions {
    name?: string
    num?: number
    start?: number
}

export interface SearchUsersOptions {
    lang: Language
    fields?: readonly UserSearchFields[]
    query?: string
    among?: readonly SearchAmong[]
    num?: number
    start?: number
}

export interface StaffIndexOptions {
    facultyIds: readonly FacultyId[]
    teachersOnly?: boolean
    fields?: readonly UserIndexFields[]
    num?: number
    start?: number
}

export interface StudentIndexOptions {
    programmeIds?: readonly string[]
    countryId?: string
    fields?: readonly UserIndexFields[]
    num?: number
    start?: number
}

export interface ChangeUserParams {
    user_id?: UserId
    email?: string
    alt_email?: string
    homepage_url?: string
    phone_numbers?: readonly string[]
    mobile_numbers?: readonly string[]
    room_id?: string
    revenue_office_id?: string
}

export interface EmploymentFunctionsParams {
    user_id?: UserId
    fields?: readonly EmploymentFunctionFields[]
    include_past?: IncludePast
}

export interface EmploymentGroupParams {
    id: string
    fields?: readonly EmploymentGroupFields[]
}

export interface EmploymentGroupsIndexParams {
    fields?: readonly EmploymentGroupFields[]
}

export interface EmploymentPositionsParams {
    user_id?: UserId
    include_past?: boolean
    fields?: readonly EmploymentPositionFields[]
}

export interface PeselParams {
    pesel: string
    fields?: readonly UserFields[]
}

export type UsersEmptyParams = Record<string, never>

export interface PositionParams {
    id: string
    fields?: readonly PositionFields[]
}

export interface LegacyUserSearchParams {
    name?: string
    num?: number
    start?: number
}

export interface SearchUsersParams {
    lang: Language
    fields?: readonly UserSearchFields[]
    query?: string
    among?: readonly SearchAmong[]
    num?: number
    start?: number
}

export interface SearchByEmailParams {
    email: string
    fields?: readonly UserFields[]
}

export interface SearchHistoryAffectParams {
    user_id: UserId
}

export interface StaffIndexParams {
    fac_ids: readonly FacultyId[]
    teachers_only?: boolean
    fields?: readonly UserIndexFields[]
    num?: number
    start?: number
}

export interface StudentIndexParams {
    programme_ids?: readonly string[]
    country_id?: string
    fields?: readonly UserIndexFields[]
    num?: number
    start?: number
}

export interface UserParams {
    user_id?: UserId
    fields?: readonly UserFields[]
}

export interface User2Params {
    user_id?: UserId
    fields?: readonly User2Fields[]
}

export interface UsersParams {
    user_ids: readonly UserId[]
    fields?: readonly UserFields[]
}

export type ChangeUserResponse = SuccessResponse
export type SearchHistoryAffectResponse = SuccessResponse
