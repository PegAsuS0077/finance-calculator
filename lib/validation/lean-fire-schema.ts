// lib/validation/lean-fire-schema.ts
import { z } from 'zod'

export const leanFireSchema = z.object({
  currentAge: z.number().min(18).max(80),
  annualLeanExpenses: z.number().min(5000).max(100_000),
  currentPortfolio: z.number().min(0).max(10_000_000),
  annualContributions: z.number().min(0).max(500_000),
  expectedReturn: z.number().min(0.01).max(0.15),   // 1% – 15%
  inflationRate: z.number().min(0).max(0.10),        // 0% – 10%
  withdrawalRate: z.number().min(0.01).max(0.10),    // 1% – 10%
})

export type LeanFireInputs = z.infer<typeof leanFireSchema>
