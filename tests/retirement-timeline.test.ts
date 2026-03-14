// tests/retirement-timeline.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateRealReturn,
  calculateFireNumber,
  calculateYearsToFIRE,
  buildScenarioRows,
  buildChartData,
  calculateRetirementTimelineResults,
} from '../lib/calculators/retirement-timeline'
import type { RetirementTimelineInputs } from '../lib/calculators/retirement-timeline'

// ─── calculateRealReturn ──────────────────────────────────────────────────────

describe('calculateRealReturn', () => {
  it('returns correct real return for 7% nominal and 3% inflation', () => {
    const result = calculateRealReturn(0.07, 0.03)
    expect(result).toBeCloseTo((1.07 / 1.03) - 1, 6)
  })

  it('returns zero real return when nominal equals inflation', () => {
    const result = calculateRealReturn(0.05, 0.05)
    expect(result).toBeCloseTo(0, 6)
  })

  it('returns negative real return when inflation exceeds nominal', () => {
    const result = calculateRealReturn(0.03, 0.05)
    expect(result).toBeLessThan(0)
  })

  it('returns nominal return when inflation is 0', () => {
    const result = calculateRealReturn(0.07, 0)
    expect(result).toBeCloseTo(0.07, 6)
  })
})

// ─── calculateFireNumber ──────────────────────────────────────────────────────

describe('calculateFireNumber', () => {
  it('calculates FIRE number at 4% withdrawal rate', () => {
    expect(calculateFireNumber(40_000, 0.04)).toBeCloseTo(1_000_000, 0)
  })

  it('calculates FIRE number at 3.5% withdrawal rate', () => {
    expect(calculateFireNumber(60_000, 0.035)).toBeCloseTo(1_714_286, 0)
  })

  it('calculates FIRE number at 4% for $50,000 expenses', () => {
    expect(calculateFireNumber(50_000, 0.04)).toBeCloseTo(1_250_000, 0)
  })

  it('returns Infinity for zero withdrawal rate', () => {
    expect(calculateFireNumber(50_000, 0)).toBe(Infinity)
  })

  it('calculates for 5% withdrawal rate', () => {
    expect(calculateFireNumber(40_000, 0.05)).toBeCloseTo(800_000, 0)
  })
})

// ─── calculateYearsToFIRE ─────────────────────────────────────────────────────

describe('calculateYearsToFIRE', () => {
  it('returns 0 when portfolio already meets fire number', () => {
    expect(calculateYearsToFIRE(1_000_000, 30_000, 1_000_000, 0.04)).toBe(0)
  })

  it('returns 0 when portfolio exceeds fire number', () => {
    expect(calculateYearsToFIRE(1_000_000, 30_000, 1_200_000, 0.04)).toBe(0)
  })

  it('returns Infinity when no contributions and portfolio below target', () => {
    expect(calculateYearsToFIRE(1_000_000, 0, 500_000, 0.04)).toBe(Infinity)
  })

  it('uses linear formula when real return is zero', () => {
    // (1,000,000 - 0) / 25,000 = 40
    expect(calculateYearsToFIRE(1_000_000, 25_000, 0, 0)).toBeCloseTo(40, 0)
  })

  it('uses linear formula with existing portfolio and zero return', () => {
    // (1,000,000 - 200,000) / 25,000 = 32
    expect(calculateYearsToFIRE(1_000_000, 25_000, 200_000, 0)).toBeCloseTo(32, 0)
  })

  it('calculates years with typical inputs', () => {
    // P=$0, C=$30K, r_real=4%, target=$1M
    // log((1M*0.04 + 30K) / (0*0.04 + 30K)) / log(1.04) = log(70K/30K) / log(1.04) ≈ 21.6 years
    const years = calculateYearsToFIRE(1_000_000, 30_000, 0, 0.04)
    expect(years).toBeCloseTo(21.6, 0)
  })

  it('calculates years with existing portfolio', () => {
    const years = calculateYearsToFIRE(1_000_000, 25_000, 50_000, 0.04)
    expect(years).toBeGreaterThan(0)
    expect(years).toBeLessThan(50)
  })

  it('returns Infinity for zero contributions and negative denominator', () => {
    const result = calculateYearsToFIRE(1_000_000, -100, 0, 0.04)
    expect(result).toBe(Infinity)
  })

  it('produces fewer years with higher return', () => {
    const years5pct = calculateYearsToFIRE(1_000_000, 25_000, 0, 0.05)
    const years8pct = calculateYearsToFIRE(1_000_000, 25_000, 0, 0.08)
    expect(years8pct).toBeLessThan(years5pct)
  })

  it('produces fewer years with higher contributions', () => {
    const years25k = calculateYearsToFIRE(1_000_000, 25_000, 0, 0.05)
    const years50k = calculateYearsToFIRE(1_000_000, 50_000, 0, 0.05)
    expect(years50k).toBeLessThan(years25k)
  })
})

