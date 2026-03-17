# FIRE Tools — Financial Independence Calculator Platform

A high-performance, SEO-focused web application providing interactive FIRE (Financial Independence Retire Early) calculators and educational content.

## What It Does

FIRE Tools gives users a suite of financial calculators to plan their path to financial independence. Key features:

- **Interactive calculators** — live results that update instantly as you type
- **Portfolio growth charts** — visual projections using Recharts
- **Educational content** — 1000+ word MDX pages explaining methodology, examples, and FIRE concepts
- **10 calculators planned** — FIRE number, retirement withdrawal, compound interest, savings rate, and more

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Charts:** Recharts
- **Validation:** Zod
- **Testing:** Vitest
- **Content:** MDX
- **Hosting:** Cloudflare Pages (`@cloudflare/next-on-pages`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/                  # Next.js App Router pages (server components)
components/
  calculators/        # Calculator UI components
  ui/                 # Shared shadcn/ui primitives
lib/
  calculators/        # All financial logic (formulas only here)
  validation/         # Zod input schemas
content/
  tools/              # MDX pages for calculator pages
  blog/               # MDX blog articles
tests/                # Vitest unit tests
docs/                 # Architecture, specs, and workflow docs
```

## Development

See [CLAUDE.md](CLAUDE.md) for full architecture rules and development workflow.

Key docs:
- [docs/calculator-specs.md](docs/calculator-specs.md) — inputs, formulas, outputs for all calculators
- [docs/development-workflow.md](docs/development-workflow.md) — step-by-step workflow
- [docs/tool-roadmap.md](docs/tool-roadmap.md) — calculator priority list and status

## Deployment

Deployed to Cloudflare Pages via `@cloudflare/next-on-pages`.

Build command:
```bash
npx @cloudflare/next-on-pages@1
```
