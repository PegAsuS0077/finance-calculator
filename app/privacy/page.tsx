// app/privacy/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "Privacy Policy — FreedomCalc",
  description: "FreedomCalc privacy policy. We don't collect, store, or sell your personal data.",
  alternates: { canonical: `${config.siteUrl}/privacy` },
}

const SECTIONS = [
  {
    id: "no-data",
    title: "Data we do not collect",
    icon: "◎",
    body: "All calculator inputs — your age, income, expenses, portfolio value, and all other financial figures — are processed entirely in your browser. This data is never sent to our servers, never stored, and never shared with any third party. We have no access to the numbers you enter.",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: "◉",
    body: "We use Google Analytics 4 to understand how people use the site — which pages are visited, how long users stay, and which calculators are most popular. This data is aggregated and anonymised. It does not include any financial data you enter into the calculators. You can opt out using browser extensions like uBlock Origin or the Google Analytics Opt-out Add-on.",
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: "◈",
    body: "FreedomCalc uses minimal cookies. Google Analytics sets cookies to distinguish unique visitors. We do not use advertising cookies, tracking pixels, or any third-party marketing cookies.",
  },
  {
    id: "third-parties",
    title: "Third-party services",
    icon: "◇",
    body: "The site is hosted on Cloudflare Pages. Cloudflare may log basic request data (IP address, browser type) for security and performance purposes, subject to Cloudflare's own privacy policy. We do not use any other third-party services that have access to your data.",
  },
  {
    id: "children",
    title: "Children's privacy",
    icon: "◐",
    body: "FreedomCalc is not directed at children under 13. We do not knowingly collect any personal information from children.",
  },
  {
    id: "changes",
    title: "Changes to this policy",
    icon: "◎",
    body: 'We may update this policy from time to time. Changes will be reflected in the "Last updated" date above. Continued use of the site after changes constitutes acceptance of the updated policy.',
  },
  {
    id: "contact",
    title: "Contact",
    icon: "◉",
    body: "Questions about this policy? Email us at contact@freedomcalc.dev — we read every message.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="legal-root">

      {/* ── Masthead ── */}
      <header className="legal-masthead">
        <div className="legal-masthead-inner">
          <div className="legal-masthead-left">
            <span className="blog-eyebrow">FreedomCalc / Legal</span>
            <h1 className="legal-masthead-title">
              Privacy
              <br />
              <em>Policy</em>
            </h1>
            <p className="legal-masthead-sub">
              We built FreedomCalc on a simple principle: your financial data belongs to you.
              Everything stays in your browser — always.
            </p>
          </div>
          <div className="legal-masthead-right">
            <div className="blog-stat-block">
              <div className="blog-stat">
                <span className="blog-stat-num">0</span>
                <span className="blog-stat-label">Data stored</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">0</span>
                <span className="blog-stat-label">3rd-party ads</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">GA4</span>
                <span className="blog-stat-label">Analytics only</span>
              </div>
            </div>
            <p className="legal-updated">Last updated: March 2026</p>
          </div>
        </div>
      </header>

      {/* ── Lead ── */}
      <section className="legal-lead-section">
        <div className="legal-content-inner">
          <div className="legal-lead-card">
            <div className="legal-lead-icon">🔒</div>
            <div>
              <p className="legal-lead-headline">Your numbers never leave your device.</p>
              <p className="legal-lead-body">
                Every calculation runs locally in your browser. We never see the financial
                figures you enter — not your income, not your portfolio, not anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="legal-sections-area">
        <div className="legal-content-inner">
          <div className="legal-two-col">

            {/* TOC */}
            <aside className="legal-toc">
              <p className="legal-toc-label">On this page</p>
              <nav>
                {SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="legal-toc-link">
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="legal-sections-list">
              {SECTIONS.map((s, i) => (
                <div key={s.id} id={s.id} className="legal-section-card">
                  <div className="legal-section-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="legal-section-body">
                    <h2 className="legal-section-title">{s.title}</h2>
                    <p className="legal-section-text">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <div className="blog-cta-strip">
        <div className="blog-cta-inner">
          <div className="blog-cta-text">
            <p className="blog-cta-headline">Ready to run the numbers?</p>
            <p className="blog-cta-body">
              All calculations stay private — processed entirely in your browser.
            </p>
          </div>
          <div className="blog-cta-actions">
            <Link href="/fire-calculator" className="blog-cta-btn blog-cta-btn--primary">
              FIRE Calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/terms" className="blog-cta-btn blog-cta-btn--ghost">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
