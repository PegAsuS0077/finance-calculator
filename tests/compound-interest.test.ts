// tests/compound-interest.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateCompoundAmount,
  calculateDoublingTime,
  calculateTotalContributed,
  buildYearRows,
  calculateCompoundInterestResults,
} from '../lib/calculators/compound-interest'

// ─── calculateCompoundAmount ──────────────────────────────────────────────────

describe('calculateCompoundAmount', () => {
  it('calculates annual compounding correctly (no contributions)', () => {
    // $1,000 at 10% annually for 10 years = 1000 × 1.1^10 ≈ 2593.74
    const result = calculateCompoundAmount(1_000, 0.10, 10, 'annually', 0)
    expect(result).toBeCloseTo(2593.74, 1)
  })

  it('calculates monthly compounding correctly (no contributions)', () => {
    // $1,000 at 12% monthly for 1 year = 1000 × (1 + 0.01)^12 ≈ 1126.83
    const result = calculateCompoundAmount(1_000, 0.12, 1, 'monthly', 0)
    expect(result).toBeCloseTo(1126.83, 1)
  })

  it('calculates quarterly compounding (no contributions)', () => {
    // $1,000 at 8% quarterly for 5 years = 1000 × (1 + 0.02)^20 ≈ 1485.95
    const result = calculateCompoundAmount(1_000, 0.08, 5, 'quarterly', 0)
    expect(result).toBeCloseTo(1485.95, 1)
  })

  it('calculates daily compounding (no contributions)', () => {
    // $1,000 at 10% daily for 1 year ≈ $1105.16
    const result = calculateCompoundAmount(1_000, 0.10, 1, 'daily', 0)
    expect(result).toBeCloseTo(1105.16, 1)
  })

  it('monthly compounding produces more than annual for same rate', () => {
    const monthly = calculateCompoundAmount(10_000, 0.08, 20, 'monthly', 0)
    const annual = calculateCompoundAmount(10_000, 0.08, 20, 'annually', 0)
    expect(monthly).toBeGreaterThan(annual)
  })

  it('daily compounding produces more than monthly', () => {
    const daily = calculateCompoundAmount(10_000, 0.08, 20, 'daily', 0)
    const monthly = calculateCompoundAmount(10_000, 0.08, 20, 'monthly', 0)
    expect(daily).toBeGreaterThan(monthly)
  })

  it('handles zero rate — linear growth', () => {
    // $1,000 at 0% for 10 years with $500/year = $1,000 + $5,000 = $6,000
    const result = calculateCompoundAmount(1_000, 0, 10, 'monthly', 500)
    expect(result).toBeCloseTo(6_000, 0)
  })

  it('includes annual contributions correctly', () => {
    // $0 principal, 8% annual, 10 years, $1,000/year annual compounding
    // FV = 1000 × ((1.08^10 - 1) / 0.08) ≈ 14486.56
    const result = calculateCompoundAmount(0, 0.08, 10, 'annually', 1_000)
    expect(result).toBeCloseTo(14486.56, 1)
  })

  it('adds principal and contributions correctly', () => {
    const withPrincipal = calculateCompoundAmount(5_000, 0.08, 10, 'annually', 1_000)
    const principalOnly = calculateCompoundAmount(5_000, 0.08, 10, 'annually', 0)
    const contributionOnly = calculateCompoundAmount(0, 0.08, 10, 'annually', 1_000)
    expect(withPrincipal).toBeCloseTo(principalOnly + contributionOnly, 0)
  })

  it('handles zero principal with contributions', () => {
    const result = calculateCompoundAmount(0, 0.07, 20, 'monthly', 500)
    expect(result).toBeGreaterThan(500 * 20) // more than simple total
  })

  it('handles large principal', () => {
    const result = calculateCompoundAmount(1_000_000, 0.07, 30, 'monthly', 0)
    expect(result).toBeGreaterThan(1_000_000)
    expect(result).toBeLessThan(100_000_000)
  })

  it('result is always at least principal when rate >= 0', () => {
    const result = calculateCompoundAmount(50_000, 0.05, 1, 'annually', 0)
    expect(result).toBeGreaterThanOrEqual(50_000)
  })
})

