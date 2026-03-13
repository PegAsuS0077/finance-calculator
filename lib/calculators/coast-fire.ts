// lib/calculators/coast-fire.ts
import type { CoastFireInputs } from '../validation/coast-fire-schema'

export interface CoastFireChartPoint {
  age: number
  portfolio: number
}

export interface CoastFireResults {
  fireNumber: number
  coastFireNumber: number
  yearsOfGrowth: number
  gap: number
  alreadyCoasted: boolean
  progressPercent: number
  chartData: CoastFireChartPoint[]
}

/**
 * FIRE Number = Annual Expenses / Withdrawal Rate
 */
export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return annualExpenses / withdrawalRate
}

/**
 * Coast FIRE Number = FIRE Number / (1 + r)^n
 * The lump sum needed today that, with no further contributions,
 * will grow to the FIRE Number by retirement age.
 */
export function calculateCoastFireNumber(
  fireNumber: number,
  annualReturn: number,
  yearsUntilRetirement: number
): number {
  if (yearsUntilRetirement <= 0) return fireNumber
  return fireNumber / Math.pow(1 + annualReturn, yearsUntilRetirement)
}

/**
 * Build chart data showing portfolio growth from current age to retirement age.
 * No contributions — pure compound growth from the Coast FIRE Number.
 */
export function buildCoastChartData(
  coastFireNumber: number,
  currentAge: number,
  retirementAge: number,
  annualReturn: number,
  fireNumber: number
): CoastFireChartPoint[] {
  const points: CoastFireChartPoint[] = []
  const years = retirementAge - currentAge

  for (let y = 0; y <= years; y++) {
    const portfolio = coastFireNumber * Math.pow(1 + annualReturn, y)
    points.push({ age: currentAge + y, portfolio: Math.round(portfolio) })
  }

  // Ensure last point exactly equals fireNumber (rounding safety)
  if (points.length > 0) {
    points[points.length - 1].portfolio = Math.round(fireNumber)
  }

  return points
}

/**
 * Main function: calculate all Coast FIRE results from validated inputs.
 */
export function calculateCoastFireResults(inputs: CoastFireInputs): CoastFireResults {
  const { currentAge, retirementAge, annualExpenses, withdrawalRate, annualReturn, currentPortfolio } = inputs

  const yearsOfGrowth = retirementAge - currentAge
  const fireNumber = calculateFireNumber(annualExpenses, withdrawalRate)
  const coastFireNumber = calculateCoastFireNumber(fireNumber, annualReturn, yearsOfGrowth)

  const gap = Math.max(0, coastFireNumber - currentPortfolio)
  const alreadyCoasted = currentPortfolio >= coastFireNumber
  const progressPercent = Math.min(100, Math.round((currentPortfolio / coastFireNumber) * 100))

  // Chart: start from current portfolio or coast fire number (whichever is larger, coasting from that point)
  const startingValue = alreadyCoasted ? currentPortfolio : coastFireNumber
  const chartData = buildCoastChartData(startingValue, currentAge, retirementAge, annualReturn, alreadyCoasted ? currentPortfolio * Math.pow(1 + annualReturn, yearsOfGrowth) : fireNumber)

  return {
    fireNumber,
    coastFireNumber,
    yearsOfGrowth,
    gap,
    alreadyCoasted,
    progressPercent,
    chartData,
  }
}
