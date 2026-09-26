import type { RequestExecutor } from '@/core/requester'
import { examrepEndpoints } from '@/services/examrep/endpoints'
import type { ExamrepCourseEdition2Options, ExamrepCourseEdition2Result, ExamrepCourseEditionOptions, ExamrepCourseEditionResult, ExamrepExamOptions, ExamrepExamResult, ExamrepExamSessionOptions, ExamrepExamSessionResult, ExamrepUser2Options, ExamrepUserOptions } from '@/services/examrep/types'

export class ExamrepService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Get exams and grades related to given course edition @deprecated */
    public async getCourseEdition(options: ExamrepCourseEditionOptions): Promise<ExamrepCourseEditionResult> {
        return await this.request.request(examrepEndpoints.courseEdition, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get exams and grades related to given course edition */
    public async getCourseEdition2(options: ExamrepCourseEdition2Options): Promise<ExamrepCourseEdition2Result> {
        return await this.request.request(examrepEndpoints.courseEdition2, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get info about exam. */
    public async getExam(options: ExamrepExamOptions): Promise<ExamrepExamResult> {
        return await this.request.request(examrepEndpoints.exam, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get info about exam sessions related to en exam. */
    public async getExamSession(options: ExamrepExamSessionOptions): Promise<ExamrepExamSessionResult> {
        return await this.request.request(examrepEndpoints.examSession, {
            params: {
                exam_id: options.examId,
                number: options.number,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get exams and grades related to given course edition */
    public async getUser(options: ExamrepUserOptions): Promise<Record<string, unknown>> {
        return await this.request.request(examrepEndpoints.user, {
            params: {
                term_ids: options.termIds,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get exams and grades related to given course edition */
    public async getUser2(options: ExamrepUser2Options = {}): Promise<Record<string, unknown>> {
        return await this.request.request(examrepEndpoints.user2, {
            params: {
                fields: options.fields,
                term_ids: options.termIds,
            },
            token: options.accessToken,
        })
    }

}
