import type { EndpointDefinition } from '@/core/endpoint'
import type {
    CourseRegistrationRoundsParams,
    CoursesCart,
    CoursesCartParams,
    EmptyRegistrationResponse,
    FacultyRegistrationsParams,
    FacultyTokenRegistrationsParams,
    Ranking,
    RankingParams,
    RegisterParams,
    Registration,
    RegistrationCourse,
    RegistrationCourseParams,
    RegistrationParams,
    RegistrationRound,
    RegistrationRoundCoursesParams,
    RegistrationRoundCourse,
    RegistrationRoundParams,
    SearchRegistrationRoundsParams,
    SearchTokenRegistrationRoundsParams,
    TokenRegistration,
    TokenRegistrationCourse,
    TokenRegistrationCourseParams,
    TokenRegistrationParams,
    TokenRegistrationRound,
    TokenRegistrationRoundParams,
    UnregisterParams,
    UserRegistrationsParams,
    UserTokenRegistrationsParams,
} from '@/services/registrations/types'

export interface RegistrationsEndpoints {
    courseRegistrationRounds: EndpointDefinition<CourseRegistrationRoundsParams, RegistrationRound[]>
    coursesCart: EndpointDefinition<CoursesCartParams, CoursesCart>
    facultyRegistrations: EndpointDefinition<FacultyRegistrationsParams, Registration[]>
    facultyTokenRegistrations: EndpointDefinition<FacultyTokenRegistrationsParams, TokenRegistration[]>
    ranking: EndpointDefinition<RankingParams, Ranking>
    register: EndpointDefinition<RegisterParams, EmptyRegistrationResponse>
    registration: EndpointDefinition<RegistrationParams, Registration>
    registrationCourse: EndpointDefinition<RegistrationCourseParams, RegistrationCourse>
    registrationRound: EndpointDefinition<RegistrationRoundParams, RegistrationRound>
    registrationRoundCourses: EndpointDefinition<RegistrationRoundCoursesParams, RegistrationRoundCourse[]>
    searchRounds: EndpointDefinition<SearchRegistrationRoundsParams, RegistrationRound[]>
    searchTokenRounds: EndpointDefinition<SearchTokenRegistrationRoundsParams, TokenRegistrationRound[]>
    tokenRegistration: EndpointDefinition<TokenRegistrationParams, TokenRegistration>
    tokenRegistrationCourse: EndpointDefinition<TokenRegistrationCourseParams, TokenRegistrationCourse>
    tokenRegistrationRound: EndpointDefinition<TokenRegistrationRoundParams, TokenRegistrationRound>
    unregister: EndpointDefinition<UnregisterParams, EmptyRegistrationResponse>
    userRegistrations: EndpointDefinition<UserRegistrationsParams, Registration[]>
    userTokenRegistrations: EndpointDefinition<UserTokenRegistrationsParams, TokenRegistration[]>
}

const clientAuth = {
    consumer: "required",
    token: "optional",
    sslRequired: true,
} as const

const registrationMutationAuth = {
    ...clientAuth,
    scopes: ["studies"],
} as const

const userAuth = {
    consumer: "required",
    token: "required",
    sslRequired: true,
    scopes: ["studies"],
} as const

export const registrationsEndpoints: RegistrationsEndpoints = {
    courseRegistrationRounds: {
        path: "services/registrations/course_registration_rounds",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    coursesCart: {
        path: "services/registrations/courses_cart",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    facultyRegistrations: {
        path: "services/registrations/faculty_registrations",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    facultyTokenRegistrations: {
        path: "services/registrations/faculty_token_registrations",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    ranking: {
        path: "services/registrations/ranking",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    register: {
        path: "services/registrations/register",
        method: "POST",
        response: "json",
        auth: registrationMutationAuth,
    },
    registration: {
        path: "services/registrations/registration",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    registrationCourse: {
        path: "services/registrations/registration_course",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    registrationRound: {
        path: "services/registrations/registration_round",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    registrationRoundCourses: {
        path: "services/registrations/registration_round_courses",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    searchRounds: {
        path: "services/registrations/search_rounds",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    searchTokenRounds: {
        path: "services/registrations/search_token_rounds",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    tokenRegistration: {
        path: "services/registrations/token_registration",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    tokenRegistrationCourse: {
        path: "services/registrations/token_registration_course",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    tokenRegistrationRound: {
        path: "services/registrations/token_registration_round",
        method: "GET",
        response: "json",
        auth: clientAuth,
    },
    unregister: {
        path: "services/registrations/unregister",
        method: "POST",
        response: "json",
        auth: registrationMutationAuth,
    },
    userRegistrations: {
        path: "services/registrations/user_registrations",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
    userTokenRegistrations: {
        path: "services/registrations/user_token_registrations",
        method: "GET",
        response: "json",
        auth: userAuth,
    },
}
