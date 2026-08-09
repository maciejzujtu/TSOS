import type { Term } from '@/services/terms/types'
import type {
    CourseId,
    CourseUnitId,
    FacultyId,
    LangDict,
    Language,
    TermId,
    UserId,
} from '@/types/common'

export type ClassTypeId = string
export type PassingStatus = "passed" | "failed" | "not_yet_passed"

export interface ClassType {
    id?: ClassTypeId
    name?: LangDict
}

export interface CourseAttribute {
    name: LangDict
    values: LangDict[]
}

export interface CourseAttribute2 {
    name: LangDict
    values: unknown[]
}

export interface Course {
    id?: CourseId
    name?: LangDict
    homepage_url?: string | null
    profile_url?: string
    is_currently_conducted?: boolean
    terms?: Array<Pick<Term, "id">>
    fac_id?: FacultyId
    lang_id?: string | null
    ects_credits_simplified?: number | null
    description?: LangDict
    bibliography?: LangDict
    learning_outcomes?: LangDict
    assessment_criteria?: LangDict
    practical_placement?: LangDict
    attributes?: CourseAttribute[]
    attributes2?: CourseAttribute2[]
}

export type CourseFields =
    | keyof Course
    | `terms[${string}]`

export interface CoursePerson {
    id?: UserId
    first_name?: string
    middle_names?: string | null
    last_name?: string
    [field: string]: unknown
}

export interface LegacyCourseEdition {
    course_id?: CourseId
    course_name?: LangDict
    term_id?: TermId
    homepage_url?: string | null
    profile_url?: string | null
    coordinators?: CoursePerson[]
    lecturers?: CoursePerson[]
    passing_status?: PassingStatus
    user_groups?: Array<Record<string, unknown>>
    description?: LangDict
    bibliography?: LangDict
    notes?: LangDict
    course_units_ids?: CourseUnitId[]
    participants?: CoursePerson[]
    grades?: Array<Record<string, unknown>>
    attributes?: CourseAttribute[]
}

export type LegacyCourseEditionFields =
    | keyof LegacyCourseEdition
    | `coordinators[${string}]`
    | `lecturers[${string}]`
    | `user_groups[${string}]`
    | `participants[${string}]`
    | `grades[${string}]`

export interface CourseEdition {
    course?: Course
    term?: Term
    homepage_url?: string | null
    description?: LangDict
    bibliography?: LangDict
    notes?: LangDict
    course_units?: CourseUnit[]
}

export type CourseEditionFields =
    | Exclude<keyof CourseEdition, "course_units">
    | `course[${string}]`
    | `term[${string}]`
    | `course_units[${string}]`

export interface CourseUnit {
    id?: CourseUnitId
    homepage_url?: string | null
    profile_url?: string
    learning_outcomes?: LangDict
    assessment_criteria?: LangDict
    topics?: LangDict
    teaching_methods?: LangDict
    bibliography?: LangDict
    course_edition?: CourseEdition
    class_groups?: Array<Record<string, unknown>>
}

export type CourseUnitFields =
    | keyof CourseUnit
    | `course_edition[${string}]`
    | `class_groups[${string}]`

export interface LegacyCourseUnit {
    id?: CourseUnitId
    course_name?: LangDict
    course_id?: CourseId
    term_id?: TermId
    homepage_url?: string | null
    profile_url?: string
    classtype_id?: ClassTypeId
    learning_outcomes?: LangDict
    assessment_criteria?: LangDict
    topics?: LangDict
    teaching_methods?: LangDict
    bibliography?: LangDict
    groups?: Array<Record<string, unknown>>
}

export type LegacyCourseUnitFields =
    | keyof LegacyCourseUnit
    | `groups[${string}]`

export interface CourseSearchItem extends Course {
    course_id?: CourseId
    match?: string
}

export interface CourseSearchResult {
    items: CourseSearchItem[]
    next_page: boolean
}

export interface UserCourses {
    course_editions?: Record<TermId, LegacyCourseEdition[]>
    terms?: Term[]
}

export type UserCoursesFields =
    | "course_editions"
    | "terms"
    | `course_editions[${LegacyCourseEditionFields}]`
    | `terms[${string}]`

export type UserEctsPoints = Record<TermId, Record<CourseId, string | null>>

export interface CoordinatorCoursesOptions {
    userId?: UserId
    activeTermsOnly?: boolean
    fields?: readonly CourseEditionFields[]
}

export interface CourseEditionOptions {
    courseId: CourseId
    termId: TermId
    fields?: readonly LegacyCourseEditionFields[]
}

export interface CourseEdition2Options {
    courseId: CourseId
    termId: TermId
    fields?: readonly CourseEditionFields[]
}

export interface CourseRoleOptions {
    courseId: CourseId
    termId: TermId
    userId?: UserId
}

export interface SearchCoursesOptions {
    lang: Language
    name?: string
    fields?: readonly (CourseFields | "course_id" | "match")[]
    num?: number
    start?: number
    facultyId?: FacultyId
    facultyDeep?: boolean
}

export interface UserCoursesOptions {
    fields?: readonly UserCoursesFields[]
    activeTermsOnly?: boolean
}

export interface ClassTypeParams {
    id: ClassTypeId
}

export type CoursesEmptyParams = Record<string, never>

export interface CoordinatorParams {
    user_id?: UserId
    active_terms_only?: boolean
    fields?: readonly CourseEditionFields[]
}

export interface CourseParams {
    course_id: CourseId
    fields?: readonly CourseFields[]
}

export interface CourseEditionParams {
    course_id: CourseId
    term_id: TermId
    fields?: readonly LegacyCourseEditionFields[]
}

export interface CourseEdition2Params {
    course_id: CourseId
    term_id: TermId
    fields?: readonly CourseEditionFields[]
}

export interface CourseUnitParams {
    course_unit_id: CourseUnitId
    fields?: readonly CourseUnitFields[]
}

export interface CoursesParams {
    course_ids: readonly CourseId[]
    fields?: readonly CourseFields[]
}

export interface CourseRoleParams {
    course_id: CourseId
    term_id: TermId
    user_id?: UserId
}

export interface ParticipantParams {
    course_id: CourseId
    term_id: TermId
}

export interface SearchCoursesParams {
    lang: Language
    name?: string
    fields?: readonly (CourseFields | "course_id" | "match")[]
    num?: number
    start?: number
    fac_id?: FacultyId
    fac_deep?: boolean
}

export interface UnitParams {
    unit_id: CourseUnitId
    fields?: readonly LegacyCourseUnitFields[]
}

export interface UnitsParams {
    unit_ids: readonly CourseUnitId[]
    fields?: readonly LegacyCourseUnitFields[]
}

export interface UserCoursesParams {
    fields?: readonly UserCoursesFields[]
    active_terms_only?: boolean
}
