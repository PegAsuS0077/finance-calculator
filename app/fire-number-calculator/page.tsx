// app/fire-number-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { FireNumberCalculator } from "@/components/calculators/fire-number-calculator"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  title: "FIRE Number Calculator — How Much Do You Need to Retire?",
  description:
    "Calculate your exact FIRE number using the 4% rule or a custom withdrawal rate. See how much you need to retire and what monthly savings it takes to get there.",
  alternates: {
    canonical: `${config.siteUrl}/fire-number-calculator`,
  },
  openGraph: {
    title: "FIRE Number Calculator — How Much Do You Need to Retire?",
    description:
      "Calculate your exact FIRE number using the 4% rule or a custom withdrawal rate. Free, instant results.",
    url: `${config.siteUrl}/fire-number-calculator`,
    siteName: "FIRE Tools",
    type: "website",
  },
}

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const sidebarLinks = [
  { label: "Overview", href: "/" },
  { label: "FIRE Calculator", href: "/fire-calculator" },
  { label: "FIRE Number Calculator", href: "/fire-number-calculator", active: true },
  { label: "Coast FIRE Calculator", href: "/coast-fire-calculator" },
  { label: "Savings Rate Calculator", href: "/savings-rate-calculator" },
  { label: "4% Rule Calculator", href: "/4-percent-rule-calculator" },
  { label: "Compound Interest Calculator", href: "/compound-interest-calculator" },
  { label: "Investment Growth Calculator", href: "/investment-growth-calculator" },
  { label: "Retirement Timeline", href: "/retirement-timeline-calculator" },
  { label: "Lean FIRE Calculator", href: "/lean-fire-calculator" },
  { label: "Barista FIRE Calculator", href: "/barista-fire-calculator" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
        fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
        fontWeight: 700,
        color: "var(--f-text-heading)",
        letterSpacing: "-0.02em",
        lineHeight: 1.25,
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </h2>
  )
}

function FormulaBlock({ formula, example }: { formula: string; example: string }) {
  return (
    <div
      style={{
        background: "oklch(0.97 0.01 258)",
        border: "1px solid var(--f-blue-border)",
        borderLeft: "3px solid var(--f-blue)",
        borderRadius: "6px",
        padding: "1rem 1.25rem",
        margin: "1.25rem 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
          fontSize: "0.9375rem",
          color: "var(--f-text-heading)",
          fontStyle: "italic",
          marginBottom: "0.375rem",
        }}
      >
        {formula}
      </p>
      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", margin: 0, fontWeight: 300 }}>
        {example}
      </p>
    </div>
  )
}

function ExampleCard({
  name, expenses, withdrawalRate, fireNumber, monthlyWithdrawal,
}: {
  name: string; expenses: string; withdrawalRate: string; fireNumber: string; monthlyWithdrawal: string
}) {
  return (
    <div
      style={{
        background: "var(--f-card)",
        border: "1px solid var(--f-border)",
        borderRadius: "10px",
        padding: "1.5rem",
        boxShadow: "var(--f-shadow-card)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "var(--f-text-heading)",
          marginBottom: "1rem",
          paddingBottom: "0.875rem",
          borderBottom: "1px solid var(--f-border)",
          lineHeight: 1.35,
        }}
      >
        {name}
      </p>
      <dl>
        {[
          { label: "Annual Expenses", value: expenses },
          { label: "Withdrawal Rate", value: withdrawalRate },
          { label: "FIRE Number", value: fireNumber, highlight: true },
          { label: "Monthly Withdrawal", value: monthlyWithdrawal, highlight: true },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.4375rem 0",
              borderBottom: "1px solid var(--f-border)",
            }}
          >
            <dt style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", fontWeight: 300 }}>
              {row.label}
            </dt>
            <dd
              style={{
                fontSize: row.highlight ? "0.9375rem" : "0.875rem",
                color: row.highlight ? "var(--f-blue)" : "var(--f-text-body)",
                fontWeight: row.highlight ? 700 : 450,
                fontFamily: row.highlight ? "var(--font-inter), ui-sans-serif, sans-serif" : undefined,
                margin: 0,
              }}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ borderBottom: "1px solid var(--f-border)", padding: "1.375rem 0" }}>
      <h3
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "var(--f-text-heading)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
        }}
      >
        {q}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
        {a}
      </p>
    </div>
  )
}

