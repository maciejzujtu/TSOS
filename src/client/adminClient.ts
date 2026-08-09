import type { AdminAuth } from '@/core/auth'
import { OAuthService } from '@/services/oauth/service'

import { BaseClient } from '@/client/baseClient'
import type { AdminClientOptions } from '@/client/types'

export class AdminClient extends BaseClient<AdminAuth> {
    public readonly oauth: OAuthService

    public constructor(options: AdminClientOptions) {
        super(options, {
            kind: "admin",
            consumer: options.consumer,
        })

        this.oauth = new OAuthService(this.requester)
    }
}
