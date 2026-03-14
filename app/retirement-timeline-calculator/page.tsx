// app/retirement-timeline-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { RetirementTimelineCalculator } from "@/components/calculators/retirement-timeline-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "Retirement Timeline Calculator — When Can You Retire?",
  description:
    "Calculate your retirement timeline and explore what-if scenarios: what happens if you cut expenses 20% or increase contributions? Free, instant results.",
  alternates: {
    canonical: `${config.siteUrl}/retirement-timeline-calculator`,
  },
  openGraph: {
    title: "Retirement Timeline Calculator — When Can You Retire?",
    description:
      "See your retirement age based on income, expenses, and portfolio — plus scenario comparisons showing how small changes drastically shorten your timeline.",
    url: `${config.siteUrl}/retirement-timeline-calculator`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const ON_THIS_PAGE = [
  { id: "how-to-use", label: "How to Use" },
  { id: "use-your-results", label: "Your Results" },
  { id: "how-it-works", label: "How It Works" },
  { id: "examples", label: "Examples" },
  { id: "why-it-matters", label: "Why It Matters" },
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
        {[...inputs, ...outputs].map((row) => (
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

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details style={{ borderBottom: "1px solid var(--f-border)" }}>
      <summary
        style={{
          padding: "1.25rem 0",
          cursor: "pointer",
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "var(--f-text-heading)",
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "1.25rem",
            height: "1.25rem",
            borderRadius: "50%",
            background: "var(--f-blue-light)",
            border: "1px solid var(--f-blue-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            color: "var(--f-blue)",
            fontWeight: 700,
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

function NextStepCard({ title, description, href, live }: {
  title: string; description: string; href: string; live: boolean
}) {
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1.125rem 1.375rem",
        background: "var(--f-card)",
        border: "1px solid var(--f-border)",
        borderRadius: "10px",
        opacity: live ? 1 : 0.5,
        transition: live ? "border-color 0.15s ease" : undefined,
      }}
      className={live ? "calc-card" : undefined}
    >
      <span
        style={{
          flexShrink: 0,
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          background: "var(--f-blue-light)",
          border: "1px solid var(--f-blue-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.875rem",
          color: "var(--f-blue)",
          fontWeight: 700,
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

export default function RetirementTimelineCalculatorPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)" }}>

        {/* ── Page header / H1 ── */}
        <div style={{ marginBottom: "2rem", maxWidth: "720px" }}>
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
            Retirement Timeline Calculator
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
            When Can You Retire?
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Enter your income, expenses, portfolio, and return assumptions to see your projected retirement age
            — then explore what-if scenarios showing exactly how cutting expenses by 10–30%, increasing
            contributions, or earning a higher return changes your retirement timeline. Results update instantly.
          </p>
        </div>

        {/* ── Calculator widget ── */}
        <section id="calculator" aria-label="Retirement Timeline Calculator" style={{ marginBottom: "3rem" }}>
          <RetirementTimelineCalculator />
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
                Enter your financial situation — results and scenario table update as you type:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Current age",
                    body: "Your age today. The calculator uses this as the starting point for your timeline projection and to compute your retirement age (current age + years to FI).",
                  },
                  {
                    n: "2",
                    title: "Annual income",
                    body: "Your total gross annual income from all sources. The calculator derives your annual savings as income minus expenses. If you have multiple income streams, add them together.",
                  },
                  {
                    n: "3",
                    title: "Annual expenses",
                    body: "What you spend in a year across all categories: housing, food, transport, travel, subscriptions, and discretionary spending. This number also sets your FIRE target — lower expenses means a smaller target AND more savings each year.",
                  },
                  {
                    n: "4",
                    title: "Current portfolio",
                    body: "The combined value of all your invested assets today: 401(k), IRA, Roth, and taxable brokerage accounts. Enter 0 if you are starting from scratch. Even a modest existing portfolio meaningfully shortens your timeline through compound growth.",
                  },
                  {
                    n: "5",
                    title: "Return, inflation, and withdrawal rate",
                    body: "Use the sliders to set your investment assumptions. The calculator adjusts your nominal return for inflation to produce a real (purchasing-power) projection. The withdrawal rate determines your FIRE target — 4% is the most common choice based on the Trinity Study.",
                  },
                ].map((step) => (
                  <li key={step.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        background: "var(--f-blue-light)",
                        border: "1px solid var(--f-blue-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-inter), ui-sans-serif, sans-serif",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--f-blue)",
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
                  { label: "Retirement Age", body: "The age at which your portfolio is projected to reach your FIRE number, based on your current savings rate and return assumptions. This is your primary output — the year your financial independence becomes possible." },
                  { label: "FIRE Number", body: "Your target portfolio value: annual expenses divided by your withdrawal rate. At 4% withdrawal, this equals 25× annual spending. This is the finish line. Reducing expenses shrinks the target while simultaneously increasing your annual savings." },
                  { label: "Years to FI", body: "How many years from today until your portfolio reaches the FIRE number. This drives your retirement age. Reducing this number by even 2–3 years is a significant life change — the scenario table shows you exactly how to do it." },
                  { label: "Annual Savings", body: "Income minus expenses — the fuel for your wealth-building engine. This is the primary input to the compound growth formula. Small increases compound dramatically over long timelines." },
                  { label: "Savings Rate", body: "Annual savings as a percentage of gross income. This is one of the best leading indicators of financial independence timeline. A 10% rate may take 40+ years; a 50% rate can achieve FI in under 20." },
                  { label: "What-If Scenarios", body: "The scenario table shows 8 alternative timelines: 3 expense cuts (10%, 20%, 30%), 3 contribution increases (10%, 20%, 30%), and 2 return scenarios (+1%, +2%). Each scenario recalculates your FIRE target and retirement age independently." },
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
              <SectionHeading>How the Retirement Timeline Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The calculator applies three formulas in sequence. First it determines your FIRE target,
                    then adjusts your return for inflation, then solves for the years until your portfolio
                    reaches that target using the compound growth formula.
                  </p>
                  <FormulaBlock
                    formula="FIRE Number = Annual Expenses ÷ Withdrawal Rate"
                    example="Example: $50,000 ÷ 0.04 = $1,250,000"
                  />
                  <FormulaBlock
                    formula="Real Return = ((1 + Nominal Return) ÷ (1 + Inflation)) − 1"
                    example="Example: (1.07 ÷ 1.03) − 1 ≈ 3.88% real return"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The years-to-FIRE formula solves for time given a starting portfolio, annual contributions,
                    and real return rate:
                  </p>
                  <FormulaBlock
                    formula="Years = log((F × r + C) ÷ (P × r + C)) ÷ log(1 + r)"
                    example="F = FIRE Number · r = real return · C = annual savings · P = current portfolio"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The scenario table recalculates this formula 8 times with modified inputs — expense cuts
                    simultaneously reduce F (smaller FIRE target) and increase C (more savings), which produces
                    a compounding effect that accelerates the timeline more than a return increase alone.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "Why inflation matters", body: "Using a nominal return (ignoring inflation) overstates portfolio growth in real terms. By using the real return rate — nominal return adjusted for inflation — the calculator projects your portfolio in today's dollars, making the FIRE number directly comparable to today's expenses." },
                    { title: "The dual power of expense cuts", body: "Cutting $5,000 from annual expenses does two things at once: it reduces your FIRE number by $125,000 (at 4% withdrawal, 25× multiplier) AND increases your annual savings by $5,000. No other single action has this compound effect on timeline." },
                    { title: "Contributions vs. returns", body: "In the early years of accumulation, savings contributions dominate portfolio growth. Returns become the larger driver once the portfolio is substantial. This is why the scenarios show more timeline improvement from expense cuts than from a 1% return improvement." },
                    { title: "Portfolio growth assumption", body: "The chart assumes end-of-year contributions and constant annual returns. Real markets are volatile — the chart shows a smoothed projection, not a guarantee. Use the scenarios to understand sensitivity to your assumptions." },
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

            {/* Examples */}
            <section id="examples" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Retirement timeline scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="Average Saver — 20% savings rate"
                  inputs={[
                    { label: "Age / Income", value: "35 / $75,000" },
                    { label: "Annual Expenses", value: "$60,000" },
                    { label: "Annual Savings", value: "$15,000 (20%)" },
                    { label: "Current Portfolio", value: "$25,000" },
                  ]}
                  outputs={[
                    { label: "FIRE Number", value: "$1,500,000" },
                    { label: "Years to FI (7% / 3% inflation)", value: "~36 years", highlight: true },
                    { label: "Retirement Age", value: "~71", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="Active FIRE saver — 40% savings rate"
                  inputs={[
                    { label: "Age / Income", value: "30 / $100,000" },
                    { label: "Annual Expenses", value: "$60,000" },
                    { label: "Annual Savings", value: "$40,000 (40%)" },
                    { label: "Current Portfolio", value: "$80,000" },
                  ]}
                  outputs={[
                    { label: "FIRE Number", value: "$1,500,000" },
                    { label: "Years to FI (7% / 3% inflation)", value: "~19 years", highlight: true },
                    { label: "Retirement Age", value: "~49", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="FIRE optimized — 60% savings rate"
                  inputs={[
                    { label: "Age / Income", value: "28 / $120,000" },
                    { label: "Annual Expenses", value: "$48,000" },
                    { label: "Annual Savings", value: "$72,000 (60%)" },
                    { label: "Current Portfolio", value: "$50,000" },
                  ]}
                  outputs={[
                    { label: "FIRE Number", value: "$1,200,000" },
                    { label: "Years to FI (7% / 3% inflation)", value: "~12 years", highlight: true },
                    { label: "Retirement Age", value: "~40", highlight: true },
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
                  The key insight: the FIRE optimized saver retires 31 years earlier than the average saver
                  despite earning only 60% more income. The difference is not income — it is the savings rate.
                  Use the scenario table in the calculator to model how even a 10% cut in your own expenses
                  changes your retirement age.
                </p>
              </div>
            </section>

            {/* Why it matters */}
            <section
              id="why-it-matters"
              style={{
                marginBottom: "3rem",
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <SectionHeading>Why your retirement timeline is more controllable than you think</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    Most people think of retirement age as something that happens to them — a date set by
                    Social Security eligibility or employer pension rules. The FIRE framework reframes this:
                    retirement is a financial milestone that you can reach by choice, and the primary levers
                    are savings rate, time in the market, and expense level — not income.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    The retirement timeline calculator makes this concrete. Enter your current numbers and
                    explore the scenario table. Most people find that cutting expenses by 20% or increasing
                    contributions by 30% compresses their retirement timeline by 5–10 years. A change that
                    costs relatively little in lifestyle terms can mean a decade of additional freedom.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    The compound growth formula is the engine. Money invested early has decades to multiply —
                    a dollar saved at 30 is worth far more than a dollar saved at 45. Time in the market is
                    the one input you cannot get back. The calculator quantifies this tradeoff for your
                    specific numbers.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { label: "The expense lever is underrated", body: "Most people focus on earning more as the path to early retirement. But reducing expenses is often faster. It takes years to negotiate a 20% raise; a spending audit can find 20% of expenses to eliminate in a weekend. The scenario table shows exactly how many years each expense cut is worth." },
                    { label: "Contributions matter most early on", body: "In the first decade of accumulation, your contributions are a larger driver of portfolio growth than investment returns. This means maximizing your savings rate in your 20s and 30s has an outsized impact on your retirement timeline compared to optimizing returns later." },
                    { label: "The 4% rule as a planning tool", body: "The 4% safe withdrawal rate — annual expenses × 25 = FIRE number — gives you a defensible target. It is based on decades of historical data showing that a diversified portfolio can sustain a 4% annual withdrawal through most 30-year periods, including major market downturns." },
                    { label: "Scenarios as a negotiation tool", body: "Use the scenario table to identify which changes have the most impact for you specifically. Some people find that a small increase in income contribution has more effect than a larger expense cut; others find the opposite. Your numbers tell your story." },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "var(--f-page)",
                        border: "1px solid var(--f-border)",
                        borderRadius: "8px",
                        padding: "1rem 1.125rem",
                      }}
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
                  q="What is the retirement timeline calculator?"
                  a="The retirement timeline calculator projects your retirement age based on your current income, expenses, portfolio, and investment return. It also generates a what-if scenario table showing how cutting expenses, increasing contributions, or earning a higher return changes your retirement date. It is designed for FIRE (Financial Independence, Retire Early) planning but is useful for any retirement timeline modeling."
                />
                <FAQItem
                  q="How is the retirement age calculated?"
                  a="The calculator first determines your FIRE number (annual expenses ÷ withdrawal rate), then uses the compound growth formula to solve for how many years your portfolio needs to reach that target given your annual savings and real return rate. Your retirement age is simply your current age plus those projected years. The formula accounts for inflation by using a real (inflation-adjusted) return rate."
                />
                <FAQItem
                  q="Why does the calculator use a real return rate?"
                  a="Investment returns are quoted in nominal terms — but your future expenses will be higher due to inflation. To make the projection meaningful in today's dollars, the calculator adjusts the nominal return for inflation: real return = (1 + nominal) / (1 + inflation) − 1. This means the FIRE number represents today's purchasing power, and the projection is in inflation-adjusted dollars."
                />
                <FAQItem
                  q="What are the what-if scenarios in the results table?"
                  a="The scenario table shows 8 alternative retirement timelines: three expense-cut scenarios (10%, 20%, 30% less spending), three contribution-increase scenarios (10%, 20%, 30% more savings), and two return scenarios (+1% and +2% annual return). Each scenario independently recalculates your FIRE target and years to retirement. Expense cuts are especially powerful because they reduce both your FIRE number and your time to reach it simultaneously."
                />
                <FAQItem
                  q="What is the 4% withdrawal rate and why is it the default?"
                  a="The 4% rule is based on the Trinity Study, which found that a 4% annual withdrawal from a balanced portfolio survived 95%+ of historical 30-year periods, including major market downturns. At 4%, your FIRE number equals 25× your annual expenses. This is a widely used planning benchmark — it is not a guarantee, but it represents a historically defensible starting point for retirement income planning."
                />
                <FAQItem
                  q="What if my expenses exceed my income?"
                  a="If your annual expenses equal or exceed your annual income, the calculator shows 'Cannot Reach FI' because there is no savings surplus to invest. The only solutions are to increase income or reduce expenses until income exceeds spending. Even a small savings margin, when invested consistently, builds meaningfully over time — the scenario table will show the impact of cutting expenses to create that margin."
                />
                <FAQItem
                  q="Should I include my home equity in the current portfolio?"
                  a="Generally, no. The FIRE Number represents a portfolio that generates income via the 4% rule — this requires liquid, invested assets like stocks and bonds. Home equity cannot generate this cash flow unless you sell or take a home equity loan. Enter only your liquid investment accounts: 401(k), IRA, Roth IRA, and taxable brokerage accounts."
                />
                <FAQItem
                  q="How accurate is this calculator?"
                  a="The calculator is a planning tool, not a financial forecast. It assumes constant annual returns and contributions, which do not reflect real-world market volatility, tax changes, or life events. The real value of the calculator is in exploring the relative impact of different choices — scenario comparison is more useful than treating the retirement age output as a precise prediction. For personalized projections, consult a fee-only financial advisor."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps on your FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Calculate your FIRE number"
                  description="Find your exact portfolio target based on your expenses and withdrawal rate — and see how monthly savings timelines vary."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Full FIRE projection"
                  description="Get a complete financial independence analysis with income, portfolio, contributions, and a year-by-year portfolio chart."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Calculate your savings rate"
                  description="See how your current savings rate maps to years to FI — and explore the full savings-rate-to-timeline table."
                  href="/savings-rate-calculator"
                  live={true}
                />
              </div>
            </section>

            {/* Related calculators */}
            <section id="related-calculators" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Related FIRE calculators</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
                <RelatedCard name="FIRE Calculator" href="/fire-calculator" description="Full FIRE projection with income, portfolio, contributions, and retirement age." live={true} />
                <RelatedCard name="FIRE Number Calculator" href="/fire-number-calculator" description="Find exactly how much you need to retire based on your expenses and withdrawal rate." live={true} />
                <RelatedCard name="Savings Rate Calculator" href="/savings-rate-calculator" description="See how your savings rate maps to years until financial independence." live={true} />
                <RelatedCard name="Coast FIRE Calculator" href="/coast-fire-calculator" description="Find the lump sum needed today so compound growth alone reaches your FIRE number." live={true} />
                <RelatedCard name="4% Rule Calculator" href="/4-percent-rule-calculator" description="Calculate safe annual withdrawals and how long your portfolio will last." live={true} />
                <RelatedCard name="Investment Growth Calculator" href="/investment-growth-calculator" description="Project how your investments compound over time with regular contributions." live={true} />
              </div>
            </section>

            {/* Related blog articles */}
            <section id="related-articles" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Related articles</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { title: "What is FIRE? Financial Independence, Retire Early Explained", href: "/blog/what-is-fire", description: "A complete introduction to the FIRE movement — what it is, why people pursue it, and the core formulas behind every FIRE calculation." },
                  { title: "The 4% Rule Explained: Safe Withdrawal Rate for Retirement", href: "/blog/4-percent-rule-explained", description: "The research behind the 4% safe withdrawal rate, what the Trinity Study actually found, and how to apply it to your own retirement planning." },
                  { title: "Best Savings Rate for FIRE: How Much Do You Need to Save?", href: "/blog/savings-rate-and-retirement", description: "How savings rate determines retirement timeline more than income — and the exact relationship between savings rate and years to financial independence." },
                ].map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: "var(--f-card)",
                        border: "1px solid var(--f-border)",
                        borderRadius: "10px",
                        padding: "1.125rem 1.375rem",
                        transition: "border-color 0.15s ease",
                      }}
                      className="calc-card"
                    >
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.25rem", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
                        {article.title}
                      </p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                        {article.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <div id="disclaimer" style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial,
                investment, or tax advice. All projections are estimates based on hypothetical scenarios — actual
                investment returns vary and past performance does not guarantee future results. The years-to-retirement
                calculation assumes constant annual returns and contributions, which does not reflect real-world
                market volatility, tax implications, or life changes. The 4% safe withdrawal rate is a historical
                guideline based on the Trinity Study, not a guarantee of future portfolio sustainability. Consult
                a qualified financial advisor before making investment decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
