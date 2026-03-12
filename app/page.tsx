// app/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "FIRE Tools — Free Financial Independence Calculators",
  description:
    "Free financial independence calculators for the FIRE movement. Calculate your FIRE number, retirement timeline, savings rate, compound interest, and more. No signup required.",
  alternates: {
    canonical: config.siteUrl,
  },
  openGraph: {
    title: "FIRE Tools — Free Financial Independence Calculators",
    description:
      "Calculate your path to financial independence with free FIRE calculators. FIRE number, Coast FIRE, savings rate, 4% rule, and more.",
    url: config.siteUrl,
    siteName: "FIRE Tools",
    type: "website",
  },
}

const calculators = [
  {
    slug: "fire-calculator",
    name: "FIRE Calculator",
    description: "Calculate your FIRE number, years to financial independence, and projected retirement age based on your savings rate.",
    tag: "Most Popular",
    live: true,
  },
  {
    slug: "fire-number-calculator",
    name: "FIRE Number Calculator",
    description: "Find exactly how much you need to retire. Based on your annual expenses and the 4% safe withdrawal rule.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "coast-fire-calculator",
    name: "Coast FIRE Calculator",
    description: "Discover the portfolio size where you can stop contributing and let compound interest carry you to retirement.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "savings-rate-calculator",
    name: "Savings Rate Calculator",
    description: "Calculate your savings rate and see how dramatically increasing it shortens your path to financial independence.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "4-percent-rule-calculator",
    name: "4% Rule Calculator",
    description: "Model safe withdrawal rates for retirement. See how long your portfolio lasts under different spending scenarios.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Visualize how your investments grow over time with regular contributions and compound returns.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "investment-growth-calculator",
    name: "Investment Growth Calculator",
    description: "Project your portfolio value over any time horizon with customizable return rates and contribution schedules.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "retirement-timeline-calculator",
    name: "Retirement Timeline Calculator",
    description: "See a year-by-year roadmap to retirement based on your income, expenses, and investment growth assumptions.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "lean-fire-calculator",
    name: "Lean FIRE Calculator",
    description: "Plan an ultra-frugal early retirement. Calculate the minimum portfolio for a lean, location-independent lifestyle.",
    tag: "Coming Soon",
    live: false,
  },
  {
    slug: "barista-fire-calculator",
    name: "Barista FIRE Calculator",
    description: "Semi-retirement planning: combine part-time income with a smaller portfolio for flexible financial independence.",
    tag: "Coming Soon",
    live: false,
  },
]

const stats = [
  { value: "10", label: "Free Calculators" },
  { value: "4%", label: "Safe Withdrawal Rule" },
  { value: "25×", label: "Expenses = FIRE Number" },
  { value: "0", label: "Signup Required" },
]

