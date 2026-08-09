import type { EndpointDefinition } from '@/core/endpoint'
import type {
    ClassGroup,
    ClassGroupParams,
    CommonGroup,
    CommonGroupsParams,
    Group,
    GroupCollection,
    GroupParticipantParams,
    GroupParams,
    GroupRoleParams,
    GroupsParams,
    LecturerGroupsParams,
    ParticipantGroupsParams,
    UserGroupCollection,
} from '@/services/groups/types'

export interface GroupsEndpoints {
    classGroup: EndpointDefinition<ClassGroupParams, ClassGroup>
    commonGroups: EndpointDefinition<CommonGroupsParams, CommonGroup[]>
    group: EndpointDefinition<GroupParams, Group>
    groups: EndpointDefinition<GroupsParams, Record<string, Group | null>>
    isLecturer: EndpointDefinition<GroupRoleParams, boolean>
    isParticipant: EndpointDefinition<GroupParticipantParams, boolean>
    lecturer: EndpointDefinition<LecturerGroupsParams, GroupCollection>
    participant: EndpointDefinition<ParticipantGroupsParams, GroupCollection>
    user: EndpointDefinition<ParticipantGroupsParams, UserGroupCollection>
}

const optionalAuth = {
    consumer: "optional",
    token: "optional",
    sslRequired: false,
} as const

const userAuth = {
    consumer: "required",
    token: "required",
    sslRequired: false,
} as const

export const groupsEndpoints: GroupsEndpoints = {
    classGroup: {
        path: "services/groups/class_group",
        method: "GET",
        response: "json",
        auth: {
            ...optionalAuth,
            sslRequired: true,
        },
    },
    commonGroups: {
        path: "services/groups/common_groups",
        method: "GET",
        response: "json",
        auth: {
            ...userAuth,
            scopes: ["studies"],
        },
    },
    group: {
        path: "services/groups/group",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    groups: {
        path: "services/groups/groups",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    isLecturer: {
        path: "services/groups/is_lecturer",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    isParticipant: {
        path: "services/groups/is_participant",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
    lecturer: {
        path: "services/groups/lecturer",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    participant: {
        path: "services/groups/participant",
        method: "GET",
        response: "json",
        auth: {
            ...userAuth,
            scopes: ["studies"],
        },
    },
    user: {
        path: "services/groups/user",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
}
