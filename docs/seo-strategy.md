# SEO Strategy — FIRE Tools

This document defines the SEO architecture, page structure requirements, keyword targets, and internal linking strategy for the FIRE Tools platform.

---

## Core SEO Philosophy

Every calculator page is both a **tool** and an **article**. The calculator widget is embedded inside rich educational content. This approach:

- Ranks for long-tail informational keywords ("what is a FIRE number")
- Ranks for transactional keywords ("FIRE calculator", "4% rule calculator")
- Builds topical authority in the FIRE/financial independence niche
- Keeps users on the page longer (lower bounce rate signal)

**Rule:** Calculator pages must never be tool-only pages. Minimum 1000–2000 words of content.

---

## URL Structure Rules

| Rule | Detail |
|---|---|
| Flat structure | No nested calculator routes |
| Kebab-case | All lowercase, words separated by hyphens |
| Descriptive | URL describes the tool exactly |
| No trailing slashes | Canonical without trailing slash |
| No subdirectories for tools | `/fire-calculator` not `/tools/fire-calculator` |

**Calculator URL pattern:** `/{calculator-name}-calculator`

**Blog URL pattern:** `/blog/{article-slug}`

### All Calculator URLs

```
/fire-calculator
/fire-number-calculator
/coast-fire-calculator
/savings-rate-calculator
/investment-growth-calculator
/4-percent-rule-calculator
/lean-fire-calculator
/barista-fire-calculator
/retirement-timeline-calculator
/compound-interest-calculator
```

### Blog URLs

```
/blog/what-is-fire
/blog/how-to-calculate-fire-number
/blog/coast-fire-explained
/blog/4-percent-rule-explained
/blog/best-savings-rate-for-fire
```

---

## SEO Page Layout Template

Every calculator page must include these 10 sections in this exact order:

```
1. H1 heading + intro paragraph (above the fold)
   ↓
2. Calculator widget (interactive tool)
   ↓
3. Result explanation (what the outputs mean)
   ↓
4. How the calculator works (methodology, inputs explained)
   ↓
5. Example scenarios (2–3 worked real-world examples)
   ↓
6. FIRE concepts section (educational content on the relevant topic)
   ↓
7. FAQ section (minimum 5 questions, target 8–10)
   ↓
8. Related calculators (4–6 links to other tools)
   ↓
9. Related blog articles (2–4 links to blog content)
   ↓
10. Disclaimer (financial disclaimer, not professional advice)
```

See [content-templates.md](content-templates.md) for the full MDX template with placeholder content.

### Content Requirements Per Section

| Section | Minimum Length | Notes |
|---|---|---|
| H1 + intro | 100–150 words | Include primary keyword in H1, first 100 words |
| Result explanation | 150–250 words | Explain each output value |
| How it works | 200–300 words | Methodology, formula overview (no raw math) |
| Example scenarios | 300–400 words | Concrete names, numbers, conclusions |
| FIRE concepts | 200–300 words | Educational — link to blog articles |
| FAQ | 300–500 words | Each Q&A 50–100 words |
| Total target | 1000–2000 words | Aim for 1500 words |

---

## Metadata Requirements

Every page requires a `metadata` export using the Next.js Metadata API:

```ts
export const metadata: Metadata = {
  title: "[Primary Keyword] — [Brand Name or Descriptor]",
  description: "[120–160 character description including primary keyword and value proposition]",
  alternates: {
    canonical: "https://yourdomain.com/[slug]",
  },
}
```

### Title Patterns

| Page Type | Title Pattern | Example |
|---|---|---|
| Calculator | `[Tool Name] — Free [Type] Calculator` | `FIRE Calculator — Free Financial Independence Calculator` |
| Blog | `[Article Topic] — [Site Name]` | `What is FIRE? Financial Independence Explained` |
| Home | `[Site Name] — [Value Prop]` | `FIRE Tools — Free Financial Independence Calculators` |

### Meta Description Guidelines

- 120–160 characters
- Include the primary keyword naturally
- State what the tool does and why it's useful
- Call to action optional ("Calculate your FIRE number in minutes")