export default function HomePage() {
  return (
    <div
      style={{
        background: "var(--fire-charcoal)",
        color: "oklch(0.93 0.005 260)",
        minHeight: "100vh",
        fontFamily: "var(--font-dm-sans), ui-sans-serif, sans-serif",
      }}
    >
      {/* Nav */}
      <header
        style={{
          borderBottom: "1px solid var(--fire-charcoal-border)",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.01em",
              color: "oklch(0.97 0.005 260)",
            }}
          >
            FIRE<span style={{ color: "var(--fire-amber)" }}>Tools</span>
          </span>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link
              href="/fire-calculator"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--fire-text-muted)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Calculators
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 8vw, 6rem)",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Decorative grid lines */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--fire-charcoal-border) 1px, transparent 1px), linear-gradient(90deg, var(--fire-charcoal-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />
        {/* Amber glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-120px",
            right: "10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, oklch(0.78 0.16 68 / 0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fire-amber)",
              marginBottom: "1.5rem",
            }}
          >
            Financial Independence · Retire Early
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "oklch(0.97 0.005 260)",
              marginBottom: "1.75rem",
              maxWidth: "800px",
            }}
          >
            Every number you need on your path to{" "}
            <span
              style={{
                color: "var(--fire-amber)",
                fontStyle: "italic",
              }}
            >
              financial freedom.
            </span>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "var(--fire-text-muted)",
              lineHeight: 1.7,
              maxWidth: "560px",
              marginBottom: "2.5rem",
              fontWeight: 300,
            }}
          >
            Free calculators for the FIRE movement. Instantly model your retirement timeline,
            savings rate, FIRE number, and investment growth — no account needed.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/fire-calculator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--fire-amber)",
                color: "var(--fire-charcoal)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                padding: "0.8125rem 1.75rem",
                borderRadius: "4px",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Try the FIRE Calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="#calculators"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid var(--fire-charcoal-border)",
                color: "var(--fire-text-muted)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                padding: "0.8125rem 1.75rem",
                borderRadius: "4px",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{
          borderTop: "1px solid var(--fire-charcoal-border)",
          borderBottom: "1px solid var(--fire-charcoal-border)",
          background: "var(--fire-charcoal-mid)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 5vw, 4rem)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "1.75rem 0",
                borderRight: i < stats.length - 1 ? "1px solid var(--fire-charcoal-border)" : undefined,
                paddingLeft: i > 0 ? "2rem" : 0,
                paddingRight: i < stats.length - 1 ? "2rem" : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "var(--fire-amber)",
                  lineHeight: 1,
                  marginBottom: "0.375rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--fire-text-muted)",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator grid */}
      <section
        id="calculators"
        style={{
          padding: "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fire-amber)",
              marginBottom: "0.75rem",
            }}
          >
            All Tools
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "oklch(0.97 0.005 260)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Ten calculators. Every angle of{" "}
            <span style={{ color: "var(--fire-amber)", fontStyle: "italic" }}>FIRE.</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: "1px",
            background: "var(--fire-charcoal-border)",
            border: "1px solid var(--fire-charcoal-border)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {calculators.map((calc, i) => (
            <CalculatorCard key={calc.slug} calc={calc} index={i} />
          ))}
        </div>
      </section>

      {/* What is FIRE — SEO content section */}
      <section
        style={{
          borderTop: "1px solid var(--fire-charcoal-border)",
          padding: "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          background: "var(--fire-charcoal-mid)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fire-amber)",
                marginBottom: "0.75rem",
              }}
            >
              What is FIRE?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.005 260)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Financial Independence,{" "}
              <span style={{ color: "var(--fire-amber)", fontStyle: "italic" }}>Retire Early.</span>
            </h2>
            <p
              style={{
                color: "var(--fire-text-muted)",
                lineHeight: 1.75,
                fontSize: "0.9375rem",
                marginBottom: "1.25rem",
                fontWeight: 300,
              }}
            >
              FIRE is a financial movement built on a simple principle: save and invest aggressively
              enough that your portfolio generates more income than you spend. At that point, work
              becomes optional — you are financially independent.
            </p>
            <p
              style={{
                color: "var(--fire-text-muted)",
                lineHeight: 1.75,
                fontSize: "0.9375rem",
                fontWeight: 300,
              }}
            >
              The most widely used framework is the{" "}
              <strong style={{ color: "oklch(0.78 0.005 260)", fontWeight: 500 }}>4% rule</strong>:
              if your annual spending equals 4% or less of your total invested portfolio, your money
              will last indefinitely in the vast majority of historical market scenarios. Your{" "}
              <strong style={{ color: "oklch(0.78 0.005 260)", fontWeight: 500 }}>FIRE number</strong>{" "}
              is therefore 25 times your annual expenses.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "var(--fire-charcoal-border)",
              border: "1px solid var(--fire-charcoal-border)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            {[
              {
                term: "FIRE Number",
                def: "Annual expenses × 25. The total portfolio value at which the 4% rule allows indefinite withdrawals.",
              },
              {
                term: "Savings Rate",
                def: "The percentage of your income you save and invest. Higher savings rates compress your timeline dramatically.",
              },
              {
                term: "Coast FIRE",
                def: "The portfolio size at which you can stop contributing and compound interest alone will reach your FIRE number.",
              },
              {
                term: "Safe Withdrawal Rate",
                def: "The annual percentage you can withdraw from a portfolio without depleting it over a 30+ year retirement.",
              },
            ].map((item) => (
              <div
                key={item.term}
                style={{
                  background: "var(--fire-charcoal)",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <dt
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--fire-amber)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {item.term}
                </dt>
                <dd
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--fire-text-muted)",
                    lineHeight: 1.65,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {item.def}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why free section */}
      <section
        style={{
          padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
      >
        {[
          {
            icon: "◈",
            title: "Instant results",
            body: "Every calculator updates live as you type — no submit button, no loading, no friction.",
          },
          {
            icon: "◉",
            title: "No account needed",
            body: "All calculations run in your browser. Nothing is stored, nothing is tracked. Your numbers stay yours.",
          },
          {
            icon: "◫",
            title: "Built on proven math",
            body: "Every formula is grounded in the academic research behind the 4% rule and safe withdrawal rate studies.",
          },
        ].map((item) => (
          <div key={item.title}>
            <div
              style={{
                fontSize: "1.25rem",
                color: "var(--fire-amber)",
                marginBottom: "0.875rem",
              }}
            >
              {item.icon}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "oklch(0.92 0.005 260)",
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--fire-text-muted)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              {item.body}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--fire-charcoal-border)",
          padding: "2rem clamp(1.5rem, 5vw, 4rem)",
          background: "var(--fire-charcoal-mid)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "oklch(0.6 0.005 260)",
            }}
          >
            FIRE<span style={{ color: "var(--fire-amber-dim)" }}>Tools</span>
          </span>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--fire-text-dim)",
              lineHeight: 1.6,
              maxWidth: "480px",
              textAlign: "center",
            }}
          >
            For informational purposes only. Not financial advice. Always consult a qualified financial
            professional before making investment decisions.
          </p>
          <span style={{ fontSize: "0.75rem", color: "var(--fire-text-dim)" }}>
            © {new Date().getFullYear()} FIRE Tools
          </span>
        </div>
      </footer>
    </div>
  )
}

