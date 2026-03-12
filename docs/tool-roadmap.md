# Tool Roadmap — FIRE Tools

## Overview

10 calculators are planned for the initial release. They are ordered by SEO impact, formula complexity, and dependency on shared patterns.

Build each calculator completely (logic → tests → UI → content → SEO) before starting the next one.

---

## Calculator Priority Table

| # | Calculator | URL Slug | Status | Depends On |
|---|---|---|---|---|
| 1 | FIRE Calculator | `/fire-calculator` | Not started | Nothing — build first |
| 2 | FIRE Number Calculator | `/fire-number-calculator` | Not started | FIRE Calculator patterns |
| 3 | Coast FIRE Calculator | `/coast-fire-calculator` | Not started | FIRE Calculator patterns |
| 4 | Savings Rate Calculator | `/savings-rate-calculator` | Not started | FIRE Calculator patterns |
| 5 | 4% Rule Calculator | `/4-percent-rule-calculator` | Not started | FIRE Number Calculator |
| 6 | Compound Interest Calculator | `/compound-interest-calculator` | Not started | Investment Growth patterns |
| 7 | Investment Growth Calculator | `/investment-growth-calculator` | Not started | Compound Interest patterns |
| 8 | Retirement Timeline Calculator | `/retirement-timeline-calculator` | Not started | FIRE Calculator |
| 9 | Lean FIRE Calculator | `/lean-fire-calculator` | Not started | FIRE Calculator |
| 10 | Barista FIRE Calculator | `/barista-fire-calculator` | Not started | FIRE Calculator |

---

## Calculator Descriptions

### 1. FIRE Calculator

**Priority:** Build first — this is the core product.

The primary tool. Estimates when a user will achieve financial independence based on current portfolio, contributions, spending, and investment return assumptions.

**Key selling point:** All-in-one FIRE planning — enter your numbers once, see your FIRE number, years to FIRE, and a portfolio growth chart.

**Primary keyword:** "fire calculator"

