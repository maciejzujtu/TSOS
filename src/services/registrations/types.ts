import type {
    CourseId,
    FacultyId,
    LangDict,
    TermId,
    UsosId,
} from '@/types/common'

export type RegistrationId = string | number
export type RegistrationRoundId = string | number
export type RankingCode = string

export interface Registration {
    id?: RegistrationId
    description?: LangDict
    message?: LangDict
    type?: string
    status?: string
    faculty?: Record<string, unknown> | null
    is_linkage_required?: boolean
    www_instance?: string
    rounds?: RegistrationRound[]
    related_courses?: RegistrationCourse[]
}

export type RegistrationFields =
    | keyof Registration
    | `faculty[${string}]`
    | `rounds[${string}]`
    | `related_courses[${string}]`

export interface RegistrationCourse {
    registration_id?: RegistrationId
    course_id?: CourseId
    term_id?: TermId
    status?: string
    limits?: number | null
    www_instance?: string
}

export type RegistrationCourseFields = keyof RegistrationCourse

export interface Ranking {
    code?: RankingCode
    name?: LangDict
    description?: LangDict
    is_summary?: boolean
    course_group_flag?: string | null
    ranking_code?: string | null
    faculty?: Record<string, unknown> | null
    precision?: number | null
}

export type RankingFields = keyof Ranking | `faculty[${string}]`

export interface RegistrationRound {
    id?: RegistrationRoundId
    name?: LangDict
    status?: "active" | "preparing" | "closed" | (string & {})
    registration_mode?: string
    start_date?: string
    end_date?: string
    selection_limit?: number | null
    is_dedicated?: boolean
    is_overflow_allowed?: boolean
    is_exchange?: boolean
    is_only_entitled?: boolean
    rank_code?: string | null
    ranking?: Ranking | null
    is_processed?: boolean
    registration?: Registration
}

export type RegistrationRoundFields =
    | keyof RegistrationRound
    | `ranking[${string}]`
    | `registration[${string}]`

export interface RegistrationRoundCourse {
    course?: Record<string, unknown>
    term_id?: TermId
    status?: string
    limits?: number | null
    is_linkage_required?: boolean
    registrations_count?: number | null
    user_registration_status?: string | null
    user_choice_number?: number | null
    is_registration_valid?: boolean
}

export type RegistrationRoundCourseFields =
    | keyof RegistrationRoundCourse
    | `course[${string}]`

export interface CourseCartLink {
    programme?: Record<string, unknown>
    stage?: Record<string, unknown> | null
}

export interface CoursesCart {
    links?: CourseCartLink[]
    course?: Record<string, unknown>
    term?: Record<string, unknown>
    user_registration_status?: string | null
    is_registration_valid?: boolean | null
    choice_number?: number | null
    limits?: number | null
    is_linkage_required?: boolean | null
    registrations_count?: number | null
    registration_status?: string | null
    active_registration_round_id?: RegistrationRoundId | null
}

export type CoursesCartFields =
    | keyof CoursesCart
    | `links[${string}]`
    | `course[${string}]`
    | `term[${string}]`

export interface TokenRegistration {
    id?: RegistrationId
    description?: LangDict
    message?: LangDict
    status?: string
    faculty?: Record<string, unknown> | null
    is_linkage_required?: boolean
    short_description?: string
    rounds?: TokenRegistrationRound[]
    related_courses?: TokenRegistrationCourse[]
}

export type TokenRegistrationFields =
    | keyof TokenRegistration
    | `faculty[${string}]`
    | `rounds[${string}]`
    | `related_courses[${string}]`

export interface TokenRegistrationCourse {
    registration_id?: RegistrationId
    course_id?: CourseId
    term_id?: TermId
    status?: string
    limits?: number | null
    tst_code?: string | null
    lower_limit?: string | null
    start_date?: string | null
}

export type TokenRegistrationCourseFields = keyof TokenRegistrationCourse

export interface TokenRegistrationRound {
    id?: RegistrationRoundId
    name?: LangDict
    start_date?: string
    end_date?: string
    selection_limit?: number | null
    is_dedicated?: boolean
    is_exchange?: boolean
    is_only_entitled?: boolean
    micro_round_length?: number | null
    micro_break_length?: number | null
    is_prioritized?: boolean
    first_round_scale?: number | null
    registration?: TokenRegistration
}

export type TokenRegistrationRoundFields =
    | keyof TokenRegistrationRound
    | `registration[${string}]`

