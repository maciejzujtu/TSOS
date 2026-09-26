import type { AccessTokenCredentials } from '@/core/auth'
import type { Language } from '@/types/common'

/** The USOS API may return additional installation-specific fields. */
export type Examrep2ClassGroupFields = "class_group" | "grades" | `${string}[${string}]`
export interface Examrep2ClassGroupResult {
    "class_group"?: unknown
    "grades"?: unknown
}

export interface Examrep2ClassGroupParams {
    "examrep_id": string | number
    "course_unit_id": string | number
    "group_number": number
    "fields": readonly Examrep2ClassGroupFields[]
}

export interface Examrep2ClassGroupOptions {
    examrepId: string | number
    courseUnitId: string | number
    groupNumber: number
    fields: readonly Examrep2ClassGroupFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2ExamineeFields = string

export interface Examrep2ExamineeParams {
    "user_id": string | number
    "fields"?: readonly Examrep2ExamineeFields[]
}

export interface Examrep2ExamineeOptions {
    userId: string | number
    fields?: readonly Examrep2ExamineeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2ExamrepFields = "id" | "description" | "counts_into_average" | "grade_type" | "is_general_report" | "sessions" | "edit_access" | "course_edition" | "course_unit" | "active_sessions" | `${string}[${string}]`
export interface Examrep2ExamrepResult {
    "id"?: unknown
    "description"?: unknown
    "counts_into_average"?: unknown
    "grade_type"?: unknown
    "is_general_report"?: unknown
    "sessions"?: unknown
    "edit_access"?: unknown
    "course_edition"?: unknown
    "course_unit"?: unknown
    "active_sessions"?: unknown
}

export interface Examrep2ExamrepParams {
    "examrep_id": string | number
    "fields"?: readonly Examrep2ExamrepFields[]
}

export interface Examrep2ExamrepOptions {
    examrepId: string | number
    fields?: readonly Examrep2ExamrepFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2ExamrepSessionFields = "examrep_id" | "number" | "status" | "description" | "deadline" | "is_open" | "is_acquisition_date_required" | "all_grades" | "issuer_grade" | "read_access" | "write_access" | `${string}[${string}]`
export interface Examrep2ExamrepSessionResult {
    "examrep_id"?: unknown
    "number"?: unknown
    "status"?: unknown
    "description"?: unknown
    "deadline"?: unknown
    "is_open"?: unknown
    "is_acquisition_date_required"?: unknown
    "all_grades"?: unknown
    "issuer_grade"?: unknown
    "read_access"?: unknown
    "write_access"?: unknown
}

export interface Examrep2ExamrepSessionParams {
    "examrep_id": string | number
    "examrep_session_number": number
    "fields"?: readonly Examrep2ExamrepSessionFields[]
}

export interface Examrep2ExamrepSessionOptions {
    examrepId: string | number
    examrepSessionNumber: number
    fields?: readonly Examrep2ExamrepSessionFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2ExamrepSessionAccessFields = "cause" | "groups" | "exam_groups" | "unassigned" | `${string}[${string}]`
export interface Examrep2ExamrepSessionAccessResult {
    "cause"?: unknown
    "groups"?: unknown
    "exam_groups"?: unknown
    "unassigned"?: unknown
}

export interface Examrep2ExamrepSessionAccessParams {
    "examrep_id": string | number
    "examrep_session_number": number
    "type": string | readonly string[]
    "fields"?: readonly Examrep2ExamrepSessionAccessFields[]
}

export interface Examrep2ExamrepSessionAccessOptions {
    examrepId: string | number
    examrepSessionNumber: number
    type: string | readonly string[]
    fields?: readonly Examrep2ExamrepSessionAccessFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2ExamrepTypeFields = "id" | "name" | "grade_type" | `${string}[${string}]`
export interface Examrep2ExamrepTypeResult {
    "id"?: unknown
    "name"?: unknown
    "grade_type"?: unknown
}

export interface Examrep2ExamrepTypeParams {
    "examrep_type_id": string | number
    "fields"?: readonly Examrep2ExamrepTypeFields[]
}

export interface Examrep2ExamrepTypeOptions {
    examrepTypeId: string | number
    fields?: readonly Examrep2ExamrepTypeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2GradeTypeFields = "id" | "name" | "values" | `${string}[${string}]`
export interface Examrep2GradeTypeResult {
    "id"?: unknown
    "name"?: unknown
    "values"?: unknown
}

export interface Examrep2GradeTypeParams {
    "grade_type_id": string | number
    "fields"?: readonly Examrep2GradeTypeFields[]
}

export interface Examrep2GradeTypeOptions {
    gradeTypeId: string | number
    fields?: readonly Examrep2GradeTypeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2GradeValueFields = "grade_type" | "order_key" | "symbol" | "passes" | "decimal_value" | "name" | `${string}[${string}]`
export interface Examrep2GradeValueResult {
    "grade_type"?: unknown
    "order_key"?: unknown
    "symbol"?: unknown
    "passes"?: unknown
    "decimal_value"?: unknown
    "name"?: unknown
}

export interface Examrep2GradeValueParams {
    "grade_type_id": string | number
    "order_key": string
    "fields"?: readonly Examrep2GradeValueFields[]
}

export interface Examrep2GradeValueOptions {
    gradeTypeId: string | number
    orderKey: string
    fields?: readonly Examrep2GradeValueFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2GraderFields = string

export interface Examrep2GraderParams {
    "only_writable"?: boolean
    "active_terms_only"?: boolean
    "fields"?: readonly Examrep2GraderFields[]
}

export interface Examrep2GraderOptions {
    onlyWritable?: boolean
    activeTermsOnly?: boolean
    fields?: readonly Examrep2GraderFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2StudentGradeFields = "grade_value" | "comment" | "private_comment" | "user" | "grader" | "last_updated" | "is_editable" | "resignation" | "inactive_links" | "why_cannot_edit" | "date_acquisition" | "examrep_session" | `${string}[${string}]`
export interface Examrep2StudentGradeResult {
    "grade_value"?: unknown
    "comment"?: unknown
    "private_comment"?: unknown
    "user"?: unknown
    "grader"?: unknown
    "last_updated"?: unknown
    "is_editable"?: unknown
    "resignation"?: unknown
    "inactive_links"?: unknown
    "why_cannot_edit"?: unknown
    "date_acquisition"?: unknown
    "examrep_session"?: unknown
}

export interface Examrep2StudentGradeParams {
    "examrep_id": string | number
    "examrep_session_number": number
    "student_id": string | number
    "fields"?: readonly Examrep2StudentGradeFields[]
}

export interface Examrep2StudentGradeOptions {
    examrepId: string | number
    examrepSessionNumber: number
    studentId: string | number
    fields?: readonly Examrep2StudentGradeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2StudentGradesFields = string

export interface Examrep2StudentGradesParams {
    "examrep_id": string | number
    "student_id": string | number
    "fields"?: readonly Examrep2StudentGradesFields[]
}

export interface Examrep2StudentGradesOptions {
    examrepId: string | number
    studentId: string | number
    fields?: readonly Examrep2StudentGradesFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface Examrep2UpdateStudentGradeParams {
    "student_id": string | number
    "examrep_id": string | number
    "examrep_session_number": number
    "value_symbol"?: string
    "comment"?: string
    "private_comment"?: string
    "date_modified"?: string
    "date_acquisition"?: string
}

export interface Examrep2UpdateStudentGradeOptions {
    studentId: string | number
    examrepId: string | number
    examrepSessionNumber: number
    valueSymbol?: string
    comment?: string
    privateComment?: string
    dateModified?: string
    dateAcquisition?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type Examrep2UserGradeFields = "grade_value" | "comment" | "user" | "grader" | "last_updated" | `${string}[${string}]`
export interface Examrep2UserGradeResult {
    "grade_value"?: unknown
    "comment"?: unknown
    "user"?: unknown
    "grader"?: unknown
    "last_updated"?: unknown
}

export interface Examrep2UserGradeParams {
    "examrep_id": string | number
    "examrep_session_number": number
    "fields"?: readonly Examrep2UserGradeFields[]
}

export interface Examrep2UserGradeOptions {
    examrepId: string | number
    examrepSessionNumber: number
    fields?: readonly Examrep2UserGradeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
