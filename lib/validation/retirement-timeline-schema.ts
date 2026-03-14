// lib/validation/retirement-timeline-schema.ts
import { z } from 'zod'

export const retirementTimelineSchema = z.object({
  currentAge: z.number().int().min(18).max(80),
  annualIncome: z.number().min(1000).max(10_000_000),
  annualExpenses: z.number().min(1000).max(10_000_000),
  currentPortfolio: z.number().min(0).max(100_000_000),
  annualReturn: z.number().min(0.01).max(0.15),
  inflationRate: z.number().min(0).max(0.10),
  withdrawalRate: z.number().min(0.01).max(0.10),
})

export type RetirementTimelineSchema = z.infer<typeof retirementTimelineSchema>
