export type AttendanceListId = string | number
export type StudentId = string | number
export type EmptyResponse = Record<string, never>

export type MeetingMode =
    | "intramural"
    | "remote"
    | "hybrid"

export type AttendanceMode =
    | "intramural"
    | "remote"
    | "justified_absence"
    | "absence"

export interface AttendanceEntry {
    student?: Record<string, unknown>
    attendance_mode?: AttendanceMode | null
    comment?: string | null
}

export interface AttendanceList {
    id?: AttendanceListId
    course_unit?: Record<string, unknown>
    group_number?: number
    owner?: Record<string, unknown>
    date?: string
    mode?: MeetingMode
}

export interface CreatedAttendanceList {
    list_id: AttendanceListId
}

export type AttendanceEntryFields =
    | keyof AttendanceEntry
    | `student[${string}]`

export type AttendanceListFields =
    | keyof AttendanceList
    | `course_unit[${string}]`
    | `owner[${string}]`

export interface GetAttendanceOptions {
    listId: AttendanceListId
    studentIds?: readonly StudentId[]
    fields?: readonly AttendanceEntryFields[]
}

export interface CreateAttendanceListOptions {
    courseUnitId: string
    groupNumber: number
    date: string
    mode: MeetingMode
}

export interface CreateFromTimetableOptions {
    courseUnitId: string
    groupNumber: number
    defaultMode: MeetingMode
}

export interface GetGroupAttendanceListsOptions {
    courseUnitId: string
    groupNumber: number
    fields?: readonly AttendanceListFields[]
}

export interface UpdateAttendanceOptions {
    listId: AttendanceListId
    studentId: StudentId
    attendanceMode: AttendanceMode
    comment?: string
}

export interface AttendanceParams {
    list_id: AttendanceListId
    student_ids?: readonly StudentId[]
    fields?: readonly AttendanceEntryFields[]
}

export interface AttendanceListParams {
    list_id: AttendanceListId
    fields?: readonly AttendanceListFields[]
}

export interface AttendanceListsParams {
    list_ids: readonly AttendanceListId[]
    fields?: readonly AttendanceListFields[]
}

export interface ChangeListModeParams {
    list_id: AttendanceListId
    mode: MeetingMode
}

export interface CreateAttendanceListParams {
    course_unit_id: string
    group_number: number
    date: string
    mode: MeetingMode
}

export interface CreateFromTimetableParams {
    course_unit_id: string
    group_number: number
    default_mode: MeetingMode
}

export interface DeleteAttendanceListParams {
    list_id: AttendanceListId
}

export interface GroupAttendanceListsParams {
    course_unit_id: string
    group_number: number
    fields?: readonly AttendanceListFields[]
}

export interface UpdateAttendanceParams {
    list_id: AttendanceListId
    student_id: StudentId
    attendance_mode: AttendanceMode
    comment?: string
}

export interface UserAttendanceListsParams {
    fields?: readonly AttendanceListFields[]
}
