import type { CourseUnit } from '@/services/courses/types'
import type { Term } from '@/services/terms/types'
import type { User2 } from '@/services/users/types'
import type {
    CourseId,
    CourseUnitId,
    FacultyId,
    LangDict,
    Language,
    TermId,
    UserId,
} from '@/types/common'

export type GroupNumber = number
export type GroupRole = "participant" | "lecturer"

export interface GroupIdentifier {
    courseUnitId: CourseUnitId
    groupNumber: GroupNumber
}

export interface ClassGroup {
    course_unit_id?: CourseUnitId
    number?: GroupNumber
    url?: string | null
    description?: LangDict
    literature?: LangDict
    course_unit?: CourseUnit
    lecturers?: User2[]
    participants?: User2[]
}

export type ClassGroupFields =
    | keyof ClassGroup
    | `course_unit[${string}]`
    | `lecturers[${string}]`
    | `participants[${string}]`

export interface Group {
    course_unit_id?: CourseUnitId
    group_number?: GroupNumber
    class_type?: LangDict
    class_type_id?: string
    group_url?: string | null
    course_id?: CourseId
    course_name?: LangDict
    course_homepage_url?: string | null
    course_profile_url?: string | null
    course_is_currently_conducted?: boolean
    course_fac_id?: FacultyId
    course_lang_id?: string | null
    term_id?: TermId
    lecturers?: User2[]
    participants?: User2[]
    group_description?: LangDict
    group_literature?: LangDict
    course_learning_outcomes?: LangDict
    course_description?: LangDict
    course_bibliography?: LangDict
    course_assessment_criteria?: LangDict
    course_practical_placement?: LangDict
}

export type GroupFields =
    | keyof Group
    | `lecturers[${string}]`
    | `participants[${string}]`

export interface CommonGroup {
    group?: Group
    my_role?: GroupRole
    his_role?: GroupRole
}

export type CommonGroupFields =
    | keyof CommonGroup
    | `group[${string}]`

export interface GroupCollection<TGroup extends Group = Group> {
    groups: Record<TermId, TGroup[]>
    terms: Term[]
}

export interface UserGroup extends Group {
    relationship_type?: GroupRole
}

export type UserGroupCollection = GroupCollection<UserGroup>

export interface ClassGroupOptions extends GroupIdentifier {
    fields?: readonly ClassGroupFields[]
}

export interface CommonGroupsOptions {
    userId: UserId
    fields: readonly CommonGroupFields[]
}

export interface GroupOptions extends GroupIdentifier {
    fields: readonly GroupFields[]
}

export interface GroupsOptions {
    groups: readonly GroupIdentifier[]
    fields: readonly GroupFields[]
}

export interface GroupRoleOptions extends GroupIdentifier {
    userId?: UserId
}

export interface LecturerGroupsOptions {
    fields: readonly GroupFields[]
    userId?: UserId
    lang?: Language
    activeTerms?: boolean
}

export interface ParticipantGroupsOptions {
    fields: readonly GroupFields[]
    lang?: Language
    activeTerms?: boolean
}

export interface ClassGroupParams {
    course_unit_id: CourseUnitId
    group_number: GroupNumber
    fields?: readonly ClassGroupFields[]
}

export interface CommonGroupsParams {
    user_id: UserId
    fields: readonly CommonGroupFields[]
}

export interface GroupParams {
    course_unit_id: CourseUnitId
    group_number: GroupNumber
    fields: readonly GroupFields[]
}

export interface GroupsParams {
    group_ids: readonly string[]
    fields: readonly GroupFields[]
}

export interface GroupRoleParams {
    course_unit_id: CourseUnitId
    group_number: GroupNumber
    user_id?: UserId
}

export interface GroupParticipantParams {
    course_unit_id: CourseUnitId
    group_number: GroupNumber
}

export interface LecturerGroupsParams {
    fields: readonly GroupFields[]
    user_id?: UserId
    lang?: Language
    active_terms?: boolean
}

export interface ParticipantGroupsParams {
    fields: readonly GroupFields[]
    lang?: Language
    active_terms?: boolean
}

export function formatGroupIdentifier(group: GroupIdentifier): string {
    return `(${group.courseUnitId},${group.groupNumber})`
}
