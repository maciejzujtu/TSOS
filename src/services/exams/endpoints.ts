import type { EndpointDefinition } from '@/core/endpoint'
import type {
    ActiveExaminationSessionsParams,
    AdministratorExaminationSessions,
    AdministratorParams,
    BatchRegisterExamParams,
    BatchRegistrationParams,
    BatchRegistrationResult,
    BatchUnregisterExamParams,
    Exam,
    ExamCondition,
    ExamConditionParams,
    ExamGroup,
    ExamGroupParams,
    ExamParams,
    ExamRegistrationResult,
    ExamsParams,
    ExaminationSession,
    ExaminationSessionParams,
    ExaminationSessionsParams,
    ExamSlot,
    ExamSlotParams,
    FacultyExaminationSessionsParams,
    SearchExamRegistrationsParams,
    StudentExamsParams,
    UserExaminationSessionsParams,
} from '@/services/exams/types'

export interface ExamsEndpoints {
    activeExaminationSessions: EndpointDefinition<ActiveExaminationSessionsParams, ExaminationSession[]>
    administrator: EndpointDefinition<AdministratorParams, AdministratorExaminationSessions>
    batchRegisterExam: EndpointDefinition<BatchRegisterExamParams, ExamRegistrationResult>
    batchRegistration: EndpointDefinition<BatchRegistrationParams, BatchRegistrationResult>
    batchUnregisterExam: EndpointDefinition<BatchUnregisterExamParams, ExamRegistrationResult>
    condition: EndpointDefinition<ExamConditionParams, ExamCondition>
    exam: EndpointDefinition<ExamParams, Exam>
    examGroup: EndpointDefinition<ExamGroupParams, ExamGroup>
    examinationSession: EndpointDefinition<ExaminationSessionParams, ExaminationSession>
    examinationSessions: EndpointDefinition<ExaminationSessionsParams, Record<string, ExaminationSession | null>>
    exams: EndpointDefinition<ExamsParams, Record<string, Exam | null>>
    facultyExaminationSessions: EndpointDefinition<FacultyExaminationSessionsParams, ExaminationSession[]>
    group: EndpointDefinition<ExamGroupParams, ExamGroup>
    searchExamsRegistrations: EndpointDefinition<SearchExamRegistrationsParams, Exam[]>
    slot: EndpointDefinition<ExamSlotParams, ExamSlot>
    studentExams: EndpointDefinition<StudentExamsParams, Exam[]>
    user: EndpointDefinition<UserExaminationSessionsParams, ExaminationSession[]>
}

const optionalAuth = {
    consumer: "optional",
    token: "optional",
    sslRequired: false,
} as const

const adminAuth = {
    consumer: "required",
    token: "ignored",
    administrativeOnly: true,
    sslRequired: true,
} as const

export const examsEndpoints: ExamsEndpoints = {
    /** @beta The upstream USOS API marks the exams module as beta. */
    activeExaminationSessions: {
        path: "services/exams/active_examination_sessions",
        method: "GET",
        response: "json",
        auth: adminAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    administrator: {
        path: "services/exams/administrator",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["staff_perspective"],
        },
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    batchRegisterExam: {
        path: "services/exams/batch_register_exam",
        method: "POST",
        response: "json",
        auth: adminAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    batchRegistration: {
        path: "services/exams/batch_registration",
        method: "POST",
        response: "json",
        auth: adminAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    batchUnregisterExam: {
        path: "services/exams/batch_unregister_exam",
        method: "POST",
        response: "json",
        auth: adminAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    condition: {
        path: "services/exams/condition",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    exam: {
        path: "services/exams/exam",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    examGroup: {
        path: "services/exams/exam_group",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    examinationSession: {
        path: "services/exams/examination_session",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    examinationSessions: {
        path: "services/exams/examination_sessions",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    exams: {
        path: "services/exams/exams",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "ignored",
            sslRequired: true,
        },
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    facultyExaminationSessions: {
        path: "services/exams/faculty_examination_sessions",
        method: "GET",
        response: "json",
        auth: adminAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    group: {
        path: "services/exams/group",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    searchExamsRegistrations: {
        path: "services/exams/search_exams_registrations",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    slot: {
        path: "services/exams/slot",
        method: "GET",
        response: "json",
        auth: optionalAuth,
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    studentExams: {
        path: "services/exams/student_exams",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["studies"],
        },
    },
    /** @beta The upstream USOS API marks the exams module as beta. */
    user: {
        path: "services/exams/user",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: true,
        },
    },
}
