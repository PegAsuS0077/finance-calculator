// app/compound-interest-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { CompoundInterestCalculator } from "@/components/calculators/compound-interest-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "Compound Interest Calculator — See How Money Grows Over Time",
  description:
    "Calculate compound interest with daily, monthly, quarterly, or annual compounding. See your final balance, total interest earned, and a year-by-year breakdown. Free and instant.",
  alternates: {
    canonical: `${config.siteUrl}/compound-interest-calculator`,
  },
  openGraph: {
    title: "Compound Interest Calculator — See How Money Grows Over Time",
    description:
      "Enter your principal, interest rate, and time horizon to see how compound interest grows your money. Choose daily, monthly, quarterly, or annual compounding.",
    url: `${config.siteUrl}/compound-interest-calculator`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const ON_THIS_PAGE = [
  { id: "how-to-use", label: "How to Use" },
  { id: "use-your-results", label: "Your Results" },
  { id: "how-it-works", label: "How It Works" },
  { id: "examples", label: "Examples" },
  { id: "compound-interest-explained", label: "Compound Interest" },
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
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.4375rem 0", borderBottom: "1px solid var(--f-border)" }}>
            <dt style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", fontWeight: 300 }}>{row.label}</dt>
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
      <summary style={{ padding: "1.25rem 0", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.9375rem", fontWeight: 600, color: "var(--f-text-heading)", letterSpacing: "-0.01em", lineHeight: 1.35 }}>
          {q}
        </span>
        <span style={{ flexShrink: 0, width: "1.25rem", height: "1.25rem", borderRadius: "50%", background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "var(--f-blue)", fontWeight: 700 }}>
          +
        </span>
      </summary>
      <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0, paddingBottom: "1.25rem" }}>
        {a}
      </p>
    </details>
  )
}

