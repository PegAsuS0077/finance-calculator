// tests/barista-fire.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateAnnualPortfolioWithdrawal,
  calculateBaristaFireNumber,
  calculateFullFireNumber,
  calculateRealReturn,
  calculateYearsToBaristaFire,
  projectPortfolioGrowth,
  calculateBaristaFire,
} from '../lib/calculators/barista-fire'

// ─── calculateAnnualPortfolioWithdrawal ──────────────────────────────────────

describe('calculateAnnualPortfolioWithdrawal', () => {
  it('returns expenses minus part-time income in basic case', () => {
    expect(calculateAnnualPortfolioWithdrawal(50_000, 15_000)).toBe(35_000)
  })

  it('returns 0 when part-time income equals total expenses', () => {
    expect(calculateAnnualPortfolioWithdrawal(50_000, 50_000)).toBe(0)
  })

  it('returns 0 when part-time income exceeds total expenses', () => {
    expect(calculateAnnualPortfolioWithdrawal(40_000, 50_000)).toBe(0)
  })

  it('returns full expenses when part-time income is zero', () => {
    expect(calculateAnnualPortfolioWithdrawal(50_000, 0)).toBe(50_000)
  })

  it('handles minimum expenses with some part-time income', () => {
    expect(calculateAnnualPortfolioWithdrawal(1_000, 500)).toBe(500)
  })
})

// ─── calculateBaristaFireNumber ──────────────────────────────────────────────

describe('calculateBaristaFireNumber', () => {
  it('returns correct Barista FIRE number for normal case', () => {
    expect(calculateBaristaFireNumber(35_000, 0.04)).toBe(875_000)
  })

  it('returns 0 when annual portfolio withdrawal is 0', () => {
    expect(calculateBaristaFireNumber(0, 0.04)).toBe(0)
  })

  it('handles minimum withdrawal rate of 1%', () => {
    expect(calculateBaristaFireNumber(35_000, 0.01)).toBe(3_500_000)
  })

  it('handles maximum withdrawal rate of 10%', () => {
    expect(calculateBaristaFireNumber(35_000, 0.10)).toBe(350_000)
  })

  it('throws when withdrawal rate is zero', () => {
    expect(() => calculateBaristaFireNumber(35_000, 0)).toThrow('Withdrawal rate must be greater than 0')
  })

  it('throws when withdrawal rate is negative', () => {
    expect(() => calculateBaristaFireNumber(35_000, -0.01)).toThrow('Withdrawal rate must be greater than 0')
  })
})

// ─── calculateFullFireNumber ─────────────────────────────────────────────────

describe('calculateFullFireNumber', () => {
  it('returns correct full FIRE number', () => {
    expect(calculateFullFireNumber(50_000, 0.04)).toBe(1_250_000)
  })

  it('returns 0 for zero expenses', () => {
    expect(calculateFullFireNumber(0, 0.04)).toBe(0)
  })

  it('throws when withdrawal rate is zero', () => {
    expect(() => calculateFullFireNumber(50_000, 0)).toThrow('Withdrawal rate must be greater than 0')
  })

  it('handles 3% withdrawal rate', () => {
    expect(calculateFullFireNumber(50_000, 0.03)).toBeCloseTo(1_666_666.67, 0)
  })
})

// ─── calculateRealReturn ─────────────────────────────────────────────────────

describe('calculateRealReturn', () => {
  it('returns correct real return for 7% nominal, 3% inflation', () => {
    const result = calculateRealReturn(0.07, 0.03)
    expect(result).toBeCloseTo(0.0388, 3)
  })

  it('returns nominal return when inflation is zero', () => {
    expect(calculateRealReturn(0.07, 0)).toBeCloseTo(0.07, 6)
  })

  it('returns approximately 0 when nominal equals inflation', () => {
    expect(calculateRealReturn(0.03, 0.03)).toBeCloseTo(0, 6)
  })

  it('handles high nominal return and low inflation', () => {
    const result = calculateRealReturn(0.12, 0.02)
    expect(result).toBeCloseTo(0.0980, 3)
  })
})

// ─── calculateYearsToBaristaFire ─────────────────────────────────────────────

