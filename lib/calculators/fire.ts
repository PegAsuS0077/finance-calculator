// lib/calculators/fire.ts
import type { FireInputs } from '../validation/fire-schema'

export interface ProjectionPoint {
  age: number
  portfolioValue: number
}

export interface FireResults {
  fireNumber: number
  yearsToFire: number
  fireAge: number
  remainingGap: number
  savingsRate: number
  projectionData: ProjectionPoint[]
}

/**
 * FIRE Number = Annual Expenses / Withdrawal Rate
 */
export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return annualExpenses / withdrawalRate
}

/**
 * Real Return = ((1 + nominalReturn) / (1 + inflationRate)) - 1
 */
export function calculateRealReturn(nominalReturn: number, inflationRate: number): number {
  return (1 + nominalReturn) / (1 + inflationRate) - 1
}

/**
 * Years to FIRE using future value of annuity formula, solved for time.
 */
export function calculateYearsToFire(
  currentPortfolio: number,
  annualContributions: number,
  realReturn: number,
  fireNumber: number
): number {
  if (currentPortfolio >= fireNumber) return 0

  if (realReturn === 0) {
    if (annualContributions <= 0) return Infinity
    return (fireNumber - currentPortfolio) / annualContributions
  }

  const r = realReturn
  const numerator = fireNumber * r + annualContributions
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
 * Main function: calculate all FIRE results from validated inputs.
 */
export function calculateFire(inputs: FireInputs): FireResults {
  const {
    currentAge,
    currentPortfolio,
    annualIncome,
    annualExpenses,
    annualContributions,
    expectedReturn,
    inflationRate,
    withdrawalRate,
  } = inputs

  const fireNumber = calculateFireNumber(annualExpenses, withdrawalRate)
  const realReturn = calculateRealReturn(expectedReturn, inflationRate)
  const yearsToFire = calculateYearsToFire(currentPortfolio, annualContributions, realReturn, fireNumber)

  const fireAge = yearsToFire === Infinity
    ? Infinity
    : Math.round(currentAge + yearsToFire)

  const remainingGap = Math.max(0, fireNumber - currentPortfolio)
  const savingsRate = annualIncome > 0 ? annualContributions / annualIncome : 0

  const projectionYears = yearsToFire === Infinity ? 50 : Math.ceil(yearsToFire) + 10
  const maxAge = Math.min(currentAge + projectionYears, 100)

  const projectionData = projectPortfolioGrowth(
    currentPortfolio,
    annualContributions,
    expectedReturn,
    currentAge,
    maxAge
  )

  return { fireNumber, yearsToFire, fireAge, remainingGap, savingsRate, projectionData }
}
