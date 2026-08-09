import type { AccessTokenCredentials, AnonymousAuth, ConsumerAuth, ConsumerCredentials } from '@/core/auth'
import { UsosAuthenticationError } from '@/core/errors'
import { OAuthService } from '@/services/oauth/service'

import { BaseClient } from '@/client/baseClient'
import { AdminClient } from '@/client/adminClient'
import { UserClient } from '@/client/userClient'

import type { ClientOptions } from '@/client/types'

type UsosClientAuth =
    | AnonymousAuth
    | ConsumerAuth

export class UsosClient extends BaseClient<UsosClientAuth> {
    public readonly oauth: OAuthService

    private readonly consumer?: ConsumerCredentials

    public constructor(options: ClientOptions) {
        const auth: UsosClientAuth = options.consumer
            ? {
                kind: "consumer",
                consumer: options.consumer,
            }
            : {
                kind: "anonymous",
            }

        super(options, auth)

        this.consumer = options.consumer
        this.oauth = new OAuthService(this.requester)
    }

    public withAccessToken(
        accessToken: AccessTokenCredentials,
    ): UserClient {
        if (!this.consumer) {
            throw new UsosAuthenticationError(
                "Consumer credentials are required before attaching an Access Token",
            )
        }

        return new UserClient({
            baseUrl: this.baseUrl,
            fetch: this.fetchImplementation,
            consumer: this.consumer,
            accessToken,
        })
    }

    public asAdministrator(): AdminClient {
        if (!this.consumer) {
            throw new UsosAuthenticationError(
                "Administrative access requires Consumer credentials",
            )
        }

        return new AdminClient({
            baseUrl: this.baseUrl,
            fetch: this.fetchImplementation,
            consumer: this.consumer,
        })
    }
}
