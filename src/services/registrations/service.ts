import type { RequestExecutor } from '@/core/requester'
import { registrationsEndpoints } from '@/services/registrations/endpoints'
import type {
    CoursesCart,
    CoursesCartFields,
    EmptyRegistrationResponse,
    FacultyRegistrationsOptions,
    FacultyTokenRegistrationsOptions,
    Ranking,
    RankingCode,
    RankingFields,
    RegisterOptions,
    Registration,
    RegistrationCourse,
    RegistrationCourseOptions,
    RegistrationFields,
    RegistrationId,
    RegistrationRound,
    RegistrationRoundCourse,
    RegistrationRoundCourseFields,
    RegistrationRoundFields,
    RegistrationRoundId,
    SearchRegistrationRoundsOptions,
    SearchTokenRegistrationRoundsOptions,
    TokenRegistration,
    TokenRegistrationCourse,
    TokenRegistrationCourseOptions,
    TokenRegistrationFields,
    TokenRegistrationRound,
    TokenRegistrationRoundFields,
    UnregisterOptions,
    UserRegistrationsOptions,
    UserTokenRegistrationsOptions,
} from '@/services/registrations/types'

export class RegistrationsService {
    public constructor(private readonly request: RequestExecutor) {}

    public async getCourseRegistrationRounds(
        registrationId: RegistrationId,
        fields?: readonly RegistrationRoundFields[],
    ): Promise<RegistrationRound[]> {
        return await this.request.request(registrationsEndpoints.courseRegistrationRounds, {
            params: { registration_id: registrationId, fields },
        })
    }

    public async getCoursesCart(fields?: readonly CoursesCartFields[]): Promise<CoursesCart> {
        return await this.request.request(registrationsEndpoints.coursesCart, {
            params: { fields },
        })
    }

    public async getFacultyRegistrations(
        options: FacultyRegistrationsOptions,
    ): Promise<Registration[]> {
        return await this.request.request(registrationsEndpoints.facultyRegistrations, {
            params: {
                faculty_id: options.facultyId,
                active_only: options.activeOnly,
                user_related: options.userRelated,
                fields: options.fields,
            },
        })
    }

    public async getFacultyTokenRegistrations(
        options: FacultyTokenRegistrationsOptions,
    ): Promise<TokenRegistration[]> {
        return await this.request.request(registrationsEndpoints.facultyTokenRegistrations, {
            params: {
                faculty_id: options.facultyId,
                active_only: options.activeOnly,
                user_related: options.userRelated,
                fields: options.fields,
            },
        })
    }

    public async getRanking(
        rankingCode: RankingCode,
        fields?: readonly RankingFields[],
    ): Promise<Ranking> {
        return await this.request.request(registrationsEndpoints.ranking, {
            params: { ranking_code: rankingCode, fields },
        })
    }

    public async register(options: RegisterOptions): Promise<EmptyRegistrationResponse> {
        return await this.request.request(registrationsEndpoints.register, {
            params: {
                round_id: options.roundId,
                course_id: options.courseId,
                term_id: options.termId,
                user_programme_id: options.userProgrammeId,
                user_stage_id: options.userStageId,
            },
        })
    }

    public async getRegistration(
        id: RegistrationId,
        fields?: readonly RegistrationFields[],
    ): Promise<Registration> {
        return await this.request.request(registrationsEndpoints.registration, {
            params: { id, fields },
        })
    }

    public async getRegistrationCourse(
        options: RegistrationCourseOptions,
    ): Promise<RegistrationCourse> {
        return await this.request.request(registrationsEndpoints.registrationCourse, {
            params: {
                registration_id: options.registrationId,
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
        })
    }

    public async getRegistrationRound(
        id: RegistrationRoundId,
        fields?: readonly RegistrationRoundFields[],
    ): Promise<RegistrationRound> {
        return await this.request.request(registrationsEndpoints.registrationRound, {
            params: { id, fields },
        })
    }

    public async getRegistrationRoundCourses(
        registrationRoundId: RegistrationRoundId,
        fields?: readonly RegistrationRoundCourseFields[],
    ): Promise<RegistrationRoundCourse[]> {
        return await this.request.request(registrationsEndpoints.registrationRoundCourses, {
            params: { registration_round_id: registrationRoundId, fields },
        })
    }

    public async searchRounds(
        options: SearchRegistrationRoundsOptions,
    ): Promise<RegistrationRound[]> {
        return await this.request.request(registrationsEndpoints.searchRounds, {
            params: {
                start_date: options.startDate,
                end_date: options.endDate,
                faculty_id: options.facultyId,
                user_related: options.userRelated,
                fields: options.fields,
            },
        })
    }

    public async searchTokenRounds(
        options: SearchTokenRegistrationRoundsOptions,
    ): Promise<TokenRegistrationRound[]> {
        return await this.request.request(registrationsEndpoints.searchTokenRounds, {
            params: {
                start_date: options.startDate,
                end_date: options.endDate,
                faculty_id: options.facultyId,
                user_related: options.userRelated,
                fields: options.fields,
            },
        })
    }

    public async getTokenRegistration(
        id: RegistrationId,
        fields?: readonly TokenRegistrationFields[],
    ): Promise<TokenRegistration> {
        return await this.request.request(registrationsEndpoints.tokenRegistration, {
            params: { id, fields },
        })
    }

    public async getTokenRegistrationCourse(
        options: TokenRegistrationCourseOptions,
    ): Promise<TokenRegistrationCourse> {
        return await this.request.request(registrationsEndpoints.tokenRegistrationCourse, {
            params: {
                registration_id: options.registrationId,
                course_id: options.courseId,
                term_id: options.termId,
                fields: options.fields,
            },
        })
    }

    public async getTokenRegistrationRound(
        id: RegistrationRoundId,
        fields?: readonly TokenRegistrationRoundFields[],
    ): Promise<TokenRegistrationRound> {
        return await this.request.request(registrationsEndpoints.tokenRegistrationRound, {
            params: { id, fields },
        })
    }

    public async unregister(options: UnregisterOptions): Promise<EmptyRegistrationResponse> {
        return await this.request.request(registrationsEndpoints.unregister, {
            params: {
                round_id: options.roundId,
                course_id: options.courseId,
                term_id: options.termId,
            },
        })
    }

    public async getUserRegistrations(
        options: UserRegistrationsOptions = {},
    ): Promise<Registration[]> {
        return await this.request.request(registrationsEndpoints.userRegistrations, {
            params: { active_only: options.activeOnly, fields: options.fields },
        })
    }

    public async getUserTokenRegistrations(
        options: UserTokenRegistrationsOptions = {},
    ): Promise<TokenRegistration[]> {
        return await this.request.request(registrationsEndpoints.userTokenRegistrations, {
            params: { active_only: options.activeOnly, fields: options.fields },
        })
    }
}
