import type { EndpointDefinition } from '@/core/endpoint'
import type {
    ChooseInstallmentPlanParams,
    EmptyPaymentResponse,
    Installment,
    InstallmentParams,
    InstallmentPlan,
    InstallmentPlanParams,
    Payment,
    PaymentParams,
    Remittance,
    RemittanceParams,
    UserAccount,
    UserAccountsParams,
    UserPaymentsParams,
    UserRemittancesParams,
} from '@/services/payments/types'

export interface PaymentsEndpoints {
    chooseInstallmentPlan: EndpointDefinition<ChooseInstallmentPlanParams, EmptyPaymentResponse>
    installment: EndpointDefinition<InstallmentParams, Installment>
    installmentPlan: EndpointDefinition<InstallmentPlanParams, InstallmentPlan>
    payment: EndpointDefinition<PaymentParams, Payment>
    remittance: EndpointDefinition<RemittanceParams, Remittance>
    userAccounts: EndpointDefinition<UserAccountsParams, UserAccount[]>
    userPayments: EndpointDefinition<UserPaymentsParams, Payment[]>
    userRemittances: EndpointDefinition<UserRemittancesParams, Remittance[]>
}

const paymentsAuth = {
    consumer: "required",
    token: "required",
    sslRequired: true,
    scopes: ["payments"],
} as const

export const paymentsEndpoints: PaymentsEndpoints = {
    chooseInstallmentPlan: {
        path: "services/payments/choose_installment_plan",
        method: "POST",
        response: "json",
        auth: paymentsAuth,
    },
    installment: {
        path: "services/payments/installment",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
    installmentPlan: {
        path: "services/payments/installment_plan",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
    payment: {
        path: "services/payments/payment",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
    remittance: {
        path: "services/payments/remittance",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
    userAccounts: {
        path: "services/payments/user_accounts",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
    userPayments: {
        path: "services/payments/user_payments",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
    userRemittances: {
        path: "services/payments/user_remittances",
        method: "GET",
        response: "json",
        auth: paymentsAuth,
    },
}
