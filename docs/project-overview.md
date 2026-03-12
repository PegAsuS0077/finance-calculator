# Project Overview — FIRE Tools

## Project Vision

FIRE Tools is a **high-quality financial independence calculator platform** focused on the FIRE (Financial Independence Retire Early) movement. The site provides:

- Interactive financial calculators
- SEO-optimized educational content
- Internal tool clusters for organic search traffic
- A fast, lightweight user experience

The project is designed as a **long-term traffic asset** — not just a set of tools, but a content destination that ranks on Google for high-intent financial independence keywords and converts that traffic into revenue.

---

## Target Audience

- People planning for early retirement (FIRE community)
- Working professionals calculating their savings rate and investment timeline
- Beginners learning about financial independence concepts
- People searching for "FIRE calculator", "4% rule calculator", "coast FIRE calculator" etc.

---

## Core Goals

Every decision in this project is guided by five principles:

1. **Speed first** — pages must be fast; Core Web Vitals must be green
2. **SEO-first page structure** — calculators exist within rich educational content, not standalone
3. **Tool + educational content** — each page combines an interactive tool with 1000–2000 words of content
4. **Clean architecture** — maintainable, well-structured code that scales
5. **Minimal dependencies** — lean codebase that stays fast and easy to maintain

---

## Technology Stack (Summary)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 (App Router) | SEO-friendly, server components, best-in-class React framework |
| Hosting | Cloudflare Pages + OpenNext | Global CDN, very low cost, excellent performance |
| Styling | Tailwind CSS v4 | Utility-first, no runtime, works perfectly with server components |
| UI | shadcn/ui | Accessible, unstyled base components, no bundle bloat |
| Charts | Recharts | Lightweight, React-native charting library |
| Content | MDX | Combine Markdown articles with React calculator components |
| Validation | Zod | Type-safe input validation, integrates with TypeScript |
| Testing | Vitest | Fast unit testing for financial formulas |
| State | React useState (v1) | Simple and sufficient for calculator inputs; Zustand as future upgrade |

See [architecture.md](architecture.md) for full technical details.

---

## Monetization Plan

Monetization will be introduced gradually. No monetization features exist in v1 — the focus is on building traffic and user trust first.

### Phase 1 — Build Traffic (Current)
- No ads, no affiliate links
- Focus: SEO rankings, user trust, high-quality tools

### Phase 2 — Light Monetization
- Google AdSense display ads (non-intrusive placement)
- Affiliate links to brokerages, investment books, financial tools
- Target: $500–$2,000/month passive income

### Phase 3 — Premium Features (Future)
- Premium calculators with advanced projections
- Scenario saving (requires user accounts + backend)
- Sponsored content placements
- White-label calculator embeds

### Phase 4 — Scale
- Email list with financial independence content
- Partnerships with FIRE community blogs and podcasts
- Premium subscription tier

---

## Blog Strategy

The blog supports the calculator tools by targeting informational FIRE keywords. Articles link to relevant calculators; calculators link back to relevant articles. This creates a **topic cluster** that boosts SEO authority.

### Initial Article List

| Article | Target Keyword | Links To |
|---|---|---|
| What is FIRE? | "what is FIRE financial independence" | FIRE Calculator |
| How to calculate your FIRE number | "how to calculate FIRE number" | FIRE Number Calculator |
| Coast FIRE explained | "coast FIRE explained" | Coast FIRE Calculator |
| The 4% rule explained | "4 percent rule retirement" | 4% Rule Calculator |
| Best savings rate for FIRE | "savings rate for FIRE" | Savings Rate Calculator |

Each article targets a long-tail informational keyword and funnels readers to the relevant calculator.

---

## URL Structure

All content lives on the main domain with flat, descriptive URLs:

**Calculators:**
- `/fire-calculator`
- `/fire-number-calculator`
- `/coast-fire-calculator`
- `/savings-rate-calculator`
- `/investment-growth-calculator`
- `/4-percent-rule-calculator`
- `/lean-fire-calculator`
- `/barista-fire-calculator`
- `/retirement-timeline-calculator`
- `/compound-interest-calculator`

**Blog:**
- `/blog/what-is-fire`
- `/blog/4-percent-rule-explained`
- `/blog/coast-fire-explained`

Rules: flat structure, kebab-case, no nesting calculators under blog routes.

---

## Current Project Status

| Area | Status |
|---|---|
| Project planning | Complete |
| Architecture decisions | Complete |
| Technology stack selection | Complete |
| Calculator specifications | Complete (see calculator-specs.md) |
| SEO page structure | Complete (see seo-strategy.md) |
| Next.js project scaffolded | Complete |
| FIRE Calculator implementation | Not started |
| MDX content pages | Not started |
| Deployment to Cloudflare Pages | Not started |

### Immediate Next Steps

1. Implement FIRE Calculator (logic, validation, tests, UI, MDX content)
2. Deploy first version to Cloudflare Pages
3. Keyword research and content planning
4. Implement remaining calculators in priority order (see [tool-roadmap.md](tool-roadmap.md))

---

## Long-Term Goal

Build a fast, scalable, SEO-focused financial calculator platform that provides real value to people planning for financial independence — and generates sustainable passive revenue over time.
