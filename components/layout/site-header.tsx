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
          <div
            style={{
              width: "34px",
              height: "34px",
              background: "var(--f-blue)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 5h8M3 9h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M11 8v6M11 14l-2-2M11 14l2-2" stroke="#86efac" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--f-text-heading)", letterSpacing: "0.01em" }}>
            Fin<span style={{ color: "var(--f-blue)" }}>Calc</span>
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
