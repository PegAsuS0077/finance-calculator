// app/calculators/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "All FIRE Calculators — Free Financial Independence Tools",
  description:
    "Browse all 10 free FIRE calculators. Calculate your FIRE number, retirement timeline, savings rate, compound interest, Coast FIRE, and more — no signup required.",
  alternates: { canonical: `${config.siteUrl}/calculators` },
  openGraph: {
    title: "All FIRE Calculators — Free Financial Independence Tools",
    description: "Browse all 10 free FIRE calculators. No signup required.",
    url: `${config.siteUrl}/calculators`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const CALCULATOR_GROUPS = [
  {
    group: "FIRE Basics",
    items: [
      { slug: "fire-calculator", name: "FIRE Calculator", description: "Calculate your FIRE number, years to financial independence, and projected retirement age." },
      { slug: "fire-number-calculator", name: "FIRE Number Calculator", description: "Find exactly how much you need to retire based on your expenses and withdrawal rate." },
      { slug: "coast-fire-calculator", name: "Coast FIRE Calculator", description: "Discover when compound interest alone will carry you to retirement — no contributions needed." },
      { slug: "savings-rate-calculator", name: "Savings Rate Calculator", description: "See how dramatically increasing your savings rate shortens your path to independence." },
    ],
  },
  {
    group: "Withdrawals & Rules",
    items: [
      { slug: "4-percent-rule-calculator", name: "4% Rule Calculator", description: "Model safe withdrawal rates and see how long your portfolio lasts under different spending." },
      { slug: "retirement-timeline-calculator", name: "Retirement Timeline", description: "A year-by-year roadmap to retirement based on income, expenses, and investment growth." },
    ],
  },
  {
    group: "Growth & Investing",
    items: [
      { slug: "compound-interest-calculator", name: "Compound Interest Calculator", description: "Visualize how your investments compound over time with regular contributions." },
      { slug: "investment-growth-calculator", name: "Investment Growth Calculator", description: "Project your portfolio value over any horizon with customizable return rates." },
    ],
  },
  {
    group: "FIRE Variants",
    items: [
      { slug: "lean-fire-calculator", name: "Lean FIRE Calculator", description: "Plan an ultra-frugal early retirement and calculate the minimum portfolio needed." },
      { slug: "barista-fire-calculator", name: "Barista FIRE Calculator", description: "Semi-retirement planning with part-time income and a smaller required portfolio." },
    ],
  },
]

export default function CalculatorsPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      {/* ── Header ── */}
      <section
        style={{
          background: "linear-gradient(135deg, oklch(0.95 0.025 275) 0%, oklch(0.97 0.012 258) 40%, oklch(0.98 0.010 50) 100%)",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
          borderBottom: "1px solid var(--f-border)",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "1rem" }}>
            10 Free Tools
          </p>
          <h1
            style={{
              fontSize: "clamp(1.875rem, 4.5vw, 3rem)",
              fontWeight: 800,
              color: "var(--f-text-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            All Calculators
          </h1>
          <p
            style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              color: "var(--f-text-muted)",
              lineHeight: 1.7,
              fontWeight: 400,
              margin: 0,
            }}
          >
            Every angle of FIRE, all free, all instant. Pick the tool that fits your question.
          </p>
        </div>
      </section>

      {/* ── Calculator groups ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)" }}>
        {CALCULATOR_GROUPS.map((group) => (
          <section key={group.group} style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--f-blue)",
                marginBottom: "1rem",
              }}
            >
              {group.group}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
                gap: "1rem",
              }}
            >
              {group.items.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="calc-card"
                    style={{
                      background: "var(--f-card)",
                      border: "1px solid var(--f-border)",
                      borderRadius: "10px",
                      padding: "1.5rem",
                      height: "100%",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--f-text-heading)",
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
                        color: "var(--f-text-muted)",
                        lineHeight: 1.65,
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {calc.description}
                    </p>
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
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  )
}
