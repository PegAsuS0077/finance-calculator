// lib/calculators/lean-fire.ts
import type { LeanFireInputs } from '../validation/lean-fire-schema'

export interface ProjectionPoint {
  age: number
  portfolioValue: number
}

export interface LeanFireResults {
  leanFireNumber: number
  regularFireNumber: number
  fatFireNumber: number
  yearsToFire: number
  fireAge: number
  remainingGap: number
  projectionData: ProjectionPoint[]
}

/**
 * Lean FIRE Number = Annual Lean Expenses / Withdrawal Rate
 */
export function calculateLeanFireNumber(annualLeanExpenses: number, withdrawalRate: number): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return annualLeanExpenses / withdrawalRate
}

/**
 * Real Return = ((1 + nominalReturn) / (1 + inflationRate)) - 1
 */
export function calculateRealReturn(nominalReturn: number, inflationRate: number): number {
  return (1 + nominalReturn) / (1 + inflationRate) - 1
}

/**
 * Years to Lean FIRE using future value of annuity formula, solved for time.
 */
export function calculateYearsToLeanFire(
  currentPortfolio: number,
  annualContributions: number,
  realReturn: number,
  leanFireNumber: number
): number {
  if (currentPortfolio >= leanFireNumber) return 0

  if (realReturn === 0) {
    if (annualContributions <= 0) return Infinity
    return (leanFireNumber - currentPortfolio) / annualContributions
  }

  const r = realReturn
  const numerator = leanFireNumber * r + annualContributions
  const denominator = currentPortfolio * r + annualContributions

  if (denominator <= 0 || numerator / denominator <= 0) return Infinity

  const years = Math.log(numerator / denominator) / Math.log(1 + r)
  return Math.max(0, years)
}

/**
 * Project portfolio value year by year from currentAge to maxAge.
 */
export function projectPortfolioGrowth(
  currentPortfolio: number,
  annualContributions: number,
  nominalReturn: number,
  currentAge: number,
  maxAge: number
): ProjectionPoint[] {
  const points: ProjectionPoint[] = []
  let portfolio = currentPortfolio

  for (let age = currentAge; age <= maxAge; age++) {
    points.push({ age, portfolioValue: Math.round(portfolio) })
    portfolio = portfolio * (1 + nominalReturn) + annualContributions
  }

  return points
}

/**
 * Main function: calculate all Lean FIRE results from validated inputs.
 */
export function calculateLeanFire(inputs: LeanFireInputs): LeanFireResults {
  const {
    currentAge,
    annualLeanExpenses,
    currentPortfolio,
    annualContributions,
    expectedReturn,
    inflationRate,
    withdrawalRate,
  } = inputs

  const leanFireNumber = calculateLeanFireNumber(annualLeanExpenses, withdrawalRate)
  const regularFireNumber = calculateLeanFireNumber(annualLeanExpenses * 1.5, withdrawalRate)
  const fatFireNumber = calculateLeanFireNumber(annualLeanExpenses * 2.5, withdrawalRate)

  const realReturn = calculateRealReturn(expectedReturn, inflationRate)
  const yearsToFire = calculateYearsToLeanFire(currentPortfolio, annualContributions, realReturn, leanFireNumber)

  const fireAge = yearsToFire === Infinity
    ? Infinity
    : Math.round(currentAge + yearsToFire)

  const remainingGap = Math.max(0, leanFireNumber - currentPortfolio)

  const projectionYears = yearsToFire === Infinity ? 50 : Math.ceil(yearsToFire) + 10
  const maxAge = Math.min(currentAge + projectionYears, 100)

  const projectionData = projectPortfolioGrowth(
    currentPortfolio,
    annualContributions,
    expectedReturn,
    currentAge,
    maxAge
  )

  return {
    leanFireNumber,
    regularFireNumber,
    fatFireNumber,
    yearsToFire,
    fireAge,
    remainingGap,
    projectionData,
  }
}
