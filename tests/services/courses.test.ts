import assert from "node:assert/strict"
import test from "node:test"

import { CoursesService, coursesEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Courses maps all 17 official endpoints", async () => {
    const request = new MockRequestExecutor()
    const courses = new CoursesService(request)

    await courses.getClassType("LEC")
    await courses.getClassTypesIndex()
    await courses.getCoordinatorCourseEditions({
        userId: 1,
        activeTermsOnly: true,
        fields: ["course", "term"],
    })
    await courses.getCourse("COURSE-1", ["id", "name"])
    await courses.getCourse2("COURSE-1", ["id", "description"])
    await courses.getCourseEdition({
        courseId: "COURSE-1",
        termId: "2026Z",
        fields: ["course_id", "user_groups"],
    })
    await courses.getCourseEdition2({
        courseId: "COURSE-1",
        termId: "2026Z",
        fields: ["course", "term"],
    })
    await courses.getCourseUnit("UNIT-1", ["id", "class_groups"])
    await courses.getCourses(["COURSE-1", "COURSE-2"], ["id", "name"])
    await courses.isCoordinator({ courseId: "COURSE-1", termId: "2026Z", userId: 1 })
    await courses.isLecturer({ courseId: "COURSE-1", termId: "2026Z", userId: 1 })
    await courses.isParticipant("COURSE-1", "2026Z")
    await courses.search({
        lang: "pl",
        name: "TypeScript",
        fields: ["id", "match"],
        facultyId: "UJ.WFAIS",
        facultyDeep: true,
    })
    await courses.getUnit("UNIT-1", ["id", "groups"])
    await courses.getUnits(["UNIT-1", "UNIT-2"], ["id"])
    await courses.getUserCourses({ fields: ["course_editions", "terms"] })
    await courses.getUserEctsPoints()

    assert.deepEqual(request.calls.map(call => call.path), [
        coursesEndpoints.classType.path,
        coursesEndpoints.classTypesIndex.path,
        coursesEndpoints.coordinator.path,
        coursesEndpoints.course.path,
        coursesEndpoints.course2.path,
        coursesEndpoints.courseEdition.path,
        coursesEndpoints.courseEdition2.path,
        coursesEndpoints.courseUnit.path,
        coursesEndpoints.courses.path,
        coursesEndpoints.isCoordinator.path,
        coursesEndpoints.isLecturer.path,
        coursesEndpoints.isParticipant.path,
        coursesEndpoints.search.path,
        coursesEndpoints.unit.path,
        coursesEndpoints.units.path,
        coursesEndpoints.user.path,
        coursesEndpoints.userEctsPoints.path,
    ])
    assert.deepEqual(request.calls[12]?.params, {
        lang: "pl",
        name: "TypeScript",
        fields: ["id", "match"],
        num: undefined,
        start: undefined,
        fac_id: "UJ.WFAIS",
        fac_deep: true,
    })
})
