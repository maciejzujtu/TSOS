import type { RequestExecutor } from '@/core/requester'
import { paymentsEndpoints } from '@/services/payments/endpoints'
import type {
    EmptyPaymentResponse,
    Installment,
    InstallmentPlan,
    InstallmentPlanId,
    Payment,
    PaymentFields,
    PaymentId,
    PaymentOptions,
    Remittance,
    RemittanceFields,
    RemittanceOptions,
    UserAccount,
} from '@/services/payments/types'

export class PaymentsService {
    public constructor(private readonly request: RequestExecutor) {}

    public async chooseInstallmentPlan(
        paymentId: PaymentId,
        planId: InstallmentPlanId,
    ): Promise<EmptyPaymentResponse> {
        return await this.request.request(paymentsEndpoints.chooseInstallmentPlan, {
            params: { payment_id: paymentId, plan_id: planId },
        })
    }

    public async getInstallment(
        installmentPlanId: InstallmentPlanId,
        number: number,
    ): Promise<Installment> {
        return await this.request.request(paymentsEndpoints.installment, {
            params: { installment_plan_id: installmentPlanId, number },
        })
    }

    public async getInstallmentPlan(
        installmentPlanId: InstallmentPlanId,
    ): Promise<InstallmentPlan> {
        return await this.request.request(paymentsEndpoints.installmentPlan, {
            params: { installment_plan_id: installmentPlanId },
        })
    }

    public async getPayment(options: PaymentOptions): Promise<Payment> {
        return await this.request.request(paymentsEndpoints.payment, {
            params: { id: options.id, type: options.type, fields: options.fields },
        })
    }

    public async getRemittance(options: RemittanceOptions): Promise<Remittance> {
        return await this.request.request(paymentsEndpoints.remittance, {
            params: { id: options.id, fields: options.fields },
        })
    }

    public async getUserAccounts(): Promise<UserAccount[]> {
        return await this.request.request(paymentsEndpoints.userAccounts)
    }

    public async getUserPayments(fields?: readonly PaymentFields[]): Promise<Payment[]> {
        return await this.request.request(paymentsEndpoints.userPayments, {
            params: { fields },
        })
    }

    public async getUserRemittances(
        fields?: readonly RemittanceFields[],
    ): Promise<Remittance[]> {
        return await this.request.request(paymentsEndpoints.userRemittances, {
            params: { fields },
        })
    }
}
