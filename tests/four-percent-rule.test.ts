// tests/four-percent-rule.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateRealReturn,
  calculatePortfolioDuration,
  buildComparisonTable,
  buildDepletionChart,
  calculateFourPercentRuleResults,
} from '../lib/calculators/four-percent-rule'

// ─── calculateRealReturn ──────────────────────────────────────────────────────

describe('calculateRealReturn', () => {
  it('calculates real return with standard inputs', () => {
    // (1.07 / 1.03) - 1 ≈ 0.03883
    const result = calculateRealReturn(0.07, 0.03)
    expect(result).toBeCloseTo(0.03883, 4)
  })

  it('returns ~0 when nominal equals inflation', () => {
    const result = calculateRealReturn(0.03, 0.03)
    expect(result).toBeCloseTo(0, 5)
  })

  it('returns negative when inflation exceeds return', () => {
    const result = calculateRealReturn(0.02, 0.05)
    expect(result).toBeLessThan(0)
  })

  it('returns nominal rate when inflation is 0', () => {
    const result = calculateRealReturn(0.07, 0)
    expect(result).toBeCloseTo(0.07, 5)
  })

  it('handles high nominal return', () => {
    const result = calculateRealReturn(0.12, 0.03)
    expect(result).toBeCloseTo(0.08738, 4)
  })
})

// ─── calculatePortfolioDuration ──────────────────────────────────────────────

describe('calculatePortfolioDuration', () => {
  it('returns null when portfolio generates enough real return to cover withdrawals', () => {
    // $1M at 5% real = $50,000 return. Withdrawal = $40,000 → indefinite
    const result = calculatePortfolioDuration(1_000_000, 40_000, 0.05)
    expect(result).toBeNull()
  })

  it('returns null when real return equals withdrawal rate', () => {
    // $1M at 4% real = $40,000. Withdrawal = $40,000 → exactly balanced
    const result = calculatePortfolioDuration(1_000_000, 40_000, 0.04)
    expect(result).toBeNull()
  })

  it('calculates duration for standard 4% withdrawal with 2% real return', () => {
    // $1M, $40K withdrawal, 2% real return → should be ~35+ years
    const result = calculatePortfolioDuration(1_000_000, 40_000, 0.02)
    expect(result).not.toBeNull()
    expect(result!).toBeGreaterThan(30)
  })

  it('gives shorter duration at higher withdrawal rate', () => {
    const low = calculatePortfolioDuration(1_000_000, 40_000, 0.01)
    const high = calculatePortfolioDuration(1_000_000, 60_000, 0.01)
    expect(low).not.toBeNull()
    expect(high).not.toBeNull()
    expect(low!).toBeGreaterThan(high!)
  })

  it('returns null for zero withdrawal', () => {
    const result = calculatePortfolioDuration(1_000_000, 0, 0.04)
    expect(result).toBeNull()
  })

  it('handles zero real return — duration = portfolio / withdrawal', () => {
    // $500K / $25K = 20 years
    const result = calculatePortfolioDuration(500_000, 25_000, 0)
    expect(result).toBeCloseTo(20, 1)
  })

  it('handles negative real return (portfolio shrinks + withdrawals)', () => {
    const result = calculatePortfolioDuration(1_000_000, 50_000, -0.02)
    expect(result).not.toBeNull()
    expect(result!).toBeGreaterThan(0)
    expect(result!).toBeLessThan(30)
  })

  it('duration is approximately 25 years for $1M, 4% withdrawal, 0% real return', () => {
    // $1M / $40K = 25 years
    const result = calculatePortfolioDuration(1_000_000, 40_000, 0)
    expect(result).toBeCloseTo(25, 1)
  })
})

// ─── buildComparisonTable ─────────────────────────────────────────────────────

