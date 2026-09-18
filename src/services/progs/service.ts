import type { RequestExecutor } from '@/core/requester'
import { progsEndpoints } from '@/services/progs/endpoints'
import type {
    Programme,
    ProgrammeFields,
    ProgrammeId,
    ProgrammeSearchHistoryResponse,
    ProgrammeSearchResult,
    SearchProgrammesOptions,
    Stage,
    StageFields,
    StageId,
    StudentProgramme,
    StudentProgrammeFields,
    StudentProgrammeId,
    StudentProgrammesOptions,
} from '@/services/progs/types'

export class ProgsService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getProgramme(
        programmeId: ProgrammeId,
        fields?: readonly ProgrammeFields[],
    ): Promise<Programme> {
        return await this.request.request(progsEndpoints.programme, {
            params: {
                programme_id: programmeId,
                fields,
            },
        })
    }

    public async getProgrammes(
        programmeIds: readonly ProgrammeId[],
        fields?: readonly ProgrammeFields[],
    ): Promise<Record<string, Programme | null>> {
        this.assertIdentifiers(programmeIds, "getProgrammes", "programme")

        return await this.request.request(progsEndpoints.programmes, {
            params: {
                programme_ids: programmeIds,
                fields,
            },
        })
    }

    public async search(options: SearchProgrammesOptions): Promise<ProgrammeSearchResult> {
        return await this.request.request(progsEndpoints.search, {
            params: {
                lang: options.lang,
                fields: options.fields,
                query: options.query,
                num: options.num,
                start: options.start,
            },
        })
    }

    public async affectSearchHistory(
        programmeId: ProgrammeId,
    ): Promise<ProgrammeSearchHistoryResponse> {
        return await this.request.request(progsEndpoints.searchHistoryAffect, {
            params: { programme_id: programmeId },
        })
    }

    public async getStage(
        id: StageId,
        fields?: readonly StageFields[],
    ): Promise<Stage> {
        return await this.request.request(progsEndpoints.stage, {
            params: { id, fields },
        })
    }

    public async getStudentProgrammes(
        options: StudentProgrammesOptions = {},
    ): Promise<StudentProgramme[]> {
        return await this.request.request(progsEndpoints.student, {
            params: {
                user_id: options.userId,
                fields: options.fields,
                active_only: options.activeOnly,
                old_programs: options.oldPrograms,
            },
        })
    }

    public async getStudentProgramme(
        studentProgrammeId: StudentProgrammeId,
        fields?: readonly StudentProgrammeFields[],
    ): Promise<StudentProgramme> {
        return await this.request.request(progsEndpoints.studentProgramme, {
            params: {
                student_programme_id: studentProgrammeId,
                fields,
            },
        })
    }

    public async getStudentProgrammesByIds(
        studentProgrammeIds: readonly StudentProgrammeId[],
        fields?: readonly StudentProgrammeFields[],
    ): Promise<Record<string, StudentProgramme | null>> {
        this.assertIdentifiers(
            studentProgrammeIds,
            "getStudentProgrammesByIds",
            "student programme",
        )

        return await this.request.request(progsEndpoints.studentProgrammes, {
            params: {
                student_programme_ids: studentProgrammeIds,
                fields,
            },
        })
    }

    private assertIdentifiers(
        identifiers: readonly unknown[],
        method: string,
        identifierName: string,
    ): void {
        if (identifiers.length === 0) {
            throw new TypeError(`${method} requires at least one ${identifierName} ID`)
        }
    }
}
