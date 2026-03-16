// lib/validation/barista-fire-schema.ts
import { z } from 'zod'

export const baristaFireSchema = z.object({
  currentAge: z.number().min(18).max(80),
  totalExpenses: z.number().min(1_000).max(500_000),
  partTimeIncome: z.number().min(0).max(100_000),
  expectedReturn: z.number().min(0.01).max(0.15),   // 1% – 15%
  withdrawalRate: z.number().min(0.01).max(0.10),    // 1% – 10%
  currentPortfolio: z.number().min(0).max(10_000_000),
  annualContributions: z.number().min(0).max(500_000),
  inflationRate: z.number().min(0).max(0.10),        // 0% – 10%
})

export type BaristaFireInputs = z.infer<typeof baristaFireSchema>
