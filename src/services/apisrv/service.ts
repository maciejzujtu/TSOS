import type { RequestExecutor } from '@/core/requester'
import { apisrvEndpoints } from '@/services/apisrv/endpoints'
import type {
    Consumer,
    ConsumerFields,
    Installation,
    InstallationFields,
    InstallationSummary,
    MobileConfigFields,
    MobileUsosConfig,
} from '@/services/apisrv/types'

export class ApiSrvService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getConsumer(fields: readonly ConsumerFields[]): Promise<Consumer> {
        if (fields.length === 0) {
            throw new TypeError("getConsumer requires at least one field")
        }

        return await this.request.request(apisrvEndpoints.consumer, {
            params: { fields },
        })
    }

    public async getInstallation(fields?: readonly InstallationFields[]): Promise<Installation> {
        return await this.request.request(apisrvEndpoints.installation, {
            params: { fields },
        })
    }

    public async getInstallations(): Promise<InstallationSummary[]> {
        return await this.request.request(apisrvEndpoints.installations)
    }

    public async getMobileConfig(fields?: readonly MobileConfigFields[]): Promise<MobileUsosConfig> {
        return await this.request.request(apisrvEndpoints.mobileUsosConfig, {
            params: { fields },
        })
    }

    public async getNow(): Promise<string> {
        return await this.request.request(apisrvEndpoints.now)
    }
}
