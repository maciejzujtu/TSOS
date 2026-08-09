import type { AuthContext } from '@/core/auth'
import { HttpRequester } from '@/core/requester'

import { ApiRefService } from '@/services/apiref/service'
import { ApiSrvService } from '@/services/apisrv/service'
import { CoursesService } from '@/services/courses/service'
import { FacService } from '@/services/fac/service'
import { GroupsService } from '@/services/groups/service'
import { TermsService } from '@/services/terms/service'
import { UsersService } from '@/services/users/service'

import type { BaseClientOptions } from '@/client/types'

export abstract class BaseClient<Auth extends AuthContext> {
    public readonly baseUrl: URL
    public readonly apiref: ApiRefService
    public readonly apisrv: ApiSrvService
    public readonly terms: TermsService
    public readonly fac: FacService
    public readonly courses: CoursesService
    public readonly users: UsersService
    public readonly groups: GroupsService

    protected readonly requester: HttpRequester<Auth>
    protected readonly fetchImplementation: typeof globalThis.fetch

    protected constructor(
        options: BaseClientOptions,
        auth: Auth
    ) {
        this.baseUrl = new URL(options.baseUrl)
        this.fetchImplementation = options.fetch ?? globalThis.fetch
        this.requester = new HttpRequester({
            baseUrl: this.baseUrl,
            auth,
            fetch: this.fetchImplementation
        })

        this.apiref = new ApiRefService(this.requester)
        this.apisrv = new ApiSrvService(this.requester)
        this.terms = new TermsService(this.requester)
        this.fac = new FacService(this.requester)
        this.courses = new CoursesService(this.requester)
        this.users = new UsersService(this.requester)
        this.groups = new GroupsService(this.requester)
    }
}
