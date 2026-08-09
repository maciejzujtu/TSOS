import assert from "node:assert/strict"
import test from "node:test"

import { serializeParameters } from '@/core/params'

test("serializeParameters preserves values and applies USOS encodings", () => {
    const params = serializeParameters({
        fields: ["id", "name"],
        count: 0,
        enabled: false,
        comment: "",
        parameters: { user_id: "1" },
        omitted: undefined,
    })

    assert.equal(params.get("fields"), "id|name")
    assert.equal(params.get("count"), "0")
    assert.equal(params.get("enabled"), "false")
    assert.equal(params.get("comment"), "")
    assert.equal(params.get("parameters"), JSON.stringify({ user_id: "1" }))
    assert.equal(params.has("omitted"), false)
})
