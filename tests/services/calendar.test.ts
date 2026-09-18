import assert from "node:assert/strict"
import test from "node:test"

import { CalendarService, calendarEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Calendar maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const calendar = new CalendarService(request)

    await calendar.getCalendarEvent(42, ["name", "type"])
    await calendar.search({
        facultyId: "UJ",
        startDate: "2026-09-01",
        endDate: "2026-09-30",
        fields: ["name", "start_date"],
    })

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [calendarEndpoints.calendarEvent.path, {
            id: 42,
            fields: ["name", "type"],
        }],
        [calendarEndpoints.search.path, {
            faculty_id: "UJ",
            start_date: "2026-09-01",
            end_date: "2026-09-30",
            fields: ["name", "start_date"],
        }],
    ])
})
