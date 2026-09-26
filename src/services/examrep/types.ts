import type { AccessTokenCredentials } from '@/core/auth'
import type { Language } from '@/types/common'

/** The USOS API may return additional installation-specific fields. */
export type ExamrepCourseEditionFields = "course_exam" | "course_units_exams" | `${string}[${string}]`
export interface ExamrepCourseEditionResult {
    "course_exam"?: unknown
    "course_units_exams"?: unknown
}

export interface ExamrepCourseEditionParams {
    "course_id": string | number
    "term_id": string | number
    "fields"?: readonly ExamrepCourseEditionFields[]
}

export interface ExamrepCourseEditionOptions {
    courseId: string | number
    termId: string | number
    fields?: readonly ExamrepCourseEditionFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ExamrepCourseEdition2Fields = "course_exams" | "course_units_exams" | `${string}[${string}]`
export interface ExamrepCourseEdition2Result {
    "course_exams"?: unknown
    "course_units_exams"?: unknown
}

export interface ExamrepCourseEdition2Params {
    "course_id": string | number
    "term_id": string | number
    "fields"?: readonly ExamrepCourseEdition2Fields[]
}

export interface ExamrepCourseEdition2Options {
    courseId: string | number
    termId: string | number
    fields?: readonly ExamrepCourseEdition2Fields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ExamrepExamFields = "id" | "description" | "type_id" | "type_description" | "counts_into_average" | "grade_type" | "term_id" | "is_editable" | "course_unit" | "course" | "sessions" | "grades_distribution" | `${string}[${string}]`
export interface ExamrepExamResult {
    "id"?: unknown
    "description"?: unknown
    "type_id"?: unknown
    "type_description"?: unknown
    "counts_into_average"?: unknown
    "grade_type"?: unknown
    "term_id"?: unknown
    "is_editable"?: unknown
    "course_unit"?: unknown
    "course"?: unknown
    "sessions"?: unknown
    "grades_distribution"?: unknown
}

export interface ExamrepExamParams {
    "id": string | number
    "fields"?: readonly ExamrepExamFields[]
}

export interface ExamrepExamOptions {
    id: string | number
    fields?: readonly ExamrepExamFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ExamrepExamSessionFields = "number" | "examrep_id" | "status" | "description" | "deadline" | "is_editable" | "grades" | "issuer_grades" | `${string}[${string}]`
export interface ExamrepExamSessionResult {
    "number"?: unknown
    "examrep_id"?: unknown
    "status"?: unknown
    "description"?: unknown
    "deadline"?: unknown
    "is_editable"?: unknown
    "grades"?: unknown
    "issuer_grades"?: unknown
}

export interface ExamrepExamSessionParams {
    "exam_id": string | number
    "number": number
    "fields"?: readonly ExamrepExamSessionFields[]
}

export interface ExamrepExamSessionOptions {
    examId: string | number
    number: number
    fields?: readonly ExamrepExamSessionFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ExamrepUserFields = string

export interface ExamrepUserParams {
    "term_ids": readonly (string | number)[]
    "fields"?: readonly ExamrepUserFields[]
}

export interface ExamrepUserOptions {
    termIds: readonly (string | number)[]
    fields?: readonly ExamrepUserFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type ExamrepUser2Fields = string

export interface ExamrepUser2Params {
    "fields"?: readonly ExamrepUser2Fields[]
    "term_ids"?: readonly (string | number)[]
}

export interface ExamrepUser2Options {
    fields?: readonly ExamrepUser2Fields[]
    termIds?: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
