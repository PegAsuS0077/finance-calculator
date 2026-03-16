// lib/schema.ts — JSON-LD structured data helpers

export type FAQEntry = { q: string; a: string }

/** Generates a FAQPage JSON-LD object (stringify before embedding) */
export function buildFaqSchema(faqs: FAQEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  }
}

/** Generates a WebApplication JSON-LD object */
export function buildWebAppSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}
