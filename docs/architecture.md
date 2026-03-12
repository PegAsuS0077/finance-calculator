# Architecture Guide — FIRE Tools

This document defines the technical architecture and rules for the FIRE Tools project. All contributors and AI coding agents must follow these rules.

---

## Core Principles

The system is designed around five key principles:

1. **SEO-first pages** — content is king; calculators live within rich educational pages
2. **Server-rendered content** — pages default to server components for SEO and performance
3. **Client-side calculators** — all calculation logic runs in the browser; no server round-trips
4. **Separation of logic and UI** — financial formulas never live inside UI components
5. **Minimal runtime dependencies** — only approved libraries; no bloat

---

## Rendering Model

The application uses a **hybrid rendering model**: server-first for content, client-only for interactivity.

### Server Responsibilities

| Responsibility | Where |
|---|---|
| Page layout and shell | `app/[slug]/page.tsx` |
| SEO metadata | `export const metadata` in each page |
| MDX content rendering | Server page imports MDX content |
| Static content delivery | Cloudflare Pages CDN |
| Sitemap generation | `app/sitemap.ts` |
| Robots configuration | `app/robots.ts` |

Server-rendered sections include: article content, H1/H2 headings, explanations, FAQs, related links.

### Client Responsibilities

| Responsibility | Component |
|---|---|
| Calculator input state | `components/calculators/[name]-calculator.tsx` |
| Live calculations | Calls `lib/calculators/` functions on input change |
| Chart rendering | `components/calculators/[name]-chart.tsx` |
| UI interactivity | Any `'use client'` component |

All calculator logic must run client-side. This keeps infrastructure cost low and improves responsiveness.

### Data Flow

```
Server Page (app/[name]/page.tsx)
  └── MDX content (content/tools/[name].mdx)
        └── <CalculatorComponent /> (client component)
              ├── Input state (useState)
              ├── Zod validation (lib/validation/)
              ├── Calculation (lib/calculators/)
              └── Chart (Recharts, lazy-loaded)
```

---

## Component Architecture

Components are organized by **role, not by page**.

```
components/
  calculators/    # Interactive calculator widgets (all 'use client')
  ui/             # Shared UI primitives (shadcn/ui base, can be server or client)
```

### Calculator Components

Each calculator is split into focused components:

| Component | Responsibility |
|---|---|
| `[name]-calculator.tsx` | Input state management, user interactions, validation integration |
| `[name]-results.tsx` | Display derived output values (FIRE number, years to FIRE, retirement age, etc.) |
| `[name]-chart.tsx` | Recharts visualization, lazy-loaded |

**Rule:** Components must never contain financial formulas. They call functions from `lib/calculators/`.

---

## Logic Layer

All financial logic must live in:

```
lib/calculators/
  fire.ts
  coast-fire.ts
  savings-rate.ts
  ...
```

Each file exports pure TypeScript functions. No React, no UI imports, no side effects.

**Example signature:**
```ts
// lib/calculators/fire.ts
export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number
export function calculateYearsToFire(currentPortfolio: number, annualContributions: number, growthRate: number, fireNumber: number): number
export function projectPortfolioGrowth(inputs: FireInputs): ProjectionPoint[]
```

**Rule:** UI components must never contain financial formulas. Import from `lib/calculators/`.

---

## Validation Layer

Input validation is handled with **Zod schemas**.

```
lib/validation/
  fire-schema.ts
  coast-fire-schema.ts
  ...
```

Each schema:
- Validates numeric types
- Enforces realistic input ranges
- Provides typed input objects passed to calculation functions

**Rule:** Validation runs before any calculation. Never call a calculation function with unvalidated input.

**Example:**
```ts
// lib/validation/fire-schema.ts
export const fireSchema = z.object({
  currentAge: z.number().min(18).max(80),
  annualExpenses: z.number().min(1000).max(10_000_000),
  withdrawalRate: z.number().min(0.01).max(0.10),
  // ...
})
export type FireInputs = z.infer<typeof fireSchema>
```

---

## Utility Layer

Reusable formatting helpers:

```
lib/utils/
  format.ts     # Currency, percentage, number formatting
```

**Rule:** Use native JavaScript APIs only. No external formatting libraries.

```ts
// lib/utils/format.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(value)
}
```

---

## Content Architecture

