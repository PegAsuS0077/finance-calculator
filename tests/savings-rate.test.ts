// tests/savings-rate.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateSavingsRate,
  calculateFireNumber,
  calculateYearsToFI,
  buildSavingsRateTable,
  calculateSavingsRateResults,
} from '../lib/calculators/savings-rate'

// ─── calculateSavingsRate ──────────────────────────────────────────────────────

describe('calculateSavingsRate', () => {
  it('returns correct savings rate for normal scenario (25%)', () => {
    const rate = calculateSavingsRate(60_000, 45_000)
    expect(rate).toBeCloseTo(0.25, 5)
  })

  it('returns 0 if take-home income is 0', () => {
    expect(calculateSavingsRate(0, 0)).toBe(0)
  })

  it('returns 0 if take-home income is negative', () => {
    expect(calculateSavingsRate(-1, 1000)).toBe(0)
  })

  it('returns negative rate when expenses exceed income', () => {
    const rate = calculateSavingsRate(40_000, 50_000)
    expect(rate).toBeCloseTo(-0.25, 5)
  })

  it('returns 1 when expenses are 0', () => {
    expect(calculateSavingsRate(60_000, 0)).toBeCloseTo(1, 5)
  })

  it('handles minimum boundary income (1000)', () => {
    const rate = calculateSavingsRate(1000, 500)
    expect(rate).toBeCloseTo(0.5, 5)
  })
})

// ─── calculateFireNumber ───────────────────────────────────────────────────────

describe('calculateFireNumber', () => {
  it('returns correct FIRE number with default 4% rate', () => {
    expect(calculateFireNumber(45_000)).toBe(1_125_000)
  })

  it('returns 25× annual expenses with default rate', () => {
    expect(calculateFireNumber(40_000)).toBe(1_000_000)
  })

  it('uses custom withdrawal rate correctly', () => {
    expect(calculateFireNumber(50_000, 0.05)).toBe(1_000_000)
  })

  it('returns Infinity for zero withdrawal rate', () => {
    expect(calculateFireNumber(40_000, 0)).toBe(Infinity)
  })

  it('handles large expenses (maximum boundary)', () => {
    const fireNumber = calculateFireNumber(10_000_000)
    expect(fireNumber).toBe(250_000_000)
  })
})

// ─── calculateYearsToFI ────────────────────────────────────────────────────────

describe('calculateYearsToFI', () => {
  it('calculates years to FI for normal scenario', () => {
    // takeHome=60000, expenses=45000, savings=15000, return=5%, portfolio=0
    // fireNumber=1125000
    const years = calculateYearsToFI(1_125_000, 15_000, 0, 0.05)
    expect(years).toBeGreaterThan(0)
    expect(years).toBeLessThan(100)
  })

  it('returns 0 if portfolio already >= FIRE number', () => {
    expect(calculateYearsToFI(1_000_000, 15_000, 1_000_000, 0.05)).toBe(0)
    expect(calculateYearsToFI(1_000_000, 15_000, 2_000_000, 0.05)).toBe(0)
  })

  it('returns Infinity if annualSavings <= 0', () => {
    expect(calculateYearsToFI(1_000_000, 0, 0, 0.05)).toBe(Infinity)
    expect(calculateYearsToFI(1_000_000, -5000, 0, 0.05)).toBe(Infinity)
  })

  it('uses linear formula when annualReturn is 0', () => {
    const years = calculateYearsToFI(1_000_000, 40_000, 0, 0)
    expect(years).toBeCloseTo(25, 1)
  })

  it('uses linear formula with existing portfolio and 0 return', () => {
    const years = calculateYearsToFI(1_000_000, 40_000, 200_000, 0)
    expect(years).toBeCloseTo(20, 1)
  })

  it('existing portfolio reduces years to FI', () => {
    const yearsNoPortfolio = calculateYearsToFI(1_125_000, 15_000, 0, 0.05)
    const yearsWithPortfolio = calculateYearsToFI(1_125_000, 15_000, 200_000, 0.05)
    expect(yearsWithPortfolio).toBeLessThan(yearsNoPortfolio)
  })

  it('higher return reduces years to FI', () => {
    const yearsLow = calculateYearsToFI(1_125_000, 15_000, 0, 0.03)
    const yearsHigh = calculateYearsToFI(1_125_000, 15_000, 0, 0.10)
    expect(yearsHigh).toBeLessThan(yearsLow)
  })
})

// ─── buildSavingsRateTable ─────────────────────────────────────────────────────

