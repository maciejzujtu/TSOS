import type { AccessTokenCredentials } from '@/core/auth'
import type { LangDict } from '@/types/common'

export type PhotoUserId = string | number

export type PhotosEmptyResult = Record<string, never>

export type PhotoData = ArrayBuffer

export interface PhotoVisibilityError {
    error?: string
    [key: string]: unknown
}

export interface PhotoVisibilityCheck {
    can_see_photo: boolean
    errors: PhotoVisibilityError[]
}

export interface MyPhotoVisibility {
    desc_for_user?: LangDict
}

export interface PhotoSettings {
    max_photo_file_size: number
    allow_to_upload_photo: boolean
    approve_photo_automatically: boolean
}

export interface PhotosCanSeePhotoParams {
    user_id?: string | number
}

export interface PhotosCanSeePhotoOptions {
    userId?: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type PhotosDeletePhotoParams = Record<string, never>

export interface PhotosDeletePhotoOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type PhotosMyPhotoVisibilityField = "desc_for_user" | `${string}[${string}]`

export interface PhotosMyPhotoVisibilityParams {
    fields?: readonly PhotosMyPhotoVisibilityField[]
}

export interface PhotosMyPhotoVisibilityOptions {
    fields?: readonly PhotosMyPhotoVisibilityField[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface PhotosPhotoParams {
    user_id?: string | number
    blank_photo?: boolean
    transform?: boolean
    max_width?: number
    max_height?: number
    enlarge?: boolean
    cover?: boolean
}

export interface PhotosPhotoOptions {
    userId?: string | number
    blankPhoto?: boolean
    transform?: boolean
    maxWidth?: number
    maxHeight?: number
    enlarge?: boolean
    cover?: boolean
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type PhotosSettingsParams = Record<string, never>

export interface PhotosSettingsOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type PhotosUpdatePhotoParams = Record<string, never>

export interface PhotosUpdatePhotoOptions {
    photo: Blob
    /** Filename sent in multipart/form-data. */
    filename?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
