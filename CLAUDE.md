# CLAUDE.md — AI Development Guidelines for FIRE Tools

This file provides instructions for Claude Code and any AI coding agent working in this repository. Follow all rules strictly to maintain performance, clean architecture, SEO integrity, and maintainable code.

---

## 1. Project Purpose

This repository powers a **FIRE (Financial Independence Retire Early) calculator platform** — a high-performance, SEO-focused web application providing interactive financial calculators and educational content. The goal is to build a long-term traffic asset generating revenue through ads, affiliate links, and future premium tools. All code decisions must serve: fast load times, strong SEO, clean architecture, and accurate calculations.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, App Router |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Charts | Recharts |
| Validation | Zod |
| Testing | Vitest |
| Content | MDX |
| Hosting | Cloudflare Pages + OpenNext adapter |
| Analytics | Google Analytics 4 (`NEXT_PUBLIC_GA_ID`) |
| State (v1) | React useState |

---

## 3. Folder Structure

All code lives inside `finance-calculator/`. Do not create new top-level folders without updating this file.

```
app/                          # Next.js App Router pages (server components by default)
  [calculator-name]/
    page.tsx                  # Server component: metadata + MDX content + calculator embed
  blog/
    [slug]/
      page.tsx
  layout.tsx
  sitemap.ts                  # Every public page must appear here
  robots.ts

components/
  calculators/                # Calculator UI only — NO financial formulas
    fire-calculator.tsx       # Input state + user interactions
    fire-results.tsx          # Display derived values
    fire-chart.tsx            # Recharts visualization
  ui/                         # Shared UI primitives (shadcn/ui base components)

lib/
  calculators/                # ALL financial logic lives here — nowhere else
    fire.ts
  validation/                 # Zod schemas — one per calculator
    fire-schema.ts
  utils/
    format.ts                 # Formatting helpers — use Intl.NumberFormat only
  config.ts                   # Centralised environment variable access

content/
  tools/                      # MDX files for calculator pages (1000+ words each)
    fire-calculator.mdx
  blog/                       # MDX files for blog articles
    what-is-fire.mdx

tests/                        # Vitest unit tests — one file per calculator logic file
  fire.test.ts

docs/                         # Project documentation (see Section 12)
```

---

## 4. Architecture Rules

These are hard constraints. No exceptions.

**Financial Logic**
- Financial formulas MUST live in `lib/calculators/` — NEVER inside components, pages, or MDX files
- UI components MUST import calculation functions from `lib/calculators/`

**Validation**
- Zod validation MUST run on all user inputs before any calculation is called
- Validation schemas live in `lib/validation/` — one schema file per calculator
- Never trust raw input from query parameters, form fields, or URL values

**Environment Variables**
- `process.env` MUST NOT be referenced in any UI component, page, or calculator
- All environment variable access goes through `lib/config.ts`:
  ```ts
  export const config = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
    gaId: process.env.NEXT_PUBLIC_GA_ID!,
  }
  ```
- Environment secrets must never be exposed to the browser

**Rendering**
- Pages are server components by default — do not add `'use client'` to page files
- `'use client'` applies only to interactive calculator components (input state, chart rendering)
- Server components handle: page layout, metadata, MDX rendering, sitemap, robots
- Client components handle: input state, live calculations, chart rendering, UI interactivity

---

## 5. Calculator UX Standards

All calculators must follow the same UX pattern:

**Instant Results**
- Results update immediately as inputs change
- Do NOT add a "Calculate" button — results are always live

**Input Types**
- Text inputs for: current age, annual income, annual expenses, current portfolio value, annual contributions
- Slider + text input (dual control) for: expected return rate, inflation rate, withdrawal rate

**Charts**
- Chart type: portfolio growth projection (Recharts LineChart)
- Must update instantly when inputs change
- Keep rendering lightweight — no heavy animations
- Axes: X = age or year, Y = portfolio value
- Include: projected growth line + FIRE target line

---

## 6. SEO Requirements Per Page

Every calculator page MUST include all of the following sections in order:

1. H1 heading + introductory paragraph
2. Calculator widget (client component embedded in server page)
3. Result explanation (what the numbers mean)
4. How the calculator works (methodology)
5. Example scenarios (2–3 worked examples)
6. FIRE concepts explanation (relevant theory)
7. FAQ section (minimum 5 questions and answers)
8. Related calculators (internal links)
9. Related blog articles (internal links)
10. Disclaimer

