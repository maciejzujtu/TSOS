// API Reference endpoints as defined in USOS API docs
// https://apps.usos.edu.pl/developers/api/services/apiref/
export enum ApirefModules {
    ROOT                = "services/apiref",
    METHOD              = "services/apiref/method",
    METHOD_INDEX        = "services/apiref/method_index",
    MODULE              = "services/apiref/module",
    SCOPES              = "services/apiref/scopes"
}

// ==========================================
// Endpoints
// ==========================================

export interface MethodAuthOptions {
    consumer: "required" | "optional" | "ignored",
    token: "required" | "optional" | "ignored"
    administrative_only: boolean
    ssl_required: boolean
    scopes: string[]
}
export interface MethodArgument {
    name: string
    is_required: boolean
    is_deprecated: boolean
    default_value?: string
    description: string
}
export interface MethodResultField {
    name: string
    description: string
    is_primary: boolean
    is_secondary: boolean
}
export interface MethodDeprecated {
    deprecated_by?: string
    present_until?: string
}

/** /services/api/services/apiref/#method */
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
    deprecated?: MethodDeprecated
    admin_access: boolean
    is_internal: boolean
}

/** /services/api/services/apiref/#method_index */
export interface ApirefMethodIndex {
    name: string
    brief_description: string
}

/** /developers/api/services/apiref/#module */
export interface ApirefModule {
    name: string
    title: string
    brief_description: string
    description: string
    submodules: string[]
    methods: string[]
    beta: boolean
}

/** /developers/api/services/apiref/#scope */
export interface ApirefScope {
    key: string
    developer_description: string
}



// ==========================================
// Mappings
// ==========================================

export type MethodFields = keyof ApirefMethod
export type MethodIndexFields = keyof ApirefMethodIndex
export type ModuleFields = keyof ApirefModule

export interface ApirefRequest {
    METHOD: { name: string; fields?: MethodFields[] }
    METHOD_INDEX: never
    MODULE: { name: string; fields?: ModuleFields[] }
    SCOPES: never
}

export interface ApirefResponse {
    METHOD: Partial<ApirefMethod>
    METHOD_INDEX: ApirefMethodIndex[]
    MODULE: Partial<ApirefModule>
    SCOPES: ApirefScope[]
}