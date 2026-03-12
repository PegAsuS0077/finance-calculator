# Formula Reference — FIRE Tools

Mathematical reference for all financial formulas used across the 10 calculators. Use this as the authoritative source when implementing `lib/calculators/` files and writing unit tests.

---

## Notation

| Symbol | Meaning |
|---|---|
| `P` | Principal (current portfolio value) |
| `C` | Annual contributions (or periodic contributions where noted) |
| `r` | Annual return rate (as decimal, e.g., 0.07 for 7%) |
| `r_real` | Real (inflation-adjusted) annual return rate |
| `i` | Annual inflation rate (as decimal) |
| `n` | Number of years |
| `t` | Time in years |
| `FV` | Future value |
| `PV` | Present value |
| `W` | Annual withdrawal amount |
| `SWR` | Safe withdrawal rate (as decimal, e.g., 0.04) |
| `E` | Annual expenses |

---

## 1. FIRE Number

The target portfolio value needed to sustain retirement indefinitely using a safe withdrawal rate.

```
FIRE Number = E / SWR
```

**Example:** $40,000 / 0.04 = $1,000,000

**Notes:**
- `E` = annual expenses in retirement (not current expenses necessarily)
- `SWR` = 0.04 (4%) is the most common choice, based on the Trinity Study
- A lower SWR (e.g., 3%) gives a larger, more conservative FIRE Number
- A higher SWR (e.g., 5%) gives a smaller FIRE Number but higher depletion risk

---

## 2. Real (Inflation-Adjusted) Return Rate

Adjusts the nominal investment return for inflation, giving the "real" purchasing power growth rate.

```
r_real = ((1 + r) / (1 + i)) - 1
```

**Example:** Nominal return = 7%, Inflation = 3%
`r_real = (1.07 / 1.03) - 1 = 0.0388` (approximately 3.88%)

**Notes:**
- Always use `r_real` in time-to-FIRE calculations to produce inflation-adjusted projections
- Using nominal `r` without adjusting for inflation will underestimate years needed

---

## 3. Future Value of a Lump Sum

How much a single investment grows over time.

```
FV = P × (1 + r)^n
```

**Example:** $50,000 growing at 7% for 20 years
`FV = 50,000 × (1.07)^20 = $193,484`

---

## 4. Future Value with Regular Contributions (Annuity)

How much a portfolio grows when contributing regularly (end-of-year contributions).

```
FV = P × (1 + r)^n  +  C × ((1 + r)^n - 1) / r
```

**Example:** $50,000 portfolio + $20,000/year contributions at 7% for 20 years
`FV = 50,000 × (1.07)^20 + 20,000 × ((1.07)^20 - 1) / 0.07`
`FV = 193,484 + 20,000 × 38.997`
`FV ≈ $193,484 + $779,940 = $973,424`

**Monthly contributions variant:**
```
r_monthly = r / 12
n_months = n × 12
FV = P × (1 + r_monthly)^n_months  +  C_monthly × ((1 + r_monthly)^n_months - 1) / r_monthly
```

---

## 5. Years to FIRE (Solving for Time)

How many years until the portfolio reaches the FIRE Number, given a starting portfolio, annual contributions, and real return rate.

**When r_real > 0:**
```
Years = log((FIRE_Number × r_real + C) / (P × r_real + C)) / log(1 + r_real)
```

**When r_real = 0 (no real growth):**
```
Years = (FIRE_Number - P) / C
```

**Example:** FIRE Number = $1,000,000, P = $50,000, C = $30,000/year, r_real = 4%
```
Years = log((1,000,000 × 0.04 + 30,000) / (50,000 × 0.04 + 30,000)) / log(1.04)
Years = log(70,000 / 32,000) / log(1.04)
Years = log(2.1875) / 0.01680
Years ≈ 0.7839 / 0.01680 ≈ 46.7 years
```

**Notes:**
- If `P × r_real + C ≤ 0`, the user cannot reach FIRE (they are withdrawing more than growth+contributions)
- FIRE Age = Current Age + Years to FIRE
- Round up (ceiling) for years to present a conservative estimate

---

## 6. Coast FIRE Number

The lump sum needed today that will grow, without any additional contributions, to equal the FIRE Number by the target retirement age.

```
Coast FIRE Number = FIRE_Number / (1 + r)^n
where n = Retirement Age - Current Age
```

This is the **present value** of the FIRE Number.

**Example:** FIRE Number = $1,000,000, Current Age = 35, Retirement Age = 65, r = 7%
```
Coast FIRE Number = 1,000,000 / (1.07)^30 = 1,000,000 / 7.6123 ≈ $131,367
```

If the user already has $131,367 invested, they can stop contributing and still reach $1M by age 65 (assuming 7% annual return).

**Already coasted check:**
```
Is coasted = (Current Portfolio >= Coast FIRE Number)
```

---

## 7. Savings Rate

The percentage of take-home income saved and invested.

```
Savings Rate = (Take-Home Income - Annual Expenses) / Take-Home Income
```

**Alternative (gross income basis):**
```
Savings Rate (gross) = Annual Savings / Gross Income
```

