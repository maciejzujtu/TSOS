import assert from "node:assert/strict"
import test from "node:test"

import { AdminClient, ExamsService, examsEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Exams maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const exams = new ExamsService(request)
    const values = { "1": { "2": ["123", "456"] } }
    const accessToken = { token: "user-token", secret: "user-secret" }

    await exams.getActiveExaminationSessions(["status"])
    await exams.getAdministratorExaminationSessions(["faculty"])
    await exams.batchRegisterExam({ examId: "EXAM", values })
    await exams.batchRegistration({ examId: "EXAM", unregister: values, register: values })
    await exams.batchUnregisterExam({ examId: "EXAM", values })
    await exams.getCondition({
        examId: "EXAM",
        examReportId: "REPORT",
        fields: ["grade_value"],
    })
    await exams.getExam("EXAM", ["course"])
    await exams.getExamGroup({ examId: "EXAM", groupNumber: 1, fields: ["attendees"] })
    await exams.getExaminationSession("SESSION", ["exams"])
    await exams.getExaminationSessions(["SESSION", "SESSION-2"], ["status"])
    await exams.getExams(["EXAM", "EXAM-2"], ["code"])
    await exams.getFacultyExaminationSessions({
        facultyId: "FA",
        status: "active",
        fields: ["id"],
    })
    await exams.getGroup({ examId: "EXAM", groupNumber: 1, fields: ["slots"] })
    await exams.searchRegistrations({
        startDate: "2026-09-01",
        endDate: "2026-09-30",
        facultyId: "FA",
        userRelated: true,
        fields: ["registration_start"],
    })
    await exams.getSlot({
        examId: "EXAM",
        groupNumber: 1,
        slotNumber: 2,
        fields: ["capacity"],
    })
    await exams.getStudentExams(["name"])
    await exams.getUserExaminationSessions(accessToken, ["description"])

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [examsEndpoints.activeExaminationSessions.path, { fields: ["status"] }],
        [examsEndpoints.administrator.path, { fields: ["faculty"] }],
        [examsEndpoints.batchRegisterExam.path, { exam_id: "EXAM", values }],
        [examsEndpoints.batchRegistration.path, {
            exam_id: "EXAM",
            unregister: values,
            register: values,
        }],
        [examsEndpoints.batchUnregisterExam.path, { exam_id: "EXAM", values }],
        [examsEndpoints.condition.path, {
            exam_id: "EXAM",
            examrep_id: "REPORT",
            fields: ["grade_value"],
        }],
        [examsEndpoints.exam.path, { id: "EXAM", fields: ["course"] }],
        [examsEndpoints.examGroup.path, {
            exam_id: "EXAM",
            group_number: 1,
            fields: ["attendees"],
        }],
        [examsEndpoints.examinationSession.path, { id: "SESSION", fields: ["exams"] }],
        [examsEndpoints.examinationSessions.path, {
            ids: ["SESSION", "SESSION-2"],
            fields: ["status"],
        }],
        [examsEndpoints.exams.path, { ids: ["EXAM", "EXAM-2"], fields: ["code"] }],
        [examsEndpoints.facultyExaminationSessions.path, {
            faculty_id: "FA",
            status: "active",
            fields: ["id"],
        }],
        [examsEndpoints.group.path, {
            exam_id: "EXAM",
            group_number: 1,
            fields: ["slots"],
        }],
        [examsEndpoints.searchExamsRegistrations.path, {
            start_date: "2026-09-01",
            end_date: "2026-09-30",
            faculty_id: "FA",
            user_related: true,
            fields: ["registration_start"],
        }],
        [examsEndpoints.slot.path, {
            exam_id: "EXAM",
            group_number: 1,
            slot_number: 2,
            fields: ["capacity"],
        }],
        [examsEndpoints.studentExams.path, { fields: ["name"] }],
        [examsEndpoints.user.path, { fields: ["description"] }],
    ])
    assert.deepEqual(request.calls.at(-1)?.token, accessToken)
})

test("Exams rejects empty identifier lists", async () => {
    const exams = new ExamsService(new MockRequestExecutor())

    await assert.rejects(() => exams.getExaminationSessions([]), /at least one ID/)
    await assert.rejects(() => exams.getExams([]), /at least one ID/)
})

test("Administrative user examination lookup signs the supplied Access Token", async () => {
    let authorization: string | null = null
    const admin = new AdminClient({
        baseUrl: "https://apps.usos.uj.edu.pl",
        consumer: { key: "admin-key", secret: "admin-secret" },
        fetch: (async (_input, init) => {
            authorization = new Headers(init?.headers).get("Authorization")
            return new Response("[]", { status: 200 })
        }) as typeof globalThis.fetch,
    })

    await admin.exams.getUserExaminationSessions({
        token: "user-token",
        secret: "user-secret",
    })

    assert.match(authorization ?? "", /oauth_consumer_key="admin-key"/)
    assert.match(authorization ?? "", /oauth_token="user-token"/)
})
