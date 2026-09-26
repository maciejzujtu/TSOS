import type { EndpointDefinition } from '@/core/endpoint'
import type { Examrep2ClassGroupParams, Examrep2ClassGroupResult, Examrep2ExamineeParams, Examrep2ExamrepParams, Examrep2ExamrepResult, Examrep2ExamrepSessionAccessParams, Examrep2ExamrepSessionAccessResult, Examrep2ExamrepSessionParams, Examrep2ExamrepSessionResult, Examrep2ExamrepTypeParams, Examrep2ExamrepTypeResult, Examrep2GradeTypeParams, Examrep2GradeTypeResult, Examrep2GradeValueParams, Examrep2GradeValueResult, Examrep2GraderParams, Examrep2StudentGradeParams, Examrep2StudentGradeResult, Examrep2StudentGradesParams, Examrep2UpdateStudentGradeParams, Examrep2UserGradeParams, Examrep2UserGradeResult } from '@/services/examrep2/types'

export interface Examrep2Endpoints {
    classGroup: EndpointDefinition<Examrep2ClassGroupParams, Examrep2ClassGroupResult>
    examinee: EndpointDefinition<Examrep2ExamineeParams, Record<string, unknown>[]>
    examrep: EndpointDefinition<Examrep2ExamrepParams, Examrep2ExamrepResult>
    examrepSession: EndpointDefinition<Examrep2ExamrepSessionParams, Examrep2ExamrepSessionResult>
    examrepSessionAccess: EndpointDefinition<Examrep2ExamrepSessionAccessParams, Examrep2ExamrepSessionAccessResult[]>
    examrepType: EndpointDefinition<Examrep2ExamrepTypeParams, Examrep2ExamrepTypeResult>
    gradeType: EndpointDefinition<Examrep2GradeTypeParams, Examrep2GradeTypeResult>
    gradeValue: EndpointDefinition<Examrep2GradeValueParams, Examrep2GradeValueResult>
    grader: EndpointDefinition<Examrep2GraderParams, Record<string, unknown>[]>
    studentGrade: EndpointDefinition<Examrep2StudentGradeParams, Examrep2StudentGradeResult>
    studentGrades: EndpointDefinition<Examrep2StudentGradesParams, Record<string, unknown>[]>
    updateStudentGrade: EndpointDefinition<Examrep2UpdateStudentGradeParams, Record<string, never>>
    userGrade: EndpointDefinition<Examrep2UserGradeParams, Examrep2UserGradeResult>
}

export const examrep2Endpoints: Examrep2Endpoints = {
    /** Get class group and grades in given group for given exam report   */
    classGroup: {
        path: "services/examrep2/class_group",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
    /** Get exam reports that allows access token issuer to update grades of given student   */
    examinee: {
        path: "services/examrep2/examinee",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
    /** Get info about exam report   */
    examrep: {
        path: "services/examrep2/examrep",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get info about exam report session.   */
    examrepSession: {
        path: "services/examrep2/examrep_session",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get access token issuer to exam report   */
    examrepSessionAccess: {
        path: "services/examrep2/examrep_session_access",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
    /** Exam report type   */
    examrepType: {
        path: "services/examrep2/examrep_type",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: true,
        },
    },
    /** Get info about grade type.   */
    gradeType: {
        path: "services/examrep2/grade_type",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: true,
        },
    },
    /** Get information about grade value   */
    gradeValue: {
        path: "services/examrep2/grade_value",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: true,
        },
    },
    /** Get exam reports that access token issuer has access   */
    grader: {
        path: "services/examrep2/grader",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
    /** Get information about single user's grade   */
    studentGrade: {
        path: "services/examrep2/student_grade",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
    /** Get information about all user's grade from single exam report   */
    studentGrades: {
        path: "services/examrep2/student_grades",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
    /** Update user's grade. @beta  */
    updateStudentGrade: {
        path: "services/examrep2/update_student_grade",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["grades_write"],
        },
    },
    /** Get information about access token user's grade   */
    userGrade: {
        path: "services/examrep2/user_grade",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["grades"],
        },
    },
}
