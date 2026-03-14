// lib/calculators/four-percent-rule.ts

export interface FourPercentRuleInputs {
  portfolioValue: number    // dollars
  withdrawalRate: number    // decimal e.g. 0.04
  annualReturn: number      // decimal e.g. 0.05
  inflationRate: number     // decimal e.g. 0.03
}

export interface WithdrawalRateRow {
  rate: number              // decimal e.g. 0.03
  annualWithdrawal: number  // dollars
  monthlyWithdrawal: number // dollars
  portfolioDuration: number | null // years (null = indefinite)
  isSafe: boolean
}

export interface PortfolioDepleteYear {
  year: number
  balance3pct: number | null  // null when depleted
  balance4pct: number | null
  balance5pct: number | null
}

export interface FourPercentRuleResults {
  annualWithdrawal: number
  monthlyWithdrawal: number
  realReturnRate: number
  portfolioDuration: number | null   // null = lasts indefinitely
  isSafe: boolean                    // lasts 30+ years
  comparisonTable: WithdrawalRateRow[]
  depletionChart: PortfolioDepleteYear[]
}

/**
 * Inflation-adjusted real return rate.
 * Real Return = ((1 + nominal) / (1 + inflation)) - 1
 */
export function calculateRealReturn(annualReturn: number, inflationRate: number): number {
  return (1 + annualReturn) / (1 + inflationRate) - 1
}

/**
 * How many years until the portfolio is depleted at the given withdrawal amount,
 * using a real return rate (inflation-adjusted).
 *
 * Present value annuity formula:
 *   n = -log(1 - (P * r) / W) / log(1 + r)
 * where:
 *   P = portfolio value
 *   r = real return rate per period
 *   W = annual withdrawal amount
 *
 * Returns null if the portfolio lasts indefinitely (real return >= withdrawal rate).
 * Returns a large sentinel (999) if the formula breaks down (e.g. r = 0 edge case).
 */
export function calculatePortfolioDuration(
  portfolioValue: number,
  annualWithdrawal: number,
  realReturnRate: number
): number | null {
  if (annualWithdrawal <= 0) return null

  // If real return covers or exceeds withdrawal, portfolio lasts indefinitely
  if (realReturnRate >= 0 && portfolioValue * realReturnRate >= annualWithdrawal) return null

  if (realReturnRate === 0) {
    // No real growth: duration = portfolio / annual withdrawal
    return portfolioValue / annualWithdrawal
  }

  const ratio = (portfolioValue * realReturnRate) / annualWithdrawal
  if (ratio >= 1) return null // indefinite
  if (ratio <= 0) {
    // Negative real return: portfolio shrinks each year even without withdrawals
    // Approximate duration via simulation
    return simulateDuration(portfolioValue, annualWithdrawal, realReturnRate)
  }

  return -Math.log(1 - ratio) / Math.log(1 + realReturnRate)
}

/**
 * Simulate year-by-year depletion when the formula doesn't apply cleanly
 * (negative real return). Returns fractional years when portfolio hits 0.
 */
function simulateDuration(
  portfolioValue: number,
  annualWithdrawal: number,
  realReturnRate: number
): number {
  let balance = portfolioValue
  let year = 0
  const MAX_YEARS = 200

  while (balance > 0 && year < MAX_YEARS) {
    balance = balance * (1 + realReturnRate) - annualWithdrawal
    year++
    if (balance <= 0) {
      // Partial year: how far through the year did it deplete?
      const balanceBeforeWithdrawal = (balance + annualWithdrawal) / (1 + realReturnRate)
      const fractionOfYear = balanceBeforeWithdrawal / annualWithdrawal
      return year - 1 + Math.max(0, Math.min(1, fractionOfYear))
    }
  }

  return year
}

/**
 * Build the year-by-year portfolio balance for charting.
 * Tracks 3%, 4%, and 5% withdrawal rates simultaneously.
 * Balance is clamped at 0 once depleted.
 */
export function buildDepletionChart(
  portfolioValue: number,
  realReturnRate: number,
  maxYears: number = 50
): PortfolioDepleteYear[] {
  const rates = [0.03, 0.04, 0.05]
  const balances = rates.map((r) => portfolioValue * r) // annual withdrawal amounts
  let portfolios = [portfolioValue, portfolioValue, portfolioValue]

  const rows: PortfolioDepleteYear[] = []

  rows.push({
    year: 0,
    balance3pct: portfolioValue,
    balance4pct: portfolioValue,
    balance5pct: portfolioValue,
  })

  for (let y = 1; y <= maxYears; y++) {
    portfolios = portfolios.map((p, i) => {
      if (p <= 0) return 0
      return Math.max(0, p * (1 + realReturnRate) - balances[i])
    })

    rows.push({
      year: y,
      balance3pct: portfolios[0] > 0 ? portfolios[0] : null,
      balance4pct: portfolios[1] > 0 ? portfolios[1] : null,
      balance5pct: portfolios[2] > 0 ? portfolios[2] : null,
    })

    // Stop if all portfolios are depleted
    if (portfolios.every((p) => p <= 0)) break
  }

  return rows
}

/**
 * Build comparison table for withdrawal rates 3%, 3.5%, 4%, 4.5%, 5%.
 */
export function buildComparisonTable(
  portfolioValue: number,
  realReturnRate: number
): WithdrawalRateRow[] {
  const rates = [0.03, 0.035, 0.04, 0.045, 0.05]

  return rates.map((rate) => {
    const annualWithdrawal = portfolioValue * rate
    const monthlyWithdrawal = annualWithdrawal / 12
    const portfolioDuration = calculatePortfolioDuration(portfolioValue, annualWithdrawal, realReturnRate)
    const isSafe = portfolioDuration === null || portfolioDuration >= 30

    return { rate, annualWithdrawal, monthlyWithdrawal, portfolioDuration, isSafe }
  })
}

/**
 * Main orchestrator — calculates all 4% rule results from validated inputs.
 */
export function calculateFourPercentRuleResults(
  inputs: FourPercentRuleInputs
): FourPercentRuleResults {
  const { portfolioValue, withdrawalRate, annualReturn, inflationRate } = inputs

  const annualWithdrawal = portfolioValue * withdrawalRate
  const monthlyWithdrawal = annualWithdrawal / 12
  const realReturnRate = calculateRealReturn(annualReturn, inflationRate)

  const portfolioDuration = calculatePortfolioDuration(portfolioValue, annualWithdrawal, realReturnRate)
  const isSafe = portfolioDuration === null || portfolioDuration >= 30

  const comparisonTable = buildComparisonTable(portfolioValue, realReturnRate)
  const depletionChart = buildDepletionChart(portfolioValue, realReturnRate, 60)

  return {
    annualWithdrawal,
    monthlyWithdrawal,
    realReturnRate,
    portfolioDuration,
    isSafe,
    comparisonTable,
    depletionChart,
  }
}
