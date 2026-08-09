import type { RequestExecutor } from '@/core/requester'
import { termsEndpoints } from '@/services/terms/endpoints'
import type {
    SearchTermsOptions,
    Term,
    TermsIndexOptions,
} from '@/services/terms/types'
import type { TermId } from '@/types/common'

export class TermsService {
    public constructor(private readonly request: RequestExecutor) {}

    public async search(options: SearchTermsOptions = {}): Promise<Term[]> {
        return await this.request.request(termsEndpoints.search, {
            params: {
                query: options.query,
                min_finish_date: options.minFinishDate,
                max_start_date: options.maxStartDate,
            },
        })
    }

    public async getTerm(termId: TermId): Promise<Term> {
        return await this.request.request(termsEndpoints.term, {
            params: { term_id: termId },
        })
    }

    public async getTerms(termIds: readonly TermId[]): Promise<Record<string, Term | null>> {
        if (termIds.length === 0) {
            throw new TypeError("getTerms requires at least one term ID")
        }

        return await this.request.request(termsEndpoints.terms, {
            params: { term_ids: termIds },
        })
    }

    public async getTermsIndex(options: TermsIndexOptions = {}): Promise<Term[]> {
        return await this.request.request(termsEndpoints.termsIndex, {
            params: {
                term_type: options.termType,
                active_only: options.activeOnly,
            },
        })
    }
}