function CalculatorCard({
  calc,
  index,
}: {
  calc: (typeof calculators)[0]
  index: number
}) {
  const content = (
    <div
      style={{
        background: "var(--fire-charcoal)",
        padding: "1.75rem",
        height: "100%",
        position: "relative",
        transition: calc.live ? "background 0.15s ease" : undefined,
      }}
      className={calc.live ? "calc-card-live" : undefined}
    >
      {/* Number */}
      <span
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.5rem",
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: calc.live ? "var(--fire-amber)" : "var(--fire-text-dim)",
          lineHeight: 1,
          opacity: 0.5,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tag */}
      <span
        style={{
          display: "inline-block",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: calc.live ? "var(--fire-amber)" : "var(--fire-text-dim)",
          border: `1px solid ${calc.live ? "oklch(0.78 0.16 68 / 0.35)" : "var(--fire-text-dim)"}`,
          borderRadius: "2px",
          padding: "0.2rem 0.5rem",
          marginBottom: "0.875rem",
        }}
      >
        {calc.tag}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "1.125rem",
          fontWeight: 600,
          color: calc.live ? "oklch(0.97 0.005 260)" : "oklch(0.55 0.005 260)",
          letterSpacing: "-0.01em",
          marginBottom: "0.625rem",
          lineHeight: 1.25,
        }}
      >
        {calc.name}
      </h3>
      <p
        style={{
          fontSize: "0.8125rem",
          color: calc.live ? "var(--fire-text-muted)" : "var(--fire-text-dim)",
          lineHeight: 1.65,
          fontWeight: 300,
        }}
      >
        {calc.description}
      </p>

      {calc.live && (
        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--fire-amber)",
          }}
        >
          Use calculator
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )

  if (calc.live) {
    return (
      <Link href={`/${calc.slug}`} style={{ textDecoration: "none", display: "block" }}>
        {content}
      </Link>
    )
  }

  return <div>{content}</div>
}
