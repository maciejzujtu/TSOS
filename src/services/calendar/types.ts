import type { FacultyId, LangDict } from '@/types/common'

export type CalendarEventId = string | number

export type CalendarEventType =
    | "rector"
    | "dean"
    | "holidays"
    | "public_holidays"
    | "exam_session"
    | "academic_year"
    | "break"
    | "links_edit"
    | "undefined"
    | (string & {})

export interface CalendarEvent {
    id?: CalendarEventId
    name?: LangDict
    start_date?: string
    end_date?: string
    faculty?: Record<string, unknown> | null
    type?: CalendarEventType
    is_day_off?: boolean
}

export type CalendarEventFields =
    | keyof CalendarEvent
    | `faculty[${string}]`

export interface CalendarEventParams {
    id: CalendarEventId
    fields?: readonly CalendarEventFields[]
}

export interface CalendarSearchParams {
    faculty_id: FacultyId
    start_date: string
    end_date: string
    fields?: readonly CalendarEventFields[]
}
