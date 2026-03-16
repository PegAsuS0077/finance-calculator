// app/lean-fire-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { LeanFireCalculator } from "@/components/calculators/lean-fire-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"
import { buildFaqSchema, buildWebAppSchema } from "@/lib/schema"

const FAQS = [
  { q: "What is Lean FIRE?", a: "Lean FIRE is a variation of the FIRE movement focused on retiring with a very frugal annual budget — typically $15,000–$40,000 per year. Because the FIRE number equals expenses ÷ withdrawal rate, lower spending dramatically reduces the portfolio needed to retire. Lean FIRE practitioners often achieve financial independence years earlier than standard FIRE." },
  { q: "What is the typical Lean FIRE number?", a: "At the standard 4% withdrawal rate, Lean FIRE numbers range from $375,000 (at $15k/year spending) to $1,000,000 (at $40k/year). The default in this calculator — $25,000/year expenses — produces a $625,000 Lean FIRE number." },
  { q: "How does Lean FIRE differ from regular FIRE?", a: "The formula is identical — FIRE Number = Annual Expenses ÷ Withdrawal Rate. The difference is purely in the spending target. Regular FIRE might target $50,000–$80,000/year. Lean FIRE targets $15,000–$40,000, which means a much smaller required portfolio and a faster path to retirement." },
  { q: "What withdrawal rate should I use for Lean FIRE?", a: "Because Lean FIRE often involves a very long retirement — potentially 50–60 years — many practitioners use 3–3.5% rather than the standard 4%. This provides a larger margin of safety against sequence-of-returns risk and prolonged bear markets." },
  { q: "Is Lean FIRE sustainable long-term?", a: "It depends on flexibility. A strict Lean FIRE budget with zero flexibility can be stressful if unexpected expenses arise. Most successful Lean FIRE practitioners build in a buffer through geographic arbitrage, part-time or side income to cover discretionary spending, and variable withdrawals in bad market years." },
  { q: "Can I upgrade from Lean FIRE to Fat FIRE later?", a: "Yes — many Lean FIRE practitioners coast from Lean FIRE to Regular FIRE over time through part-time income, business projects, or simply letting a portfolio grow beyond the lean target before fully withdrawing." },
  { q: "Does this calculator account for Social Security or pension income?", a: "No — this calculator models portfolio-funded retirement only. If you expect Social Security or pension income, subtract that annual amount from your lean expenses before entering it." },
  { q: "What is the difference between Lean FIRE, Barista FIRE, and Coast FIRE?", a: "Lean FIRE: fully retire on a minimal budget with no earned income needed. Barista FIRE: semi-retire with a small part-time job to cover some expenses, requiring a smaller portfolio. Coast FIRE: stop contributing and let compound growth carry you to a full FIRE number in the future — you still work, but only to cover current expenses." },
]

