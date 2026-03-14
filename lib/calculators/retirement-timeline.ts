// lib/calculators/retirement-timeline.ts

export interface RetirementTimelineInputs {
  currentAge: number
  annualIncome: number
  annualExpenses: number
  currentPortfolio: number
  annualReturn: number    // decimal e.g. 0.07
  inflationRate: number   // decimal e.g. 0.03
  withdrawalRate: number  // decimal e.g. 0.04
}

export interface ScenarioRow {
  label: string
  annualExpenses: number
  annualContributions: number
  fireNumber: number
  yearsToFI: number
  retirementAge: number
}

export interface PortfolioPoint {
  age: number
  value: number
}

export interface RetirementTimelineResults {
  fireNumber: number
  annualContributions: number
  yearsToFI: number
  retirementAge: number
  savingsRate: number
  scenarios: ScenarioRow[]
  chartData: PortfolioPoint[]
}

/**
 * Real return rate (inflation-adjusted):
 * realReturn = ((1 + nominalReturn) / (1 + inflationRate)) - 1
 */
export function calculateRealReturn(annualReturn: number, inflationRate: number): number {
  return (1 + annualReturn) / (1 + inflationRate) - 1
}

/**
 * FIRE Number = Annual Expenses / Withdrawal Rate
 */
export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number {
  if (withdrawalRate <= 0) return Infinity
  return annualExpenses / withdrawalRate
}

/**
 * Years to FIRE using compound growth formula:
 * Years = log((F * r + C) / (P * r + C)) / log(1 + r)
 * where F = FIRE number, r = real return, C = annual contributions, P = current portfolio
 *
 * Edge cases:
 * - Already at FI (portfolio >= fireNumber): returns 0
 * - No contributions and portfolio below target: returns Infinity
 * - Zero real return: linear formula (F - P) / C
 */
export function calculateYearsToFIRE(
  fireNumber: number,
  annualContributions: number,
  currentPortfolio: number,
  realReturn: number
): number {
  if (currentPortfolio >= fireNumber) return 0
  if (annualContributions <= 0 && currentPortfolio < fireNumber) return Infinity

  if (realReturn <= 0) {
    if (annualContributions <= 0) return Infinity
    return (fireNumber - currentPortfolio) / annualContributions
  }

  const r = realReturn
  const C = annualContributions
  const P = currentPortfolio
  const F = fireNumber

  const numerator = F * r + C
  const denominator = P * r + C

  if (denominator <= 0) return Infinity

  const years = Math.log(numerator / denominator) / Math.log(1 + r)

  if (!isFinite(years) || years < 0) return Infinity
  return years
}

/**
 * Build scenario comparison rows for expense/contribution/return adjustments.
 */
export function buildScenarioRows(
  inputs: RetirementTimelineInputs,
  baseContributions: number,
  baseFireNumber: number,
  baseYears: number,
  baseRetirementAge: number
): ScenarioRow[] {
  const { currentAge, annualExpenses, currentPortfolio, annualReturn, inflationRate, withdrawalRate } = inputs
  const realReturn = calculateRealReturn(annualReturn, inflationRate)

  function makeRow(label: string, expenses: number, contributions: number): ScenarioRow {
    const fireNumber = calculateFireNumber(expenses, withdrawalRate)
    const rawYears = calculateYearsToFIRE(fireNumber, contributions, currentPortfolio, realReturn)
    const yearsToFI = !isFinite(rawYears) || rawYears > 100 ? 100 : rawYears
    const retirementAge = Math.round(currentAge + yearsToFI)
    return { label, annualExpenses: expenses, annualContributions: contributions, fireNumber, yearsToFI, retirementAge }
  }

  return [
    // Base case
    makeRow('Current plan', annualExpenses, baseContributions),
    // Cut expenses
    makeRow('Cut expenses 10%', annualExpenses * 0.9, baseContributions + annualExpenses * 0.1),
    makeRow('Cut expenses 20%', annualExpenses * 0.8, baseContributions + annualExpenses * 0.2),
    makeRow('Cut expenses 30%', annualExpenses * 0.7, baseContributions + annualExpenses * 0.3),
    // Increase contributions
    makeRow('Contribute +10%', annualExpenses, baseContributions * 1.1),
    makeRow('Contribute +20%', annualExpenses, baseContributions * 1.2),
    makeRow('Contribute +30%', annualExpenses, baseContributions * 1.3),
    // Higher return
    makeRow('+1% return', annualExpenses, baseContributions),
    makeRow('+2% return', annualExpenses, baseContributions),
  ].map((row, i) => {
    // For return scenarios, recalculate with higher return
    if (i === 7) {
      const altReturn = calculateRealReturn(annualReturn + 0.01, inflationRate)
      const altYears = calculateYearsToFIRE(row.fireNumber, baseContributions, currentPortfolio, altReturn)
      const years = !isFinite(altYears) || altYears > 100 ? 100 : altYears
      return { ...row, yearsToFI: years, retirementAge: Math.round(currentAge + years) }
    }
    if (i === 8) {
      const altReturn = calculateRealReturn(annualReturn + 0.02, inflationRate)
      const altYears = calculateYearsToFIRE(row.fireNumber, baseContributions, currentPortfolio, altReturn)
      const years = !isFinite(altYears) || altYears > 100 ? 100 : altYears
      return { ...row, yearsToFI: years, retirementAge: Math.round(currentAge + years) }
    }
    return row
  })
}

/**
 * Build year-by-year portfolio growth chart data from current age to retirement + 5 years.
 */
export function buildChartData(
  currentAge: number,
  currentPortfolio: number,
  annualContributions: number,
  realReturn: number,
  fireNumber: number,
  yearsToFI: number
): PortfolioPoint[] {
  const endAge = Math.min(currentAge + Math.ceil(yearsToFI) + 5, 100)
  const points: PortfolioPoint[] = []
  let value = currentPortfolio

  for (let age = currentAge; age <= endAge; age++) {
    points.push({ age, value: Math.round(value) })
    value = value * (1 + realReturn) + annualContributions
  }

  return points
}

/**
 * Main orchestrator.
 */
export function calculateRetirementTimelineResults(
  inputs: RetirementTimelineInputs
): RetirementTimelineResults {
  const { currentAge, annualIncome, annualExpenses, currentPortfolio, annualReturn, inflationRate, withdrawalRate } = inputs

  const realReturn = calculateRealReturn(annualReturn, inflationRate)
  const annualContributions = Math.max(0, annualIncome - annualExpenses)
  const savingsRate = annualIncome > 0 ? annualContributions / annualIncome : 0

  const fireNumber = calculateFireNumber(annualExpenses, withdrawalRate)
  const rawYears = calculateYearsToFIRE(fireNumber, annualContributions, currentPortfolio, realReturn)
  const yearsToFI = !isFinite(rawYears) || rawYears > 100 ? 100 : rawYears
  const retirementAge = Math.round(currentAge + yearsToFI)

  const scenarios = buildScenarioRows(inputs, annualContributions, fireNumber, yearsToFI, retirementAge)
  const chartData = buildChartData(currentAge, currentPortfolio, annualContributions, realReturn, fireNumber, yearsToFI)

  return {
    fireNumber,
    annualContributions,
    yearsToFI,
    retirementAge,
    savingsRate,
    scenarios,
    chartData,
  }
}
