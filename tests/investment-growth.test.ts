// tests/investment-growth.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateFutureValue,
  calculateTotalContributed,
  buildYearRows,
  calculateInvestmentGrowthResults,
} from '../lib/calculators/investment-growth'

// ─── calculateFutureValue ───────────────────────────────────────────────────

describe('calculateFutureValue', () => {
  it('returns initial investment when rate is 0 and no contributions', () => {
    expect(calculateFutureValue(10_000, 0, 0, 10, 'monthly')).toBeCloseTo(10_000, 0)
  })

  it('returns principal + contributions when rate is 0 with monthly compounding', () => {
    // 10,000 + 500/mo * 12 * 10 = 70,000
    expect(calculateFutureValue(10_000, 500, 0, 10, 'monthly')).toBeCloseTo(70_000, 0)
  })

  it('returns principal + contributions when rate is 0 with annual compounding', () => {
    expect(calculateFutureValue(10_000, 500, 0, 10, 'annual')).toBeCloseTo(70_000, 0)
  })

  it('grows a lump sum correctly with monthly compounding', () => {
    // $10,000 at 7% monthly for 10 years
    // r = 0.07/12, n = 120
    const r = 0.07 / 12
    const n = 120
    const expected = 10_000 * Math.pow(1 + r, n)
    expect(calculateFutureValue(10_000, 0, 0.07, 10, 'monthly')).toBeCloseTo(expected, 0)
  })

  it('grows a lump sum correctly with annual compounding', () => {
    const expected = 10_000 * Math.pow(1.07, 10)
    expect(calculateFutureValue(10_000, 0, 0.07, 10, 'annual')).toBeCloseTo(expected, 0)
  })

  it('includes monthly contributions with monthly compounding', () => {
    const r = 0.07 / 12
    const n = 120
    const growth = Math.pow(1 + r, n)
    const expected = 10_000 * growth + 500 * ((growth - 1) / r)
    expect(calculateFutureValue(10_000, 500, 0.07, 10, 'monthly')).toBeCloseTo(expected, 0)
  })

  it('includes monthly contributions with annual compounding', () => {
    const r = 0.07
    const annualContrib = 500 * 12
    const growth = Math.pow(1.07, 10)
    const expected = 10_000 * growth + annualContrib * ((growth - 1) / r)
    expect(calculateFutureValue(10_000, 500, 0.07, 10, 'annual')).toBeCloseTo(expected, 0)
  })

  it('handles zero initial investment with contributions', () => {
    const r = 0.07 / 12
    const n = 240
    const growth = Math.pow(1 + r, n)
    const expected = 500 * ((growth - 1) / r)
    expect(calculateFutureValue(0, 500, 0.07, 20, 'monthly')).toBeCloseTo(expected, 0)
  })

  it('handles large initial investment', () => {
    const result = calculateFutureValue(1_000_000, 0, 0.07, 30, 'monthly')
    expect(result).toBeGreaterThan(7_000_000)
  })

  it('handles 1-year period correctly', () => {
    const r = 0.07 / 12
    const n = 12
    const growth = Math.pow(1 + r, n)
    const expected = 10_000 * growth + 500 * ((growth - 1) / r)
    expect(calculateFutureValue(10_000, 500, 0.07, 1, 'monthly')).toBeCloseTo(expected, 0)
  })

  it('handles 50-year maximum period', () => {
    const result = calculateFutureValue(10_000, 500, 0.07, 50, 'monthly')
    expect(result).toBeGreaterThan(2_000_000)
  })

  it('final value is greater than total contributed when rate > 0', () => {
    const fv = calculateFutureValue(10_000, 500, 0.07, 20, 'monthly')
    const contributed = calculateTotalContributed(10_000, 500, 20)
    expect(fv).toBeGreaterThan(contributed)
  })

  it('handles high return rate (20%)', () => {
    const result = calculateFutureValue(10_000, 0, 0.20, 10, 'monthly')
    expect(result).toBeGreaterThan(60_000)
  })
})

// ─── calculateTotalContributed ─────────────────────────────────────────────

describe('calculateTotalContributed', () => {
  it('returns initial investment when no contributions', () => {
    expect(calculateTotalContributed(10_000, 0, 20)).toBe(10_000)
  })

  it('adds monthly contributions correctly', () => {
    // 10,000 + 500 * 12 * 10 = 70,000
    expect(calculateTotalContributed(10_000, 500, 10)).toBe(70_000)
  })

  it('handles zero initial investment', () => {
    expect(calculateTotalContributed(0, 500, 5)).toBe(30_000)
  })

  it('handles 1-year period', () => {
    expect(calculateTotalContributed(5_000, 200, 1)).toBe(7_400)
  })

  it('handles 50-year period', () => {
    expect(calculateTotalContributed(0, 1_000, 50)).toBe(600_000)
  })
})

// ─── buildYearRows ─────────────────────────────────────────────────────────

