// components/layout/site-footer.tsx
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--f-border)",
        background: "var(--f-card)",
        padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top row: logo + columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(3, 1fr)",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "0.75rem" }}>
              <div style={{ width: "30px", height: "30px", background: "var(--f-blue)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M3 5h8M3 9h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 8v6M11 14l-2-2M11 14l2-2" stroke="#86efac" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--f-text-heading)" }}>
                Fin<span style={{ color: "var(--f-blue)" }}>Calc</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", lineHeight: 1.7, margin: 0, maxWidth: "220px" }}>
              Free calculators for the FIRE movement. No signup, no tracking.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--f-text-muted)", marginBottom: "0.875rem" }}>
              Calculators
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "FIRE Calculator", href: "/fire-calculator" },
                { label: "FIRE Number", href: "/fire-number-calculator" },
                { label: "Coast FIRE", href: "/coast-fire-calculator" },
                { label: "Savings Rate", href: "/savings-rate-calculator" },
                { label: "4% Rule", href: "/4-percent-rule-calculator" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* More Tools */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--f-text-muted)", marginBottom: "0.875rem" }}>
              More Tools
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Compound Interest", href: "/compound-interest-calculator" },
                { label: "Investment Growth", href: "/investment-growth-calculator" },
                { label: "Retirement Timeline", href: "/retirement-timeline-calculator" },
                { label: "Lean FIRE", href: "/lean-fire-calculator" },
                { label: "Barista FIRE", href: "/barista-fire-calculator" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--f-text-muted)", marginBottom: "0.875rem" }}>
              Company
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "#" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--f-border)",
            paddingTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--f-text-faint)" }}>
            © {new Date().getFullYear()} FinCalc. For educational purposes only — not financial advice.
          </span>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
