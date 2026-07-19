// List of methods for APIREF endpoint module
export enum APIREF {
    METHOD              = "services/apiref/method",
    METHOD_INDEX        = "services/apiref/method_index",
    MODULE              = "services/apiref/module",
    SCOPES              = "services/apiref/scopes"
}

export type MethodFields = keyof METHOD;
export type ModuleFields = keyof MODULE;

/** /developers/api/services/apiref/#method */
export interface METHOD {
    name?: string;
    brief_description?: string;
    description?: string;
    beta?: boolean;
    is_deprecated?: boolean;
    is_internal?: boolean;
    admin_access?: boolean;
    auth_options?: Record<string, any>;
    arguments?: Record<string, any>[];
    returns?: string;
    errors?: Record<string, any>[];
}

/** /developers/api/services/apiref/#module */
export interface MODULE {
    name?: string;
    brief_description?: string;
    description?: string;
    beta?: boolean;
    is_deprecated?: boolean;
    methods?: string[];
    submodules?: string[];
}

/** 
 * Represents a single OAuth scope returned by the scopes endpoint 
 */
export interface SCOPE {
    description?: string;
}