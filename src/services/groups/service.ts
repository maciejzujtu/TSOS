import type { RequestExecutor } from '@/core/requester'
import { groupsEndpoints } from '@/services/groups/endpoints'
import type {
    ClassGroup,
    ClassGroupOptions,
    CommonGroup,
    CommonGroupsOptions,
    Group,
    GroupCollection,
    GroupOptions,
    GroupRoleOptions,
    GroupsOptions,
    LecturerGroupsOptions,
    ParticipantGroupsOptions,
    UserGroupCollection,
} from '@/services/groups/types'
import { formatGroupIdentifier } from '@/services/groups/types'
import type { CourseUnitId } from '@/types/common'

export class GroupsService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getClassGroup(options: ClassGroupOptions): Promise<ClassGroup> {
        return await this.request.request(groupsEndpoints.classGroup, {
            params: {
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
        })
    }

    public async getCommonGroups(options: CommonGroupsOptions): Promise<CommonGroup[]> {
        this.assertFields(options.fields, "getCommonGroups")

        return await this.request.request(groupsEndpoints.commonGroups, {
            params: {
                user_id: options.userId,
                fields: options.fields,
            },
        })
    }

    public async getGroup(options: GroupOptions): Promise<Group> {
        this.assertFields(options.fields, "getGroup")

        return await this.request.request(groupsEndpoints.group, {
            params: {
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
        })
    }

    public async getGroups(options: GroupsOptions): Promise<Record<string, Group | null>> {
        if (options.groups.length === 0) {
            throw new TypeError("getGroups requires at least one group")
        }
        this.assertFields(options.fields, "getGroups")

        return await this.request.request(groupsEndpoints.groups, {
            params: {
                group_ids: options.groups.map(formatGroupIdentifier),
                fields: options.fields,
            },
        })
    }

    public async isLecturer(options: GroupRoleOptions): Promise<boolean> {
        return await this.request.request(groupsEndpoints.isLecturer, {
            params: {
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                user_id: options.userId,
            },
        })
    }

    public async isParticipant(
        courseUnitId: CourseUnitId,
        groupNumber: number,
    ): Promise<boolean> {
        return await this.request.request(groupsEndpoints.isParticipant, {
            params: {
                course_unit_id: courseUnitId,
                group_number: groupNumber,
            },
        })
    }

    public async getLecturerGroups(
        options: LecturerGroupsOptions,
    ): Promise<GroupCollection> {
        this.assertFields(options.fields, "getLecturerGroups")

        return await this.request.request(groupsEndpoints.lecturer, {
            params: {
                fields: options.fields,
                user_id: options.userId,
                lang: options.lang,
                active_terms: options.activeTerms,
            },
        })
    }

    public async getParticipantGroups(
        options: ParticipantGroupsOptions,
    ): Promise<GroupCollection> {
        this.assertFields(options.fields, "getParticipantGroups")

        return await this.request.request(groupsEndpoints.participant, {
            params: {
                fields: options.fields,
                lang: options.lang,
                active_terms: options.activeTerms,
            },
        })
    }

    public async getUserGroups(
        options: ParticipantGroupsOptions,
    ): Promise<UserGroupCollection> {
        this.assertFields(options.fields, "getUserGroups")

        return await this.request.request(groupsEndpoints.user, {
            params: {
                fields: options.fields,
                lang: options.lang,
                active_terms: options.activeTerms,
            },
        })
    }

    private assertFields(fields: readonly unknown[], method: string): void {
        if (fields.length === 0) {
            throw new TypeError(`${method} requires at least one field`)
        }
    }
}