describe('buildComparisonTable', () => {
  const table = buildComparisonTable(1_000_000, 0.02)

  it('returns 5 rows', () => {
    expect(table).toHaveLength(5)
  })

  it('has rates 3%, 3.5%, 4%, 4.5%, 5%', () => {
    const rates = table.map((r) => r.rate)
    expect(rates).toEqual([0.03, 0.035, 0.04, 0.045, 0.05])
  })

  it('calculates annual withdrawal correctly', () => {
    // $1M × 4% = $40,000
    const row4pct = table.find((r) => r.rate === 0.04)!
    expect(row4pct.annualWithdrawal).toBeCloseTo(40_000)
  })

  it('calculates monthly withdrawal as annual / 12', () => {
    table.forEach((row) => {
      expect(row.monthlyWithdrawal).toBeCloseTo(row.annualWithdrawal / 12, 2)
    })
  })

  it('marks lower withdrawal rates as safer', () => {
    const row3 = table.find((r) => r.rate === 0.03)!
    const row5 = table.find((r) => r.rate === 0.05)!
    // At 2% real return, 3% should last much longer than 5%
    if (row3.portfolioDuration !== null && row5.portfolioDuration !== null) {
      expect(row3.portfolioDuration).toBeGreaterThan(row5.portfolioDuration)
    }
  })

  it('lower rates have isSafe = true with positive real return', () => {
    const row3 = table.find((r) => r.rate === 0.03)!
    expect(row3.isSafe).toBe(true)
  })

  it('annual withdrawal is proportional to withdrawal rate', () => {
    const row3 = table.find((r) => r.rate === 0.03)!
    const row6 = table.find((r) => r.rate === 0.05)!
    expect(row6.annualWithdrawal / row3.annualWithdrawal).toBeCloseTo(5 / 3, 3)
  })
})

// ─── buildDepletionChart ──────────────────────────────────────────────────────

describe('buildDepletionChart', () => {
  it('starts at year 0 with full portfolio for all rates', () => {
    const chart = buildDepletionChart(1_000_000, 0.02, 50)
    const year0 = chart[0]
    expect(year0.year).toBe(0)
    expect(year0.balance3pct).toBeCloseTo(1_000_000)
    expect(year0.balance4pct).toBeCloseTo(1_000_000)
    expect(year0.balance5pct).toBeCloseTo(1_000_000)
  })

  it('balances decrease over time for positive real return, positive withdrawal', () => {
    const chart = buildDepletionChart(1_000_000, 0.01, 50)
    const year10 = chart[10]
    expect(year10.balance5pct!).toBeLessThan(1_000_000)
  })

  it('3% withdrawal lasts longer than 5% withdrawal', () => {
    const chart = buildDepletionChart(500_000, -0.01, 50)
    const lastYear = chart[chart.length - 1]
    // At some point 5% depletes before 3%
    const depleted5 = chart.findIndex((r) => r.balance5pct === null || r.balance5pct === 0)
    const depleted3 = chart.findIndex((r) => r.balance3pct === null || r.balance3pct === 0)
    if (depleted5 > 0 && depleted3 > 0) {
      expect(depleted3).toBeGreaterThan(depleted5)
    }
    // just verify chart has entries
    expect(chart.length).toBeGreaterThan(1)
    expect(lastYear).toBeDefined()
  })

  it('respects maxYears parameter', () => {
    const chart = buildDepletionChart(1_000_000, 0.05, 30)
    // Year 0 + up to 30 years = at most 31 entries
    expect(chart.length).toBeLessThanOrEqual(31)
  })

  it('balance is never negative (clamped to 0/null)', () => {
    const chart = buildDepletionChart(100_000, -0.05, 50)
    chart.forEach((row) => {
      if (row.balance3pct !== null) expect(row.balance3pct).toBeGreaterThanOrEqual(0)
      if (row.balance4pct !== null) expect(row.balance4pct).toBeGreaterThanOrEqual(0)
      if (row.balance5pct !== null) expect(row.balance5pct).toBeGreaterThanOrEqual(0)
    })
  })

  it('higher real return keeps balance higher longer', () => {
    const chartLow = buildDepletionChart(1_000_000, 0.0, 40)
    const chartHigh = buildDepletionChart(1_000_000, 0.04, 40)
    // At year 20, high return portfolio should be worth more
    const y20Low = chartLow[20]?.balance4pct ?? 0
    const y20High = chartHigh[20]?.balance4pct ?? 0
    expect(y20High).toBeGreaterThan(y20Low)
  })
})

// ─── calculateFourPercentRuleResults ─────────────────────────────────────────

