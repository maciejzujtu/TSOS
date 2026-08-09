import type { RequestExecutor } from '@/core/requester'
import { apirefEndpoints } from '@/services/apiref/endpoints'
import type {
    ApirefMethod,
    ApirefMethodIndex,
    ApirefModule,
    ApirefScope,
    EndpointReference,
    MethodFields,
} from '@/services/apiref/types'

function getEndpointPath(endpoint: EndpointReference): `services/${string}` {
    return typeof endpoint === "string" ? endpoint : endpoint.path
}

export class ApiRefService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getMethod(
        endpoint: EndpointReference,
        fields?: readonly MethodFields[],
    ): Promise<Partial<ApirefMethod>> {
        return await this.request.request(apirefEndpoints.method, {
            params: {
                name: getEndpointPath(endpoint),
                fields,
            },
        })
    }

    public async getMethodIndex(): Promise<ApirefMethodIndex[]> {
        return await this.request.request(apirefEndpoints.methodIndex)
    }

    public async getModule(name: string): Promise<ApirefModule> {
        return await this.request.request(apirefEndpoints.module, {
            params: { name },
        })
    }

    public async getScopes(): Promise<ApirefScope[]> {
        return await this.request.request(apirefEndpoints.scopes)
    }
}
