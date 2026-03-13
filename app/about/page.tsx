// app/about/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — FreedomCalc",
  description: "Learn about FreedomCalc — free, open financial independence calculators built for anyone working toward FIRE.",
}

export default function AboutPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2rem)" }}>

        <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
          About
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--f-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          Built for people serious about financial independence.
        </h1>

        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          FreedomCalc is a free suite of financial independence calculators built for the FIRE community —
          anyone working toward Financial Independence, Retire Early. Every tool is free, runs entirely
          in your browser, and requires no account or sign-up.
        </p>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", margin: "2.5rem 0 0.75rem" }}>
          Why we built this
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          Most financial calculators online are buried behind paywalls, cluttered with ads, or just
          plain inaccurate. We wanted something better: fast, transparent tools grounded in real
          financial research — the Trinity Study, safe withdrawal rates, compound growth formulas —
          presented cleanly without the noise.
        </p>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", margin: "2.5rem 0 0.75rem" }}>
          How it works
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          All calculations happen locally in your browser. No data you enter is ever sent to a server,
          stored, or shared. Your numbers stay yours. The formulas are based on widely accepted
          financial research and are documented on each calculator page.
        </p>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", margin: "2.5rem 0 0.75rem" }}>
          What we offer
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          We&apos;re building ten calculators covering every major angle of FIRE planning — from your core
          FIRE number and retirement timeline to Coast FIRE, savings rate, the 4% rule, compound
          interest, and more. Each calculator comes with detailed explanations, worked examples,
          and methodology so you understand the math, not just the output.
        </p>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", margin: "2.5rem 0 0.75rem" }}>
          Our commitment
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          FreedomCalc will always be free to use. We may introduce optional premium features in the
          future, but the core calculators will remain free, open, and accessible to everyone.
        </p>

        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", margin: "2.5rem 0 0.75rem" }}>
          Contact
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          Have a question, found an error, or want to suggest a calculator? Reach us at{" "}
          <a href="mailto:hello@freedomcalc.dev" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>
            hello@freedomcalc.dev
          </a>
          . We read every message.
        </p>

        <div style={{ marginTop: "3rem", padding: "1.25rem 1.5rem", background: "var(--f-card)", border: "1px solid var(--f-border)", borderRadius: "10px" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
            <strong style={{ fontWeight: 600, color: "var(--f-text-muted)" }}>Disclaimer: </strong>
            FreedomCalc is for educational and informational purposes only. Nothing on this site
            constitutes financial, investment, or tax advice. Always consult a qualified financial
            professional before making financial decisions.
          </p>
        </div>

      </main>
    </div>
  )
}
