import type { EndpointDefinition } from '@/core/endpoint'
import type { SuccessResponse } from '@/types/common'
import type { ThesesAuthorshipPreferenceParams, ThesesExamReportParams, ThesesExamReportResult, ThesesExamReportsParams, ThesesSearchHistoryAffectParams, ThesesSearchParams, ThesesSearchResult, ThesesSignReportParams, ThesesSignableReportsParams, ThesesThesesParams, ThesesThesisParams, ThesesThesisResult, ThesesUserParams, ThesesUserResult, ThesesUsersParams } from '@/services/theses/types'

export interface ThesesEndpoints {
    authorshipPreference: EndpointDefinition<ThesesAuthorshipPreferenceParams, Record<string, unknown>>
    examReport: EndpointDefinition<ThesesExamReportParams, ThesesExamReportResult>
    examReports: EndpointDefinition<ThesesExamReportsParams, Record<string, unknown>>
    search: EndpointDefinition<ThesesSearchParams, ThesesSearchResult>
    searchHistoryAffect: EndpointDefinition<ThesesSearchHistoryAffectParams, SuccessResponse>
    signReport: EndpointDefinition<ThesesSignReportParams, Record<string, never>>
    signableReports: EndpointDefinition<ThesesSignableReportsParams, Record<string, unknown>[]>
    theses: EndpointDefinition<ThesesThesesParams, Record<string, unknown>>
    thesis: EndpointDefinition<ThesesThesisParams, ThesesThesisResult>
    user: EndpointDefinition<ThesesUserParams, ThesesUserResult>
    users: EndpointDefinition<ThesesUsersParams, Record<string, unknown>>
}

export const thesesEndpoints: ThesesEndpoints = {
    /** Get information about whether users prefer sharing their theses' authorship.   */
    authorshipPreference: {
        path: "services/theses/authorship_preference",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: true,
        },
    },
    /** Get diploma exam report. @beta  */
    examReport: {
        path: "services/theses/exam_report",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["staff_perspective"],
        },
    },
    /** Get information on multiple exam reports. @beta  */
    examReports: {
        path: "services/theses/exam_reports",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["staff_perspective"],
        },
    },
    /** Search for theses.   */
    search: {
        path: "services/theses/search",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Add a thesis to search history.   */
    searchHistoryAffect: {
        path: "services/theses/search_history_affect",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    /** Sign the exam report. @beta  */
    signReport: {
        path: "services/theses/sign_report",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["theses_protocols_write","staff_perspective"],
        },
    },
    /** Get diploma exam reports that can get signed by user. @beta  */
    signableReports: {
        path: "services/theses/signable_reports",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["staff_perspective"],
        },
    },
    /** Get information on multiple theses.   */
    theses: {
        path: "services/theses/theses",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get information on a single thesis.   */
    thesis: {
        path: "services/theses/thesis",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get theses-related information on a given user.   */
    user: {
        path: "services/theses/user",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get theses-related information on multiple users.   */
    users: {
        path: "services/theses/users",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
}
