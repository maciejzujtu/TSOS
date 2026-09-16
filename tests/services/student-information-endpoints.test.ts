import assert from "node:assert/strict"
import test from "node:test"

import type { AnyEndpoint } from '@/core/endpoint'
import { calendarEndpoints } from '@/services/calendar/endpoints'
import { gradesEndpoints } from '@/services/grades/endpoints'
import { progsEndpoints } from '@/services/progs/endpoints'
import { ttEndpoints } from '@/services/tt/endpoints'

interface ExpectedEndpoint {
    key: string
    path: `services/${string}`
    method?: "GET" | "POST"
    response?: "json" | "text"
    consumer: "required" | "optional" | "ignored"
    token: "required" | "optional" | "ignored"
    sslRequired?: boolean
    administrativeOnly?: boolean
    scopes?: readonly string[]
}

function assertEndpointContracts(
    actual: object,
    expected: readonly ExpectedEndpoint[],
): void {
    const endpoints = actual as Record<string, AnyEndpoint>
    assert.deepEqual(Object.keys(endpoints), expected.map(({ key }) => key))

    for (const contract of expected) {
        const endpoint = endpoints[contract.key]
        assert.ok(endpoint, `Missing endpoint definition: ${contract.key}`)
        assert.equal(endpoint.path, contract.path)
        assert.equal(endpoint.method, contract.method ?? "GET")
        assert.equal(endpoint.response, contract.response ?? "json")
        assert.deepEqual(endpoint.auth, {
            consumer: contract.consumer,
            token: contract.token,
            ...(contract.administrativeOnly ? { administrativeOnly: true } : {}),
            sslRequired: contract.sslRequired ?? false,
            ...(contract.scopes ? { scopes: contract.scopes } : {}),
        })
    }
}

test("Calendar endpoint definitions match the UJ contract", () => {
    assertEndpointContracts(calendarEndpoints, [
        {
            key: "calendarEvent",
            path: "services/calendar/calendar_event",
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
        {
            key: "search",
            path: "services/calendar/search",
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
    ])
})

test("Grades endpoint definitions match the UJ contract", () => {
    const userGradeEndpoint = {
        consumer: "required" as const,
        token: "required" as const,
        scopes: ["grades"],
    }

    assertEndpointContracts(gradesEndpoints, [
        { key: "courseEdition", path: "services/grades/course_edition", ...userGradeEndpoint },
        { key: "courseEdition2", path: "services/grades/course_edition2", ...userGradeEndpoint },
        { key: "exam", path: "services/grades/exam", ...userGradeEndpoint },
        { key: "grade", path: "services/grades/grade", ...userGradeEndpoint },
        { key: "gradeType", path: "services/grades/grade_type", consumer: "ignored", token: "ignored" },
        { key: "gradeTypeIndex", path: "services/grades/grade_type_index", consumer: "ignored", token: "ignored" },
        { key: "gradeTypes", path: "services/grades/grade_types", consumer: "ignored", token: "ignored" },
        { key: "latest", path: "services/grades/latest", ...userGradeEndpoint },
        { key: "terms", path: "services/grades/terms", ...userGradeEndpoint },
        { key: "terms2", path: "services/grades/terms2", ...userGradeEndpoint },
        {
            key: "updateGrade",
            path: "services/grades/update_grade",
            method: "POST",
            consumer: "required",
            token: "required",
            administrativeOnly: true,
        },
    ])
})

test("Programmes endpoint definitions match the UJ contract", () => {
    assertEndpointContracts(progsEndpoints, [
        { key: "programme", path: "services/progs/programme", consumer: "optional", token: "ignored" },
        { key: "programmes", path: "services/progs/programmes", consumer: "optional", token: "ignored" },
        { key: "search", path: "services/progs/search", consumer: "optional", token: "optional" },
        {
            key: "searchHistoryAffect",
            path: "services/progs/search_history_affect",
            method: "POST",
            consumer: "required",
            token: "required",
        },
        {
            key: "stage",
            path: "services/progs/stage",
            consumer: "ignored",
            token: "ignored",
            sslRequired: true,
        },
        { key: "student", path: "services/progs/student", consumer: "required", token: "optional" },
        {
            key: "studentProgramme",
            path: "services/progs/student_programme",
            consumer: "required",
            token: "optional",
        },
        {
            key: "studentProgrammes",
            path: "services/progs/student_programmes",
            consumer: "required",
            token: "optional",
        },
    ])
})

test("Timetable endpoint definitions match the UJ contract", () => {
    const publicEndpoint = {
        consumer: "ignored" as const,
        token: "ignored" as const,
    }
    const userEndpoint = {
        consumer: "required" as const,
        token: "required" as const,
        scopes: ["studies"],
    }

    assertEndpointContracts(ttEndpoints, [
        { key: "classGroup", path: "services/tt/classgroup", ...publicEndpoint },
        { key: "classGroupDates", path: "services/tt/classgroup_dates", ...publicEndpoint },
        { key: "classGroupDates2", path: "services/tt/classgroup_dates2", ...publicEndpoint },
        { key: "classGroups", path: "services/tt/classgroups", ...publicEndpoint },
        { key: "courseEdition", path: "services/tt/course_edition", ...publicEndpoint },
        { key: "courseEditions", path: "services/tt/course_editions", ...publicEndpoint },
        { key: "room", path: "services/tt/room", consumer: "required", token: "ignored" },
        { key: "staff", path: "services/tt/staff", consumer: "optional", token: "optional" },
        { key: "student", path: "services/tt/student", ...userEndpoint },
        {
            key: "upcomingIcal",
            path: "services/tt/upcoming_ical",
            response: "text",
            consumer: "optional",
            token: "optional",
        },
        { key: "upcomingShare", path: "services/tt/upcoming_share", ...userEndpoint },
        { key: "user", path: "services/tt/user", ...userEndpoint },
    ])
})
