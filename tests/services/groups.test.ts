import assert from "node:assert/strict"
import test from "node:test"

import { GroupsService, groupsEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Groups maps all nine official endpoints and formats composite IDs", async () => {
    const request = new MockRequestExecutor()
    const groups = new GroupsService(request)

    await groups.getClassGroup({ courseUnitId: "UNIT-1", groupNumber: 1, fields: ["course_unit_id", "number"] })
    await groups.getCommonGroups({ userId: 2, fields: ["group", "my_role"] })
    await groups.getGroup({ courseUnitId: "UNIT-1", groupNumber: 1, fields: ["course_unit_id", "group_number"] })
    await groups.getGroups({
        groups: [
            { courseUnitId: "UNIT-1", groupNumber: 1 },
            { courseUnitId: "UNIT-2", groupNumber: 2 },
        ],
        fields: ["course_unit_id", "group_number"],
    })
    await groups.isLecturer({ courseUnitId: "UNIT-1", groupNumber: 1, userId: 2 })
    await groups.isParticipant("UNIT-1", 1)
    await groups.getLecturerGroups({ fields: ["course_unit_id"], userId: 2, lang: "pl" })
    await groups.getParticipantGroups({ fields: ["course_unit_id"], activeTerms: true })
    await groups.getUserGroups({ fields: ["course_unit_id"], lang: "en" })

    assert.deepEqual(request.calls.map(call => call.path), [
        groupsEndpoints.classGroup.path,
        groupsEndpoints.commonGroups.path,
        groupsEndpoints.group.path,
        groupsEndpoints.groups.path,
        groupsEndpoints.isLecturer.path,
        groupsEndpoints.isParticipant.path,
        groupsEndpoints.lecturer.path,
        groupsEndpoints.participant.path,
        groupsEndpoints.user.path,
    ])
    assert.deepEqual(request.calls[3]?.params, {
        group_ids: ["(UNIT-1,1)", "(UNIT-2,2)"],
        fields: ["course_unit_id", "group_number"],
    })
})
