import type { RequestExecutor } from '@/core/requester'
import { events2Endpoints } from '@/services/events2/endpoints'
import type * as T from '@/services/events2/types'

export class Events2Service {
    public constructor(private readonly request: RequestExecutor) {}

    /** Add user to recipients list */
    public async addRecipient(options: T.Events2AddRecipientOptions): Promise<T.Events2Recipients> {
        return await this.request.request(events2Endpoints.addRecipient, {
            params: {
                statement_id: options.statementId,
                user_id: options.userId,
            },
            token: options.accessToken,
        })
    }

    /** Delete user from recipients list */
    public async deleteRecipient(options: T.Events2DeleteRecipientOptions): Promise<T.Events2Recipients> {
        return await this.request.request(events2Endpoints.deleteRecipient, {
            params: {
                statement_id: options.statementId,
                user_id: options.userId,
            },
            token: options.accessToken,
        })
    }

    /** Delete statement */
    public async deleteStatement(options: T.Events2DeleteStatementOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.deleteStatement, {
            params: {
                id: options.id,
            },
            token: options.accessToken,
        })
    }

    /** Get information about distribution channel */
    public async getDistributionChannel(options: T.Events2DistributionChannelOptions): Promise<T.Events2DistributionChannel> {
        return await this.request.request(events2Endpoints.distributionChannel, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** get information about assignment channel to event type */
    public async getEventChannel(options: T.Events2EventChannelOptions): Promise<T.Events2EventChannel> {
        return await this.request.request(events2Endpoints.eventChannel, {
            params: {
                event_type_id: options.eventTypeId,
                channel_id: options.channelId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get user prefetences for given event type channel */
    public async getEventChannelPreference(options: T.Events2EventChannelPreferenceOptions): Promise<T.Events2EventChannelPreference> {
        return await this.request.request(events2Endpoints.eventChannelPreference, {
            params: {
                event_channel_id: options.eventChannelId,
            },
            token: options.accessToken,
        })
    }

    /** get single user preference object */
    public async getEventPreference(options: T.Events2EventPreferenceOptions): Promise<T.Events2EventPreference> {
        return await this.request.request(events2Endpoints.eventPreference, {
            params: {
                event_channel_id: options.eventChannelId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information about event type */
    public async getEventType(options: T.Events2EventTypeOptions): Promise<T.Events2EventType> {
        return await this.request.request(events2Endpoints.eventType, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** get event type schedule details */
    public async getEventTypeSchedule(options: T.Events2EventTypeScheduleOptions): Promise<T.Events2EventTypeSchedule> {
        return await this.request.request(events2Endpoints.eventTypeSchedule, {
            params: {
                event_type_schedule_id: options.eventTypeScheduleId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get all events types */
    public async getEventTypesIndex(options: T.Events2EventTypesIndexOptions = {}): Promise<T.Events2EventType[]> {
        return await this.request.request(events2Endpoints.eventTypesIndex, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Generate and send one time code to user */
    public async generateOneTimeCode(options: T.Events2GenerateOneTimeCodeOptions = {}): Promise<T.Events2OneTimeCodeToken> {
        return await this.request.request(events2Endpoints.generateOneTimeCode, {
            token: options.accessToken,
        })
    }

    /** Generate and send one time code to user */
    public async generateOneTimeCode2(options: T.Events2GenerateOneTimeCode2Options = {}): Promise<T.Events2OneTimeCode> {
        return await this.request.request(events2Endpoints.generateOneTimeCode2, {
            token: options.accessToken,
        })
    }

    /** Get user's notifications */
    public async getLatestNotifications(options: T.Events2LatestNotificationsOptions = {}): Promise<T.Events2Notification[]> {
        return await this.request.request(events2Endpoints.latestNotifications, {
            token: options.accessToken,
        })
    }

    /** List of all notifiaction channels */
    public async getNotificationChannelsIndex(options: T.Events2NotificationChannelsIndexOptions = {}): Promise<T.Events2NotificationChannel[]> {
        return await this.request.request(events2Endpoints.notificationChannelsIndex, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get notifications sending schedule details */
    public async getNotificationsSchedule(options: T.Events2NotificationsScheduleOptions): Promise<T.Events2NotificationSchedule> {
        return await this.request.request(events2Endpoints.notificationsSchedule, {
            params: {
                schedule_id: options.scheduleId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get all available schedules */
    public async getNotificationsScheduleIndex(options: T.Events2NotificationsScheduleIndexOptions = {}): Promise<T.Events2NotificationSchedule[]> {
        return await this.request.request(events2Endpoints.notificationsScheduleIndex, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Filter statements */
    public async getPersonalizedStatements(options: T.Events2PersonalizedStatementsOptions = {}): Promise<T.Events2Statement[]> {
        return await this.request.request(events2Endpoints.personalizedStatements, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Filter statements */
    public async searchStatements(options: T.Events2SearchStatementsOptions = {}): Promise<T.Events2Statement[]> {
        return await this.request.request(events2Endpoints.searchStatements, {
            params: {
                start: options.start,
                end: options.end,
                for_user: options.forUser,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Send custom notification to selected user */
    public async sendNotification(options: T.Events2SendNotificationOptions): Promise<T.Events2EmptyResult> {
        if ((options.userId === undefined) === (options.userIds === undefined) || options.userIds?.length === 0) {
            throw new TypeError("sendNotification requires exactly one nonempty userId or userIds selector")
        }
        return await this.request.request(events2Endpoints.sendNotification, {
            params: {
                message_pl: options.messagePl,
                user_id: options.userId,
                user_ids: options.userIds,
                message_en: options.messageEn,
                event_type_id: options.eventTypeId,
                send_after: options.sendAfter,
                data: options.data,
            },
            token: options.accessToken,
        })
    }

    /** Get statement */
    public async getStatement(options: T.Events2StatementOptions): Promise<T.Events2Statement> {
        return await this.request.request(events2Endpoints.statement, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Update event channel for selected event type */
    public async updateEventChannel(options: T.Events2UpdateEventChannelOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.updateEventChannel, {
            body: JSON.stringify(options.body),
            headers: { "Content-Type": "application/json" },
            token: options.accessToken,
        })
    }

    /** update event type schedule */
    public async updateEventSchedule(options: T.Events2UpdateEventScheduleOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.updateEventSchedule, {
            body: JSON.stringify(options.body),
            headers: { "Content-Type": "application/json" },
            token: options.accessToken,
        })
    }

    /** Get information about event type */
    public async updateEventType(options: T.Events2UpdateEventTypeOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.updateEventType, {
            body: JSON.stringify(options.body),
            headers: { "Content-Type": "application/json" },
            token: options.accessToken,
        })
    }

    /** Update or insert statement */
    public async updateStatement(options: T.Events2UpdateStatementOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.updateStatement, {
            body: JSON.stringify(options.body),
            headers: { "Content-Type": "application/json" },
            token: options.accessToken,
        })
    }

    /** Update user preference object */
    public async updateUserPreference(options: T.Events2UpdateUserPreferenceOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.updateUserPreference, {
            body: JSON.stringify(options.body),
            headers: { "Content-Type": "application/json" },
            token: options.accessToken,
        })
    }

    /** Get user preferences */
    public async getUserPreferences(options: T.Events2UserPreferencesOptions = {}): Promise<T.Events2EventPreference[]> {
        return await this.request.request(events2Endpoints.userPreferences, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Generate and send one time code to user */
    public async validateOneTimeCode(options: T.Events2ValidateOneTimeCodeOptions): Promise<T.Events2EmptyResult> {
        return await this.request.request(events2Endpoints.validateOneTimeCode, {
            params: {
                id: options.id,
                code: options.code,
            },
            token: options.accessToken,
        })
    }
}
