// app/coast-fire-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { CoastFireCalculator } from "@/components/calculators/coast-fire-calculator"
import { OnThisPage } from "@/components/ui/on-this-page"

export const metadata: Metadata = {
  title: "Coast FIRE Calculator — How Much Do You Need to Invest Today?",
  description:
    "Calculate your Coast FIRE number — the lump sum you need invested today so compound growth alone reaches your FIRE target by retirement. No more contributions needed once you hit it.",
  alternates: {
    canonical: `${config.siteUrl}/coast-fire-calculator`,
  },
  openGraph: {
    title: "Coast FIRE Calculator — How Much Do You Need to Invest Today?",
    description:
      "Find your Coast FIRE number and let compound growth do the rest. Free, instant results.",
    url: `${config.siteUrl}/coast-fire-calculator`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const ON_THIS_PAGE = [
  { id: "how-to-use", label: "How to use" },
  { id: "use-your-results", label: "Use your results" },
  { id: "how-it-works", label: "How it works" },
  { id: "examples", label: "Examples" },
  { id: "coast-fire-explained", label: "What is Coast FIRE?" },
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
  name, currentAge, retirementAge, expenses, coastNumber, fireNumber, alreadyCoasted,
}: {
  name: string
  currentAge: string
  retirementAge: string
  expenses: string
  coastNumber: string
  fireNumber: string
  alreadyCoasted?: boolean
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
          { label: "Current Age", value: currentAge },
          { label: "Retirement Age", value: retirementAge },
          { label: "Annual Expenses", value: expenses },
          { label: "FIRE Number", value: fireNumber },
          { label: "Coast FIRE Number", value: coastNumber, highlight: true },
          ...(alreadyCoasted ? [{ label: "Status", value: "Already Coasting!", highlight: true }] : []),
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

export default function CoastFireCalculatorPage() {
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
            Coast FIRE Calculator
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
            How Much Do You Need to Invest Today to Coast to Retirement?
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Coast FIRE is the point where your portfolio is large enough that compound growth alone — with zero new
            contributions — will grow to your full FIRE number by retirement. Calculate your Coast FIRE number and
            see exactly how close you are.
          </p>
        </div>

        {/* ── Calculator widget ── */}
        <section id="calculator" aria-label="Coast FIRE Calculator" style={{ marginBottom: "3rem" }}>
          <CoastFireCalculator />
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
                Enter your details and the calculator instantly shows your Coast FIRE number:
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  {
                    n: "1",
                    title: "Current age and retirement age",
                    body: "Enter your current age and the age at which you want to retire. The gap between these is your coasting window — the number of years compound growth has to do the work. A longer window means a much lower Coast FIRE number.",
                  },
                  {
                    n: "2",
                    title: "Current portfolio value",
                    body: "Enter the total value of your invested assets today. This is what you compare against your Coast FIRE number to see how far along you are. Include retirement accounts, brokerage accounts, and any other invested assets.",
                  },
                  {
                    n: "3",
                    title: "Annual expenses in retirement",
                    body: "How much do you expect to spend each year in retirement? This drives your FIRE number, which the calculator then discounts back to today to find your Coast FIRE number.",
                  },
                  {
                    n: "4",
                    title: "Withdrawal rate and expected return",
                    body: "The withdrawal rate determines your FIRE number (default 4%). The annual return rate determines how aggressively your portfolio grows during the coasting window. Adjust the sliders to model conservative or optimistic scenarios.",
                  },
                  {
                    n: "5",
                    title: "Read your results",
                    body: "The calculator shows your Coast FIRE number, progress bar, gap to cover, and a chart showing portfolio growth from today to retirement. If your current portfolio already exceeds the Coast FIRE number, you'll see a green 'Already Coasting' indicator.",
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
                  { label: "Coast FIRE Number", body: "The lump sum you need invested today for compound growth to reach your FIRE target by retirement — with no further contributions. Once you hit this number, your retirement is mathematically secured." },
                  { label: "FIRE Number", body: "Your full retirement target: the portfolio needed to fund your lifestyle indefinitely at your chosen withdrawal rate. Coast FIRE is simply the present value of this future target." },
                  { label: "Years of Growth", body: "The number of years between now and retirement — the coasting window. More years means exponentially more growth and a much lower Coast FIRE number. This is the most powerful variable in the formula." },
                  { label: "Gap to Cover", body: "The difference between your current portfolio and your Coast FIRE number. This is what you need to save before you can stop contributing. Once the gap is closed, compound growth handles the rest." },
                  { label: "Progress Bar", body: "Visual indicator of how far along you are toward your Coast FIRE number. Reaching 100% means you've hit Coast FIRE — you can redirect contributions to spending or other goals." },
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
              <SectionHeading>How the Coast FIRE Calculator works</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    The calculator uses two formulas in sequence. First, it calculates your full FIRE number —
                    the portfolio needed to sustain your retirement spending. Then it discounts that future target
                    back to today using the compound interest present value formula.
                  </p>
                  <FormulaBlock
                    formula="FIRE Number = Annual Expenses ÷ Withdrawal Rate"
                    example="Example: $40,000 ÷ 0.04 = $1,000,000"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    The Coast FIRE number is the present value of the FIRE number — the amount that, when compounded
                    at your expected return for the number of years until retirement, equals your FIRE target:
                  </p>
                  <FormulaBlock
                    formula="Coast FIRE Number = FIRE Number ÷ (1 + r)ⁿ"
                    example="r = annual return rate · n = years until retirement"
                  />
                  <p style={{ marginTop: "1rem" }}>
                    This is the standard present value formula. Compound growth is exponential, so even modest
                    differences in years or return rate produce dramatically different Coast FIRE numbers.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { title: "The power of time", body: "A 30-year-old targeting retirement at 65 has a 35-year coasting window. At 7% return, $1M discounted 35 years back is only ~$94,000. A 40-year-old targeting the same goal needs ~$184,000 — nearly double." },
                    { title: "Why this matters for your strategy", body: "Once you hit Coast FIRE, you can redirect your investment contributions to other things — spending more now, working part-time, or pursuing projects you love. You've already 'funded' retirement." },
                    { title: "Return rate sensitivity", body: "The Coast FIRE number is highly sensitive to your assumed return rate. At 5%, the Coast number is much higher than at 8%. Use a conservative rate (6–7%) for planning to avoid over-optimism." },
                    { title: "Inflation and the 4% rule", body: "Your annual expenses are in today's dollars. The FIRE number based on the 4% rule historically accounts for inflation-adjusted withdrawals, so the formula remains valid as long as you invest in real assets that grow with inflation." },
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
              <SectionHeading>Examples of Coast FIRE scenarios</SectionHeading>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ExampleCard
                  name="Early starter — 25-year-old, retire at 60"
                  currentAge="25"
                  retirementAge="60"
                  expenses="$40,000 / yr"
                  fireNumber="$1,000,000"
                  coastNumber="~$74,000"
                />
                <ExampleCard
                  name="Mid-career — 35-year-old, retire at 65"
                  currentAge="35"
                  retirementAge="65"
                  expenses="$50,000 / yr"
                  fireNumber="$1,250,000"
                  coastNumber="~$164,000"
                />
                <ExampleCard
                  name="Late starter — 45-year-old, retire at 65"
                  currentAge="45"
                  retirementAge="65"
                  expenses="$60,000 / yr"
                  fireNumber="$1,500,000"
                  coastNumber="~$387,000"
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
                  Notice how powerfully time affects the Coast FIRE number: the 25-year-old needs only $74,000 invested today to secure a $1M retirement — because 35 years of 7% compounding does the heavy lifting. The 45-year-old with only 20 years has a Coast FIRE number more than 5× higher. Starting early is the single most powerful lever in the Coast FIRE equation.
                </p>
              </div>
            </section>

            {/* Coast FIRE explained */}
            <section
              id="coast-fire-explained"
              style={{
                marginBottom: "3rem",
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <SectionHeading>What is Coast FIRE?</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 300 }}>
                  <p>
                    Coast FIRE is a milestone on the path to full financial independence. It&apos;s the point at which
                    your portfolio is large enough that — even if you never contribute another dollar — compound
                    growth will carry it to your FIRE number by your target retirement age.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    The term &quot;coasting&quot; captures the concept perfectly: you&apos;ve pedaled hard to build momentum, and now
                    you can let the portfolio coast downhill on its own.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    Coast FIRE doesn&apos;t mean you stop working — it means you no longer <em>need</em> to save for
                    retirement. You can work a lower-paying job you love, cut hours, or spend more of your income
                    today, knowing your future is already funded.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { label: "Coast FIRE vs Full FIRE", body: "Full FIRE means your portfolio is large enough to fund retirement withdrawals immediately. Coast FIRE is an earlier milestone where the portfolio just needs time to grow — you still need income to cover current expenses." },
                    { label: "Coast FIRE vs Barista FIRE", body: "Barista FIRE means working part-time to cover some expenses while your portfolio covers the rest. Coast FIRE is about when you can stop contributing — it says nothing about whether you need income now." },
                    { label: "The emotional value", body: "Many people find Coast FIRE more motivating than full FIRE because it's achievable earlier. Knowing your retirement is 'locked in' changes your relationship with work and money in ways that are hard to quantify." },
                    { label: "Who should target Coast FIRE", body: "Coast FIRE is especially valuable for high earners in their 20s and 30s who want flexibility sooner, parents who want to reduce work during child-rearing years, and anyone who wants to pursue lower-paying meaningful work." },
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
                  q="What is Coast FIRE?"
                  a="Coast FIRE is the point at which your portfolio is large enough that — with no additional contributions — it will grow to your full FIRE number by your target retirement age through compound interest alone. You've 'coasted' to a funded retirement."
                />
                <FAQItem
                  q="How is the Coast FIRE number calculated?"
                  a="First, your FIRE number is calculated: Annual Expenses ÷ Withdrawal Rate. Then the Coast FIRE number is the present value of that future target: FIRE Number ÷ (1 + annual return)^years until retirement. A $1,000,000 FIRE target 30 years away at 7% annual return gives a Coast FIRE number of about $131,000."
                />
                <FAQItem
                  q="Does Coast FIRE mean I can stop working?"
                  a="Not necessarily. Coast FIRE means you can stop contributing to retirement savings. You still need income to cover your current living expenses. The difference is that your retirement is now funded without any further investment contributions — you just need to pay your bills today."
                />
                <FAQItem
                  q="What return rate should I use?"
                  a="For long-term projections, a 6–7% nominal return is commonly cited for a diversified stock market portfolio. More aggressive assumptions (8–10%) give a lower Coast FIRE number but carry more risk. For conservative planning, use 5–6%. The calculator uses 7% as a default."
                />
                <FAQItem
                  q="Should I include my 401(k) and IRA balances?"
                  a="Yes — include all invested assets: 401(k), IRA, Roth accounts, taxable brokerage accounts. Even though you can't withdraw from retirement accounts without penalty until 59½ (with some exceptions), they still compound and count toward your Coast FIRE number."
                />
                <FAQItem
                  q="What if I've already hit my Coast FIRE number?"
                  a="Congratulations — you're coasting. The calculator will show a green indicator confirming this. At this point, you can redirect future investment contributions to other goals: more spending now, paying off low-interest debt, charitable giving, or building a larger cushion for an earlier retirement."
                />
                <FAQItem
                  q="How does Coast FIRE differ from the full FIRE Calculator?"
                  a="The full FIRE Calculator projects when you'll reach retirement based on your current portfolio, income, and ongoing contributions. Coast FIRE only asks: how much do you need invested today so future growth alone gets you there? It answers a different question: not 'when will I retire?' but 'when can I stop saving for retirement?'"
                />
                <FAQItem
                  q="Does this account for inflation?"
                  a="Your annual expenses are stated in today's dollars. The withdrawal rate methodology (historically the 4% rule) is designed for inflation-adjusted withdrawals, so the FIRE number in today's dollars is approximately correct as long as your investments grow at a real return above inflation. For precision, you could reduce your expected return by 2–3% to use a real (inflation-adjusted) rate."
                />
              </div>
            </section>

            {/* Next steps */}
            <section id="next-steps" style={{ marginBottom: "3rem" }}>
              <SectionHeading>Next steps for your FIRE journey</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <NextStepCard
                  title="Get your full FIRE projection"
                  description="See your complete timeline to retirement with income, expenses, contributions, and projected FIRE age all in one place."
                  href="/fire-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Calculate your FIRE number"
                  description="Find the exact portfolio size needed to retire based on your expenses and chosen withdrawal rate."
                  href="/fire-number-calculator"
                  live={true}
                />
                <NextStepCard
                  title="See how your savings rate matters"
                  description="Discover how dramatically increasing your savings rate accelerates your path to both Coast FIRE and full FIRE."
                  href="/savings-rate-calculator"
                  live={true}
                />
                <NextStepCard
                  title="Model your safe withdrawal rate"
                  description="Use the 4% Rule Calculator to see how different withdrawal rates affect how long your portfolio lasts in retirement."
                  href="/4-percent-rule-calculator"
                  live={false}
                />
              </div>
            </section>

            {/* Related calculators */}
            <section style={{ marginBottom: "3rem" }}>
              <SectionHeading>Other FIRE calculators</SectionHeading>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "1rem" }}>
                <RelatedCard name="FIRE Calculator" href="/fire-calculator" description="Full FIRE projection with income, portfolio, contributions, and retirement timeline." live={true} />
                <RelatedCard name="FIRE Number Calculator" href="/fire-number-calculator" description="Find exactly how much you need to retire based on your expenses and withdrawal rate." live={true} />
                <RelatedCard name="Savings Rate Calculator" href="/savings-rate-calculator" description="See how your savings rate maps directly to years until financial independence." live={true} />
                <RelatedCard name="4% Rule Calculator" href="/4-percent-rule-calculator" description="Model safe withdrawal rates and portfolio longevity in retirement." live={false} />
                <RelatedCard name="Retirement Timeline Calculator" href="/retirement-timeline-calculator" description="Year-by-year roadmap to retirement with scenario comparisons." live={false} />
              </div>
            </section>

            {/* Learn more */}
            <section style={{ marginBottom: "3rem" }}>
              <SectionHeading>Learn more about Coast FIRE</SectionHeading>
              <div style={{ background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "10px", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  Articles on Coast FIRE strategy, the math behind coasting, and real-world case studies are coming soon.
                  Explore the{" "}
                  <Link href="/fire-calculator" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                    full FIRE Calculator
                  </Link>{" "}
                  or the{" "}
                  <Link href="/fire-number-calculator" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
                    FIRE Number Calculator
                  </Link>{" "}
                  in the meantime.
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <div style={{ padding: "1.25rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                <strong style={{ fontWeight: 500, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
                This calculator is for educational and informational purposes only. It does not constitute financial, investment, or
                tax advice. All projections are estimates based on hypothetical scenarios — actual investment returns vary and past
                performance does not guarantee future results. The Coast FIRE number assumes a constant annual return rate, which
                does not reflect real-world market volatility. Consult a qualified financial advisor before making investment decisions.
              </p>
            </div>

          </div>{/* end main content */}

        </div>{/* end two-column */}
      </div>

    </div>
  )
}
