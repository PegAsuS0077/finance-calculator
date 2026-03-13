// tests/coast-fire.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateFireNumber,
  calculateCoastFireNumber,
  buildCoastChartData,
  calculateCoastFireResults,
} from '../lib/calculators/coast-fire'

// ─── calculateFireNumber ────────────────────────────────────────────────────

describe('calculateFireNumber', () => {
  it('calculates standard 4% case: $40k expenses → $1M', () => {
    expect(calculateFireNumber(40_000, 0.04)).toBeCloseTo(1_000_000, 0)
  })

  it('calculates 3.5% case: $50k expenses → ~$1.43M', () => {
    expect(calculateFireNumber(50_000, 0.035)).toBeCloseTo(1_428_571, 0)
  })

  it('calculates 5% case: $60k expenses → $1.2M', () => {
    expect(calculateFireNumber(60_000, 0.05)).toBeCloseTo(1_200_000, 0)
  })

  it('throws on zero withdrawal rate', () => {
    expect(() => calculateFireNumber(40_000, 0)).toThrow()
  })

  it('throws on negative withdrawal rate', () => {
    expect(() => calculateFireNumber(40_000, -0.04)).toThrow()
  })

  it('handles high expenses', () => {
    expect(calculateFireNumber(200_000, 0.04)).toBeCloseTo(5_000_000, 0)
  })

  it('handles minimum valid expense', () => {
    expect(calculateFireNumber(1_000, 0.04)).toBeCloseTo(25_000, 0)
  })
})

// ─── calculateCoastFireNumber ───────────────────────────────────────────────

describe('calculateCoastFireNumber', () => {
  it('returns fireNumber when years = 0', () => {
    expect(calculateCoastFireNumber(1_000_000, 0.07, 0)).toBeCloseTo(1_000_000, 0)
  })

  it('calculates coast number for 35 years at 7%: $1M / (1.07)^35', () => {
    const expected = 1_000_000 / Math.pow(1.07, 35)
    expect(calculateCoastFireNumber(1_000_000, 0.07, 35)).toBeCloseTo(expected, 0)
  })

  it('coast number is always less than fire number for positive return and years > 0', () => {
    const result = calculateCoastFireNumber(1_500_000, 0.07, 20)
    expect(result).toBeLessThan(1_500_000)
  })

  it('higher return rate produces smaller coast number', () => {
    const low = calculateCoastFireNumber(1_000_000, 0.05, 25)
    const high = calculateCoastFireNumber(1_000_000, 0.10, 25)
    expect(high).toBeLessThan(low)
  })

  it('more years produces smaller coast number', () => {
    const short = calculateCoastFireNumber(1_000_000, 0.07, 10)
    const long = calculateCoastFireNumber(1_000_000, 0.07, 30)
    expect(long).toBeLessThan(short)
  })

  it('handles exactly 1 year correctly', () => {
    const expected = 1_000_000 / 1.07
    expect(calculateCoastFireNumber(1_000_000, 0.07, 1)).toBeCloseTo(expected, 2)
  })
})

// ─── buildCoastChartData ────────────────────────────────────────────────────

describe('buildCoastChartData', () => {
  it('produces correct number of points (retirement - current + 1)', () => {
    const data = buildCoastChartData(100_000, 30, 65, 0.07, 1_000_000)
    expect(data.length).toBe(36) // ages 30 to 65 inclusive
  })

  it('first point age equals current age', () => {
    const data = buildCoastChartData(100_000, 30, 65, 0.07, 1_000_000)
    expect(data[0].age).toBe(30)
  })

  it('last point age equals retirement age', () => {
    const data = buildCoastChartData(100_000, 30, 65, 0.07, 1_000_000)
    expect(data[data.length - 1].age).toBe(65)
  })

  it('last point portfolio equals fireNumber', () => {
    const fireNumber = 1_000_000
    const data = buildCoastChartData(100_000, 30, 65, 0.07, fireNumber)
    expect(data[data.length - 1].portfolio).toBe(Math.round(fireNumber))
  })

  it('portfolio grows monotonically', () => {
    const data = buildCoastChartData(100_000, 30, 65, 0.07, 1_000_000)
    for (let i = 1; i < data.length - 1; i++) {
      expect(data[i].portfolio).toBeGreaterThan(data[i - 1].portfolio)
    }
  })

  it('handles same age scenario (0 years)', () => {
    const data = buildCoastChartData(500_000, 50, 50, 0.07, 500_000)
    expect(data.length).toBe(1)
    expect(data[0].age).toBe(50)
  })
})

