// app/terms/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use — FinCalc",
  description: "Terms of use for FinCalc. Free financial independence calculators for educational purposes.",
}

export default function TermsPage() {
  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2rem)" }}>

        <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--f-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.5rem" }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)", marginBottom: "2rem", fontWeight: 400 }}>
          Last updated: March 2026
        </p>

        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.8, fontWeight: 400, margin: "0 0 1.25rem" }}>
          By using FinCalc, you agree to these terms. Please read them carefully.
        </p>

        {[
          {
            title: "Educational use only",
            body: "FinCalc provides financial calculators for educational and informational purposes only. Nothing on this site constitutes financial, investment, tax, or legal advice. All projections and calculations are estimates based on hypothetical scenarios and mathematical models. They do not guarantee future results.",
          },
          {
            title: "No professional relationship",
            body: "Use of FinCalc does not create any professional relationship between you and FinCalc or its operators. We are not your financial advisor, accountant, or attorney. Always consult qualified professionals before making financial decisions.",
          },
          {
            title: "Accuracy of calculations",
            body: "We make every effort to ensure our calculations are accurate and based on sound financial methodology. However, we make no warranties — express or implied — about the accuracy, completeness, or suitability of the information provided. Use of the calculators is at your own risk.",
          },
          {
            title: "Intellectual property",
            body: "All content on this site — including text, design, code, and branding — is owned by FinCalc. You may not reproduce, distribute, or create derivative works without express written permission.",
          },
          {
            title: "Acceptable use",
            body: "You agree not to misuse the site — including attempting to scrape content in bulk, reverse engineer the calculators for commercial resale, or interfere with the site's operation in any way.",
          },
          {
            title: "Limitation of liability",
            body: "To the fullest extent permitted by law, FinCalc and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or reliance on any calculations or information provided.",
          },
          {
            title: "Changes to these terms",
            body: "We may update these terms at any time. Changes are effective when posted. Continued use of the site after changes constitutes acceptance of the updated terms.",
          },
          {
            title: "Governing law",
            body: "These terms are governed by applicable law. Any disputes will be resolved in the appropriate jurisdiction.",
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
