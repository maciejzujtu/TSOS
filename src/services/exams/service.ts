import type { AccessTokenCredentials } from '@/core/auth'
import type { RequestExecutor } from '@/core/requester'
import { examsEndpoints } from '@/services/exams/endpoints'
import type {
    AdministratorExaminationSessions,
    BatchRegisterExamOptions,
    BatchRegistrationOptions,
    BatchRegistrationResult,
    BatchUnregisterExamOptions,
    Exam,
    ExamCondition,
    ExamConditionOptions,
    ExamFields,
    ExamGroup,
    ExamGroupFields,
    ExamGroupOptions,
    ExaminationId,
    ExaminationSession,
    ExaminationSessionFields,
    ExaminationSessionId,
    ExamRegistrationResult,
    ExamSlot,
    ExamSlotOptions,
    FacultyExaminationSessionsOptions,
    SearchExamRegistrationsOptions,
} from '@/services/exams/types'

/** @beta The upstream USOS API marks this module as beta. */
export class ExamsService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getActiveExaminationSessions(
        fields?: readonly ExaminationSessionFields[],
    ): Promise<ExaminationSession[]> {
        return await this.request.request(examsEndpoints.activeExaminationSessions, {
            params: { fields },
        })
    }

    public async getAdministratorExaminationSessions(
        fields?: readonly ExaminationSessionFields[],
    ): Promise<AdministratorExaminationSessions> {
        return await this.request.request(examsEndpoints.administrator, {
            params: { fields },
        })
    }

    public async batchRegisterExam(
        options: BatchRegisterExamOptions,
    ): Promise<ExamRegistrationResult> {
        return await this.request.request(examsEndpoints.batchRegisterExam, {
            params: { exam_id: options.examId, values: options.values },
        })
    }

    public async batchRegistration(
        options: BatchRegistrationOptions,
    ): Promise<BatchRegistrationResult> {
        return await this.request.request(examsEndpoints.batchRegistration, {
            params: {
                exam_id: options.examId,
                unregister: options.unregister,
                register: options.register,
            },
        })
    }

    public async batchUnregisterExam(
        options: BatchUnregisterExamOptions,
    ): Promise<ExamRegistrationResult> {
        return await this.request.request(examsEndpoints.batchUnregisterExam, {
            params: { exam_id: options.examId, values: options.values },
        })
    }

    public async getCondition(options: ExamConditionOptions): Promise<ExamCondition> {
        return await this.request.request(examsEndpoints.condition, {
            params: {
                exam_id: options.examId,
                examrep_id: options.examReportId,
                fields: options.fields,
            },
        })
    }

    public async getExam(
        id: ExaminationId,
        fields?: readonly ExamFields[],
    ): Promise<Exam> {
        return await this.request.request(examsEndpoints.exam, {
            params: { id, fields },
        })
    }

    public async getExamGroup(options: ExamGroupOptions): Promise<ExamGroup> {
        return await this.request.request(examsEndpoints.examGroup, {
            params: {
                exam_id: options.examId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
        })
    }

    public async getExaminationSession(
        id: ExaminationSessionId,
        fields?: readonly ExaminationSessionFields[],
    ): Promise<ExaminationSession> {
        return await this.request.request(examsEndpoints.examinationSession, {
            params: { id, fields },
        })
    }

    public async getExaminationSessions(
        ids: readonly ExaminationSessionId[],
        fields?: readonly ExaminationSessionFields[],
    ): Promise<Record<string, ExaminationSession | null>> {
        this.assertIds(ids, "getExaminationSessions")
        return await this.request.request(examsEndpoints.examinationSessions, {
            params: { ids, fields },
        })
    }

    public async getExams(
        ids: readonly ExaminationId[],
        fields?: readonly ExamFields[],
    ): Promise<Record<string, Exam | null>> {
        this.assertIds(ids, "getExams")
        return await this.request.request(examsEndpoints.exams, {
            params: { ids, fields },
        })
    }

    public async getFacultyExaminationSessions(
        options: FacultyExaminationSessionsOptions,
    ): Promise<ExaminationSession[]> {
        return await this.request.request(examsEndpoints.facultyExaminationSessions, {
            params: {
                faculty_id: options.facultyId,
                status: options.status,
                fields: options.fields,
            },
        })
    }

    public async getGroup(options: ExamGroupOptions): Promise<ExamGroup> {
        return await this.request.request(examsEndpoints.group, {
            params: {
                exam_id: options.examId,
                group_number: options.groupNumber,
                fields: options.fields,
            },
        })
    }

    public async searchRegistrations(
        options: SearchExamRegistrationsOptions,
    ): Promise<Exam[]> {
        return await this.request.request(examsEndpoints.searchExamsRegistrations, {
            params: {
                start_date: options.startDate,
                end_date: options.endDate,
                faculty_id: options.facultyId,
                user_related: options.userRelated,
                fields: options.fields,
            },
        })
    }

    public async getSlot(options: ExamSlotOptions): Promise<ExamSlot> {
        return await this.request.request(examsEndpoints.slot, {
            params: {
                exam_id: options.examId,
                group_number: options.groupNumber,
                slot_number: options.slotNumber,
                fields: options.fields,
            },
        })
    }

    public async getStudentExams(fields?: readonly ExamFields[]): Promise<Exam[]> {
        return await this.request.request(examsEndpoints.studentExams, {
            params: { fields },
        })
    }

    public async getUserExaminationSessions(
        accessToken: AccessTokenCredentials,
        fields?: readonly ExaminationSessionFields[],
    ): Promise<ExaminationSession[]> {
        return await this.request.request(examsEndpoints.user, {
            params: { fields },
            token: accessToken,
        })
    }

    private assertIds(ids: readonly unknown[], method: string): void {
        if (ids.length === 0) {
            throw new TypeError(`${method} requires at least one ID`)
        }
    }
}
