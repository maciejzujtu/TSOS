import assert from "node:assert/strict"
import test from "node:test"

import { ApiRefService, attendanceEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor"

test("APIREF maps endpoint metadata and preserves array contracts", async () => {
    const request = new MockRequestExecutor()
    const scopes = [
        { key: "staff_perspective", developers_description: "Staff access" },
    ]
    request.responses.set("services/apiref/scopes", scopes)

    const apiref = new ApiRefService(request)
    await apiref.getMethod(attendanceEndpoints.attendanceList, ["name", "arguments"])
    await apiref.getMethodIndex()
    await apiref.getModule("services/attendance")
    const result = await apiref.getScopes()

    assert.deepEqual(result, scopes)
    assert.deepEqual(request.calls, [
        {
            path: "services/apiref/method",
            params: {
                name: "services/attendance/attendance_list",
                fields: ["name", "arguments"],
            },
            token: undefined,
            oauthCallback: undefined,
        },
        {
            path: "services/apiref/method_index",
            params: undefined,
            token: undefined,
            oauthCallback: undefined,
        },
        {
            path: "services/apiref/module",
            params: { name: "services/attendance" },
            token: undefined,
            oauthCallback: undefined,
        },
        {
            path: "services/apiref/scopes",
            params: undefined,
            token: undefined,
            oauthCallback: undefined,
        },
    ])
})
