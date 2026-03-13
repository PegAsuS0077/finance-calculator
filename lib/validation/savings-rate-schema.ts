// lib/validation/savings-rate-schema.ts
import { z } from 'zod'

export const savingsRateSchema = z.object({
  annualGrossIncome: z.number().min(1000).max(10_000_000),
  annualTakeHomeIncome: z.number().min(1000).max(10_000_000),
  annualExpenses: z.number().min(1000).max(10_000_000),
  annualReturn: z.number().min(0.01).max(0.15),
  currentPortfolio: z.number().min(0).max(100_000_000),
})

export type SavingsRateSchema = z.infer<typeof savingsRateSchema>
