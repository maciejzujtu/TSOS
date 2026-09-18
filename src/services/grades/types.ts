import type {
    CourseId,
    CourseUnitId,
    LangDict,
    TermId,
    UserId,
} from '@/types/common'

export type ExamId = string | number
export type ExamSessionNumber = string | number
export type GradeTypeId = string

export interface Grade {
    value_symbol?: string | null
    passes?: boolean | null
    value_description?: LangDict | null
    exam_id?: ExamId
    exam_session_number?: ExamSessionNumber
    counts_into_average?: boolean
    comment?: string | null
    private_comment?: string | null
    grade_type_id?: GradeTypeId
    date_modified?: string | null
    date_acquisition?: string | null
    modification_author?: UserId | null
    course_edition?: Record<string, unknown> | null
    unit?: Record<string, unknown> | null
    exam_report?: Record<string, unknown> | null
    user?: Record<string, unknown> | null
}

export type GradeFields =
    | keyof Grade
    | `course_edition[${string}]`
    | `unit[${string}]`
    | `exam_report[${string}]`
    | `user[${string}]`

export type ExamGrades = Record<string, Grade | null>

export interface LegacyCourseEditionGrades {
    course_grades?: Array<ExamGrades | null>
    course_units_grades?: Record<CourseUnitId, ExamGrades | null>
}

export interface CourseEditionGrades {
    course_grades?: ExamGrades[]
    course_units_grades?: Record<CourseUnitId, ExamGrades[]>
}

export interface GradeTypeValue {
    symbol?: string
    passes?: boolean
    decimal_value?: number | null
    name?: LangDict
    order_key?: number
}

export interface GradeType {
    id?: GradeTypeId
    name?: LangDict
    is_current?: boolean
    values?: GradeTypeValue[]
}

export type GradeTypeFields = keyof GradeType

export interface CourseEditionGradesParams {
    course_id: CourseId
    term_id: TermId
    fields?: readonly GradeFields[]
}

export interface ExamGradesParams {
    exam_id: ExamId
    user_id?: UserId
    fields?: readonly GradeFields[]
}

export interface GradeParams extends ExamGradesParams {
    exam_session_number: ExamSessionNumber
}

export interface GradeTypeParams {
    grade_type_id: GradeTypeId
    fields?: readonly GradeTypeFields[]
}

export interface GradeTypeIndexParams {
    fields?: readonly GradeTypeFields[]
}

export interface GradeTypesParams {
    grade_type_ids: readonly GradeTypeId[]
    fields?: readonly GradeTypeFields[]
}

export interface LatestGradesParams {
    days?: number
    fields?: readonly GradeFields[]
}

export interface TermGradesParams {
    term_ids: readonly TermId[]
    course_ids?: readonly CourseId[]
    fields?: readonly GradeFields[]
}

export interface UpdateGradeParams {
    student_id: UserId
    exam_id: ExamId
    exam_session_number: ExamSessionNumber
    value_symbol?: string | null
    comment?: string | null
    private_comment?: string | null
    date_modified?: string | null
    date_acquisition?: string | null
}

export interface CourseEditionGradesOptions {
    courseId: CourseId
    termId: TermId
    fields?: readonly GradeFields[]
}

export interface ExamGradesOptions {
    examId: ExamId
    userId?: UserId
    fields?: readonly GradeFields[]
}

export interface GradeOptions extends ExamGradesOptions {
    examSessionNumber: ExamSessionNumber
}

export interface LatestGradesOptions {
    days?: number
    fields?: readonly GradeFields[]
}

export interface TermGradesOptions {
    termIds: readonly TermId[]
    courseIds?: readonly CourseId[]
    fields?: readonly GradeFields[]
}

export interface UpdateGradeOptions {
    studentId: UserId
    examId: ExamId
    examSessionNumber: ExamSessionNumber
    valueSymbol?: string | null
    comment?: string | null
    privateComment?: string | null
    dateModified?: string | null
    dateAcquisition?: string | null
}

export type LegacyTermGrades = Record<
    TermId,
    Record<CourseId, ExamGrades | null> | null
>

export type TermGrades = Record<
    TermId,
    Record<CourseId, CourseEditionGrades | null> | null
>

export type EmptyGradeResponse = Record<string, never>