export const metadata: Metadata = {
  title: "Lean FIRE Calculator — Frugal Early Retirement Number",
  description:
    "Calculate your Lean FIRE number and years to financial independence with a frugal spending target. Free calculator, instant results.",
  alternates: {
    canonical: `${config.siteUrl}/lean-fire-calculator`,
  },
  openGraph: {
    title: "Lean FIRE Calculator — Frugal Early Retirement Number",
    description:
      "Calculate your Lean FIRE number and years to financial independence with a frugal spending target. Free calculator, instant results.",
    url: `${config.siteUrl}/lean-fire-calculator`,
    siteName: "FreedomCalc",
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
  name, age, expenses, portfolio, contributions, fireAge, yearsToFire,
}: {
  name: string; age: number; expenses: string; portfolio: string
  contributions: string; fireAge: number | string; yearsToFire: number | string
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
          { label: "Annual Lean Expenses", value: expenses },
          { label: "Current Portfolio", value: portfolio },
          { label: "Annual Contributions", value: contributions },
          { label: "FIRE Age", value: String(fireAge), highlight: true },
          { label: "Years to Lean FIRE", value: typeof yearsToFire === "number" ? `${yearsToFire} years` : yearsToFire, highlight: true },
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

export default function LeanFireCalculatorPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebAppSchema({ name: "Lean FIRE Calculator", description: "Calculate your Lean FIRE number and timeline for retiring on a frugal budget with minimal annual expenses.", url: `${config.siteUrl}/lean-fire-calculator` })) }} />

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
            Lean FIRE Calculator
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
            Lean FIRE Calculator — Frugal Early Retirement Number
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Calculate your Lean FIRE number and years to financial independence with a frugal
            spending target. See how your lean lifestyle compares to Regular and Fat FIRE — and
            discover just how early an extremely frugal life can let you retire.
          </p>
        </div>

        {/* ── Calculator widget (full width) ── */}
        <section id="calculator" aria-label="Lean FIRE Calculator" style={{ marginBottom: "3rem" }}>
          <LeanFireCalculator />
        </section>

        {/* ── Two-column: on-this-page nav + main content ── */}
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
                Follow these steps to calculate your Lean FIRE number and timeline:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Enter your current age",
                    body: "Your age determines your projected Lean FIRE age. The earlier you start, the more years compound growth has to work in your favor.",
                  },
                  {
                    n: "2",
                    title: "Set your annual lean expenses",
                    body: "Enter your annual spending target for your frugal retirement — typically $15,000–$40,000. This is the most powerful input: cutting expenses directly shrinks your FIRE number. Lean FIRE is defined by very low annual spending relative to most FIRE targets.",
                  },
                  {
                    n: "3",
                    title: "Enter your annual contributions",
                    body: "How much do you invest each year? A high savings rate relative to lean expenses is what makes Lean FIRE achievable very quickly for many people.",
                  },
                  {
                    n: "4",
                    title: "Add your current portfolio value",
                    body: "Enter the total value of all your investment accounts (401k, IRA, brokerage, etc.). Every dollar already invested brings your Lean FIRE date closer.",
                  },
                  {
                    n: "5",
                    title: "Adjust rate assumptions",
                    body: "The default 7% nominal return and 3% inflation (real return ~3.9%) reflect long-run US stock market averages. For Lean FIRE — which often involves a very long retirement — consider using 3–3.5% as your withdrawal rate.",
                  },
                  {
                    n: "6",
                    title: "Read the comparison table",
                    body: "The results panel shows your Lean FIRE number alongside Regular FIRE (1.5× expenses) and Fat FIRE (2.5× expenses). This helps you understand the spectrum of FIRE targets and what each costs in portfolio size.",
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
                  {
                    label: "Lean FIRE Number",
                    body: "Your frugal annual expenses divided by your withdrawal rate. At 4%, it equals 25× your lean spending. This is the smallest FIRE number you could target.",
                  },
                  {
                    label: "Years to Lean FIRE",
                    body: "How many years at your current contribution rate and return assumptions until your portfolio reaches your Lean FIRE number.",
                  },
                  {
                    label: "Lean FIRE Age",
                    body: "Your current age plus years to Lean FIRE. This is the earliest date you could retire on a frugal budget.",
                  },
                  {
                    label: "FIRE Comparison Table",
                    body: "See how Lean FIRE ($25k), Regular FIRE (1.5× = $37.5k), and Fat FIRE (2.5× = $62.5k) stack up. Each level represents a very different lifestyle and portfolio requirement.",
                  },
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
              <SectionHeading>How the Lean FIRE Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The Lean FIRE number is identical in formula to a standard FIRE number — annual expenses
                    divided by the safe withdrawal rate. The key distinction is the{" "}
                    <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>lower default expenses</strong>{" "}
                    (default $25,000/year vs. $40,000+ for standard FIRE). This dramatically reduces the
                    required portfolio.
                  </p>
                  <FormulaBlock
                    formula="Lean FIRE Number = Annual Lean Expenses ÷ Withdrawal Rate"
                    example="Example: $25,000 ÷ 0.04 = $625,000"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The comparison table calculates{" "}
                    <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>Regular FIRE</strong>{" "}
                    (1.5× lean expenses) and{" "}
                    <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>Fat FIRE</strong>{" "}
                    (2.5× lean expenses), letting you see the cost of each lifestyle upgrade:
                  </p>
                  <FormulaBlock
                    formula="Regular FIRE = Lean Expenses × 1.5 ÷ Rate | Fat FIRE = Lean Expenses × 2.5 ÷ Rate"
                    example="$25k lean → $625k Lean / $937.5k Regular / $1.5625M Fat FIRE"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    {
                      title: "Real vs. nominal returns",
                      body: "Uses a real return (nominal minus inflation via Fisher equation) so all values are in today's dollars. 7% nominal − 3% inflation ≈ 3.88% real return.",
                    },
                    {
                      title: "Why lean expenses matter so much",
                      body: "Because FIRE number = expenses ÷ rate, every dollar you cut from annual spending reduces your target by 25× (at 4%). Cutting $5k/year cuts your FIRE number by $125,000.",
                    },
                    {
                      title: "Withdrawal rate for Lean FIRE",
                      body: "Lean FIRE often involves a very long retirement (40–60 years). Consider a 3–3.5% withdrawal rate for greater safety against sequence-of-returns risk and market downturns.",
                    },
                    {
                      title: "Flexibility as a Lean FIRE strategy",
                      body: "Many Lean FIRE practitioners use geographic arbitrage (low cost-of-living areas), part-time income, or variable spending to make their portfolio last. The calculator models a fixed withdrawal.",
                    },
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
              <SectionHeading>Examples of Lean FIRE scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="The Ultra-Frugal Minimalist — Alex, 27"
                  age={27}
                  expenses="$18,000 / yr"
                  portfolio="$15,000"
                  contributions="$35,000 / yr"
                  fireAge={37}
                  yearsToFire={10}
                />
                <ExampleCard
                  name="The Geo-Arbitrage Traveler — Maya, 32"
                  age={32}
                  expenses="$25,000 / yr"
                  portfolio="$50,000"
                  contributions="$30,000 / yr"
                  fireAge={44}
                  yearsToFire={12}
                />
                <ExampleCard
                  name="The Mid-Career Switcher — James, 40"
                  age={40}
                  expenses="$32,000 / yr"
                  portfolio="$120,000"
                  contributions="$25,000 / yr"
                  fireAge={56}
                  yearsToFire={16}
                />
              </div>
              <div style={{ background: "oklch(0.97 0.01 258)", border: "1px solid var(--f-blue-border)", borderRadius: "8px", padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  Alex achieves Lean FIRE at 37 by combining ultra-low expenses ($18k) with aggressive saving ($35k/year) —
                  a savings rate above 60%. Maya uses geographic arbitrage to retire at 44 on a $625k portfolio, living
                  inexpensively abroad. James switches from a high-stress career later and still retires at 56 on a lean budget,
                  well ahead of traditional retirement age.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Frequently asked questions</SectionHeading>
              <div style={{ borderTop: "1px solid var(--f-border)", maxWidth: "720px" }}>
                <FAQItem
                  q="What is Lean FIRE?"
                  a="Lean FIRE is a variation of the FIRE (Financial Independence, Retire Early) movement focused on retiring with a very frugal annual budget — typically $15,000–$40,000 per year. Because the FIRE number equals expenses ÷ withdrawal rate, lower spending dramatically reduces the portfolio needed to retire. Lean FIRE practitioners often achieve financial independence years earlier than standard FIRE."
                />
                <FAQItem
                  q="What is the typical Lean FIRE number?"
                  a="At the standard 4% withdrawal rate, Lean FIRE numbers range from $375,000 (at $15k/year spending) to $1,000,000 (at $40k/year). The default in this calculator — $25,000/year expenses — produces a $625,000 Lean FIRE number. Compare this to Regular FIRE at 1.5× ($937,500) or Fat FIRE at 2.5× ($1,562,500)."
                />
                <FAQItem
                  q="How does Lean FIRE differ from regular FIRE?"
                  a="The formula is identical — FIRE Number = Annual Expenses ÷ Withdrawal Rate. The difference is purely in the spending target. Regular FIRE might target $50,000–$80,000/year in retirement spending. Lean FIRE targets $15,000–$40,000, which means a much smaller required portfolio and a faster path to retirement. The tradeoff is a more constrained lifestyle."
                />
                <FAQItem
                  q="What withdrawal rate should I use for Lean FIRE?"
                  a="Because Lean FIRE often involves a very long retirement — potentially 50–60 years — many practitioners use 3–3.5% rather than the standard 4%. This provides a larger margin of safety against sequence-of-returns risk and prolonged bear markets. Use the withdrawal rate slider to model both scenarios."
                />
                <FAQItem
                  q="Is Lean FIRE sustainable long-term?"
                  a="It depends on flexibility. A strict Lean FIRE budget with zero flexibility can be stressful if unexpected expenses arise. Most successful Lean FIRE practitioners build in a buffer through: (1) geographic arbitrage — living in low cost-of-living areas, (2) part-time or side income to cover discretionary spending, (3) variable withdrawals — spending less in bad market years."
                />
                <FAQItem
                  q="Can I upgrade from Lean FIRE to Fat FIRE later?"
                  a="Yes — many Lean FIRE practitioners 'coast' from Lean FIRE to Regular FIRE over time through part-time income, business projects, or simply letting a portfolio grow beyond the lean target before fully withdrawing. The comparison table in this calculator shows exactly how much more portfolio you'd need at each level."
                />
                <FAQItem
                  q="Does this calculator account for Social Security or pension income?"
                  a="No — this calculator models portfolio-funded retirement only. If you expect Social Security or pension income, subtract that annual amount from your lean expenses before entering it. For example, if you plan $25,000/year spending but expect $8,000/year in Social Security, enter $17,000 as your lean expenses."
                />
                <FAQItem
                  q="What is the difference between Lean FIRE, Barista FIRE, and Coast FIRE?"
                  a="These are all variations of the FIRE spectrum. Lean FIRE: fully retire on a minimal budget with no earned income needed. Barista FIRE: semi-retire with a small part-time job (like at a coffee shop) to cover some expenses, requiring a smaller portfolio. Coast FIRE: stop contributing and let compound growth carry you to a full FIRE number in the future — you still work, but only to cover current expenses."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps for your Lean FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Calculate your full FIRE number with income"
                  description="Use the FIRE Calculator to model your complete financial picture including income, expenses, and savings rate alongside your FIRE target."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="See how your savings rate drives your timeline"
                  description="The Savings Rate Calculator shows exactly how much earlier you retire as your savings rate increases — critical for Lean FIRE."
                  href="/savings-rate-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Find your exact FIRE number"
                  description="Use the FIRE Number Calculator to focus specifically on your retirement target — and see a savings table for reaching it in 10–30 years."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Explore Barista FIRE"
                  description="Barista FIRE lets you semi-retire with part-time income — requiring a smaller portfolio than Lean FIRE while still escaping full-time work early."
                  href="/barista-fire-calculator"
                  live={false}
                />
              </div>
            </section>

            {/* Related calculators */}
            <section style={{ marginBottom: "3rem" }}>
              <SectionHeading>Other FIRE calculators</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
                <RelatedCard
                  name="FIRE Calculator"
                  href="/fire-calculator"
                  description="Full FIRE calculator with income, expenses, savings rate, and portfolio projection."
                  live={true}
                />
                <RelatedCard
                  name="Barista FIRE Calculator"
                  href="/barista-fire-calculator"
                  description="Semi-retire with part-time income — find the portfolio that lets you step back from full-time work."
                  live={false}
                />
                <RelatedCard
                  name="Savings Rate Calculator"
                  href="/savings-rate-calculator"
                  description="See how your savings rate maps to years until financial independence."
                  live={true}
                />
                <RelatedCard
                  name="FIRE Number Calculator"
                  href="/fire-number-calculator"
                  description="Focus specifically on your target portfolio based on annual spending."
                  live={true}
                />
              </div>
            </section>

            {/* Disclaimer */}
            <div style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial, investment, or
                tax advice. All projections are estimates based on hypothetical scenarios — actual returns vary and past performance
                does not guarantee future results. Lean FIRE involves significant lifestyle tradeoffs and carries sequence-of-returns
                risk over very long retirement horizons. Consult a qualified financial advisor before making investment decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
