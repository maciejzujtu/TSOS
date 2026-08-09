import type { RequestExecutor } from '@/core/requester'
import { coursesEndpoints } from '@/services/courses/endpoints'
import type {
    ClassType,
    ClassTypeId,
    CoordinatorCoursesOptions,
    Course,
    CourseEdition,
    CourseEdition2Options,
    CourseEditionOptions,
    CourseFields,
    CourseRoleOptions,
    CourseSearchResult,
    CourseUnit,
    CourseUnitFields,
    LegacyCourseEdition,
    LegacyCourseUnit,
    LegacyCourseUnitFields,
    SearchCoursesOptions,
    UserCourses,
    UserCoursesOptions,
    UserEctsPoints,
} from '@/services/courses/types'
import type { CourseId, CourseUnitId, TermId } from '@/types/common'

export class CoursesService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getClassType(id: ClassTypeId): Promise<ClassType> {
        return await this.request.request(coursesEndpoints.classType, {
            params: { id },
        })
    }

    public async getClassTypesIndex(): Promise<Record<string, Pick<ClassType, "name">>> {
        return await this.request.request(coursesEndpoints.classTypesIndex)
    }

    public async getCoordinatorCourseEditions(
        options: CoordinatorCoursesOptions = {},
    ): Promise<CourseEdition[]> {
        return await this.request.request(coursesEndpoints.coordinator, {
            params: {
                user_id: options.userId,
                active_terms_only: options.activeTermsOnly,
                fields: options.fields,
            },
        })
    }

    public async getCourse(
        courseId: CourseId,
        fields?: readonly CourseFields[],
    ): Promise<Course> {
        return await this.request.request(coursesEndpoints.course, {
            params: {
                course_id: courseId,
                fields,
            },
        })
    }

    public async getCourse2(
        courseId: CourseId,
        fields?: readonly CourseFields[],
    ): Promise<Course> {
        return await this.request.request(coursesEndpoints.course2, {
            params: {
                course_id: courseId,
                fields,
            },
        })
    }

    public async getCourseEdition(options: CourseEditionOptions): Promise<LegacyCourseEdition> {
        return await this.request.request(coursesEndpoints.courseEdition, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
        })
    }

    public async getCourseEdition2(options: CourseEdition2Options): Promise<CourseEdition> {
        return await this.request.request(coursesEndpoints.courseEdition2, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
        })
    }

    public async getCourseUnit(
        courseUnitId: CourseUnitId,
        fields?: readonly CourseUnitFields[],
    ): Promise<CourseUnit> {
        return await this.request.request(coursesEndpoints.courseUnit, {
            params: {
                course_unit_id: courseUnitId,
                fields,
            },
        })
    }

    public async getCourses(
        courseIds: readonly CourseId[],
        fields?: readonly CourseFields[],
    ): Promise<Record<string, Course | null>> {
        if (courseIds.length === 0) {
            throw new TypeError("getCourses requires at least one course ID")
        }

        return await this.request.request(coursesEndpoints.courses, {
            params: {
                course_ids: courseIds,
                fields,
            },
        })
    }

    public async isCoordinator(options: CourseRoleOptions): Promise<boolean> {
        return await this.request.request(coursesEndpoints.isCoordinator, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                user_id: options.userId,
            },
        })
    }

    public async isLecturer(options: CourseRoleOptions): Promise<boolean> {
        return await this.request.request(coursesEndpoints.isLecturer, {
            params: {
                course_id: options.courseId,
                term_id: options.termId,
                user_id: options.userId,
            },
        })
    }

    public async isParticipant(courseId: CourseId, termId: TermId): Promise<boolean> {
        return await this.request.request(coursesEndpoints.isParticipant, {
            params: {
                course_id: courseId,
                term_id: termId,
            },
        })
    }

    public async search(options: SearchCoursesOptions): Promise<CourseSearchResult> {
        return await this.request.request(coursesEndpoints.search, {
            params: {
                lang: options.lang,
                name: options.name,
                fields: options.fields,
                num: options.num,
                start: options.start,
                fac_id: options.facultyId,
                fac_deep: options.facultyDeep,
            },
        })
    }

    public async getUnit(
        unitId: CourseUnitId,
        fields?: readonly LegacyCourseUnitFields[],
    ): Promise<LegacyCourseUnit> {
        return await this.request.request(coursesEndpoints.unit, {
            params: {
                unit_id: unitId,
                fields,
            },
        })
    }

    public async getUnits(
        unitIds: readonly CourseUnitId[],
        fields?: readonly LegacyCourseUnitFields[],
    ): Promise<Record<string, LegacyCourseUnit | null>> {
        if (unitIds.length === 0) {
            throw new TypeError("getUnits requires at least one unit ID")
        }

        return await this.request.request(coursesEndpoints.units, {
            params: {
                unit_ids: unitIds,
                fields,
            },
        })
    }

    public async getUserCourses(options: UserCoursesOptions = {}): Promise<UserCourses> {
        return await this.request.request(coursesEndpoints.user, {
            params: {
                fields: options.fields,
                active_terms_only: options.activeTermsOnly,
            },
        })
    }

    public async getUserEctsPoints(): Promise<UserEctsPoints> {
        return await this.request.request(coursesEndpoints.userEctsPoints)
    }
}
