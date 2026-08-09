import type { RequestExecutor } from '@/core/requester'
import { facEndpoints } from '@/services/fac/endpoints'
import type {
    Faculty,
    FacultyFields,
    FacultySearchResult,
    SearchFacultiesOptions,
} from '@/services/fac/types'
import type { FacultyId } from '@/types/common'

export class FacService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getFactsheet(facultyId: FacultyId): Promise<ArrayBuffer> {
        return await this.request.request(facEndpoints.factsheetGet, {
            params: { fac_id: facultyId },
        })
    }

    public async getFaculties(
        facultyIds: readonly FacultyId[],
        fields?: readonly FacultyFields[],
    ): Promise<Record<string, Faculty | null>> {
        if (facultyIds.length === 0) {
            throw new TypeError("getFaculties requires at least one faculty ID")
        }

        return await this.request.request(facEndpoints.faculties, {
            params: {
                fac_ids: facultyIds,
                fields,
            },
        })
    }

    public async getFaculty(
        facultyId: FacultyId,
        fields?: readonly FacultyFields[],
    ): Promise<Faculty> {
        return await this.request.request(facEndpoints.faculty, {
            params: {
                fac_id: facultyId,
                fields,
            },
        })
    }

    public async resolveFacpattern(facpattern: string): Promise<FacultyId[]> {
        return await this.request.request(facEndpoints.resolveFacpattern, {
            params: { facpattern },
        })
    }

    public async search(options: SearchFacultiesOptions): Promise<FacultySearchResult> {
        return await this.request.request(facEndpoints.search, {
            params: {
                lang: options.lang,
                query: options.query,
                fields: options.fields,
                visibility: options.visibility,
                num: options.num,
                start: options.start,
            },
        })
    }

    public async getSubfacultiesDeep(facultyId: FacultyId): Promise<FacultyId[]> {
        return await this.request.request(facEndpoints.subfacultiesDeep, {
            params: { fac_id: facultyId },
        })
    }
}
