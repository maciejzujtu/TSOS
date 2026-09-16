import type { EndpointDefinition } from '@/core/endpoint'
import type {
    Activity,
    ClassGroupDates2Params,
    ClassGroupDatesParams,
    ClassGroupsTimetableParams,
    ClassGroupTimetableParams,
    CourseEditionsTimetableParams,
    CourseEditionTimetableParams,
    RoomTimetableParams,
    StaffTimetableParams,
    StudentTimetableParams,
    UpcomingIcalParams,
    UpcomingShare,
    UpcomingShareParams,
    UserTimetableParams,
} from '@/services/tt/types'

export interface TtEndpoints {
    classGroup: EndpointDefinition<ClassGroupTimetableParams, Activity[]>
    classGroupDates: EndpointDefinition<ClassGroupDatesParams, string[]>
    classGroupDates2: EndpointDefinition<ClassGroupDates2Params, Activity[]>
    classGroups: EndpointDefinition<ClassGroupsTimetableParams, Activity[]>
    courseEdition: EndpointDefinition<CourseEditionTimetableParams, Activity[]>
    courseEditions: EndpointDefinition<CourseEditionsTimetableParams, Activity[]>
    room: EndpointDefinition<RoomTimetableParams, Activity[]>
    staff: EndpointDefinition<StaffTimetableParams, Activity[]>
    student: EndpointDefinition<StudentTimetableParams, Activity[]>
    upcomingIcal: EndpointDefinition<UpcomingIcalParams, string>
    upcomingShare: EndpointDefinition<UpcomingShareParams, UpcomingShare>
    user: EndpointDefinition<UserTimetableParams, Activity[]>
}

const publicAuth = {
    consumer: "ignored",
    token: "ignored",
    sslRequired: false,
} as const

const consumerAuth = {
    consumer: "required",
    token: "ignored",
    sslRequired: false,
} as const

const optionalAuth = {
    consumer: "optional",
    token: "optional",
    sslRequired: false,
} as const

const userAuth = {
    consumer: "required",
    token: "required",
    sslRequired: false,
    scopes: ["studies"],
} as const

export const ttEndpoints: TtEndpoints = {
    classGroup: {
        path: "services/tt/classgroup",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    classGroupDates: {
        path: "services/tt/classgroup_dates",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    classGroupDates2: {
        path: "services/tt/classgroup_dates2",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    classGroups: {
        path: "services/tt/classgroups",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    courseEdition: {
        path: "services/tt/course_edition",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    courseEditions: {
        path: "services/tt/course_editions",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    room: {
        path: "services/tt/room",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    staff: {
        path: "services/tt/staff",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    student: {
        path: "services/tt/student",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
    upcomingIcal: {
        path: "services/tt/upcoming_ical",
        method: "GET",
        response: "text",
        auth: optionalAuth,
    },
    upcomingShare: {
        path: "services/tt/upcoming_share",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
    user: {
        path: "services/tt/user",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
}