function RelatedCard({ name, href, description, live }: { name: string; href: string; description: string; live: boolean }) {
  const inner = (
    <div
      style={{
        background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "10px",
        padding: "1.25rem 1.375rem", height: "100%", boxSizing: "border-box",
        opacity: live ? 1 : 0.55, transition: live ? "border-color 0.15s ease, box-shadow 0.15s ease" : undefined,
      }}
      className={live ? "calc-card" : undefined}
    >
      <p style={{ fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.9375rem", fontWeight: 600, color: live ? "var(--f-text-heading)" : "var(--f-text-muted)", marginBottom: "0.375rem", lineHeight: 1.3 }}>{name}</p>
      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{description}</p>
      {live && <p style={{ marginTop: "0.875rem", fontSize: "0.8rem", color: "var(--f-blue)", fontWeight: 600 }}>Open →</p>}
    </div>
  )
  if (live) return <Link href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>
  return <div>{inner}</div>
}

function NextStepCard({ title, description, href, live }: { title: string; description: string; href: string; live: boolean }) {
  const inner = (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.125rem 1.375rem",
        background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "10px",
        opacity: live ? 1 : 0.5, transition: live ? "border-color 0.15s ease" : undefined,
      }}
      className={live ? "calc-card" : undefined}
    >
      <span style={{ flexShrink: 0, width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", color: "var(--f-blue)", fontWeight: 700 }}>
        →
      </span>
      <div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.25rem", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>{title}</p>
        <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{description}</p>
      </div>
    </div>
  )
  if (live) return <Link href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>
  return <div>{inner}</div>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CompoundInterestCalculatorPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)" }}>

        {/* ── Page header / H1 ── */}
        <div style={{ marginBottom: "2rem", maxWidth: "720px" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
            Compound Interest Calculator
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
            Watch Your Money Multiply with Compound Interest
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.7, fontWeight: 300 }}>
            Use our free compound interest calculator to see exactly how your savings or investments grow over time.
            Enter your starting balance, interest rate, and time horizon — then choose daily, monthly, quarterly, or
            annual compounding to see the real difference in final balance and total interest earned.
          </p>
        </div>

        {/* ── Calculator widget ── */}
        <section id="calculator" aria-label="Compound Interest Calculator" style={{ marginBottom: "3rem" }}>
          <CompoundInterestCalculator />
        </section>

        {/* ── Two-column: on-this-page + content ── */}
        <div style={{ display: "flex", gap: "3.5rem", alignItems: "flex-start" }}>

          <OnThisPage sections={ON_THIS_PAGE} />

          <div style={{ flex: 1, minWidth: 0 }}>

            {/* How to use */}
            <section
              id="how-to-use"
              style={{ marginBottom: "3rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "12px", padding: "2rem", boxShadow: "var(--f-shadow-card)" }}
            >
              <SectionHeading>How to use this calculator</SectionHeading>
              <p style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.5rem" }}>
                Enter your savings details and watch the compounding effect in real time:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Initial principal",
                    body: "The amount you're starting with today — a savings account balance, an investment, or a lump sum you plan to deposit. Even small amounts compound into significant sums over long periods. Enter 0 if you are starting from scratch and plan to build through regular contributions.",
                  },
                  {
                    n: "2",
                    title: "Annual contribution",
                    body: "An optional fixed amount added to your account each year. This models a savings account where you make one annual deposit, a bond paying annual interest, or any scenario where you add money once per year. For monthly investing, use the Investment Growth Calculator instead.",
                  },
                  {
                    n: "3",
                    title: "Annual interest rate",
                    body: "The nominal interest rate on your savings or investment. For a high-yield savings account, this might be 4–5%. For a broad stock market index fund over long periods, 7–10% is a commonly used historical estimate. Use 8% as a moderate starting point for investment calculations.",
                  },
                  {
                    n: "4",
                    title: "Time period",
                    body: "How many years you plan to let the money compound. Time is the most powerful variable in compound interest — the effect is non-linear. Doubling the time period typically more than doubles the interest earned because each year's growth is larger than the last.",
                  },
                  {
                    n: "5",
                    title: "Compound frequency",
                    body: "How often interest is applied to your balance. Daily compounding applies returns every day, monthly applies them 12 times per year, quarterly applies 4 times, and annually applies once. More frequent compounding produces higher final balances — though the difference between daily and monthly is small. Most savings accounts use daily compounding; annual is useful for bonds.",
                  },
                ].map((step) => (
                  <li key={step.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", fontSize: "0.8125rem", fontWeight: 700, color: "var(--f-blue)" }}>
                      {step.n}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.3rem", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>{step.title}</p>
                      <p style={{ fontSize: "0.8375rem", color: "var(--f-text-muted)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{step.body}</p>
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
                  { label: "Final Balance", body: "The total value of your account at the end of the period — your original principal plus all contributions plus all interest earned from compounding. This is the number you use when planning savings goals or projecting retirement balances." },
                  { label: "Total Contributed", body: "The total amount you personally deposited: your initial principal plus all annual contributions added over the period. This is your break-even number — your final balance is always at least this (with any positive rate). The difference between final balance and total contributed is pure interest." },
                  { label: "Total Interest", body: "The profit generated purely by compounding — the interest earned on top of all your contributions. This grows exponentially: in later years you earn more interest per year than in early years, because the balance earning interest is much larger. The chart makes this progression visible." },
                  { label: "Rule of 72", body: "A quick mental shortcut: divide 72 by your interest rate (as a percentage) to estimate how many years it takes to double your money. At 8%, money doubles roughly every 9 years (72 ÷ 8 = 9). This rule is approximate but accurate within a few percent for typical rates." },
                  { label: "Year-by-Year Table", body: "Shows your balance, total contributed, and total interest at each year (filtered to key milestones). Use this to identify when compound interest starts outpacing your contributions — typically around the midpoint of a long investment period." },
                  { label: "Growth Chart", body: "The stacked area chart shows two areas over time: the lower (lighter) area is your principal plus contributions, the upper (darker) area is pure interest growth. Watch how the interest area grows faster in later years — this is the compound effect accelerating." },
                ].map((item) => (
                  <div key={item.label} style={{ background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "10px", padding: "1.375rem", boxShadow: "var(--f-shadow-card)" }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--f-blue)", marginBottom: "0.5rem" }}>{item.label}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section
              id="how-it-works"
              style={{ marginBottom: "3rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "12px", padding: "2rem", boxShadow: "var(--f-shadow-card)" }}
            >
              <SectionHeading>How the compound interest formula works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The compound interest formula calculates how a principal grows when interest is repeatedly applied
                    to the balance — including previously earned interest. More frequent compounding means interest is
                    applied in smaller increments more often, which produces slightly higher final values.
                  </p>
                  <FormulaBlock
                    formula="A = P × (1 + r/n)^(n×t)"
                    example="P = principal · r = annual rate · n = periods/year · t = years"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    With annual contributions, each contribution is treated as a recurring payment added every period:
                  </p>
                  <FormulaBlock
                    formula="A = P × (1 + r/n)^(nt) + (C/n) × ((1 + r/n)^(nt) − 1) / (r/n)"
                    example="C = annual contribution · C/n = contribution per compounding period"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    When the rate is 0, the formula simplifies to: <strong>A = P + C × t</strong> (pure linear growth
                    with no interest). The Rule of 72 provides a quick approximation of doubling time:
                  </p>
                  <FormulaBlock
                    formula="Years to double ≈ 72 / Annual Rate (%)"
                    example="8% rate → 72 ÷ 8 = 9 years to double (actual: 9.006 years monthly)"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "Why frequency matters (a little)", body: "At 8%, monthly compounding produces an effective annual rate (EAR) of 8.30%, daily compounding produces 8.33%, and annual compounding is exactly 8%. Over 30 years on $10,000, monthly compounding produces ~$600 more than annual. The difference grows with the rate and period but is rarely decisive." },
                    { title: "Simple vs compound interest", body: "Simple interest only applies the rate to your original principal. Compound interest applies the rate to the entire balance — including all previously earned interest. On $1,000 at 8% for 30 years: simple interest earns $2,400. Compound interest (monthly) earns $9,870. The gap is the magic of compounding." },
                    { title: "The acceleration in later years", body: "In year 1 of $10,000 at 8%, you earn $800 in interest. By year 20, you earn over $3,200 per year from interest alone — on the same original principal. The earnings accelerate because each year's base is larger. This is why starting early is worth so much more than investing more later." },
                    { title: "Annual contributions vs monthly", body: "This calculator models annual contributions — one deposit per year. For monthly investing (dollar-cost averaging), use the Investment Growth Calculator, which models monthly contributions with monthly compounding. Annual contributions are appropriate for bonds, CD ladders, and annual bonus investing." },
                  ].map((item) => (
                    <div key={item.title} style={{ background: "var(--f-page)", border: "1px solid var(--f-border)", borderRadius: "8px", padding: "1rem 1.125rem" }}>
                      <p style={{ fontSize: "0.8375rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.3rem" }}>{item.title}</p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Compound interest scenarios</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
                <ExampleCard
                  name="High-yield savings — 5 years"
                  inputs={[
                    { label: "Principal", value: "$10,000" },
                    { label: "Annual Rate", value: "4.5%" },
                    { label: "Compounding", value: "Monthly" },
                    { label: "Annual Contribution", value: "$0" },
                  ]}
                  outputs={[
                    { label: "Final Balance", value: "~$12,507", highlight: true },
                    { label: "Total Interest", value: "~$2,507" },
                    { label: "Years to Double", value: "16 years" },
                  ]}
                />
                <ExampleCard
                  name="Long-term investment — 30 years"
                  inputs={[
                    { label: "Principal", value: "$5,000" },
                    { label: "Annual Rate", value: "8%" },
                    { label: "Compounding", value: "Monthly" },
                    { label: "Annual Contribution", value: "$0" },
                  ]}
                  outputs={[
                    { label: "Final Balance", value: "~$54,913", highlight: true },
                    { label: "Total Interest", value: "~$49,913" },
                    { label: "Years to Double", value: "~9 years" },
                  ]}
                />
                <ExampleCard
                  name="Savings + contributions — 20 years"
                  inputs={[
                    { label: "Principal", value: "$2,000" },
                    { label: "Annual Rate", value: "6%" },
                    { label: "Compounding", value: "Monthly" },
                    { label: "Annual Contribution", value: "$1,200" },
                  ]}
                  outputs={[
                    { label: "Total Contributed", value: "$26,000" },
                    { label: "Final Balance", value: "~$50,038", highlight: true },
                    { label: "Total Interest", value: "~$24,038" },
                  ]}
                />
              </div>
              <div style={{ background: "oklch(0.97 0.01 258)", border: "1px solid var(--f-blue-border)", borderRadius: "8px", padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  The long-term example is the most striking: $5,000 invested once at 8% for 30 years grows to nearly
                  $55,000 — almost 11× the original amount — without a single additional deposit. The third example
                  shows how even a modest $1,200/year contribution alongside a small starting balance accumulates to
                  over $50,000 with the help of compound interest.
                </p>
              </div>
            </section>

            {/* Compound interest explained */}
            <section
              id="compound-interest-explained"
              style={{ marginBottom: "3rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "12px", padding: "2rem", boxShadow: "var(--f-shadow-card)" }}
            >
              <SectionHeading>Why compound interest is the foundation of wealth building</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    Compound interest is often described as earning "interest on interest" — but the real insight is
                    that each period, your effective base grows larger. In year 1, you earn interest on $10,000. In
                    year 10, you earn interest on $21,589 (at 8%). In year 20, you earn interest on $46,610. The
                    same interest rate applied to an ever-growing base produces exponentially larger annual returns.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    This is why financial independence planning focuses so heavily on starting early and investing
                    consistently. The early years lay the base for the compounding that pays off dramatically in later
                    years. A 25-year-old investing $10,000 today will likely have more at age 65 than a 35-year-old
                    who invests $10,000 every year — because the 25-year-old&apos;s money compounds for an extra decade.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    For FIRE planning, compound interest is not just background knowledge — it is the mechanism that
                    makes early retirement possible. The faster you accumulate capital and put it to work, the sooner
                    compound growth begins carrying the weight of your wealth accumulation. See our{" "}
                    <Link href="/blog/investment-growth-and-compound-returns" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                      compound returns guide
                    </Link>
                    {" "}for more on how this plays out in practice.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { label: "The 8th wonder of the world", body: "Albert Einstein is frequently (perhaps apocryphally) credited with calling compound interest the eighth wonder of the world: 'He who understands it, earns it; he who doesn't, pays it.' Whether or not he said it, the math is clear — compound interest is the engine of wealth for savers and the engine of debt for borrowers." },
                    { label: "Compound interest works against you in debt", body: "The same mechanics that grow your savings also grow debt balances when you carry a balance on a high-interest credit card or loan. A credit card at 20% APR compounding daily means you're paying interest on your interest — just as a saver earns it. Eliminating high-interest debt is the risk-free equivalent of a guaranteed high return." },
                    { label: "Inflation: compound interest in reverse", body: "Inflation compounds against you the same way interest compounds for you. 3% inflation per year means $100 today is worth $97 in real purchasing power in a year — and only $74 after 10 years. To preserve wealth, your investments need to outpace inflation, which is why a real return (above inflation) matters more than the nominal rate." },
                    { label: "Tax-advantaged accounts turbocharge compounding", body: "In a traditional IRA or 401(k), growth is tax-deferred — meaning you don't pay tax on interest or dividends each year. In a Roth account, growth is tax-free. Both allow compound interest to work on a larger base than a taxable account, where you lose a portion of gains to taxes annually. Maximizing tax-advantaged accounts is one of the highest-leverage actions for long-term wealth building." },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "var(--f-page)", border: "1px solid var(--f-border)", borderRadius: "8px", padding: "1rem 1.125rem" }}>
                      <p style={{ fontSize: "0.8375rem", fontWeight: 600, color: "var(--f-text-heading)", marginBottom: "0.3rem" }}>{item.label}</p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{item.body}</p>
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
                  q="What is compound interest?"
                  a="Compound interest is interest calculated on both the initial principal and the interest already accumulated. Unlike simple interest (which only applies to the original amount), compound interest grows your balance exponentially — each period's interest becomes part of the base for the next period's calculation. Over long periods, this produces dramatically higher returns than simple interest."
                />
                <FAQItem
                  q="How often does compound interest compound?"
                  a="Compounding frequency varies by account type. Savings accounts and money market accounts typically compound daily. CDs and some bonds compound monthly or quarterly. Some older bonds compound annually. More frequent compounding produces a slightly higher effective annual rate. This calculator supports daily, monthly, quarterly, and annual compounding."
                />
                <FAQItem
                  q="What is the difference between compound interest and simple interest?"
                  a="Simple interest applies the rate only to the original principal — $1,000 at 8% simple interest earns $80 every year regardless of accumulated balance. Compound interest applies the rate to the entire balance including prior interest — $1,000 at 8% compound interest earns $80 in year 1, but $86.40 in year 2, $93.31 in year 3, and so on. Over 30 years, the compound account is worth nearly 10× the principal; the simple account is worth 3.4×."
                />
                <FAQItem
                  q="What is the Rule of 72?"
                  a="The Rule of 72 is a mental shortcut: divide 72 by your annual interest rate (as a percentage) to estimate how many years it takes to double your money. At 6%, money doubles in approximately 12 years (72 ÷ 6 = 12). At 9%, approximately 8 years. The rule is accurate within a few percent for typical rates (3–15%) and provides a quick intuition for how compounding works across different scenarios."
                />
                <FAQItem
                  q="How is this different from the Investment Growth Calculator?"
                  a={<>The <Link href="/investment-growth-calculator" style={{ color: "var(--f-blue)", textDecoration: "none" }}>Investment Growth Calculator</Link> models monthly contributions with monthly or annual compounding — ideal for modeling regular investing (401k, monthly index fund contributions). This Compound Interest Calculator models annual contributions and supports four compounding frequencies including daily and quarterly — better for savings accounts, bonds, CDs, or lump-sum scenarios where you want to see the exact compounding frequency effect.</>}
                />
                <FAQItem
                  q="What interest rate should I use for savings vs investments?"
                  a="For a high-yield savings account, use the current APY (typically 4–5% in 2024–2025). For a CD, use the stated APY. For a broad stock market index fund, 7–10% is commonly used based on long-run historical averages — 7% is a conservative real-return estimate. Use 8% as a moderate nominal assumption for long-term investment projections. Always check the specific account or fund's actual rate."
                />
                <FAQItem
                  q="Does compound interest apply to retirement accounts?"
                  a="Yes — 401(k) accounts, IRAs, and Roth IRAs all benefit from compound growth. Investment gains (dividends, capital gains) are reinvested and compound over time. The major advantage of retirement accounts is that growth is either tax-deferred (traditional) or tax-free (Roth), meaning you compound on a larger base than a taxable account where you pay annual taxes on gains."
                />
                <FAQItem
                  q="How accurate is this calculator?"
                  a="The calculator applies the standard compound interest formula precisely for your chosen inputs. For savings accounts, the result closely matches the actual balance if the stated APY matches your input. For investments, the main limitation is that real-world returns vary year-to-year rather than being constant — the calculator assumes your chosen rate every year. Use conservative rate assumptions for planning purposes."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Put compound interest to work for FIRE</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Project portfolio growth with monthly investing"
                  description="Model monthly contributions with compound growth — ideal for 401(k) and regular index fund investing."
                  href="/investment-growth-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Calculate your FIRE number"
                  description="Find out exactly how much you need to retire — the portfolio target that compound interest will help you reach."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="See your full FIRE timeline"
                  description="Combine your savings rate, income, expenses, and compound growth into a complete path to financial independence."
                  href="/fire-calculator"
                  live={true}
                />
              </div>
            </section>

            {/* Related calculators */}
            <section id="related-calculators" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Related FIRE calculators</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
                <RelatedCard name="Investment Growth Calculator" href="/investment-growth-calculator" description="Project portfolio growth with monthly contributions and monthly compounding — ideal for regular investing." live={true} />
                <RelatedCard name="FIRE Calculator" href="/fire-calculator" description="Full FIRE projection combining income, expenses, portfolio, and investment returns." live={true} />
                <RelatedCard name="FIRE Number Calculator" href="/fire-number-calculator" description="Find exactly how much you need to retire based on your annual expenses and withdrawal rate." live={true} />
                <RelatedCard name="4% Rule Calculator" href="/4-percent-rule-calculator" description="Calculate safe annual withdrawals from a retirement portfolio and how long it will last." live={true} />
                <RelatedCard name="Savings Rate Calculator" href="/savings-rate-calculator" description="See how your savings rate maps to years until financial independence." live={true} />
              </div>
            </section>

            {/* Disclaimer */}
            <div id="disclaimer" style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial,
                investment, or tax advice. Results are based on a constant interest rate applied each period — actual
                savings account rates change over time and investment returns fluctuate year-to-year. Past performance
                does not guarantee future results. Consult a qualified financial advisor before making investment
                or savings decisions.
              </p>
            </div>

          </div>{/* end main content */}
        </div>{/* end two-column */}
      </div>

    </div>
  )
}
