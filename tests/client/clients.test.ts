import assert from "node:assert/strict"
import test from "node:test"

import {
    AdminClient,
    ApiRefService,
    ApiSrvService,
    AttendanceService,
    CalendarService,
    CoursesService,
    CrstestsService,
    ExamrepService,
    Examrep2Service,
    ExamsService,
    FacService,
    GradesService,
    GroupsService,
    OAuthService,
    PaymentsService,
    ProgsService,
    RegistrationsService,
    TermsService,
    ThesesService,
    TtService,
    UserClient,
    UsersService,
    UsosAuthenticationError,
    UsosClient,
} from '@'

test("Clients expose services for their authentication context", () => {
    const usos = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: {
            key: "consumer-key",
            secret: "consumer-secret",
        },
    })
    const user = usos.withAccessToken({
        token: "access-token",
        secret: "access-secret",
    })
    const admin = usos.asAdministrator()

    assert.ok(usos.apiref instanceof ApiRefService)
    assert.ok(usos.apisrv instanceof ApiSrvService)
    assert.ok(usos.calendar instanceof CalendarService)
    assert.ok(usos.terms instanceof TermsService)
    assert.ok(usos.fac instanceof FacService)
    assert.ok(usos.courses instanceof CoursesService)
    assert.ok(usos.crstests instanceof CrstestsService)
    assert.ok(usos.examrep instanceof ExamrepService)
    assert.ok(usos.examrep2 instanceof Examrep2Service)
    assert.ok(usos.exams instanceof ExamsService)
    assert.ok(usos.grades instanceof GradesService)
    assert.ok(usos.users instanceof UsersService)
    assert.ok(usos.groups instanceof GroupsService)
    assert.ok(usos.payments instanceof PaymentsService)
    assert.ok(usos.progs instanceof ProgsService)
    assert.ok(usos.registrations instanceof RegistrationsService)
    assert.ok(usos.tt instanceof TtService)
    assert.ok(usos.theses instanceof ThesesService)
    assert.ok(usos.oauth instanceof OAuthService)
    assert.ok(user instanceof UserClient)
    assert.ok(user.attendance instanceof AttendanceService)
    assert.ok(user.oauth instanceof OAuthService)
    assert.ok(admin instanceof AdminClient)
    assert.ok(admin.oauth instanceof OAuthService)
    assert.ok(user.terms instanceof TermsService)
    assert.ok(user.grades instanceof GradesService)
    assert.ok(user.tt instanceof TtService)
    assert.ok(admin.grades instanceof GradesService)
    assert.ok(admin.users instanceof UsersService)

    assert.throws(
        () => new UsosClient({ baseUrl: "https://apps.usos.uj.edu.pl" }).withAccessToken({
            token: "token",
            secret: "secret",
        }),
        UsosAuthenticationError,
    )
})