describe('calculateFourPercentRuleResults', () => {
  const defaults = {
    portfolioValue: 1_000_000,
    withdrawalRate: 0.04,
    annualReturn: 0.05,
    inflationRate: 0.03,
  }

  it('calculates annual withdrawal correctly', () => {
    const result = calculateFourPercentRuleResults(defaults)
    expect(result.annualWithdrawal).toBeCloseTo(40_000)
  })

  it('calculates monthly withdrawal as annual / 12', () => {
    const result = calculateFourPercentRuleResults(defaults)
    expect(result.monthlyWithdrawal).toBeCloseTo(40_000 / 12, 2)
  })

  it('calculates real return rate', () => {
    const result = calculateFourPercentRuleResults(defaults)
    // (1.05 / 1.03) - 1 ≈ 0.01942
    expect(result.realReturnRate).toBeCloseTo(0.01942, 3)
  })

  it('marks as safe when portfolio lasts 30+ years', () => {
    // At ~2% real return, $1M, $40K withdrawal — should last > 30 years
    const result = calculateFourPercentRuleResults(defaults)
    if (result.portfolioDuration !== null) {
      expect(result.portfolioDuration).toBeGreaterThan(30)
    }
    expect(result.isSafe).toBe(true)
  })

  it('marks as unsafe at very high withdrawal rate', () => {
    const result = calculateFourPercentRuleResults({
      ...defaults,
      withdrawalRate: 0.10,
      annualReturn: 0.03,
      inflationRate: 0.03,
    })
    // 0% real return, 10% withdrawal → $1M / $100K = 10 years — unsafe
    expect(result.isSafe).toBe(false)
    expect(result.portfolioDuration).not.toBeNull()
    expect(result.portfolioDuration!).toBeLessThan(30)
  })

  it('returns comparison table with 5 rows', () => {
    const result = calculateFourPercentRuleResults(defaults)
    expect(result.comparisonTable).toHaveLength(5)
  })

  it('returns depletion chart starting at year 0', () => {
    const result = calculateFourPercentRuleResults(defaults)
    expect(result.depletionChart[0].year).toBe(0)
    expect(result.depletionChart[0].balance4pct).toBeCloseTo(1_000_000)
  })

  it('handles small portfolio', () => {
    const result = calculateFourPercentRuleResults({
      portfolioValue: 50_000,
      withdrawalRate: 0.04,
      annualReturn: 0.05,
      inflationRate: 0.03,
    })
    expect(result.annualWithdrawal).toBeCloseTo(2_000)
    expect(result.monthlyWithdrawal).toBeCloseTo(2_000 / 12, 2)
  })

  it('handles large portfolio', () => {
    const result = calculateFourPercentRuleResults({
      portfolioValue: 10_000_000,
      withdrawalRate: 0.04,
      annualReturn: 0.07,
      inflationRate: 0.03,
    })
    expect(result.annualWithdrawal).toBeCloseTo(400_000)
    expect(result.isSafe).toBe(true)
  })

  it('returns null duration when real return > withdrawal rate (portfolio grows forever)', () => {
    // 7% return, 3% inflation → ~3.88% real return. 3% withdrawal rate → indefinite
    const result = calculateFourPercentRuleResults({
      portfolioValue: 1_000_000,
      withdrawalRate: 0.03,
      annualReturn: 0.07,
      inflationRate: 0.03,
    })
    expect(result.portfolioDuration).toBeNull()
    expect(result.isSafe).toBe(true)
  })

  it('comparisonTable annual withdrawals are proportional to rates', () => {
    const result = calculateFourPercentRuleResults(defaults)
    const row3 = result.comparisonTable.find((r) => r.rate === 0.03)!
    const row5 = result.comparisonTable.find((r) => r.rate === 0.05)!
    expect(row5.annualWithdrawal / row3.annualWithdrawal).toBeCloseTo(5 / 3, 3)
  })

  it('zero inflation — real return equals nominal', () => {
    const result = calculateFourPercentRuleResults({
      portfolioValue: 1_000_000,
      withdrawalRate: 0.04,
      annualReturn: 0.07,
      inflationRate: 0,
    })
    expect(result.realReturnRate).toBeCloseTo(0.07, 4)
    expect(result.isSafe).toBe(true)
  })
})
