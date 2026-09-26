import type { AuthContext } from '@/core/auth'
import { HttpRequester } from '@/core/requester'

import { ApiRefService } from '@/services/apiref/service'
import { ApiSrvService } from '@/services/apisrv/service'
import { CalendarService } from '@/services/calendar/service'
import { CoursesService } from '@/services/courses/service'
import { CrstestsService } from '@/services/crstests/service'
import { ExamrepService } from '@/services/examrep/service'
import { Examrep2Service } from '@/services/examrep2/service'
import { ExamsService } from '@/services/exams/service'
import { FacService } from '@/services/fac/service'
import { GradesService } from '@/services/grades/service'
import { GroupsService } from '@/services/groups/service'
import { PaymentsService } from '@/services/payments/service'
import { ProgsService } from '@/services/progs/service'
import { RegistrationsService } from '@/services/registrations/service'
import { TermsService } from '@/services/terms/service'
import { ThesesService } from '@/services/theses/service'
import { TtService } from '@/services/tt/service'
import { UsersService } from '@/services/users/service'

import type { BaseClientOptions } from '@/client/types'

export abstract class BaseClient<Auth extends AuthContext> {
    public readonly baseUrl: URL
    public readonly apiref: ApiRefService
    public readonly apisrv: ApiSrvService
    public readonly calendar: CalendarService
    public readonly terms: TermsService
    public readonly fac: FacService
    public readonly courses: CoursesService
    public readonly crstests: CrstestsService
    public readonly examrep: ExamrepService
    public readonly examrep2: Examrep2Service
    public readonly exams: ExamsService
    public readonly grades: GradesService
    public readonly users: UsersService
    public readonly groups: GroupsService
    public readonly payments: PaymentsService
    public readonly progs: ProgsService
    public readonly registrations: RegistrationsService
    public readonly tt: TtService
    public readonly theses: ThesesService

    protected readonly requester: HttpRequester<Auth>
    protected readonly fetchImplementation: typeof globalThis.fetch
    protected readonly timeoutMs?: number

    protected constructor(
        options: BaseClientOptions,
        auth: Auth
    ) {
        this.baseUrl = new URL(options.baseUrl)
        this.fetchImplementation = options.fetch ?? globalThis.fetch
        this.timeoutMs = options.timeoutMs
        this.requester = new HttpRequester({
            baseUrl: this.baseUrl,
            auth,
            fetch: this.fetchImplementation,
            timeoutMs: this.timeoutMs,
        })

        this.apiref = new ApiRefService(this.requester)
        this.apisrv = new ApiSrvService(this.requester)
        this.calendar = new CalendarService(this.requester)
        this.terms = new TermsService(this.requester)
        this.fac = new FacService(this.requester)
        this.courses = new CoursesService(this.requester)
        this.crstests = new CrstestsService(this.requester)
        this.examrep = new ExamrepService(this.requester)
        this.examrep2 = new Examrep2Service(this.requester)
        this.exams = new ExamsService(this.requester)
        this.grades = new GradesService(this.requester)
        this.users = new UsersService(this.requester)
        this.groups = new GroupsService(this.requester)
        this.payments = new PaymentsService(this.requester)
        this.progs = new ProgsService(this.requester)
        this.registrations = new RegistrationsService(this.requester)
        this.tt = new TtService(this.requester)
        this.theses = new ThesesService(this.requester)
    }
}
