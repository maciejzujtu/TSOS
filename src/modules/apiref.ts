import { APIREF, METHOD, METHOD_INDEX, MODULE, SCOPE } from '@/interfaces/apiref'
import { MethodFields } from '@/interfaces/apiref'
import { AuthProvider, Module } from '@/globals'

export class ApiRef {
    constructor(private api: AuthProvider) { }

    // /services/apiref/method
    public async getMethod<M extends Module>(module: M, method: keyof M, fields?: MethodFields[]): Promise<METHOD> {
        const name = String(module[method])
        const params: Record<string, string> = { name }
        if (fields && fields.length > 0) { params.fields = fields.join('|') }
        return await this.api.GET<typeof APIREF, METHOD>(APIREF, "METHOD", {}, params)
    }

    // /services/apiref/method_index
    public async getMethodIndex(): Promise<METHOD_INDEX[]> {
        return await this.api.GET<typeof APIREF, METHOD_INDEX[]>(APIREF, "METHOD_INDEX")
    }

    // /services/apiref/module
    public async getModule(module: Module): Promise<MODULE> {
        const params: Record<string, string> = { name: module.ROOT };
        return await this.api.GET<typeof APIREF, MODULE>(APIREF, "MODULE", {}, params)
    }

    // /services/apiref/scopes
    public async getScopes(): Promise<Record<string, SCOPE>> {
        return await this.api.GET<typeof APIREF, Record<string, SCOPE>>(APIREF, "SCOPES")
    }
}