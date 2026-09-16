import type {
    CourseId,
    CourseUnitId,
    LangDict,
    Language,
    TermId,
    UserId,
} from '@/types/common'

export type ActivityType =
    | "classgroup"
    | "classgroup2"
    | "meeting"
    | "exam"
    | (string & {})

export type ClassGroupId = string
export type CourseEditionId = string
export type RoomId = string | number

export interface Activity {
    type?: ActivityType
    start_time?: string
    end_time?: string
    name?: LangDict
    url?: string | null
    course_id?: CourseId
    course_name?: LangDict
    classtype_name?: LangDict
    lecturer_ids?: UserId[]
    group_number?: number
    classgroup_profile_url?: string
    building_name?: LangDict
    building_id?: string | null
    room_number?: string
    room_id?: RoomId | null
    unit_id?: CourseUnitId
    classtype_id?: string
    cgwm_id?: string | number
}

export type ActivityFields = keyof Activity | (string & {})

export interface TimetableRangeParams {
    start?: string
    days?: number
    fields?: readonly ActivityFields[]
}

export interface ClassGroupTimetableParams extends TimetableRangeParams {
    unit_id: CourseUnitId
    group_number: number
}

export interface ClassGroupDatesParams {
    unit_id: CourseUnitId
    group_number: number
}

export interface ClassGroupDates2Params extends ClassGroupDatesParams {
    fields?: readonly ActivityFields[]
}

export interface ClassGroupsTimetableParams extends TimetableRangeParams {
    classgroup_ids: readonly ClassGroupId[]
    partial?: boolean
}

export interface CourseEditionTimetableParams extends TimetableRangeParams {
    course_id: CourseId
    term_id: TermId
}

export interface CourseEditionsTimetableParams extends TimetableRangeParams {
    course_edition_ids: readonly CourseEditionId[]
    partial?: boolean
}

export interface RoomTimetableParams extends TimetableRangeParams {
    room_id: RoomId
}

export interface StaffTimetableParams extends TimetableRangeParams {
    user_id?: UserId
}

export type StudentTimetableParams = TimetableRangeParams
export type UserTimetableParams = TimetableRangeParams

export interface UpcomingIcalParams {
    user_id: UserId
    lang: Language
    key?: string
}

export interface UpcomingShareParams {
    lang: Language
}

export interface UpcomingShare {
    webcal_url?: string
}
