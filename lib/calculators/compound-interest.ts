// lib/calculators/compound-interest.ts

export type CompoundFrequency = 'daily' | 'monthly' | 'quarterly' | 'annually'

const PERIODS_PER_YEAR: Record<CompoundFrequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1,
}

export interface CompoundInterestInputs {
  principal: number           // dollars
  annualRate: number          // decimal e.g. 0.08
  years: number               // integer
  compoundFrequency: CompoundFrequency
  annualContribution: number  // dollars per year (0 = no contributions)
}

export interface CompoundInterestYearRow {
  year: number
  balance: number
  totalContributed: number
  totalInterest: number
}

export interface CompoundInterestResults {
  finalAmount: number
  totalContributed: number
  totalInterest: number
  doublingTime: number | null  // Rule of 72 (null if rate = 0)
  yearRows: CompoundInterestYearRow[]
}

/**
 * Compound interest with optional annual contributions.
 *
 * A = P × (1 + r/n)^(n×t)  +  C × ((1 + r/n)^(n×t) − 1) / (r/n)
 *
 * where:
 *   P = principal
 *   r = annual rate (decimal)
 *   n = compounding periods per year
 *   t = years
 *   C = contribution per period = annualContribution / n
 *
 * Edge case: if r = 0, A = P + C × t (linear growth)
 */
export function calculateCompoundAmount(
  principal: number,
  annualRate: number,
  years: number,
  compoundFrequency: CompoundFrequency,
  annualContribution: number
): number {
  const n = PERIODS_PER_YEAR[compoundFrequency]

  if (annualRate === 0) {
    return principal + annualContribution * years
  }

  const r = annualRate / n
  const exponent = n * years
  const growth = Math.pow(1 + r, exponent)
  const contributionPerPeriod = annualContribution / n

  const principalFV = principal * growth
  const contributionFV = contributionPerPeriod * ((growth - 1) / r)

  return principalFV + contributionFV
}

/**
 * Rule of 72: years to double = 72 / (annual rate %).
 * Returns null when rate is 0.
 */
export function calculateDoublingTime(annualRate: number): number | null {
  if (annualRate === 0) return null
  return 72 / (annualRate * 100)
}

/**
 * Total amount contributed over the period (principal + all annual contributions).
 */
export function calculateTotalContributed(
  principal: number,
  annualContribution: number,
  years: number
): number {
  return principal + annualContribution * years
}

/**
 * Build a year-by-year breakdown table.
 */
export function buildYearRows(
  principal: number,
  annualRate: number,
  years: number,
  compoundFrequency: CompoundFrequency,
  annualContribution: number
): CompoundInterestYearRow[] {
  const rows: CompoundInterestYearRow[] = []

  for (let y = 1; y <= years; y++) {
    const balance = calculateCompoundAmount(principal, annualRate, y, compoundFrequency, annualContribution)
    const totalContributed = calculateTotalContributed(principal, annualContribution, y)
    const totalInterest = Math.max(0, balance - totalContributed)
    rows.push({ year: y, balance, totalContributed, totalInterest })
  }

  return rows
}

/**
 * Main orchestrator — calculates all compound interest results from validated inputs.
 */
export function calculateCompoundInterestResults(
  inputs: CompoundInterestInputs
): CompoundInterestResults {
  const { principal, annualRate, years, compoundFrequency, annualContribution } = inputs

  const finalAmount = calculateCompoundAmount(principal, annualRate, years, compoundFrequency, annualContribution)
  const totalContributed = calculateTotalContributed(principal, annualContribution, years)
  const totalInterest = Math.max(0, finalAmount - totalContributed)
  const doublingTime = calculateDoublingTime(annualRate)

  const yearRows = buildYearRows(principal, annualRate, years, compoundFrequency, annualContribution)

  return {
    finalAmount,
    totalContributed,
    totalInterest,
    doublingTime,
    yearRows,
  }
}