// ─── calculateDoublingTime ────────────────────────────────────────────────────

describe('calculateDoublingTime', () => {
  it('returns 72 / rate for standard rates', () => {
    // 8% rate → 72 / 8 = 9 years
    expect(calculateDoublingTime(0.08)).toBeCloseTo(9, 2)
  })

  it('calculates 4% correctly', () => {
    // 72 / 4 = 18 years
    expect(calculateDoublingTime(0.04)).toBeCloseTo(18, 2)
  })

  it('calculates 12% correctly', () => {
    // 72 / 12 = 6 years
    expect(calculateDoublingTime(0.12)).toBeCloseTo(6, 2)
  })

  it('returns null for zero rate', () => {
    expect(calculateDoublingTime(0)).toBeNull()
  })

  it('returns shorter time for higher rate', () => {
    const low = calculateDoublingTime(0.04)!
    const high = calculateDoublingTime(0.10)!
    expect(low).toBeGreaterThan(high)
  })
})

// ─── calculateTotalContributed ────────────────────────────────────────────────

describe('calculateTotalContributed', () => {
  it('calculates principal only when no contributions', () => {
    expect(calculateTotalContributed(10_000, 0, 20)).toBe(10_000)
  })

  it('adds annual contributions over years', () => {
    // $5,000 principal + $1,000/year × 10 years = $15,000
    expect(calculateTotalContributed(5_000, 1_000, 10)).toBe(15_000)
  })

  it('handles zero principal with contributions', () => {
    expect(calculateTotalContributed(0, 2_000, 5)).toBe(10_000)
  })

  it('handles large values', () => {
    expect(calculateTotalContributed(100_000, 12_000, 30)).toBe(460_000)
  })
})

// ─── buildYearRows ────────────────────────────────────────────────────────────

describe('buildYearRows', () => {
  it('returns correct number of rows', () => {
    const rows = buildYearRows(1_000, 0.08, 10, 'annually', 0)
    expect(rows).toHaveLength(10)
  })

  it('first row is year 1', () => {
    const rows = buildYearRows(1_000, 0.08, 10, 'annually', 0)
    expect(rows[0].year).toBe(1)
  })

  it('last row is the final year', () => {
    const rows = buildYearRows(1_000, 0.08, 20, 'annually', 0)
    expect(rows[rows.length - 1].year).toBe(20)
  })

  it('balance increases each year with positive rate', () => {
    const rows = buildYearRows(10_000, 0.07, 10, 'annually', 0)
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i].balance).toBeGreaterThan(rows[i - 1].balance)
    }
  })

  it('totalInterest is never negative', () => {
    const rows = buildYearRows(1_000, 0.05, 10, 'monthly', 100)
    rows.forEach((row) => expect(row.totalInterest).toBeGreaterThanOrEqual(0))
  })

  it('totalContributed increases linearly with annual contributions', () => {
    const rows = buildYearRows(0, 0.08, 5, 'annually', 1_000)
    rows.forEach((row, i) => {
      expect(row.totalContributed).toBeCloseTo(1_000 * (i + 1), 0)
    })
  })

  it('final row balance matches calculateCompoundAmount', () => {
    const rows = buildYearRows(5_000, 0.07, 15, 'monthly', 500)
    const expected = calculateCompoundAmount(5_000, 0.07, 15, 'monthly', 500)
    expect(rows[rows.length - 1].balance).toBeCloseTo(expected, 0)
  })

  it('totalInterest = balance - totalContributed', () => {
    const rows = buildYearRows(2_000, 0.06, 8, 'quarterly', 0)
    rows.forEach((row) => {
      expect(row.totalInterest).toBeCloseTo(row.balance - row.totalContributed, 2)
    })
  })
})

// ─── calculateCompoundInterestResults ────────────────────────────────────────

