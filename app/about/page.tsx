// app/about/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "About — FreedomCalc",
  description: "Learn about FreedomCalc — free, open financial independence calculators built for anyone working toward FIRE.",
  alternates: { canonical: `${config.siteUrl}/about` },
}

const CALCULATORS = [
  { name: "FIRE Calculator", href: "/fire-calculator", desc: "Years to retirement based on savings & spending" },
  { name: "FIRE Number", href: "/fire-number-calculator", desc: "The portfolio size you need to retire" },
  { name: "Coast FIRE", href: "/coast-fire-calculator", desc: "When you can stop saving and coast to retirement" },
  { name: "Savings Rate", href: "/savings-rate-calculator", desc: "How your savings rate drives your timeline" },
  { name: "4% Rule", href: "/4-percent-rule-calculator", desc: "Safe withdrawal rate and portfolio longevity" },
  { name: "Compound Interest", href: "/compound-interest-calculator", desc: "Watch money grow with the Rule of 72" },
  { name: "Investment Growth", href: "/investment-growth-calculator", desc: "Project any investment over time" },
  { name: "Retirement Timeline", href: "/retirement-timeline-calculator", desc: "Full scenario modelling with inflation" },
  { name: "Lean FIRE", href: "/lean-fire-calculator", desc: "Minimalist retirement on less" },
  { name: "Barista FIRE", href: "/barista-fire-calculator", desc: "Semi-retire with part-time income" },
]

const PRINCIPLES = [
  {
    icon: "⚡",
    title: "Fast by default",
    body: "Every calculation runs instantly in your browser as you type. No server round-trips, no loading spinners.",
  },
  {
    icon: "🔒",
    title: "Completely private",
    body: "Your financial data never leaves your device. We have zero access to any number you enter.",
  },
  {
    icon: "📐",
    title: "Grounded in research",
    body: "Formulas are based on the Trinity Study, standard compounding models, and widely accepted FIRE methodology.",
  },
  {
    icon: "🆓",
    title: "Free, always",
    body: "Core calculators will always be free. No account required, no paywalls, no dark patterns.",
  },
]

export default function AboutPage() {
  return (
    <div className="legal-root">

      {/* ── Masthead ── */}
      <header className="legal-masthead">
        <div className="legal-masthead-inner">
          <div className="legal-masthead-left">
            <span className="blog-eyebrow">FreedomCalc / About</span>
            <h1 className="legal-masthead-title">
              Built for
              <br />
              <em>independence.</em>
            </h1>
            <p className="legal-masthead-sub">
              Free financial independence calculators for anyone working toward FIRE —
              no accounts, no paywalls, no data stored.
            </p>
          </div>
          <div className="legal-masthead-right">
            <div className="blog-stat-block">
              <div className="blog-stat">
                <span className="blog-stat-num">10</span>
                <span className="blog-stat-label">Calculators</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">Free</span>
                <span className="blog-stat-label">Always</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">0</span>
                <span className="blog-stat-label">Data stored</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mission ── */}
      <section className="about-mission-section">
        <div className="legal-content-inner">
          <div className="about-mission-inner">
            <div className="about-mission-text">
              <span className="blog-section-tag">Our mission</span>
              <h2 className="about-section-heading">
                Good tools shouldn&apos;t cost money.
              </h2>
              <p className="about-body-text">
                Most financial calculators online are buried behind paywalls, cluttered with
                ads, or just plain inaccurate. We wanted something better: fast, transparent
                tools grounded in real financial research — the Trinity Study, safe withdrawal
                rates, compound growth formulas — presented cleanly without the noise.
              </p>
              <p className="about-body-text">
                FreedomCalc started as a personal project and grew into a full suite of ten
                calculators covering every major angle of FIRE planning. Each one comes with
                detailed explanations, worked examples, and methodology so you understand the
                math, not just the output.
              </p>
            </div>
            <div className="about-principles-grid">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="about-principle-card">
                  <span className="about-principle-icon">{p.icon}</span>
                  <h3 className="about-principle-title">{p.title}</h3>
                  <p className="about-principle-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="about-how-section">
        <div className="legal-content-inner">
          <div className="about-how-inner">
            <div className="about-how-card">
              <div className="about-how-card-accent" />
              <div className="about-how-card-body">
                <span className="blog-section-tag" style={{ marginBottom: "1rem", display: "block" }}>How it works</span>
                <h2 className="about-section-heading" style={{ marginBottom: "1rem" }}>
                  Everything runs in your browser.
                </h2>
                <p className="about-body-text">
                  All calculations happen locally on your device using JavaScript. No data you
                  enter is ever sent to a server, stored in a database, or shared with any
                  third party. The moment you close the tab, your numbers are gone.
                </p>
                <p className="about-body-text" style={{ marginBottom: 0 }}>
                  We use Google Analytics 4 to understand which tools are most useful — page
                  views and session data, nothing more. Your financial inputs are never part
                  of that data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculators ── */}
      <section className="about-tools-section">
        <div className="legal-content-inner">
          <div className="about-tools-header">
            <span className="blog-section-tag">The tools</span>
            <span className="blog-articles-count">10 calculators</span>
          </div>
          <div className="about-tools-grid">
            {CALCULATORS.map((calc) => (
              <Link key={calc.href} href={calc.href} className="about-tool-card">
                <div className="about-tool-card-accent" />
                <div className="about-tool-card-body">
                  <p className="about-tool-name">{calc.name}</p>
                  <p className="about-tool-desc">{calc.desc}</p>
                </div>
                <svg className="about-tool-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="about-contact-section">
        <div className="legal-content-inner">
          <div className="about-contact-inner">
            <div>
              <span className="blog-section-tag" style={{ marginBottom: "0.75rem", display: "block" }}>Get in touch</span>
              <h2 className="about-section-heading" style={{ marginBottom: "0.625rem" }}>
                We read every message.
              </h2>
              <p className="about-body-text" style={{ marginBottom: 0 }}>
                Found an error? Have a calculator suggestion? Just want to say hello?
                Reach us at{" "}
                <a href="mailto:contact@freedomcalc.dev" className="about-email-link">
                  contact@freedomcalc.dev
                </a>
              </p>
            </div>
            <div className="about-disclaimer">
              <p className="about-disclaimer-text">
                <strong>Disclaimer:</strong> FreedomCalc is for educational and informational
                purposes only. Nothing on this site constitutes financial, investment, or tax
                advice. Always consult a qualified financial professional before making financial
                decisions.{" "}
                <Link href="/terms" className="about-legal-link">Terms of Use</Link>
                {" · "}
                <Link href="/privacy" className="about-legal-link">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <div className="blog-cta-strip">
        <div className="blog-cta-inner">
          <div className="blog-cta-text">
            <p className="blog-cta-headline">Start with your FIRE number.</p>
            <p className="blog-cta-body">
              Find out how much you need to retire — free, instant, no sign-up.
            </p>
          </div>
          <div className="blog-cta-actions">
            <Link href="/fire-calculator" className="blog-cta-btn blog-cta-btn--primary">
              FIRE Calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/blog" className="blog-cta-btn blog-cta-btn--ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
