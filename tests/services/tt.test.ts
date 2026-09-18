import assert from "node:assert/strict"
import test from "node:test"

import { TtService, ttEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Timetables maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const tt = new TtService(request)

    await tt.getClassGroup({
        courseUnitId: "UNIT",
        groupNumber: 1,
        start: "2026-09-18",
        days: 7,
        fields: ["name"],
    })
    await tt.getClassGroupDates({ courseUnitId: "UNIT", groupNumber: 1 })
    await tt.getClassGroupDates2({
        courseUnitId: "UNIT",
        groupNumber: 1,
        fields: ["start_time"],
    })
    await tt.getClassGroups({
        classGroupIds: ["UNIT|1", "UNIT|2"],
        partial: true,
        start: "2026-09-18",
        days: 2,
        fields: ["type"],
    })
    await tt.getCourseEdition({
        courseId: "COURSE",
        termId: "2026Z",
        start: "2026-09-18",
        days: 3,
        fields: ["course_name"],
    })
    await tt.getCourseEditions({
        courseEditionIds: ["COURSE|2026Z"],
        partial: false,
        start: "2026-09-18",
        days: 4,
        fields: ["end_time"],
    })
    await tt.getRoom({ roomId: 15, start: "2026-09-18", days: 1, fields: ["name"] })
    await tt.getStaff({ userId: "123", start: "2026-09-18", days: 5, fields: ["url"] })
    await tt.getStudent({ start: "2026-09-18", days: 6, fields: ["room_number"] })
    await tt.getUpcomingIcal({ userId: "123", lang: "pl", key: "calendar-key" })
    await tt.getUpcomingShare("en")
    await tt.getUser({ start: "2026-09-18", days: 7, fields: ["type"] })

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [ttEndpoints.classGroup.path, {
            unit_id: "UNIT",
            group_number: 1,
            start: "2026-09-18",
            days: 7,
            fields: ["name"],
        }],
        [ttEndpoints.classGroupDates.path, { unit_id: "UNIT", group_number: 1 }],
        [ttEndpoints.classGroupDates2.path, {
            unit_id: "UNIT",
            group_number: 1,
            fields: ["start_time"],
        }],
        [ttEndpoints.classGroups.path, {
            classgroup_ids: ["UNIT|1", "UNIT|2"],
            partial: true,
            start: "2026-09-18",
            days: 2,
            fields: ["type"],
        }],
        [ttEndpoints.courseEdition.path, {
            course_id: "COURSE",
            term_id: "2026Z",
            start: "2026-09-18",
            days: 3,
            fields: ["course_name"],
        }],
        [ttEndpoints.courseEditions.path, {
            course_edition_ids: ["COURSE|2026Z"],
            partial: false,
            start: "2026-09-18",
            days: 4,
            fields: ["end_time"],
        }],
        [ttEndpoints.room.path, {
            room_id: 15,
            start: "2026-09-18",
            days: 1,
            fields: ["name"],
        }],
        [ttEndpoints.staff.path, {
            user_id: "123",
            start: "2026-09-18",
            days: 5,
            fields: ["url"],
        }],
        [ttEndpoints.student.path, {
            start: "2026-09-18",
            days: 6,
            fields: ["room_number"],
        }],
        [ttEndpoints.upcomingIcal.path, {
            user_id: "123",
            lang: "pl",
            key: "calendar-key",
        }],
        [ttEndpoints.upcomingShare.path, { lang: "en" }],
        [ttEndpoints.user.path, {
            start: "2026-09-18",
            days: 7,
            fields: ["type"],
        }],
    ])
})

test("Timetables rejects empty required identifier lists", async () => {
    const tt = new TtService(new MockRequestExecutor())

    await assert.rejects(() => tt.getClassGroups({ classGroupIds: [] }), /at least one class group ID/)
    await assert.rejects(
        () => tt.getCourseEditions({ courseEditionIds: [] }),
        /at least one course edition ID/,
    )
})
