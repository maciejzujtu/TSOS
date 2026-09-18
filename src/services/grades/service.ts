import type { AccessTokenCredentials } from '@/core/auth'
import type { RequestExecutor } from '@/core/requester'
import { gradesEndpoints } from '@/services/grades/endpoints'
import type {
    CourseEditionGrades,
    CourseEditionGradesOptions,
    EmptyGradeResponse,
    ExamGrades,
    ExamGradesOptions,
    Grade,
    GradeFields,
    GradeOptions,
    GradeType,
    GradeTypeFields,
    GradeTypeId,
    LatestGradesOptions,
    LegacyCourseEditionGrades,
    LegacyTermGrades,
    TermGrades,
    TermGradesOptions,
    UpdateGradeOptions,
} from '@/services/grades/types'

export class GradesService {
    public constructor(private readonly request: RequestExecutor) {}

    /** @deprecated Use `getCourseEdition2`. */
    public async getCourseEdition(
        options: CourseEditionGradesOptions,
    ): Promise<LegacyCourseEditionGrades> {
        return await this.request.request(gradesEndpoints.courseEdition, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
        })
    }

    public async getCourseEdition2(
        options: CourseEditionGradesOptions,
    ): Promise<CourseEditionGrades> {
        return await this.request.request(gradesEndpoints.courseEdition2, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
        })
    }

    public async getExamGrades(options: ExamGradesOptions): Promise<ExamGrades> {
        return await this.request.request(gradesEndpoints.exam, {
            params: {
                exam_id: options.examId,
                user_id: options.userId,
                fields: options.fields,
            },
        })
    }

    public async getGrade(options: GradeOptions): Promise<Grade> {
        return await this.request.request(gradesEndpoints.grade, {
            params: {
                exam_id: options.examId,
                exam_session_number: options.examSessionNumber,
                user_id: options.userId,
                fields: options.fields,
            },
        })
    }

    public async getGradeType(
        gradeTypeId: GradeTypeId,
        fields?: readonly GradeTypeFields[],
    ): Promise<GradeType> {
        return await this.request.request(gradesEndpoints.gradeType, {
            params: {
                grade_type_id: gradeTypeId,
                fields,
            },
        })
    }

    public async getGradeTypesIndex(
        fields?: readonly GradeTypeFields[],
    ): Promise<GradeType[]> {
        return await this.request.request(gradesEndpoints.gradeTypeIndex, {
            params: { fields },
        })
    }

    public async getGradeTypes(
        gradeTypeIds: readonly GradeTypeId[],
        fields?: readonly GradeTypeFields[],
    ): Promise<Record<string, GradeType | null>> {
        if (gradeTypeIds.length === 0) {
            throw new TypeError("getGradeTypes requires at least one grade type ID")
        }

        return await this.request.request(gradesEndpoints.gradeTypes, {
            params: {
                grade_type_ids: gradeTypeIds,
                fields,
            },
        })
    }

    public async getLatest(options: LatestGradesOptions = {}): Promise<Grade[]> {
        return await this.request.request(gradesEndpoints.latest, {
            params: {
                days: options.days,
                fields: options.fields,
            },
        })
    }

    /** @deprecated Use `getTermGrades2`. */
    public async getTermGrades(options: TermGradesOptions): Promise<LegacyTermGrades> {
        this.assertTermIds(options.termIds, "getTermGrades")

        return await this.request.request(gradesEndpoints.terms, {
            params: {
                term_ids: options.termIds,
                course_ids: options.courseIds,
                fields: options.fields,
            },
        })
    }

    public async getTermGrades2(options: TermGradesOptions): Promise<TermGrades> {
        this.assertTermIds(options.termIds, "getTermGrades2")

        return await this.request.request(gradesEndpoints.terms2, {
            params: {
                term_ids: options.termIds,
                course_ids: options.courseIds,
                fields: options.fields,
            },
        })
    }

    /** @beta The upstream USOS API marks this method as beta. */
    public async updateGrade(
        options: UpdateGradeOptions,
        accessToken: AccessTokenCredentials,
    ): Promise<EmptyGradeResponse> {
        return await this.request.request(gradesEndpoints.updateGrade, {
            params: {
                student_id: options.studentId,
                exam_id: options.examId,
                exam_session_number: options.examSessionNumber,
                value_symbol: options.valueSymbol,
                comment: options.comment,
                private_comment: options.privateComment,
                date_modified: options.dateModified,
                date_acquisition: options.dateAcquisition,
            },
            token: accessToken,
        })
    }

    private assertTermIds(termIds: readonly unknown[], method: string): void {
        if (termIds.length === 0) {
            throw new TypeError(`${method} requires at least one term ID`)
        }
    }
}