describe('calculateYearsToBaristaFire', () => {
  it('returns reasonable years for a normal case', () => {
    const realReturn = calculateRealReturn(0.07, 0.03)
    const years = calculateYearsToBaristaFire(0, 20_000, realReturn, 875_000)
    expect(years).toBeGreaterThan(10)
    expect(years).toBeLessThan(50)
  })

  it('returns 0 when portfolio already meets Barista FIRE number', () => {
    expect(calculateYearsToBaristaFire(875_000, 20_000, 0.04, 875_000)).toBe(0)
  })

  it('returns 0 when portfolio exceeds Barista FIRE number', () => {
    expect(calculateYearsToBaristaFire(900_000, 20_000, 0.04, 875_000)).toBe(0)
  })

  it('returns Infinity when real return is zero and no contributions', () => {
    expect(calculateYearsToBaristaFire(0, 0, 0, 875_000)).toBe(Infinity)
  })

  it('returns finite years when real return is zero but contributions exist', () => {
    const years = calculateYearsToBaristaFire(0, 20_000, 0, 875_000)
    expect(years).toBeCloseTo(875_000 / 20_000, 4)
  })

  it('returns Infinity when no contributions and portfolio < target', () => {
    const years = calculateYearsToBaristaFire(0, 0, -0.01, 875_000)
    expect(years).toBe(Infinity)
  })

  it('returns 0 immediately when baristaFireNumber is 0', () => {
    expect(calculateYearsToBaristaFire(0, 20_000, 0.04, 0)).toBe(0)
  })
})

// ─── projectPortfolioGrowth ──────────────────────────────────────────────────

describe('projectPortfolioGrowth', () => {
  it('returns correct number of data points', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 60)
    expect(data.length).toBe(31) // age 30 through 60 inclusive
  })

  it('starts at the correct age and portfolio value', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 60)
    expect(data[0].age).toBe(30)
    expect(data[0].portfolioValue).toBe(10_000)
  })

  it('values increase over time with positive return and contributions', () => {
    const data = projectPortfolioGrowth(10_000, 20_000, 0.07, 30, 50)
    for (let i = 1; i < data.length; i++) {
      expect(data[i].portfolioValue).toBeGreaterThan(data[i - 1].portfolioValue)
    }
  })

  it('handles zero starting portfolio', () => {
    const data = projectPortfolioGrowth(0, 20_000, 0.07, 30, 31)
    expect(data[0].portfolioValue).toBe(0)
    expect(data[1].portfolioValue).toBe(20_000)
  })
})

// ─── calculateBaristaFire (integration) ─────────────────────────────────────

