export type Requirement =
    | "required"
    | "optional"
    | "ignored"

export type ResponseFormat =
    | "json"
    | "text"
    | "form"
    | "arrayBuffer"

export interface AuthRequirements {
    consumer: Requirement
    token: Requirement
    administrativeOnly?: boolean
    sslRequired: boolean
    scopes?: readonly string[]
}

export interface EndpointDefinition<Params, Result> {
    readonly path: `services/${string}`
    readonly method: "GET" | "POST"
    readonly response: ResponseFormat
    readonly auth: AuthRequirements

    readonly __types?: {
        readonly params: Params
        readonly result: Result
    }
}

export type AnyEndpoint = EndpointDefinition<unknown, unknown>
export type ParamsOf<Endpoint> = Endpoint extends EndpointDefinition<infer Params, unknown> ? Params : never
export type ResultOf<Endpoint> = Endpoint extends EndpointDefinition<unknown, infer Result> ? Result: never
