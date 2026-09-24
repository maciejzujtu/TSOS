import type {
    CourseId,
    FacultyId,
    LangDict,
    TermId,
    UserId,
} from '@/types/common'

export type ExaminationId = string | number
export type ExaminationSessionId = string | number
export type ExamReportId = string | number
export type ExamGroupNumber = string | number
export type ExamSlotNumber = string | number

export interface ExamConditionGradeValue {
    symbol?: string
    passes?: boolean
    decimal_value?: number | null
    name?: LangDict
    order_key?: number
}

export interface ExamCondition {
    examrep?: Record<string, unknown>
    grade_value?: ExamConditionGradeValue | null
}

export type ExamConditionFields = keyof ExamCondition | `examrep[${string}]`

export interface ExamSlot {
    number?: ExamSlotNumber
    capacity?: number
    attendees_count?: number
    attendees?: UserId[]
    start?: string
    end?: string
}

export type ExamSlotFields = keyof ExamSlot

export interface ExamGroup {
    exam_id?: ExaminationId
    number?: ExamGroupNumber
    exam_start?: string
    exam_end?: string
    capacity?: number
    number_of_slots?: number
    slots?: ExamSlot[]
    examiners?: Array<Record<string, unknown>>
    attendees?: Array<Record<string, unknown>>
    room?: Record<string, unknown> | null
    is_examiner?: boolean
    register_until?: string | null
    unregister_until?: string | null
    registration_start?: string | null
}

export type ExamGroupFields =
    | keyof ExamGroup
    | `slots[${string}]`
    | `examiners[${string}]`
    | `attendees[${string}]`
    | `room[${string}]`

export interface Exam {
    id?: ExaminationId
    examination_session_id?: ExaminationSessionId
    term?: Record<string, unknown>
    course?: Record<string, unknown>
    registration_start?: string | null
    registration_end?: string | null
    examiners_visible?: boolean
    name?: LangDict
    description?: LangDict
    groups?: ExamGroup[]
    code?: string
    has_priorities?: boolean
    preferences_limit?: number | null
    micro_round_length?: number | null
    micro_break_length?: number | null
    register_until?: string | null
    unregister_until?: string | null
    exchange_until?: string | null
    examrep_session?: Record<string, unknown> | null
    students_count?: number
    admission_conditions?: Record<ExamReportId, ExamCondition>
    admitted_students?: UserId[]
    unadmitted_students?: Record<UserId, ExamReportId[]>
}

export type ExamFields =
    | keyof Exam
    | `term[${string}]`
    | `course[${string}]`
    | `groups[${string}]`
    | `examrep_session[${string}]`
    | `admission_conditions[${string}]`

export type ExaminationSessionStatus =
    | "in_preparation"
    | "closed"
    | "archived"
    | "active_reg_only"
    | "active"
    | (string & {})

export interface ExaminationSession {
    id?: ExaminationSessionId
    name?: LangDict
    description?: LangDict
    status?: ExaminationSessionStatus
    exams?: Exam[]
    faculty?: Record<string, unknown>
}

export type ExaminationSessionFields =
    | keyof ExaminationSession
    | `exams[${string}]`
    | `faculty[${string}]`

export type ExamRegistrationValues = Readonly<
    Record<string, Readonly<Record<string, readonly UserId[]>>>
>

export type ExamRegistrationStatus =
    | "success"
    | "w_already_registered"
    | "e_already_registered"
    | "e_not_permitted"
    | "w_already_not_registered"
    | (string & {})

export type ExamRegistrationResult = Record<
    string,
    Record<string, Record<string, ExamRegistrationStatus>>
>

export interface BatchRegistrationResult {
    unregister_result?: ExamRegistrationResult
    register_result?: ExamRegistrationResult
}

export type AdministratorExaminationSessions = Record<FacultyId, ExaminationSession[]>

export interface ActiveExaminationSessionsParams {
    fields?: readonly ExaminationSessionFields[]
}

export type AdministratorParams = ActiveExaminationSessionsParams

export interface BatchRegisterExamParams {
    exam_id: ExaminationId
    values: ExamRegistrationValues
}

export interface BatchRegistrationParams {
    exam_id: ExaminationId
    unregister: ExamRegistrationValues
    register: ExamRegistrationValues
}

export type BatchUnregisterExamParams = BatchRegisterExamParams

export interface ExamConditionParams {
    exam_id: ExaminationId
    examrep_id: ExamReportId
    fields?: readonly ExamConditionFields[]
}

export interface ExamParams {
    id: ExaminationId
    fields?: readonly ExamFields[]
}

export interface ExamGroupParams {
    exam_id: ExaminationId
    group_number: ExamGroupNumber
    fields?: readonly ExamGroupFields[]
}

export interface ExaminationSessionParams {
    id: ExaminationSessionId
    fields?: readonly ExaminationSessionFields[]
}

export interface ExaminationSessionsParams {
    ids: readonly ExaminationSessionId[]
    fields?: readonly ExaminationSessionFields[]
}

export interface ExamsParams {
    ids: readonly ExaminationId[]
    fields?: readonly ExamFields[]
}

export interface FacultyExaminationSessionsParams {
    faculty_id: FacultyId
    status: ExaminationSessionStatus
    fields?: readonly ExaminationSessionFields[]
}

export interface SearchExamRegistrationsParams {
    start_date: string
    end_date: string
    faculty_id?: FacultyId
    user_related?: boolean
    fields?: readonly ExamFields[]
}

export interface ExamSlotParams {
    exam_id: ExaminationId
    group_number: ExamGroupNumber
    slot_number: ExamSlotNumber
    fields?: readonly ExamSlotFields[]
}

export interface StudentExamsParams {
    fields?: readonly ExamFields[]
}

export interface UserExaminationSessionsParams {
    fields?: readonly ExaminationSessionFields[]
}

export interface BatchRegisterExamOptions {
    examId: ExaminationId
    values: ExamRegistrationValues
}

export interface BatchRegistrationOptions {
    examId: ExaminationId
    unregister: ExamRegistrationValues
    register: ExamRegistrationValues
}

export type BatchUnregisterExamOptions = BatchRegisterExamOptions

export interface ExamConditionOptions {
    examId: ExaminationId
    examReportId: ExamReportId
    fields?: readonly ExamConditionFields[]
}

export interface ExamGroupOptions {
    examId: ExaminationId
    groupNumber: ExamGroupNumber
    fields?: readonly ExamGroupFields[]
}

export interface FacultyExaminationSessionsOptions {
    facultyId: FacultyId
    status: ExaminationSessionStatus
    fields?: readonly ExaminationSessionFields[]
}

export interface SearchExamRegistrationsOptions {
    startDate: string
    endDate: string
    facultyId?: FacultyId
    userRelated?: boolean
    fields?: readonly ExamFields[]
}

export interface ExamSlotOptions {
    examId: ExaminationId
    groupNumber: ExamGroupNumber
    slotNumber: ExamSlotNumber
    fields?: readonly ExamSlotFields[]
}

export interface ExamCourseReference {
    id?: CourseId
    term_id?: TermId
}
