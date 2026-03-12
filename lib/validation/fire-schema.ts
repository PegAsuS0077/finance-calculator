// lib/validation/fire-schema.ts
import { z } from 'zod'

export const fireSchema = z.object({
  currentAge: z.number().min(18).max(80),
  currentPortfolio: z.number().min(0).max(100_000_000),
  annualIncome: z.number().min(1000).max(10_000_000),
  annualExpenses: z.number().min(1000).max(10_000_000),
  annualContributions: z.number().min(0).max(10_000_000),
  expectedReturn: z.number().min(0.001).max(0.15),   // 0.1% – 15% per spec
  inflationRate: z.number().min(0).max(0.10),         // 0% – 10% per spec
  withdrawalRate: z.number().min(0.01).max(0.10),     // 1% – 10%
})

export type FireInputs = z.infer<typeof fireSchema>