SEO content is written in MDX (Markdown + React components).

```
content/
  tools/          # One MDX file per calculator page
    fire-calculator.mdx
  blog/           # One MDX file per blog article
    what-is-fire.mdx
```

MDX allows embedding React calculator components inside editorial content:

```mdx
## Use the Calculator

<FireCalculator />

## What is a FIRE Number?

Your FIRE number is the total portfolio value you need...
```

This creates pages that combine educational content with interactive tools — which is both good for SEO and good for users.

---

## SEO Architecture

### Page Requirements

Every calculator page must contain (in this order):

1. H1 + introductory paragraph
2. Calculator widget
3. Result explanation
4. How the calculator works
5. Example scenarios
6. FIRE concepts
7. FAQ (5+ questions)
8. Related calculators
9. Related articles
10. Disclaimer

Minimum content: **1000–2000 words**. Calculator pages must never be tool-only.

### Metadata

Defined using the Next.js Metadata API on each page:

```ts
export const metadata: Metadata = {
  title: "FIRE Calculator — Calculate Your Financial Independence Number",
  description: "Use our free FIRE calculator to estimate your financial independence number and years to early retirement.",
  alternates: {
    canonical: "https://yourdomain.com/fire-calculator",
  },
}
```

### Sitemap

Generated at `app/sitemap.ts`. Every public page must appear in the sitemap.

### Robots

Configured at `app/robots.ts`. All pages are crawlable in v1.

---

## Analytics & Environment Variables

### Analytics

Google Analytics 4. Accessed only through `lib/config.ts`.

### Environment Variables

All environment variables are centralized in `lib/config.ts`:

```ts
// lib/config.ts
export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  gaId: process.env.NEXT_PUBLIC_GA_ID!,
}
```

**Rule:** Never reference `process.env` directly in UI components, pages, or MDX files.

**Local development** (`.env.local`):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
```

**Production:** Set in Cloudflare Pages dashboard.

---

## Calculator UX Rules

### Instant Updates

Results update immediately on input change. No "Calculate" button.

### Input Types

| Input | Control Type |
|---|---|
| Age | Text input (number) |
| Income | Text input (currency) |
| Expenses | Text input (currency) |
| Portfolio value | Text input (currency) |
| Contributions | Text input (currency) |
| Return rate | Slider + text input |
| Inflation rate | Slider + text input |
| Withdrawal rate | Slider + text input |

### Chart Design Rules

- Chart library: Recharts
- Visualization: portfolio growth projection
- Must update instantly on input change
- Lightweight — avoid heavy animations
- Always lazy-load: `const Chart = dynamic(() => import(...), { ssr: false })`

---

## Performance Rules

| Rule | Rationale |
|---|---|
| Default to server components | Reduces client JS bundle size |
| Lazy-load Recharts | Large library; not needed on initial paint |
| No formatting libraries | `Intl.NumberFormat` is built-in and sufficient |
| No heavy third-party scripts | Only GA4 allowed in v1 |
| Small JS bundles | Core Web Vitals depend on it |

---

## Security Rules

- All user inputs validated with Zod before any processing
- Never trust: query parameters, form inputs, URL values
- Environment secrets never exposed to the browser
- No API keys in client-side code

---

## Testing Strategy

Unit tests are required for all financial formulas.

```
tests/
  fire.test.ts
  coast-fire.test.ts
  ...
```

**Framework:** Vitest

**Required test coverage per calculator:**
- Normal inputs (representative user scenario)
- Edge cases (zero portfolio, zero contributions, extreme rates)
- Boundary values (min/max valid inputs)

Run: `npx vitest`

---

## Deployment Architecture

| Property | Value |
|---|---|
| Hosting | Cloudflare Pages |
| Adapter | OpenNext (`@opennextjs/cloudflare`) |
| CDN | Cloudflare global edge network |
| Cost | Very low (pay-per-request model) |

Benefits: global edge delivery, low cost, automatic HTTPS, scalability.

See [deployment.md](deployment.md) for full setup guide.

---

## Future Backend Strategy

**v1:** No backend. All calculations run client-side.

**v2+ (future):** Backend may be added for:
- User accounts
- Saved calculation scenarios
- Premium features
- Advanced projections

No backend code should be added until the initial tool set is complete and traffic validates the investment.
