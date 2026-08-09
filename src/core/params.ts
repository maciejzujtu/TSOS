export type ParameterPrimitive =
    | string
    | number
    | boolean

export type ParameterValue =
    | ParameterPrimitive
    | readonly ParameterPrimitive[]
    | Readonly<Record<string, unknown>>
    | null
    | undefined

export type RequestParameters =
    Readonly<Record<string, ParameterValue>>

export function serializeParameters(params: RequestParameters = {}): URLSearchParams {
    const result = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) {
            continue
        }

        if (Array.isArray(value)) {
            result.set(key, value.map(String).join("|"))
            continue
        }

        if (typeof value === "object") {
            result.set(key, JSON.stringify(value))
            continue
        }

        result.set(key, String(value))
    }
    return result
}
