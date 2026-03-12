# FIRE Calculator Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional FIRE Calculator — the core product of the platform — including financial logic, validation, unit tests, UI components, MDX content, and SEO page, following the project architecture exactly.

**Architecture:** Server page renders MDX content and embeds a client-side `FireCalculator` component. All financial formulas live in `lib/calculators/fire.ts`, validated by a Zod schema in `lib/validation/fire-schema.ts`. UI is split into three focused client components: input form, results display, and Recharts chart (lazy-loaded via a wrapper pattern). TDD order is strict: tests are written and confirmed failing before implementation code is written.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Zod, Recharts, Vitest, shadcn/ui (Input, Label, Slider, Card)

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Install | `package.json` | Add zod, recharts, vitest, @vitejs/plugin-react, shadcn/ui deps |
| Create | `lib/config.ts` | Centralised env var access |
| Create | `lib/utils/format.ts` | Currency and percentage formatting via Intl |
| Create | `lib/validation/fire-schema.ts` | Zod schema + FireInputs type |
| Create | `vitest.config.ts` | Vitest configuration |
| Create | `tests/fire.test.ts` | Vitest unit tests — written BEFORE implementation |
| Create | `lib/calculators/fire.ts` | All FIRE financial formulas (pure functions) |
| Create | `components/calculators/fire-results.tsx` | Display output values (FIRE number, years, age, gap) |
| Create | `components/calculators/fire-chart-inner.tsx` | Recharts chart — imports recharts normally, NOT 'use client' |
| Create | `components/calculators/fire-chart.tsx` | Lazy-load wrapper: `dynamic(() => import('./fire-chart-inner'), { ssr: false })` |
| Create | `components/calculators/fire-calculator.tsx` | Input form — state, validation, calls calc functions |
| Create | `content/tools/fire-calculator.mdx` | MDX content page (10 SEO sections, 1500+ words) |
| Create | `app/fire-calculator/page.tsx` | Server page with metadata + MDX content |
| Modify | `app/layout.tsx` | Update site title/description |
| Modify | `app/page.tsx` | Replace boilerplate with basic homepage |
| Create | `app/sitemap.ts` | Sitemap including fire-calculator page |
| Create | `app/robots.ts` | Robots.txt config |
| Modify | `next.config.ts` | Enable MDX via @next/mdx |
| Create | `.env.local` | Local environment variables |

---

## Chunk 1: Foundation — Dependencies, Config, Utilities

### Task 1: Install Required Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install production dependencies**

```bash
cd d:/Websites/finance-calculator
npm install zod recharts
```

Expected: Both packages added to `dependencies` in package.json.

- [ ] **Step 2: Install dev dependencies for testing**

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom
```

Expected: Added to `devDependencies`.

- [ ] **Step 3: Install shadcn/ui CLI and initialize**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

Expected: `components/ui/` folder created, `components.json` added.

- [ ] **Step 4: Add shadcn/ui components**

```bash
npx shadcn@latest add input label slider card
```

Expected: Component files added to `components/ui/`.

- [ ] **Step 5: Verify installs**

```bash
npm run build 2>&1 | head -20
```

Expected: Build succeeds (or only fails on missing content — no dependency errors).

---

### Task 2: Create Environment Config

**Files:**
- Create: `.env.local`
- Create: `lib/config.ts`

- [ ] **Step 1: Create `.env.local`**

Create file `d:/Websites/finance-calculator/.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
```

- [ ] **Step 2: Create `lib/config.ts`**

```ts
// lib/config.ts
export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

---

### Task 3: Create Formatting Utilities

**Files:**
- Create: `lib/utils/format.ts`

- [ ] **Step 1: Create `lib/utils/format.ts`**

```ts
// lib/utils/format.ts

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatCompactCurrency(value: number): string {
  return compactCurrencyFormatter.format(value)
}

export function formatNumber(value: number, decimals = 1): string {
  return value.toFixed(decimals)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

---

## Chunk 2: Calculator Logic and Tests (TDD Order)

### Task 4: Create Zod Validation Schema

**Files:**
- Create: `lib/validation/fire-schema.ts`

- [ ] **Step 1: Create `lib/validation/fire-schema.ts`**

```ts
// lib/validation/fire-schema.ts
import { z } from 'zod'

