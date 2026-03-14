// app/4-percent-rule-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { FourPercentRuleCalculator } from "@/components/calculators/four-percent-rule-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "4% Rule Calculator — Safe Withdrawal Rate Calculator",
  description:
    "Calculate your safe annual and monthly withdrawal amount using the 4% rule. See how long your retirement portfolio will last at different withdrawal rates.",
  alternates: {
    canonical: `${config.siteUrl}/4-percent-rule-calculator`,
  },
  openGraph: {
    title: "4% Rule Calculator — Safe Withdrawal Rate Calculator",
    description:
      "Find your safe retirement withdrawal amount. Enter your portfolio size and see how long your money lasts at 3%, 4%, and 5% withdrawal rates.",
    url: `${config.siteUrl}/4-percent-rule-calculator`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const ON_THIS_PAGE = [
  { id: "how-to-use", label: "How to Use" },
  { id: "use-your-results", label: "Your Results" },
  { id: "how-it-works", label: "How It Works" },
  { id: "examples", label: "Examples" },
  { id: "four-percent-rule-explained", label: "The 4% Rule" },
  { id: "faq", label: "FAQ" },
  { id: "next-steps", label: "Next Steps" },
  { id: "related-calculators", label: "Related Calculators" },
  { id: "disclaimer", label: "Disclaimer" },
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
      <p style={{ fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.9375rem", color: "var(--f-text-heading)", fontStyle: "italic", marginBottom: "0.375rem" }}>
        {formula}
      </p>
      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", margin: 0, fontWeight: 300 }}>
        {example}
      </p>
    </div>
  )
}

function ExampleCard({
  name, inputs, outputs,
}: {
  name: string
  inputs: { label: string; value: string }[]
  outputs: { label: string; value: string; highlight?: boolean }[]
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
      <p style={{ fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.9375rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "1rem", paddingBottom: "0.875rem", borderBottom: "1px solid var(--f-border)", lineHeight: 1.35 }}>
        {name}
      </p>
      <dl>
        {[...inputs, ...outputs].map((row) => (
          <div
            key={row.label}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.4375rem 0", borderBottom: "1px solid var(--f-border)" }}
          >
            <dt style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", fontWeight: 300 }}>
              {row.label}
            </dt>
            <dd
              style={{
                fontSize: (row as { highlight?: boolean }).highlight ? "0.9375rem" : "0.875rem",
                color: (row as { highlight?: boolean }).highlight ? "var(--f-blue)" : "var(--f-text-body)",
                fontWeight: (row as { highlight?: boolean }).highlight ? 700 : 450,
                fontFamily: (row as { highlight?: boolean }).highlight ? "var(--font-inter), ui-sans-serif, sans-serif" : undefined,
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

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details style={{ borderBottom: "1px solid var(--f-border)" }}>
      <summary
        style={{ padding: "1.25rem 0", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}
      >
        <span style={{ fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.9375rem", fontWeight: 600, color: "var(--f-text-heading)", letterSpacing: "-0.01em", lineHeight: 1.35 }}>
          {q}
        </span>
        <span
          style={{
            flexShrink: 0, width: "1.25rem", height: "1.25rem", borderRadius: "50%",
            background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem", color: "var(--f-blue)", fontWeight: 700,
          }}
        >
          +
        </span>
      </summary>
      <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0, paddingBottom: "1.25rem" }}>
        {a}
      </p>
    </details>
  )
}

function RelatedCard({ name, href, description, live }: {
  name: string; href: string; description: string; live: boolean
}) {
  const inner = (
    <div
      style={{
        background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "10px",
        padding: "1.25rem 1.375rem", height: "100%", boxSizing: "border-box",
        opacity: live ? 1 : 0.55,
        transition: live ? "border-color 0.15s ease, box-shadow 0.15s ease" : undefined,
      }}
      className={live ? "calc-card" : undefined}
    >
      <p style={{ fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.9375rem", fontWeight: 600, color: live ? "var(--f-text-heading)" : "var(--f-text-muted)", marginBottom: "0.375rem", lineHeight: 1.3 }}>
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

function NextStepCard({ title, description, href, live }: {
  title: string; description: string; href: string; live: boolean
}) {
  const inner = (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: "1rem",
        padding: "1.125rem 1.375rem", background: "var(--f-card)",
        border: "1px solid var(--f-border)", borderRadius: "10px",
        opacity: live ? 1 : 0.5,
        transition: live ? "border-color 0.15s ease" : undefined,
      }}
      className={live ? "calc-card" : undefined}
    >
      <span
        style={{
          flexShrink: 0, width: "2rem", height: "2rem", borderRadius: "50%",
          background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.875rem", color: "var(--f-blue)", fontWeight: 700,
        }}
      >
        →
      </span>
      <div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.25rem", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
          {title}
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  )
  if (live) return <Link href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>
  return <div>{inner}</div>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FourPercentRuleCalculatorPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)" }}>

        {/* ── Page header / H1 ── */}
        <div style={{ marginBottom: "2rem", maxWidth: "720px" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
            4% Rule Calculator
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
            How Long Will Your Retirement Portfolio Last?
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Use our free 4% rule calculator to find your safe annual withdrawal amount and see how long your
            retirement portfolio will last at different withdrawal rates. Enter your portfolio size, expected
            return, and inflation rate — results update instantly with a side-by-side comparison at 3%, 4%, and 5%.
          </p>
        </div>

        {/* ── Calculator widget ── */}
        <section id="calculator" aria-label="4% Rule Calculator" style={{ marginBottom: "3rem" }}>
          <FourPercentRuleCalculator />
        </section>

        {/* ── Two-column: on-this-page + content ── */}
        <div style={{ display: "flex", gap: "3.5rem", alignItems: "flex-start" }}>

          <OnThisPage sections={ON_THIS_PAGE} />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* How to use */}
            <section
              id="how-to-use"
              style={{
                marginBottom: "3rem",
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <SectionHeading>How to use this calculator</SectionHeading>
              <p style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.5rem" }}>
                Adjust the inputs to model your retirement withdrawal scenario — results update instantly:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Portfolio value",
                    body: "Enter the total value of your retirement savings across all accounts — 401(k), IRA, Roth IRA, and taxable brokerage accounts combined. This is your starting balance at the point of retirement, not today's balance if you are still saving.",
                  },
                  {
                    n: "2",
                    title: "Withdrawal rate",
                    body: "The percentage of your portfolio you plan to withdraw each year. The classic 4% rule means withdrawing 4% in year one and adjusting for inflation each year. Lower rates (3–3.5%) are more conservative; higher rates (4.5–5%) increase depletion risk. Use the slider to see the impact of each rate.",
                  },
                  {
                    n: "3",
                    title: "Expected annual return",
                    body: "The nominal annual return you expect from your invested portfolio. A balanced stock/bond portfolio has historically returned 5–7% nominally. More conservative retirees often hold more bonds, so 4–5% is a reasonable baseline. You can test multiple assumptions using the slider.",
                  },
                  {
                    n: "4",
                    title: "Inflation rate",
                    body: "The calculator adjusts your portfolio performance for inflation internally — this determines your real (inflation-adjusted) return. Historically, US inflation has averaged around 3%. Use a higher rate for more conservative projections. The 4% rule was originally designed assuming approximately 3% inflation.",
                  },
                ].map((step) => (
                  <li key={step.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        flexShrink: 0, width: "2rem", height: "2rem", borderRadius: "50%",
                        background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
                        fontSize: "0.8125rem", fontWeight: 700, color: "var(--f-blue)",
                      }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.3rem", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
                        {step.title}
                      </p>
                      <p style={{ fontSize: "0.8375rem", color: "var(--f-text-muted)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Use your results */}
            <section id="use-your-results" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Understanding your results</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: "1rem" }}>
                {[
                  { label: "Annual Safe Withdrawal", body: "The dollar amount you can withdraw from your portfolio each year under the 4% rule (or your chosen rate). This is the spending budget your portfolio can theoretically support. Withdraw more than this, and you risk running out of money." },
                  { label: "Monthly Withdrawal", body: "Your annual withdrawal divided by 12. This is your monthly retirement income from portfolio withdrawals. Compare this to your expected monthly retirement expenses to see if your portfolio is large enough." },
                  { label: "Portfolio Duration", body: "How many years your portfolio is estimated to last at the selected withdrawal rate, given your expected return and inflation assumptions. \"Indefinite\" means your portfolio generates enough real return to sustain withdrawals indefinitely — it may actually grow over time." },
                  { label: "Safe / High Indicator", body: "A withdrawal rate is considered safe if the portfolio is projected to last 30 or more years — the standard benchmark based on the original Trinity Study research behind the 4% rule. Higher withdrawal rates that deplete the portfolio in under 30 years are flagged as high-risk." },
                  { label: "Comparison Table", body: "Shows your annual and monthly withdrawal amount at five withdrawal rates (3%, 3.5%, 4%, 4.5%, 5%) and how long the portfolio lasts at each rate. This makes it easy to understand the trade-off between spending more now and running the portfolio longer." },
                  { label: "Depletion Chart", body: "The line chart shows your portfolio balance over time at 3%, 4%, and 5% withdrawal rates. Lines that drop to zero have depleted the portfolio. Lines that remain flat or grow indicate the withdrawal rate is sustainable indefinitely with your return assumptions." },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "var(--f-card)", border: "1px solid var(--f-border)",
                      borderRadius: "10px", padding: "1.375rem", boxShadow: "var(--f-shadow-card)",
                    }}
                  >
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--f-blue)", marginBottom: "0.5rem" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section
              id="how-it-works"
              style={{
                marginBottom: "3rem",
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <SectionHeading>How this calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The calculator first computes your annual withdrawal amount as a simple percentage of your portfolio value.
                    It then determines how long that portfolio will last by solving the present value annuity formula using
                    your inflation-adjusted (real) return rate.
                  </p>
                  <FormulaBlock
                    formula="Annual Withdrawal = Portfolio Value × Withdrawal Rate"
                    example="$1,000,000 × 4% = $40,000 per year"
                  />
                  <FormulaBlock
                    formula="Real Return = ((1 + Nominal Return) / (1 + Inflation)) − 1"
                    example="(1.05 / 1.03) − 1 ≈ 1.94% real return"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    Portfolio duration is calculated using the present value annuity formula:
                  </p>
                  <FormulaBlock
                    formula="Years = −log(1 − (Portfolio × r) / Withdrawal) / log(1 + r)"
                    example="r = real return rate · when real return ≥ withdrawal rate → indefinite"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    When the portfolio&apos;s real return equals or exceeds the annual withdrawal amount, the portfolio
                    lasts indefinitely — it generates enough growth to cover withdrawals without depleting the principal.
                    This is the ideal outcome for sustainable retirement income.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "Why the 4% rule uses real returns", body: "The 4% rule was designed to maintain purchasing power in retirement — meaning withdrawals increase with inflation each year. By using the real return rate internally, this calculator models that inflation-adjusted withdrawal strategy automatically." },
                    { title: "What 'indefinite' duration means", body: "When your real return exceeds your withdrawal rate, your portfolio generates more growth than you withdraw. This means it can last indefinitely — and may even grow over time. This is the goal of very conservative withdrawal strategies (3% or below) with decent returns." },
                    { title: "The comparison table shows trade-offs", body: "Withdrawing 3% vs 5% may seem like a small difference, but the impact on portfolio duration is dramatic. The comparison table makes this concrete: at 2% real return, 3% may last indefinitely while 5% depletes in 26 years from the same $1M portfolio." },
                    { title: "Sequence of returns risk not modeled", body: "This calculator assumes a constant annual return, which is a simplification. In reality, poor returns in early retirement years (sequence of returns risk) can deplete portfolios faster than this model predicts. Flexible withdrawal strategies help manage this risk." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      style={{ background: "var(--f-page)", border: "1px solid var(--f-border)", borderRadius: "8px", padding: "1rem 1.125rem" }}
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

            {/* Examples */}
            <section id="examples" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Worked examples</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="Classic FIRE retiree — $1M portfolio"
                  inputs={[
                    { label: "Portfolio Value", value: "$1,000,000" },
                    { label: "Withdrawal Rate", value: "4%" },
                    { label: "Annual Return", value: "5%" },
                    { label: "Inflation Rate", value: "3%" },
                  ]}
                  outputs={[
                    { label: "Annual Withdrawal", value: "$40,000", highlight: true },
                    { label: "Monthly Withdrawal", value: "$3,333" },
                    { label: "Real Return", value: "1.94%" },
                    { label: "Portfolio Duration", value: "~38 years", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="Conservative retiree — 3% withdrawal"
                  inputs={[
                    { label: "Portfolio Value", value: "$1,500,000" },
                    { label: "Withdrawal Rate", value: "3%" },
                    { label: "Annual Return", value: "6%" },
                    { label: "Inflation Rate", value: "3%" },
                  ]}
                  outputs={[
                    { label: "Annual Withdrawal", value: "$45,000", highlight: true },
                    { label: "Monthly Withdrawal", value: "$3,750" },
                    { label: "Real Return", value: "2.91%" },
                    { label: "Portfolio Duration", value: "Indefinite ∞", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="Higher withdrawal — near-term risk"
                  inputs={[
                    { label: "Portfolio Value", value: "$800,000" },
                    { label: "Withdrawal Rate", value: "5%" },
                    { label: "Annual Return", value: "4%" },
                    { label: "Inflation Rate", value: "3%" },
                  ]}
                  outputs={[
                    { label: "Annual Withdrawal", value: "$40,000", highlight: true },
                    { label: "Monthly Withdrawal", value: "$3,333" },
                    { label: "Real Return", value: "0.97%" },
                    { label: "Portfolio Duration", value: "~23 years", highlight: true },
                  ]}
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
                  The second example shows a key insight: with a 3% withdrawal rate and a 2.9% real return, the
                  portfolio growth nearly matches withdrawals — making the portfolio sustainable indefinitely.
                  The third example illustrates the danger of a 5% withdrawal rate with below-average returns:
                  the same $40,000/year becomes unsustainable in under 25 years.
                </p>
              </div>
            </section>

            {/* 4% Rule Explained */}
            <section
              id="four-percent-rule-explained"
              style={{
                marginBottom: "3rem",
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <SectionHeading>The 4% rule explained</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The 4% rule originated from the Trinity Study, a landmark 1998 paper by three professors at
                    Trinity University. They analyzed historical stock and bond returns from 1926–1995 and found
                    that a 4% annual withdrawal rate had a very high probability of lasting 30 years across all
                    historical market cycles — including the Great Depression.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    The rule works as follows: in your first year of retirement, withdraw 4% of your portfolio.
                    Each subsequent year, increase that dollar amount by inflation — not recalculate 4% of the
                    current balance. This maintains your purchasing power over time while giving the portfolio
                    room to recover from market downturns.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    For FIRE (Financial Independence Retire Early) planning, the 4% rule implies a simple target:
                    save 25× your annual expenses. That is the portfolio size where a 4% withdrawal exactly covers
                    your costs. This is the foundation behind the{" "}
                    <Link href="/fire-number-calculator" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                      FIRE number
                    </Link>{" "}
                    that most FIRE planners work toward.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    Read the full guide:{" "}
                    <Link href="/blog/4-percent-rule-explained" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                      The 4% Rule Explained →
                    </Link>
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { label: "Is the 4% rule still valid?", body: "The original study used historical data from 1926–1995. More recent research (Pfau, Kitces) suggests that with lower expected future returns and longer retirement periods (40–50 years for early retirees), 3–3.5% may be more appropriate. The 4% rule is a useful starting point, not a guarantee." },
                    { label: "The 25× rule connection", body: "If you withdraw 4% per year, you need a portfolio 25× your annual expenses to fund it. $50,000/year spending → $1,250,000 FIRE number. This reciprocal relationship is why FIRE planners obsess over their FIRE number." },
                    { label: "Flexible vs rigid withdrawals", body: "The original 4% rule assumes rigid inflation-adjusted withdrawals every year regardless of market performance. Many financial planners now recommend flexible spending strategies — reducing withdrawals in poor market years — which can make even higher initial rates sustainable." },
                    { label: "How long should your portfolio last?", body: "For traditional retirees at 65, 30 years is the benchmark. For early retirees at 45, 50+ years is more appropriate. FIRE retirees should use more conservative withdrawal rates (3–3.5%) or plan for flexible spending to account for the longer horizon." },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{ background: "var(--f-page)", border: "1px solid var(--f-border)", borderRadius: "8px", padding: "1rem 1.125rem" }}
                    >
                      <p style={{ fontSize: "0.8375rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.3rem" }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Frequently asked questions</SectionHeading>
              <div style={{ borderTop: "1px solid var(--f-border)", maxWidth: "720px" }}>
                <FAQItem
                  q="What is the 4% rule?"
                  a="The 4% rule states that you can safely withdraw 4% of your retirement portfolio in year one, then increase that dollar amount by inflation each year, with a high probability of the portfolio lasting 30 years. It originated from the 1998 Trinity Study analyzing historical stock and bond returns. For FIRE planning, the 4% rule implies a savings target of 25× your annual expenses."
                />
                <FAQItem
                  q="Is the 4% rule still safe for early retirees?"
                  a={<>The original 4% rule was designed for a 30-year retirement. For FIRE retirees planning a 40–50 year retirement, 3–3.5% is often recommended by researchers like Wade Pfau. Use this calculator to test different withdrawal rates against your expected returns and choose a rate that feels sustainable over your full retirement horizon. See our <Link href="/blog/4-percent-rule-explained" style={{ color: "var(--f-blue)", textDecoration: "none" }}>4% rule explainer</Link> for more context.</>}
                />
                <FAQItem
                  q="What withdrawal rate should I use?"
                  a="The right withdrawal rate depends on your expected retirement length and risk tolerance. 3% is very conservative — appropriate for 50+ year retirements or very low-risk portfolios. 4% is the classic benchmark for 30-year retirements. Anything above 4.5% carries meaningful depletion risk unless your return assumptions are optimistic or your retirement spending is flexible."
                />
                <FAQItem
                  q="What does 'indefinite' portfolio duration mean?"
                  a="When your portfolio's real (inflation-adjusted) return equals or exceeds your annual withdrawal amount, the portfolio generates enough growth to sustain withdrawals without eroding the principal. In this scenario, the portfolio could last indefinitely — and may even grow over time. This is typically the outcome at 3% withdrawal rates with decent investment returns."
                />
                <FAQItem
                  q="Does this calculator account for taxes?"
                  a="No — this calculator models pre-tax returns and withdrawals. In practice, withdrawals from traditional 401(k) and IRA accounts are taxed as ordinary income. Roth accounts are tax-free in retirement. A realistic retirement plan should account for your tax situation, which can significantly affect the net withdrawal amount available for spending."
                />
                <FAQItem
                  q="What return rate should I use for a retirement portfolio?"
                  a="A balanced 60/40 stock/bond portfolio has historically returned around 5–7% nominally. More conservative allocations (40/60 or less equity) typically return 4–5%. With inflation at 3%, your real return is roughly 2–4% for a balanced portfolio. Use 5% nominal / 3% inflation (2% real) as a conservative baseline and 7% / 3% (4% real) as a moderate assumption."
                />
                <FAQItem
                  q="How does the 4% rule relate to my FIRE number?"
                  a={<>Your FIRE number is the portfolio size needed to fund retirement at a 4% withdrawal rate — it is simply 25× your annual expenses. If you spend $60,000/year, your FIRE number is $1,500,000. Use our <Link href="/fire-number-calculator" style={{ color: "var(--f-blue)", textDecoration: "none" }}>FIRE Number Calculator</Link> to find your exact target, and the <Link href="/fire-calculator" style={{ color: "var(--f-blue)", textDecoration: "none" }}>FIRE Calculator</Link> to see how long it will take to get there.</>}
                />
                <FAQItem
                  q="What is sequence of returns risk?"
                  a="Sequence of returns risk refers to the danger of experiencing poor investment returns in the early years of retirement. Even if the long-run average return is the same, retiring into a bear market forces you to sell assets at low prices, which permanently reduces the portfolio's ability to recover. This risk is not modeled in this calculator, which assumes constant annual returns. Flexible spending strategies or a cash buffer can help mitigate it."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps on your FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Find your FIRE Number"
                  description="Calculate exactly how much you need to retire based on your annual expenses and withdrawal rate — your savings target."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Project your full FIRE timeline"
                  description="Combine your savings rate, portfolio, and expenses into a complete FIRE projection — see your FIRE date and age."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Calculate your savings rate"
                  description="See how your current savings rate maps to years until financial independence and how increasing it compresses your timeline."
                  href="/savings-rate-calculator"
                  live={true}
                />
              </div>
            </section>

            {/* Related calculators */}
            <section id="related-calculators" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Related FIRE calculators</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
                <RelatedCard name="FIRE Calculator" href="/fire-calculator" description="Full FIRE projection with income, portfolio, contributions, and retirement timeline." live={true} />
                <RelatedCard name="FIRE Number Calculator" href="/fire-number-calculator" description="Find exactly how much you need to retire based on your expenses and withdrawal rate." live={true} />
                <RelatedCard name="Coast FIRE Calculator" href="/coast-fire-calculator" description="Find the lump sum needed today so compound growth alone reaches your FIRE number." live={true} />
                <RelatedCard name="Savings Rate Calculator" href="/savings-rate-calculator" description="See how your savings rate affects your timeline to financial independence." live={true} />
                <RelatedCard name="Investment Growth Calculator" href="/investment-growth-calculator" description="Project how a portfolio grows with initial investment and monthly contributions over time." live={true} />
              </div>
            </section>

            {/* Disclaimer */}
            <div id="disclaimer" style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial,
                investment, or tax advice. The 4% rule is based on historical market data and does not guarantee future
                results. Portfolio duration projections assume a constant annual return rate — real-world returns vary
                significantly year-to-year, and sequence of returns risk is not modeled. Consult a qualified financial
                advisor before making retirement withdrawal decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
