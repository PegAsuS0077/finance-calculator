// app/investment-growth-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { InvestmentGrowthCalculator } from "@/components/calculators/investment-growth-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "Investment Growth Calculator — Project Your Portfolio Over Time",
  description:
    "Calculate how your investments grow over time with compound interest and regular contributions. See your final value, total growth, and year-by-year breakdown.",
  alternates: {
    canonical: `${config.siteUrl}/investment-growth-calculator`,
  },
  openGraph: {
    title: "Investment Growth Calculator — Project Your Portfolio Over Time",
    description:
      "See how your investments compound over any time horizon. Free, instant results with year-by-year breakdown.",
    url: `${config.siteUrl}/investment-growth-calculator`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const ON_THIS_PAGE = [
  { id: "how-to-use", label: "How to Use" },
  { id: "use-your-results", label: "Your Results" },
  { id: "how-it-works", label: "How It Works" },
  { id: "examples", label: "Examples" },
  { id: "power-of-compounding", label: "Power of Compounding" },
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

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
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

export default function InvestmentGrowthCalculatorPage() {
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
            Investment Growth Calculator
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
            See How Your Investments Grow Over Time
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Enter your initial investment, monthly contributions, and expected return rate to project your
            portfolio value over any time horizon. See exactly how much comes from compound growth versus
            your own contributions — and watch the compounding effect accelerate over time.
          </p>
        </div>

        {/* ── Calculator widget ── */}
        <section id="calculator" aria-label="Investment Growth Calculator" style={{ marginBottom: "3rem" }}>
          <InvestmentGrowthCalculator />
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
                Adjust the inputs to model any investment scenario — results update instantly:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Initial investment",
                    body: "The lump sum you invest today. This is your starting principal — even a small amount has a dramatic impact over long periods because it compounds from day one. Enter 0 if you are starting with no savings and plan to build through regular contributions.",
                  },
                  {
                    n: "2",
                    title: "Monthly contribution",
                    body: "How much you plan to add each month. Regular contributions are the most powerful tool for building wealth over time. A consistent $500/month invested for 30 years at 7% grows to over $566,000 from contributions alone — plus compounding on top.",
                  },
                  {
                    n: "3",
                    title: "Annual return rate",
                    body: "The expected average annual return on your investments. A diversified stock market index fund has historically returned 7–10% nominally. Use 5–7% for conservative real-return estimates. Adjust the slider to see how sensitive your results are to return assumptions.",
                  },
                  {
                    n: "4",
                    title: "Time horizon",
                    body: "The number of years you plan to invest. Time is the most powerful variable in this calculator — doubling the investment period more than doubles the final value due to compounding. Model your actual expected investment period, not an idealized one.",
                  },
                  {
                    n: "5",
                    title: "Compound frequency",
                    body: "Monthly compounding means returns are applied each month, producing slightly higher final values than annual compounding. For most brokerage accounts and index funds, monthly compounding is the realistic assumption. The difference grows over very long periods.",
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
                  { label: "Final Portfolio Value", body: "The total value of your investment at the end of the selected time horizon, including all contributions and compound growth. This is the number to use when setting savings targets or modeling retirement scenarios." },
                  { label: "Total Contributed", body: "The total amount you personally invested: your initial lump sum plus all monthly contributions added over the entire period. This is your 'break-even' — you never lost money if the final value exceeds this." },
                  { label: "Total Growth", body: "The profit generated purely by compounding — the difference between your final portfolio value and what you actually put in. This grows dramatically in the later years of the investment period due to the exponential nature of compound interest." },
                  { label: "Growth Multiplier", body: "How many times your money grew relative to what you contributed. A 3× multiplier means for every $1 you invested, your portfolio returned $3. This metric makes it easy to compare scenarios with different time horizons and return rates." },
                  { label: "Year-by-Year Table", body: "The breakdown table shows your balance, total contributed, and total growth at each year (or every 5 years for longer periods). Use it to identify the inflection point where compound growth starts outpacing your own contributions." },
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
              <SectionHeading>How the Investment Growth Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The calculator uses the standard future value formula, which accounts for both a
                    lump sum initial investment and regular periodic contributions. Two compounding
                    modes are available: monthly (most common for brokerage accounts) and annual.
                  </p>
                  <FormulaBlock
                    formula="FV = P × (1 + r)ⁿ + C × ((1 + r)ⁿ − 1) / r"
                    example="P = initial investment · r = monthly rate · n = total months · C = monthly contribution"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    For monthly compounding: <strong>r = annual rate ÷ 12</strong>, <strong>n = years × 12</strong>.
                    For annual compounding, contributions are treated as a single annual lump sum and
                    the formula uses the annual rate directly.
                  </p>
                  <FormulaBlock
                    formula="Total Interest = Final Value − Total Contributed"
                    example="Total Contributed = Initial Investment + (Monthly Contribution × 12 × Years)"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The year-by-year table applies the same formula at each yearly interval to give you
                    the full trajectory — not just the final number. When the rate is zero, the formula
                    simplifies to: Final Value = Initial Investment + Monthly Contribution × 12 × Years.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "Why compounding accelerates over time", body: "In early years, growth is modest because the base is small. By year 20, you are earning returns on returns accumulated over two decades. The chart shows this clearly — the growth area gets proportionally larger each year." },
                    { title: "Monthly vs. annual compounding", body: "Monthly compounding applies returns 12 times per year rather than once. Over long periods this compounds to a meaningful difference. At 7% over 30 years on $100K, monthly compounding produces roughly $20K more than annual." },
                    { title: "Return rate sensitivity", body: "Small changes in the assumed return rate produce large differences over long periods. The difference between 6% and 8% over 30 years on a $500/month investment is over $200,000. This is why keeping investment costs low (expense ratios, fees) matters enormously." },
                    { title: "The contribution sweet spot", body: "Contributions matter most in the early years when the portfolio is small. As the portfolio grows, compound growth on the existing balance progressively outpaces new contributions. After 20–25 years, stopping contributions entirely still produces impressive results." },
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
              <SectionHeading>Investment growth scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="The consistent saver — 20 years"
                  inputs={[
                    { label: "Initial Investment", value: "$10,000" },
                    { label: "Monthly Contribution", value: "$500" },
                    { label: "Annual Return", value: "7%" },
                    { label: "Time Horizon", value: "20 years" },
                  ]}
                  outputs={[
                    { label: "Total Contributed", value: "$130,000" },
                    { label: "Final Portfolio", value: "~$274,000", highlight: true },
                    { label: "Growth Multiplier", value: "2.1×", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="Long-term index investor — 30 years"
                  inputs={[
                    { label: "Initial Investment", value: "$25,000" },
                    { label: "Monthly Contribution", value: "$800" },
                    { label: "Annual Return", value: "8%" },
                    { label: "Time Horizon", value: "30 years" },
                  ]}
                  outputs={[
                    { label: "Total Contributed", value: "$313,000" },
                    { label: "Final Portfolio", value: "~$1.3M", highlight: true },
                    { label: "Growth Multiplier", value: "4.2×", highlight: true },
                  ]}
                />
                <ExampleCard
                  name="Lump sum only — 40 years"
                  inputs={[
                    { label: "Initial Investment", value: "$50,000" },
                    { label: "Monthly Contribution", value: "$0" },
                    { label: "Annual Return", value: "7%" },
                    { label: "Time Horizon", value: "40 years" },
                  ]}
                  outputs={[
                    { label: "Total Contributed", value: "$50,000" },
                    { label: "Final Portfolio", value: "~$748,000", highlight: true },
                    { label: "Growth Multiplier", value: "15×", highlight: true },
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
                  The lump sum example shows compounding at its most powerful: $50,000 invested without
                  a single additional dollar becomes $748,000 over 40 years. Time and return rate are
                  the primary drivers — not the size of your monthly contribution. Starting early
                  is worth more than contributing more later.
                </p>
              </div>
            </section>

            {/* Power of compounding */}
            <section
              id="power-of-compounding"
              style={{
                marginBottom: "3rem",
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <SectionHeading>The power of compound interest</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    Albert Einstein is often (perhaps apocryphal) credited with calling compound interest
                    the eighth wonder of the world. Whether or not he said it, the math is unambiguous:
                    compound interest is the mechanism by which modest, consistent saving transforms into
                    life-changing wealth.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    The key insight: you earn returns not just on your contributions, but on every dollar
                    of return you have ever earned. A 7% return in year 25 is earned on a portfolio that
                    includes 24 years of compounded growth — not just your original deposits.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    This is why early investing is so valuable. A 25-year-old who invests $5,000 once
                    and never touches it will likely have more money at 65 than a 35-year-old who invests
                    $5,000 every year for 30 years — because the 25-year-old's money gets an extra 10
                    years of compounding.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    For FIRE planning, this insight reinforces the core strategy: maximize your investment
                    rate early, choose low-cost diversified index funds, and let time do the heavy lifting.
                    See our{" "}
                    <Link href="/blog/index-fund-investing-for-fire" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                      index fund investing guide
                    </Link>
                    {" "}for how to structure your investments.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { label: "The Rule of 72", body: "A quick mental shortcut: divide 72 by your annual return rate to estimate how many years it takes to double your money. At 7%, money doubles roughly every 10 years (72 ÷ 7 = 10.3). At 10%, every 7.2 years." },
                    { label: "Why fees destroy returns", body: "A 1% annual fee on a $500,000 portfolio costs $5,000 per year — but the real cost is the compounding you lose. Over 20 years, that 1% fee could consume over $250,000 in compounded growth. Always check expense ratios." },
                    { label: "Time beats contribution size", body: "Delaying investing by 5 years can cost more than doubling your monthly contribution afterward. Use this calculator to model the cost of waiting — the numbers are sobering and motivating." },
                    { label: "Sequence of returns matters", body: "This calculator assumes a constant return rate, which is a simplification. In reality, returns vary year-to-year. Early strong returns produce better outcomes than the same average return with poor early years — especially important near retirement." },
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
                  q="What return rate should I use?"
                  a="A 7% nominal return is a reasonable baseline for a diversified stock market portfolio, based on long-run historical averages. For inflation-adjusted (real) returns, 4–5% is more appropriate. Use a lower rate (5–6%) for conservative planning and a higher rate (8–10%) to model optimistic scenarios. The safest approach is to run multiple scenarios and understand the range of outcomes."
                />
                <FAQItem
                  q="Does this calculator account for inflation?"
                  a="No — this calculator uses nominal (not inflation-adjusted) returns. If you enter a 7% return and inflation is 3%, your real purchasing power grows at roughly 4% per year. To model real returns, simply reduce your assumed return rate by your expected inflation rate. For example, enter 4% instead of 7% to model a 3% inflation environment."
                />
                <FAQItem
                  q="What is the difference between monthly and annual compounding?"
                  a="Monthly compounding applies your annual return rate in smaller increments each month, which means you earn returns on earlier returns sooner. Over long periods this produces slightly higher final values. Most brokerage accounts and mutual funds compound continuously or daily in practice — monthly compounding is a close approximation. The difference is small but grows over decades."
                />
                <FAQItem
                  q="How accurate is this calculator?"
                  a="This calculator provides accurate mathematical projections based on the inputs you provide. The key limitation is that real-world returns are not constant — they fluctuate year-to-year. The calculator assumes your assumed return rate every single year, which won't happen in practice. Use the results as a planning guide, not a guarantee. Conservative return assumptions give more realistic outcomes."
                />
                <FAQItem
                  q="Should I include my 401(k) and IRA in the initial investment?"
                  a="Yes — include the current value of all invested accounts: 401(k), IRA, Roth IRA, and taxable brokerage accounts. Your monthly contributions should include all sources of regular investing (payroll deductions plus manual contributions). The calculator models total portfolio growth regardless of which account type holds the money."
                />
                <FAQItem
                  q="What if I plan to stop contributing at some point?"
                  a="Set your time horizon to the point when you stop contributing, note the final value, then run the calculator again with that value as the initial investment, zero monthly contributions, and the remaining time horizon. This two-step approach models a period of active saving followed by passive compounding."
                />
                <FAQItem
                  q="How does this relate to my FIRE number?"
                  a={<>Your FIRE number is the portfolio target — typically 25× your annual expenses. This calculator helps you project whether your current savings rate and timeline will reach that target. For a complete FIRE projection with income, expenses, and retirement age, use the{" "}<Link href="/fire-calculator" style={{ color: "var(--f-blue)", textDecoration: "none" }}>FIRE Calculator</Link>.</>}
                />
                <FAQItem
                  q="Is past performance a reliable guide for future returns?"
                  a="No — and this is the most important caveat to any investment projection. Historical averages (like the 7% S&P 500 figure) are useful planning guides, but they include periods of severe drawdown (2000–2002, 2008–2009, 2020) that this calculator smooths over. Future returns may be higher or lower. Diversify, keep costs low, and plan for a range of scenarios."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps on your FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Calculate your full FIRE timeline"
                  description="See your complete path to financial independence — combining your investment growth projection with your expenses and FIRE number in one place."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Find your FIRE Number"
                  description="Calculate exactly how much you need to retire based on your annual expenses and withdrawal rate — your investment growth target."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Optimize your savings rate"
                  description="Discover how dramatically increasing your savings rate compresses your path to financial independence."
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
                <RelatedCard name="Compound Interest Calculator" href="/compound-interest-calculator" description="More detailed compound interest calculations with daily, monthly, and annual compounding options." live={false} />
              </div>
            </section>

            {/* Disclaimer */}
            <div id="disclaimer" style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial,
                investment, or tax advice. All projections are estimates based on the assumptions you enter — actual
                investment returns vary significantly from year to year and past performance does not guarantee future
                results. This calculator assumes a constant annual return rate, which does not reflect real-world
                market volatility. Consult a qualified financial advisor before making investment decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
