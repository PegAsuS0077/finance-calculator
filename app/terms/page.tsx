// app/terms/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "Terms of Use — FreedomCalc",
  description: "Terms of use for FreedomCalc. Free financial independence calculators for educational purposes only.",
  alternates: { canonical: `${config.siteUrl}/terms` },
}

const SECTIONS = [
  {
    id: "eligibility",
    title: "Eligibility and age requirement",
    body: "You must be at least 13 years of age to use FreedomCalc. By using this site you represent that you meet this requirement. If you are under 18, you should review these terms with a parent or guardian before using the site.",
  },
  {
    id: "educational",
    title: "Educational use only",
    body: "FreedomCalc provides financial calculators for educational and informational purposes only. Nothing on this site constitutes financial, investment, tax, or legal advice. All projections and calculations are estimates based on hypothetical scenarios and mathematical models. They do not guarantee future results.",
  },
  {
    id: "no-relationship",
    title: "No professional relationship",
    body: "Use of FreedomCalc does not create any professional relationship between you and FreedomCalc or its operators. We are not your financial advisor, accountant, or attorney. Always consult qualified professionals before making financial decisions.",
  },
  {
    id: "accuracy",
    title: "Accuracy of calculations",
    body: "We make every effort to ensure our calculations are accurate and based on sound financial methodology. However, we make no warranties — express or implied — about the accuracy, completeness, or suitability of the information provided. Use of the calculators is at your own risk.",
  },
  {
    id: "advertising",
    title: "Third-party advertising",
    body: "This site displays advertisements served by Google AdSense and its partners. FreedomCalc does not control the content, accuracy, or availability of third-party advertisements. We are not responsible for any products, services, or claims made in advertisements shown on this site. Clicking on any advertisement is at your own discretion and risk. Advertised products and services are not endorsed by FreedomCalc.",
  },
  {
    id: "no-affiliation",
    title: "No affiliation with financial institutions",
    body: "FreedomCalc is an independent website and is not affiliated with, endorsed by, or sponsored by any financial institution, brokerage, investment company, or financial services firm, including but not limited to Vanguard, Fidelity, Schwab, or any other company. References to financial products, strategies, or studies are for educational context only.",
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: "All content on this site — including text, design, code, and branding — is owned by FreedomCalc. You may not reproduce, distribute, or create derivative works without express written permission.",
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: "You agree not to misuse the site — including attempting to scrape content in bulk, reverse engineer the calculators for commercial resale, or interfere with the site's operation in any way.",
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, FreedomCalc and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or reliance on any calculations or information provided.",
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: "We may update these terms at any time. Changes are effective when posted. Continued use of the site after changes constitutes acceptance of the updated terms.",
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: "These terms are governed by the laws of Germany. Any disputes arising from use of this site shall be subject to the jurisdiction of the competent courts of Germany, unless local mandatory consumer protection laws require otherwise.",
  },
]

export default function TermsPage() {
  return (
    <div className="legal-root">

      {/* ── Masthead ── */}
      <header className="legal-masthead">
        <div className="legal-masthead-inner">
          <div className="legal-masthead-left">
            <span className="blog-eyebrow">FreedomCalc / Legal</span>
            <h1 className="legal-masthead-title">
              Terms of
              <br />
              <em>Use</em>
            </h1>
            <p className="legal-masthead-sub">
              FreedomCalc is a free, independent tool for educational purposes. These terms
              cover how you may use the site and the limits of our liability.
            </p>
          </div>
          <div className="legal-masthead-right">
            <div className="blog-stat-block">
              <div className="blog-stat">
                <span className="blog-stat-num">Free</span>
                <span className="blog-stat-label">Always</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">Edu</span>
                <span className="blog-stat-label">Purposes only</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">{SECTIONS.length}</span>
                <span className="blog-stat-label">Clauses</span>
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
            <div className="legal-lead-icon">📋</div>
            <div>
              <p className="legal-lead-headline">For education, not financial advice.</p>
              <p className="legal-lead-body">
                Our calculators are mathematical models based on assumptions you provide.
                They are a starting point for your own research — not a substitute for a
                qualified financial advisor. Third-party ads are served by Google AdSense;
                we do not control or endorse advertised products.
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
            <p className="blog-cta-headline">Start planning your financial independence.</p>
            <p className="blog-cta-body">
              Free calculators. No account required. No data stored.
            </p>
          </div>
          <div className="blog-cta-actions">
            <Link href="/fire-calculator" className="blog-cta-btn blog-cta-btn--primary">
              FIRE Calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M7.5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/privacy" className="blog-cta-btn blog-cta-btn--ghost">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
