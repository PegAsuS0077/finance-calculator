// tests/fire.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateFireNumber,
  calculateRealReturn,
  calculateYearsToFire,
  projectPortfolioGrowth,
  calculateFire,
} from '../lib/calculators/fire'

// ─── calculateFireNumber ───────────────────────────────────────────────────

describe('calculateFireNumber', () => {
  it('calculates correctly: $40,000 expenses at 4% = $1,000,000', () => {
    expect(calculateFireNumber(40_000, 0.04)).toBe(1_000_000)
  })

  it('calculates correctly: $60,000 expenses at 3.5% ≈ $1,714,286', () => {
    expect(calculateFireNumber(60_000, 0.035)).toBeCloseTo(1_714_285.71, 0)
  })

  it('calculates with minimum expenses', () => {
    expect(calculateFireNumber(1_000, 0.04)).toBe(25_000)
  })

  it('calculates with maximum valid inputs: $10M expenses at 10% = $100M', () => {
    expect(calculateFireNumber(10_000_000, 0.10)).toBe(100_000_000)
  })

  it('throws when withdrawal rate is zero', () => {
    expect(() => calculateFireNumber(40_000, 0)).toThrow()
  })

  it('calculates correctly with 5% withdrawal rate', () => {
    expect(calculateFireNumber(50_000, 0.05)).toBe(1_000_000)
  })
})

// ─── calculateRealReturn ───────────────────────────────────────────────────

describe('calculateRealReturn', () => {
  it('calculates real return: 7% nominal, 3% inflation ≈ 3.88%', () => {
    expect(calculateRealReturn(0.07, 0.03)).toBeCloseTo(0.0388, 3)
  })

  it('returns nominal return when inflation is 0', () => {
    expect(calculateRealReturn(0.07, 0)).toBeCloseTo(0.07, 5)
  })

  it('returns near-zero when nominal equals inflation', () => {
    expect(calculateRealReturn(0.05, 0.05)).toBeCloseTo(0, 3)
  })

  it('returns negative real return when inflation exceeds nominal return', () => {
    // 3% nominal, 5% inflation → negative real return
    const realReturn = calculateRealReturn(0.03, 0.05)
    expect(realReturn).toBeLessThan(0)
  })
})

// ─── calculateYearsToFire ─────────────────────────────────────────────────

describe('calculateYearsToFire', () => {
  it('returns 0 when portfolio already meets FIRE number', () => {
    expect(calculateYearsToFire(1_000_000, 30_000, 0.04, 1_000_000)).toBe(0)
  })

  it('returns 0 when portfolio exceeds FIRE number', () => {
    expect(calculateYearsToFire(1_500_000, 30_000, 0.04, 1_000_000)).toBe(0)
  })

  it('returns Infinity when no contributions and no real return', () => {
    expect(calculateYearsToFire(0, 0, 0, 1_000_000)).toBe(Infinity)
  })

  it('uses linear formula when real return is 0: $0 portfolio, $50K/yr → 20 years', () => {
    expect(calculateYearsToFire(0, 50_000, 0, 1_000_000)).toBe(20)
  })

  it('calculates years for a standard scenario (rough range check)', () => {
    // $0 portfolio, $30K/yr contributions, 4% real return, $1M target
    const years = calculateYearsToFire(0, 30_000, 0.04, 1_000_000)
    expect(years).toBeGreaterThan(20)
    expect(years).toBeLessThan(40)
  })

  it('fewer years with a higher starting portfolio', () => {
    const yearsNoPortfolio = calculateYearsToFire(0, 30_000, 0.04, 1_000_000)
    const yearsWithPortfolio = calculateYearsToFire(200_000, 30_000, 0.04, 1_000_000)
    expect(yearsWithPortfolio).toBeLessThan(yearsNoPortfolio)
  })

  it('returns Infinity when negative real return and contributions cannot reach target', () => {
    // -2% real return, small contributions — denominator goes negative
    const result = calculateYearsToFire(10_000, 5_000, -0.02, 1_000_000)
    expect(result).toBe(Infinity)
  })
})

