// tests/lean-fire.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateLeanFireNumber,
  calculateRealReturn,
  calculateYearsToLeanFire,
  projectPortfolioGrowth,
  calculateLeanFire,
} from '../lib/calculators/lean-fire'

// ─── calculateLeanFireNumber ────────────────────────────────────────────────

describe('calculateLeanFireNumber', () => {
  it('returns correct FIRE number with default 4% rate', () => {
    expect(calculateLeanFireNumber(25_000, 0.04)).toBe(625_000)
  })

  it('returns correct FIRE number with 3% withdrawal rate', () => {
    expect(calculateLeanFireNumber(25_000, 0.03)).toBeCloseTo(833_333.33, 0)
  })

  it('returns correct FIRE number with 5% withdrawal rate', () => {
    expect(calculateLeanFireNumber(25_000, 0.05)).toBe(500_000)
  })

  it('returns correct FIRE number for minimum expenses $5,000', () => {
    expect(calculateLeanFireNumber(5_000, 0.04)).toBe(125_000)
  })

  it('returns correct FIRE number for maximum expenses $100,000', () => {
    expect(calculateLeanFireNumber(100_000, 0.04)).toBe(2_500_000)
  })

  it('returns correct FIRE number for zero expenses', () => {
    expect(calculateLeanFireNumber(0, 0.04)).toBe(0)
  })

  it('throws if withdrawal rate is zero', () => {
    expect(() => calculateLeanFireNumber(25_000, 0)).toThrow('Withdrawal rate must be greater than 0')
  })

  it('throws if withdrawal rate is negative', () => {
    expect(() => calculateLeanFireNumber(25_000, -0.01)).toThrow('Withdrawal rate must be greater than 0')
  })

  it('handles very low withdrawal rate (0.001)', () => {
    expect(calculateLeanFireNumber(25_000, 0.001)).toBe(25_000_000)
  })

  it('handles very high withdrawal rate (10%)', () => {
    expect(calculateLeanFireNumber(25_000, 0.10)).toBe(250_000)
  })
})

// ─── calculateRealReturn ─────────────────────────────────────────────────────

describe('calculateRealReturn', () => {
  it('returns correct real return for 7% nominal, 3% inflation', () => {
    const result = calculateRealReturn(0.07, 0.03)
    expect(result).toBeCloseTo(0.0388, 3)
  })

  it('returns correct real return for zero inflation', () => {
    expect(calculateRealReturn(0.07, 0)).toBeCloseTo(0.07, 6)
  })

  it('returns correct real return when nominal equals inflation', () => {
    expect(calculateRealReturn(0.03, 0.03)).toBeCloseTo(0, 6)
  })

  it('handles high nominal return and low inflation', () => {
    const result = calculateRealReturn(0.12, 0.02)
    expect(result).toBeCloseTo(0.0980, 3)
  })
})

// ─── calculateYearsToLeanFire ────────────────────────────────────────────────

describe('calculateYearsToLeanFire', () => {
  it('returns correct years for a normal case', () => {
    const realReturn = calculateRealReturn(0.07, 0.03)
    const years = calculateYearsToLeanFire(0, 30_000, realReturn, 625_000)
    expect(years).toBeGreaterThan(10)
    expect(years).toBeLessThan(30)
  })

  it('returns 0 when portfolio already meets FIRE number', () => {
    expect(calculateYearsToLeanFire(625_000, 30_000, 0.04, 625_000)).toBe(0)
  })

  it('returns 0 when portfolio exceeds FIRE number', () => {
    expect(calculateYearsToLeanFire(700_000, 30_000, 0.04, 625_000)).toBe(0)
  })

  it('returns Infinity when real return is zero and no contributions', () => {
    expect(calculateYearsToLeanFire(0, 0, 0, 625_000)).toBe(Infinity)
  })

  it('returns finite years when real return is zero but contributions exist', () => {
    const years = calculateYearsToLeanFire(0, 30_000, 0, 625_000)
    expect(years).toBeCloseTo(625_000 / 30_000, 4)
  })

  it('returns Infinity when contributions cannot grow portfolio (denominator issue)', () => {
    // Very high FIRE number, negative real return, no contributions
    const years = calculateYearsToLeanFire(0, 0, -0.01, 625_000)
    expect(years).toBe(Infinity)
  })

  it('returns fewer years with higher portfolio starting value', () => {
    const realReturn = calculateRealReturn(0.07, 0.03)
    const years1 = calculateYearsToLeanFire(0, 30_000, realReturn, 625_000)
    const years2 = calculateYearsToLeanFire(100_000, 30_000, realReturn, 625_000)
    expect(years2).toBeLessThan(years1)
  })

  it('returns fewer years with higher contributions', () => {
    const realReturn = calculateRealReturn(0.07, 0.03)
    const years1 = calculateYearsToLeanFire(0, 20_000, realReturn, 625_000)
    const years2 = calculateYearsToLeanFire(0, 40_000, realReturn, 625_000)
    expect(years2).toBeLessThan(years1)
  })
})

// ─── projectPortfolioGrowth ──────────────────────────────────────────────────

