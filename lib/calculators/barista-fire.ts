// lib/calculators/barista-fire.ts
import type { BaristaFireInputs } from '../validation/barista-fire-schema'

export interface ProjectionPoint {
  age: number
  portfolioValue: number
}

export interface BaristaFireResults {
  baristaFireNumber: number
  fullFireNumber: number
  annualPortfolioWithdrawal: number
  yearsToFire: number
  fireAge: number
  remainingGap: number
  savingsFromPartTime: number
  projectionData: ProjectionPoint[]
}

/**
 * Annual Portfolio Withdrawal Needed = Total Expenses - Part-Time Income
 * If part-time income >= total expenses, returns 0.
 */
export function calculateAnnualPortfolioWithdrawal(
  totalExpenses: number,
  partTimeIncome: number
): number {
  return Math.max(0, totalExpenses - partTimeIncome)
}

/**
 * Barista FIRE Number = Annual Portfolio Withdrawal Needed / Withdrawal Rate
 */
export function calculateBaristaFireNumber(
  annualPortfolioWithdrawal: number,
  withdrawalRate: number
): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return annualPortfolioWithdrawal / withdrawalRate
}

/**
 * Full FIRE Number = Total Expenses / Withdrawal Rate
 */
export function calculateFullFireNumber(
  totalExpenses: number,
  withdrawalRate: number
): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return totalExpenses / withdrawalRate
}

/**
 * Real Return = ((1 + nominalReturn) / (1 + inflationRate)) - 1
 */
export function calculateRealReturn(nominalReturn: number, inflationRate: number): number {
  return (1 + nominalReturn) / (1 + inflationRate) - 1
}

/**
 * Years to Barista FIRE using future value of annuity formula, solved for time.
 */
export function calculateYearsToBaristaFire(
  currentPortfolio: number,
  annualContributions: number,
  realReturn: number,
  baristaFireNumber: number
): number {
  if (currentPortfolio >= baristaFireNumber) return 0

  if (realReturn === 0) {
    if (annualContributions <= 0) return Infinity
    return (baristaFireNumber - currentPortfolio) / annualContributions
  }

  const r = realReturn
  const numerator = baristaFireNumber * r + annualContributions
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
 * Main function: calculate all Barista FIRE results from validated inputs.
 */
export function calculateBaristaFire(inputs: BaristaFireInputs): BaristaFireResults {
  const {
    currentAge,
    totalExpenses,
    partTimeIncome,
    expectedReturn,
    withdrawalRate,
    currentPortfolio,
    annualContributions,
    inflationRate,
  } = inputs

  const annualPortfolioWithdrawal = calculateAnnualPortfolioWithdrawal(totalExpenses, partTimeIncome)
  const baristaFireNumber = calculateBaristaFireNumber(annualPortfolioWithdrawal, withdrawalRate)
  const fullFireNumber = calculateFullFireNumber(totalExpenses, withdrawalRate)
  const savingsFromPartTime = fullFireNumber - baristaFireNumber

  const realReturn = calculateRealReturn(expectedReturn, inflationRate)
  const yearsToFire = calculateYearsToBaristaFire(
    currentPortfolio,
    annualContributions,
    realReturn,
    baristaFireNumber
  )

  const fireAge = yearsToFire === Infinity
    ? Infinity
    : Math.round(currentAge + yearsToFire)

  const remainingGap = Math.max(0, baristaFireNumber - currentPortfolio)

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
    baristaFireNumber,
    fullFireNumber,
    annualPortfolioWithdrawal,
    yearsToFire,
    fireAge,
    remainingGap,
    savingsFromPartTime,
    projectionData,
  }
}