**Example:** Take-home = $60,000, Expenses = $40,000
`Savings Rate = (60,000 - 40,000) / 60,000 = 33.3%`

**Notes:**
- Use take-home (after-tax) income for a practical savings rate
- Savings Rate determines time to FI more than almost any other single variable
- The Mr. Money Mustache model links savings rate directly to years to FI via the 4% rule

---

## 8. Safe Withdrawal Amount

How much can be withdrawn annually (or monthly) from a portfolio.

```
Annual Withdrawal = Portfolio Value × SWR
Monthly Withdrawal = Annual Withdrawal / 12
```

**Example:** Portfolio = $1,000,000, SWR = 4%
`Annual = $40,000, Monthly = $3,333`

---

## 9. Portfolio Duration (Depletion Time)

How many years until a portfolio is depleted at a given withdrawal rate and return.

```
If r_real > 0 and W > Portfolio × r_real:
  Years = -log(1 - (Portfolio × r_real) / W) / log(1 + r_real)

If r_real = 0:
  Years = Portfolio / W

If W <= Portfolio × r_real:
  Portfolio lasts indefinitely (never depleted)
```

**Example:** Portfolio = $1,000,000, W = $50,000/year, r_real = 3%
```
Years = -log(1 - (1,000,000 × 0.03) / 50,000) / log(1.03)
Years = -log(1 - 0.6) / log(1.03)
Years = -log(0.4) / 0.02956
Years = 0.9163 / 0.02956 ≈ 31 years
```

---

## 10. Compound Interest (General)

General formula for compound interest with variable compounding frequency.

```
A = P × (1 + r/n_periods)^(n_periods × t)
where:
  P = principal
  r = annual rate (decimal)
  n_periods = compounding periods per year (12 for monthly, 365 for daily, 1 for annual)
  t = time in years
```

**With regular periodic contributions:**
```
A = P × (1 + r/n)^(n×t)  +  C_per_period × ((1 + r/n)^(n×t) - 1) / (r/n)
where C_per_period = annual contribution / n_periods
```

---

## 11. Rule of 72

Quick estimate of how many years to double an investment.

```
Years to double ≈ 72 / Annual Rate (%)
```

**Examples:**
- 6% return → 72/6 = 12 years to double
- 8% return → 72/8 = 9 years to double
- 10% return → 72/10 = 7.2 years to double

**Notes:**
- This is an approximation; more accurate formula uses `log(2) / log(1 + r)`
- Good for quickly communicating compounding power to users

---

## 12. Barista FIRE Number

Portfolio needed when part-time income covers some expenses.

```
Annual Portfolio Withdrawal Needed = Total Annual Expenses - Annual Part-Time Income

Barista FIRE Number = Annual Portfolio Withdrawal Needed / SWR
```

**Example:** Expenses = $50,000, Part-time income = $15,000, SWR = 4%
```
Annual Portfolio Withdrawal Needed = 50,000 - 15,000 = 35,000
Barista FIRE Number = 35,000 / 0.04 = $875,000
```

Compare: Full FIRE Number = $50,000 / 0.04 = $1,250,000
Barista FIRE saves needing $375,000 less in the portfolio.

---

## 13. Present Value (for Coast FIRE comparison)

The present value of a future sum (generalized form of Coast FIRE formula).

```
PV = FV / (1 + r)^n
```

Used when showing "how much is your future FIRE Number worth today?"

---

## Input Validation Ranges

Recommended Zod validation ranges for all formulas:

| Input | Min | Max | Notes |
|---|---|---|---|
| Age | 18 | 80 | — |
| Portfolio value | 0 | 100,000,000 | 0 is valid (just starting) |
| Annual income | 1,000 | 10,000,000 | — |
| Annual expenses | 1,000 | 10,000,000 | Must be > 0 for FIRE Number |
| Annual contributions | 0 | 10,000,000 | 0 is valid (no contributions) |
| Return rate | 0.001 | 0.20 | 0.1% to 20% |
| Inflation rate | 0 | 0.15 | 0% to 15% |
| Withdrawal rate | 0.01 | 0.10 | 1% to 10% |
| Years | 1 | 60 | Compound interest calculator |

---

## Unit Test Reference Values

Verified expected outputs for use in test cases:

| Scenario | Inputs | Expected Output |
|---|---|---|
| FIRE Number | E=$40,000, SWR=4% | $1,000,000 |
| FIRE Number | E=$60,000, SWR=3.5% | $1,714,286 |
| Coast FIRE | FIRE=$1M, age=35, retire=65, r=7% | $131,367 |
| Years to FIRE | P=$0, C=$30K, r_real=4%, target=$1M | ~30.7 years |
| FV lump sum | P=$10K, r=7%, n=10 | $19,672 |
| FV with contributions | P=$10K, C=$5K/yr, r=7%, n=10 | $88,784 |
| Compound (monthly) | P=$1K, r=8%, n=10, monthly | $2,220 |
| Rule of 72 | r=8% | 9 years |
| Annual withdrawal | Portfolio=$1M, SWR=4% | $40,000/yr |

*Verify these values with a financial calculator or spreadsheet before finalizing test cases.*
