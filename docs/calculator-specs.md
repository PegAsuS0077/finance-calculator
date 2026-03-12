# Calculator Specifications — FIRE Tools

Detailed specifications for all 10 planned calculators. Each spec defines: URL slug, purpose, inputs, formulas, derived outputs, chart requirements, and related tools.

See [formula-reference.md](formula-reference.md) for standalone mathematical definitions.

---

## 1. FIRE Calculator

**URL:** `/fire-calculator`
**Priority:** 1 — Build first
**File:** `lib/calculators/fire.ts`

### Purpose
Estimate when a user will reach financial independence based on their current financial situation, savings rate, and investment growth assumptions.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Current age | Number | Text input | 18–80 | 30 |
| Current portfolio value | Currency | Text input | 0–100,000,000 | 0 |
| Annual income | Currency | Text input | 1,000–10,000,000 | 75,000 |
| Annual expenses | Currency | Text input | 1,000–10,000,000 | 50,000 |
| Annual contributions | Currency | Text input | 0–10,000,000 | 25,000 |
| Expected annual return | Percentage | Slider + input | 1%–15% | 7% |
| Inflation rate | Percentage | Slider + input | 0%–10% | 3% |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |

### Formulas

**FIRE Number:**
```
FIRE Number = Annual Expenses / Withdrawal Rate
```
Example: $40,000 / 0.04 = $1,000,000

**Real Return Rate (inflation-adjusted):**
```
Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) - 1
```

**Years to FIRE** (future value of growing portfolio):
```
If real return > 0:
  Years = log((FIRE Number * r + C) / (P * r + C)) / log(1 + r)
  where:
    r = real return rate (decimal)
    C = annual contributions
    P = current portfolio value

If real return = 0:
  Years = (FIRE Number - P) / C
```

**FIRE Age:**
```
FIRE Age = Current Age + Years to FIRE
```

**Remaining Gap:**
```
Gap = FIRE Number - Current Portfolio Value (if positive)
```

### Derived Outputs

| Output | Description |
|---|---|
| FIRE Number | Total portfolio needed to retire |
| Years to FIRE | Time from today to financial independence |
| FIRE Age | Age at financial independence |
| Remaining Gap | How much more portfolio is needed |
| Savings Rate | Annual Contributions / Annual Income |

### Chart

- **Type:** Recharts LineChart
- **X-axis:** Age (from current age to FIRE age + 5 years)
- **Y-axis:** Portfolio value (in dollars)
- **Lines:**
  - Portfolio growth projection (curved line)
  - FIRE target line (horizontal dashed line at FIRE Number)
- **Intersection point:** Mark where portfolio crosses the FIRE line
- Updates instantly on any input change

### Related Tools
- FIRE Number Calculator
- Savings Rate Calculator
- Retirement Timeline Calculator

---

## 2. FIRE Number Calculator

**URL:** `/fire-number-calculator`
**Priority:** 2
**File:** `lib/calculators/fire-number.ts`

### Purpose
Calculate the exact portfolio size needed to retire using the 4% rule or a custom withdrawal rate. Simpler, more focused version of the FIRE Calculator.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Annual expenses in retirement | Currency | Text input | 1,000–10,000,000 | 40,000 |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |
| Monthly vs annual toggle | Select | Toggle | monthly / annual | annual |

### Formulas

**FIRE Number:**
```
FIRE Number = Annual Expenses / Withdrawal Rate
```

**Monthly breakdown:**
```
Monthly Withdrawal = FIRE Number * Withdrawal Rate / 12
```

**Savings Rate needed to reach FIRE Number in N years:**
This is a derived helper — show how much monthly savings is needed to hit the FIRE number in 10, 15, 20, 25, and 30 years (assuming 7% return). Display as a table.

### Derived Outputs

| Output | Description |
|---|---|
| FIRE Number | Target portfolio value |
| Monthly withdrawal amount | How much you can withdraw per month |
| Savings needed table | Monthly savings required for various timelines |

### Chart
- **Type:** Bar chart or table (no line chart needed)
- Display savings required per timeline (10, 15, 20, 25, 30 years)

### Related Tools
- FIRE Calculator
- 4% Rule Calculator
- Savings Rate Calculator

---

## 3. Coast FIRE Calculator

**URL:** `/coast-fire-calculator`
**Priority:** 3
**File:** `lib/calculators/coast-fire.ts`

