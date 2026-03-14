// lib/validation/compound-interest-schema.ts
import { z } from 'zod'

export const compoundInterestSchema = z.object({
  principal: z.number().min(0).max(100_000_000),
  annualRate: z.number().min(0).max(0.30),
  years: z.number().int().min(1).max(50),
  compoundFrequency: z.enum(['daily', 'monthly', 'quarterly', 'annually']),
  annualContribution: z.number().min(0).max(1_000_000),
})

export type CompoundInterestSchema = z.infer<typeof compoundInterestSchema>
