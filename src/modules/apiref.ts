import { APIREF, METHOD, MODULE, SCOPE } from '@/interfaces/apiref'
import { MethodFields, ModuleFields } from '@/interfaces/apiref'
import { Server } from '@/client/server'

export class ApiRef {
    constructor(private api: Server) {}

    // /services/apiref/method
    public async getMethod(name: string, fields?: MethodFields[]): Promise<METHOD> {
        const params: Record<string, string> = { name }
        if (fields && fields.length > 0) {params.fields = fields.join('|') }
        return await this.api.GET<typeof APIREF, METHOD>(APIREF, "METHOD", {}, params)
    }

    // /services/apiref/method_index
    public async getMethodIndex(): Promise<string[]> {
        return await this.api.GET<typeof APIREF, string[]>(APIREF, "METHOD_INDEX")
    }

    // /services/apiref/module
    public async getModule(name: string, fields?: ModuleFields[]): Promise<MODULE> {
        const params: Record<string, string> = { name };
        if (fields && fields.length > 0) { params.fields = fields.join('|') }
        return await this.api.GET<typeof APIREF, MODULE>(APIREF, "MODULE", {}, params)
    }

    // /services/apiref/scopes
    public async getScopes(): Promise<Record<string, SCOPE>> {
        return await this.api.GET<typeof APIREF, Record<string, SCOPE>>(APIREF, "SCOPES")
    }
}