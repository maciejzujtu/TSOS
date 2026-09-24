import assert from "node:assert/strict"
import test from "node:test"

import {
    RegistrationsService,
    UsosApiError,
    UsosClient,
    registrationsEndpoints,
} from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Registrations maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const registrations = new RegistrationsService(request)

    await registrations.getCourseRegistrationRounds("REG", ["name"])
    await registrations.getCoursesCart(["course"])
    await registrations.getFacultyRegistrations({
        facultyId: "FA",
        activeOnly: true,
        userRelated: false,
        fields: ["description"],
    })
    await registrations.getFacultyTokenRegistrations({
        facultyId: "FA",
        activeOnly: false,
        userRelated: true,
        fields: ["message"],
    })
    await registrations.getRanking("RANK", ["name"])
    await registrations.register({
        roundId: "ROUND",
        courseId: "COURSE",
        termId: "2026Z",
        userProgrammeId: "PROGRAMME",
        userStageId: "STAGE",
    })
    await registrations.getRegistration("REG", ["status"])
    await registrations.getRegistrationCourse({
        registrationId: "REG",
        courseId: "COURSE",
        termId: "2026Z",
        fields: ["limits"],
    })
    await registrations.getRegistrationRound("ROUND", ["status"])
    await registrations.getRegistrationRoundCourses("ROUND", ["registrations_count"])
    await registrations.searchRounds({
        startDate: "2026-09-01",
        endDate: "2026-09-30",
        facultyId: "FA",
        userRelated: true,
        fields: ["start_date"],
    })
    await registrations.searchTokenRounds({
        startDate: "2026-09-01",
        endDate: "2026-09-30",
        fields: ["end_date"],
    })
    await registrations.getTokenRegistration("TOKEN-REG", ["short_description"])
    await registrations.getTokenRegistrationCourse({
        registrationId: "TOKEN-REG",
        courseId: "COURSE",
        termId: "2026Z",
        fields: ["start_date"],
    })
    await registrations.getTokenRegistrationRound("TOKEN-ROUND", ["is_prioritized"])
    await registrations.unregister({
        roundId: "ROUND",
        courseId: "COURSE",
        termId: "2026Z",
    })
    await registrations.getUserRegistrations({ activeOnly: true, fields: ["id"] })
    await registrations.getUserTokenRegistrations({
        activeOnly: false,
        fields: ["id"],
    })

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [registrationsEndpoints.courseRegistrationRounds.path, {
            registration_id: "REG",
            fields: ["name"],
        }],
        [registrationsEndpoints.coursesCart.path, { fields: ["course"] }],
        [registrationsEndpoints.facultyRegistrations.path, {
            faculty_id: "FA",
            active_only: true,
            user_related: false,
            fields: ["description"],
        }],
        [registrationsEndpoints.facultyTokenRegistrations.path, {
            faculty_id: "FA",
            active_only: false,
            user_related: true,
            fields: ["message"],
        }],
        [registrationsEndpoints.ranking.path, {
            ranking_code: "RANK",
            fields: ["name"],
        }],
        [registrationsEndpoints.register.path, {
            round_id: "ROUND",
            course_id: "COURSE",
            term_id: "2026Z",
            user_programme_id: "PROGRAMME",
            user_stage_id: "STAGE",
        }],
        [registrationsEndpoints.registration.path, { id: "REG", fields: ["status"] }],
        [registrationsEndpoints.registrationCourse.path, {
            registration_id: "REG",
            course_id: "COURSE",
            term_id: "2026Z",
            fields: ["limits"],
        }],
        [registrationsEndpoints.registrationRound.path, {
            id: "ROUND",
            fields: ["status"],
        }],
        [registrationsEndpoints.registrationRoundCourses.path, {
            registration_round_id: "ROUND",
            fields: ["registrations_count"],
        }],
        [registrationsEndpoints.searchRounds.path, {
            start_date: "2026-09-01",
            end_date: "2026-09-30",
            faculty_id: "FA",
            user_related: true,
            fields: ["start_date"],
        }],
        [registrationsEndpoints.searchTokenRounds.path, {
            start_date: "2026-09-01",
            end_date: "2026-09-30",
            faculty_id: undefined,
            user_related: undefined,
            fields: ["end_date"],
        }],
        [registrationsEndpoints.tokenRegistration.path, {
            id: "TOKEN-REG",
            fields: ["short_description"],
        }],
        [registrationsEndpoints.tokenRegistrationCourse.path, {
            registration_id: "TOKEN-REG",
            course_id: "COURSE",
            term_id: "2026Z",
            fields: ["start_date"],
        }],
        [registrationsEndpoints.tokenRegistrationRound.path, {
            id: "TOKEN-ROUND",
            fields: ["is_prioritized"],
        }],
        [registrationsEndpoints.unregister.path, {
            round_id: "ROUND",
            course_id: "COURSE",
            term_id: "2026Z",
        }],
        [registrationsEndpoints.userRegistrations.path, {
            active_only: true,
            fields: ["id"],
        }],
        [registrationsEndpoints.userTokenRegistrations.path, {
            active_only: false,
            fields: ["id"],
        }],
    ])
})

test("Registration mutations use POST and are not retried after an API failure", async () => {
    let attempts = 0
    let requestMethod: string | undefined
    let requestUrl: URL | undefined
    const client = new UsosClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "consumer-key", secret: "consumer-secret" },
        fetch: (async (input, init) => {
            attempts += 1
            requestMethod = init?.method
            requestUrl = new URL(String(input))
            return new Response(JSON.stringify({ error: "registration_closed" }), {
                status: 409,
            })
        }) as typeof globalThis.fetch,
    })

    await assert.rejects(() => client.registrations.register({
        roundId: "ROUND",
        courseId: "COURSE",
        termId: "2026Z",
    }), UsosApiError)

    assert.equal(attempts, 1)
    assert.equal(requestMethod, "POST")
    assert.equal(requestUrl?.pathname, "/services/registrations/register")
})
