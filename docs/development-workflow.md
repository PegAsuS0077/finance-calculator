# Development Workflow — FIRE Tools

This document defines the step-by-step process for adding any new calculator, naming conventions, code review checklist, and common mistakes to avoid.

---

## Calculator Build Priority Order

Build calculators in this sequence. Each one depends on patterns established by the previous.

| Priority | Calculator | URL Slug | Reason |
|---|---|---|---|
| 1 | FIRE Calculator | `/fire-calculator` | Core product, establishes all patterns |
| 2 | FIRE Number Calculator | `/fire-number-calculator` | Simpler, high search volume |
| 3 | Coast FIRE Calculator | `/coast-fire-calculator` | Popular FIRE variant, distinct formula |
| 4 | Savings Rate Calculator | `/savings-rate-calculator` | Foundational to FIRE planning |
| 5 | 4% Rule Calculator | `/4-percent-rule-calculator` | High search intent, distinct page |
| 6 | Compound Interest Calculator | `/compound-interest-calculator` | Broad appeal beyond FIRE audience |
| 7 | Investment Growth Calculator | `/investment-growth-calculator` | Similar to compound interest |
| 8 | Retirement Timeline Calculator | `/retirement-timeline-calculator` | More complex output |
| 9 | Lean FIRE Calculator | `/lean-fire-calculator` | Variant of FIRE calculator |
| 10 | Barista FIRE Calculator | `/barista-fire-calculator` | Most niche, builds on FIRE calculator |

---

## Step-by-Step: Adding a New Calculator

Follow this exact order. Do not skip steps or reorder them.

### Step 1 — Write Logic (`lib/calculators/`)

Create `lib/calculators/[name].ts`.

Requirements:
- Pure TypeScript functions — no React, no imports from components
- Each function takes typed inputs, returns typed outputs
- Export named functions (not default exports)
- Document complex formulas with inline comments

```ts
// lib/calculators/fire.ts
import type { FireInputs } from '../validation/fire-schema'

export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number {
  return annualExpenses / withdrawalRate
}

export function calculateYearsToFire(inputs: FireInputs): number {
  // ...
}

export function projectPortfolioGrowth(inputs: FireInputs): ProjectionPoint[] {
  // ...
}
```

### Step 2 — Write Validation Schema (`lib/validation/`)

Create `lib/validation/[name]-schema.ts`.

Requirements:
- One Zod schema per calculator
- Export the schema and the inferred TypeScript type
- Enforce realistic input ranges (not just type safety)
- All inputs must be validated — no raw values pass through

```ts
// lib/validation/fire-schema.ts
import { z } from 'zod'

export const fireSchema = z.object({
  currentAge: z.number().min(18).max(80),
  annualExpenses: z.number().min(1000).max(10_000_000),
  withdrawalRate: z.number().min(0.01).max(0.10),
  // ...
})

export type FireInputs = z.infer<typeof fireSchema>
```

### Step 3 — Write Unit Tests (`tests/`)

Create `tests/[name].test.ts`.

Requirements:
- Test every exported function from `lib/calculators/[name].ts`
- All tests must pass before proceeding to Step 4
- Cover three categories:

```ts
// tests/fire.test.ts
import { describe, it, expect } from 'vitest'
import { calculateFireNumber } from '../lib/calculators/fire'

describe('calculateFireNumber', () => {
  it('calculates correctly with standard inputs', () => {
    expect(calculateFireNumber(40000, 0.04)).toBe(1_000_000)
  })

  it('handles zero withdrawal rate (edge case)', () => {
    expect(() => calculateFireNumber(40000, 0)).toThrow()
  })

  it('works with minimum valid inputs', () => {
    expect(calculateFireNumber(1000, 0.01)).toBe(100_000)
  })
})
```

Run: `npx vitest`

### Step 4 — Build UI Components (`components/calculators/`)

Create three components:
- `components/calculators/[name]-calculator.tsx` — input form
- `components/calculators/[name]-results.tsx` — output display
- `components/calculators/[name]-chart.tsx` — Recharts visualization

All three must have `'use client'` at the top.

Requirements:
- Input component manages state with `useState`
- Runs Zod validation on input change; shows inline errors
- Passes validated inputs to calculation functions
- Passes results to results and chart components
- No financial formulas in any component — import from `lib/calculators/`

### Step 5 — Add Chart Component

In `[name]-chart.tsx`:

```tsx
'use client'
import dynamic from 'next/dynamic'
const { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } = dynamic(
  () => import('recharts'),
  { ssr: false }
)
```

- Lazy-load Recharts with `dynamic` and `ssr: false`
- Chart updates on every prop change (no internal state for chart data)
- No heavy animations (`isAnimationActive={false}`)
- Keep axis labels readable and currency-formatted

### Step 6 — Write MDX Content (`content/tools/`)

Create `content/tools/[name].mdx`.

Requirements:
- Follow the 10-section SEO layout (see [seo-strategy.md](seo-strategy.md))
- Target 1500 words minimum
- Include the calculator component: `<NameCalculator />`
- Write 5–10 FAQ questions
- Include 4–6 related calculator links
- Include 2–4 related blog article links

### Step 7 — Create Page File (`app/[name]/`)

