import type { EndpointDefinition } from '@/core/endpoint'
import type {
    AttendanceEntry,
    AttendanceList,
    AttendanceListParams,
    AttendanceListsParams,
    AttendanceParams,
    ChangeListModeParams,
    CreateAttendanceListParams,
    CreatedAttendanceList,
    CreateFromTimetableParams,
    DeleteAttendanceListParams,
    EmptyResponse,
    GroupAttendanceListsParams,
    UpdateAttendanceParams,
    UserAttendanceListsParams,
} from '@/services/attendance/types'

export interface AttendanceEndpoints {
    attendance: EndpointDefinition<AttendanceParams, AttendanceEntry[]>
    attendanceList: EndpointDefinition<AttendanceListParams, AttendanceList>
    attendanceLists: EndpointDefinition<AttendanceListsParams, Record<string, AttendanceList | null>>
    changeListMode: EndpointDefinition<ChangeListModeParams, EmptyResponse>
    createAttendanceList: EndpointDefinition<CreateAttendanceListParams, CreatedAttendanceList>
    createFromTimetable: EndpointDefinition<CreateFromTimetableParams, EmptyResponse>
    deleteAttendanceList: EndpointDefinition<DeleteAttendanceListParams, EmptyResponse>
    groupAttendanceLists: EndpointDefinition<GroupAttendanceListsParams, AttendanceList[]>
    updateAttendance: EndpointDefinition<UpdateAttendanceParams, EmptyResponse>
    userAttendanceLists: EndpointDefinition<UserAttendanceListsParams, AttendanceList[]>
}

const attendanceAuth = {
    consumer: "required",
    token: "required",
    sslRequired: true,
    scopes: ["staff_perspective"],
} as const

export const attendanceEndpoints: AttendanceEndpoints = {
    attendance: {
        path: "services/attendance/attendance",
        method: "GET",
        response: "json",
        auth: attendanceAuth,
    },
    attendanceList: {
        path: "services/attendance/attendance_list",
        method: "GET",
        response: "json",
        auth: attendanceAuth,
    },
    attendanceLists: {
        path: "services/attendance/attendance_lists",
        method: "GET",
        response: "json",
        auth: attendanceAuth,
    },
    changeListMode: {
        path: "services/attendance/change_list_mode",
        method: "POST",
        response: "json",
        auth: attendanceAuth,
    },
    createAttendanceList: {
        path: "services/attendance/create_attendance_list",
        method: "POST",
        response: "json",
        auth: attendanceAuth,
    },
    createFromTimetable: {
        path: "services/attendance/create_from_tt",
        method: "POST",
        response: "json",
        auth: attendanceAuth,
    },
    deleteAttendanceList: {
        path: "services/attendance/delete_list",
        method: "POST",
        response: "json",
        auth: attendanceAuth,
    },
    groupAttendanceLists: {
        path: "services/attendance/group",
        method: "GET",
        response: "json",
        auth: attendanceAuth,
    },
    updateAttendance: {
        path: "services/attendance/update_attendance",
        method: "POST",
        response: "json",
        auth: attendanceAuth,
    },
    userAttendanceLists: {
        path: "services/attendance/user",
        method: "GET",
        response: "json",
        auth: attendanceAuth,
    },
}
