import assert from "node:assert/strict"
import test from "node:test"

import { TermsService, termsEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor"

test("Terms maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const terms = new TermsService(request)

    await terms.search({
        query: "winter",
        minFinishDate: "2026-01-01",
        maxStartDate: "2026-12-31",
    })
    await terms.getTerm("2026Z")
    await terms.getTerms(["2026Z", "2026L"])
    await terms.getTermsIndex({ termType: "semester", activeOnly: true })

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [termsEndpoints.search.path, {
            query: "winter",
            min_finish_date: "2026-01-01",
            max_start_date: "2026-12-31",
        }],
        [termsEndpoints.term.path, { term_id: "2026Z" }],
        [termsEndpoints.terms.path, { term_ids: ["2026Z", "2026L"] }],
        [termsEndpoints.termsIndex.path, {
            term_type: "semester",
            active_only: true,
        }],
    ])
})
