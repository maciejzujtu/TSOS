import type { EndpointDefinition } from '@/core/endpoint'
import type {
    ApirefMethod,
    ApirefMethodIndex,
    ApirefMethodParams,
    ApirefModule,
    ApirefModuleParams,
    ApirefScope,
    EmptyParams,
} from '@/services/apiref/types'

export interface ApirefEndpoints {
    method: EndpointDefinition<ApirefMethodParams, Partial<ApirefMethod>>
    methodIndex: EndpointDefinition<EmptyParams, ApirefMethodIndex[]>
    module: EndpointDefinition<ApirefModuleParams, ApirefModule>
    scopes: EndpointDefinition<EmptyParams, ApirefScope[]>
}

export const apirefEndpoints: ApirefEndpoints = {
    method: {
        path: "services/apiref/method",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "ignored",
            sslRequired: false,
        },
    },
    methodIndex: {
        path: "services/apiref/method_index",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
    module: {
        path: "services/apiref/module",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
    scopes: {
        path: "services/apiref/scopes",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
}
