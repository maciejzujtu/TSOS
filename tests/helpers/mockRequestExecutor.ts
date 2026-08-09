import type { EndpointDefinition } from '@/core/endpoint'
import type { RequestExecutor, RequestOptions } from '@/core/requester'

export interface RecordedCall {
    path: string
    params?: unknown
    token?: unknown
    oauthCallback?: string
}

export class MockRequestExecutor implements RequestExecutor {
    public readonly baseUrl = new URL("https://apps.usos.uj.edu.pl")
    public readonly calls: RecordedCall[] = []
    public readonly responses = new Map<string, unknown>()

    public async request<Params, Result>(
        endpoint: EndpointDefinition<Params, Result>,
        options?: RequestOptions<Params>,
    ): Promise<Result> {
        this.calls.push({
            path: endpoint.path,
            params: options?.params,
            token: options?.token,
            oauthCallback: options?.oauthCallback,
        })

        return this.responses.get(endpoint.path) as Result
    }
}
