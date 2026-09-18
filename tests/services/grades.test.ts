import assert from "node:assert/strict"
import test from "node:test"

import { AdminClient, GradesService, gradesEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Grades maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const grades = new GradesService(request)
    const accessToken = { token: "access-token", secret: "access-secret" }

    await grades.getCourseEdition({
        courseId: "COURSE",
        termId: "2026Z",
        fields: ["value_symbol"],
    })
    await grades.getCourseEdition2({
        courseId: "COURSE",
        termId: "2026Z",
        fields: ["passes"],
    })
    await grades.getExamGrades({
        examId: 10,
        userId: "123",
        fields: ["value_description"],
    })
    await grades.getGrade({
        examId: 10,
        examSessionNumber: 2,
        userId: "123",
        fields: ["comment"],
    })
    await grades.getGradeType("ECTS", ["name"])
    await grades.getGradeTypesIndex(["id"])
    await grades.getGradeTypes(["ECTS", "PUNKTY"], ["values"])
    await grades.getLatest({ days: 14, fields: ["date_modified"] })
    await grades.getTermGrades({
        termIds: ["2026Z"],
        courseIds: ["COURSE"],
        fields: ["value_symbol"],
    })
    await grades.getTermGrades2({
        termIds: ["2026Z", "2026L"],
        fields: ["passes"],
    })
    await grades.updateGrade({
        studentId: "123",
        examId: 10,
        examSessionNumber: 2,
        valueSymbol: "5.0",
        comment: "Updated",
        privateComment: "Internal",
        dateModified: "2026-09-18 10:00:00",
        dateAcquisition: "2026-09-17",
    }, accessToken)

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [gradesEndpoints.courseEdition.path, {
            course_id: "COURSE",
            term_id: "2026Z",
            fields: ["value_symbol"],
        }],
        [gradesEndpoints.courseEdition2.path, {
            course_id: "COURSE",
            term_id: "2026Z",
            fields: ["passes"],
        }],
        [gradesEndpoints.exam.path, {
            exam_id: 10,
            user_id: "123",
            fields: ["value_description"],
        }],
        [gradesEndpoints.grade.path, {
            exam_id: 10,
            exam_session_number: 2,
            user_id: "123",
            fields: ["comment"],
        }],
        [gradesEndpoints.gradeType.path, {
            grade_type_id: "ECTS",
            fields: ["name"],
        }],
        [gradesEndpoints.gradeTypeIndex.path, { fields: ["id"] }],
        [gradesEndpoints.gradeTypes.path, {
            grade_type_ids: ["ECTS", "PUNKTY"],
            fields: ["values"],
        }],
        [gradesEndpoints.latest.path, {
            days: 14,
            fields: ["date_modified"],
        }],
        [gradesEndpoints.terms.path, {
            term_ids: ["2026Z"],
            course_ids: ["COURSE"],
            fields: ["value_symbol"],
        }],
        [gradesEndpoints.terms2.path, {
            term_ids: ["2026Z", "2026L"],
            course_ids: undefined,
            fields: ["passes"],
        }],
        [gradesEndpoints.updateGrade.path, {
            student_id: "123",
            exam_id: 10,
            exam_session_number: 2,
            value_symbol: "5.0",
            comment: "Updated",
            private_comment: "Internal",
            date_modified: "2026-09-18 10:00:00",
            date_acquisition: "2026-09-17",
        }],
    ])
    assert.deepEqual(request.calls.at(-1)?.token, accessToken)
})

test("Grades rejects empty required identifier lists", async () => {
    const grades = new GradesService(new MockRequestExecutor())

    await assert.rejects(() => grades.getGradeTypes([]), /at least one grade type ID/)
    await assert.rejects(() => grades.getTermGrades({ termIds: [] }), /at least one term ID/)
    await assert.rejects(() => grades.getTermGrades2({ termIds: [] }), /at least one term ID/)
})

test("Administrative grade updates sign the supplied user Access Token", async () => {
    let requestMethod: string | undefined
    let requestUrl: URL | undefined
    let authorization: string | null = null

    const admin = new AdminClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "admin-key", secret: "admin-secret" },
        fetch: (async (input, init) => {
            requestMethod = init?.method
            requestUrl = new URL(String(input))
            authorization = new Headers(init?.headers).get("Authorization")
            return new Response("{}", { status: 200 })
        }) as typeof globalThis.fetch,
    })

    await admin.grades.updateGrade({
        studentId: "123",
        examId: 10,
        examSessionNumber: 2,
        valueSymbol: "5.0",
    }, {
        token: "user-token",
        secret: "user-secret",
    })

    assert.equal(requestMethod, "POST")
    assert.equal(requestUrl?.pathname, "/services/grades/update_grade")
    assert.equal(requestUrl?.searchParams.get("student_id"), "123")
    assert.match(authorization ?? "", /oauth_consumer_key="admin-key"/)
    assert.match(authorization ?? "", /oauth_token="user-token"/)
})
