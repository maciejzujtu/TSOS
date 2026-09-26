import type { RequestExecutor } from '@/core/requester'
import { examrep2Endpoints } from '@/services/examrep2/endpoints'
import type { Examrep2ClassGroupOptions, Examrep2ClassGroupResult, Examrep2ExamineeOptions, Examrep2ExamrepOptions, Examrep2ExamrepResult, Examrep2ExamrepSessionAccessOptions, Examrep2ExamrepSessionAccessResult, Examrep2ExamrepSessionOptions, Examrep2ExamrepSessionResult, Examrep2ExamrepTypeOptions, Examrep2ExamrepTypeResult, Examrep2GradeTypeOptions, Examrep2GradeTypeResult, Examrep2GradeValueOptions, Examrep2GradeValueResult, Examrep2GraderOptions, Examrep2StudentGradeOptions, Examrep2StudentGradeResult, Examrep2StudentGradesOptions, Examrep2UpdateStudentGradeOptions, Examrep2UserGradeOptions, Examrep2UserGradeResult } from '@/services/examrep2/types'

export class Examrep2Service {
    public constructor(private readonly request: RequestExecutor) {}

    /** Get class group and grades in given group for given exam report */
    public async getClassGroup(options: Examrep2ClassGroupOptions): Promise<Examrep2ClassGroupResult> {
        return await this.request.request(examrep2Endpoints.classGroup, {
            params: {
                examrep_id: options.examrepId,
                course_unit_id: options.courseUnitId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get exam reports that allows access token issuer to update grades of given student */
    public async getExaminee(options: Examrep2ExamineeOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(examrep2Endpoints.examinee, {
            params: {
                user_id: options.userId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get info about exam report */
    public async getExamrep(options: Examrep2ExamrepOptions): Promise<Examrep2ExamrepResult> {
        return await this.request.request(examrep2Endpoints.examrep, {
            params: {
                examrep_id: options.examrepId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get info about exam report session. */
    public async getExamrepSession(options: Examrep2ExamrepSessionOptions): Promise<Examrep2ExamrepSessionResult> {
        return await this.request.request(examrep2Endpoints.examrepSession, {
            params: {
                examrep_id: options.examrepId,
                examrep_session_number: options.examrepSessionNumber,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get access token issuer to exam report */
    public async getExamrepSessionAccess(options: Examrep2ExamrepSessionAccessOptions): Promise<Examrep2ExamrepSessionAccessResult[]> {
        return await this.request.request(examrep2Endpoints.examrepSessionAccess, {
            params: {
                examrep_id: options.examrepId,
                examrep_session_number: options.examrepSessionNumber,
                type: options.type,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Exam report type */
    public async getExamrepType(options: Examrep2ExamrepTypeOptions): Promise<Examrep2ExamrepTypeResult> {
        return await this.request.request(examrep2Endpoints.examrepType, {
            params: {
                examrep_type_id: options.examrepTypeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get info about grade type. */
    public async getGradeType(options: Examrep2GradeTypeOptions): Promise<Examrep2GradeTypeResult> {
        return await this.request.request(examrep2Endpoints.gradeType, {
            params: {
                grade_type_id: options.gradeTypeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information about grade value */
    public async getGradeValue(options: Examrep2GradeValueOptions): Promise<Examrep2GradeValueResult> {
        return await this.request.request(examrep2Endpoints.gradeValue, {
            params: {
                grade_type_id: options.gradeTypeId,
                order_key: options.orderKey,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get exam reports that access token issuer has access */
    public async getGrader(options: Examrep2GraderOptions = {}): Promise<Record<string, unknown>[]> {
        return await this.request.request(examrep2Endpoints.grader, {
            params: {
                only_writable: options.onlyWritable,
                active_terms_only: options.activeTermsOnly,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information about single user's grade */
    public async getStudentGrade(options: Examrep2StudentGradeOptions): Promise<Examrep2StudentGradeResult> {
        return await this.request.request(examrep2Endpoints.studentGrade, {
            params: {
                examrep_id: options.examrepId,
                examrep_session_number: options.examrepSessionNumber,
                student_id: options.studentId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information about all user's grade from single exam report */
    public async getStudentGrades(options: Examrep2StudentGradesOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(examrep2Endpoints.studentGrades, {
            params: {
                examrep_id: options.examrepId,
                student_id: options.studentId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Update user's grade. @beta */
    public async updateStudentGrade(options: Examrep2UpdateStudentGradeOptions): Promise<Record<string, never>> {
        return await this.request.request(examrep2Endpoints.updateStudentGrade, {
            params: {
                student_id: options.studentId,
                examrep_id: options.examrepId,
                examrep_session_number: options.examrepSessionNumber,
                value_symbol: options.valueSymbol,
                comment: options.comment,
                private_comment: options.privateComment,
                date_modified: options.dateModified,
                date_acquisition: options.dateAcquisition,
            },
            token: options.accessToken,
        })
    }

    /** Get information about access token user's grade */
    public async getUserGrade(options: Examrep2UserGradeOptions): Promise<Examrep2UserGradeResult> {
        return await this.request.request(examrep2Endpoints.userGrade, {
            params: {
                examrep_id: options.examrepId,
                examrep_session_number: options.examrepSessionNumber,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

}
