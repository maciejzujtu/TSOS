import type { EndpointDefinition } from '@/core/endpoint'
import type { ExamrepCourseEdition2Params, ExamrepCourseEdition2Result, ExamrepCourseEditionParams, ExamrepCourseEditionResult, ExamrepExamParams, ExamrepExamResult, ExamrepExamSessionParams, ExamrepExamSessionResult, ExamrepUser2Params, ExamrepUserParams } from '@/services/examrep/types'

export interface ExamrepEndpoints {
    courseEdition: EndpointDefinition<ExamrepCourseEditionParams, ExamrepCourseEditionResult>
    courseEdition2: EndpointDefinition<ExamrepCourseEdition2Params, ExamrepCourseEdition2Result>
    exam: EndpointDefinition<ExamrepExamParams, ExamrepExamResult>
    examSession: EndpointDefinition<ExamrepExamSessionParams, ExamrepExamSessionResult>
    user: EndpointDefinition<ExamrepUserParams, Record<string, unknown>>
    user2: EndpointDefinition<ExamrepUser2Params, Record<string, unknown>>
}

export const examrepEndpoints: ExamrepEndpoints = {
    /** Get exams and grades related to given course edition  @deprecated */
    courseEdition: {
        path: "services/examrep/course_edition",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get exams and grades related to given course edition   */
    courseEdition2: {
        path: "services/examrep/course_edition2",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get info about exam.   */
    exam: {
        path: "services/examrep/exam",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get info about exam sessions related to en exam.   */
    examSession: {
        path: "services/examrep/exam_session",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get exams and grades related to given course edition   */
    user: {
        path: "services/examrep/user",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
    /** Get exams and grades related to given course edition   */
    user2: {
        path: "services/examrep/user2",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
        },
    },
}
