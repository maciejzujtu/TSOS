import assert from "node:assert/strict"
import test from "node:test"

import { PaymentsService, paymentsEndpoints } from "@"

import { MockRequestExecutor } from "../helpers/mockRequestExecutor.js"

test("Payments maps all official endpoints", async () => {
    const request = new MockRequestExecutor()
    const payments = new PaymentsService(request)

    await payments.chooseInstallmentPlan("PAYMENT", "PLAN")
    await payments.getInstallment("PLAN", 2)
    await payments.getInstallmentPlan("PLAN")
    await payments.getPayment({ id: "PAYMENT", type: "tuition", fields: ["state"] })
    await payments.getRemittance({ id: "REMITTANCE", fields: ["amount"] })
    await payments.getUserAccounts()
    await payments.getUserPayments(["total_amount"])
    await payments.getUserRemittances(["remaining"])

    assert.deepEqual(request.calls.map(call => [call.path, call.params]), [
        [paymentsEndpoints.chooseInstallmentPlan.path, {
            payment_id: "PAYMENT",
            plan_id: "PLAN",
        }],
        [paymentsEndpoints.installment.path, {
            installment_plan_id: "PLAN",
            number: 2,
        }],
        [paymentsEndpoints.installmentPlan.path, { installment_plan_id: "PLAN" }],
        [paymentsEndpoints.payment.path, {
            id: "PAYMENT",
            type: "tuition",
            fields: ["state"],
        }],
        [paymentsEndpoints.remittance.path, {
            id: "REMITTANCE",
            fields: ["amount"],
        }],
        [paymentsEndpoints.userAccounts.path, undefined],
        [paymentsEndpoints.userPayments.path, { fields: ["total_amount"] }],
        [paymentsEndpoints.userRemittances.path, { fields: ["remaining"] }],
    ])
})
