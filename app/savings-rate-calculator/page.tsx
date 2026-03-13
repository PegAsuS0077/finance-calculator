// app/savings-rate-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { SavingsRateCalculator } from "@/components/calculators/savings-rate-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "Savings Rate Calculator — How Fast Can You Reach FIRE?",
  description:
    "Calculate your current savings rate and see exactly how many years until financial independence. Based on the Mr. Money Mustache model.",
  alternates: {
    canonical: `${config.siteUrl}/savings-rate-calculator`,
  },
  openGraph: {
    title: "Savings Rate Calculator — How Fast Can You Reach FIRE?",
    description:
      "Calculate your savings rate and see how many years until financial independence. Free, instant results.",
    url: `${config.siteUrl}/savings-rate-calculator`,
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

export default function SavingsRateCalculatorPage() {
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
            Savings Rate Calculator
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
            How Fast Can You Reach Financial Independence?
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Your savings rate is the single most powerful lever in your FIRE journey. Enter your income and
            expenses to see your current savings rate, your FIRE number, and exactly how many years until
            financial independence — plus a full table showing how each 10% increase in savings rate cuts
            years off your timeline.
          </p>
        </div>

        {/* ── Calculator widget ── */}
        <section id="calculator" aria-label="Savings Rate Calculator" style={{ marginBottom: "3rem" }}>
          <SavingsRateCalculator />
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
                Enter your income and expenses — results update instantly as you type:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Annual gross income",
                    body: "Enter your total annual income before taxes. This field is informational and used to give context alongside your take-home pay. If you are self-employed, enter your gross business revenue before expenses.",
                  },
                  {
                    n: "2",
                    title: "Annual take-home income",
                    body: "Enter what actually hits your bank account after all taxes and deductions. This is the income you live on and save from. For most salaried employees, this is your net pay multiplied by your pay periods per year.",
                  },
                  {
                    n: "3",
                    title: "Annual expenses",
                    body: "How much do you spend in a year? Include housing, food, transport, subscriptions, travel, and discretionary spending. This drives both your savings rate calculation and your FIRE number. Lower expenses have a double impact: they increase your savings AND lower your target.",
                  },
                  {
                    n: "4",
                    title: "Expected annual return",
                    body: "Adjust the slider for your assumed investment return rate. A diversified stock portfolio has historically returned 7–10% nominally. Use 5–7% for conservative estimates. The default is 5% to produce realistic results for most scenarios.",
                  },
                  {
                    n: "5",
                    title: "Current portfolio value",
                    body: "Enter the current value of all your invested assets: 401(k), IRA, Roth, brokerage accounts. A non-zero starting portfolio reduces your years to FI by letting compound growth work from day one. Enter 0 if you are starting from scratch.",
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
                  { label: "Savings Rate (%)", body: "The percentage of your take-home income you save and invest each year. This is the primary variable that determines how quickly you reach FI. A 50% savings rate means you can theoretically retire in about 17 years from scratch at a 5% return." },
                  { label: "Annual Savings", body: "The dollar amount you save per year: take-home income minus annual expenses. This is the fuel for your wealth-building engine. Even small increases in annual savings compound dramatically over time." },
                  { label: "FIRE Number", body: "The portfolio size needed to sustain your expenses indefinitely using the 4% safe withdrawal rate. It equals your annual expenses multiplied by 25. Reducing expenses shrinks this target — one of the most powerful moves in the FIRE playbook." },
                  { label: "Years to FI", body: "How many years at your current savings rate and return assumption before your portfolio reaches your FIRE number. This uses the Mr. Money Mustache formula, which accounts for compound growth on your existing portfolio and ongoing contributions." },
                  { label: "Years to FI Table", body: "The table rows show years to FI at savings rates from 10% to 90% — holding your take-home income and return constant. The row closest to your current savings rate is highlighted. Use this to model the impact of increasing your savings rate." },
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
              <SectionHeading>How the Savings Rate Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The calculator uses three formulas in sequence. First it calculates your savings rate,
                    then your FIRE number, then the years to FI using the logarithmic compound growth formula
                    popularized by Mr. Money Mustache.
                  </p>
                  <FormulaBlock
                    formula="Savings Rate = (Take-Home − Expenses) ÷ Take-Home"
                    example="Example: ($60,000 − $45,000) ÷ $60,000 = 25%"
                  />
                  <FormulaBlock
                    formula="FIRE Number = Annual Expenses ÷ 0.04"
                    example="Example: $45,000 ÷ 0.04 = $1,125,000"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The years to FI formula accounts for the compound growth of both your existing portfolio
                    and your ongoing annual savings contributions:
                  </p>
                  <FormulaBlock
                    formula="Years = log((F × r + S) ÷ (P × r + S)) ÷ log(1 + r)"
                    example="F = FIRE Number · r = annual return · S = annual savings · P = current portfolio"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    If your return rate is zero, a simpler linear formula is used: (FIRE Number − Portfolio) ÷ Annual Savings.
                    If your savings rate is negative (expenses exceed income), years to FI is shown as 100+ to indicate
                    FI cannot be reached at the current trajectory.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "Why savings rate beats income", body: "Two households earning the same income can have radically different timelines to FI. A household spending 80% of income needs 45 years to retire; one spending 50% needs only 17. Income matters less than what you keep." },
                    { title: "The double benefit of lower expenses", body: "Reducing annual expenses improves your savings rate AND reduces your FIRE number. Cutting $5,000 per year increases your annual savings by $5,000 and reduces your FIRE target by $125,000 (25×). No other single move has this dual impact." },
                    { title: "Compound growth on existing savings", body: "The formula gives full credit to your existing portfolio — it grows at your assumed return rate, reducing the heavy lifting your annual savings must do. Even a modest portfolio of $50,000 can meaningfully compress your timeline." },
                    { title: "The 4% rule assumption", body: "The FIRE Number uses the 4% rule: annual expenses ÷ 0.04 = 25× expenses. This is based on the Trinity Study, which found that a 4% initial withdrawal rate sustained a 30-year retirement in the vast majority of historical periods." },
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
              <SectionHeading>Savings rate scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="Average American — 15% savings rate"
                  inputs={[
                    { label: "Take-Home Income", value: "$60,000 / yr" },
                    { label: "Annual Expenses", value: "$51,000 / yr" },
                    { label: "Annual Savings", value: "$9,000 / yr" },
                  ]}
                  outputs={[
                    { label: "Savings Rate", value: "15%", highlight: true },
                    { label: "FIRE Number", value: "$1,275,000" },
                    { label: "Years to FI (5% return)", value: "~43 years", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="Serious saver — 40% savings rate"
                  inputs={[
                    { label: "Take-Home Income", value: "$80,000 / yr" },
                    { label: "Annual Expenses", value: "$48,000 / yr" },
                    { label: "Annual Savings", value: "$32,000 / yr" },
                  ]}
                  outputs={[
                    { label: "Savings Rate", value: "40%", highlight: true },
                    { label: "FIRE Number", value: "$1,200,000" },
                    { label: "Years to FI (7% return)", value: "~19 years", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="FIRE optimized — 65% savings rate"
                  inputs={[
                    { label: "Take-Home Income", value: "$100,000 / yr" },
                    { label: "Annual Expenses", value: "$35,000 / yr" },
                    { label: "Annual Savings", value: "$65,000 / yr" },
                  ]}
                  outputs={[
                    { label: "Savings Rate", value: "65%", highlight: true },
                    { label: "FIRE Number", value: "$875,000" },
                    { label: "Years to FI (7% return)", value: "~10 years", highlight: true },
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
                  Notice how dramatically the FIRE Number drops as expenses fall. The 65% saver not only contributes
                  more each year — they also need far less to retire. This dual compression is why FIRE practitioners
                  focus on expenses first and income second. Cutting expenses is the highest-leverage move available.
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
              <SectionHeading>Why savings rate is the master variable</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    In 2013, Mr. Money Mustache published a blog post titled{" "}
                    <em>The Shockingly Simple Math Behind Early Retirement</em>. The central insight:
                    your savings rate — not your income, not your investment picks — is the primary
                    determinant of how long you must work.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    A person saving 10% of income needs roughly 43 years to retire (at 5% return).
                    A person saving 50% needs only about 17 years. A person saving 75% can retire in
                    about 7 years. The relationship is non-linear: each additional percentage point
                    of savings rate has a larger impact than the last.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    This insight is liberating because it decouples retirement from income. A household
                    earning $60,000 and saving 50% will reach FI before a household earning $150,000 and
                    saving 10%. What matters is the gap between what you earn and what you spend.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { label: "Savings rate vs. investment returns", body: "For most people in the accumulation phase, savings rate has a far larger impact on timeline than investment returns. Increasing savings from 20% to 30% cuts years off your timeline more reliably than chasing higher returns." },
                    { label: "The frugality multiplier", body: "Every dollar you don't spend does double duty: it increases your savings by $1, and it reduces your FIRE number by $25 (since the FIRE number is 25× annual expenses). This is why FIRE practitioners describe frugality as a superpower." },
                    { label: "Starting point matters less than you think", body: "Whether you're starting from $0 or $100,000, the savings rate formula shows that your ongoing savings rate dominates your timeline. A late starter with a high savings rate can still reach FI faster than an early starter with a low one." },
                    { label: "Benchmarks to aim for", body: "Financial advisors typically recommend saving 10–15% of income. FIRE practitioners target 40–70%+. Even moving from 15% to 25% can cut your working years significantly — use the calculator's table to model the impact of each 10% increase." },
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
                  q="What is a savings rate?"
                  a="Your savings rate is the percentage of your take-home income that you save and invest each year. It is calculated as: (Take-Home Income − Annual Expenses) ÷ Take-Home Income. A 25% savings rate means you invest $1 for every $3 you spend."
                />
                <FAQItem
                  q="What is a good savings rate for FIRE?"
                  a="Traditional financial advice targets 10–15%. FIRE practitioners typically aim for 40–70% or more. At 50%, you can theoretically retire in about 17 years from scratch (at a 5% return). At 65%, closer to 10 years. There is no single 'right' number — it depends on your income, expenses, lifestyle goals, and timeline."
                />
                <FAQItem
                  q="Should I use gross or take-home income for savings rate?"
                  a="This calculator uses take-home income (after taxes) for the savings rate formula, which is the most practical approach. Your savings rate is about what you do with money you actually control. Some FIRE resources use gross income — just be consistent with whatever definition you track over time."
                />
                <FAQItem
                  q="Does the calculator account for inflation?"
                  a="The inputs are in today's dollars. The expected annual return you enter is a nominal return. If you want to model real (inflation-adjusted) returns, reduce your return rate by your expected inflation rate — for example, enter 5% instead of 7% if you expect 2% inflation. The FIRE Number via the 4% rule is designed for inflation-adjusted withdrawals, so using a slightly conservative return rate is appropriate."
                />
                <FAQItem
                  q="What is the FIRE Number and why is it 25× expenses?"
                  a="The FIRE Number is the portfolio size from which you can withdraw your annual expenses indefinitely using the 4% safe withdrawal rate. At 4% withdrawal, your portfolio needs to be 1 ÷ 0.04 = 25 times your annual spending. This is based on the Trinity Study, which found a 4% initial withdrawal rate survived the vast majority of 30-year historical periods."
                />
                <FAQItem
                  q="Why does the table show years to FI capped at 100?"
                  a="If your savings rate is very low (or negative), the formula can produce very large numbers or infinity — meaning at that savings rate, you would never mathematically reach FI. Rather than showing 'infinite years', the table caps at 100 to indicate that a given savings rate is not a viable path to financial independence within a realistic timeframe."
                />
                <FAQItem
                  q="Should I include 401(k) contributions in my savings rate?"
                  a="Yes — your 401(k), IRA, Roth IRA, and all other investment contributions count. The key distinction is the difference between your take-home income and total spending. If you contribute to a 401(k) before your paycheck hits your bank, your take-home is already reduced, so just use your actual after-all-contributions net income as take-home and your actual spending as expenses."
                />
                <FAQItem
                  q="My employer matches my 401(k) — does that count?"
                  a="Employer matching is effectively part of your total compensation. Some people include it in their savings rate calculation; others exclude it for a conservative estimate. Either is fine — consistency over time matters more than the exact methodology. Including the match gives a higher, more optimistic savings rate; excluding it gives a more conservative baseline."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps on your FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Get your full FIRE projection"
                  description="See your complete timeline to retirement with income, expenses, contributions, and projected FIRE age all in one place."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Explore compound interest growth"
                  description="See exactly how your investments compound over time with regular contributions — and how starting earlier changes everything."
                  href="/compound-interest-calculator"
                  live={false}
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
                <RelatedCard name="Retirement Timeline Calculator" href="/retirement-timeline-calculator" description="Year-by-year roadmap to retirement with scenario comparisons." live={false} />
              </div>
            </section>

            {/* Disclaimer */}
            <div id="disclaimer" style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial,
                investment, or tax advice. All projections are estimates based on hypothetical scenarios — actual
                investment returns vary and past performance does not guarantee future results. The years-to-FI
                calculation assumes constant annual returns and contributions, which does not reflect real-world
                market volatility or life changes. The 4% safe withdrawal rate is a historical guideline, not a
                guarantee. Consult a qualified financial advisor before making investment decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
