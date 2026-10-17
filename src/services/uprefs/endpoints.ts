import type { EndpointDefinition } from '@/core/endpoint'
import type * as T from '@/services/uprefs/types'

export interface UprefsEndpoints {
    changePreference: EndpointDefinition<T.UprefsChangePreferenceParams, T.UprefChangeResult>
    preference: EndpointDefinition<T.UprefsPreferenceParams, T.UprefPreference>
    preferences: EndpointDefinition<T.UprefsPreferencesParams, T.UprefPreferences>
    values: EndpointDefinition<T.UprefsValuesParams, T.UprefValues>
}

export const uprefsEndpoints: UprefsEndpoints = {
    changePreference: {
        path: "services/uprefs/change_preference",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["change_all_preferences"],
        },
    },
    preference: {
        path: "services/uprefs/preference",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    preferences: {
        path: "services/uprefs/preferences",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    values: {
        path: "services/uprefs/values",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
}