### Purpose
Calculate the lump sum needed today so that investment growth alone (with no additional contributions) will reach the FIRE number by a target retirement age.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Current age | Number | Text input | 18–80 | 30 |
| Target retirement age | Number | Text input | 40–80 | 65 |
| Annual expenses in retirement | Currency | Text input | 1,000–10,000,000 | 40,000 |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |
| Expected annual return | Percentage | Slider + input | 1%–15% | 7% |
| Current portfolio value | Currency | Text input | 0–100,000,000 | 0 |

### Formulas

**FIRE Number (target at retirement):**
```
FIRE Number = Annual Expenses / Withdrawal Rate
```

**Coast FIRE Number (amount needed today):**
```
Coast FIRE Number = FIRE Number / (1 + r)^n
where:
  r = annual return rate (decimal)
  n = years until retirement (Retirement Age - Current Age)
```

**Gap:**
```
Gap = Coast FIRE Number - Current Portfolio Value
```

**Already Coasted?**
```
If Current Portfolio >= Coast FIRE Number → user has already reached Coast FIRE
```

### Derived Outputs

| Output | Description |
|---|---|
| FIRE Number | Target portfolio at retirement |
| Coast FIRE Number | Amount needed today to coast |
| Years of growth needed | Retirement age − current age |
| Already coasted? | Yes/No indicator |
| Gap | Additional savings needed to reach Coast FIRE |

### Chart
- **Type:** LineChart showing portfolio growth from Coast FIRE Number to FIRE Number over time
- Shows the "coasting" period with no contributions
- X-axis: age, Y-axis: portfolio value

### Related Tools
- FIRE Calculator
- FIRE Number Calculator
- Retirement Timeline Calculator

---

## 4. Savings Rate Calculator

**URL:** `/savings-rate-calculator`
**Priority:** 4
**File:** `lib/calculators/savings-rate.ts`

### Purpose
Calculate current savings rate and show how it maps to years until financial independence.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Annual gross income | Currency | Text input | 1,000–10,000,000 | 75,000 |
| Annual take-home income | Currency | Text input | 1,000–10,000,000 | 60,000 |
| Annual expenses | Currency | Text input | 1,000–10,000,000 | 45,000 |
| Expected annual return | Percentage | Slider + input | 1%–15% | 5% |
| Current portfolio value | Currency | Text input | 0–100,000,000 | 0 |

### Formulas

**Savings Rate:**
```
Savings Rate = (Take-Home Income - Annual Expenses) / Take-Home Income
```

**Years to Financial Independence** (Mr. Money Mustache model):
This uses a lookup/calculation based on savings rate and a 4% SWR assumption:
```
Annual Savings = Take-Home Income - Annual Expenses
Annual Spending = Annual Expenses
FIRE Number = Annual Spending / 0.04
Years to FI = log((FIRE Number * r + S) / (P * r + S)) / log(1 + r)
where:
  r = real return rate
  S = annual savings
  P = current portfolio
```

### Derived Outputs

| Output | Description |
|---|---|
| Savings rate | As a percentage |
| Annual savings amount | Take-home − expenses |
| Years to FI | Based on current savings rate |
| FI age | If user provides current age |
| Years to FI table | Show years for savings rates 10%–90% in 10% increments |

### Chart
- **Type:** LineChart or bar chart showing years to FI at different savings rates (10% to 90%)
- Highlight user's current savings rate on the chart

### Related Tools
- FIRE Calculator
- Retirement Timeline Calculator
- Compound Interest Calculator

---

## 5. Investment Growth Calculator

**URL:** `/investment-growth-calculator`
**Priority:** 5
**File:** `lib/calculators/investment-growth.ts`

### Purpose
Project how an investment grows over time with optional regular contributions. General-purpose future value calculator.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Initial investment | Currency | Text input | 0–100,000,000 | 10,000 |
| Monthly contribution | Currency | Text input | 0–100,000 | 500 |
| Annual return rate | Percentage | Slider + input | 0%–20% | 7% |
| Number of years | Number | Slider + input | 1–50 | 20 |
| Compound frequency | Select | Dropdown | annual / monthly | monthly |

### Formulas

**Future Value with regular contributions (monthly compounding):**
```
r = annual rate / 12 (monthly rate)
n = years * 12 (total months)

FV = P * (1 + r)^n + C * ((1 + r)^n - 1) / r
where:
  P = initial investment
  C = monthly contribution
  r = monthly rate
  n = total periods
```

