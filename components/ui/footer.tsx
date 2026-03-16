import Link from "next/link"
import { Mail } from "lucide-react"

const CALCULATORS = [
  { label: "FIRE Calculator", href: "/fire-calculator" },
  { label: "FIRE Number Calculator", href: "/fire-number-calculator" },
  { label: "Coast FIRE Calculator", href: "/coast-fire-calculator" },
  { label: "Savings Rate Calculator", href: "/savings-rate-calculator" },
  { label: "4% Rule Calculator", href: "/4-percent-rule-calculator" },
  { label: "Compound Interest Calculator", href: "/compound-interest-calculator" },
  { label: "Investment Growth Calculator", href: "/investment-growth-calculator" },
  { label: "Retirement Timeline Calculator", href: "/retirement-timeline-calculator" },
  { label: "Lean FIRE Calculator", href: "/lean-fire-calculator" },
  { label: "Barista FIRE Calculator", href: "/barista-fire-calculator" },
]

const BLOG_POSTS = [
  { label: "What is FIRE?", href: "/blog/what-is-fire" },
  { label: "How to calculate your FIRE number", href: "/blog/how-to-calculate-fire-number" },
  { label: "The 4% Rule explained", href: "/blog/4-percent-rule-explained" },
  { label: "Savings rate & retirement", href: "/blog/savings-rate-and-retirement" },
  { label: "Coast FIRE explained", href: "/blog/coast-fire-explained" },
  { label: "Lean FIRE vs Fat FIRE", href: "/blog/lean-fire-vs-fat-fire" },
  { label: "Index fund investing for FIRE", href: "/blog/index-fund-investing-for-fire" },
  { label: "Investment growth & compound returns", href: "/blog/investment-growth-and-compound-returns" },
]

export default function Footer() {
  return (
    <footer className="footer-root">
      {/* Background grid pattern */}
      <div className="footer-bg" aria-hidden />

      <div className="footer-inner">

        {/* ── Top: brand + columns ── */}
        <div className="footer-top">

          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                <defs>
                  <linearGradient id="ftbg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f0c29"/>
                    <stop offset="100%" stopColor="#302b63"/>
                  </linearGradient>
                  <linearGradient id="ftline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                  <linearGradient id="ftfill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#ftbg)"/>
                <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
                <polygon points="10,46 20,38 30,40 40,28 54,16 54,46" fill="url(#ftfill)"/>
                <polyline points="10,46 20,38 30,40 40,28 54,16" stroke="url(#ftline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="54" cy="16" r="3" fill="#fbbf24"/>
                <line x1="10" y1="50" x2="54" y2="50" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
              </svg>
              <span className="footer-logo-text">
                Freedom<span style={{ color: "var(--f-blue)" }}>Calc</span>
              </span>
            </Link>
            <p className="footer-brand-desc">
              Free financial independence calculators for the FIRE movement.
              No signup. No data stored. Always free.
            </p>
            <div className="footer-brand-meta">
              <span className="footer-meta-item">🇩🇪 Germany</span>
              <a href="mailto:contact@freedomcalc.dev" className="footer-meta-item footer-meta-link">
                <Mail size={13} />
                contact@freedomcalc.dev
              </a>
            </div>
          </div>

          {/* Calculators column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Calculators</h4>
            <ul className="footer-link-list">
              {CALCULATORS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">
              <Link href="/blog" className="footer-col-heading-link">Learn</Link>
            </h4>
            <ul className="footer-link-list">
              {BLOG_POSTS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Company</h4>
            <ul className="footer-link-list">
              {[
                { label: "About", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">{item.label}</Link>
                </li>
              ))}
            </ul>

            <div className="footer-adsense-notice">
              <p className="footer-adsense-text">
                This site uses Google AdSense to display ads. Google may use cookies to serve
                personalised ads.{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-adsense-link"
                >
                  Manage ad preferences ↗
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} FreedomCalc. Independent &amp; unaffiliated. For educational purposes only — not financial advice.
          </p>
          <div className="footer-bottom-links">
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-bottom-link"
            >
              Google Privacy Policy ↗
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
