import assert from "node:assert/strict"
import test from "node:test"

import { attendanceEndpoints } from '@'
import type { AnyEndpoint } from '@/core/endpoint'

test("Endpoint definitions remain usable by generic consumers", () => {
    const endpoint: AnyEndpoint = attendanceEndpoints.attendanceList
    assert.equal(endpoint.path, "services/attendance/attendance_list")
})
