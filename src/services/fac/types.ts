import type {
    FacultyId,
    LangDict,
    Language,
} from '@/types/common'

export type FacultyVisibility = "public" | "all"

export interface FacultyPhoneNumber {
    comment: string | null
    number: string
    type: string
}

export interface FacultyStats {
    course_count?: number | null
    programme_count?: number | null
    staff_count?: number | null
    subfaculty_count?: number | null
    public_subfaculty_count?: number | null
}

export interface FacultyPathItem {
    id?: FacultyId
    name?: LangDict
    profile_url?: string
}

export type FacultyImageUrls = Partial<Record<string, string | null>>

export interface Faculty {
    id?: FacultyId
    name?: LangDict
    profile_url?: string
    homepage_url?: string | null
    phone_numbers?: string[]
    phone_numbers2?: FacultyPhoneNumber[]
    postal_address?: string | null
    email?: string | null
    is_public?: boolean
    stats?: FacultyStats
    path?: FacultyPathItem[]
    static_map_urls?: FacultyImageUrls
    logo_urls?: FacultyImageUrls
    cover_urls?: FacultyImageUrls
    pdf_factsheet_url?: string | null
}

export type FacultyFields =
    | keyof Faculty
    | `stats[${keyof FacultyStats}]`
    | `path[${keyof FacultyPathItem}]`
    | `static_map_urls[${string}]`
    | `logo_urls[${string}]`
    | `cover_urls[${string}]`

export interface FacultySearchItem extends Faculty {
    match?: string
}

export interface FacultySearchResult {
    items: FacultySearchItem[]
    next_page: boolean
}

export interface SearchFacultiesOptions {
    lang: Language
    query: string
    fields?: readonly (FacultyFields | "match")[]
    visibility?: FacultyVisibility
    num?: number
    start?: number
}

export interface FactsheetParams {
    fac_id: FacultyId
}

export interface FacultiesParams {
    fac_ids: readonly FacultyId[]
    fields?: readonly FacultyFields[]
}

export interface FacultyParams {
    fac_id: FacultyId
    fields?: readonly FacultyFields[]
}

export interface ResolveFacpatternParams {
    facpattern: string
}

export interface SearchFacultiesParams {
    lang: Language
    query: string
    fields?: readonly (FacultyFields | "match")[]
    visibility?: FacultyVisibility
    num?: number
    start?: number
}

export interface SubfacultiesDeepParams {
    fac_id: FacultyId
}
