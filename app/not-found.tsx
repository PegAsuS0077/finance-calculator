import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found — FreedomCalc",
}

export default function NotFound() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <main style={{ maxWidth: "480px", textAlign: "center", padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2rem)" }}>
        <p style={{ fontSize: "5rem", fontWeight: 800, color: "var(--f-blue)", lineHeight: 1, marginBottom: "1rem" }}>404</p>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Page not found
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" style={{ display: "inline-block", background: "var(--f-blue)", color: "white", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.9375rem" }}>
          Back to home
        </Link>
      </main>
    </div>
  )
}
