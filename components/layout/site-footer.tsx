// components/layout/site-footer.tsx
import Link from "next/link"

const calculatorLinks = [
  { label: "FIRE Calculator", href: "/fire-calculator" },
  { label: "FIRE Number Calculator", href: "/fire-number-calculator" },
  { label: "Coast FIRE Calculator", href: "/coast-fire-calculator" },
  { label: "Savings Rate Calculator", href: "/savings-rate-calculator" },
  { label: "4% Rule Calculator", href: "/4-percent-rule-calculator" },
  { label: "Compound Interest Calculator", href: "/compound-interest-calculator" },
]

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--fire-charcoal-border)",
        background: "var(--fire-charcoal-mid)",
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem) 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--fire-charcoal-border)",
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "oklch(0.92 0.005 260)",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "0.875rem",
              }}
            >
              FIRE<span style={{ color: "var(--fire-amber)" }}>Tools</span>
            </Link>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--fire-text-muted)",
                lineHeight: 1.7,
                maxWidth: "300px",
                fontWeight: 300,
              }}
            >
              Free financial independence calculators for the FIRE movement. No
              signup, no tracking, no cost.
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fire-text-dim)",
                marginBottom: "1rem",
              }}
            >
              Calculators
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--fire-text-muted)",
                      textDecoration: "none",
                      fontWeight: 300,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer + copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--fire-text-dim)",
              lineHeight: 1.65,
              maxWidth: "560px",
              fontWeight: 300,
            }}
          >
            For informational and educational purposes only. Not financial advice.
            All projections are estimates based on historical assumptions and may
            not reflect future results. Consult a qualified financial professional
            before making investment decisions.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--fire-text-dim)", whiteSpace: "nowrap" }}>
            © {new Date().getFullYear()} FIRE Tools
          </p>
        </div>
      </div>
    </footer>
  )
}