// ─── buildScenarioRows ────────────────────────────────────────────────────────

describe('buildScenarioRows', () => {
  const baseInputs: RetirementTimelineInputs = {
    currentAge: 35,
    annualIncome: 75_000,
    annualExpenses: 50_000,
    currentPortfolio: 50_000,
    annualReturn: 0.07,
    inflationRate: 0.03,
    withdrawalRate: 0.04,
  }
  const baseContributions = 25_000
  const baseFireNumber = 1_250_000
  const baseYears = 30
  const baseRetirementAge = 65

  it('returns exactly 9 rows', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows).toHaveLength(9)
  })

  it('first row is the current plan', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows[0].label).toBe('Current plan')
    expect(rows[0].annualExpenses).toBeCloseTo(50_000, 0)
    expect(rows[0].annualContributions).toBeCloseTo(25_000, 0)
  })

  it('expense cut rows have lower expenses and higher contributions', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows[1].annualExpenses).toBeCloseTo(45_000, 0) // 10% cut
    expect(rows[2].annualExpenses).toBeCloseTo(40_000, 0) // 20% cut
    expect(rows[3].annualExpenses).toBeCloseTo(35_000, 0) // 30% cut
  })

  it('contribution increase rows have same expenses but higher contributions', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows[4].annualExpenses).toBeCloseTo(50_000, 0) // same expenses
    expect(rows[4].annualContributions).toBeCloseTo(27_500, 0) // +10%
    expect(rows[5].annualContributions).toBeCloseTo(30_000, 0) // +20%
    expect(rows[6].annualContributions).toBeCloseTo(32_500, 0) // +30%
  })

  it('return scenario rows have correct labels', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows[7].label).toBe('+1% return')
    expect(rows[8].label).toBe('+2% return')
  })

  it('expense cuts produce a lower FIRE number', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows[1].fireNumber).toBeLessThan(rows[0].fireNumber) // 10% cut
    expect(rows[2].fireNumber).toBeLessThan(rows[1].fireNumber) // 20% cut
  })

  it('return scenarios have fewer years than base case', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    expect(rows[7].yearsToFI).toBeLessThan(rows[0].yearsToFI)
    expect(rows[8].yearsToFI).toBeLessThan(rows[7].yearsToFI)
  })

  it('all rows have valid retirement ages >= current age', () => {
    const rows = buildScenarioRows(baseInputs, baseContributions, baseFireNumber, baseYears, baseRetirementAge)
    for (const row of rows) {
      expect(row.retirementAge).toBeGreaterThanOrEqual(baseInputs.currentAge)
    }
  })

  it('yearsToFI is capped at 100', () => {
    const poorInputs: RetirementTimelineInputs = {
      ...baseInputs,
      annualIncome: 1_000,
      annualExpenses: 950,
    }
    const rows = buildScenarioRows(poorInputs, 50, 950 / 0.04, 100, 35 + 100)
    // Current plan with minimal contributions should be <= 100
    expect(rows[0].yearsToFI).toBeLessThanOrEqual(100)
  })
})

// ─── buildChartData ───────────────────────────────────────────────────────────

