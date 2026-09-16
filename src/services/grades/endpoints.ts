import type { EndpointDefinition } from '@/core/endpoint'
import type {
    CourseEditionGrades,
    CourseEditionGradesParams,
    EmptyGradeResponse,
    ExamGrades,
    ExamGradesParams,
    Grade,
    GradeParams,
    GradeType,
    GradeTypeIndexParams,
    GradeTypeParams,
    GradeTypesParams,
    LatestGradesParams,
    LegacyCourseEditionGrades,
    LegacyTermGrades,
    TermGrades,
    TermGradesParams,
    UpdateGradeParams,
} from '@/services/grades/types'

export interface GradesEndpoints {
    courseEdition: EndpointDefinition<
        CourseEditionGradesParams,
        LegacyCourseEditionGrades
    >
    courseEdition2: EndpointDefinition<CourseEditionGradesParams, CourseEditionGrades>
    exam: EndpointDefinition<ExamGradesParams, ExamGrades>
    grade: EndpointDefinition<GradeParams, Grade>
    gradeType: EndpointDefinition<GradeTypeParams, GradeType>
    gradeTypeIndex: EndpointDefinition<GradeTypeIndexParams, GradeType[]>
    gradeTypes: EndpointDefinition<GradeTypesParams, Record<string, GradeType | null>>
    latest: EndpointDefinition<LatestGradesParams, Grade[]>
    terms: EndpointDefinition<TermGradesParams, LegacyTermGrades>
    terms2: EndpointDefinition<TermGradesParams, TermGrades>
    updateGrade: EndpointDefinition<UpdateGradeParams, EmptyGradeResponse>
}

const publicAuth = {
    consumer: "ignored",
    token: "ignored",
    sslRequired: false,
} as const

const gradesAuth = {
    consumer: "required",
    token: "required",
    sslRequired: false,
    scopes: ["grades"],
} as const

const administrativeGradesAuth = {
    consumer: "required",
    token: "required",
    administrativeOnly: true,
    sslRequired: false,
} as const

export const gradesEndpoints: GradesEndpoints = {
    /** @deprecated Use `courseEdition2`. */
    courseEdition: {
        path: "services/grades/course_edition",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    courseEdition2: {
        path: "services/grades/course_edition2",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    exam: {
        path: "services/grades/exam",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    grade: {
        path: "services/grades/grade",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    gradeType: {
        path: "services/grades/grade_type",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    gradeTypeIndex: {
        path: "services/grades/grade_type_index",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    gradeTypes: {
        path: "services/grades/grade_types",
        method: "GET",
        response: "json",
        auth: publicAuth,
    },
    latest: {
        path: "services/grades/latest",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    /** @deprecated Use `terms2`. */
    terms: {
        path: "services/grades/terms",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    terms2: {
        path: "services/grades/terms2",
        method: "GET",
        response: "json",
        auth: gradesAuth,
    },
    /** @beta The upstream USOS API marks this method as beta. */
    updateGrade: {
        path: "services/grades/update_grade",
        method: "POST",
        response: "json",
        auth: administrativeGradesAuth,
    },
}
