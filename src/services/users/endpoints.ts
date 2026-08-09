import type { EndpointDefinition } from '@/core/endpoint'
import type {
    ChangeUserParams,
    ChangeUserResponse,
    EmploymentFunction,
    EmploymentFunctionsParams,
    EmploymentGroup,
    EmploymentGroupParams,
    EmploymentGroupsIndexParams,
    EmploymentPosition,
    EmploymentPositionsParams,
    UsersEmptyParams,
    LegacyUserSearchParams,
    LegacyUserSearchResult,
    PeselParams,
    Position,
    PositionParams,
    SearchByEmailParams,
    SearchHistoryAffectParams,
    SearchHistoryAffectResponse,
    SearchUsersParams,
    StaffIndexParams,
    StudentIndexParams,
    StudentProgrammeSummary,
    User,
    User2,
    User2Params,
    UserIndexResult,
    UserParams,
    UserSearchResult,
    UsersParams,
} from '@/services/users/types'

export interface UsersEndpoints {
    change: EndpointDefinition<ChangeUserParams, ChangeUserResponse>
    employmentFunctions: EndpointDefinition<EmploymentFunctionsParams, EmploymentFunction[]>
    employmentGroup: EndpointDefinition<EmploymentGroupParams, EmploymentGroup>
    employmentGroupsIndex: EndpointDefinition<EmploymentGroupsIndexParams, EmploymentGroup[]>
    employmentPositions: EndpointDefinition<EmploymentPositionsParams, EmploymentPosition[]>
    pesel: EndpointDefinition<PeselParams, User>
    photo: EndpointDefinition<UsersEmptyParams, ArrayBuffer>
    position: EndpointDefinition<PositionParams, Position>
    search: EndpointDefinition<LegacyUserSearchParams, LegacyUserSearchResult>
    search2: EndpointDefinition<SearchUsersParams, UserSearchResult>
    searchByEmail: EndpointDefinition<SearchByEmailParams, User[]>
    searchCurrentStudents: EndpointDefinition<LegacyUserSearchParams, LegacyUserSearchResult>
    searchCurrentTeachers: EndpointDefinition<LegacyUserSearchParams, LegacyUserSearchResult>
    searchHistoryAffect: EndpointDefinition<SearchHistoryAffectParams, SearchHistoryAffectResponse>
    searchStaff: EndpointDefinition<LegacyUserSearchParams, LegacyUserSearchResult>
    searchStudents: EndpointDefinition<LegacyUserSearchParams, LegacyUserSearchResult>
    staffIndex: EndpointDefinition<StaffIndexParams, UserIndexResult>
    studentIndex: EndpointDefinition<StudentIndexParams, UserIndexResult>
    studentProgrammes: EndpointDefinition<UsersEmptyParams, StudentProgrammeSummary[]>
    user: EndpointDefinition<UserParams, User | null>
    user2: EndpointDefinition<User2Params, User2 | null>
    users: EndpointDefinition<UsersParams, Record<string, User | null>>
}

const optionalAuth = {
    consumer: "optional",
    token: "optional",
    sslRequired: false,
} as const

const consumerAuth = {
    consumer: "required",
    token: "optional",
    sslRequired: false,
} as const

const publicAuth = {
    consumer: "ignored",
    token: "ignored",
    sslRequired: false,
} as const

const userAuth = {
    consumer: "required",
    token: "required",
    sslRequired: false,
} as const

const adminAuth = {
    consumer: "required",
    token: "ignored",
    administrativeOnly: true,
    sslRequired: false,
} as const

export const usersEndpoints: UsersEndpoints = {
    change: {
        path: "services/users/change",
        method: "POST",
        response: "json",
        auth: {
            ...consumerAuth,
            sslRequired: true,
        },
    },
    employmentFunctions: {
        path: "services/users/employment_functions",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    employmentGroup: {
        path: "services/users/employment_group",
        method: "GET",
        response: "json",
        auth: {
            ...publicAuth,
            sslRequired: true,
        },
    },
    employmentGroupsIndex: {
        path: "services/users/employment_groups_index",
        method: "GET",
        response: "json",
        auth: {
            ...publicAuth,
            sslRequired: true,
        },
    },
    employmentPositions: {
        path: "services/users/employment_positions",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    pesel: {
        path: "services/users/pesel",
        method: "GET",
        response: "json",
        auth: adminAuth,
    },
    photo: {
        path: "services/users/photo",
        method: "GET",
        response: "arrayBuffer",
        auth: {
            ...userAuth,
            scopes: ["photo"],
        },
    },
    position: {
        path: "services/users/position",
        method: "GET",
        response: "json",
        auth: {
            ...publicAuth,
            sslRequired: true,
        },
    },
    search: {
        path: "services/users/search",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    search2: {
        path: "services/users/search2",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    searchByEmail: {
        path: "services/users/search_by_email",
        method: "GET",
        response: "json",
        auth: adminAuth,
    },
    searchCurrentStudents: {
        path: "services/users/search_current_students",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    searchCurrentTeachers: {
        path: "services/users/search_current_teachers",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    searchHistoryAffect: {
        path: "services/users/search_history_affect",
        method: "POST",
        response: "json",
        auth: userAuth,
    },
    searchStaff: {
        path: "services/users/search_staff",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    searchStudents: {
        path: "services/users/search_students",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    staffIndex: {
        path: "services/users/staff_index",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    studentIndex: {
        path: "services/users/student_index",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    studentProgrammes: {
        path: "services/users/student_programmes",
        method: "GET",
        response: "json",
        auth: {
            ...userAuth,
            scopes: ["studies"],
        },
    },
    user: {
        path: "services/users/user",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    user2: {
        path: "services/users/user2",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    users: {
        path: "services/users/users",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
}
