import type { EndpointDefinition } from '@/core/endpoint'
import type {
    CalendarEvent,
    CalendarEventParams,
    CalendarSearchParams,
} from '@/services/calendar/types'

export interface CalendarEndpoints {
    calendarEvent: EndpointDefinition<CalendarEventParams, CalendarEvent>
    search: EndpointDefinition<CalendarSearchParams, CalendarEvent[]>
}

const calendarAuth = {
    consumer: "required",
    token: "optional",
    sslRequired: true,
} as const

export const calendarEndpoints: CalendarEndpoints = {
    /** @beta The upstream USOS API marks this method as beta. */
    calendarEvent: {
        path: "services/calendar/calendar_event",
        method: "GET",
        response: "json",
        auth: calendarAuth,
    },
    /** @beta The upstream USOS API marks this method as beta. */
    search: {
        path: "services/calendar/search",
        method: "GET",
        response: "json",
        auth: calendarAuth,
    },
}
