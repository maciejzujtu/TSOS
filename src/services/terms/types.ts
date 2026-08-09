import type { LangDict, TermId } from '@/types/common'

export type TermType =
    | "year"
    | "semester"
    | "trimester"

export interface Term {
    id: TermId
    order_key: number
    name: LangDict
    start_date: string
    end_date: string
    finish_date: string
    is_active: boolean
}

export interface SearchTermsOptions {
    query?: string
    minFinishDate?: string
    maxStartDate?: string
}

export interface TermsIndexOptions {
    termType?: TermType
    activeOnly?: boolean
}

export interface SearchTermsParams {
    query?: string
    min_finish_date?: string
    max_start_date?: string
}

export interface TermParams {
    term_id: TermId
}

export interface TermsParams {
    term_ids: readonly TermId[]
}

export interface TermsIndexParams {
    term_type?: TermType
    active_only?: boolean
}
