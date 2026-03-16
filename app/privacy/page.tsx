// app/privacy/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "Privacy Policy — FreedomCalc",
  description: "FreedomCalc privacy policy. We don't collect, store, or sell your personal data. Learn how we handle analytics, cookies, and advertising.",
  alternates: { canonical: `${config.siteUrl}/privacy` },
}

const SECTIONS = [
  {
    id: "personal-data",
    title: "What counts as personal data",
    body: "Personal data means any information that can identify you, directly or indirectly. This includes IP addresses, cookie identifiers, browser fingerprints, and device identifiers. It does not include the financial figures you enter into our calculators — those are processed entirely in your browser and are never transmitted to us.",
  },
  {
    id: "no-data",
    title: "Data we do not collect",
    body: "All calculator inputs — your age, income, expenses, portfolio value, and all other financial figures — are processed entirely in your browser. This data is never sent to our servers, never stored, and never shared with any third party. We have no access to the numbers you enter.",
  },
  {
    id: "analytics",
    title: "Analytics",
    body: "We use Google Analytics 4 to understand how people use the site — which pages are visited, how long users stay, and which calculators are most popular. This data is aggregated and anonymised. It does not include any financial data you enter into the calculators. GA4 may collect IP addresses and cookie identifiers for this purpose, subject to Google's Privacy Policy (policies.google.com/privacy). You can opt out using browser extensions like uBlock Origin or the Google Analytics Opt-out Add-on.",
  },
  {
    id: "advertising",
    title: "Advertising (Google AdSense)",
    body: "We use Google AdSense to display advertisements on this site. Google AdSense uses cookies and device identifiers — including the DoubleClick cookie (IDE) — to serve ads based on your prior visits to this website or other websites across the internet. This is known as interest-based or personalised advertising. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites. You can opt out of personalised advertising by visiting Google's Ad Settings at adssettings.google.com, or by visiting aboutads.info. FreedomCalc does not control the content of third-party advertisements served by Google AdSense and is not responsible for them. Clicking on any advertisement is at your own discretion.",
  },
  {
    id: "cookies",
    title: "Cookies",
    body: "FreedomCalc uses cookies in three categories. Strictly necessary: no cookies of this type are currently set by us. Analytics: Google Analytics sets cookies (_ga, _gid) to distinguish unique visitors and track usage — these can be blocked without affecting site functionality. Advertising: Google AdSense and DoubleClick set cookies (IDE, DSID, and similar) to serve and measure personalised ads — you can opt out via adssettings.google.com. We do not set any first-party advertising, tracking, or marketing cookies.",
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: "The site is hosted on Cloudflare Pages. Cloudflare may log basic request data (IP address, browser type) for security and performance purposes, subject to Cloudflare's own privacy policy. Google Analytics 4 and Google AdSense are our only other third-party services. Both are operated by Google LLC and governed by the Google Privacy Policy at policies.google.com/privacy.",
  },
  {
    id: "user-rights",
    title: "Your rights",
    body: "Depending on where you are located, you may have the following rights regarding your personal data: the right to access data held about you; the right to correct inaccurate data; the right to request deletion of your data; the right to object to or restrict certain processing; and (under CCPA) the right to opt out of the sale of personal information — we do not sell personal information. To exercise any of these rights, or to ask about data held by our third-party partners (Google), contact us at contact@freedomcalc.dev. For data processed by Google, you can also manage your preferences directly at myaccount.google.com.",
  },
  {
    id: "children",
    title: "Children's privacy",
    body: "FreedomCalc is not directed at children under 13. We do not knowingly collect any personal information from children under 13. If you believe a child has provided personal information through our site, please contact us and we will take steps to delete it.",
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: 'We may update this policy from time to time. Changes will be reflected in the "Last updated" date above. Continued use of the site after changes constitutes acceptance of the updated policy. We recommend reviewing this page periodically.',
  },
  {
    id: "contact",
    title: "Contact",
    body: "Questions about this policy or your personal data? Email us at contact@freedomcalc.dev. We aim to respond within 2 business days.",
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
                <span className="blog-stat-label">Data sold</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">GA4</span>
                <span className="blog-stat-label">Analytics</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">Ads</span>
                <span className="blog-stat-label">Google AdSense</span>
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
              <p className="legal-lead-headline">Your financial numbers never leave your device.</p>
              <p className="legal-lead-body">
                Every calculation runs locally in your browser. We never see the financial
                figures you enter. This policy explains what data is collected by our analytics
                and advertising partners (Google), and how you can control it.
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
              <div className="legal-toc-external">
                <p className="legal-toc-label" style={{ marginTop: "1.5rem" }}>External policies</p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="legal-toc-link">
                  Google Privacy Policy ↗
                </a>
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="legal-toc-link">
                  Google Ad Settings ↗
                </a>
                <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="legal-toc-link">
                  AdChoices opt-out ↗
                </a>
              </div>
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