**Total contributed:**
```
Total Contributed = P + (C * n)
```

**Total interest earned:**
```
Interest = FV - Total Contributed
```

### Derived Outputs

| Output | Description |
|---|---|
| Final portfolio value | FV at end of period |
| Total contributed | Principal + all contributions |
| Total interest earned | Growth from compounding |
| Growth multiplier | FV / Total Contributed |

### Chart
- **Type:** LineChart showing portfolio growth over time
- Two areas: "Principal" (stacked) and "Growth" (stacked)
- X-axis: years, Y-axis: portfolio value

### Related Tools
- Compound Interest Calculator
- FIRE Calculator
- Savings Rate Calculator

---

## 6. 4% Rule Calculator

**URL:** `/4-percent-rule-calculator`
**Priority:** 6
**File:** `lib/calculators/four-percent-rule.ts`

### Purpose
Calculate how much you can safely withdraw annually (or monthly) from a retirement portfolio using the 4% safe withdrawal rate rule. Also shows how long a portfolio lasts at different withdrawal rates.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Portfolio value | Currency | Text input | 1,000–100,000,000 | 1,000,000 |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |
| Expected annual return | Percentage | Slider + input | 0%–15% | 5% |
| Inflation rate | Percentage | Slider + input | 0%–10% | 3% |

### Formulas

**Annual withdrawal amount:**
```
Annual Withdrawal = Portfolio Value * Withdrawal Rate
Monthly Withdrawal = Annual Withdrawal / 12
```

**Portfolio duration** (how long until portfolio is depleted):
```
Uses present value annuity formula:
Years = -log(1 - (Portfolio * r) / Withdrawal) / log(1 + r)
where r = real return rate (adjusted for inflation)
```

If real return >= withdrawal rate, portfolio lasts indefinitely.

### Derived Outputs

| Output | Description |
|---|---|
| Annual withdrawal | Amount you can withdraw per year |
| Monthly withdrawal | Annual / 12 |
| Portfolio duration | Years until depletion at this rate |
| Safe? | Yes if portfolio lasts 30+ years |
| Comparison table | Withdrawal amounts at 3%, 3.5%, 4%, 4.5%, 5% |

### Chart
- **Type:** LineChart showing portfolio depletion over time at the selected withdrawal rate
- Show multiple lines for different withdrawal rates (3%, 4%, 5%)
- X-axis: years, Y-axis: portfolio value

### Related Tools
- FIRE Calculator
- FIRE Number Calculator
- Retirement Timeline Calculator

---

## 7. Lean FIRE Calculator

**URL:** `/lean-fire-calculator`
**Priority:** 7
**File:** `lib/calculators/lean-fire.ts`

### Purpose
Calculate FIRE number and timeline for people pursuing an extremely frugal early retirement lifestyle (typically under $40,000/year spending).

### Inputs

Same as FIRE Calculator but with a lower default annual expenses value ($25,000).

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Current age | Number | Text input | 18–80 | 30 |
| Annual lean expenses | Currency | Text input | 5,000–100,000 | 25,000 |
| Current portfolio | Currency | Text input | 0–10,000,000 | 0 |
| Annual contributions | Currency | Text input | 0–500,000 | 30,000 |
| Expected return | Percentage | Slider + input | 1%–15% | 7% |
| Inflation rate | Percentage | Slider + input | 0%–10% | 3% |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |

### Formulas
Same as FIRE Calculator. The distinction is the UI framing (lean lifestyle context) and the lower default expense value.