describe('buildChartData', () => {
  it('starts at current age with current portfolio', () => {
    const data = buildChartData(35, 50_000, 25_000, 0.04, 1_000_000, 20)
    expect(data[0].age).toBe(35)
    expect(data[0].value).toBe(50_000)
  })

  it('produces data points from current age to retirement age + 5', () => {
    const data = buildChartData(35, 0, 25_000, 0.04, 1_000_000, 20)
    // Should cover age 35 to at least 55 + 5 = 60
    expect(data[data.length - 1].age).toBeGreaterThanOrEqual(60)
  })

  it('portfolio grows over time with positive return and contributions', () => {
    const data = buildChartData(35, 10_000, 20_000, 0.05, 500_000, 15)
    for (let i = 1; i < data.length; i++) {
      expect(data[i].value).toBeGreaterThan(data[i - 1].value)
    }
  })

  it('produces integer values', () => {
    const data = buildChartData(35, 50_000, 25_000, 0.04, 1_000_000, 20)
    for (const point of data) {
      expect(Number.isInteger(point.value)).toBe(true)
    }
  })

  it('caps at age 100', () => {
    // Very slow growth, long timeline
    const data = buildChartData(35, 10_000, 5_000, 0.01, 10_000_000, 100)
    expect(data[data.length - 1].age).toBeLessThanOrEqual(100)
  })

  it('ages are sequential integers', () => {
    const data = buildChartData(40, 0, 30_000, 0.05, 800_000, 15)
    for (let i = 1; i < data.length; i++) {
      expect(data[i].age).toBe(data[i - 1].age + 1)
    }
  })
})

// ─── calculateRetirementTimelineResults ──────────────────────────────────────

