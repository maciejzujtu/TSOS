import type { AnyEndpoint } from '@/core/endpoint'

export interface MethodAuthOptions {
    consumer: "required" | "optional" | "ignored"
    token: "required" | "optional" | "ignored"
    administrative_only: boolean
    ssl_required: boolean
    scopes: string[]
}

export interface MethodArgument {
    name: string
    is_required: boolean
    is_deprecated: boolean
    type: string
    default_value: string | null
    description: string
}

export interface MethodResultField {
    name: string
    description: string
    is_primary: boolean
    is_secondary: boolean
}

export interface MethodDeprecated {
    deprecated_by: string | null
    present_until: string | null
}

export interface ApirefMethod {
    name: string
    short_name: string
    description: string
    brief_description: string
    ref_url: string
    auth_options: MethodAuthOptions
    arguments: MethodArgument[]
    returns: string
    errors: string
    result_fields: MethodResultField[]
    beta: boolean
    deprecated: MethodDeprecated | null
    admin_access: boolean
    is_internal: boolean
}

export interface ApirefMethodIndex {
    name: string
    brief_description: string
}

export interface ApirefModule {
    name: string
    title: string
    brief_description: string
    description: string
    submodules: string[]
    methods: string[]
    beta: boolean
}

export interface ApirefScope {
    key: string
    developers_description: string
}

export type MethodFields = keyof ApirefMethod

export interface ApirefMethodParams {
    name: string
    fields?: readonly MethodFields[]
}

export interface ApirefModuleParams {
    name: string
}

export type EmptyParams = Record<string, never>
export type EndpointReference = AnyEndpoint | `services/${string}`