Create `app/[name]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { FireCalculatorContent } from '../../content/tools/fire-calculator.mdx'

export const metadata: Metadata = {
  title: 'FIRE Calculator — Free Financial Independence Calculator',
  description: 'Use our free FIRE calculator to calculate your financial independence number and estimated years to early retirement.',
  alternates: {
    canonical: 'https://yourdomain.com/fire-calculator',
  },
}

export default function FireCalculatorPage() {
  return <FireCalculatorContent />
}
```

Note: Exact MDX import pattern depends on the MDX setup. Use `@next/mdx` or equivalent.

### Step 8 — Add Internal Links

After creating the page:
- Add links to this calculator from 4–6 existing calculator pages (in their "Related Calculators" section)
- Add links to relevant blog articles from this calculator page
- Add links back to this calculator from those blog articles

Update the MDX files for each cross-linked page.

### Step 9 — Add to Sitemap

In `app/sitemap.ts`, add the new page:

```ts
{ url: `${config.siteUrl}/fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
```

---

## File Naming Conventions

| What | Convention | Example |
|---|---|---|
| Calculator logic file | `kebab-case.ts` | `fire.ts`, `coast-fire.ts` |
| Validation schema file | `kebab-case-schema.ts` | `fire-schema.ts` |
| Test file | `kebab-case.test.ts` | `fire.test.ts` |
| UI component file | `kebab-case.tsx` | `fire-calculator.tsx` |
| MDX content file | `kebab-case.mdx` | `fire-calculator.mdx` |
| App route folder | `kebab-case/` | `fire-calculator/` |
| React component name | `PascalCase` | `FireCalculator`, `FireResults` |
| Function names | `camelCase` | `calculateFireNumber`, `projectPortfolioGrowth` |
| Zod schema names | `camelCase + Schema` | `fireSchema`, `coastFireSchema` |
| TypeScript type names | `PascalCase` | `FireInputs`, `ProjectionPoint` |
| Constants | `SCREAMING_SNAKE_CASE` | `DEFAULT_WITHDRAWAL_RATE` |

---

## Code Review Checklist

Before considering any calculator "done", verify each item:

**Logic Layer**
- [ ] All financial formulas are in `lib/calculators/[name].ts`
- [ ] No formulas exist in component files
- [ ] Functions are pure (no side effects, no imports from React)

**Validation**
- [ ] Zod schema exists in `lib/validation/[name]-schema.ts`
- [ ] Schema validates all inputs with realistic ranges
- [ ] Schema is used in the UI component before calculations

**Tests**
- [ ] Test file exists at `tests/[name].test.ts`
- [ ] Normal scenario test passes
- [ ] Edge case tests pass
- [ ] `npx vitest` exits with no failures

**Components**
- [ ] All calculator components have `'use client'`
- [ ] No `'use client'` on page file
- [ ] Recharts is lazy-loaded with `dynamic`
- [ ] Results update instantly (no calculate button)

**Content**
- [ ] MDX file exists at `content/tools/[name].mdx`
- [ ] All 10 SEO sections are present
- [ ] Word count is 1000+ words
- [ ] FAQ has 5+ questions

**Page & SEO**
- [ ] Page file exists at `app/[name]/page.tsx`
- [ ] `metadata` export has title, description, and canonical URL
- [ ] Page is added to `app/sitemap.ts`
- [ ] Related calculators section has 4+ links
- [ ] Related articles section has 2+ links

**Cross-links**
- [ ] At least 3 existing pages link to this new calculator
- [ ] At least 1 blog article links to this calculator

**Environment**
- [ ] No `process.env` in UI components
- [ ] All env access goes through `lib/config.ts`

---

## Adding Blog Posts

When creating a new blog article:

1. Create `content/blog/[slug].mdx`
2. Create `app/blog/[slug]/page.tsx` with metadata
3. Add to `app/sitemap.ts`
4. Link to 2–3 relevant calculators from within the article body
5. Add a link to this article from relevant calculator pages (in their "Related Articles" section)

Blog post metadata example:
```ts
export const metadata: Metadata = {
  title: 'What is FIRE? Financial Independence Retire Early Explained',
  description: 'Learn what FIRE means, how to calculate your FIRE number, and the steps to achieve financial independence.',
  alternates: { canonical: 'https://yourdomain.com/blog/what-is-fire' },
}
```

---

## Common Mistakes to Avoid

| Mistake | How to Avoid |
|---|---|
| Financial formulas in UI components | Always import from `lib/calculators/` |
| Calling calculations without validation | Run `schema.parse()` or `schema.safeParse()` first |
| `process.env` in components | Use `config` object from `lib/config.ts` |
| `'use client'` on page files | Only on interactive components |
| Recharts not lazy-loaded | Always use `dynamic(() => import('recharts'), { ssr: false })` |
| Calculator page with no MDX content | Never — content is mandatory |
| Missing sitemap entry | Always add to `app/sitemap.ts` |
| No cross-links to/from new page | Always update related pages after adding a new calculator |
| Missing tests | Tests are required — no skipping |
| Large unapproved dependencies | Check CLAUDE.md Section 9 before installing |

---

## Running the Development Environment

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run unit tests
npx vitest

# Run tests once (CI mode)
npx vitest run

# Build for production
npm run build

# Lint
npm run lint
```
