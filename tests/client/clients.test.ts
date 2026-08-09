import assert from "node:assert/strict"
import test from "node:test"

import {
    AdminClient,
    ApiRefService,
    ApiSrvService,
    AttendanceService,
    CoursesService,
    FacService,
    GroupsService,
    OAuthService,
    TermsService,
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
    assert.ok(usos.terms instanceof TermsService)
    assert.ok(usos.fac instanceof FacService)
    assert.ok(usos.courses instanceof CoursesService)
    assert.ok(usos.users instanceof UsersService)
    assert.ok(usos.groups instanceof GroupsService)
    assert.ok(usos.oauth instanceof OAuthService)
    assert.ok(user instanceof UserClient)
    assert.ok(user.attendance instanceof AttendanceService)
    assert.ok(user.oauth instanceof OAuthService)
    assert.ok(admin instanceof AdminClient)
    assert.ok(admin.oauth instanceof OAuthService)
    assert.ok(user.terms instanceof TermsService)
    assert.ok(admin.users instanceof UsersService)

    assert.throws(
        () => new UsosClient({ baseUrl: "https://apps.usos.uj.edu.pl" }).withAccessToken({
            token: "token",
            secret: "secret",
        }),
        UsosAuthenticationError,
    )
})