describe('buildYearRows', () => {
  it('returns correct number of rows', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'monthly')
    expect(rows).toHaveLength(10)
  })

  it('year numbers are sequential starting at 1', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 5, 'monthly')
    rows.forEach((row, i) => expect(row.year).toBe(i + 1))
  })

  it('balance grows each year when rate > 0', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'monthly')
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i].balance).toBeGreaterThan(rows[i - 1].balance)
    }
  })

  it('totalContributed grows each year', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'monthly')
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i].totalContributed).toBeGreaterThan(rows[i - 1].totalContributed)
    }
  })

  it('totalInterest is non-negative', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'monthly')
    rows.forEach((row) => expect(row.totalInterest).toBeGreaterThanOrEqual(0))
  })

  it('balance equals totalContributed + totalInterest', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'monthly')
    rows.forEach((row) => {
      expect(row.balance).toBeCloseTo(row.totalContributed + row.totalInterest, 0)
    })
  })

  it('final row balance matches calculateFutureValue', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'monthly')
    const fv = calculateFutureValue(10_000, 500, 0.07, 10, 'monthly')
    expect(rows[rows.length - 1].balance).toBeCloseTo(fv, 0)
  })

  it('works with zero contributions', () => {
    const rows = buildYearRows(50_000, 0, 0.07, 5, 'monthly')
    expect(rows).toHaveLength(5)
    rows.forEach((row) => expect(row.balance).toBeGreaterThan(50_000))
  })

  it('works with annual compounding', () => {
    const rows = buildYearRows(10_000, 500, 0.07, 10, 'annual')
    expect(rows).toHaveLength(10)
    expect(rows[9].balance).toBeGreaterThan(rows[0].balance)
  })
})

// ─── calculateInvestmentGrowthResults ─────────────────────────────────────

describe('calculateInvestmentGrowthResults', () => {
  const baseInputs = {
    initialInvestment: 10_000,
    monthlyContribution: 500,
    annualReturn: 0.07,
    years: 20,
    compoundFrequency: 'monthly' as const,
  }

  it('returns all required fields', () => {
    const result = calculateInvestmentGrowthResults(baseInputs)
    expect(result).toHaveProperty('finalValue')
    expect(result).toHaveProperty('totalContributed')
    expect(result).toHaveProperty('totalInterest')
    expect(result).toHaveProperty('growthMultiplier')
    expect(result).toHaveProperty('yearRows')
  })

  it('finalValue is greater than totalContributed when return > 0', () => {
    const result = calculateInvestmentGrowthResults(baseInputs)
    expect(result.finalValue).toBeGreaterThan(result.totalContributed)
  })

  it('totalInterest equals finalValue minus totalContributed', () => {
    const result = calculateInvestmentGrowthResults(baseInputs)
    expect(result.totalInterest).toBeCloseTo(result.finalValue - result.totalContributed, 0)
  })

  it('growthMultiplier equals finalValue / totalContributed', () => {
    const result = calculateInvestmentGrowthResults(baseInputs)
    expect(result.growthMultiplier).toBeCloseTo(result.finalValue / result.totalContributed, 4)
  })

  it('yearRows has correct length', () => {
    const result = calculateInvestmentGrowthResults(baseInputs)
    expect(result.yearRows).toHaveLength(20)
  })

  it('handles zero return rate', () => {
    const result = calculateInvestmentGrowthResults({ ...baseInputs, annualReturn: 0 })
    expect(result.totalInterest).toBe(0)
    expect(result.growthMultiplier).toBeCloseTo(1, 4)
  })

  it('handles zero initial investment', () => {
    const result = calculateInvestmentGrowthResults({ ...baseInputs, initialInvestment: 0 })
    expect(result.totalContributed).toBe(500 * 12 * 20)
    expect(result.finalValue).toBeGreaterThan(result.totalContributed)
  })

  it('handles zero contributions', () => {
    const result = calculateInvestmentGrowthResults({ ...baseInputs, monthlyContribution: 0 })
    expect(result.totalContributed).toBe(10_000)
    expect(result.finalValue).toBeGreaterThan(10_000)
  })

  it('handles 1-year period', () => {
    const result = calculateInvestmentGrowthResults({ ...baseInputs, years: 1 })
    expect(result.yearRows).toHaveLength(1)
    expect(result.finalValue).toBeGreaterThan(0)
  })

  it('handles 50-year maximum period', () => {
    const result = calculateInvestmentGrowthResults({ ...baseInputs, years: 50 })
    expect(result.yearRows).toHaveLength(50)
    expect(result.finalValue).toBeGreaterThan(1_000_000)
  })

  it('annual compounding produces slightly lower result than monthly', () => {
    const monthly = calculateInvestmentGrowthResults({ ...baseInputs, compoundFrequency: 'monthly' })
    const annual = calculateInvestmentGrowthResults({ ...baseInputs, compoundFrequency: 'annual' })
    expect(monthly.finalValue).toBeGreaterThan(annual.finalValue)
  })

  it('growthMultiplier is 1 when totalContributed is 0', () => {
    const result = calculateInvestmentGrowthResults({
      ...baseInputs,
      initialInvestment: 0,
      monthlyContribution: 0,
      years: 10,
    })
    expect(result.growthMultiplier).toBe(1)
  })

  it('higher return produces higher final value', () => {
    const low = calculateInvestmentGrowthResults({ ...baseInputs, annualReturn: 0.05 })
    const high = calculateInvestmentGrowthResults({ ...baseInputs, annualReturn: 0.10 })
    expect(high.finalValue).toBeGreaterThan(low.finalValue)
  })

  it('longer period produces higher final value', () => {
    const short = calculateInvestmentGrowthResults({ ...baseInputs, years: 10 })
    const long = calculateInvestmentGrowthResults({ ...baseInputs, years: 30 })
    expect(long.finalValue).toBeGreaterThan(short.finalValue)
  })
})