// ─── calculateCoastFireResults ──────────────────────────────────────────────

describe('calculateCoastFireResults', () => {
  const baseInputs = {
    currentAge: 30,
    retirementAge: 65,
    annualExpenses: 40_000,
    withdrawalRate: 0.04,
    annualReturn: 0.07,
    currentPortfolio: 0,
  }

  it('returns correct fireNumber', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.fireNumber).toBeCloseTo(1_000_000, 0)
  })

  it('returns correct yearsOfGrowth', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.yearsOfGrowth).toBe(35)
  })

  it('coast fire number < fire number for 35-year horizon', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.coastFireNumber).toBeLessThan(result.fireNumber)
  })

  it('gap = coastFireNumber when portfolio = 0', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.gap).toBeCloseTo(result.coastFireNumber, 0)
  })

  it('alreadyCoasted = false when portfolio < coastFireNumber', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.alreadyCoasted).toBe(false)
  })

  it('alreadyCoasted = true when portfolio >= coastFireNumber', () => {
    const result = calculateCoastFireResults({
      ...baseInputs,
      currentPortfolio: 500_000, // way more than coast number for 35yr @ 7%
    })
    expect(result.alreadyCoasted).toBe(true)
  })

  it('gap = 0 when already coasted', () => {
    const result = calculateCoastFireResults({
      ...baseInputs,
      currentPortfolio: 500_000,
    })
    expect(result.gap).toBe(0)
  })

  it('progressPercent is 0 when portfolio = 0', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.progressPercent).toBe(0)
  })

  it('progressPercent is 100 when already coasted', () => {
    const result = calculateCoastFireResults({
      ...baseInputs,
      currentPortfolio: 500_000,
    })
    expect(result.progressPercent).toBe(100)
  })

  it('progressPercent is between 0 and 100 for partial progress', () => {
    const coastNumber = calculateCoastFireResults(baseInputs).coastFireNumber
    const result = calculateCoastFireResults({
      ...baseInputs,
      currentPortfolio: coastNumber / 2,
    })
    expect(result.progressPercent).toBeGreaterThan(0)
    expect(result.progressPercent).toBeLessThanOrEqual(100)
  })

  it('chartData starts at currentAge', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.chartData[0].age).toBe(30)
  })

  it('chartData ends at retirementAge', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.chartData[result.chartData.length - 1].age).toBe(65)
  })

  it('handles early retirement scenario (age 45 to 55)', () => {
    const result = calculateCoastFireResults({
      currentAge: 45,
      retirementAge: 55,
      annualExpenses: 50_000,
      withdrawalRate: 0.04,
      annualReturn: 0.07,
      currentPortfolio: 0,
    })
    expect(result.yearsOfGrowth).toBe(10)
    expect(result.fireNumber).toBeCloseTo(1_250_000, 0)
    expect(result.coastFireNumber).toBeCloseTo(1_250_000 / Math.pow(1.07, 10), 0)
  })

  it('handles high withdrawal rate (5%)', () => {
    const result = calculateCoastFireResults({
      ...baseInputs,
      withdrawalRate: 0.05,
    })
    expect(result.fireNumber).toBeCloseTo(800_000, 0)
  })

  it('handles very low annual expenses ($10k)', () => {
    const result = calculateCoastFireResults({
      ...baseInputs,
      annualExpenses: 10_000,
    })
    expect(result.fireNumber).toBeCloseTo(250_000, 0)
  })

  it('handles high portfolio value (partial coast progress)', () => {
    const result = calculateCoastFireResults({
      ...baseInputs,
      currentPortfolio: 50_000,
    })
    expect(result.progressPercent).toBeGreaterThan(0)
    expect(result.gap).toBeGreaterThan(0)
  })

  it('chartData has yearsOfGrowth + 1 points', () => {
    const result = calculateCoastFireResults(baseInputs)
    expect(result.chartData.length).toBe(36) // 30 to 65 = 36 points
  })
})
