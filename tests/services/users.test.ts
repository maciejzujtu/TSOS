import assert from "node:assert/strict"
import test from "node:test"

import { UsersService, usersEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Users maps all 22 official endpoints", async () => {
    const request = new MockRequestExecutor()
    const users = new UsersService(request)

    await users.change({ userId: 1, alternateEmail: "user@example.com", phoneNumbers: [] })
    await users.getEmploymentFunctions({ userId: 1, fields: ["function", "faculty"], includePast: true })
    await users.getEmploymentGroup("teacher", ["id", "name"])
    await users.getEmploymentGroupsIndex(["id", "name"])
    await users.getEmploymentPositions({ userId: 1, fields: ["position", "faculty"] })
    await users.getByPesel("00000000000", ["id", "first_name"])
    await users.getPhoto()
    await users.getPosition("professor", ["id", "name"])
    await users.searchLegacy({ name: "Kowalski", num: 6, start: 0 })
    await users.search({ lang: "pl", query: "Kowalski", among: ["students", "staff"] })
    await users.searchByEmail("user@example.com", ["id", "email"])
    await users.searchCurrentStudents({ name: "Kowalski" })
    await users.searchCurrentTeachers({ name: "Kowalski" })
    await users.affectSearchHistory(1)
    await users.searchStaff({ name: "Kowalski" })
    await users.searchStudents({ name: "Kowalski" })
    await users.getStaffIndex({ facultyIds: ["UJ.WFAIS"], fields: ["users", "total"] })
    await users.getStudentIndex({ programmeIds: ["PROGRAMME-1"], fields: ["users", "next_page"] })
    await users.getStudentProgrammes()
    await users.getUser(1, ["id", "first_name"])
    await users.getUser2(1, ["id", "student_status"])
    await users.getUsers([1, 2], ["id", "last_name"])

    assert.deepEqual(request.calls.map(call => call.path), [
        usersEndpoints.change.path,
        usersEndpoints.employmentFunctions.path,
        usersEndpoints.employmentGroup.path,
        usersEndpoints.employmentGroupsIndex.path,
        usersEndpoints.employmentPositions.path,
        usersEndpoints.pesel.path,
        usersEndpoints.photo.path,
        usersEndpoints.position.path,
        usersEndpoints.search.path,
        usersEndpoints.search2.path,
        usersEndpoints.searchByEmail.path,
        usersEndpoints.searchCurrentStudents.path,
        usersEndpoints.searchCurrentTeachers.path,
        usersEndpoints.searchHistoryAffect.path,
        usersEndpoints.searchStaff.path,
        usersEndpoints.searchStudents.path,
        usersEndpoints.staffIndex.path,
        usersEndpoints.studentIndex.path,
        usersEndpoints.studentProgrammes.path,
        usersEndpoints.user.path,
        usersEndpoints.user2.path,
        usersEndpoints.users.path,
    ])
    assert.deepEqual(request.calls[0]?.params, {
        user_id: 1,
        email: undefined,
        alt_email: "user@example.com",
        homepage_url: undefined,
        phone_numbers: [],
        mobile_numbers: undefined,
        room_id: undefined,
        revenue_office_id: undefined,
    })
})
