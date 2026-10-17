import type { RequestExecutor } from '@/core/requester'
import { phonesEndpoints } from '@/services/phones/endpoints'
import type * as T from '@/services/phones/types'

export class PhonesService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Get phone number details @beta */
    public async getPhoneNumber(options: T.PhonesPhoneNumberOptions): Promise<T.PhoneNumber> {
        return await this.request.request(phonesEndpoints.phoneNumber, {
            params: {
                phone_id: options.phoneId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** get phone type @beta */
    public async getPhoneType(options: T.PhonesPhoneTypeOptions): Promise<T.PhoneType> {
        return await this.request.request(phonesEndpoints.phoneType, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Replace all phone numbers bound to the given entity. @beta */
    public async replace(options: T.PhonesReplaceOptions): Promise<T.PhoneReplaceResult> {
        const entityCount = [options.facId, options.userId, options.buildingId, options.dormId].filter(value => value !== undefined).length
        if (entityCount !== 1) throw new TypeError("replace requires exactly one entity ID")
        return await this.request.request(phonesEndpoints.replace, {
            params: {
                data: JSON.stringify(options.data),
                fac_id: options.facId,
                user_id: options.userId,
                building_id: options.buildingId,
                dorm_id: options.dormId,
            },
            token: options.accessToken,
        })
    }

    /** Get the phone numbers bound to the given entities. @beta */
    public async select(options: T.PhonesSelectOptions = {}): Promise<T.PhoneSelection> {
        return await this.request.request(phonesEndpoints.select, {
            params: {
                fields: options.fields,
                fac_ids: options.facIds,
                user_ids: options.userIds,
                building_ids: options.buildingIds,
                dorm_ids: options.dormIds,
            },
            token: options.accessToken,
        })
    }
}
