import { APISRV, CONSUMER, INSTALLATION, INSTALLATIONS, MOBILE_USOS_CONFIG } from '@/interfaces/apisrv'
import { ConsumerFields, InstallationFields, MobileConfigFields } from '@/interfaces/apisrv'
import { Server } from '@/client/server'

// services/apisrv/ module

export class ApiSrv {
    constructor(private api: Server) {}

    // /services/apisrv/consumer
    public async getConsumer(fields: ConsumerFields[]): Promise<CONSUMER> {
        const authorizationHeader = await this.api.getAuthorizationHeader()
        const params: Record<string, string> = {}
        if (fields && fields.length > 0) { params.fields = fields.join('|') }
        return await this.api.GET<typeof APISRV, CONSUMER>(APISRV, "CONSUMER", { 'Authorization': authorizationHeader }, params)
    }

    // /services/apisrv/installation
    public async getInstallation(fields: InstallationFields[]): Promise<INSTALLATION> {
        const params: Record<string, string> = {}
        if (fields && fields.length > 0) { params.fields = fields.join('|') }
        return await this.api.GET<typeof APISRV, INSTALLATION>(APISRV, "INSTALLATION", {}, params)
    }    

    // /services/apisrv/installations
    public async getInstallations(): Promise<INSTALLATIONS[]> {
        return await this.api.GET<typeof APISRV, INSTALLATIONS[]>(APISRV, "INSTALLATIONS")
    }

    // /services/apisrv/mobile_usos_config
    public async getMobileConfig(fields: MobileConfigFields[]): Promise<MOBILE_USOS_CONFIG> {
        const params: Record<string, string> = {}
        if (fields && fields.length > 0) { params.fields = fields.join('|') }
        return await this.api.GET<typeof APISRV, MOBILE_USOS_CONFIG>(APISRV, "MOBILE_USOS_CONFIG", {}, params)
    }

    // /services/apisrv/now
    public async getNow(): Promise<number> {
        const response = await this.api.GET<typeof APISRV, string>(APISRV, "NOW")
        const timestamp = response.replace(" ", "T")
        const date = new Date(timestamp)
        const unix = date.getTime()
        return Math.floor(unix / 1000)
    }
}