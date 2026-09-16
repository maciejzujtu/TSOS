import type {
    LangDict,
    Language,
    SuccessResponse,
    UserId,
} from '@/types/common'

export type ProgrammeId = string
export type StudentProgrammeId = string | number
export type StageId = string | number

export interface Programme {
    id?: ProgrammeId
    name?: LangDict
    /** @deprecated This upstream field is an alias of `name`. */
    description?: LangDict
    faculty?: Record<string, unknown> | null
    all_faculties?: Array<Record<string, unknown>>
    mode_of_studies?: Record<string, unknown> | null
    level_of_studies?: Record<string, unknown> | null
    duration?: string | null
    professional_status?: LangDict | null
    level?: string | null
}

export type ProgrammeFields =
    | keyof Programme
    | `faculty[${string}]`
    | `all_faculties[${string}]`
    | `mode_of_studies[${string}]`
    | `level_of_studies[${string}]`

export interface ProgrammeSearchItem {
    programme?: Programme
    match?: string
}

export interface ProgrammeSearchResult {
    items?: ProgrammeSearchItem[]
    next_page?: boolean
}

export interface Stage {
    id?: StageId
    name?: LangDict
}

export type StageFields = keyof Stage

export interface StudentProgramme {
    id?: StudentProgrammeId
    user?: Record<string, unknown>
    programme?: Programme
    status?: string | null
    admission_date?: string | null
    stages?: Array<Record<string, unknown>>
    is_primary?: boolean
}

export type StudentProgrammeFields =
    | keyof StudentProgramme
    | `user[${string}]`
    | `programme[${string}]`
    | `stages[${string}]`

export interface ProgrammeParams {
    programme_id: ProgrammeId
    fields?: readonly ProgrammeFields[]
}

export interface ProgrammesParams {
    programme_ids: readonly ProgrammeId[]
    fields?: readonly ProgrammeFields[]
}

export interface ProgrammeSearchParams {
    lang: Language
    fields?: readonly (keyof ProgrammeSearchResult | `items[${string}]`)[]
    query?: string
    num?: number
    start?: number
}

export interface ProgrammeSearchHistoryParams {
    programme_id: ProgrammeId
}

export interface StageParams {
    id: StageId
    fields?: readonly StageFields[]
}

export interface StudentProgrammesForUserParams {
    user_id?: UserId
    fields?: readonly StudentProgrammeFields[]
    active_only?: boolean
    old_programs?: boolean
}

export interface StudentProgrammeParams {
    student_programme_id: StudentProgrammeId
    fields?: readonly StudentProgrammeFields[]
}

export interface StudentProgrammesParams {
    student_programme_ids: readonly StudentProgrammeId[]
    fields?: readonly StudentProgrammeFields[]
}

export type ProgrammeSearchHistoryResponse = SuccessResponse