**Full spec:** [calculator-specs.md#1-fire-calculator](calculator-specs.md#1-fire-calculator)

---

### 2. FIRE Number Calculator

**Priority:** High — simpler tool, high search volume for the keyword.

Focused specifically on calculating the FIRE number (portfolio target) based on spending and withdrawal rate. Simpler than the full FIRE Calculator — good for users who just want to know their target number.

**Key selling point:** Quick answer to "how much do I need to retire early?" with a withdrawal rate slider.

**Primary keyword:** "fire number calculator"

**Full spec:** [calculator-specs.md#2-fire-number-calculator](calculator-specs.md#2-fire-number-calculator)

---

### 3. Coast FIRE Calculator

**Priority:** High — Coast FIRE is a distinct, popular sub-topic with its own search demand.

Calculates how much to save now so investments grow to the FIRE number by retirement age without any further contributions.

**Key selling point:** Shows users they may be able to stop saving aggressively right now and "coast" to retirement.

**Primary keyword:** "coast fire calculator"

**Full spec:** [calculator-specs.md#3-coast-fire-calculator](calculator-specs.md#3-coast-fire-calculator)

---

### 4. Savings Rate Calculator

**Priority:** High — savings rate is central to FIRE planning; strong keyword.

Shows current savings rate and maps it to years until financial independence. Includes a comparison table showing how different savings rates affect retirement timeline.

**Key selling point:** Instantly shows users how cutting expenses by $X/month shaves years off their retirement timeline.

**Primary keyword:** "savings rate calculator"

**Full spec:** [calculator-specs.md#4-savings-rate-calculator](calculator-specs.md#4-savings-rate-calculator)

---

### 5. 4% Rule Calculator

**Priority:** Medium-High — evergreen keyword, widely searched.

Calculates safe annual and monthly withdrawal amounts from a retirement portfolio. Also shows how long the portfolio will last at different withdrawal rates.

**Key selling point:** Helps retirees and near-retirees understand how much they can safely spend each year.

**Primary keyword:** "4 percent rule calculator"

**Full spec:** [calculator-specs.md#6-4-rule-calculator](calculator-specs.md#6-4-rule-calculator)

---

### 6. Compound Interest Calculator

**Priority:** Medium — very broad appeal (beyond FIRE audience), educational tool.

General-purpose compound interest calculator showing how money grows over time with optional regular contributions. Rule of 72 included.

**Key selling point:** Clear visualization of the "magic of compound interest" — principal vs. interest growth stacked over time.

**Primary keyword:** "compound interest calculator"

**Full spec:** [calculator-specs.md#10-compound-interest-calculator](calculator-specs.md#10-compound-interest-calculator)

---

### 7. Investment Growth Calculator

**Priority:** Medium — similar to compound interest but more contribution-focused.

Projects how an investment portfolio grows with a lump-sum initial investment plus regular monthly contributions.

**Key selling point:** Shows total growth, total contributed, and the gap between them — makes compounding tangible.

**Primary keyword:** "investment growth calculator"

**Full spec:** [calculator-specs.md#5-investment-growth-calculator](calculator-specs.md#5-investment-growth-calculator)

---

### 8. Retirement Timeline Calculator

**Priority:** Medium — differentiates with scenario comparisons.

Shows how many years until retirement at current savings rate, plus a scenario table showing impact of expense cuts or contribution increases.

**Key selling point:** "What if" scenarios — what happens to my retirement date if I cut expenses by 10%?

**Primary keyword:** "retirement timeline calculator"

**Full spec:** [calculator-specs.md#9-retirement-timeline-calculator](calculator-specs.md#9-retirement-timeline-calculator)

---

### 9. Lean FIRE Calculator

**Priority:** Lower — niche audience, but distinct enough for its own page.

FIRE calculator variant targeting people pursuing extreme frugality (under $40K/year spending). Includes a three-way comparison: Lean FIRE vs. Regular FIRE vs. Fat FIRE.

**Key selling point:** Shows how dramatically lower spending accelerates the path to financial independence.

**Primary keyword:** "lean fire calculator"

**Full spec:** [calculator-specs.md#7-lean-fire-calculator](calculator-specs.md#7-lean-fire-calculator)

---

### 10. Barista FIRE Calculator

**Priority:** Lower — most niche, but unique enough for a dedicated page with low competition.

Calculates the smaller portfolio needed when a user plans to work part-time in retirement, with part-time income covering some expenses.

**Key selling point:** Shows users they can semi-retire much sooner than full FIRE requires.

**Primary keyword:** "barista fire calculator"

**Full spec:** [calculator-specs.md#8-barista-fire-calculator](calculator-specs.md#8-barista-fire-calculator)

---

## Blog Content Roadmap

### Initial Articles (Build Alongside Calculators)

| # | Article Title | Target Keyword | Status | Links To |
|---|---|---|---|---|
| 1 | What is FIRE? Financial Independence Retire Early Explained | what is fire financial independence | Not started | FIRE Calculator |
| 2 | How to Calculate Your FIRE Number | how to calculate fire number | Not started | FIRE Number Calculator, FIRE Calculator |
| 3 | Coast FIRE Explained: How It Works and How to Calculate It | coast fire explained | Not started | Coast FIRE Calculator |
| 4 | The 4% Rule Explained: Safe Withdrawal Rate for Retirement | 4 percent rule retirement | Not started | 4% Rule Calculator |
| 5 | Best Savings Rate for FIRE: How Much Do You Need to Save? | savings rate for fire | Not started | Savings Rate Calculator |

### Writing Priority

Write each blog article alongside (or shortly after) its corresponding calculator, so both are live at the same time for maximum internal linking benefit.

---

## Future Considerations

### Potential Additional Calculators (v2)
- Net Worth Calculator
- Debt Payoff Calculator
- Emergency Fund Calculator
- Social Security Income Estimator
- Roth IRA vs Traditional IRA Comparison

### Potential Backend Features (v2+)
- User accounts (save calculation scenarios)
- Scenario comparison history
- Email-based FIRE progress tracking
- Premium calculator features (Monte Carlo simulation, tax-adjusted projections)

### Monetization Timeline
- **v1:** No monetization — focus on traffic and rankings
- **v2:** AdSense ads + affiliate links (after reaching 10K monthly visitors)
- **v3:** Premium features + sponsored placements

---

## Update This File

Update the **Status** column as calculators are completed:

| Status Label | Meaning |
|---|---|
| Not started | No implementation work has begun |
| In progress | Actively being built |
| Logic complete | `lib/calculators/` and tests done |
| UI complete | Components built, content not yet done |
| Complete | All 9 steps done, page is live |