---

## Keyword Targets Per Calculator

| Calculator | Primary Keyword | Secondary Keywords |
|---|---|---|
| FIRE Calculator | fire calculator | financial independence calculator, early retirement calculator, fire number calculator free |
| FIRE Number Calculator | fire number calculator | how to calculate fire number, financial independence number |
| Coast FIRE Calculator | coast fire calculator | coast fire number, coast fire explained calculator |
| Savings Rate Calculator | savings rate calculator | savings rate fire, how to calculate savings rate |
| Investment Growth Calculator | investment growth calculator | portfolio growth calculator, investment calculator with contributions |
| 4% Rule Calculator | 4 percent rule calculator | safe withdrawal rate calculator, retirement withdrawal calculator |
| Lean FIRE Calculator | lean fire calculator | lean fire number, frugal retirement calculator |
| Barista FIRE Calculator | barista fire calculator | semi retirement calculator, partial fire calculator |
| Retirement Timeline Calculator | retirement timeline calculator | years to retirement calculator, when can i retire calculator |
| Compound Interest Calculator | compound interest calculator | compound interest with contributions, investment compounding calculator |

---

## On-Page SEO Rules

### Heading Structure

```
H1 — Page title (include primary keyword)
  H2 — Major sections (How to use, How it works, Example, FAQ, etc.)
    H3 — Subsections within H2s (individual FAQ questions, individual examples)
```

- One H1 per page
- H2s for major content sections
- Include secondary keywords naturally in H2s
- No keyword stuffing

### Internal Links

Every calculator page must include:
- 4–6 links to related calculators (in the "Related Calculators" section)
- 2–4 links to relevant blog articles (in the "Related Articles" section)
- Contextual inline links within body content where relevant

### Image Alt Text

- Any charts or diagrams must have descriptive alt text
- Include relevant keywords naturally
- "Portfolio growth chart showing years to financial independence" not just "chart"

---

## Internal Linking Strategy — Topic Clusters

The site uses a **topic cluster model** to build topical authority:

```
Hub Pages (Calculators)  ←→  Supporting Content (Blog Articles)
```

### Cluster: FIRE Planning
- Hub: `/fire-calculator`
- Supporting: `/blog/what-is-fire`, `/blog/how-to-calculate-fire-number`
- Cross-links: `/fire-number-calculator`, `/savings-rate-calculator`

### Cluster: Safe Withdrawal
- Hub: `/4-percent-rule-calculator`
- Supporting: `/blog/4-percent-rule-explained`
- Cross-links: `/fire-calculator`, `/retirement-timeline-calculator`

### Cluster: Coast FIRE
- Hub: `/coast-fire-calculator`
- Supporting: `/blog/coast-fire-explained`
- Cross-links: `/fire-calculator`, `/investment-growth-calculator`

### Cluster: Savings & Growth
- Hub: `/savings-rate-calculator`
- Supporting: `/blog/best-savings-rate-for-fire`
- Cross-links: `/compound-interest-calculator`, `/investment-growth-calculator`

### Linking Rules

- Every calculator links to 4–6 other calculators
- Every blog post links to 2–3 calculators
- Every calculator links to 2–3 blog posts
- Use descriptive anchor text ("use our Coast FIRE calculator" not "click here")
- No circular linking loops within the same cluster

---

## Sitemap Requirements

File: `app/sitemap.ts`

All public pages must appear in the sitemap:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://yourdomain.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://yourdomain.com/fire-calculator', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    // ... all calculator pages
    // ... all blog pages
  ]
}
```

Priority guidelines:
- Home page: 1.0
- Calculator pages: 0.9
- Blog articles: 0.7

---

## Robots Configuration

File: `app/robots.ts`

In v1, all pages are crawlable:

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

---

## Structured Data (Future)

For future implementation, add JSON-LD structured data:
- `WebApplication` schema on calculator pages
- `FAQPage` schema on pages with FAQ sections
- `Article` schema on blog posts
- `BreadcrumbList` for navigation

Not required in v1.
