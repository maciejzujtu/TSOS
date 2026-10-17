import type { AccessTokenCredentials } from '@/core/auth'
import type { LangDict } from '@/types/common'

export type PhoneEntityId = string | number

export interface PhoneType {
    id?: string
    description?: LangDict
}

export interface PhoneNumber {
    number?: string
    comment?: LangDict | null
    phone_type?: PhoneType | null
    type_id?: string
}

export interface PhoneInput {
    number: string
    comment?: LangDict | null
    type_id?: string
}

export interface PhoneReplaceResult {
    success: boolean
    user_messages?: unknown[]
}

export type PhoneSelection = Record<string, PhoneNumber[]>

export type PhonesPhoneNumberField = "number" | "comment" | "phone_type" | `${string}[${string}]`

export interface PhonesPhoneNumberParams {
    phone_id: string | number
    fields?: readonly PhonesPhoneNumberField[]
}

export interface PhonesPhoneNumberOptions {
    phoneId: string | number
    fields?: readonly PhonesPhoneNumberField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type PhonesPhoneTypeField = "id" | "description" | `${string}[${string}]`

export interface PhonesPhoneTypeParams {
    id: string | number
    fields?: readonly PhonesPhoneTypeField[]
}

export interface PhonesPhoneTypeOptions {
    id: string | number
    fields?: readonly PhonesPhoneTypeField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface PhonesReplaceParams {
    data: string
    fac_id?: string | number
    user_id?: string | number
    building_id?: string | number
    dorm_id?: string | number
}

export interface PhonesReplaceOptions {
    data: readonly PhoneInput[]
    facId?: string | number
    userId?: string | number
    buildingId?: string | number
    dormId?: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type PhonesSelectField = "number" | "comment" | "type_id" | `${string}[${string}]`

export interface PhonesSelectParams {
    fields?: readonly PhonesSelectField[]
    fac_ids?: readonly (string | number)[]
    user_ids?: readonly (string | number)[]
    building_ids?: readonly (string | number)[]
    dorm_ids?: readonly (string | number)[]
}

export interface PhonesSelectOptions {
    fields?: readonly PhonesSelectField[]
    facIds?: readonly (string | number)[]
    userIds?: readonly (string | number)[]
    buildingIds?: readonly (string | number)[]
    dormIds?: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
