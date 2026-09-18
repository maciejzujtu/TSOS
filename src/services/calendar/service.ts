import type { RequestExecutor } from '@/core/requester'
import { calendarEndpoints } from '@/services/calendar/endpoints'
import type {
    CalendarEvent,
    CalendarEventFields,
    CalendarEventId,
    SearchCalendarOptions,
} from '@/services/calendar/types'

export class CalendarService {
    public constructor(private readonly request: RequestExecutor) {}

    /** @beta The upstream USOS API marks this method as beta. */
    public async getCalendarEvent(
        id: CalendarEventId,
        fields?: readonly CalendarEventFields[],
    ): Promise<CalendarEvent> {
        return await this.request.request(calendarEndpoints.calendarEvent, {
            params: { id, fields },
        })
    }

    /** @beta The upstream USOS API marks this method as beta. */
    public async search(options: SearchCalendarOptions): Promise<CalendarEvent[]> {
        return await this.request.request(calendarEndpoints.search, {
            params: {
                faculty_id: options.facultyId,
                start_date: options.startDate,
                end_date: options.endDate,
                fields: options.fields,
            },
        })
    }
}
