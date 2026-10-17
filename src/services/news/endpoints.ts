import type { EndpointDefinition } from '@/core/endpoint'
import type * as T from '@/services/news/types'

export interface NewsEndpoints {
    article: EndpointDefinition<T.NewsArticleParams, T.NewsArticle>
    articles: EndpointDefinition<T.NewsArticlesParams, T.NewsArticles>
    categoryIndex: EndpointDefinition<T.NewsCategoryIndexParams, T.NewsCategory[]>
    search: EndpointDefinition<T.NewsSearchParams, T.NewsSearchResult>
}

export const newsEndpoints: NewsEndpoints = {
    article: {
        path: "services/news/article",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
    },
    articles: {
        path: "services/news/articles",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
    },
    categoryIndex: {
        path: "services/news/category_index",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
    },
    search: {
        path: "services/news/search",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
    },
}
