import type { AccessTokenCredentials } from '@/core/auth'
import type { LangDict } from '@/types/common'

export type NewsId = string | number

export interface NewsCategory {
    id?: NewsId
    name?: LangDict
}

export interface NewsArticle {
    id?: NewsId
    author?: LangDict
    publication_date?: string
    title?: LangDict
    headline_html?: LangDict
    content_html?: LangDict
    expiry_date?: string | null
    category?: NewsCategory | null
    faculty?: Record<string, unknown> | null
    image_urls?: Record<string, string | null>
    image_description?: LangDict | null
    event?: Record<string, unknown> | null
}

export interface NewsSearchItem {
    article?: NewsArticle
}

export interface NewsSearchResult {
    items: NewsSearchItem[]
    next_page: boolean
    total: number
}

export type NewsArticles = Record<string, NewsArticle | null>

export type NewsArticleField = "id" | "author" | "publication_date" | "title" | "headline_html" | "content_html" | "expiry_date" | "category" | "faculty" | "image_urls" | "image_description" | "event" | `${string}[${string}]`

export interface NewsArticleParams {
    article_id: string | number
    fields?: readonly NewsArticleField[]
}

export interface NewsArticleOptions {
    articleId: string | number
    fields?: readonly NewsArticleField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type NewsArticlesField = keyof NewsArticle | `${string}[${string}]`

export interface NewsArticlesParams {
    article_ids: readonly (string | number)[]
    fields?: readonly NewsArticlesField[]
}

export interface NewsArticlesOptions {
    articleIds: readonly (string | number)[]
    fields?: readonly NewsArticlesField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type NewsCategoryIndexField = "id" | "name" | `${string}[${string}]`

export interface NewsCategoryIndexParams {
    fields?: readonly NewsCategoryIndexField[]
}

export interface NewsCategoryIndexOptions {
    fields?: readonly NewsCategoryIndexField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type NewsSearchField = "items" | "next_page" | "total" | `${string}[${string}]`

export interface NewsSearchParams {
    from_date?: string
    facpattern?: string
    category_ids?: readonly (string | number)[]
    num?: number
    start?: number
    fields?: readonly NewsSearchField[]
}

export interface NewsSearchOptions {
    fromDate?: string
    facpattern?: string
    categoryIds?: readonly (string | number)[]
    num?: number
    start?: number
    fields?: readonly NewsSearchField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