// ─── projectPortfolioGrowth ───────────────────────────────────────────────

describe('projectPortfolioGrowth', () => {
  it('returns one point per year from currentAge to maxAge inclusive', () => {
    const points = projectPortfolioGrowth(50_000, 20_000, 0.07, 30, 40)
    expect(points).toHaveLength(11) // ages 30–40 inclusive
  })

  it('first point has age = currentAge and portfolioValue = currentPortfolio', () => {
    const points = projectPortfolioGrowth(50_000, 20_000, 0.07, 30, 35)
    expect(points[0].age).toBe(30)
    expect(points[0].portfolioValue).toBe(50_000)
  })

  it('portfolio grows each year when return > 0 and contributions > 0', () => {
    const points = projectPortfolioGrowth(100_000, 10_000, 0.07, 30, 35)
    for (let i = 1; i < points.length; i++) {
      expect(points[i].portfolioValue).toBeGreaterThan(points[i - 1].portfolioValue)
    }
  })

  it('handles zero contributions — portfolio grows by return rate only', () => {
    const points = projectPortfolioGrowth(100_000, 0, 0.07, 30, 31)
    expect(points[1].portfolioValue).toBeCloseTo(107_000, -2)
  })

  it('handles zero return — portfolio grows by contributions only (linear)', () => {
    const points = projectPortfolioGrowth(100_000, 10_000, 0, 30, 32)
    expect(points[1].portfolioValue).toBe(110_000)
    expect(points[2].portfolioValue).toBe(120_000)
  })
})

// ─── calculateFire (integration) ─────────────────────────────────────────

describe('calculateFire', () => {
  const baseInputs = {
    currentAge: 30,
    currentPortfolio: 50_000,
    annualIncome: 75_000,
    annualExpenses: 40_000,
    annualContributions: 30_000,
    expectedReturn: 0.07,
    inflationRate: 0.03,
    withdrawalRate: 0.04,
  }

  it('FIRE number is $1,000,000 for $40,000 expenses at 4%', () => {
    const result = calculateFire(baseInputs)
    expect(result.fireNumber).toBe(1_000_000)
  })

  it('fireAge is greater than currentAge when not yet FI', () => {
    const result = calculateFire(baseInputs)
    expect(result.fireAge).toBeGreaterThan(30)
  })

  it('remainingGap = FIRE number − portfolio when portfolio < FIRE number', () => {
    const result = calculateFire(baseInputs)
    expect(result.remainingGap).toBe(1_000_000 - 50_000)
  })

  it('remainingGap is 0 and yearsToFire is 0 when portfolio already at FIRE number', () => {
    const result = calculateFire({ ...baseInputs, currentPortfolio: 1_000_000 })
    expect(result.remainingGap).toBe(0)
    expect(result.yearsToFire).toBe(0)
  })

  it('savingsRate = annualContributions / annualIncome', () => {
    const result = calculateFire(baseInputs)
    // 30,000 / 75,000 = 0.4
    expect(result.savingsRate).toBeCloseTo(0.4, 5)
  })

  it('projectionData starts at currentAge', () => {
    const result = calculateFire(baseInputs)
    expect(Array.isArray(result.projectionData)).toBe(true)
    expect(result.projectionData[0].age).toBe(30)
  })

  it('higher contributions → fewer years to FIRE', () => {
    const low = calculateFire({ ...baseInputs, annualContributions: 20_000 })
    const high = calculateFire({ ...baseInputs, annualContributions: 50_000 })
    expect(high.yearsToFire).toBeLessThan(low.yearsToFire)
  })

  it('lower expenses → fewer years to FIRE', () => {
    const highExp = calculateFire({ ...baseInputs, annualExpenses: 60_000 })
    const lowExp = calculateFire({ ...baseInputs, annualExpenses: 30_000 })
    expect(lowExp.yearsToFire).toBeLessThan(highExp.yearsToFire)
  })
})
