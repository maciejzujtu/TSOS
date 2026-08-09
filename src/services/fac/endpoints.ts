import type { EndpointDefinition } from '@/core/endpoint'
import type {
    FacultiesParams,
    Faculty,
    FacultyParams,
    FacultySearchResult,
    FactsheetParams,
    ResolveFacpatternParams,
    SearchFacultiesParams,
    SubfacultiesDeepParams,
} from '@/services/fac/types'
import type { FacultyId } from '@/types/common'

export interface FacEndpoints {
    factsheetGet: EndpointDefinition<FactsheetParams, ArrayBuffer>
    faculties: EndpointDefinition<FacultiesParams, Record<string, Faculty | null>>
    faculty: EndpointDefinition<FacultyParams, Faculty>
    resolveFacpattern: EndpointDefinition<ResolveFacpatternParams, FacultyId[]>
    search: EndpointDefinition<SearchFacultiesParams, FacultySearchResult>
    subfacultiesDeep: EndpointDefinition<SubfacultiesDeepParams, FacultyId[]>
}

const optionalAuth = {
    consumer: "optional",
    token: "optional",
    sslRequired: false,
} as const

const publicAuth = {
    consumer: "ignored",
    token: "ignored",
    sslRequired: false,
} as const

export const facEndpoints: FacEndpoints = {
    factsheetGet: {
        path: "services/fac/factsheet_get",
        method: "GET",
        response: "arrayBuffer",
        auth: {
            ...publicAuth,
            sslRequired: true,
        },
    },
    faculties: {
        path: "services/fac/faculties",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    faculty: {
        path: "services/fac/faculty",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    resolveFacpattern: {
        path: "services/fac/resolve_facpattern",
        method: "GET",
        response: "json",
        auth: {
            ...optionalAuth,
            sslRequired: true,
        },
    },
    search: {
        path: "services/fac/search",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    subfacultiesDeep: {
        path: "services/fac/subfaculties_deep",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
}
