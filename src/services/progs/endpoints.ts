import type { EndpointDefinition } from '@/core/endpoint'
import type {
    Programme,
    ProgrammeParams,
    ProgrammeSearchHistoryParams,
    ProgrammeSearchHistoryResponse,
    ProgrammeSearchParams,
    ProgrammeSearchResult,
    ProgrammesParams,
    Stage,
    StageParams,
    StudentProgramme,
    StudentProgrammeParams,
    StudentProgrammesForUserParams,
    StudentProgrammesParams,
} from '@/services/progs/types'

export interface ProgsEndpoints {
    programme: EndpointDefinition<ProgrammeParams, Programme>
    programmes: EndpointDefinition<ProgrammesParams, Record<string, Programme | null>>
    search: EndpointDefinition<ProgrammeSearchParams, ProgrammeSearchResult>
    searchHistoryAffect: EndpointDefinition<
        ProgrammeSearchHistoryParams,
        ProgrammeSearchHistoryResponse
    >
    stage: EndpointDefinition<StageParams, Stage>
    student: EndpointDefinition<StudentProgrammesForUserParams, StudentProgramme[]>
    studentProgramme: EndpointDefinition<StudentProgrammeParams, StudentProgramme>
    studentProgrammes: EndpointDefinition<
        StudentProgrammesParams,
        Record<string, StudentProgramme | null>
    >
}

const publicAuth = {
    consumer: "ignored",
    token: "ignored",
    sslRequired: false,
} as const

const optionalConsumerAuth = {
    consumer: "optional",
    token: "ignored",
    sslRequired: false,
} as const

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

const userAuth = {
    consumer: "required",
    token: "required",
    sslRequired: false,
} as const

export const progsEndpoints: ProgsEndpoints = {
    programme: {
        path: "services/progs/programme",
        method: "GET",
        response: "json",
        auth: optionalConsumerAuth,
    },
    programmes: {
        path: "services/progs/programmes",
        method: "GET",
        response: "json",
        auth: optionalConsumerAuth,
    },
    search: {
        path: "services/progs/search",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    searchHistoryAffect: {
        path: "services/progs/search_history_affect",
        method: "POST",
        response: "json",
        auth: userAuth,
    },
    stage: {
        path: "services/progs/stage",
        method: "GET",
        response: "json",
        auth: {
            ...publicAuth,
            sslRequired: true,
        },
    },
    student: {
        path: "services/progs/student",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    studentProgramme: {
        path: "services/progs/student_programme",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
    studentProgrammes: {
        path: "services/progs/student_programmes",
        method: "GET",
        response: "json",
        auth: consumerAuth,
    },
}
