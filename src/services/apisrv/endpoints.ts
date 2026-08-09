import type { EndpointDefinition } from '@/core/endpoint'
import type {
    Consumer,
    ConsumerParams,
    EmptyParams,
    Installation,
    InstallationParams,
    InstallationSummary,
    MobileConfigParams,
    MobileUsosConfig,
} from '@/services/apisrv/types'

export interface ApisrvEndpoints {
    consumer: EndpointDefinition<ConsumerParams, Consumer>
    installation: EndpointDefinition<InstallationParams, Installation>
    installations: EndpointDefinition<EmptyParams, InstallationSummary[]>
    mobileUsosConfig: EndpointDefinition<MobileConfigParams, MobileUsosConfig>
    now: EndpointDefinition<EmptyParams, string>
}

export const apisrvEndpoints: ApisrvEndpoints = {
    consumer: {
        path: "services/apisrv/consumer",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    installation: {
        path: "services/apisrv/installation",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
    installations: {
        path: "services/apisrv/installations",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
    mobileUsosConfig: {
        path: "services/apisrv/mobile_usos_config",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
    now: {
        path: "services/apisrv/now",
        method: "GET",
        response: "json",
        auth: {
            consumer: "ignored",
            token: "ignored",
            sslRequired: false,
        },
    },
}
