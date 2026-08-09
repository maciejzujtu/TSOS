import type { EndpointDefinition } from '@/core/endpoint'
import type {
    SearchTermsParams,
    Term,
    TermParams,
    TermsIndexParams,
    TermsParams,
} from '@/services/terms/types'

export interface TermsEndpoints {
    search: EndpointDefinition<SearchTermsParams, Term[]>
    term: EndpointDefinition<TermParams, Term>
    terms: EndpointDefinition<TermsParams, Record<string, Term | null>>
    termsIndex: EndpointDefinition<TermsIndexParams, Term[]>
}

const publicAuth = {
    consumer: "ignored",
    token: "ignored",
    sslRequired: false,
} as const

export const termsEndpoints: TermsEndpoints = {
    search: {
        path: "services/terms/search",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    term: {
        path: "services/terms/term",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    terms: {
        path: "services/terms/terms",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    termsIndex: {
        path: "services/terms/terms_index",
        method: "GET",
        response: "json",
        auth: {
            ...publicAuth,
            sslRequired: true,
        },
    },
}
