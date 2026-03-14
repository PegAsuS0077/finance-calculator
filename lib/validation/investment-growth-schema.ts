// lib/validation/investment-growth-schema.ts
import { z } from 'zod'

export const investmentGrowthSchema = z.object({
  initialInvestment: z.number().min(0).max(100_000_000),
  monthlyContribution: z.number().min(0).max(100_000),
  annualReturn: z.number().min(0).max(0.20),
  years: z.number().int().min(1).max(50),
  compoundFrequency: z.enum(['monthly', 'annual']),
})

export type InvestmentGrowthSchema = z.infer<typeof investmentGrowthSchema>