### Additional Output
Show a comparison: **Lean FIRE** (user's expenses) vs **Regular FIRE** (user's expenses × 1.5) vs **Fat FIRE** (user's expenses × 2.5) — three FIRE numbers side-by-side.

### Related Tools
- FIRE Calculator
- Barista FIRE Calculator
- Savings Rate Calculator

---

## 8. Barista FIRE Calculator

**URL:** `/barista-fire-calculator`
**Priority:** 8
**File:** `lib/calculators/barista-fire.ts`

### Purpose
Calculate the portfolio needed for semi-retirement where part-time work income covers some expenses and the portfolio covers the rest.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Current age | Number | Text input | 18–80 | 35 |
| Annual total expenses | Currency | Text input | 1,000–500,000 | 50,000 |
| Annual part-time income | Currency | Text input | 0–100,000 | 15,000 |
| Expected return | Percentage | Slider + input | 1%–15% | 7% |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |
| Current portfolio | Currency | Text input | 0–10,000,000 | 0 |
| Annual contributions | Currency | Text input | 0–500,000 | 20,000 |
| Inflation rate | Percentage | Slider + input | 0%–10% | 3% |

### Formulas

**Portfolio gap to cover:**
```
Annual Portfolio Withdrawal Needed = Total Expenses - Part-Time Income
```

**Barista FIRE Number:**
```
Barista FIRE Number = Annual Portfolio Withdrawal Needed / Withdrawal Rate
```

**Years to Barista FIRE:**
```
Same future value formula as FIRE Calculator, using Barista FIRE Number as target
```

### Derived Outputs

| Output | Description |
|---|---|
| Barista FIRE Number | Portfolio needed (lower than full FIRE) |
| Annual portfolio withdrawal | Expenses minus part-time income |
| Years to Barista FIRE | Faster than full FIRE |
| Comparison | Barista FIRE vs full FIRE number side-by-side |

### Related Tools
- FIRE Calculator
- Lean FIRE Calculator
- Savings Rate Calculator

---

## 9. Retirement Timeline Calculator

**URL:** `/retirement-timeline-calculator`
**Priority:** 9
**File:** `lib/calculators/retirement-timeline.ts`

### Purpose
Show how changing savings rate, return rate, or current portfolio changes the years until retirement.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Current age | Number | Text input | 18–80 | 35 |
| Annual income | Currency | Text input | 1,000–10,000,000 | 75,000 |
| Annual expenses | Currency | Text input | 1,000–10,000,000 | 50,000 |
| Current portfolio | Currency | Text input | 0–100,000,000 | 50,000 |
| Expected return | Percentage | Slider + input | 1%–15% | 7% |
| Inflation rate | Percentage | Slider + input | 0%–10% | 3% |
| Withdrawal rate | Percentage | Slider + input | 1%–10% | 4% |

### Formulas
Same as FIRE Calculator core formulas.

### Key Feature
Show a **scenario comparison table**: what happens if the user:
- Cuts expenses by 10%, 20%, 30%
- Increases contributions by 10%, 20%, 30%
- Gets a higher return (1% and 2% higher)

Display each scenario's retirement age and years-to-FI.

### Related Tools
- FIRE Calculator
- Savings Rate Calculator
- Coast FIRE Calculator

---

## 10. Compound Interest Calculator

**URL:** `/compound-interest-calculator`
**Priority:** 10
**File:** `lib/calculators/compound-interest.ts`

### Purpose
General-purpose compound interest calculator showing how money grows over time. Educational tool for people learning about investing basics.

### Inputs

| Input | Type | Control | Valid Range | Default |
|---|---|---|---|---|
| Initial principal | Currency | Text input | 0–100,000,000 | 1,000 |
| Annual interest rate | Percentage | Slider + input | 0%–30% | 8% |
| Number of years | Number | Slider + input | 1–50 | 10 |
| Compounding frequency | Select | Dropdown | daily/monthly/quarterly/annually | monthly |
| Annual contribution | Currency | Text input | 0–1,000,000 | 0 |

### Formulas

**Compound interest (no contributions):**
```
A = P * (1 + r/n)^(n*t)
where:
  P = principal
  r = annual rate (decimal)
  n = compounding periods per year
  t = years
```

**With regular annual contributions:**
```
A = P * (1 + r/n)^(n*t) + C * ((1 + r/n)^(n*t) - 1) / (r/n)
where C = annual contribution / n (per period)
```

**Rule of 72 (informational):**
```
Years to double = 72 / Annual Rate (%)
```

### Derived Outputs

| Output | Description |
|---|---|
| Final amount | Total portfolio at end of period |
| Total interest earned | Growth above principal + contributions |
| Total contributed | Principal + all contributions |
| Doubling time | Rule of 72 estimate |
| Year-by-year breakdown table | Balance at each year |

### Chart
- **Type:** Stacked area chart
- Show "Principal", "Contributions", and "Interest" as stacked areas
- X-axis: years, Y-axis: total value

### Related Tools
- Investment Growth Calculator
- FIRE Calculator
- Savings Rate Calculator
