import type { EndpointDefinition } from '@/core/endpoint'
import type * as T from '@/services/phones/types'

export interface PhonesEndpoints {
    phoneNumber: EndpointDefinition<T.PhonesPhoneNumberParams, T.PhoneNumber>
    phoneType: EndpointDefinition<T.PhonesPhoneTypeParams, T.PhoneType>
    replace: EndpointDefinition<T.PhonesReplaceParams, T.PhoneReplaceResult>
    select: EndpointDefinition<T.PhonesSelectParams, T.PhoneSelection>
}

export const phonesEndpoints: PhonesEndpoints = {
    phoneNumber: {
        path: "services/phones/phone_number",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    phoneType: {
        path: "services/phones/phone_type",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: true,
        },
    },
    replace: {
        path: "services/phones/replace",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: true,
        },
    },
    select: {
        path: "services/phones/select",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: true,
        },
    },
}
