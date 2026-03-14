// components/layout/site-header.tsx
import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/#calculators" },
  { label: "FIRE Guide", href: "/#what-is-fire" },
  { label: "Blog", href: "#" },
  { label: "About", href: "/about" },
]

export function SiteHeader({ activePath }: { activePath?: string }) {
  return (
    <header
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--f-border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
          height: "60px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <defs>
                <linearGradient id="hbg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f0c29"/>
                  <stop offset="100%" stopColor="#302b63"/>
                </linearGradient>
                <linearGradient id="hline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24"/>
                  <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
                <linearGradient id="hfill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#hbg)"/>
              <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
              <polygon points="10,46 20,38 30,40 40,28 54,16 54,46" fill="url(#hfill)"/>
              <polyline points="10,46 20,38 30,40 40,28 54,16" stroke="url(#hline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="54" cy="16" r="3" fill="#fbbf24"/>
              <line x1="10" y1="50" x2="54" y2="50" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
            </svg>
          <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--f-text-heading)", letterSpacing: "0.01em" }}>
            Freedom<span style={{ color: "var(--f-blue)" }}>Calc</span>
          </span>
        </Link>

        {/* Nav links — absolutely centered in the header */}
        <nav style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.125rem",
          alignItems: "center",
        }}>
          {navLinks.map((link) => {
            const isActive = activePath === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--f-blue)" : "var(--f-text-muted)",
                  background: isActive ? "var(--f-blue-light)" : "transparent",
                  textDecoration: "none",
                  padding: "0.375rem 0.875rem",
                  borderRadius: "6px",
                  transition: "color 0.15s ease, background 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA — pushed to the right */}
        <div style={{ marginLeft: "auto" }}>
          <Link
            href="/fire-calculator"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--f-blue)",
              background: "var(--f-blue-light)",
              border: "1px solid var(--f-blue-border)",
              padding: "0.4375rem 1rem",
              borderRadius: "7px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Try for free
          </Link>
        </div>
      </div>
    </header>
  )
}