describe('calculateBaristaFire', () => {
  const typicalInputs = {
    currentAge: 35,
    totalExpenses: 50_000,
    partTimeIncome: 15_000,
    expectedReturn: 0.07,
    withdrawalRate: 0.04,
    currentPortfolio: 0,
    annualContributions: 20_000,
    inflationRate: 0.03,
  }

  it('produces a full results object', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results).toHaveProperty('baristaFireNumber')
    expect(results).toHaveProperty('fullFireNumber')
    expect(results).toHaveProperty('annualPortfolioWithdrawal')
    expect(results).toHaveProperty('yearsToFire')
    expect(results).toHaveProperty('fireAge')
    expect(results).toHaveProperty('remainingGap')
    expect(results).toHaveProperty('savingsFromPartTime')
    expect(results).toHaveProperty('projectionData')
  })

  it('baristaFireNumber is less than fullFireNumber', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.baristaFireNumber).toBeLessThan(results.fullFireNumber)
  })

  it('savingsFromPartTime equals fullFireNumber minus baristaFireNumber', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.savingsFromPartTime).toBeCloseTo(
      results.fullFireNumber - results.baristaFireNumber,
      5
    )
  })

  it('annualPortfolioWithdrawal equals expenses minus partTimeIncome', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.annualPortfolioWithdrawal).toBe(
      typicalInputs.totalExpenses - typicalInputs.partTimeIncome
    )
  })

  it('calculates correct baristaFireNumber ($875,000)', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.baristaFireNumber).toBe(875_000)
  })

  it('calculates correct fullFireNumber ($1,250,000)', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.fullFireNumber).toBe(1_250_000)
  })

  it('calculates correct annualPortfolioWithdrawal ($35,000)', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.annualPortfolioWithdrawal).toBe(35_000)
  })

  it('calculates positive yearsToFire', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.yearsToFire).toBeGreaterThan(0)
    expect(results.yearsToFire).toBeLessThan(100)
  })

  it('calculates fireAge = currentAge + yearsToFire (rounded)', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.fireAge).toBe(Math.round(typicalInputs.currentAge + results.yearsToFire))
  })

  it('calculates remainingGap as baristaFireNumber when portfolio is 0', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.remainingGap).toBe(875_000)
  })

  it('calculates zero remainingGap when portfolio exceeds baristaFireNumber', () => {
    const results = calculateBaristaFire({ ...typicalInputs, currentPortfolio: 900_000 })
    expect(results.remainingGap).toBe(0)
  })

  it('projectionData starts at currentAge', () => {
    const results = calculateBaristaFire(typicalInputs)
    expect(results.projectionData[0].age).toBe(typicalInputs.currentAge)
  })

  it('projectionData grows over time', () => {
    const results = calculateBaristaFire(typicalInputs)
    const data = results.projectionData
    expect(data[data.length - 1].portfolioValue).toBeGreaterThan(data[0].portfolioValue)
  })
})

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe('edge cases', () => {
  it('partTimeIncome = 0 behaves like regular FIRE', () => {
    const results = calculateBaristaFire({
      currentAge: 35,
      totalExpenses: 50_000,
      partTimeIncome: 0,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 20_000,
      inflationRate: 0.03,
    })
    expect(results.baristaFireNumber).toBe(1_250_000)
    expect(results.fullFireNumber).toBe(1_250_000)
    expect(results.annualPortfolioWithdrawal).toBe(50_000)
    expect(results.savingsFromPartTime).toBe(0)
  })

  it('partTimeIncome >= totalExpenses results in baristaFireNumber = 0 and yearsToFire = 0', () => {
    const results = calculateBaristaFire({
      currentAge: 35,
      totalExpenses: 50_000,
      partTimeIncome: 50_000,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 20_000,
      inflationRate: 0.03,
    })
    expect(results.baristaFireNumber).toBe(0)
    expect(results.yearsToFire).toBe(0)
    expect(results.annualPortfolioWithdrawal).toBe(0)
  })

  it('returns fireAge as Infinity when FIRE is unreachable', () => {
    const results = calculateBaristaFire({
      currentAge: 35,
      totalExpenses: 50_000,
      partTimeIncome: 15_000,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 0,
      inflationRate: 0.03,
    })
    expect(results.fireAge).toBe(Infinity)
  })
})

// ─── Boundary values ──────────────────────────────────────────────────────────

describe('boundary values', () => {
  it('minimum expenses $1,000 with 4% withdrawal rate gives correct baristaFireNumber', () => {
    const results = calculateBaristaFire({
      currentAge: 35,
      totalExpenses: 1_000,
      partTimeIncome: 0,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 20_000,
      inflationRate: 0.03,
    })
    expect(results.baristaFireNumber).toBe(25_000)
    expect(results.fullFireNumber).toBe(25_000)
  })

  it('maximum part-time income $100,000 with expenses $100,000 gives baristaFireNumber = 0', () => {
    const results = calculateBaristaFire({
      currentAge: 35,
      totalExpenses: 100_000,
      partTimeIncome: 100_000,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 20_000,
      inflationRate: 0.03,
    })
    expect(results.baristaFireNumber).toBe(0)
    expect(results.yearsToFire).toBe(0)
  })

  it('minimum age 18 produces valid results', () => {
    const results = calculateBaristaFire({
      currentAge: 18,
      totalExpenses: 50_000,
      partTimeIncome: 15_000,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 20_000,
      inflationRate: 0.03,
    })
    expect(results.baristaFireNumber).toBe(875_000)
    expect(results.projectionData[0].age).toBe(18)
  })

  it('maximum age 80 with sufficient portfolio produces 0 yearsToFire', () => {
    const results = calculateBaristaFire({
      currentAge: 80,
      totalExpenses: 50_000,
      partTimeIncome: 15_000,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 900_000,
      annualContributions: 10_000,
      inflationRate: 0.03,
    })
    expect(results.yearsToFire).toBe(0)
    expect(results.remainingGap).toBe(0)
  })

  it('savingsFromPartTime is always non-negative', () => {
    const results = calculateBaristaFire({
      currentAge: 35,
      totalExpenses: 50_000,
      partTimeIncome: 60_000,
      expectedReturn: 0.07,
      withdrawalRate: 0.04,
      currentPortfolio: 0,
      annualContributions: 20_000,
      inflationRate: 0.03,
    })
    expect(results.savingsFromPartTime).toBeGreaterThanOrEqual(0)
  })
})
