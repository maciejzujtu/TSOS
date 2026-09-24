import type { LangDict, UserId } from '@/types/common'

export type PaymentId = string | number
export type InstallmentPlanId = string | number
export type RemittanceId = string | number
export type MoneyAmount = string | number

export interface Installment {
    amount?: MoneyAmount
    payment_date?: string
    description?: LangDict
    installment_plan_id?: InstallmentPlanId
    number?: number
}

export interface InstallmentPlan {
    id?: InstallmentPlanId
    is_default?: boolean
    currency?: string
    installments?: Installment[]
}

export interface Payment {
    id?: PaymentId | null
    user?: Record<string, unknown>
    saldo_amount?: MoneyAmount
    chosen_installment_plan?: InstallmentPlan | null
    who_chose_plan?: Record<string, unknown> | null
    date_of_plan_choice?: string | null
    available_installment_plans?: InstallmentPlan[]
    type?: string
    description?: LangDict
    state?: string
    account_number?: string
    payment_deadline?: string | null
    bonus_deadline?: string | null
    bonus_amount?: MoneyAmount | null
    has_bonus?: boolean
    interest?: MoneyAmount
    total_amount?: MoneyAmount
    currency?: string
    faculty?: Record<string, unknown>
    default_choice_date?: string | null
    debt_type?: "installment_plan" | "charged_installment" | "charged_interest" | (string & {})
}

export type PaymentFields =
    | keyof Payment
    | `user[${string}]`
    | `chosen_installment_plan[${string}]`
    | `who_chose_plan[${string}]`
    | `available_installment_plans[${string}]`
    | `faculty[${string}]`

export interface Remittance {
    id?: RemittanceId
    user?: Record<string, unknown>
    remaining?: MoneyAmount
    description?: string | LangDict
    amount?: MoneyAmount
    status?: string
    is_settled?: boolean
    date?: string
    currency?: string
    faculty?: Record<string, unknown>
}

export type RemittanceFields =
    | keyof Remittance
    | `user[${string}]`
    | `faculty[${string}]`

export interface UserAccount {
    account_number?: string
    account_owner?: string
    name?: string
    title_prefix?: string
    faculty?: Record<string, unknown>
    currency?: string
    swift?: string | null
}

export interface ChooseInstallmentPlanParams {
    payment_id: PaymentId
    plan_id: InstallmentPlanId
}

export interface InstallmentParams {
    installment_plan_id: InstallmentPlanId
    number: number
}

export interface InstallmentPlanParams {
    installment_plan_id: InstallmentPlanId
}

export interface PaymentParams {
    id: PaymentId
    type: string
    fields?: readonly PaymentFields[]
}

export interface RemittanceParams {
    id: RemittanceId
    fields?: readonly RemittanceFields[]
}

export type UserAccountsParams = Record<string, never>

export interface UserPaymentsParams {
    fields?: readonly PaymentFields[]
}

export interface UserRemittancesParams {
    fields?: readonly RemittanceFields[]
}

export interface PaymentOptions {
    id: PaymentId
    type: string
    fields?: readonly PaymentFields[]
}

export interface RemittanceOptions {
    id: RemittanceId
    fields?: readonly RemittanceFields[]
}

export interface PaymentUserReference {
    id?: UserId
}

export type EmptyPaymentResponse = Record<string, never>
