import assert from "node:assert/strict"
import test from "node:test"

import { ProgsService, progsEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Programmes maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const progs = new ProgsService(request)

    await progs.getProgramme("INF", ["name"])
    await progs.getProgrammes(["INF", "MAT"], ["faculty"])
    await progs.search({
        lang: "pl",
        fields: ["items[programme]"],
        query: "informatyka",
        num: 20,
        start: 5,
    })
    await progs.affectSearchHistory("INF")
    await progs.getStage(2, ["name"])
    await progs.getStudentProgrammes({
        userId: "123",
        fields: ["programme[name]"],
        activeOnly: true,
        oldPrograms: false,
    })
    await progs.getStudentProgramme(100, ["status"])
    await progs.getStudentProgrammesByIds([100, 101], ["is_primary"])

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [progsEndpoints.programme.path, {
            programme_id: "INF",
            fields: ["name"],
        }],
        [progsEndpoints.programmes.path, {
            programme_ids: ["INF", "MAT"],
            fields: ["faculty"],
        }],
        [progsEndpoints.search.path, {
            lang: "pl",
            fields: ["items[programme]"],
            query: "informatyka",
            num: 20,
            start: 5,
        }],
        [progsEndpoints.searchHistoryAffect.path, { programme_id: "INF" }],
        [progsEndpoints.stage.path, { id: 2, fields: ["name"] }],
        [progsEndpoints.student.path, {
            user_id: "123",
            fields: ["programme[name]"],
            active_only: true,
            old_programs: false,
        }],
        [progsEndpoints.studentProgramme.path, {
            student_programme_id: 100,
            fields: ["status"],
        }],
        [progsEndpoints.studentProgrammes.path, {
            student_programme_ids: [100, 101],
            fields: ["is_primary"],
        }],
    ])
})

test("Programmes rejects empty required identifier lists", async () => {
    const progs = new ProgsService(new MockRequestExecutor())

    await assert.rejects(() => progs.getProgrammes([]), /at least one programme ID/)
    await assert.rejects(
        () => progs.getStudentProgrammesByIds([]),
        /at least one student programme ID/,
    )
})
