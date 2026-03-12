// tests/fire-number.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateFireNumber,
  monthlySavingsNeeded,
  buildSavingsTable,
  calculateFireNumberResults,
} from '../lib/calculators/fire-number'

// ─── calculateFireNumber ───────────────────────────────────────────────────────

describe('calculateFireNumber', () => {
  it('calculates correctly: $40,000 expenses at 4% = $1,000,000', () => {
    expect(calculateFireNumber(40_000, 0.04)).toBe(1_000_000)
  })

  it('calculates correctly: $40,000 expenses at 3% ≈ $1,333,333', () => {
    expect(calculateFireNumber(40_000, 0.03)).toBeCloseTo(1_333_333.33, 0)
  })

  it('calculates with 5% withdrawal rate: $50,000 → $1,000,000', () => {
    expect(calculateFireNumber(50_000, 0.05)).toBe(1_000_000)
  })

  it('calculates with maximum valid inputs: $10M at 10% = $100M', () => {
    expect(calculateFireNumber(10_000_000, 0.10)).toBe(100_000_000)
  })

  it('calculates with minimum expenses: $1,000 at 4% = $25,000', () => {
    expect(calculateFireNumber(1_000, 0.04)).toBe(25_000)
  })

  it('throws when withdrawal rate is zero', () => {
    expect(() => calculateFireNumber(40_000, 0)).toThrow()
  })

  it('higher withdrawal rate produces lower FIRE number', () => {
    const at4 = calculateFireNumber(40_000, 0.04)
    const at5 = calculateFireNumber(40_000, 0.05)
    expect(at5).toBeLessThan(at4)
  })

  it('higher expenses produce higher FIRE number', () => {
    const low = calculateFireNumber(30_000, 0.04)
    const high = calculateFireNumber(60_000, 0.04)
    expect(high).toBeGreaterThan(low)
  })
})

// ─── monthlySavingsNeeded ─────────────────────────────────────────────────────

describe('monthlySavingsNeeded', () => {
  it('returns a positive number for a valid target and timeline', () => {
    const result = monthlySavingsNeeded(1_000_000, 20, 0.07)
    expect(result).toBeGreaterThan(0)
  })

  it('longer timeline requires less monthly savings', () => {
    const short = monthlySavingsNeeded(1_000_000, 10, 0.07)
    const long = monthlySavingsNeeded(1_000_000, 30, 0.07)
    expect(long).toBeLessThan(short)
  })

  it('higher return requires less monthly savings for same target and timeline', () => {
    const lowReturn = monthlySavingsNeeded(1_000_000, 20, 0.05)
    const highReturn = monthlySavingsNeeded(1_000_000, 20, 0.10)
    expect(highReturn).toBeLessThan(lowReturn)
  })

  it('uses linear formula when return is 0: $120,000 / (10 * 12) = $1,000', () => {
    expect(monthlySavingsNeeded(120_000, 10, 0)).toBeCloseTo(1_000, 0)
  })

  it('result for 20 years at 7% is in plausible range for $1M target', () => {
    // Roughly $2,000 - $3,000 per month
    const result = monthlySavingsNeeded(1_000_000, 20, 0.07)
    expect(result).toBeGreaterThan(1_500)
    expect(result).toBeLessThan(3_500)
  })
})

// ─── buildSavingsTable ────────────────────────────────────────────────────────

describe('buildSavingsTable', () => {
  it('returns 5 rows for the 5 standard timelines', () => {
    const table = buildSavingsTable(1_000_000)
    expect(table).toHaveLength(5)
  })

  it('rows are ordered by timeline: 10, 15, 20, 25, 30 years', () => {
    const table = buildSavingsTable(1_000_000)
    expect(table.map((r) => r.years)).toEqual([10, 15, 20, 25, 30])
  })

  it('monthly savings decreases as timeline increases', () => {
    const table = buildSavingsTable(1_000_000)
    for (let i = 1; i < table.length; i++) {
      expect(table[i].monthlySavingsNeeded).toBeLessThan(table[i - 1].monthlySavingsNeeded)
    }
  })

  it('all monthly savings values are positive integers', () => {
    const table = buildSavingsTable(1_000_000)
    for (const row of table) {
      expect(row.monthlySavingsNeeded).toBeGreaterThan(0)
      expect(Number.isInteger(row.monthlySavingsNeeded)).toBe(true)
    }
  })

  it('larger FIRE number produces larger monthly savings at same timeline', () => {
    const small = buildSavingsTable(500_000)
    const large = buildSavingsTable(2_000_000)
    for (let i = 0; i < 5; i++) {
      expect(large[i].monthlySavingsNeeded).toBeGreaterThan(small[i].monthlySavingsNeeded)
    }
  })
})

// ─── calculateFireNumberResults (integration) ──────────────────────────────────

describe('calculateFireNumberResults', () => {
  const baseInputs = {
    annualExpenses: 40_000,
    withdrawalRate: 0.04,
    isMonthly: false,
  }

  it('fireNumber = $1,000,000 for $40,000 expenses at 4%', () => {
    const result = calculateFireNumberResults(baseInputs)
    expect(result.fireNumber).toBe(1_000_000)
  })

  it('annualWithdrawal = fireNumber * withdrawalRate', () => {
    const result = calculateFireNumberResults(baseInputs)
    expect(result.annualWithdrawal).toBeCloseTo(40_000, 0)
  })

  it('monthlyWithdrawal = annualWithdrawal / 12', () => {
    const result = calculateFireNumberResults(baseInputs)
    expect(result.monthlyWithdrawal).toBeCloseTo(40_000 / 12, 0)
  })

  it('savingsTable has 5 rows', () => {
    const result = calculateFireNumberResults(baseInputs)
    expect(result.savingsTable).toHaveLength(5)
  })

  it('isMonthly=true: $3,333/month → $40,000/year → same FIRE number', () => {
    const monthly = calculateFireNumberResults({ ...baseInputs, annualExpenses: 3_333.33, isMonthly: true })
    // 3333.33 * 12 = 39,999.96 → FIRE ≈ 999,999
    expect(monthly.fireNumber).toBeCloseTo(1_000_000, -3)
  })

  it('isMonthly=false: treats input as annual, no multiplication', () => {
    const annual = calculateFireNumberResults({ annualExpenses: 40_000, withdrawalRate: 0.04, isMonthly: false })
    expect(annual.fireNumber).toBe(1_000_000)
  })

  it('higher withdrawal rate reduces FIRE number', () => {
    const at4 = calculateFireNumberResults(baseInputs)
    const at5 = calculateFireNumberResults({ ...baseInputs, withdrawalRate: 0.05 })
    expect(at5.fireNumber).toBeLessThan(at4.fireNumber)
  })

  it('higher expenses increase FIRE number', () => {
    const low = calculateFireNumberResults({ ...baseInputs, annualExpenses: 30_000 })
    const high = calculateFireNumberResults({ ...baseInputs, annualExpenses: 60_000 })
    expect(high.fireNumber).toBeGreaterThan(low.fireNumber)
  })
})
