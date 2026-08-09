import type { UserAuth } from '@/core/auth'
import { AttendanceService } from '@/services/attendance/service'
import { OAuthService } from '@/services/oauth/service'

import { BaseClient } from '@/client/baseClient'
import type { UserClientOptions } from '@/client/types'

export class UserClient extends BaseClient<UserAuth> {
    public readonly oauth: OAuthService
    public readonly attendance: AttendanceService

    public constructor(options: UserClientOptions) {
        super(options, {
            kind: "user",
            consumer: options.consumer,
            accessToken: options.accessToken,
        })

        this.oauth = new OAuthService(this.requester)
        this.attendance = new AttendanceService(this.requester)
    }
}
