import assert from "node:assert/strict"
import test from "node:test"

import { AttendanceService } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Attendance maps all read endpoints", async () => {
    const request = new MockRequestExecutor()
    const attendance = new AttendanceService(request)

    await attendance.getAttendance({
        listId: 10,
        studentIds: [20, "student-21"],
        fields: ["student", "attendance_mode"],
    })
    await attendance.getAttendanceList(10, ["id", "mode"])
    await attendance.getAttendanceLists([10, 11], ["date"])
    await attendance.getGroupAttendanceLists({
        courseUnitId: "course/unit",
        groupNumber: 2,
        fields: ["id", "owner"],
    })
    await attendance.getUserAttendanceLists(["id", "date"])

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        ["services/attendance/attendance", {
            list_id: 10,
            student_ids: [20, "student-21"],
            fields: ["student", "attendance_mode"],
        }],
        ["services/attendance/attendance_list", {
            list_id: 10,
            fields: ["id", "mode"],
        }],
        ["services/attendance/attendance_lists", {
            list_ids: [10, 11],
            fields: ["date"],
        }],
        ["services/attendance/group", {
            course_unit_id: "course/unit",
            group_number: 2,
            fields: ["id", "owner"],
        }],
        ["services/attendance/user", {
            fields: ["id", "date"],
        }],
    ])
})

test("Attendance maps mutations and preserves an empty comment", async () => {
    const request = new MockRequestExecutor()
    request.responses.set("services/attendance/create_attendance_list", { list_id: 42 })
    const attendance = new AttendanceService(request)

    const created = await attendance.createAttendanceList({
        courseUnitId: "course/unit",
        groupNumber: 2,
        date: "2026-07-26 10:00:00",
        mode: "hybrid",
    })
    await attendance.createFromTimetable({
        courseUnitId: "course/unit",
        groupNumber: 2,
        defaultMode: "intramural",
    })
    await attendance.changeListMode(42, "remote")
    await attendance.updateAttendance({
        listId: 42,
        studentId: "student-1",
        attendanceMode: "absence",
        comment: "",
    })
    await attendance.deleteAttendanceList(42)

    assert.deepEqual(created, { list_id: 42 })
    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        ["services/attendance/create_attendance_list", {
            course_unit_id: "course/unit",
            group_number: 2,
            date: "2026-07-26 10:00:00",
            mode: "hybrid",
        }],
        ["services/attendance/create_from_tt", {
            course_unit_id: "course/unit",
            group_number: 2,
            default_mode: "intramural",
        }],
        ["services/attendance/change_list_mode", {
            list_id: 42,
            mode: "remote",
        }],
        ["services/attendance/update_attendance", {
            list_id: 42,
            student_id: "student-1",
            attendance_mode: "absence",
            comment: "",
        }],
        ["services/attendance/delete_list", { list_id: 42 }],
    ])
})

test("Attendance rejects an empty required list selector", async () => {
    const request = new MockRequestExecutor()

    await assert.rejects(
        () => new AttendanceService(request).getAttendanceLists([]),
        /requires at least one list ID/,
    )
    assert.equal(request.calls.length, 0)
})
