import type { RequestExecutor } from '@/core/requester'
import { eventsEndpoints } from '@/services/events/endpoints'
import type * as T from '@/services/events/types'

export class EventsService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Get information on the status of the notifier. @beta */
    public async getNotifierStatus(options: T.EventsNotifierStatusOptions = {}): Promise<T.EventNotifierStatus> {
        return await this.request.request(eventsEndpoints.notifierStatus, {
            token: options.accessToken,
        })
    }

    /** Register instance ID. @beta */
    public async registerFcmToken(options: T.EventsRegisterFcmTokenOptions): Promise<T.EventsEmptyResult> {
        return await this.request.request(eventsEndpoints.registerFcmToken, {
            params: {
                fcm_registration_token: options.fcmRegistrationToken,
                instance_id: options.instanceId,
                instance_name: options.instanceName,
            },
            token: options.accessToken,
        })
    }

    /** List your (user) registered FCM instances. @beta */
    public async getRegisteredFcmTokens(options: T.EventsRegisteredFcmTokensOptions = {}): Promise<T.FcmRegistration[]> {
        return await this.request.request(eventsEndpoints.registeredFcmTokens, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Subscribe for event notifications. @beta */
    public async subscribeEvent(options: T.EventsSubscribeEventOptions): Promise<T.CreatedEventSubscription> {
        return await this.request.request(eventsEndpoints.subscribeEvent, {
            params: {
                event_type: options.eventType,
                callback_url: options.callbackUrl,
                verify_token: options.verifyToken,
            },
            token: options.accessToken,
        })
    }

    /** Lists your (the consumer) subscriptions. @beta */
    public async getSubscriptions(options: T.EventsSubscriptionsOptions = {}): Promise<T.EventSubscription[]> {
        return await this.request.request(eventsEndpoints.subscriptions, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Send a notification to your FCM instances @beta */
    public async testMyFcm(options: T.EventsTestMyFcmOptions): Promise<T.EventsEmptyResult> {
        return await this.request.request(eventsEndpoints.testMyFcm, {
            params: {
                message: options.message,
            },
            token: options.accessToken,
        })
    }

    /** Unsubscribe from event notifications. @beta */
    public async unsubscribe(options: T.EventsUnsubscribeOptions = {}): Promise<T.EventsEmptyResult> {
        if (options.id === undefined && (options.eventType === undefined || options.callbackUrl === undefined)) {
            throw new TypeError("unsubscribe requires an ID or both eventType and callbackUrl")
        }
        return await this.request.request(eventsEndpoints.unsubscribe, {
            params: {
                id: options.id,
                event_type: options.eventType,
                callback_url: options.callbackUrl,
            },
            token: options.accessToken,
        })
    }
}
