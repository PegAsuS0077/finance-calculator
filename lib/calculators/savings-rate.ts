// lib/calculators/savings-rate.ts

export interface SavingsRateInputs {
  annualGrossIncome: number
  annualTakeHomeIncome: number
  annualExpenses: number
  annualReturn: number   // decimal e.g. 0.05
  currentPortfolio: number
}

export interface SavingsRateRow {
  savingsRate: number     // e.g. 0.10
  annualSavings: number
  fireNumber: number
  yearsToFI: number
}

export interface SavingsRateResults {
  savingsRate: number
  annualSavings: number
  fireNumber: number
  yearsToFI: number
  tableRows: SavingsRateRow[]
}

/**
 * Savings Rate = (Take-Home Income - Annual Expenses) / Take-Home Income
 * Returns a decimal (e.g. 0.25 for 25%)
 */
export function calculateSavingsRate(takeHomeIncome: number, annualExpenses: number): number {
  if (takeHomeIncome <= 0) return 0
  const rate = (takeHomeIncome - annualExpenses) / takeHomeIncome
  return rate
}

/**
 * FIRE Number = Annual Expenses / Withdrawal Rate
 * Default withdrawal rate is 4% (0.04)
 */
export function calculateFireNumber(annualExpenses: number, withdrawalRate = 0.04): number {
  if (withdrawalRate <= 0) return Infinity
  return annualExpenses / withdrawalRate
}

/**
 * Years to FI using the Mr. Money Mustache model:
 * Years to FI = log((FIRE Number * r + S) / (P * r + S)) / log(1 + r)
 * where:
 *   r = annual return rate
 *   S = annual savings
 *   P = current portfolio
 *
 * Edge cases:
 * - If annualSavings <= 0: cannot reach FI → returns Infinity
 * - If annualReturn <= 0: linear formula → (fireNumber - currentPortfolio) / annualSavings
 * - If currentPortfolio >= fireNumber: already at FI → returns 0
 * - Result is capped at 100 if Infinity or > 100
 */
export function calculateYearsToFI(
  fireNumber: number,
  annualSavings: number,
  currentPortfolio: number,
  annualReturn: number
): number {
  // Already at FI
  if (currentPortfolio >= fireNumber) return 0

  // Cannot reach FI (no savings)
  if (annualSavings <= 0) return Infinity

  // Linear fallback when return rate is 0
  if (annualReturn <= 0) {
    const remaining = fireNumber - currentPortfolio
    return remaining / annualSavings
  }

  const r = annualReturn
  const S = annualSavings
  const P = currentPortfolio
  const F = fireNumber

  const numerator = F * r + S
  const denominator = P * r + S

  // Denominator must be positive for log to work
  if (denominator <= 0) return Infinity

  const years = Math.log(numerator / denominator) / Math.log(1 + r)

  if (!isFinite(years) || years < 0) return Infinity
  return years
}

/**
 * Build the savings rate table for 10%–90% savings rates in 10% increments.
 * Holds take-home income, portfolio, and return constant — varies the savings amount.
 */
export function buildSavingsRateTable(
  takeHomeIncome: number,
  currentPortfolio: number,
  annualReturn: number
): SavingsRateRow[] {
  const rows: SavingsRateRow[] = []

  for (let pct = 10; pct <= 90; pct += 10) {
    const savingsRate = pct / 100
    const annualSavings = takeHomeIncome * savingsRate
    const annualExpenses = takeHomeIncome - annualSavings
    const fireNumber = calculateFireNumber(annualExpenses)
    const rawYears = calculateYearsToFI(fireNumber, annualSavings, currentPortfolio, annualReturn)
    const yearsToFI = !isFinite(rawYears) || rawYears > 100 ? 100 : rawYears

    rows.push({
      savingsRate,
      annualSavings,
      fireNumber,
      yearsToFI,
    })
  }

  return rows
}

/**
 * Main orchestrator: calculate all savings rate results from validated inputs.
 */
export function calculateSavingsRateResults(inputs: SavingsRateInputs): SavingsRateResults {
  const { annualTakeHomeIncome, annualExpenses, annualReturn, currentPortfolio } = inputs

  const savingsRate = calculateSavingsRate(annualTakeHomeIncome, annualExpenses)
  const annualSavings = annualTakeHomeIncome - annualExpenses
  const fireNumber = calculateFireNumber(annualExpenses)
  const rawYears = calculateYearsToFI(fireNumber, annualSavings, currentPortfolio, annualReturn)
  const yearsToFI = !isFinite(rawYears) || rawYears > 100 ? 100 : rawYears

  const tableRows = buildSavingsRateTable(annualTakeHomeIncome, currentPortfolio, annualReturn)

  return {
    savingsRate,
    annualSavings,
    fireNumber,
    yearsToFI,
    tableRows,
  }
}