describe('calculateCompoundInterestResults', () => {
  const defaults = {
    principal: 1_000,
    annualRate: 0.08,
    years: 10,
    compoundFrequency: 'monthly' as const,
    annualContribution: 0,
  }

  it('calculates final amount correctly', () => {
    const result = calculateCompoundInterestResults(defaults)
    const expected = calculateCompoundAmount(1_000, 0.08, 10, 'monthly', 0)
    expect(result.finalAmount).toBeCloseTo(expected, 0)
  })

  it('totalContributed = principal when no annual contributions', () => {
    const result = calculateCompoundInterestResults(defaults)
    expect(result.totalContributed).toBe(1_000)
  })

  it('totalInterest = finalAmount - totalContributed', () => {
    const result = calculateCompoundInterestResults(defaults)
    expect(result.totalInterest).toBeCloseTo(result.finalAmount - result.totalContributed, 0)
  })

  it('doublingTime uses rule of 72', () => {
    const result = calculateCompoundInterestResults(defaults)
    expect(result.doublingTime).toBeCloseTo(9, 1) // 72 / 8 = 9
  })

  it('doublingTime is null when rate is 0', () => {
    const result = calculateCompoundInterestResults({ ...defaults, annualRate: 0 })
    expect(result.doublingTime).toBeNull()
  })

  it('yearRows has correct length', () => {
    const result = calculateCompoundInterestResults(defaults)
    expect(result.yearRows).toHaveLength(10)
  })

  it('includes annual contributions in final amount', () => {
    const withContrib = calculateCompoundInterestResults({ ...defaults, annualContribution: 1_200 })
    const noContrib = calculateCompoundInterestResults(defaults)
    expect(withContrib.finalAmount).toBeGreaterThan(noContrib.finalAmount)
    expect(withContrib.totalContributed).toBe(1_000 + 1_200 * 10)
  })

  it('handles zero principal', () => {
    const result = calculateCompoundInterestResults({ ...defaults, principal: 0, annualContribution: 1_000 })
    expect(result.finalAmount).toBeGreaterThan(0)
    expect(result.totalContributed).toBe(1_000 * 10)
  })

  it('handles large principal', () => {
    const result = calculateCompoundInterestResults({ ...defaults, principal: 1_000_000, years: 30 })
    expect(result.finalAmount).toBeGreaterThan(1_000_000)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('quarterly compounding gives less than monthly for same rate', () => {
    const monthly = calculateCompoundInterestResults(defaults)
    const quarterly = calculateCompoundInterestResults({ ...defaults, compoundFrequency: 'quarterly' })
    expect(monthly.finalAmount).toBeGreaterThan(quarterly.finalAmount)
  })

  it('daily compounding gives more than monthly', () => {
    const daily = calculateCompoundInterestResults({ ...defaults, compoundFrequency: 'daily' })
    const monthly = calculateCompoundInterestResults(defaults)
    expect(daily.finalAmount).toBeGreaterThan(monthly.finalAmount)
  })

  it('30% rate computes without overflow', () => {
    const result = calculateCompoundInterestResults({ ...defaults, annualRate: 0.30, years: 30 })
    expect(result.finalAmount).toBeGreaterThan(0)
    expect(isFinite(result.finalAmount)).toBe(true)
  })

  it('1 year at annual compounding is simple interest times 1 period', () => {
    // $10,000 at 5% annually for 1 year = $10,500
    const result = calculateCompoundInterestResults({
      principal: 10_000, annualRate: 0.05, years: 1, compoundFrequency: 'annually', annualContribution: 0,
    })
    expect(result.finalAmount).toBeCloseTo(10_500, 0)
  })

  it('high annual contribution accumulates correctly', () => {
    const result = calculateCompoundInterestResults({
      principal: 0, annualRate: 0.07, years: 25, compoundFrequency: 'monthly', annualContribution: 12_000,
    })
    expect(result.totalContributed).toBe(12_000 * 25)
    expect(result.finalAmount).toBeGreaterThan(result.totalContributed)
  })
})