**Metadata (required on every page):**
```ts
export const metadata = {
  title: "...",
  description: "...",
  alternates: { canonical: "https://yourdomain.com/[slug]" },
}
```

**Content minimum:** 1000–2000 words per page. Calculator pages must NEVER be tool-only pages with no explanatory content.

---

## 7. Performance Rules

- Default to server components — minimize client components
- Lazy-load Recharts and other heavy components: `const Chart = dynamic(() => import(...), { ssr: false })`
- No formatting libraries — use `Intl.NumberFormat` for all number/currency formatting
- Limit third-party scripts — only Google Analytics 4 is allowed in v1
- Keep JavaScript bundle size small — avoid heavy UI frameworks beyond Tailwind + shadcn/ui
- Avoid unnecessary npm dependencies

---

## 8. Testing Requirements

- Every file in `lib/calculators/` MUST have a corresponding test file in `tests/`
- Run tests with: `npx vitest`
- Each test file must cover:
  - Normal inputs (typical user scenario)
  - Edge cases (zero values, very large numbers)
  - Boundary values (minimum/maximum valid inputs)
- Tests must pass before any feature is considered complete

---

## 9. Allowed Dependencies

Only add a dependency if it is on this list or has been explicitly approved:

| Package | Purpose |
|---|---|
| `zod` | Input validation schemas |
| `recharts` | Chart visualization |
| `vitest` | Unit testing |
| `shadcn/ui` | UI component primitives |
| `@next/mdx` or equivalent | MDX content rendering |
| `@opennextjs/cloudflare` | Cloudflare Pages adapter |

Do NOT add large utility libraries, formatting libraries, or additional UI frameworks.

---

## 10. Development Workflow

When implementing any new calculator, follow this exact order:

1. Write the logic function(s) in `lib/calculators/[name].ts`
2. Write the Zod validation schema in `lib/validation/[name]-schema.ts`
3. Write Vitest unit tests in `tests/[name].test.ts` — all tests must pass before proceeding
4. Build UI components in `components/calculators/` (input, results, chart as separate components)
5. Add the chart component using Recharts (lazy-loaded)
6. Write the MDX content page in `content/tools/[name].mdx` (1000+ words, all 10 SEO sections)
7. Create `app/[name]/page.tsx` with Next.js metadata export and MDX content embed
8. Add internal links to and from related calculators and blog posts
9. Add the page to `app/sitemap.ts`

**File naming conventions:**
- Files: `kebab-case.ts` / `kebab-case.tsx`
- Components: `PascalCase` (exported React components)
- Functions: `camelCase`
- URL slugs: `kebab-case` matching the filename

---

## 11. Constraints for AI Agents

AI coding agents working in this repository MUST NOT:

- Move financial logic into UI component files or page files
- Add dependencies not listed in Section 9 without explicit approval
- Create calculator pages without accompanying MDX explanatory content (1000+ words)
- Reference `process.env` outside of `lib/config.ts`
- Bypass Zod validation before calculations
- Break the folder structure defined in Section 3
- Add `'use client'` to page-level files
- Add backend API routes in v1 (all calculations are client-side)
- Implement monetization features (ads, accounts, premium) in v1

---

## 12. Reference Documentation

All detailed documentation lives in `docs/`. Read the relevant file before starting any major task.

| File | Contents |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Full technical architecture — rendering model, component responsibilities, patterns |
| [docs/calculator-specs.md](docs/calculator-specs.md) | Inputs, formulas, outputs, and chart specs for all 10 calculators |
| [docs/seo-strategy.md](docs/seo-strategy.md) | SEO page layout, URL rules, keyword targets, internal linking strategy |
| [docs/development-workflow.md](docs/development-workflow.md) | Detailed step-by-step workflow, naming conventions, code review checklist |
| [docs/deployment.md](docs/deployment.md) | Cloudflare Pages + OpenNext setup, environment variables, build process |
| [docs/tool-roadmap.md](docs/tool-roadmap.md) | 10 calculator priority list with status tracking |
| [docs/project-overview.md](docs/project-overview.md) | Project vision, goals, monetization plan, blog strategy |
| [docs/content-templates.md](docs/content-templates.md) | Reusable MDX content template for all calculator pages |
| [docs/formula-reference.md](docs/formula-reference.md) | Mathematical reference for all financial formulas used across calculators |
