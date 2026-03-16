// app/barista-fire-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { BaristaFireCalculator } from "@/components/calculators/barista-fire-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "Barista FIRE Calculator — Semi-Retirement Planning Tool",
  description:
    "Calculate your Barista FIRE number and timeline for semi-retirement with part-time income. See how much less you need to save when you keep working part-time.",
  alternates: {
    canonical: `${config.siteUrl}/barista-fire-calculator`,
  },
  openGraph: {
    title: "Barista FIRE Calculator — Semi-Retirement Planning Tool",
    description:
      "Calculate your Barista FIRE number and timeline for semi-retirement with part-time income. See how much less you need to save when you keep working part-time.",
    url: `${config.siteUrl}/barista-fire-calculator`,
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
  name, age, expenses, partTimeIncome, portfolio, contributions, fireAge, yearsToFire,
}: {
  name: string; age: number; expenses: string; partTimeIncome: string; portfolio: string
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
          { label: "Annual Total Expenses", value: expenses },
          { label: "Part-Time Income", value: partTimeIncome },
          { label: "Current Portfolio", value: portfolio },
          { label: "Annual Contributions", value: contributions },
          { label: "Barista FIRE Age", value: String(fireAge), highlight: true },
          { label: "Years to Barista FIRE", value: typeof yearsToFire === "number" ? `${yearsToFire} years` : yearsToFire, highlight: true },
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
                fontWeight: row.label === "Barista FIRE Age" ? 700 : 450,
                fontFamily: row.label === "Barista FIRE Age" ? "var(--font-inter), ui-sans-serif, sans-serif" : undefined,
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

export default function BaristaFireCalculatorPage() {
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
            Barista FIRE Calculator
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
            Barista FIRE Calculator — Semi-Retirement Planning Tool
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Calculate your Barista FIRE number and timeline for semi-retirement with part-time income.
            See exactly how much less you need to save when you keep earning part-time — and discover
            how soon you can step back from full-time work.
          </p>
        </div>

        {/* ── Calculator widget (full width) ── */}
        <section id="calculator" aria-label="Barista FIRE Calculator" style={{ marginBottom: "3rem" }}>
          <BaristaFireCalculator />
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
                Follow these steps to calculate your Barista FIRE number and timeline:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Enter your current age",
                    body: "Your age determines your projected Barista FIRE age. The earlier you start contributing, the more compound growth reduces how long you need to save.",
                  },
                  {
                    n: "2",
                    title: "Set your annual total expenses",
                    body: "Enter your full annual spending in semi-retirement — including rent, food, healthcare, and everything else. This is your total cost of living, not just the amount the portfolio needs to cover.",
                  },
                  {
                    n: "3",
                    title: "Enter your part-time income",
                    body: "How much do you expect to earn working part-time? This might be a barista job, freelance work, consulting, or any flexible income. The calculator subtracts this from your total expenses to find how much your portfolio actually needs to cover.",
                  },
                  {
                    n: "4",
                    title: "Add your current portfolio and contributions",
                    body: "Enter your total investment account balance and how much you currently save each year. Both inputs directly affect how quickly you reach your Barista FIRE number.",
                  },
                  {
                    n: "5",
                    title: "Adjust the rate assumptions",
                    body: "The default 7% nominal return and 3% inflation reflect long-run US stock market averages. The 4% withdrawal rate is the standard safe withdrawal assumption. Adjust these to model more conservative or optimistic scenarios.",
                  },
                  {
                    n: "6",
                    title: "Read the comparison table",
                    body: "The results panel shows your Barista FIRE number alongside the full FIRE number — and how much the part-time income saves you in required portfolio size. The chart shows your projected growth toward both targets.",
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
                    label: "Barista FIRE Number",
                    body: "The portfolio size needed so your investments cover only the expenses your part-time income does not. Much smaller than a full FIRE number — that gap is the power of keeping any part-time income.",
                  },
                  {
                    label: "Full FIRE Number",
                    body: "The portfolio needed if you stopped working entirely. Shown for comparison so you can see exactly how much part-time income reduces your required savings.",
                  },
                  {
                    label: "Barista FIRE Age",
                    body: "Your current age plus years to reach your Barista FIRE number. This is the earliest you can step back from full-time work while keeping a small part-time income.",
                  },
                  {
                    label: "Savings from Part-Time Income",
                    body: "The reduction in required portfolio size that comes directly from part-time earnings. This is the difference between your full FIRE number and your Barista FIRE number.",
                  },
                  {
                    label: "Remaining Gap",
                    body: "How much more portfolio you need to accumulate before reaching Barista FIRE. This narrows every year as your investments grow.",
                  },
                  {
                    label: "Years to Barista FIRE",
                    body: "How many years at your current contribution rate and investment return until your portfolio reaches the Barista FIRE number. Adjusting part-time income directly changes this number.",
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
              <SectionHeading>How the Barista FIRE Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    Barista FIRE is a hybrid semi-retirement strategy. Instead of saving until your portfolio covers
                    100% of expenses, you save until it covers only the gap between your total expenses and your
                    part-time income. This dramatically reduces the required portfolio and accelerates your
                    timeline to leaving full-time work.
                  </p>
                  <FormulaBlock
                    formula="Annual Portfolio Withdrawal = Total Expenses − Part-Time Income"
                    example="Example: $50,000 − $15,000 = $35,000 from portfolio"
                  />
                  <FormulaBlock
                    formula="Barista FIRE Number = Annual Portfolio Withdrawal ÷ Withdrawal Rate"
                    example="Example: $35,000 ÷ 0.04 = $875,000 Barista FIRE Number"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The{" "}
                    <strong style={{ color: "var(--f-text-body)", fontWeight: 500 }}>Full FIRE Number</strong>{" "}
                    is shown alongside for comparison — it represents what you would need with zero part-time income:
                  </p>
                  <FormulaBlock
                    formula="Full FIRE Number = Total Expenses ÷ Withdrawal Rate"
                    example="Example: $50,000 ÷ 0.04 = $1,250,000 Full FIRE Number"
                  />
                  <p>
                    The difference ($1,250,000 − $875,000 = $375,000) is the direct savings from earning $15,000/year
                    part-time. At typical investment returns, this represents several years off your savings timeline.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    {
                      title: "Why part-time income is so powerful",
                      body: "Because the FIRE number formula divides by the withdrawal rate, every dollar of part-time income reduces your required portfolio by 25× (at 4%). Earning $10,000/year part-time reduces your FIRE number by $250,000.",
                    },
                    {
                      title: "Real returns and inflation adjustment",
                      body: "The calculator uses a real return (nominal return minus inflation via the Fisher equation) to project portfolio growth in today's dollars. This means your results are inflation-adjusted and more accurate over long horizons.",
                    },
                    {
                      title: "What counts as Barista FIRE income",
                      body: "Any reliable, flexible income source qualifies: coffee shop or retail work (the origin of the name), freelance projects, consulting, seasonal work, part-time teaching, Airbnb, or any side income you can maintain in semi-retirement.",
                    },
                    {
                      title: "Healthcare is the key planning factor",
                      body: "The original Barista FIRE concept got its name from the Starbucks benefit: baristas who work 20+ hours/week receive health insurance. Access to employer healthcare dramatically reduces semi-retirement costs compared to individual market plans.",
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
              <SectionHeading>Barista FIRE scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="The Coffee Shop Barista — Sam, 34"
                  age={34}
                  expenses="$48,000 / yr"
                  partTimeIncome="$18,000 / yr"
                  portfolio="$80,000"
                  contributions="$25,000 / yr"
                  fireAge={47}
                  yearsToFire={13}
                />
                <ExampleCard
                  name="The Part-Time Freelancer — Priya, 38"
                  age={38}
                  expenses="$60,000 / yr"
                  partTimeIncome="$20,000 / yr"
                  portfolio="$150,000"
                  contributions="$30,000 / yr"
                  fireAge={52}
                  yearsToFire={14}
                />
                <ExampleCard
                  name="The Semi-Retired Consultant — David, 45"
                  age={45}
                  expenses="$75,000 / yr"
                  partTimeIncome="$30,000 / yr"
                  portfolio="$400,000"
                  contributions="$35,000 / yr"
                  fireAge={56}
                  yearsToFire={11}
                />
              </div>
              <div style={{ background: "oklch(0.97 0.01 258)", border: "1px solid var(--f-blue-border)", borderRadius: "8px", padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  Sam works part-time at a coffee shop, earning health insurance and $18k/year — reducing his FIRE number
                  from $1.2M to $750,000 and letting him semi-retire 6 years earlier than full FIRE. Priya freelances
                  20 hours/week, maintaining creative work she enjoys while her portfolio grows. David consults part-time
                  in his field, keeping mental engagement and earning enough to reach his Barista FIRE number by 56
                  rather than waiting until 65 for traditional retirement.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Frequently asked questions</SectionHeading>
              <div style={{ borderTop: "1px solid var(--f-border)", maxWidth: "720px" }}>
                <FAQItem
                  q="What is Barista FIRE?"
                  a="Barista FIRE is a semi-retirement strategy where you leave full-time work before reaching full financial independence. You earn a small part-time income — enough to cover some expenses — while your portfolio covers the rest. The name comes from the idea of working at a coffee shop like Starbucks, which offers health insurance to part-time employees. The result: you need a much smaller portfolio to semi-retire than you'd need to fully retire."
                />
                <FAQItem
                  q="How is Barista FIRE different from full FIRE?"
                  a="Full FIRE requires a portfolio large enough to cover 100% of your expenses through investment withdrawals alone — typically 25× annual expenses at a 4% withdrawal rate. Barista FIRE only requires the portfolio to cover the gap between your total expenses and your part-time income. If you earn $15,000/year part-time and spend $50,000/year, your portfolio only needs to cover $35,000 — a $875,000 target instead of $1,250,000. This smaller gap can shave years off your timeline."
                />
                <FAQItem
                  q="How does Barista FIRE differ from Lean FIRE or Coast FIRE?"
                  a="Lean FIRE is fully retired on a minimal budget with zero earned income. Coast FIRE means you have enough invested that compound growth alone will reach full FIRE by traditional retirement age — you still work full-time, but only to cover current expenses without saving more. Barista FIRE sits between these: you've semi-retired with part-time income supplementing your portfolio withdrawals. It's the most flexible and accessible variant for most people."
                />
                <FAQItem
                  q="What part-time income counts for Barista FIRE?"
                  a="Any flexible, reliable income source works: retail or service jobs (the original Barista FIRE concept), freelancing in your professional field, consulting, seasonal work, part-time teaching, online content creation, Airbnb hosting, or any side income you can maintain while living a semi-retired lifestyle. The key is that the work is lower stress, more flexible, and optional — you could stop if needed, but it meaningfully reduces what your portfolio must cover."
                />
                <FAQItem
                  q="What happens when I can no longer work part-time?"
                  a="This is the central risk of Barista FIRE. If your portfolio only covers part of expenses, and you can no longer work, you need either a larger portfolio, reduced spending, or other income sources (like Social Security). Many Barista FIRE practitioners plan to gradually reduce part-time work as their portfolio grows beyond the Barista FIRE number, eventually transitioning to full FIRE. The calculator's Full FIRE Number shows exactly what full independence looks like."
                />
                <FAQItem
                  q="Should I include expected Social Security in my part-time income?"
                  a="No — Social Security is typically expected at age 62–70, not during semi-retirement at 40 or 50. It's better to plan your Barista FIRE strategy without assuming Social Security, then treat it as a bonus safety net when it arrives. If you're planning semi-retirement close to age 62, you could model a higher part-time income that includes expected Social Security benefits."
                />
                <FAQItem
                  q="What withdrawal rate should I use for Barista FIRE?"
                  a="The standard 4% rule works for typical Barista FIRE timelines. However, because semi-retirement often starts earlier than traditional retirement, consider 3.5% for very long retirement horizons (25+ years). With part-time income actively supplementing your portfolio, you may actually have more flexibility — you can reduce withdrawals in bad market years by increasing work hours slightly."
                />
                <FAQItem
                  q="How does healthcare factor into Barista FIRE planning?"
                  a="Healthcare is the biggest financial wildcard in early semi-retirement, especially in the United States before Medicare eligibility at 65. The original Barista FIRE concept was specifically designed around working at Starbucks for their part-time employee health benefits. If you can secure employer-provided health insurance through part-time work, it dramatically reduces your semi-retirement costs. If not, factor ACA marketplace premiums into your total annual expenses input."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps for your Barista FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Calculate your full FIRE number"
                  description="Use the FIRE Calculator to model what complete financial independence — with zero work income — looks like for your situation."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Explore Lean FIRE"
                  description="If you can cut expenses low enough, Lean FIRE lets you fully retire without part-time income. See how frugal spending compares to your Barista FIRE plan."
                  href="/lean-fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Check your savings rate"
                  description="Your savings rate directly determines how fast you reach Barista FIRE. The Savings Rate Calculator shows the relationship between savings rate and years to financial independence."
                  href="/savings-rate-calculator"
                  live={true}
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
                  name="Lean FIRE Calculator"
                  href="/lean-fire-calculator"
                  description="Calculate your Lean FIRE number based on a frugal spending target."
                  live={true}
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
                does not guarantee future results. Barista FIRE involves reliance on part-time income that may not always be available,
                and sequence-of-returns risk over long retirement horizons. Healthcare costs and inflation can significantly impact
                semi-retirement plans. Consult a qualified financial advisor before making investment or retirement decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
