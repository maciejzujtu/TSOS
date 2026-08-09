export * from '@/services/apiref/index'
export * from '@/services/apisrv/index'
export * from '@/services/oauth/index'
export * from '@/services/attendance/index'
export * from '@/services/terms/index'
export * from '@/services/fac/index'
export * from '@/services/courses/index'
export * from '@/services/users/index'
export * from '@/services/groups/index'

export type * from '@/types/common'

export * from '@/client/index'

export {
    USOS_INSTALLATIONS,
    JAGIELLONIAN_UNIVERSITY,
    WARSAW_UNIVERSITY,
    WROCLAW_UNIVERSITY,
} from '@/config/installations'
export type { Installation, InstallationKey, InstallationUrl } from '@/config/installations'

export {
    UsosError,
    UsosApiError,
    UsosAuthenticationError,
    UsosConfigurationError,
} from '@/core/errors'
