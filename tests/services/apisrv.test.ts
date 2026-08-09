import assert from "node:assert/strict"
import test from "node:test"

import { ApiSrvService } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor"

test("APISRV maps selectors, arrays, and raw server time", async () => {
    const request = new MockRequestExecutor()
    const rawTime = "2026-07-26 10:20:30.123456"
    request.responses.set("services/apisrv/now", rawTime)

    const apisrv = new ApiSrvService(request)
    await apisrv.getConsumer(["name", "token_scopes"])
    await apisrv.getInstallation(["institution_name", "machine_version"])
    await apisrv.getInstallations()
    await apisrv.getMobileConfig(["enable_attendance"])
    const result = await apisrv.getNow()

    assert.equal(result, rawTime)
    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        ["services/apisrv/consumer", { fields: ["name", "token_scopes"] }],
        ["services/apisrv/installation", { fields: ["institution_name", "machine_version"] }],
        ["services/apisrv/installations", undefined],
        ["services/apisrv/mobile_usos_config", { fields: ["enable_attendance"] }],
        ["services/apisrv/now", undefined],
    ])
})

test("APISRV rejects an empty required Consumer selector", async () => {
    const request = new MockRequestExecutor()

    await assert.rejects(
        () => new ApiSrvService(request).getConsumer([]),
        /requires at least one field/,
    )
    assert.equal(request.calls.length, 0)
})