describe('buildSavingsRateTable', () => {
  it('returns exactly 9 rows (10%–90%)', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    expect(rows).toHaveLength(9)
  })

  it('first row is 10% savings rate', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    expect(rows[0].savingsRate).toBeCloseTo(0.10, 5)
  })

  it('last row is 90% savings rate', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    expect(rows[8].savingsRate).toBeCloseTo(0.90, 5)
  })

  it('each row has savingsRate, annualSavings, fireNumber, yearsToFI', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    for (const row of rows) {
      expect(typeof row.savingsRate).toBe('number')
      expect(typeof row.annualSavings).toBe('number')
      expect(typeof row.fireNumber).toBe('number')
      expect(typeof row.yearsToFI).toBe('number')
    }
  })

  it('annualSavings matches savingsRate × takeHomeIncome', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    for (const row of rows) {
      expect(row.annualSavings).toBeCloseTo(60_000 * row.savingsRate, 2)
    }
  })

  it('higher savings rate produces fewer years to FI', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    // 50% rate should have fewer years than 20% rate
    const rate20 = rows.find(r => Math.abs(r.savingsRate - 0.20) < 0.001)!
    const rate50 = rows.find(r => Math.abs(r.savingsRate - 0.50) < 0.001)!
    expect(rate50.yearsToFI).toBeLessThan(rate20.yearsToFI)
  })

  it('caps yearsToFI at 100', () => {
    const rows = buildSavingsRateTable(60_000, 0, 0.05)
    for (const row of rows) {
      expect(row.yearsToFI).toBeLessThanOrEqual(100)
    }
  })
})

// ─── calculateSavingsRateResults ──────────────────────────────────────────────

describe('calculateSavingsRateResults', () => {
  it('normal scenario: takeHome=60000, expenses=45000, return=5%, portfolio=0', () => {
    const results = calculateSavingsRateResults({
      annualGrossIncome: 75_000,
      annualTakeHomeIncome: 60_000,
      annualExpenses: 45_000,
      annualReturn: 0.05,
      currentPortfolio: 0,
    })
    expect(results.savingsRate).toBeCloseTo(0.25, 5)
    expect(results.annualSavings).toBe(15_000)
    expect(results.fireNumber).toBe(1_125_000)
    expect(results.yearsToFI).toBeGreaterThan(0)
    expect(results.yearsToFI).toBeLessThanOrEqual(100)
    expect(results.tableRows).toHaveLength(9)
  })

  it('expense > takeHome → negative savings → yearsToFI capped at 100', () => {
    const results = calculateSavingsRateResults({
      annualGrossIncome: 60_000,
      annualTakeHomeIncome: 40_000,
      annualExpenses: 50_000,
      annualReturn: 0.05,
      currentPortfolio: 0,
    })
    expect(results.annualSavings).toBe(-10_000)
    expect(results.yearsToFI).toBe(100)
  })

  it('portfolio >= FIRE number → yearsToFI = 0', () => {
    const results = calculateSavingsRateResults({
      annualGrossIncome: 75_000,
      annualTakeHomeIncome: 60_000,
      annualExpenses: 45_000,
      annualReturn: 0.05,
      currentPortfolio: 2_000_000, // > fireNumber of 1,125,000
    })
    expect(results.yearsToFI).toBe(0)
  })

  it('minimum income boundary (annualTakeHomeIncome=1000)', () => {
    const results = calculateSavingsRateResults({
      annualGrossIncome: 1000,
      annualTakeHomeIncome: 1000,
      annualExpenses: 1000,
      annualReturn: 0.05,
      currentPortfolio: 0,
    })
    // expenses = takeHome → 0 savings → capped
    expect(results.yearsToFI).toBe(100)
  })

  it('maximum portfolio boundary (100M)', () => {
    const results = calculateSavingsRateResults({
      annualGrossIncome: 75_000,
      annualTakeHomeIncome: 60_000,
      annualExpenses: 45_000,
      annualReturn: 0.05,
      currentPortfolio: 100_000_000,
    })
    // portfolio >> FIRE number → already at FI
    expect(results.yearsToFI).toBe(0)
  })

  it('tableRows have incrementing savings rates 10%–90%', () => {
    const results = calculateSavingsRateResults({
      annualGrossIncome: 75_000,
      annualTakeHomeIncome: 60_000,
      annualExpenses: 45_000,
      annualReturn: 0.05,
      currentPortfolio: 0,
    })
    const expectedRates = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90]
    results.tableRows.forEach((row, i) => {
      expect(row.savingsRate).toBeCloseTo(expectedRates[i], 5)
    })
  })
})
