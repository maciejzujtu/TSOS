import type { RequestExecutor } from '@/core/requester'
import { photosEndpoints } from '@/services/photos/endpoints'
import type * as T from '@/services/photos/types'

export class PhotosService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Check if one user can view other user's photo. @beta */
    public async canSeePhoto(options: T.PhotosCanSeePhotoOptions = {}): Promise<T.PhotoVisibilityCheck> {
        return await this.request.request(photosEndpoints.canSeePhoto, {
            params: {
                user_id: options.userId,
            },
            token: options.accessToken,
        })
    }

    /** Delete user's photo. @beta */
    public async deletePhoto(options: T.PhotosDeletePhotoOptions = {}): Promise<T.PhotosEmptyResult> {
        return await this.request.request(photosEndpoints.deletePhoto, {
            token: options.accessToken,
        })
    }

    /** Get information on the visibility of the user's photo. */
    public async getMyPhotoVisibility(options: T.PhotosMyPhotoVisibilityOptions = {}): Promise<T.MyPhotoVisibility> {
        return await this.request.request(photosEndpoints.myPhotoVisibility, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get user's photo. @beta */
    public async getPhoto(options: T.PhotosPhotoOptions = {}): Promise<T.PhotoData> {
        if (options.transform && (options.maxWidth === undefined || options.maxHeight === undefined)) {
            throw new TypeError("photo transformation requires maxWidth and maxHeight")
        }
        for (const dimension of [options.maxWidth, options.maxHeight]) {
            if (dimension !== undefined && (!Number.isInteger(dimension) || dimension < 1 || dimension > 1000)) {
                throw new RangeError("photo dimensions must be integers between 1 and 1000")
            }
        }
        return await this.request.request(photosEndpoints.photo, {
            params: {
                user_id: options.userId,
                blank_photo: options.blankPhoto,
                transform: options.transform,
                max_width: options.maxWidth,
                max_height: options.maxHeight,
                enlarge: options.enlarge,
                cover: options.cover,
            },
            token: options.accessToken,
        })
    }

    /** Get current photo settings. @beta */
    public async getSettings(options: T.PhotosSettingsOptions = {}): Promise<T.PhotoSettings> {
        return await this.request.request(photosEndpoints.settings, {
            token: options.accessToken,
        })
    }

    /** Update user's photo. @beta */
    public async updatePhoto(options: T.PhotosUpdatePhotoOptions): Promise<T.PhotosEmptyResult> {
        const body = new FormData()
        const filename = options.filename ?? (typeof File !== "undefined" && options.photo instanceof File
            ? options.photo.name
            : "photo")
        body.append("photo", options.photo, filename)
        return await this.request.request(photosEndpoints.updatePhoto, { body, token: options.accessToken })
    }
}
