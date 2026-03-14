// lib/calculators/investment-growth.ts

export type CompoundFrequency = 'monthly' | 'annual'

export interface InvestmentGrowthInputs {
  initialInvestment: number      // dollars
  monthlyContribution: number    // dollars per month
  annualReturn: number           // decimal e.g. 0.07
  years: number                  // integer
  compoundFrequency: CompoundFrequency
}

export interface InvestmentGrowthYearRow {
  year: number
  balance: number
  totalContributed: number
  totalInterest: number
}

export interface InvestmentGrowthResults {
  finalValue: number
  totalContributed: number
  totalInterest: number
  growthMultiplier: number
  yearRows: InvestmentGrowthYearRow[]
}

/**
 * Future value of a lump sum + regular monthly contributions.
 *
 * Monthly compounding:
 *   r = annualRate / 12
 *   n = years * 12
 *   FV = P * (1 + r)^n + C * ((1 + r)^n - 1) / r
 *
 * Annual compounding:
 *   FV = P * (1 + annualRate)^years + C * 12 * ((1 + annualRate)^years - 1) / annualRate
 *
 * Edge case: if rate is 0, FV = P + C * n (no growth)
 */
export function calculateFutureValue(
  initialInvestment: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number,
  compoundFrequency: CompoundFrequency
): number {
  if (annualReturn === 0) {
    return initialInvestment + monthlyContribution * 12 * years
  }

  if (compoundFrequency === 'monthly') {
    const r = annualReturn / 12
    const n = years * 12
    const growth = Math.pow(1 + r, n)
    return initialInvestment * growth + monthlyContribution * ((growth - 1) / r)
  } else {
    // Annual compounding — treat monthly contributions as lump sum per year
    const r = annualReturn
    const n = years
    const annualContribution = monthlyContribution * 12
    const growth = Math.pow(1 + r, n)
    if (r === 0) return initialInvestment + annualContribution * n
    return initialInvestment * growth + annualContribution * ((growth - 1) / r)
  }
}

/**
 * Total amount contributed (principal + all monthly contributions).
 */
export function calculateTotalContributed(
  initialInvestment: number,
  monthlyContribution: number,
  years: number
): number {
  return initialInvestment + monthlyContribution * 12 * years
}

/**
 * Build a year-by-year breakdown table.
 */
export function buildYearRows(
  initialInvestment: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number,
  compoundFrequency: CompoundFrequency
): InvestmentGrowthYearRow[] {
  const rows: InvestmentGrowthYearRow[] = []

  for (let y = 1; y <= years; y++) {
    const balance = calculateFutureValue(
      initialInvestment,
      monthlyContribution,
      annualReturn,
      y,
      compoundFrequency
    )
    const totalContributed = calculateTotalContributed(initialInvestment, monthlyContribution, y)
    const totalInterest = Math.max(0, balance - totalContributed)
    rows.push({ year: y, balance, totalContributed, totalInterest })
  }

  return rows
}

/**
 * Main orchestrator — calculates all investment growth results from validated inputs.
 */
export function calculateInvestmentGrowthResults(
  inputs: InvestmentGrowthInputs
): InvestmentGrowthResults {
  const { initialInvestment, monthlyContribution, annualReturn, years, compoundFrequency } = inputs

  const finalValue = calculateFutureValue(
    initialInvestment,
    monthlyContribution,
    annualReturn,
    years,
    compoundFrequency
  )

  const totalContributed = calculateTotalContributed(initialInvestment, monthlyContribution, years)
  const totalInterest = Math.max(0, finalValue - totalContributed)
  const growthMultiplier = totalContributed > 0 ? finalValue / totalContributed : 1

  const yearRows = buildYearRows(
    initialInvestment,
    monthlyContribution,
    annualReturn,
    years,
    compoundFrequency
  )

  return {
    finalValue,
    totalContributed,
    totalInterest,
    growthMultiplier,
    yearRows,
  }
}
