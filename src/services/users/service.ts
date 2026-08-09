import type { RequestExecutor } from '@/core/requester'
import { usersEndpoints } from '@/services/users/endpoints'
import type {
    ChangeUserOptions,
    ChangeUserResponse,
    EmploymentFunction,
    EmploymentFunctionsOptions,
    EmploymentGroup,
    EmploymentGroupFields,
    EmploymentPosition,
    EmploymentPositionsOptions,
    LegacyUserSearchOptions,
    LegacyUserSearchResult,
    Position,
    PositionFields,
    SearchHistoryAffectResponse,
    SearchUsersOptions,
    StaffIndexOptions,
    StudentIndexOptions,
    StudentProgrammeSummary,
    User,
    User2,
    User2Fields,
    UserFields,
    UserIndexResult,
    UserSearchResult,
} from '@/services/users/types'
import type { UserId } from '@/types/common'

export class UsersService {
    public constructor(private readonly request: RequestExecutor) {}

    public async change(options: ChangeUserOptions): Promise<ChangeUserResponse> {
        return await this.request.request(usersEndpoints.change, {
            params: {
                user_id: options.userId,
                email: options.email,
                alt_email: options.alternateEmail,
                homepage_url: options.homepageUrl,
                phone_numbers: options.phoneNumbers,
                mobile_numbers: options.mobileNumbers,
                room_id: options.roomId,
                revenue_office_id: options.revenueOfficeId,
            },
        })
    }

    public async getEmploymentFunctions(
        options: EmploymentFunctionsOptions = {},
    ): Promise<EmploymentFunction[]> {
        return await this.request.request(usersEndpoints.employmentFunctions, {
            params: {
                user_id: options.userId,
                fields: options.fields,
                include_past: options.includePast,
            },
        })
    }

    public async getEmploymentGroup(
        id: string,
        fields?: readonly EmploymentGroupFields[],
    ): Promise<EmploymentGroup> {
        return await this.request.request(usersEndpoints.employmentGroup, {
            params: { id, fields },
        })
    }

    public async getEmploymentGroupsIndex(
        fields?: readonly EmploymentGroupFields[],
    ): Promise<EmploymentGroup[]> {
        return await this.request.request(usersEndpoints.employmentGroupsIndex, {
            params: { fields },
        })
    }

    public async getEmploymentPositions(
        options: EmploymentPositionsOptions = {},
    ): Promise<EmploymentPosition[]> {
        return await this.request.request(usersEndpoints.employmentPositions, {
            params: {
                user_id: options.userId,
                include_past: options.includePast,
                fields: options.fields,
            },
        })
    }

    public async getByPesel(
        pesel: string,
        fields?: readonly UserFields[],
    ): Promise<User> {
        return await this.request.request(usersEndpoints.pesel, {
            params: { pesel, fields },
        })
    }

    public async getPhoto(): Promise<ArrayBuffer> {
        return await this.request.request(usersEndpoints.photo)
    }

    public async getPosition(
        id: string,
        fields?: readonly PositionFields[],
    ): Promise<Position> {
        return await this.request.request(usersEndpoints.position, {
            params: { id, fields },
        })
    }

    /** @deprecated Prefer search. */
    public async searchLegacy(
        options: LegacyUserSearchOptions = {},
    ): Promise<LegacyUserSearchResult> {
        return await this.legacySearch(usersEndpoints.search, options)
    }

    public async search(options: SearchUsersOptions): Promise<UserSearchResult> {
        return await this.request.request(usersEndpoints.search2, {
            params: {
                lang: options.lang,
                fields: options.fields,
                query: options.query,
                among: options.among,
                num: options.num,
                start: options.start,
            },
        })
    }

    public async searchByEmail(
        email: string,
        fields?: readonly UserFields[],
    ): Promise<User[]> {
        return await this.request.request(usersEndpoints.searchByEmail, {
            params: { email, fields },
        })
    }

    /** @deprecated Prefer search with among: ["current_students"]. */
    public async searchCurrentStudents(
        options: LegacyUserSearchOptions = {},
    ): Promise<LegacyUserSearchResult> {
        return await this.legacySearch(usersEndpoints.searchCurrentStudents, options)
    }

    /** @deprecated Prefer search with among: ["current_teachers"]. */
    public async searchCurrentTeachers(
        options: LegacyUserSearchOptions = {},
    ): Promise<LegacyUserSearchResult> {
        return await this.legacySearch(usersEndpoints.searchCurrentTeachers, options)
    }

    public async affectSearchHistory(userId: UserId): Promise<SearchHistoryAffectResponse> {
        return await this.request.request(usersEndpoints.searchHistoryAffect, {
            params: { user_id: userId },
        })
    }

    /** @deprecated Prefer search with among: ["staff"]. */
    public async searchStaff(
        options: LegacyUserSearchOptions = {},
    ): Promise<LegacyUserSearchResult> {
        return await this.legacySearch(usersEndpoints.searchStaff, options)
    }

    /** @deprecated Prefer search with among: ["students"]. */
    public async searchStudents(
        options: LegacyUserSearchOptions = {},
    ): Promise<LegacyUserSearchResult> {
        return await this.legacySearch(usersEndpoints.searchStudents, options)
    }

    public async getStaffIndex(options: StaffIndexOptions): Promise<UserIndexResult> {
        if (options.facultyIds.length === 0) {
            throw new TypeError("getStaffIndex requires at least one faculty ID")
        }

        return await this.request.request(usersEndpoints.staffIndex, {
            params: {
                fac_ids: options.facultyIds,
                teachers_only: options.teachersOnly,
                fields: options.fields,
                num: options.num,
                start: options.start,
            },
        })
    }

    public async getStudentIndex(options: StudentIndexOptions = {}): Promise<UserIndexResult> {
        return await this.request.request(usersEndpoints.studentIndex, {
            params: {
                programme_ids: options.programmeIds,
                country_id: options.countryId,
                fields: options.fields,
                num: options.num,
                start: options.start,
            },
        })
    }

    /** @deprecated Prefer the progs/student endpoint when available. */
    public async getStudentProgrammes(): Promise<StudentProgrammeSummary[]> {
        return await this.request.request(usersEndpoints.studentProgrammes)
    }

    public async getUser(
        userId?: UserId,
        fields?: readonly UserFields[],
    ): Promise<User | null> {
        return await this.request.request(usersEndpoints.user, {
            params: {
                user_id: userId,
                fields,
            },
        })
    }

    public async getUser2(
        userId?: UserId,
        fields?: readonly User2Fields[],
    ): Promise<User2 | null> {
        return await this.request.request(usersEndpoints.user2, {
            params: {
                user_id: userId,
                fields,
            },
        })
    }

    public async getUsers(
        userIds: readonly UserId[],
        fields?: readonly UserFields[],
    ): Promise<Record<string, User | null>> {
        if (userIds.length === 0) {
            throw new TypeError("getUsers requires at least one user ID")
        }

        return await this.request.request(usersEndpoints.users, {
            params: {
                user_ids: userIds,
                fields,
            },
        })
    }

    private async legacySearch(
        endpoint:
            | typeof usersEndpoints.search
            | typeof usersEndpoints.searchCurrentStudents
            | typeof usersEndpoints.searchCurrentTeachers
            | typeof usersEndpoints.searchStaff
            | typeof usersEndpoints.searchStudents,
        options: LegacyUserSearchOptions,
    ): Promise<LegacyUserSearchResult> {
        return await this.request.request(endpoint, {
            params: {
                name: options.name,
                num: options.num,
                start: options.start,
            },
        })
    }
}
