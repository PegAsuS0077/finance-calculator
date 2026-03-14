// lib/validation/four-percent-rule-schema.ts
import { z } from 'zod'

export const fourPercentRuleSchema = z.object({
  portfolioValue: z.number().min(1_000).max(100_000_000),
  withdrawalRate: z.number().min(0.01).max(0.10),
  annualReturn: z.number().min(0).max(0.15),
  inflationRate: z.number().min(0).max(0.10),
})

export type FourPercentRuleSchema = z.infer<typeof fourPercentRuleSchema>
