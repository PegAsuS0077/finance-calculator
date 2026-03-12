// components/layout/site-header.tsx
import Link from "next/link"

const navLinks = [
  { label: "Calculators", href: "/#calculators" },
]

export function SiteHeader({ activePath }: { activePath?: string }) {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--fire-charcoal-border)",
        background: "var(--fire-charcoal)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "58px",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 700,
            fontSize: "1.125rem",
            letterSpacing: "-0.01em",
            color: "oklch(0.97 0.005 260)",
            textDecoration: "none",
          }}
        >
          FIRE<span style={{ color: "var(--fire-amber)" }}>Tools</span>
        </Link>

        <nav style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color:
                  activePath === link.href
                    ? "var(--fire-amber)"
                    : "var(--fire-text-muted)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
