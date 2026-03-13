// lib/validation/coast-fire-schema.ts
import { z } from 'zod'

export const coastFireSchema = z.object({
  currentAge: z.number().int().min(18).max(80),
  retirementAge: z.number().int().min(40).max(80),
  annualExpenses: z.number().min(1000).max(10_000_000),
  withdrawalRate: z.number().min(0.01).max(0.10),  // 1% – 10%
  annualReturn: z.number().min(0.01).max(0.15),     // 1% – 15%
  currentPortfolio: z.number().min(0).max(100_000_000),
}).refine((d) => d.retirementAge > d.currentAge, {
  message: 'Retirement age must be greater than current age',
  path: ['retirementAge'],
})

export type CoastFireInputs = z.infer<typeof coastFireSchema>
