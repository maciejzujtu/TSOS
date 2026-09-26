import assert from "node:assert/strict"
import test from "node:test"

import {
    AdminClient,
    CrstestsService,
    ExamrepService,
    Examrep2Service,
    ThesesService,
    UsosAuthenticationError,
    UsosClient,
    crstestsEndpoints,
    examrepEndpoints,
    examrep2Endpoints,
    thesesEndpoints,
} from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("v0.4 covers every method in its four service modules", () => {
    const modules = [
        ["crstests", crstestsEndpoints, 54],
        ["examrep", examrepEndpoints, 6],
        ["examrep2", examrep2Endpoints, 13],
        ["theses", thesesEndpoints, 11],
    ] as const
    const paths = new Set<string>()

    for (const [moduleName, endpoints, count] of modules) {
        assert.equal(Object.keys(endpoints).length, count)
        for (const endpoint of Object.values(endpoints)) {
            assert.ok(endpoint.path.startsWith(`services/${moduleName}/`))
            assert.ok(!paths.has(endpoint.path), `duplicate ${endpoint.path}`)
            paths.add(endpoint.path)
        }
    }
    assert.equal(paths.size, 84)
})

test("v0.4 services map options, tokens, and JSON batch arguments", async () => {
    const request = new MockRequestExecutor()
    const crstests = new CrstestsService(request)
    const examrep = new ExamrepService(request)
    const examrep2 = new Examrep2Service(request)
    const theses = new ThesesService(request)
    const accessToken = { token: "access", secret: "secret" }

    await crstests.updateGrades({ nodeId: 42, newGrades: { "123": { grade_value: "5" } }, accessToken })
    await crstests.userGradesModified({ userGradeModifiedParams: [{ node_id: 42, operation: "update" }] })
    await examrep.getUser2({ termIds: ["2026Z", "2026L"], fields: ["id"], accessToken })
    await examrep2.updateStudentGrade({
        studentId: "s1",
        examrepId: "e1",
        examrepSessionNumber: 1,
        valueSymbol: "5",
        dateModified: "",
        accessToken,
    })
    await theses.search({ lang: "en", query: "physics", facIds: ["F1", "F2"], num: 20 })
    await theses.signReport({ reportId: 7, accessToken })

    assert.deepEqual(request.calls, [
        {
            path: "services/crstests/update_grades",
            params: { node_id: 42, new_grades: { "123": { grade_value: "5" } } },
            token: accessToken,
            oauthCallback: undefined,
        },
        {
            path: "services/crstests/user_grades_modified",
            params: { user_grade_modified_params: '[{"node_id":42,"operation":"update"}]' },
            token: undefined,
            oauthCallback: undefined,
        },
        {
            path: "services/examrep/user2",
            params: { fields: ["id"], term_ids: ["2026Z", "2026L"] },
            token: accessToken,
            oauthCallback: undefined,
        },
        {
            path: "services/examrep2/update_student_grade",
            params: {
                student_id: "s1",
                examrep_id: "e1",
                examrep_session_number: 1,
                value_symbol: "5",
                comment: undefined,
                private_comment: undefined,
                date_modified: "",
                date_acquisition: undefined,
            },
            token: accessToken,
            oauthCallback: undefined,
        },
        {
            path: "services/theses/search",
            params: {
                lang: "en",
                fields: undefined,
                query: "physics",
                type: undefined,
                fac_ids: ["F1", "F2"],
                num: 20,
                start: undefined,
            },
            token: undefined,
            oauthCallback: undefined,
        },
        {
            path: "services/theses/sign_report",
            params: { report_id: 7 },
            token: accessToken,
            oauthCallback: undefined,
        },
    ])
})

test("v0.4 enforces user and administrator requirements before dispatch", async () => {
    let dispatches = 0
    const fetchMock: typeof fetch = async () => {
        dispatches += 1
        return new Response("{}", { status: 200 })
    }
    const publicClient = new UsosClient({ baseUrl: "https://apps.usos.uj.edu.pl", fetch: fetchMock })
    const consumerClient = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "key", secret: "secret" },
        fetch: fetchMock,
    })

    await assert.rejects(() => publicClient.examrep2.updateStudentGrade({
        studentId: "s1", examrepId: "e1", examrepSessionNumber: 1,
    }), UsosAuthenticationError)
    await assert.rejects(() => consumerClient.examrep2.updateStudentGrade({
        studentId: "s1", examrepId: "e1", examrepSessionNumber: 1,
    }), UsosAuthenticationError)
    await assert.rejects(() => consumerClient.crstests.createRootNode(), UsosAuthenticationError)
    assert.equal(dispatches, 0)

    const admin = new AdminClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "admin-key", secret: "admin-secret" },
        fetch: fetchMock,
    })
    await assert.rejects(() => admin.crstests.createRootNode(), UsosAuthenticationError)
    assert.equal(dispatches, 0)
})

test("v0.4 uses pipe selectors for reads and POST for grade changes", async () => {
    const dispatched: Array<{ url: URL; method: string | undefined }> = []
    const client = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "key", secret: "secret" },
        fetch: async (input, init) => {
            dispatched.push({ url: new URL(input instanceof Request ? input.url : input), method: init?.method })
            return new Response("{}", { status: 200 })
        },
    }).withAccessToken({ token: "access", secret: "access-secret" })

    await client.theses.search({ lang: "en", type: ["master", "doctoral"], facIds: ["F1", "F2"] })
    await client.examrep2.updateStudentGrade({
        studentId: "s1",
        examrepId: "e1",
        examrepSessionNumber: 1,
        valueSymbol: "5",
        dateModified: "",
    })

    assert.equal(dispatched[0]?.method, "GET")
    assert.equal(dispatched[0]?.url.searchParams.get("type"), "master|doctoral")
    assert.equal(dispatched[0]?.url.searchParams.get("fac_ids"), "F1|F2")
    assert.equal(dispatched[1]?.method, "POST")
    assert.equal(dispatched[1]?.url.searchParams.get("date_modified"), "")
})
