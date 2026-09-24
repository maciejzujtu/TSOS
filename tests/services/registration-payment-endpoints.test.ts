import assert from "node:assert/strict"
import test from "node:test"

import type { AnyEndpoint } from '@/core/endpoint'
import { examsEndpoints } from '@/services/exams/endpoints'
import { paymentsEndpoints } from '@/services/payments/endpoints'
import { registrationsEndpoints } from '@/services/registrations/endpoints'

interface ExpectedEndpoint {
    key: string
    path: `services/${string}`
    method?: "GET" | "POST"
    consumer: "required" | "optional" | "ignored"
    token: "required" | "optional" | "ignored"
    sslRequired: boolean
    administrativeOnly?: boolean
    scopes?: readonly string[]
}

function assertEndpointContracts(
    actual: object,
    expected: readonly ExpectedEndpoint[],
): void {
    const endpoints = actual as Record<string, AnyEndpoint>
    assert.deepEqual(Object.keys(endpoints), expected.map(({ key }) => key))

    for (const contract of expected) {
        const endpoint = endpoints[contract.key]
        assert.ok(endpoint, `Missing endpoint definition: ${contract.key}`)
        assert.equal(endpoint.path, contract.path)
        assert.equal(endpoint.method, contract.method ?? "GET")
        assert.equal(endpoint.response, "json")
        assert.deepEqual(endpoint.auth, {
            consumer: contract.consumer,
            token: contract.token,
            ...(contract.administrativeOnly ? { administrativeOnly: true } : {}),
            sslRequired: contract.sslRequired,
            ...(contract.scopes ? { scopes: contract.scopes } : {}),
        })
    }
}

test("Registrations endpoint definitions match the UJ contract", () => {
    const client = {
        consumer: "required" as const,
        token: "optional" as const,
        sslRequired: true,
    }
    const mutation = { ...client, scopes: ["studies"] }
    const user = {
        consumer: "required" as const,
        token: "required" as const,
        sslRequired: true,
        scopes: ["studies"],
    }

    assertEndpointContracts(registrationsEndpoints, [
        { key: "courseRegistrationRounds", path: "services/registrations/course_registration_rounds", ...client },
        { key: "coursesCart", path: "services/registrations/courses_cart", ...client },
        { key: "facultyRegistrations", path: "services/registrations/faculty_registrations", ...client },
        { key: "facultyTokenRegistrations", path: "services/registrations/faculty_token_registrations", ...client },
        { key: "ranking", path: "services/registrations/ranking", ...client },
        { key: "register", path: "services/registrations/register", method: "POST", ...mutation },
        { key: "registration", path: "services/registrations/registration", ...client },
        { key: "registrationCourse", path: "services/registrations/registration_course", ...client },
        { key: "registrationRound", path: "services/registrations/registration_round", ...client },
        { key: "registrationRoundCourses", path: "services/registrations/registration_round_courses", ...client },
        { key: "searchRounds", path: "services/registrations/search_rounds", ...client },
        { key: "searchTokenRounds", path: "services/registrations/search_token_rounds", ...client },
        { key: "tokenRegistration", path: "services/registrations/token_registration", ...client },
        { key: "tokenRegistrationCourse", path: "services/registrations/token_registration_course", ...client },
        { key: "tokenRegistrationRound", path: "services/registrations/token_registration_round", ...client },
        { key: "unregister", path: "services/registrations/unregister", method: "POST", ...mutation },
        { key: "userRegistrations", path: "services/registrations/user_registrations", ...user },
        { key: "userTokenRegistrations", path: "services/registrations/user_token_registrations", ...user },
    ])
})

test("Exams endpoint definitions match the UJ contract", () => {
    const optional = {
        consumer: "optional" as const,
        token: "optional" as const,
        sslRequired: false,
    }
    const admin = {
        consumer: "required" as const,
        token: "ignored" as const,
        administrativeOnly: true,
        sslRequired: true,
    }

    assertEndpointContracts(examsEndpoints, [
        { key: "activeExaminationSessions", path: "services/exams/active_examination_sessions", ...admin },
        {
            key: "administrator",
            path: "services/exams/administrator",
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["staff_perspective"],
        },
        { key: "batchRegisterExam", path: "services/exams/batch_register_exam", method: "POST", ...admin },
        { key: "batchRegistration", path: "services/exams/batch_registration", method: "POST", ...admin },
        { key: "batchUnregisterExam", path: "services/exams/batch_unregister_exam", method: "POST", ...admin },
        { key: "condition", path: "services/exams/condition", ...optional },
        { key: "exam", path: "services/exams/exam", ...optional },
        { key: "examGroup", path: "services/exams/exam_group", ...optional },
        { key: "examinationSession", path: "services/exams/examination_session", ...optional },
        { key: "examinationSessions", path: "services/exams/examination_sessions", ...optional },
        {
            key: "exams",
            path: "services/exams/exams",
            consumer: "optional",
            token: "ignored",
            sslRequired: true,
        },
        { key: "facultyExaminationSessions", path: "services/exams/faculty_examination_sessions", ...admin },
        { key: "group", path: "services/exams/group", ...optional },
        {
            key: "searchExamsRegistrations",
            path: "services/exams/search_exams_registrations",
            consumer: "required",
            token: "optional",
            sslRequired: true,
        },
        { key: "slot", path: "services/exams/slot", ...optional },
        {
            key: "studentExams",
            path: "services/exams/student_exams",
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["studies"],
        },
        {
            key: "user",
            path: "services/exams/user",
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: true,
        },
    ])
})

test("Payments endpoint definitions match the UJ contract", () => {
    const user = {
        consumer: "required" as const,
        token: "required" as const,
        sslRequired: true,
        scopes: ["payments"],
    }

    assertEndpointContracts(paymentsEndpoints, [
        { key: "chooseInstallmentPlan", path: "services/payments/choose_installment_plan", method: "POST", ...user },
        { key: "installment", path: "services/payments/installment", ...user },
        { key: "installmentPlan", path: "services/payments/installment_plan", ...user },
        { key: "payment", path: "services/payments/payment", ...user },
        { key: "remittance", path: "services/payments/remittance", ...user },
        { key: "userAccounts", path: "services/payments/user_accounts", ...user },
        { key: "userPayments", path: "services/payments/user_payments", ...user },
        { key: "userRemittances", path: "services/payments/user_remittances", ...user },
    ])
})