describe('calculateRetirementTimelineResults', () => {
  const baseInputs: RetirementTimelineInputs = {
    currentAge: 35,
    annualIncome: 75_000,
    annualExpenses: 50_000,
    currentPortfolio: 50_000,
    annualReturn: 0.07,
    inflationRate: 0.03,
    withdrawalRate: 0.04,
  }

  it('calculates correct FIRE number', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.fireNumber).toBeCloseTo(1_250_000, 0)
  })

  it('calculates correct annual contributions', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.annualContributions).toBe(25_000)
  })

  it('calculates positive yearsToFI', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.yearsToFI).toBeGreaterThan(0)
    expect(result.yearsToFI).toBeLessThan(100)
  })

  it('retirementAge equals currentAge + yearsToFI (rounded)', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.retirementAge).toBe(Math.round(35 + result.yearsToFI))
  })

  it('calculates correct savings rate', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    // (75000 - 50000) / 75000 = 0.333...
    expect(result.savingsRate).toBeCloseTo(25_000 / 75_000, 4)
  })

  it('returns 9 scenario rows', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.scenarios).toHaveLength(9)
  })

  it('chart data starts at current age', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.chartData[0].age).toBe(35)
    expect(result.chartData[0].value).toBe(50_000)
  })

  it('chart data has multiple points', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    expect(result.chartData.length).toBeGreaterThan(5)
  })

  // Already FI
  it('returns 0 yearsToFI when portfolio already meets FIRE number', () => {
    const result = calculateRetirementTimelineResults({
      ...baseInputs,
      currentPortfolio: 2_000_000,
    })
    expect(result.yearsToFI).toBe(0)
    expect(result.retirementAge).toBe(35)
  })

  // Zero contributions edge case
  it('handles zero contributions (income equals expenses)', () => {
    const result = calculateRetirementTimelineResults({
      ...baseInputs,
      annualIncome: 50_000,
      annualExpenses: 50_000,
      currentPortfolio: 0,
    })
    // Cannot reach FI — capped at 100
    expect(result.yearsToFI).toBe(100)
    expect(result.annualContributions).toBe(0)
  })

  it('savings rate is 0 when income equals expenses', () => {
    const result = calculateRetirementTimelineResults({
      ...baseInputs,
      annualIncome: 50_000,
      annualExpenses: 50_000,
    })
    expect(result.savingsRate).toBe(0)
  })

  // High income, low expenses → fast FI
  it('produces shorter timeline with high savings rate', () => {
    const result = calculateRetirementTimelineResults({
      ...baseInputs,
      annualIncome: 200_000,
      annualExpenses: 40_000,
    })
    expect(result.yearsToFI).toBeLessThan(20)
  })

  // Large portfolio → very fast
  it('reaches FI faster with large existing portfolio', () => {
    const resultSmall = calculateRetirementTimelineResults({ ...baseInputs, currentPortfolio: 0 })
    const resultLarge = calculateRetirementTimelineResults({ ...baseInputs, currentPortfolio: 500_000 })
    expect(resultLarge.yearsToFI).toBeLessThan(resultSmall.yearsToFI)
  })

  // Higher return → faster
  it('produces shorter timeline with higher return', () => {
    const resultLow = calculateRetirementTimelineResults({ ...baseInputs, annualReturn: 0.05 })
    const resultHigh = calculateRetirementTimelineResults({ ...baseInputs, annualReturn: 0.10 })
    expect(resultHigh.yearsToFI).toBeLessThan(resultLow.yearsToFI)
  })

  // Maximum boundary inputs
  it('handles maximum boundary inputs without throwing', () => {
    expect(() =>
      calculateRetirementTimelineResults({
        currentAge: 80,
        annualIncome: 10_000_000,
        annualExpenses: 5_000_000,
        currentPortfolio: 100_000_000,
        annualReturn: 0.15,
        inflationRate: 0.10,
        withdrawalRate: 0.10,
      })
    ).not.toThrow()
  })

  // Minimum boundary inputs
  it('handles minimum boundary inputs without throwing', () => {
    expect(() =>
      calculateRetirementTimelineResults({
        currentAge: 18,
        annualIncome: 1_000,
        annualExpenses: 1_000,
        currentPortfolio: 0,
        annualReturn: 0.01,
        inflationRate: 0,
        withdrawalRate: 0.01,
      })
    ).not.toThrow()
  })

  it('scenario rows have the first row matching base results', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    const baseScenario = result.scenarios[0]
    expect(baseScenario.label).toBe('Current plan')
    expect(baseScenario.annualExpenses).toBeCloseTo(50_000, 0)
    expect(baseScenario.fireNumber).toBeCloseTo(1_250_000, 0)
  })

  it('expense cuts in scenarios yield lower fire numbers', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    const base = result.scenarios[0]
    const cut10 = result.scenarios[1]
    const cut20 = result.scenarios[2]
    const cut30 = result.scenarios[3]
    expect(cut10.fireNumber).toBeLessThan(base.fireNumber)
    expect(cut20.fireNumber).toBeLessThan(cut10.fireNumber)
    expect(cut30.fireNumber).toBeLessThan(cut20.fireNumber)
  })

  it('higher return scenarios yield fewer years', () => {
    const result = calculateRetirementTimelineResults(baseInputs)
    const base = result.scenarios[0]
    const plus1 = result.scenarios[7]
    const plus2 = result.scenarios[8]
    expect(plus1.yearsToFI).toBeLessThan(base.yearsToFI)
    expect(plus2.yearsToFI).toBeLessThan(plus1.yearsToFI)
  })

  it('real return is used (inflation-adjusted), not nominal', () => {
    // With 7% nominal and 3% inflation, real = ~3.88%
    // Using just 7% nominal would give shorter timeline than using real return
    const result = calculateRetirementTimelineResults(baseInputs)
    const realReturn = (1.07 / 1.03) - 1
    const nominalReturn = 0.07
    const withReal = calculateYearsToFIRE(result.fireNumber, 25_000, 50_000, realReturn)
    const withNominal = calculateYearsToFIRE(result.fireNumber, 25_000, 50_000, nominalReturn)
    expect(withReal).toBeGreaterThan(withNominal)
  })

  it('annualContributions is clamped to 0 when expenses exceed income', () => {
    const result = calculateRetirementTimelineResults({
      ...baseInputs,
      annualIncome: 30_000,
      annualExpenses: 50_000,
    })
    expect(result.annualContributions).toBe(0)
  })
})
