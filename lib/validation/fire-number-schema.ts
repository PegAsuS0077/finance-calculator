// lib/validation/fire-number-schema.ts
import { z } from 'zod'

export const fireNumberSchema = z.object({
  annualExpenses: z.number().min(1000).max(10_000_000),
  withdrawalRate: z.number().min(0.01).max(0.10),  // 1% – 10%
  isMonthly: z.boolean(),                            // true = input is monthly expenses
})

export type FireNumberInputs = z.infer<typeof fireNumberSchema>
