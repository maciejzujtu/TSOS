import type { RequestExecutor } from '@/core/requester'
import { attendanceEndpoints } from '@/services/attendance/endpoints'
import type {
    AttendanceEntry,
    AttendanceList,
    AttendanceListFields,
    AttendanceListId,
    CreateAttendanceListOptions,
    CreatedAttendanceList,
    CreateFromTimetableOptions,
    EmptyResponse,
    GetAttendanceOptions,
    GetGroupAttendanceListsOptions,
    MeetingMode,
    UpdateAttendanceOptions,
} from '@/services/attendance/types'

export class AttendanceService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getAttendance(options: GetAttendanceOptions): Promise<AttendanceEntry[]> {
        return await this.request.request(attendanceEndpoints.attendance, {
            params: {
                list_id: options.listId,
                student_ids: options.studentIds,
                fields: options.fields,
            },
        })
    }

    public async getAttendanceList(
        listId: AttendanceListId,
        fields?: readonly AttendanceListFields[],
    ): Promise<AttendanceList> {
        return await this.request.request(attendanceEndpoints.attendanceList, {
            params: {
                list_id: listId,
                fields,
            },
        })
    }

    public async getAttendanceLists(
        listIds: readonly AttendanceListId[],
        fields?: readonly AttendanceListFields[],
    ): Promise<Record<string, AttendanceList | null>> {
        if (listIds.length === 0) {
            throw new TypeError("getAttendanceLists requires at least one list ID")
        }

        return await this.request.request(attendanceEndpoints.attendanceLists, {
            params: {
                list_ids: listIds,
                fields,
            },
        })
    }

    public async changeListMode(
        listId: AttendanceListId,
        mode: MeetingMode,
    ): Promise<EmptyResponse> {
        return await this.request.request(attendanceEndpoints.changeListMode, {
            params: {
                list_id: listId,
                mode,
            },
        })
    }

    public async createAttendanceList(
        options: CreateAttendanceListOptions,
    ): Promise<CreatedAttendanceList> {
        return await this.request.request(attendanceEndpoints.createAttendanceList, {
            params: {
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                date: options.date,
                mode: options.mode,
            },
        })
    }

    public async createFromTimetable(
        options: CreateFromTimetableOptions,
    ): Promise<EmptyResponse> {
        return await this.request.request(attendanceEndpoints.createFromTimetable, {
            params: {
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                default_mode: options.defaultMode,
            },
        })
    }

    public async deleteAttendanceList(listId: AttendanceListId): Promise<EmptyResponse> {
        return await this.request.request(attendanceEndpoints.deleteAttendanceList, {
            params: { list_id: listId },
        })
    }

    public async getGroupAttendanceLists(
        options: GetGroupAttendanceListsOptions,
    ): Promise<AttendanceList[]> {
        return await this.request.request(attendanceEndpoints.groupAttendanceLists, {
            params: {
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
        })
    }

    public async updateAttendance(options: UpdateAttendanceOptions): Promise<EmptyResponse> {
        return await this.request.request(attendanceEndpoints.updateAttendance, {
            params: {
                list_id: options.listId,
                student_id: options.studentId,
                attendance_mode: options.attendanceMode,
                comment: options.comment,
            },
        })
    }

    public async getUserAttendanceLists(
        fields?: readonly AttendanceListFields[],
    ): Promise<AttendanceList[]> {
        return await this.request.request(attendanceEndpoints.userAttendanceLists, {
            params: { fields },
        })
    }
}
