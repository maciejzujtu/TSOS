import type { RequestExecutor } from '@/core/requester'
import { ttEndpoints } from '@/services/tt/endpoints'
import type {
    Activity,
    ClassGroupDates2Options,
    ClassGroupDatesOptions,
    ClassGroupsTimetableOptions,
    ClassGroupTimetableOptions,
    CourseEditionsTimetableOptions,
    CourseEditionTimetableOptions,
    RoomTimetableOptions,
    StaffTimetableOptions,
    StudentTimetableOptions,
    UpcomingIcalOptions,
    UpcomingShare,
    UserTimetableOptions,
} from '@/services/tt/types'
import type { Language } from '@/types/common'

export class TtService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getClassGroup(options: ClassGroupTimetableOptions): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.classGroup, {
            params: {
                unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getClassGroupDates(options: ClassGroupDatesOptions): Promise<string[]> {
        return await this.request.request(ttEndpoints.classGroupDates, {
            params: {
                unit_id: options.courseUnitId,
                group_number: options.groupNumber,
            },
        })
    }

    public async getClassGroupDates2(options: ClassGroupDates2Options): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.classGroupDates2, {
            params: {
                unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
        })
    }

    public async getClassGroups(options: ClassGroupsTimetableOptions): Promise<Activity[]> {
        this.assertIdentifiers(options.classGroupIds, "getClassGroups", "class group")

        return await this.request.request(ttEndpoints.classGroups, {
            params: {
                classgroup_ids: options.classGroupIds,
                partial: options.partial,
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getCourseEdition(
        options: CourseEditionTimetableOptions,
    ): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.courseEdition, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getCourseEditions(
        options: CourseEditionsTimetableOptions,
    ): Promise<Activity[]> {
        this.assertIdentifiers(options.courseEditionIds, "getCourseEditions", "course edition")

        return await this.request.request(ttEndpoints.courseEditions, {
            params: {
                course_edition_ids: options.courseEditionIds,
                partial: options.partial,
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getRoom(options: RoomTimetableOptions): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.room, {
            params: {
                room_id: options.roomId,
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getStaff(options: StaffTimetableOptions = {}): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.staff, {
            params: {
                user_id: options.userId,
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getStudent(options: StudentTimetableOptions = {}): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.student, {
            params: {
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    public async getUpcomingIcal(options: UpcomingIcalOptions): Promise<string> {
        return await this.request.request(ttEndpoints.upcomingIcal, {
            params: {
                user_id: options.userId,
                lang: options.lang,
                key: options.key,
            },
        })
    }

    public async getUpcomingShare(lang: Language): Promise<UpcomingShare> {
        return await this.request.request(ttEndpoints.upcomingShare, {
            params: { lang },
        })
    }

    public async getUser(options: UserTimetableOptions = {}): Promise<Activity[]> {
        return await this.request.request(ttEndpoints.user, {
            params: {
                start: options.start,
                days: options.days,
                fields: options.fields,
            },
        })
    }

    private assertIdentifiers(
        identifiers: readonly unknown[],
        method: string,
        identifierName: string,
    ): void {
        if (identifiers.length === 0) {
            throw new TypeError(`${method} requires at least one ${identifierName} ID`)
        }
    }
}
