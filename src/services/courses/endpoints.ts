import type { EndpointDefinition } from '@/core/endpoint'
import type {
    ClassType,
    ClassTypeParams,
    CoordinatorParams,
    Course,
    CourseEdition,
    CourseEdition2Params,
    CourseEditionParams,
    CourseParams,
    CourseRoleParams,
    CoursesParams,
    CourseSearchResult,
    CourseUnit,
    CourseUnitParams,
    CoursesEmptyParams,
    LegacyCourseEdition,
    LegacyCourseUnit,
    ParticipantParams,
    SearchCoursesParams,
    UnitParams,
    UnitsParams,
    UserCourses,
    UserCoursesParams,
    UserEctsPoints,
} from '@/services/courses/types'

export interface CoursesEndpoints {
    classType: EndpointDefinition<ClassTypeParams, ClassType>
    classTypesIndex: EndpointDefinition<CoursesEmptyParams, Record<string, Pick<ClassType, "name">>>
    coordinator: EndpointDefinition<CoordinatorParams, CourseEdition[]>
    course: EndpointDefinition<CourseParams, Course>
    course2: EndpointDefinition<CourseParams, Course>
    courseEdition: EndpointDefinition<CourseEditionParams, LegacyCourseEdition>
    courseEdition2: EndpointDefinition<CourseEdition2Params, CourseEdition>
    courseUnit: EndpointDefinition<CourseUnitParams, CourseUnit>
    courses: EndpointDefinition<CoursesParams, Record<string, Course | null>>
    isCoordinator: EndpointDefinition<CourseRoleParams, boolean>
    isLecturer: EndpointDefinition<CourseRoleParams, boolean>
    isParticipant: EndpointDefinition<ParticipantParams, boolean>
    search: EndpointDefinition<SearchCoursesParams, CourseSearchResult>
    unit: EndpointDefinition<UnitParams, LegacyCourseUnit>
    units: EndpointDefinition<UnitsParams, Record<string, LegacyCourseUnit | null>>
    user: EndpointDefinition<UserCoursesParams, UserCourses>
    userEctsPoints: EndpointDefinition<CoursesEmptyParams, UserEctsPoints>
}

const publicAuth = {
    consumer: "ignored",
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
} as const

export const coursesEndpoints: CoursesEndpoints = {
    classType: {
        path: "services/courses/classtype",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    classTypesIndex: {
        path: "services/courses/classtypes_index",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    coordinator: {
        path: "services/courses/coordinator",
        method: "GET",
        response: "json",
        auth: {
            ...optionalAuth,
            sslRequired: true,
        },
    },
    course: {
        path: "services/courses/course",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    course2: {
        path: "services/courses/course2",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    courseEdition: {
        path: "services/courses/course_edition",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    courseEdition2: {
        path: "services/courses/course_edition2",
        method: "GET",
        response: "json",
        auth: {
            ...optionalAuth,
            sslRequired: true,
        },
    },
    courseUnit: {
        path: "services/courses/course_unit",
        method: "GET",
        response: "json",
        auth: {
            ...optionalAuth,
            sslRequired: true,
        },
    },
    courses: {
        path: "services/courses/courses",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    isCoordinator: {
        path: "services/courses/is_coordinator",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    isLecturer: {
        path: "services/courses/is_lecturer",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    isParticipant: {
        path: "services/courses/is_participant",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
    search: {
        path: "services/courses/search",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    unit: {
        path: "services/courses/unit",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    units: {
        path: "services/courses/units",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    user: {
        path: "services/courses/user",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
    userEctsPoints: {
        path: "services/courses/user_ects_points",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
}
