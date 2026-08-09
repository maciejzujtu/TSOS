export type LangCode = string
export type LangDict = Record<LangCode, string>

export type UsosId = string | number
export type UserId = UsosId
export type CourseId = string
export type CourseUnitId = string
export type FacultyId = string
export type TermId = string

export type Language = "pl" | "en" | (string & {})

export interface SuccessResponse {
    success: true
}

export interface SearchPage<Item> {
    items: Item[]
    next_page: boolean
}
