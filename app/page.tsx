// app/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "FreedomCalc — Free Retirement & Financial Independence Calculators",
  description:
    "Free financial independence calculators for the FIRE movement. Calculate your FIRE number, retirement timeline, savings rate, compound interest, and more. No signup required.",
  alternates: { canonical: config.siteUrl },
  openGraph: {
    title: "FreedomCalc — Free Retirement & Financial Independence Calculators",
    description: "Calculate your path to financial independence with free FIRE calculators.",
    url: config.siteUrl,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const calculators = [
  { slug: "fire-calculator", name: "FIRE Calculator", description: "Calculate your FIRE number, years to financial independence, and projected retirement age.", live: true },
  { slug: "fire-number-calculator", name: "FIRE Number Calculator", description: "Find exactly how much you need to retire based on your expenses and withdrawal rate.", live: true },
  { slug: "coast-fire-calculator", name: "Coast FIRE Calculator", description: "Discover when compound interest alone will carry you to retirement — no contributions needed.", live: true },
  { slug: "savings-rate-calculator", name: "Savings Rate Calculator", description: "See how dramatically increasing your savings rate shortens your path to independence.", live: true },
  { slug: "4-percent-rule-calculator", name: "4% Rule Calculator", description: "Model safe withdrawal rates and see how long your portfolio lasts under different spending.", live: false },
  { slug: "compound-interest-calculator", name: "Compound Interest Calculator", description: "Visualize how your investments compound over time with regular contributions.", live: false },
  { slug: "investment-growth-calculator", name: "Investment Growth Calculator", description: "Project your portfolio value over any horizon with customizable return rates.", live: true },
  { slug: "retirement-timeline-calculator", name: "Retirement Timeline", description: "A year-by-year roadmap to retirement based on income, expenses, and investment growth.", live: false },
  { slug: "lean-fire-calculator", name: "Lean FIRE Calculator", description: "Plan an ultra-frugal early retirement and calculate the minimum portfolio needed.", live: false },
  { slug: "barista-fire-calculator", name: "Barista FIRE Calculator", description: "Semi-retirement planning with part-time income and a smaller required portfolio.", live: false },
]

const stats = [
  { value: "10", label: "Free Calculators" },
  { value: "4%", label: "Safe Withdrawal Rule" },
  { value: "25×", label: "Expenses = FIRE Number" },
  { value: "0", label: "Signup Required" },
]

export default function HomePage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      {/* ── Hero ── */}
      <section
        style={{
          background: "linear-gradient(135deg, oklch(0.95 0.025 275) 0%, oklch(0.97 0.012 258) 40%, oklch(0.98 0.010 50) 100%)",
          padding: "clamp(4rem, 9vw, 7.5rem) clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating accent dots */}
        <div aria-hidden style={{ position: "absolute", left: "8%", top: "38%", width: "10px", height: "10px", borderRadius: "50%", background: "oklch(0.75 0.18 48)", opacity: 0.7, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", left: "26%", top: "62%", width: "7px", height: "7px", borderRadius: "50%", background: "oklch(0.65 0.18 145)", opacity: 0.6, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", right: "12%", top: "30%", width: "8px", height: "8px", borderRadius: "50%", background: "var(--f-blue)", opacity: 0.25, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", right: "28%", bottom: "20%", width: "5px", height: "5px", borderRadius: "50%", background: "oklch(0.65 0.18 145)", opacity: 0.5, pointerEvents: "none" }} />

        {/* Decorative blur blob */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-10%",
            top: "-30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "oklch(0.88 0.06 275 / 0.35)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--f-blue)",
              marginBottom: "1.125rem",
            }}
          >
            10 Free Calculators
          </p>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              fontWeight: 800,
              color: "var(--f-text-heading)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              marginBottom: "1.375rem",
            }}
          >
            Your path to financial{" "}
            <span style={{ color: "var(--f-blue)" }}>independence</span>{" "}
            starts here.
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(0.9375rem, 1.6vw, 1.125rem)",
              color: "var(--f-text-muted)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              fontWeight: 400,
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
            }}
          >
            Model your FIRE number, savings rate, and retirement timeline — all free, all instant, no account required.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/fire-calculator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--f-blue)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9375rem",
                padding: "0.8125rem 1.75rem",
                borderRadius: "9px",
                textDecoration: "none",
                boxShadow: "0 4px 16px oklch(0.50 0.18 258 / 0.32)",
              }}
            >
              Try FIRE Calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="#calculators"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.85)",
                border: "1px solid var(--f-border-strong)",
                color: "var(--f-text-body)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                padding: "0.8125rem 1.75rem",
                borderRadius: "9px",
                textDecoration: "none",
              }}
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div style={{ borderBottom: "1px solid var(--f-border)", background: "var(--f-card)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 3rem)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "1.5rem 0",
                borderRight: i < stats.length - 1 ? "1px solid var(--f-border)" : undefined,
                paddingLeft: i > 0 ? "2rem" : 0,
                paddingRight: i < stats.length - 1 ? "2rem" : 0,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--f-blue)",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", fontWeight: 400 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Calculator grid ── */}
      <section id="calculators">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
          }}
        >
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.5rem" }}>
            All Tools
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--f-text-heading)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Ten calculators. Every angle of FIRE.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: "1rem",
          }}
        >
          {calculators.map((calc) => (
            <CalcCard key={calc.slug} calc={calc} />
          ))}
        </div>
        </div>
      </section>

      {/* ── What is FIRE ── */}
      <section
        id="what-is-fire"
        style={{
          borderTop: "1px solid var(--f-border)",
          background: "var(--f-card)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
              What is FIRE?
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.125rem)",
                fontWeight: 700,
                color: "var(--f-text-heading)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              Financial Independence, Retire Early.
            </h2>
            <p style={{ color: "var(--f-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", marginBottom: "1rem", fontWeight: 400 }}>
              FIRE is built on a simple principle: save and invest aggressively enough that your portfolio
              generates more income than you spend. At that point, work becomes optional.
            </p>
            <p style={{ color: "var(--f-text-muted)", lineHeight: 1.8, fontSize: "0.9375rem", fontWeight: 400, marginBottom: "1.75rem" }}>
              The most widely used framework is the{" "}
              <strong style={{ color: "var(--f-text-body)", fontWeight: 600 }}>4% rule</strong>: if your
              annual spending equals 4% or less of your total invested portfolio, your money will last
              indefinitely. Your <strong style={{ color: "var(--f-text-body)", fontWeight: 600 }}>FIRE number</strong>{" "}
              is therefore 25× your annual expenses.
            </p>
            <Link
              href="/fire-calculator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--f-blue)",
                textDecoration: "none",
              }}
            >
              Calculate your FIRE number
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--f-border)", borderRadius: "10px", overflow: "hidden", boxShadow: "var(--f-shadow-card)" }}>
            {[
              { term: "FIRE Number", def: "Annual expenses × 25. The portfolio at which 4% withdrawals sustain you indefinitely." },
              { term: "Savings Rate", def: "Percentage of income saved and invested. Higher rates dramatically compress your timeline." },
              { term: "Coast FIRE", def: "The balance at which you can stop contributing and compound interest alone reaches your FIRE number." },
              { term: "Safe Withdrawal Rate", def: "The annual % you can withdraw without depleting a portfolio over a 30+ year retirement." },
            ].map((item, i) => (
              <div
                key={item.term}
                style={{
                  background: i % 2 === 0 ? "var(--f-card)" : "oklch(0.98 0.003 258)",
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid var(--f-border)",
                }}
              >
                <dt style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--f-blue)", marginBottom: "0.3rem" }}>
                  {item.term}
                </dt>
                <dd style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.65, fontWeight: 400, margin: 0 }}>
                  {item.def}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why free ── */}
      <section>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(3rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {[
            {
              title: "Instant results",
              body: "Every calculator updates live as you type — no submit button, no loading, no friction.",
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ),
            },
            {
              title: "No account needed",
              body: "All calculations run in your browser. Nothing is stored or tracked. Your numbers stay yours.",
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: "Built on proven math",
              body: "Every formula is grounded in the research behind the Trinity Study and safe withdrawal rates.",
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M2 13l4-5 3 3 3-4 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="1" y="1" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--f-card)",
                border: "1px solid var(--f-border)",
                borderRadius: "10px",
                padding: "1.625rem",
                boxShadow: "var(--f-shadow-card)",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "var(--f-blue-light)",
                  border: "1px solid var(--f-blue-border)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--f-blue)",
                  marginBottom: "1rem",
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--f-text-heading)",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 400, margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

    </div>
  )
}