export const fireSchema = z.object({
  currentAge: z.number().min(18).max(80),
  currentPortfolio: z.number().min(0).max(100_000_000),
  annualIncome: z.number().min(1000).max(10_000_000),
  annualExpenses: z.number().min(1000).max(10_000_000),
  annualContributions: z.number().min(0).max(10_000_000),
  expectedReturn: z.number().min(0.001).max(0.15),   // 0.1% – 15% per spec
  inflationRate: z.number().min(0).max(0.10),         // 0% – 10% per spec
  withdrawalRate: z.number().min(0.01).max(0.10),     // 1% – 10%
})

export type FireInputs = z.infer<typeof fireSchema>
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

---

### Task 5: Configure Vitest and Write Failing Tests

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/fire.test.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 2: Add test scripts to `package.json`**

In `package.json`, add to the `scripts` section:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `tests/fire.test.ts` — write tests BEFORE writing the implementation**

```ts
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
```

- [ ] **Step 4: Run tests — confirm they FAIL (lib/calculators/fire.ts doesn't exist yet)**

```bash
npm test
```

Expected: Tests fail with "Cannot find module '../lib/calculators/fire'" or similar. This is correct — we are in TDD red phase.

---

### Task 6: Write Financial Logic to Make Tests Pass

**Files:**
- Create: `lib/calculators/fire.ts`

- [ ] **Step 1: Create `lib/calculators/fire.ts`**

```ts
// lib/calculators/fire.ts
import type { FireInputs } from '../validation/fire-schema'

export interface ProjectionPoint {
  age: number
  portfolioValue: number
}

export interface FireResults {
  fireNumber: number
  yearsToFire: number
  fireAge: number
  remainingGap: number
  savingsRate: number
  projectionData: ProjectionPoint[]
}

/**
 * FIRE Number = Annual Expenses / Withdrawal Rate
 */
export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return annualExpenses / withdrawalRate
}

/**
 * Real Return = ((1 + nominalReturn) / (1 + inflationRate)) - 1
 */
export function calculateRealReturn(nominalReturn: number, inflationRate: number): number {
  return (1 + nominalReturn) / (1 + inflationRate) - 1
}

/**
 * Years to FIRE using future value of annuity formula, solved for time.
 */
export function calculateYearsToFire(
  currentPortfolio: number,
  annualContributions: number,
  realReturn: number,
  fireNumber: number
): number {
  if (currentPortfolio >= fireNumber) return 0

  if (realReturn === 0) {
    if (annualContributions <= 0) return Infinity
    return (fireNumber - currentPortfolio) / annualContributions
  }

  const r = realReturn
  const numerator = fireNumber * r + annualContributions
  const denominator = currentPortfolio * r + annualContributions

  if (denominator <= 0 || numerator / denominator <= 0) return Infinity

  const years = Math.log(numerator / denominator) / Math.log(1 + r)
  return Math.max(0, years)
}

/**
 * Project portfolio value year by year from currentAge to maxAge.
 */
export function projectPortfolioGrowth(
  currentPortfolio: number,
  annualContributions: number,
  nominalReturn: number,
  currentAge: number,
  maxAge: number
): ProjectionPoint[] {
  const points: ProjectionPoint[] = []
  let portfolio = currentPortfolio

  for (let age = currentAge; age <= maxAge; age++) {
    points.push({ age, portfolioValue: Math.round(portfolio) })
    portfolio = portfolio * (1 + nominalReturn) + annualContributions
  }

  return points
}

/**
 * Main function: calculate all FIRE results from validated inputs.
 */
export function calculateFire(inputs: FireInputs): FireResults {
  const {
    currentAge,
    currentPortfolio,
    annualIncome,
    annualExpenses,
    annualContributions,
    expectedReturn,
    inflationRate,
    withdrawalRate,
  } = inputs

  const fireNumber = calculateFireNumber(annualExpenses, withdrawalRate)
  const realReturn = calculateRealReturn(expectedReturn, inflationRate)
  const yearsToFire = calculateYearsToFire(currentPortfolio, annualContributions, realReturn, fireNumber)

  const fireAge = yearsToFire === Infinity
    ? Infinity
    : Math.round(currentAge + yearsToFire)

  const remainingGap = Math.max(0, fireNumber - currentPortfolio)
  const savingsRate = annualIncome > 0 ? annualContributions / annualIncome : 0

  const projectionYears = yearsToFire === Infinity ? 50 : Math.ceil(yearsToFire) + 10
  const maxAge = Math.min(currentAge + projectionYears, 100)

  const projectionData = projectPortfolioGrowth(
    currentPortfolio,
    annualContributions,
    expectedReturn,
    currentAge,
    maxAge
  )

  return { fireNumber, yearsToFire, fireAge, remainingGap, savingsRate, projectionData }
}
```

- [ ] **Step 2: Run tests — confirm they all PASS**

```bash
npm test
```

Expected: All tests pass (green). If any fail, fix `lib/calculators/fire.ts` until they do — do not change test expectations.

- [ ] **Step 3: Commit**

```bash
git add lib/ tests/ vitest.config.ts package.json package-lock.json
git commit -m "feat: add FIRE calculator logic, validation schema, and unit tests"
```

---

## Chunk 3: UI Components

### Task 7: Create FireResults Component

**Files:**
- Create: `components/calculators/fire-results.tsx`

- [ ] **Step 1: Create `components/calculators/fire-results.tsx`**

```tsx
// components/calculators/fire-results.tsx
'use client'

import type { FireResults } from '@/lib/calculators/fire'
import { formatCurrency, formatNumber } from '@/lib/utils/format'

interface FireResultsProps {
  results: FireResults
}

function ResultCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function FireResults({ results }: FireResultsProps) {
  const { fireNumber, yearsToFire, fireAge, remainingGap } = results

  const yearsDisplay = yearsToFire === Infinity
    ? 'Never (increase savings)'
    : `${formatNumber(yearsToFire, 1)} years`

  const fireAgeDisplay = fireAge === Infinity ? '—' : `Age ${fireAge}`

  const gapDisplay = remainingGap === 0
    ? 'You have reached FIRE!'
    : formatCurrency(remainingGap)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <ResultCard label="FIRE Number" value={formatCurrency(fireNumber)} sub="Total portfolio needed" />
      <ResultCard label="Years to FIRE" value={yearsDisplay} sub="From today" />
      <ResultCard label="FIRE Age" value={fireAgeDisplay} sub="Your retirement age" />
      <ResultCard label="Remaining Gap" value={gapDisplay} sub={remainingGap === 0 ? undefined : 'Still needed'} />
    </div>
  )
}
```

---

### Task 8: Create FireChart Components (Inner + Lazy-Load Wrapper)

**Files:**
- Create: `components/calculators/fire-chart-inner.tsx`
- Create: `components/calculators/fire-chart.tsx`

Recharts must be loaded only on the client. The pattern: a plain inner component imports Recharts normally; a wrapper file uses `dynamic(..., { ssr: false })` to lazy-load the inner component.

- [ ] **Step 1: Create `components/calculators/fire-chart-inner.tsx`**

This file imports Recharts normally (no dynamic). It is NOT directly used by any page — only via the wrapper.

```tsx
// components/calculators/fire-chart-inner.tsx
// This file is lazy-loaded by fire-chart.tsx — do NOT add 'use client' here.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { ProjectionPoint } from '@/lib/calculators/fire'
import { formatCompactCurrency } from '@/lib/utils/format'

interface FireChartInnerProps {
  data: ProjectionPoint[]
  fireNumber: number
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded border bg-background px-3 py-2 shadow text-sm">
      <p className="font-medium">Age {label}</p>
      <p className="text-primary">{formatCompactCurrency(payload[0].value)}</p>
    </div>
  )
}

export default function FireChartInner({ data, fireNumber }: FireChartInnerProps) {
  return (
    <ResponsiveContainer width="100%" height={288}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="age"
          label={{ value: 'Age', position: 'insideBottomRight', offset: -8 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          tick={{ fontSize: 12 }}
          width={72}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={fireNumber}
          stroke="hsl(var(--destructive))"
          strokeDasharray="6 3"
          label={{ value: 'FIRE Target', position: 'right', fontSize: 11 }}
        />
        <Line
          type="monotone"
          dataKey="portfolioValue"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          name="Portfolio Value"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 2: Create `components/calculators/fire-chart.tsx`**

This is the only file the calculator component imports. It lazy-loads the inner chart.

```tsx
// components/calculators/fire-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { ProjectionPoint } from '@/lib/calculators/fire'

const FireChartInner = dynamic(
  () => import('./fire-chart-inner'),
  { ssr: false, loading: () => <div className="h-72 w-full animate-pulse rounded-lg bg-muted" /> }
)

interface FireChartProps {
  data: ProjectionPoint[]
  fireNumber: number
}

export function FireChart({ data, fireNumber }: FireChartProps) {
  return (
    <div
      className="h-72 w-full"
      aria-label="Portfolio growth projection chart showing portfolio value by age"
    >
      <FireChartInner data={data} fireNumber={fireNumber} />
    </div>
  )
}
```

---

### Task 9: Create FireCalculator (Main Input Component)

**Files:**
- Create: `components/calculators/fire-calculator.tsx`

- [ ] **Step 1: Create `components/calculators/fire-calculator.tsx`**

```tsx
// components/calculators/fire-calculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { fireSchema, type FireInputs } from '@/lib/validation/fire-schema'
import { calculateFire } from '@/lib/calculators/fire'
import { FireResults } from './fire-results'
import { FireChart } from './fire-chart'

const DEFAULTS: FireInputs = {
  currentAge: 30,
  currentPortfolio: 50_000,
  annualIncome: 75_000,
  annualExpenses: 40_000,
  annualContributions: 25_000,
  expectedReturn: 0.07,
  inflationRate: 0.03,
  withdrawalRate: 0.04,
}

function NumberInput({
  id, label, value, onChange, min, max, prefix,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min?: number; max?: number; prefix?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={e => onChange(Number(e.target.value))}
          className={prefix ? 'pl-7' : undefined}
        />
      </div>
    </div>
  )
}

function SliderInput({
  id, label, value, onChange, min, max, step, displayValue,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number; displayValue: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-sm font-medium tabular-nums">{displayValue}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{(min * 100).toFixed(0)}%</span>
        <span>{(max * 100).toFixed(0)}%</span>
      </div>
    </div>
  )
}

export function FireCalculator() {
  const [inputs, setInputs] = useState<FireInputs>(DEFAULTS)

  function set<K extends keyof FireInputs>(key: K, value: FireInputs[K]) {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  // Validate inputs with Zod, then run calculations — instant results on every change
  const results = useMemo(() => {
    const parsed = fireSchema.safeParse(inputs)
    if (!parsed.success) return null
    return calculateFire(parsed.data)
  }, [inputs])

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Your Numbers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NumberInput id="currentAge" label="Current Age" value={inputs.currentAge}
            onChange={v => set('currentAge', v)} min={18} max={80} />
          <NumberInput id="annualIncome" label="Annual Income" value={inputs.annualIncome}
            onChange={v => set('annualIncome', v)} prefix="$" min={1000} />
          <NumberInput id="annualExpenses" label="Annual Expenses" value={inputs.annualExpenses}
            onChange={v => set('annualExpenses', v)} prefix="$" min={1000} />
          <NumberInput id="annualContributions" label="Annual Contributions" value={inputs.annualContributions}
            onChange={v => set('annualContributions', v)} prefix="$" min={0} />
          <NumberInput id="currentPortfolio" label="Current Portfolio Value" value={inputs.currentPortfolio}
            onChange={v => set('currentPortfolio', v)} prefix="$" min={0} />

          <div className="sm:col-span-2 lg:col-span-3 grid gap-6 sm:grid-cols-3">
            <SliderInput id="expectedReturn" label="Expected Annual Return"
              value={inputs.expectedReturn} onChange={v => set('expectedReturn', v)}
              min={0.01} max={0.15} step={0.001}
              displayValue={`${(inputs.expectedReturn * 100).toFixed(1)}%`} />
            <SliderInput id="inflationRate" label="Inflation Rate"
              value={inputs.inflationRate} onChange={v => set('inflationRate', v)}
              min={0} max={0.10} step={0.001}
              displayValue={`${(inputs.inflationRate * 100).toFixed(1)}%`} />
            <SliderInput id="withdrawalRate" label="Withdrawal Rate"
              value={inputs.withdrawalRate} onChange={v => set('withdrawalRate', v)}
              min={0.01} max={0.10} step={0.001}
              displayValue={`${(inputs.withdrawalRate * 100).toFixed(1)}%`} />
          </div>
        </div>
      </div>

      {results ? (
        <>
          <FireResults results={results} />
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Portfolio Growth Projection</h2>
            <FireChart data={results.projectionData} fireNumber={results.fireNumber} />
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Enter valid inputs to see your results.</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/
git commit -m "feat: add FireCalculator, FireResults, and FireChart components"
```

---

## Chunk 4: Page, Content, and SEO

### Task 10: Update Root Layout and Homepage

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "FIRE Tools — Free Financial Independence Calculators",
    template: "%s | FIRE Tools",
  },
  description: "Free financial independence calculators for the FIRE movement.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update `app/page.tsx`**

```tsx
// app/page.tsx
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">FIRE Tools</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Free financial independence calculators for the FIRE movement.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href="/fire-calculator" className="rounded-lg border p-6 hover:bg-accent transition-colors">
          <h2 className="font-semibold text-lg">FIRE Calculator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Calculate your FIRE number, years to financial independence, and retirement age.
          </p>
        </Link>
      </div>
    </main>
  )
}
```

---

### Task 11: Create Sitemap and Robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: config.siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${config.siteUrl}/fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  }
}
```

---

### Task 12: Set Up MDX Support

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`

- [ ] **Step 1: Install MDX dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install --save-dev @types/mdx
```

- [ ] **Step 2: Update `next.config.ts`**

```ts
// next.config.ts
import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const withMDX = createMDX({})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
```

- [ ] **Step 3: Verify build still works**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds or fails only on missing content files.

---

### Task 13: Create MDX Content Page

**Files:**
- Create: `content/tools/fire-calculator.mdx`

- [ ] **Step 1: Create `content/tools/fire-calculator.mdx`**

```mdx
import { FireCalculator } from '@/components/calculators/fire-calculator'

# FIRE Calculator: Calculate Your Financial Independence Number

Financial independence is the point at which your investment portfolio generates enough passive income to cover your living expenses — forever. The FIRE calculator below estimates exactly when you'll reach that milestone based on your current savings, annual expenses, and investment return assumptions.

Enter your numbers to calculate your personal FIRE number (the total portfolio you need), your years to financial independence, and a year-by-year portfolio growth projection.

---

## Use the FIRE Calculator

<FireCalculator />

---

## What Do These Results Mean?

### Your FIRE Number

Your FIRE number is the total investment portfolio you need to retire and live off your investments indefinitely. It's calculated by dividing your annual expenses by your chosen withdrawal rate. At the standard 4% withdrawal rate, you need 25 times your annual spending.

For example, if you spend $40,000 per year, your FIRE number is $1,000,000. If you spend $60,000, your FIRE number is $1,500,000.

### Years to Financial Independence

This is how many years it will take for your portfolio to reach your FIRE number, given your current portfolio balance, annual investment contributions, and real (inflation-adjusted) return rate. Reducing expenses or increasing contributions dramatically shortens this timeline.

### FIRE Age

Your FIRE age is the age at which you're projected to reach financial independence. This is simply your current age plus your years to FIRE. It's your earliest possible retirement date under current assumptions.

### Portfolio Growth Chart

The chart shows your projected portfolio value by age (blue line) and your FIRE target (red dashed line). The point where the two lines intersect is your FIRE date. After that intersection, your portfolio continues growing even without further contributions.

---

## How This Calculator Works

The FIRE calculator uses two core formulas.

First, it calculates your FIRE number: your annual expenses divided by your withdrawal rate. The most widely used withdrawal rate is 4%, based on the Trinity Study, which found that a portfolio invested in a mix of stocks and bonds historically sustained a 4% annual withdrawal for at least 30 years.

Second, it projects your portfolio growth using the future value of an annuity formula, which accounts for your starting portfolio, annual contributions, and inflation-adjusted return rate. The calculator uses a real return rate (your nominal return minus inflation) to show projections in today's dollars — meaning the FIRE number and portfolio values are all expressed in current purchasing power.

All calculations run instantly in your browser as you adjust inputs. No data is sent to any server.

---

## Example Scenarios

### Example 1: The Standard FIRE Path

Sarah is 32, has a $75,000 portfolio, earns $90,000/year, and spends $50,000/year. She invests $30,000 annually and assumes 7% nominal returns with 3% inflation.

- **FIRE Number:** $1,250,000
- **Years to FIRE:** approximately 22 years
- **FIRE Age:** 54

Sarah can retire early at 54 by maintaining her current savings rate. Cutting expenses to $40,000/year would reduce her FIRE number to $1,000,000 and shave nearly 5 years off her timeline.

### Example 2: The Aggressive Saver

Marcus is 28, has $20,000 saved, earns $110,000, and lives frugally on $35,000/year. He invests $55,000 annually.

- **FIRE Number:** $875,000
- **Years to FIRE:** approximately 13 years
- **FIRE Age:** 41

By maintaining a high savings rate, Marcus is on track for extreme early retirement at 41 — the classic high-income, low-spending FIRE path.

### Example 3: The Late Starter

Jennifer is 45, has $150,000 saved, spends $55,000/year, and contributes $25,000 annually. She expects 6% nominal returns.

- **FIRE Number:** $1,375,000
- **Years to FIRE:** approximately 20 years
- **FIRE Age:** 65

Jennifer reaches a traditional retirement age but could accelerate the timeline significantly by increasing contributions or reducing spending. Bumping contributions to $40,000/year would bring her FIRE age closer to 60.

---

## Understanding the FIRE Movement

FIRE stands for Financial Independence, Retire Early. The movement gained mainstream attention through blogs like Mr. Money Mustache and books like *Your Money or Your Life*, built around a straightforward idea: save aggressively, invest in low-cost index funds, and retire decades before the traditional age of 65.

### The 4% Safe Withdrawal Rate

The foundation of most FIRE planning is the "4% rule," derived from the Trinity Study (Bengen, 1994). The study found that retirees who withdrew 4% of their initial portfolio annually — adjusting for inflation each year — never ran out of money over a 30-year retirement period when invested in a stock/bond mix.

For longer retirements (40–50+ years, common for early retirees), many FIRE practitioners use a more conservative 3% to 3.5% withdrawal rate to reduce sequence-of-returns risk.

See our [4% Rule Calculator](/4-percent-rule-calculator) to explore how different withdrawal rates affect your portfolio longevity.

### Types of FIRE

**Lean FIRE:** Retiring on a very frugal budget, typically under $40,000/year.

**Fat FIRE:** Retiring with a generous lifestyle budget, typically $100,000/year or more.

**Coast FIRE:** Reaching a point where your investments, left to grow without additional contributions, will reach your FIRE number by traditional retirement age. See our [Coast FIRE Calculator](/coast-fire-calculator).

**Barista FIRE:** A hybrid approach where you semi-retire, covering some expenses with part-time work, and letting a smaller portfolio cover the rest.

---

## Frequently Asked Questions

### What is a FIRE number?

Your FIRE number is the total investment portfolio you need to retire and live off investment returns indefinitely. It equals your annual expenses divided by your safe withdrawal rate. At the popular 4% rule, your FIRE number is 25 times your annual spending. For $50,000 in annual expenses, you need $1,250,000.

### How accurate is this FIRE calculator?

This calculator provides projections based on your inputs and assumes consistent returns. Real investment returns vary year to year. The projections are directionally accurate for planning purposes, but actual results will differ. For a more conservative estimate, use a lower expected return (5–6%) or a lower withdrawal rate (3–3.5%).

### What withdrawal rate should I use?

The 4% rate (SWR) is the most commonly used starting point, supported by historical research. However, if you're planning a retirement lasting 40–50 years, consider using 3% to 3.5% for a more conservative estimate. Use our [4% Rule Calculator](/4-percent-rule-calculator) to explore the impact of different withdrawal rates.

### Does this calculator account for inflation?

Yes. The calculator computes a real (inflation-adjusted) return rate by adjusting your nominal expected return for the inflation rate you enter. This means your FIRE number, years to FIRE, and portfolio projections are all expressed in today's purchasing power.

### What if my income varies?

Enter your best estimate of average annual contributions. If your income varies significantly, run the calculator with a conservative (lower) contributions figure to model a worst-case timeline.

### Should I include home equity in my FIRE number calculation?

Generally, no — unless you plan to downsize or sell your home in retirement. The FIRE number refers to liquid investment assets that generate returns. A paid-off home reduces your expenses but doesn't generate income in the same way.

### What about taxes?

This calculator does not account for taxes on withdrawals. Tax-advantaged accounts (401(k), IRA, Roth) have different withdrawal tax treatments. Consult a financial advisor to model the tax impact on your specific situation.

### How does the savings rate affect my FIRE timeline?

Savings rate has more impact than almost any other variable. Moving from a 20% savings rate to a 50% savings rate can cut your years to FIRE nearly in half. Use our [Savings Rate Calculator](/savings-rate-calculator) to explore the relationship between savings rate and your retirement timeline.

---

## Related Calculators

- [FIRE Number Calculator](/fire-number-calculator) — Focus specifically on calculating your FIRE portfolio target
- [Coast FIRE Calculator](/coast-fire-calculator) — Find out if you can stop contributing and coast to retirement
- [Savings Rate Calculator](/savings-rate-calculator) — See how your savings rate maps to your retirement timeline
- [4% Rule Calculator](/4-percent-rule-calculator) — Calculate safe annual withdrawal amounts from your portfolio
- [Compound Interest Calculator](/compound-interest-calculator) — See how your investments grow through compounding
- [Investment Growth Calculator](/investment-growth-calculator) — Project portfolio growth with regular contributions

---

## Related Articles

- [What is FIRE? Financial Independence Retire Early Explained](/blog/what-is-fire)
- [How to Calculate Your FIRE Number](/blog/how-to-calculate-fire-number)
- [The 4% Rule Explained](/blog/4-percent-rule-explained)

---

## Disclaimer

*This FIRE calculator is provided for educational and informational purposes only. It does not constitute financial, investment, or tax advice. All projections are estimates based on hypothetical scenarios and historical market patterns — actual investment returns vary and past performance does not guarantee future results. Please consult a qualified financial advisor before making investment decisions.*
```

---

### Task 14: Create the Calculator Page

**Files:**
- Create: `app/fire-calculator/page.tsx`

- [ ] **Step 1: Create `app/fire-calculator/page.tsx`**

```tsx
// app/fire-calculator/page.tsx
import type { Metadata } from 'next'
import { config } from '@/lib/config'
import FireCalculatorContent from '@/content/tools/fire-calculator.mdx'

export const metadata: Metadata = {
  title: 'FIRE Calculator — Calculate Your Financial Independence Number',
  description: 'Use our free FIRE calculator to calculate your FIRE number, years to financial independence, and retirement age. Results update instantly.',
  alternates: {
    canonical: `${config.siteUrl}/fire-calculator`,
  },
}

export default function FireCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <FireCalculatorContent />
      </article>
    </main>
  )
}
```

> **Note:** If Next.js doesn't resolve the MDX import as a default export automatically, verify the `@next/mdx` App Router integration in the `@next/mdx` documentation for the correct import pattern. You may need to add an `mdx-components.tsx` file at the root.

---

## Chunk 5: Verification

### Task 15: Full Smoke Test

- [ ] **Step 1: Run all unit tests**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 2: Start development server**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000 with no errors.

- [ ] **Step 3: Verify homepage loads**

Open http://localhost:3000

Expected: Minimal homepage with a link to "/fire-calculator".

- [ ] **Step 4: Verify FIRE Calculator page**

Open http://localhost:3000/fire-calculator

Expected:
- Page loads with H1 heading visible
- Calculator widget renders with all input fields including Annual Income
- Adjusting any input immediately updates results and chart
- Chart renders (may have a brief loading skeleton)
- No JavaScript console errors

- [ ] **Step 5: Verify sitemap**

Open http://localhost:3000/sitemap.xml

Expected: XML sitemap listing `/` and `/fire-calculator`.

- [ ] **Step 6: Verify robots**

Open http://localhost:3000/robots.txt

Expected: `Allow: /` and sitemap URL present.

- [ ] **Step 7: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript or compilation errors.

- [ ] **Step 8: Final commit**

```bash
git add .
git commit -m "feat: implement FIRE calculator page with MDX content, components, and SEO"
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| `Cannot find module 'recharts'` | Not installed | `npm install recharts` |
| Recharts SSR errors | Inner chart loaded on server | Verify `fire-chart.tsx` uses `dynamic(..., { ssr: false })` |
| MDX import not resolving | Wrong next.config.ts | Verify `pageExtensions` includes `mdx` and `withMDX` wraps config |
| Missing `mdx-components.tsx` error | App Router MDX requirement | Create `mdx-components.tsx` at root: `export function useMDXComponents(c) { return c }` |
| Slider not rendering | shadcn/ui Slider not installed | `npx shadcn@latest add slider` |
| TypeScript errors on `@/` paths | Path alias missing | Verify `tsconfig.json` has `"@/*": ["./*"]` |
| Tests not found | Missing vitest.config.ts | Verify config file exists with `test.environment: 'jsdom'` |
| `annualIncome` validation error | Input outside 1000–10M range | Check default value and input field |
