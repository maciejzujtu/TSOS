import type { RequestExecutor } from '@/core/requester'
import { uprefsEndpoints } from '@/services/uprefs/endpoints'
import type * as T from '@/services/uprefs/types'

export class UprefsService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Change the value of a preference. */
    public async changePreference(options: T.UprefsChangePreferenceOptions): Promise<T.UprefChangeResult> {
        return await this.request.request(uprefsEndpoints.changePreference, {
            params: {
                upref_id: options.uprefId,
                value: options.value,
            },
            token: options.accessToken,
        })
    }

    /** Get information on a given preference (or group). */
    public async getPreference(options: T.UprefsPreferenceOptions): Promise<T.UprefPreference> {
        if (options.fields.length === 0) {
            throw new TypeError("getPreference requires at least one field")
        }
        return await this.request.request(uprefsEndpoints.preference, {
            params: {
                upref_id: options.uprefId,
                fields: options.fields,
                preferred_types: options.preferredTypes,
            },
            token: options.accessToken,
        })
    }

    /** Get information on multiple preferences. */
    public async getPreferences(options: T.UprefsPreferencesOptions): Promise<T.UprefPreferences> {
        if (options.uprefIds.length === 0 || options.fields.length === 0) {
            throw new TypeError("getPreferences requires at least one preference ID and field")
        }
        return await this.request.request(uprefsEndpoints.preferences, {
            params: {
                upref_ids: options.uprefIds,
                fields: options.fields,
                preferred_types: options.preferredTypes,
            },
            token: options.accessToken,
        })
    }

    /** Fetch the values of a single preference for multiple users. */
    public async getValues(options: T.UprefsValuesOptions): Promise<T.UprefValues> {
        if (options.userIds.length === 0) {
            throw new TypeError("getValues requires at least one user ID")
        }
        return await this.request.request(uprefsEndpoints.values, {
            params: {
                upref_id: options.uprefId,
                user_ids: options.userIds,
            },
            token: options.accessToken,
        })
    }
}
