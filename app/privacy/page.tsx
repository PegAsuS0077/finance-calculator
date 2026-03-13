// app/privacy/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — FreedomCalc",
  description: "FreedomCalc privacy policy. We don't collect, store, or sell your personal data.",
}

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2rem)" }}>

        <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--f-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", marginBottom: "2rem", fontWeight: 400 }}>
          Last updated: March 2026
        </p>

        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          Your privacy matters. This policy explains what data FreedomCalc collects (very little),
          how it&apos;s used, and your rights.
        </p>

        {[
          {
            title: "Data we do not collect",
            body: "All calculator inputs — your age, income, expenses, portfolio value, and all other financial figures — are processed entirely in your browser. This data is never sent to our servers, never stored, and never shared with any third party. We have no access to the numbers you enter.",
          },
          {
            title: "Analytics",
            body: "We use Google Analytics 4 to understand how people use the site — which pages are visited, how long users stay, and which calculators are most popular. This data is aggregated and anonymised. It does not include any financial data you enter into the calculators. You can opt out of Google Analytics using browser extensions like uBlock Origin or the Google Analytics Opt-out Add-on.",
          },
          {
            title: "Cookies",
            body: "FreedomCalc uses minimal cookies. Google Analytics sets cookies to distinguish unique visitors. We do not use advertising cookies, tracking pixels, or any third-party marketing cookies.",
          },
          {
            title: "Third-party services",
            body: "The site is hosted on Cloudflare Pages. Cloudflare may log basic request data (IP address, browser type) for security and performance purposes, subject to Cloudflare's own privacy policy. We do not use any other third-party services that have access to your data.",
          },
          {
            title: "Children's privacy",
            body: "FreedomCalc is not directed at children under 13. We do not knowingly collect any personal information from children.",
          },
          {
            title: "Changes to this policy",
            body: "We may update this policy from time to time. Changes will be reflected in the \"Last updated\" date above. Continued use of the site after changes constitutes acceptance of the updated policy.",
          },
          {
            title: "Contact",
            body: "Questions about this policy? Email us at hello@freedomcalc.dev — we read every message.",
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", margin: "2.25rem 0 0.625rem" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: 0 }}>
              {section.body}
            </p>
          </div>
        ))}

      </main>
    </div>
  )
}