function RelatedCard({ name, href, description, live }: {
  name: string; href: string; description: string; live: boolean
}) {
  const inner = (
    <div
      style={{
        background: "var(--f-card)",
        border: "1px solid var(--f-border)",
        borderRadius: "10px",
        padding: "1.25rem 1.375rem",
        height: "100%",
        boxSizing: "border-box",
        opacity: live ? 1 : 0.55,
        transition: live ? "border-color 0.15s ease, box-shadow 0.15s ease" : undefined,
      }}
      className={live ? "calc-card" : undefined}
    >
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: live ? "var(--f-text-heading)" : "var(--f-text-muted)",
          marginBottom: "0.375rem",
          lineHeight: 1.3,
        }}
      >
        {name}
      </p>
      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
        {description}
      </p>
      {live && (
        <p style={{ marginTop: "0.875rem", fontSize: "0.8rem", color: "var(--f-blue)", fontWeight: 600 }}>
          Open →
        </p>
      )}
    </div>
  )
  if (live) return <Link href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>
  return <div>{inner}</div>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FireNumberCalculatorPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <SiteHeader activePath="/fire-number-calculator" />

      {/* ── App shell: sidebar + main ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {/* ── Left sidebar ── */}
        <aside
          style={{
            borderRight: "1px solid var(--f-border)",
            background: "var(--f-sidebar)",
            padding: "1.75rem 0",
            position: "sticky",
            top: "56px",
            height: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          <p
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--f-text-faint)",
              padding: "0 1.25rem",
              marginBottom: "0.5rem",
            }}
          >
            Calculators
          </p>
          <nav>
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.8375rem",
                  fontWeight: link.active ? 600 : 400,
                  color: link.active ? "var(--f-blue)" : "var(--f-text-label)",
                  textDecoration: "none",
                  background: link.active ? "var(--f-blue-light)" : "transparent",
                  borderRight: link.active ? "2px solid var(--f-blue)" : "2px solid transparent",
                  transition: "background 0.12s ease, color 0.12s ease",
                  lineHeight: 1.4,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main style={{ padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)", minWidth: 0 }}>

          {/* 1. Page header / H1 */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--f-blue)",
                marginBottom: "0.625rem",
              }}
            >
              FIRE Number Calculator
            </p>
            <h1
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--f-text-heading)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "0.75rem",
              }}
            >
              How Much Do You Need to Retire?
            </h1>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--f-text-muted)",
                lineHeight: 1.7,
                maxWidth: "540px",
                margin: "0 auto",
                fontWeight: 300,
              }}
            >
              Calculate your exact FIRE number — the total portfolio needed to retire on investment income alone.
              Adjust your withdrawal rate and see the monthly savings required to get there.
            </p>
          </div>

          {/* 2. Calculator widget */}
          <section id="calculator" aria-label="FIRE Number Calculator">
            <FireNumberCalculator />
          </section>

          {/* 3. Results explanation */}
          <section style={{ marginTop: "3rem" }}>
            <SectionHeading>What these numbers mean</SectionHeading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                gap: "1rem",
              }}
            >
              {[
                { label: "FIRE Number", body: "The total investment portfolio you need to retire. Once you hit this number, investment returns alone can fund your lifestyle indefinitely — you never need to work again unless you choose to." },
                { label: "Annual Withdrawal", body: "How much of your portfolio you spend each year in retirement. This equals your annual expenses. As long as your portfolio grows faster than you withdraw, it should last forever." },
                { label: "Monthly Withdrawal", body: "Your annual withdrawal split into monthly spending. Use this to compare directly to your current monthly budget and visualize what retirement cash flow looks like." },
                { label: "Savings Table", body: "The monthly savings required to reach your FIRE number in 10–30 years, assuming a 7% annual return. Shorter timelines require dramatically higher monthly contributions." },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "var(--f-card)",
                    border: "1px solid var(--f-border)",
                    borderRadius: "10px",
                    padding: "1.375rem",
                    boxShadow: "var(--f-shadow-card)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--f-blue)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. How it works */}
          <section
            style={{
              marginTop: "3rem",
              background: "var(--f-card)",
              border: "1px solid var(--f-border)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "var(--f-shadow-card)",
            }}
          >
            <SectionHeading>How the FIRE Number Calculator works</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
              <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                <p>
                  The FIRE number formula is elegantly simple. Divide your annual retirement expenses by your safe
                  withdrawal rate, and you get the exact portfolio needed to sustain your lifestyle indefinitely.
                </p>
                <FormulaBlock
                  formula="FIRE Number = Annual Expenses ÷ Withdrawal Rate"
                  example="Example: $40,000 ÷ 0.04 = $1,000,000"
                />
                <p style={{ marginTop: "1rem" }}>
                  The savings table uses the{" "}
                  <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>future value of an annuity</strong>{" "}
                  formula to find how much you need to save monthly to hit your target by a given date:
                </p>
                <FormulaBlock
                  formula="PMT = FV × r / ((1 + r)ⁿ − 1)"
                  example="FV = FIRE number · r = monthly rate · n = total months"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { title: "The 4% Rule origin", body: "William Bengen's 1994 Trinity Study found that a diversified portfolio historically survived a 4% annual withdrawal rate for 30+ years. At 4%, your FIRE number is 25× your annual expenses." },
                  { title: "Why lower rates are safer", body: "A 3% withdrawal rate means a 33× FIRE number — 33% more to save, but your money is far less likely to run out. Early retirees planning 50+ year retirements often target 3–3.5%." },
                  { title: "Annual vs. monthly input", body: "Use the toggle to enter expenses as a monthly budget instead of an annual figure. The calculator automatically multiplies by 12 before applying the formula." },
                  { title: "The savings table assumes 7%", body: "The monthly savings needed chart uses 7% annual return (nominal) as the growth assumption — a commonly cited long-run US stock market average. Your actual results will vary." },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: "var(--f-page)",
                      border: "1px solid var(--f-border)",
                      borderRadius: "8px",
                      padding: "1rem 1.125rem",
                    }}
                  >
                    <p style={{ fontSize: "0.8375rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.3rem" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Example scenarios */}
          <section style={{ marginTop: "3rem" }}>
            <SectionHeading>Three FIRE number examples</SectionHeading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                gap: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <ExampleCard
                name="The Minimalist — $30K/year lifestyle"
                expenses="$30,000 / yr"
                withdrawalRate="4%"
                fireNumber="$750,000"
                monthlyWithdrawal="$2,500"
              />
              <ExampleCard
                name="The Standard Retiree — $50K/year"
                expenses="$50,000 / yr"
                withdrawalRate="4%"
                fireNumber="$1,250,000"
                monthlyWithdrawal="$4,167"
              />
              <ExampleCard
                name="The Conservative Early Retiree — 3.5%"
                expenses="$60,000 / yr"
                withdrawalRate="3.5%"
                fireNumber="$1,714,286"
                monthlyWithdrawal="$5,000"
              />
            </div>
            <div
              style={{
                background: "oklch(0.97 0.01 258)",
                border: "1px solid var(--f-blue-border)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
              }}
            >
              <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                The minimalist lifestyle at $30k/year requires only $750,000 — achievable much sooner than the standard path.
                The conservative early retiree drops to 3.5% withdrawal for a safer 50-year horizon, but pays a
                $464,000 premium on the FIRE number compared to $50k at 4%. Use the withdrawal rate slider to explore how much safety costs.
              </p>
            </div>
          </section>

          {/* 6. FIRE concepts explanation */}
          <section
            style={{
              marginTop: "3rem",
              background: "var(--f-card)",
              border: "1px solid var(--f-border)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "var(--f-shadow-card)",
            }}
          >
            <SectionHeading>The safe withdrawal rate: what the research says</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                <p>
                  The 4% rule is based on historical analysis of US market data. William Bengen studied rolling
                  30-year periods from 1926 onward and found that a portfolio of 50–75% stocks could sustain a 4%
                  annual withdrawal without running out of money in any historical period.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  The rule became mainstream after the Trinity Study (1998) by Cooley, Hubbard, and Walz extended
                  Bengen&apos;s work with different portfolio compositions and time horizons.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  For early retirees, a 40–50 year retirement horizon is common. More recent research — including
                  updated Trinity Study data — suggests the 4% rule holds for most historical periods at 30 years,
                  but retirees should consider 3–3.5% for very long retirements.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {[
                  { rate: "3.0%", multiplier: "33×", label: "Very conservative — longest runway, minimal risk" },
                  { rate: "3.5%", multiplier: "28.6×", label: "Conservative — recommended for 40–50 year retirements" },
                  { rate: "4.0%", multiplier: "25×", label: "Standard — the Trinity Study benchmark" },
                  { rate: "4.5%", multiplier: "22.2×", label: "Moderate — works well with some flexibility" },
                  { rate: "5.0%", multiplier: "20×", label: "Aggressive — requires strong returns or spending flexibility" },
                ].map((row) => (
                  <div
                    key={row.rate}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      background: "var(--f-page)",
                      border: "1px solid var(--f-border)",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--f-blue)",
                        minWidth: "2.75rem",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {row.rate}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--f-text-heading)", margin: 0 }}>
                        {row.multiplier} annual expenses
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", fontWeight: 300, margin: 0 }}>
                        {row.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ */}
          <section style={{ marginTop: "3rem" }}>
            <SectionHeading>Frequently asked questions</SectionHeading>
            <div style={{ borderTop: "1px solid var(--f-border)", maxWidth: "720px" }}>
              <FAQItem
                q="What is a FIRE number?"
                a="Your FIRE number is the total investment portfolio you need to retire permanently. Once you reach it, your portfolio generates enough returns to cover all expenses indefinitely. At a 4% withdrawal rate, your FIRE number is exactly 25× your annual spending."
              />
              <FAQItem
                q="How is the FIRE number calculated?"
                a="FIRE Number = Annual Expenses ÷ Withdrawal Rate. For $40,000 in annual expenses at a 4% withdrawal rate: $40,000 ÷ 0.04 = $1,000,000. This is the amount that, invested in a diversified portfolio, should sustain $40,000 in annual withdrawals indefinitely."
              />
              <FAQItem
                q="Should I use the 4% rule or a different withdrawal rate?"
                a="The 4% rule works well for 30-year retirements. For early retirement spanning 40–50 years, many FIRE practitioners use 3–3.5% to reduce the risk of running out of money. The more conservative your withdrawal rate, the larger your FIRE number — but the safer your retirement."
              />
              <FAQItem
                q="Does my FIRE number account for inflation?"
                a="Yes, indirectly. Your expenses are stated in today's dollars, and the safe withdrawal rate research accounts for inflation-adjusted withdrawals. As long as your portfolio is invested in assets that historically beat inflation (like broad market index funds), the real value of your portfolio is maintained."
              />
              <FAQItem
                q="Should I include Social Security in my FIRE number?"
                a="If you plan to receive Social Security, you can subtract that annual income from your expenses before calculating your FIRE number. Example: $50,000 expenses − $15,000 Social Security = $35,000 from portfolio. Your FIRE number would then be $35,000 ÷ 0.04 = $875,000 — significantly lower."
              />
              <FAQItem
                q="What return rate does the savings table assume?"
                a="The savings table assumes a 7% nominal annual return — a commonly cited long-run average for a diversified US stock market portfolio. This is before inflation. Real (inflation-adjusted) returns would be lower, around 4–5%."
              />
              <FAQItem
                q="Is this different from the full FIRE Calculator?"
                a="Yes. This calculator focuses on two things: your target number, and how much you need to save to reach it. The full FIRE Calculator adds your current portfolio, income, contributions, and inflation to project when you'll actually reach FIRE and at what age."
              />
              <FAQItem
                q="What about taxes on withdrawals?"
                a="This calculator does not model taxes. Depending on your account types (taxable, traditional IRA/401k, Roth), your effective tax rate in retirement varies significantly. Roth accounts are generally tax-free in retirement; traditional accounts are taxed as ordinary income. Consult a financial advisor for a tax-aware model."
              />
            </div>
          </section>

          {/* 8. Related calculators */}
          <section style={{ marginTop: "3rem" }}>
            <SectionHeading>Related calculators</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
              <RelatedCard
                name="FIRE Calculator"
                href="/fire-calculator"
                description="Full FIRE projection with your income, expenses, portfolio, and timeline to retirement."
                live={true}
              />
              <RelatedCard
                name="4% Rule Calculator"
                href="/4-percent-rule-calculator"
                description="Calculate safe annual withdrawals from a portfolio and how long the money lasts."
                live={false}
              />
              <RelatedCard
                name="Savings Rate Calculator"
                href="/savings-rate-calculator"
                description="See how your savings rate maps directly to years until financial independence."
                live={false}
              />
              <RelatedCard
                name="Coast FIRE Calculator"
                href="/coast-fire-calculator"
                description="Find the lump sum needed today so compound growth alone reaches your FIRE number."
                live={false}
              />
              <RelatedCard
                name="Compound Interest Calculator"
                href="/compound-interest-calculator"
                description="Project how investments grow over time with regular contributions."
                live={false}
              />
            </div>
          </section>

          {/* 9. Related blog articles placeholder */}
          <section style={{ marginTop: "3rem" }}>
            <SectionHeading>Learn more about FIRE</SectionHeading>
            <div
              style={{
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "10px",
                padding: "1.5rem",
              }}
            >
              <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                Articles on FIRE number strategy, the Trinity Study, safe withdrawal rates, and early retirement planning
                are coming soon. Check back or explore the{" "}
                <Link href="/fire-calculator" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                  full FIRE Calculator
                </Link>{" "}
                in the meantime.
              </p>
            </div>
          </section>

          {/* 10. Disclaimer */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.25rem",
              background: "var(--f-card)",
              border: "1px solid var(--f-border)",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
              <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
              This calculator is for educational and informational purposes only. It does not constitute financial, investment, or
              tax advice. All projections are estimates based on hypothetical scenarios — actual returns vary and past performance
              does not guarantee future results. The 4% rule and safe withdrawal rate research is based on historical US market data
              and may not reflect future market conditions. Consult a qualified financial advisor before making investment decisions.
            </p>
          </div>

        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
