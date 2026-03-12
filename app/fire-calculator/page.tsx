// app/fire-calculator/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { FireCalculator } from "@/components/calculators/fire-calculator"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

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

// ─── Sub-components (server, no 'use client') ────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--fire-amber)",
        marginBottom: "0.625rem",
      }}
    >
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
        fontWeight: 700,
        color: "oklch(0.95 0.005 260)",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
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
        border: "1px solid var(--fire-charcoal-border)",
        borderLeft: "3px solid var(--fire-amber)",
        background: "var(--fire-charcoal-mid)",
        borderRadius: "4px",
        padding: "1.25rem 1.5rem",
        margin: "1.25rem 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "1rem",
          color: "oklch(0.92 0.005 260)",
          fontStyle: "italic",
          marginBottom: "0.5rem",
        }}
      >
        {formula}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--fire-text-muted)",
          fontWeight: 300,
        }}
      >
        {example}
      </p>
    </div>
  )
}

function ExampleCard({
  name,
  age,
  expenses,
  portfolio,
  fireAge,
  yearsToFire,
}: {
  name: string
  age: number
  expenses: string
  portfolio: string
  fireAge: number
  yearsToFire: number
}) {
  return (
    <div
      style={{
        background: "var(--fire-charcoal-mid)",
        border: "1px solid var(--fire-charcoal-border)",
        borderRadius: "6px",
        padding: "1.5rem",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "oklch(0.92 0.005 260)",
          marginBottom: "1rem",
          lineHeight: 1.3,
        }}
      >
        {name}
      </p>
      <dl style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {[
          { label: "Age", value: String(age) },
          { label: "Annual Expenses", value: expenses },
          { label: "Current Portfolio", value: portfolio },
          { label: "FIRE Age", value: String(fireAge) },
          { label: "Years to FIRE", value: `${yearsToFire} years` },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid var(--fire-charcoal-border)",
              padding: "0.5rem 0",
            }}
          >
            <dt
              style={{
                fontSize: "0.8125rem",
                color: "var(--fire-text-muted)",
                fontWeight: 300,
              }}
            >
              {row.label}
            </dt>
            <dd
              style={{
                fontSize: "0.875rem",
                color:
                  row.label === "FIRE Age" || row.label === "Years to FIRE"
                    ? "var(--fire-amber)"
                    : "oklch(0.85 0.005 260)",
                fontWeight: row.label === "FIRE Age" ? 600 : 400,
                fontFamily:
                  row.label === "FIRE Age"
                    ? "var(--font-playfair), Georgia, serif"
                    : undefined,
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
    <div
      style={{
        borderBottom: "1px solid var(--fire-charcoal-border)",
        padding: "1.5rem 0",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: "oklch(0.92 0.005 260)",
          marginBottom: "0.625rem",
          letterSpacing: "-0.01em",
        }}
      >
        {q}
      </h3>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--fire-text-muted)",
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {a}
      </p>
    </div>
  )
}

function RelatedCalcCard({
  name,
  href,
  description,
  live,
}: {
  name: string
  href: string
  description: string
  live: boolean
}) {
  const inner = (
    <div
      style={{
        background: "var(--fire-charcoal-mid)",
        border: "1px solid var(--fire-charcoal-border)",
        borderRadius: "6px",
        padding: "1.25rem 1.5rem",
        opacity: live ? 1 : 0.55,
        height: "100%",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: live ? "oklch(0.92 0.005 260)" : "var(--fire-text-muted)",
          marginBottom: "0.5rem",
        }}
      >
        {name}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--fire-text-dim)",
          lineHeight: 1.65,
          fontWeight: 300,
        }}
      >
        {description}
      </p>
      {live && (
        <p
          style={{
            marginTop: "0.875rem",
            fontSize: "0.8rem",
            color: "var(--fire-amber)",
            fontWeight: 500,
          }}
        >
          Open calculator →
        </p>
      )}
    </div>
  )

  if (live) {
    return (
      <Link href={href} style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </Link>
    )
  }
  return <div>{inner}</div>
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FireCalculatorPage() {
  return (
    <div
      style={{
        background: "var(--fire-charcoal)",
        color: "oklch(0.93 0.005 260)",
        minHeight: "100vh",
        fontFamily: "var(--font-dm-sans), ui-sans-serif, sans-serif",
      }}
    >
      <SiteHeader />

      {/* ── Hero ── */}
      <section
        style={{
          borderBottom: "1px solid var(--fire-charcoal-border)",
          padding:
            "clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem) clamp(2rem, 4vw, 3.5rem)",
          background: "var(--fire-charcoal-mid)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-80px",
            right: "5%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, oklch(0.78 0.16 68 / 0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <nav
            style={{
              fontSize: "0.75rem",
              color: "var(--fire-text-dim)",
              marginBottom: "1.25rem",
              display: "flex",
              gap: "0.375rem",
              alignItems: "center",
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: "var(--fire-text-dim)", textDecoration: "none" }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: "var(--fire-amber)" }}>FIRE Calculator</span>
          </nav>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "oklch(0.97 0.005 260)",
              marginBottom: "1rem",
              maxWidth: "700px",
            }}
          >
            FIRE Calculator
          </h1>
          <p
            style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
              color: "var(--fire-text-muted)",
              lineHeight: 1.7,
              maxWidth: "540px",
              fontWeight: 300,
            }}
          >
            Estimate your financial independence timeline. Enter your numbers to
            instantly see your FIRE number, years to retirement, and a year-by-year
            portfolio projection.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {["Free to use", "No signup required", "Results update instantly"].map(
              (badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--fire-text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}
                >
                  <span style={{ color: "var(--fire-amber)", fontSize: "0.625rem" }}>
                    ◆
                  </span>
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section
        id="calculator"
        aria-label="FIRE Calculator"
        style={{
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <FireCalculator />
      </section>

      <div style={{ borderTop: "1px solid var(--fire-charcoal-border)" }} />

      {/* ── Results Explained ── */}
      <section
        style={{
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <SectionLabel>Understanding Your Results</SectionLabel>
        <SectionHeading>What do these numbers mean?</SectionHeading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "1px",
            background: "var(--fire-charcoal-border)",
            border: "1px solid var(--fire-charcoal-border)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {[
            {
              label: "FIRE Number",
              icon: "◈",
              body: "The total investment portfolio you need to retire. Calculated as annual expenses ÷ withdrawal rate. At 4%, your FIRE number is 25× your annual spending.",
            },
            {
              label: "Years to FIRE",
              icon: "◉",
              body: "How long until your portfolio hits your FIRE number, given your current balance, annual contributions, and real (inflation-adjusted) return rate.",
            },
            {
              label: "FIRE Age",
              icon: "◫",
              body: "Your projected retirement age — your current age plus years to FIRE. This is the earliest you could retire under your current assumptions.",
            },
            {
              label: "Remaining Gap",
              icon: "◧",
              body: "The difference between your FIRE number and your current portfolio. How much additional wealth you still need to accumulate.",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{ background: "var(--fire-charcoal)", padding: "1.75rem" }}
            >
              <div
                style={{ fontSize: "1rem", color: "var(--fire-amber)", marginBottom: "0.75rem" }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "oklch(0.92 0.005 260)",
                  marginBottom: "0.5rem",
                }}
              >
                {item.label}
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--fire-text-muted)",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        style={{
          borderTop: "1px solid var(--fire-charcoal-border)",
          background: "var(--fire-charcoal-mid)",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel>Methodology</SectionLabel>
          <SectionHeading>How the FIRE Calculator works</SectionHeading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 4vw, 4rem)",
              alignItems: "start",
            }}
          >
            <div
              style={{
                fontSize: "0.9375rem",
                color: "var(--fire-text-muted)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              <p>
                The calculator uses two core formulas. First, it calculates your{" "}
                <strong style={{ color: "oklch(0.82 0.005 260)", fontWeight: 500 }}>
                  FIRE number
                </strong>{" "}
                — your annual expenses divided by your withdrawal rate. The 4% withdrawal
                rate is derived from the Trinity Study (Bengen, 1994), which found that a
                diversified portfolio historically sustained a 4% annual withdrawal for at
                least 30 years.
              </p>
              <FormulaBlock
                formula="FIRE Number = Annual Expenses ÷ Withdrawal Rate"
                example="Example: $40,000 ÷ 0.04 = $1,000,000"
              />
              <p style={{ marginTop: "1rem" }}>
                Second, it projects your{" "}
                <strong style={{ color: "oklch(0.82 0.005 260)", fontWeight: 500 }}>
                  portfolio growth
                </strong>{" "}
                using the future value of an annuity formula — accounting for your starting
                balance, annual contributions, and inflation-adjusted return rate.
              </p>
              <FormulaBlock
                formula="Portfolio = P(1+r)ⁿ + C × [(1+r)ⁿ − 1] / r"
                example="P = starting portfolio · r = real return rate · n = years · C = annual contributions"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  title: "Real vs. nominal returns",
                  body: "The calculator uses a real return rate (nominal return minus inflation) so all values are expressed in today's purchasing power. A 7% return with 3% inflation equals a 4% real return.",
                },
                {
                  title: "Inflation-adjusted FIRE number",
                  body: "Your FIRE number is constant in today's dollars. The projection accounts for inflation throughout, so the chart shows real purchasing-power-equivalent values at every point.",
                },
                {
                  title: "Contributions assumption",
                  body: "Annual contributions are assumed constant each year. If your income or savings rate changes, re-run the calculator with updated numbers to reflect your current situation.",
                },
                {
                  title: "No sequence-of-returns modeling",
                  body: "This calculator uses a constant return rate. Real portfolios experience year-to-year variance. For a conservative estimate, reduce your expected return by 1–2 percentage points.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "var(--fire-charcoal)",
                    border: "1px solid var(--fire-charcoal-border)",
                    borderRadius: "4px",
                    padding: "1.125rem 1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "oklch(0.88 0.005 260)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--fire-text-muted)",
                      lineHeight: 1.65,
                      fontWeight: 300,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Example Scenarios ── */}
      <section
        style={{
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <SectionLabel>Example Scenarios</SectionLabel>
        <SectionHeading>Three paths to financial independence</SectionHeading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: "1.25rem",
            marginBottom: "1.75rem",
          }}
        >
          <ExampleCard
            name="The Standard Path — Sarah, 32"
            age={32}
            expenses="$50,000 / yr"
            portfolio="$75,000"
            fireAge={54}
            yearsToFire={22}
          />
          <ExampleCard
            name="The Aggressive Saver — Marcus, 28"
            age={28}
            expenses="$35,000 / yr"
            portfolio="$20,000"
            fireAge={41}
            yearsToFire={13}
          />
          <ExampleCard
            name="The Late Starter — Jennifer, 45"
            age={45}
            expenses="$55,000 / yr"
            portfolio="$150,000"
            fireAge={65}
            yearsToFire={20}
          />
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--fire-text-muted)",
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: "680px",
          }}
        >
          Sarah reaches FIRE at 54 on a moderate savings rate. Marcus achieves extreme early
          retirement at 41 by keeping expenses at $35k on a $110k income — a 50%+ savings
          rate. Jennifer reaches traditional retirement age at 65, but increasing contributions
          to $40k/year would bring her FIRE age below 60.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          borderTop: "1px solid var(--fire-charcoal-border)",
          background: "var(--fire-charcoal-mid)",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>Frequently asked questions</SectionHeading>
          <div
            style={{
              maxWidth: "780px",
              borderTop: "1px solid var(--fire-charcoal-border)",
            }}
          >
            <FAQItem
              q="What is a FIRE number?"
              a="Your FIRE number is the total investment portfolio needed to retire and live off investment returns indefinitely. It equals your annual expenses divided by your safe withdrawal rate. At the 4% rule, your FIRE number is 25 times your annual spending — $40,000/year requires $1,000,000."
            />
            <FAQItem
              q="What withdrawal rate should I use?"
              a="The 4% rate is the most widely-used starting point, supported by historical research (Bengen, 1994; Trinity Study). For retirements lasting 40–50 years — common for early retirees — consider 3–3.5% for a more conservative estimate that reduces sequence-of-returns risk."
            />
            <FAQItem
              q="What return rate should I assume?"
              a="A 7% nominal return (pre-inflation) is commonly used based on long-run US stock market averages. Combined with a 3% inflation rate, this gives a 4% real return. For a conservative projection, use 5–6% nominal. The calculator lets you customize both."
            />
            <FAQItem
              q="Does this calculator account for inflation?"
              a="Yes. The calculator computes a real return rate by subtracting your inflation input from your nominal return. All results — your FIRE number, portfolio projections, and years to FIRE — are expressed in today's purchasing power."
            />
            <FAQItem
              q="Is the 4% rule still valid?"
              a="Research continues to support the 4% rule as a reasonable starting point for 30-year retirements. However, current valuations lead some researchers to suggest 3–3.5% may be safer for longer retirements. Use the withdrawal rate slider to model different scenarios."
            />
            <FAQItem
              q="Should I include home equity in my FIRE number?"
              a="Generally no — unless you plan to downsize or sell your home in retirement. The FIRE number refers to liquid investment assets that generate returns. A paid-off home reduces your expenses but doesn't generate income the same way a portfolio does."
            />
            <FAQItem
              q="How does savings rate affect my FIRE timeline?"
              a="Savings rate is the single most powerful variable. Moving from a 20% savings rate to a 50% savings rate can cut your years to FIRE nearly in half — both by building wealth faster and by reducing the FIRE number target (since lower expenses mean a smaller portfolio is needed)."
            />
            <FAQItem
              q="What about taxes on withdrawals?"
              a="This calculator does not model taxes on withdrawals. Tax-advantaged accounts (401(k), IRA, Roth) have different treatment. Consult a financial advisor or a more detailed tax-aware calculator to model your specific tax situation in retirement."
            />
          </div>
        </div>
      </section>

      {/* ── Related Calculators ── */}
      <section
        style={{
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <SectionLabel>Related Tools</SectionLabel>
        <SectionHeading>More FIRE calculators</SectionHeading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
            gap: "1rem",
          }}
        >
          <RelatedCalcCard
            name="FIRE Number Calculator"
            href="/fire-number-calculator"
            description="Focus specifically on calculating your target FIRE portfolio based on your spending."
            live={false}
          />
          <RelatedCalcCard
            name="Coast FIRE Calculator"
            href="/coast-fire-calculator"
            description="Find out if you can stop contributing and let compound interest carry you to retirement."
            live={false}
          />
          <RelatedCalcCard
            name="Savings Rate Calculator"
            href="/savings-rate-calculator"
            description="See how your savings rate maps directly to your years until financial independence."
            live={false}
          />
          <RelatedCalcCard
            name="4% Rule Calculator"
            href="/4-percent-rule-calculator"
            description="Calculate safe annual withdrawal amounts from any portfolio size."
            live={false}
          />
          <RelatedCalcCard
            name="Compound Interest Calculator"
            href="/compound-interest-calculator"
            description="Visualize how your investments grow over time with regular contributions."
            live={false}
          />
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div
        style={{
          borderTop: "1px solid var(--fire-charcoal-border)",
          padding: "1.5rem clamp(1.25rem, 4vw, 3rem)",
          background: "var(--fire-charcoal-mid)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--fire-text-dim)",
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            <strong style={{ fontWeight: 500, color: "var(--fire-text-muted)" }}>
              Disclaimer:{" "}
            </strong>
            This FIRE calculator is provided for educational and informational purposes only.
            It does not constitute financial, investment, or tax advice. All projections are
            estimates based on hypothetical scenarios and historical market patterns — actual
            investment returns vary and past performance does not guarantee future results.
            Please consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
