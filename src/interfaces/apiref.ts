export enum APIREF {
    ROOT                = "services/apiref",
    METHOD              = "services/apiref/method",
    METHOD_INDEX        = "services/apiref/method_index",
    MODULE              = "services/apiref/module",
    SCOPES              = "services/apiref/scopes"
}

export interface APIREF_REQUEST {

}

export type MethodFields        = keyof METHOD
export type MethodIndexFields   = keyof METHOD_INDEX
export type ModuleFields        = keyof MODULE


interface AuthOptions {
    consumer: "required" | "optional" | "ignored"
    token: "required" | "optional" | "ignored"
    administrative_only: boolean
    ssl_required: boolean
    scopes: string[]
}
interface Arguments {
    name: string,
    is_required: boolean
    is_deprecated: boolean
    type: string
    default_value: string | null
    description: string
} 
interface ResultFields {
    name: string
    description: string
    is_primary: boolean
    is_secondary: boolean
}
interface Deprecated {
    deprecated_by: string | null
    present_until: string | null
}

/** /services/api/services/apiref/#method */
export interface METHOD {
    name: string
    short_name: string
    description: string
    brief_description: string
    ref_url: string
    auth_options: AuthOptions
    arguments: Arguments[]
    returns: string
    errors: string
    result_fields: ResultFields[]
    beta: boolean
    deprecated: Deprecated | null
    admin_access: boolean
    is_internal: boolean
}

/** /services/api/services/apiref/#method_index */
export interface METHOD_INDEX {
    name?: string
    brief_description?: string
}

/** /developers/api/services/apiref/#module */
export interface MODULE {
    name?: string;
    title?: string;
    brief_description?: string;
    description?: string;
    beta?: boolean;
    methods?: string[];
    submodules?: string[];
}

/** /developers/api/services/apiref/#scope */
export interface SCOPE {
    key: string
    developers_description: string
}



// Mappings

export interface APIREF_REQUEST {
    METHOD:       { name: string; fields?: string | MethodFields[] }
    METHOD_INDEX: { fields?: string | MethodIndexFields[] }
    MODULE:       { name: string; fields?: string | ModuleFields[] }
    SCOPES:       { fields?: string }
}

export interface APIREF_RESPONSE {
    METHOD:       METHOD
    METHOD_INDEX: METHOD_INDEX
    MODULE:       MODULE
    SCOPES:       Record<string, SCOPE>
}