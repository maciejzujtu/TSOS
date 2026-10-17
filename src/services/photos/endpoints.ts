import type { EndpointDefinition } from '@/core/endpoint'
import type * as T from '@/services/photos/types'

export interface PhotosEndpoints {
    canSeePhoto: EndpointDefinition<T.PhotosCanSeePhotoParams, T.PhotoVisibilityCheck>
    deletePhoto: EndpointDefinition<T.PhotosDeletePhotoParams, T.PhotosEmptyResult>
    myPhotoVisibility: EndpointDefinition<T.PhotosMyPhotoVisibilityParams, T.MyPhotoVisibility>
    photo: EndpointDefinition<T.PhotosPhotoParams, T.PhotoData>
    settings: EndpointDefinition<T.PhotosSettingsParams, T.PhotoSettings>
    updatePhoto: EndpointDefinition<T.PhotosUpdatePhotoParams, T.PhotosEmptyResult>
}

export const photosEndpoints: PhotosEndpoints = {
    canSeePhoto: {
        path: "services/photos/can_see_photo",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    deletePhoto: {
        path: "services/photos/delete_photo",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    myPhotoVisibility: {
        path: "services/photos/my_photo_visibility",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["photo"],
        },
    },
    photo: {
        path: "services/photos/photo",
        method: "GET",
        response: "arrayBuffer",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    settings: {
        path: "services/photos/settings",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    updatePhoto: {
        path: "services/photos/update_photo",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
}