export interface CourseRegistrationRoundsParams {
    registration_id: RegistrationId
    fields?: readonly RegistrationRoundFields[]
}

export interface CoursesCartParams {
    fields?: readonly CoursesCartFields[]
}

export interface FacultyRegistrationsParams {
    faculty_id: FacultyId
    active_only?: boolean
    user_related?: boolean
    fields?: readonly RegistrationFields[]
}

export interface FacultyTokenRegistrationsParams {
    faculty_id: FacultyId
    active_only?: boolean
    user_related?: boolean
    fields?: readonly TokenRegistrationFields[]
}

export interface RankingParams {
    ranking_code: RankingCode
    fields?: readonly RankingFields[]
}

export interface RegisterParams {
    round_id: RegistrationRoundId
    course_id: CourseId
    term_id: TermId
    user_programme_id?: UsosId
    user_stage_id?: UsosId
}

export interface RegistrationParams {
    id: RegistrationId
    fields?: readonly RegistrationFields[]
}

export interface RegistrationCourseParams {
    registration_id: RegistrationId
    course_id: CourseId
    term_id: TermId
    fields?: readonly RegistrationCourseFields[]
}

export interface RegistrationRoundParams {
    id: RegistrationRoundId
    fields?: readonly RegistrationRoundFields[]
}

export interface RegistrationRoundCoursesParams {
    registration_round_id: RegistrationRoundId
    fields?: readonly RegistrationRoundCourseFields[]
}

export interface SearchRegistrationRoundsParams {
    start_date: string
    end_date: string
    faculty_id?: FacultyId
    user_related?: boolean
    fields?: readonly RegistrationRoundFields[]
}

export interface SearchTokenRegistrationRoundsParams {
    start_date: string
    end_date: string
    faculty_id?: FacultyId
    user_related?: boolean
    fields?: readonly TokenRegistrationRoundFields[]
}

export interface TokenRegistrationParams {
    id: RegistrationId
    fields?: readonly TokenRegistrationFields[]
}

export interface TokenRegistrationCourseParams {
    registration_id: RegistrationId
    course_id: CourseId
    term_id: TermId
    fields?: readonly TokenRegistrationCourseFields[]
}

export interface TokenRegistrationRoundParams {
    id: RegistrationRoundId
    fields?: readonly TokenRegistrationRoundFields[]
}

export interface UnregisterParams {
    round_id: RegistrationRoundId
    course_id: CourseId
    term_id: TermId
}

export interface UserRegistrationsParams {
    active_only?: boolean
    fields?: readonly RegistrationFields[]
}

export interface UserTokenRegistrationsParams {
    active_only?: boolean
    fields?: readonly TokenRegistrationFields[]
}

export interface FacultyRegistrationsOptions {
    facultyId: FacultyId
    activeOnly?: boolean
    userRelated?: boolean
    fields?: readonly RegistrationFields[]
}

export interface FacultyTokenRegistrationsOptions {
    facultyId: FacultyId
    activeOnly?: boolean
    userRelated?: boolean
    fields?: readonly TokenRegistrationFields[]
}

export interface RegisterOptions {
    roundId: RegistrationRoundId
    courseId: CourseId
    termId: TermId
    userProgrammeId?: UsosId
    userStageId?: UsosId
}

export interface RegistrationCourseOptions {
    registrationId: RegistrationId
    courseId: CourseId
    termId: TermId
    fields?: readonly RegistrationCourseFields[]
}

export interface SearchRegistrationRoundsOptions {
    startDate: string
    endDate: string
    facultyId?: FacultyId
    userRelated?: boolean
    fields?: readonly RegistrationRoundFields[]
}

export interface SearchTokenRegistrationRoundsOptions {
    startDate: string
    endDate: string
    facultyId?: FacultyId
    userRelated?: boolean
    fields?: readonly TokenRegistrationRoundFields[]
}

export interface TokenRegistrationCourseOptions {
    registrationId: RegistrationId
    courseId: CourseId
    termId: TermId
    fields?: readonly TokenRegistrationCourseFields[]
}

export interface UnregisterOptions {
    roundId: RegistrationRoundId
    courseId: CourseId
    termId: TermId
}

export interface UserRegistrationsOptions {
    activeOnly?: boolean
    fields?: readonly RegistrationFields[]
}

export interface UserTokenRegistrationsOptions {
    activeOnly?: boolean
    fields?: readonly TokenRegistrationFields[]
}

export type EmptyRegistrationResponse = Record<string, never>
