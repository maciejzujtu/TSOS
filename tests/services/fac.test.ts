import assert from "node:assert/strict"
import test from "node:test"

import { FacService, facEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Fac maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const fac = new FacService(request)

    await fac.getFactsheet("UJ")
    await fac.getFaculties(["UJ", "UJ.WFAIS"], ["id", "name"])
    await fac.getFaculty("UJ.WFAIS", ["id", "stats[course_count]"])
    await fac.resolveFacpattern("UJ.*")
    await fac.search({
        lang: "pl",
        query: "fizyka",
        fields: ["id", "match"],
        visibility: "public",
        num: 10,
        start: 0,
    })
    await fac.getSubfacultiesDeep("UJ")

    assert.deepEqual(request.calls.map(call => call.path), [
        facEndpoints.factsheetGet.path,
        facEndpoints.faculties.path,
        facEndpoints.faculty.path,
        facEndpoints.resolveFacpattern.path,
        facEndpoints.search.path,
        facEndpoints.subfacultiesDeep.path,
    ])
    assert.deepEqual(request.calls[4]?.params, {
        lang: "pl",
        query: "fizyka",
        fields: ["id", "match"],
        visibility: "public",
        num: 10,
        start: 0,
    })
})
