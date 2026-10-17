import type { RequestExecutor } from '@/core/requester'
import { newsEndpoints } from '@/services/news/endpoints'
import type * as T from '@/services/news/types'

export class NewsService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Retrieve a single news article by ID. @beta */
    public async getArticle(options: T.NewsArticleOptions): Promise<T.NewsArticle> {
        return await this.request.request(newsEndpoints.article, {
            params: {
                article_id: options.articleId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Retrieve multiple articles by their IDs. @beta */
    public async getArticles(options: T.NewsArticlesOptions): Promise<T.NewsArticles> {
        if (options.articleIds.length === 0) {
            throw new TypeError("getArticles requires at least one article ID")
        }
        return await this.request.request(newsEndpoints.articles, {
            params: {
                article_ids: options.articleIds,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Retrieve the list of all existing article categories. @beta */
    public async getCategoryIndex(options: T.NewsCategoryIndexOptions = {}): Promise<T.NewsCategory[]> {
        return await this.request.request(newsEndpoints.categoryIndex, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Search for articles with simple filters. @beta */
    public async search(options: T.NewsSearchOptions = {}): Promise<T.NewsSearchResult> {
        return await this.request.request(newsEndpoints.search, {
            params: {
                from_date: options.fromDate,
                facpattern: options.facpattern,
                category_ids: options.categoryIds,
                num: options.num,
                start: options.start,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }
}
