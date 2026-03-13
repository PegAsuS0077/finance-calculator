// app/fire-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { FireCalculator } from "@/components/calculators/fire-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "FIRE Calculator — Free Financial Independence Calculator",
  description:
    "Calculate your FIRE number, years to financial independence, and retirement age. Free FIRE calculator with instant results — no signup required.",
  alternates: {
    canonical: `${config.siteUrl}/fire-calculator`,
  },
  openGraph: {
    title: "FIRE Calculator — Free Financial Independence Calculator",
    description:
      "Calculate your FIRE number, years to financial independence, and retirement age. Instant results, no signup.",
    url: `${config.siteUrl}/fire-calculator`,
    siteName: "FIRE Tools",
    type: "website",
  },
}

const ON_THIS_PAGE = [
  { id: "how-to-use", label: "How to use" },
  { id: "use-your-results", label: "Use your results" },
  { id: "how-it-works", label: "How it works" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "next-steps", label: "Next steps" },
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
  name, age, expenses, portfolio, fireAge, yearsToFire,
}: {
  name: string; age: number; expenses: string; portfolio: string; fireAge: number; yearsToFire: number
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
          { label: "Age", value: String(age) },
          { label: "Annual Expenses", value: expenses },
          { label: "Current Portfolio", value: portfolio },
          { label: "FIRE Age", value: String(fireAge), highlight: true },
          { label: "Years to FIRE", value: `${yearsToFire} years`, highlight: true },
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
                fontWeight: row.label === "FIRE Age" ? 700 : 450,
                fontFamily: row.label === "FIRE Age" ? "var(--font-inter), ui-sans-serif, sans-serif" : undefined,
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

export default function FireCalculatorPage() {
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
            FIRE Calculator
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
            Financial Independence Calculator
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Estimate your FIRE number, years to retirement, and projected retirement age
            based on your income, expenses, and investment assumptions.
          </p>
        </div>

        {/* ── Calculator widget (full width) ── */}
        <section id="calculator" aria-label="FIRE Calculator" style={{ marginBottom: "3rem" }}>
          <FireCalculator />
        </section>

        {/* ── Two-column: content + on-this-page nav ── */}
        <div style={{ display: "flex", gap: "3.5rem", alignItems: "flex-start" }}>

          {/* ── On this page nav ── */}
          <OnThisPage sections={ON_THIS_PAGE} />

          {/* ── Main content column ── */}
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
                To get started, enter the following information:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Enter your current age and annual income",
                    body: "Start with your current age — this determines your projected FIRE age. Annual income is used to estimate your savings rate and contributions.",
                  },
                  {
                    n: "2",
                    title: "Set your annual expenses",
                    body: "Enter what you spend per year today. This is the most important input: your FIRE number is a direct multiple of your annual expenses. Lower expenses = smaller FIRE number = earlier retirement.",
                  },
                  {
                    n: "3",
                    title: "Add your current portfolio value",
                    body: "Enter the total value of all your investment accounts (401k, IRA, brokerage, etc.). A higher starting balance dramatically reduces your years to FIRE.",
                  },
                  {
                    n: "4",
                    title: "Enter your annual contributions",
                    body: "How much do you invest each year? This is your savings after expenses. Combined with your starting balance and return rate, this determines how fast your portfolio grows.",
                  },
                  {
                    n: "5",
                    title: "Adjust return and inflation assumptions",
                    body: "The default 7% nominal return and 3% inflation (4% real return) reflect long-run US stock market averages. Adjust these to model conservative or optimistic scenarios.",
                  },
                  {
                    n: "6",
                    title: "Read your results",
                    body: "The calculator instantly shows your FIRE number, years to FIRE, projected FIRE age, and a portfolio growth chart. Adjust any input to see how it changes your timeline.",
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
              <SectionHeading>Use your results</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: "1rem" }}>
                {[
                  { label: "FIRE Number", body: "Annual expenses ÷ withdrawal rate. At 4%, your FIRE number is 25× your annual spending — the portfolio needed to retire indefinitely." },
                  { label: "Years to FIRE", body: "How many years until your portfolio reaches your FIRE number at your current contribution rate and real return." },
                  { label: "FIRE Age", body: "Your current age plus years to FIRE — the earliest projected retirement age under your current assumptions." },
                  { label: "Remaining Gap", body: "The difference between your target FIRE number and your current portfolio value. How much you still need to accumulate." },
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
              <SectionHeading>How the FIRE Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The calculator uses two core formulas. First, your{" "}
                    <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>FIRE number</strong>{" "}
                    is annual expenses divided by your withdrawal rate. The 4% withdrawal rate comes from
                    the Trinity Study (Bengen, 1994), which found a diversified portfolio historically
                    sustained 4% annual withdrawals for 30+ years.
                  </p>
                  <FormulaBlock
                    formula="FIRE Number = Annual Expenses ÷ Withdrawal Rate"
                    example="Example: $40,000 ÷ 0.04 = $1,000,000"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    Then it projects your{" "}
                    <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>portfolio growth</strong>{" "}
                    using the future value of an annuity — accounting for starting balance, contributions, and
                    inflation-adjusted return.
                  </p>
                  <FormulaBlock
                    formula="Portfolio = P(1+r)ⁿ + C × [(1+r)ⁿ − 1] / r"
                    example="P = starting portfolio · r = real return · n = years · C = annual contributions"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "Real vs. nominal returns", body: "Uses a real return (nominal minus inflation) so all values are in today's dollars. 7% nominal − 3% inflation = 4% real return." },
                    { title: "Inflation-adjusted FIRE number", body: "Your FIRE number is constant in today's dollars. The projection accounts for inflation so the chart shows real purchasing-power values." },
                    { title: "Contributions assumption", body: "Annual contributions are assumed constant. Re-run the calculator as your income or savings rate changes." },
                    { title: "No sequence-of-returns risk", body: "This uses a constant rate. Real portfolios vary year-to-year. For a conservative estimate, reduce your expected return by 1–2%." },
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
              <SectionHeading>Examples of best usage scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard name="The Standard Path — Sarah, 32" age={32} expenses="$50,000 / yr" portfolio="$75,000" fireAge={54} yearsToFire={22} />
                <ExampleCard name="The Aggressive Saver — Marcus, 28" age={28} expenses="$35,000 / yr" portfolio="$20,000" fireAge={41} yearsToFire={13} />
                <ExampleCard name="The Late Starter — Jennifer, 45" age={45} expenses="$55,000 / yr" portfolio="$150,000" fireAge={65} yearsToFire={20} />
              </div>
              <div style={{ background: "oklch(0.97 0.01 258)", border: "1px solid var(--f-blue-border)", borderRadius: "8px", padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  Sarah reaches FIRE at 54 on a moderate savings rate. Marcus achieves extreme early retirement at 41 by keeping
                  expenses at $35k on a $110k income — a 50%+ savings rate. Jennifer reaches traditional retirement at 65, but
                  increasing contributions to $40k/year would bring her FIRE age below 60.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Frequently asked questions</SectionHeading>
              <div style={{ borderTop: "1px solid var(--f-border)", maxWidth: "720px" }}>
                <FAQItem q="What is a FIRE number?" a="Your FIRE number is the total investment portfolio needed to retire and live off investment returns indefinitely. It equals your annual expenses divided by your safe withdrawal rate. At the 4% rule, your FIRE number is 25 times your annual spending — $40,000/year requires $1,000,000." />
                <FAQItem q="What withdrawal rate should I use?" a="The 4% rate is the most widely-used starting point, supported by the Trinity Study (Bengen, 1994). For retirements lasting 40–50 years — common for early retirees — consider 3–3.5% to reduce sequence-of-returns risk." />
                <FAQItem q="What return rate should I assume?" a="A 7% nominal return is commonly used based on long-run US stock market averages. Combined with 3% inflation, this gives a 4% real return. For conservative projections, use 5–6% nominal." />
                <FAQItem q="Does this calculator account for inflation?" a="Yes. The calculator computes a real return rate (nominal minus inflation). All results are expressed in today's purchasing power." />
                <FAQItem q="Is the 4% rule still valid?" a="Research supports it as a reasonable starting point for 30-year retirements. For longer retirements, 3–3.5% may be safer. Use the withdrawal rate slider to model different scenarios." />
                <FAQItem q="Should I include home equity?" a="Generally no — the FIRE number refers to liquid investment assets that generate returns. A paid-off home reduces expenses but doesn't produce portfolio income." />
                <FAQItem q="How does savings rate affect my timeline?" a="It's the most powerful variable. Moving from 20% to 50% savings rate can cut your years to FIRE nearly in half — you build wealth faster and need a smaller FIRE number (lower expenses)." />
                <FAQItem q="What about taxes?" a="This calculator does not model taxes. Tax-advantaged accounts (401k, IRA, Roth) have different treatment. Consult a financial advisor for a full tax-aware model." />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps for your FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Find your exact FIRE number"
                  description="Use the FIRE Number Calculator to focus specifically on your retirement target — and see a savings table for reaching it in 10–30 years."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Calculate your Coast FIRE number"
                  description="Find the lump sum you need invested today so compound growth alone carries you to FIRE — no more contributions needed."
                  href="/coast-fire-calculator"
                  live={false}
                />
                <NextStepCard
                  title="See how your savings rate drives your timeline"
                  description="The Savings Rate Calculator shows exactly how much earlier you retire as your savings rate increases."
                  href="/savings-rate-calculator"
                  live={false}
                />
                <NextStepCard
                  title="Stress-test your withdrawal strategy"
                  description="Use the 4% Rule Calculator to model how long your portfolio lasts at different withdrawal rates and portfolio sizes."
                  href="/4-percent-rule-calculator"
                  live={false}
                />
              </div>
            </section>

            {/* Related calculators */}
            <section style={{ marginBottom: "3rem" }}>
              <SectionHeading>Other FIRE calculators</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
                <RelatedCard name="FIRE Number Calculator" href="/fire-number-calculator" description="Focus specifically on your target portfolio based on annual spending." live={true} />
                <RelatedCard name="Coast FIRE Calculator" href="/coast-fire-calculator" description="Find when compound interest alone will carry you to retirement." live={false} />
                <RelatedCard name="Savings Rate Calculator" href="/savings-rate-calculator" description="See how your savings rate maps to years until financial independence." live={false} />
                <RelatedCard name="4% Rule Calculator" href="/4-percent-rule-calculator" description="Calculate safe annual withdrawals from any portfolio size." live={false} />
                <RelatedCard name="Compound Interest Calculator" href="/compound-interest-calculator" description="Visualize how investments grow with regular contributions." live={false} />
              </div>
            </section>

            {/* Disclaimer */}
            <div style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial, investment, or
                tax advice. All projections are estimates based on hypothetical scenarios — actual returns vary and past performance
                does not guarantee future results. Consult a qualified financial advisor before making investment decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