describe('projectPortfolioGrowth', () => {
  it('returns correct number of data points', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 60)
    expect(data.length).toBe(31) // age 30 through 60 inclusive
  })

  it('starts at the correct starting portfolio value', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 60)
    expect(data[0].portfolioValue).toBe(10_000)
    expect(data[0].age).toBe(30)
  })

  it('ends at the correct ending age', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 60)
    expect(data[data.length - 1].age).toBe(60)
  })

  it('values increase over time with positive return and contributions', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 50)
    for (let i = 1; i < data.length; i++) {
      expect(data[i].portfolioValue).toBeGreaterThan(data[i - 1].portfolioValue)
    }
  })

  it('returns rounded integer values', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 35)
    data.forEach((point) => {
      expect(Number.isInteger(point.portfolioValue)).toBe(true)
    })
  })

  it('handles zero starting portfolio', () => {
    const data = projectPortfolioGrowth(0, 20_000, 0.07, 30, 31)
    expect(data[0].portfolioValue).toBe(0)
    expect(data[1].portfolioValue).toBe(20_000)
  })

  it('handles zero contributions', () => {
    const data = projectPortfolioGrowth(100_000, 0, 0.07, 30, 31)
    expect(data[1].portfolioValue).toBe(Math.round(100_000 * 1.07))
  })
})

// ─── calculateLeanFire (integration) ────────────────────────────────────────

describe('calculateLeanFire', () => {
  const typicalInputs = {
    currentAge: 30,
    annualLeanExpenses: 25_000,
    currentPortfolio: 0,
    annualContributions: 30_000,
    expectedReturn: 0.07,
    inflationRate: 0.03,
    withdrawalRate: 0.04,
  }

  it('calculates correct leanFireNumber', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.leanFireNumber).toBe(625_000)
  })

  it('calculates correct regularFireNumber (1.5x expenses)', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.regularFireNumber).toBe(937_500)
  })

  it('calculates correct fatFireNumber (2.5x expenses)', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.fatFireNumber).toBe(1_562_500)
  })

  it('calculates positive yearsToFire', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.yearsToFire).toBeGreaterThan(0)
    expect(results.yearsToFire).toBeLessThan(50)
  })

  it('calculates fireAge = currentAge + yearsToFire (rounded)', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.fireAge).toBe(Math.round(typicalInputs.currentAge + results.yearsToFire))
  })

  it('calculates remainingGap as leanFireNumber when portfolio is 0', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.remainingGap).toBe(625_000)
  })

  it('calculates zero remainingGap when portfolio exceeds leanFireNumber', () => {
    const results = calculateLeanFire({ ...typicalInputs, currentPortfolio: 700_000 })
    expect(results.remainingGap).toBe(0)
  })

  it('projectionData is an array', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(Array.isArray(results.projectionData)).toBe(true)
  })

  it('projectionData starts at currentAge', () => {
    const results = calculateLeanFire(typicalInputs)
    expect(results.projectionData[0].age).toBe(typicalInputs.currentAge)
  })

  it('projectionData values grow over time', () => {
    const results = calculateLeanFire(typicalInputs)
    const data = results.projectionData
    expect(data[data.length - 1].portfolioValue).toBeGreaterThan(data[0].portfolioValue)
  })

  it('returns fireAge as Infinity when FIRE is unreachable', () => {
    const results = calculateLeanFire({
      ...typicalInputs,
      annualContributions: 0,
      currentPortfolio: 0,
    })
    expect(results.fireAge).toBe(Infinity)
  })

  it('yearsToFire is 0 when portfolio already meets FIRE number', () => {
    const results = calculateLeanFire({ ...typicalInputs, currentPortfolio: 625_000 })
    expect(results.yearsToFire).toBe(0)
  })
})

// ─── Boundary tests ───────────────────────────────────────────────────────────

describe('boundary values', () => {
  it('minimum expenses $5,000 produces leanFireNumber of $125,000', () => {
    const results = calculateLeanFire({
      currentAge: 30,
      annualLeanExpenses: 5_000,
      currentPortfolio: 0,
      annualContributions: 30_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.leanFireNumber).toBe(125_000)
  })

  it('minimum expenses produces regularFireNumber of $187,500', () => {
    const results = calculateLeanFire({
      currentAge: 30,
      annualLeanExpenses: 5_000,
      currentPortfolio: 0,
      annualContributions: 30_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.regularFireNumber).toBe(187_500)
  })

  it('minimum expenses produces fatFireNumber of $312,500', () => {
    const results = calculateLeanFire({
      currentAge: 30,
      annualLeanExpenses: 5_000,
      currentPortfolio: 0,
      annualContributions: 30_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.fatFireNumber).toBe(312_500)
  })

  it('maximum expenses $100,000 produces leanFireNumber of $2,500,000', () => {
    const results = calculateLeanFire({
      currentAge: 30,
      annualLeanExpenses: 100_000,
      currentPortfolio: 0,
      annualContributions: 30_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.leanFireNumber).toBe(2_500_000)
  })

  it('maximum expenses produces regularFireNumber of $3,750,000', () => {
    const results = calculateLeanFire({
      currentAge: 30,
      annualLeanExpenses: 100_000,
      currentPortfolio: 0,
      annualContributions: 30_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.regularFireNumber).toBe(3_750_000)
  })

  it('maximum expenses produces fatFireNumber of $6,250,000', () => {
    const results = calculateLeanFire({
      currentAge: 30,
      annualLeanExpenses: 100_000,
      currentPortfolio: 0,
      annualContributions: 30_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.fatFireNumber).toBe(6_250_000)
  })

  it('age 80 still produces valid results', () => {
    const results = calculateLeanFire({
      currentAge: 80,
      annualLeanExpenses: 25_000,
      currentPortfolio: 1_000_000,
      annualContributions: 10_000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      withdrawalRate: 0.04,
    })
    expect(results.leanFireNumber).toBe(625_000)
    expect(results.yearsToFire).toBe(0)
    expect(results.remainingGap).toBe(0)
  })
})
