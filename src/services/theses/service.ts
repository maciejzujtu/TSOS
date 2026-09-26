import type { RequestExecutor } from '@/core/requester'
import type { SuccessResponse } from '@/types/common'
import { thesesEndpoints } from '@/services/theses/endpoints'
import type { ThesesAuthorshipPreferenceOptions, ThesesExamReportOptions, ThesesExamReportResult, ThesesExamReportsOptions, ThesesSearchHistoryAffectOptions, ThesesSearchOptions, ThesesSearchResult, ThesesSignReportOptions, ThesesSignableReportsOptions, ThesesThesesOptions, ThesesThesisOptions, ThesesThesisResult, ThesesUserOptions, ThesesUserResult, ThesesUsersOptions } from '@/services/theses/types'

export class ThesesService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Get information about whether users prefer sharing their theses' authorship. */
    public async getAuthorshipPreference(options: ThesesAuthorshipPreferenceOptions): Promise<Record<string, unknown>> {
        return await this.request.request(thesesEndpoints.authorshipPreference, {
            params: {
                user_ids: options.userIds,
            },
            token: options.accessToken,
        })
    }

    /** Get diploma exam report. @beta */
    public async getExamReport(options: ThesesExamReportOptions): Promise<ThesesExamReportResult> {
        return await this.request.request(thesesEndpoints.examReport, {
            params: {
                report_id: options.reportId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information on multiple exam reports. @beta */
    public async getExamReports(options: ThesesExamReportsOptions): Promise<Record<string, unknown>> {
        return await this.request.request(thesesEndpoints.examReports, {
            params: {
                report_ids: options.reportIds,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Search for theses. */
    public async search(options: ThesesSearchOptions): Promise<ThesesSearchResult> {
        return await this.request.request(thesesEndpoints.search, {
            params: {
                lang: options.lang,
                fields: options.fields,
                query: options.query,
                type: options.type,
                fac_ids: options.facIds,
                num: options.num,
                start: options.start,
            },
            token: options.accessToken,
        })
    }

    /** Add a thesis to search history. */
    public async searchHistoryAffect(options: ThesesSearchHistoryAffectOptions): Promise<SuccessResponse> {
        return await this.request.request(thesesEndpoints.searchHistoryAffect, {
            params: {
                ths_id: options.thsId,
            },
            token: options.accessToken,
        })
    }

    /** Sign the exam report. @beta */
    public async signReport(options: ThesesSignReportOptions): Promise<Record<string, never>> {
        return await this.request.request(thesesEndpoints.signReport, {
            params: {
                report_id: options.reportId,
            },
            token: options.accessToken,
        })
    }

    /** Get diploma exam reports that can get signed by user. @beta */
    public async getSignableReports(options: ThesesSignableReportsOptions = {}): Promise<Record<string, unknown>[]> {
        return await this.request.request(thesesEndpoints.signableReports, {
            params: {
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information on multiple theses. */
    public async getTheses(options: ThesesThesesOptions): Promise<Record<string, unknown>> {
        return await this.request.request(thesesEndpoints.theses, {
            params: {
                ths_ids: options.thsIds,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get information on a single thesis. */
    public async getThesis(options: ThesesThesisOptions): Promise<ThesesThesisResult> {
        return await this.request.request(thesesEndpoints.thesis, {
            params: {
                ths_id: options.thsId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get theses-related information on a given user. */
    public async getUser(options: ThesesUserOptions): Promise<ThesesUserResult> {
        return await this.request.request(thesesEndpoints.user, {
            params: {
                user_id: options.userId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get theses-related information on multiple users. */
    public async getUsers(options: ThesesUsersOptions): Promise<Record<string, unknown>> {
        return await this.request.request(thesesEndpoints.users, {
            params: {
                user_ids: options.userIds,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

}