function CalcCard({ calc }: { calc: (typeof calculators)[0] }) {
  const inner = (
    <div
      style={{
        background: "var(--f-card)",
        border: "1px solid var(--f-border)",
        borderRadius: "10px",
        padding: "1.5rem",
        height: "100%",
        boxSizing: "border-box",
        transition: calc.live ? "border-color 0.15s ease, box-shadow 0.15s ease" : undefined,
        position: "relative",
      }}
      className={calc.live ? "calc-card" : undefined}
    >


      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: calc.live ? "var(--f-text-heading)" : "var(--f-text-muted)",
          letterSpacing: "-0.01em",
          marginBottom: "0.4375rem",
          lineHeight: 1.3,
        }}
      >
        {calc.name}
      </h3>
      <p
        style={{
          fontSize: "0.8125rem",
          color: calc.live ? "var(--f-text-muted)" : "var(--f-text-faint)",
          lineHeight: 1.65,
          fontWeight: 400,
          margin: 0,
        }}
      >
        {calc.description}
      </p>

      {calc.live && (
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--f-blue)",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          Open calculator
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
            <path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      )}
    </div>
  )

  if (calc.live) {
    return <Link href={`/${calc.slug}`} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>
  }
  return <div style={{ opacity: 0.6 }}>{inner}</div>
}
