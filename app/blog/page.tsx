// app/blog/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { config } from "@/lib/config"
import { blogPosts, formatDate } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog — FIRE & Financial Independence Articles",
  description: "In-depth articles on financial independence, the FIRE movement, safe withdrawal rates, index fund investing, and retirement planning strategies.",
  alternates: { canonical: `${config.siteUrl}/blog` },
  openGraph: {
    title: "FIRE Tools Blog — Financial Independence Articles",
    description: "In-depth guides on FIRE, safe withdrawal rates, savings rate, index investing, and early retirement planning.",
    url: `${config.siteUrl}/blog`,
    siteName: "FIRE Tools",
    type: "website",
  },
}

const categories = ["All", "FIRE Fundamentals", "FIRE Strategy", "FIRE Types", "Investing"]

export default function BlogPage() {
  const grouped = categories.slice(1).map((cat) => ({
    category: cat,
    posts: blogPosts.filter((p) => p.category === cat),
  }))

  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: "1px solid var(--f-border)", background: "var(--f-card)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
            Learning Center
          </p>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, color: "var(--f-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.875rem" }}>
            Financial Independence Articles
          </h1>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.0625rem)", color: "var(--f-text-muted)", lineHeight: 1.75, maxWidth: "560px", margin: 0, fontWeight: 400 }}>
            In-depth guides on FIRE strategy, safe withdrawal rates, savings rate, index investing, and building your path to financial independence.
          </p>
        </div>
      </div>

      {/* ── Featured post ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem) 0" }}>
        <FeaturedPost post={blogPosts[blogPosts.length - 1]} />
      </div>

      {/* ── Posts by category ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)" }}>
        {grouped.map(({ category, posts }) =>
          posts.length > 0 ? (
            <div key={category} style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--f-blue)",
                  marginBottom: "1.125rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid var(--f-border)",
                }}
              >
                {category}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "1rem" }}>
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* ── CTA ── */}
      <div style={{ borderTop: "1px solid var(--f-border)", background: "var(--f-card)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--f-text-heading)", margin: "0 0 0.25rem" }}>Ready to run the numbers?</p>
            <p style={{ fontSize: "0.875rem", color: "var(--f-text-muted)", margin: 0, fontWeight: 400 }}>Use our free calculators to model your personal FIRE timeline.</p>
          </div>
          <Link
            href="/fire-calculator"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--f-blue)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Try FIRE Calculator
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  )
}

function FeaturedPost({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        className="calc-card"
        style={{
          background: "linear-gradient(135deg, oklch(0.96 0.02 258) 0%, oklch(0.98 0.01 258) 100%)",
          border: "1px solid var(--f-border-strong)",
          borderRadius: "12px",
          padding: "clamp(1.75rem, 3vw, 2.5rem)",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--f-blue)", background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)", padding: "0.25rem 0.625rem", borderRadius: "4px" }}>
            Latest
          </span>
          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--f-text-faint)" }}>{post.category}</span>
          <span style={{ fontSize: "0.6875rem", color: "var(--f-text-faint)" }}>·</span>
          <span style={{ fontSize: "0.6875rem", color: "var(--f-text-faint)" }}>{post.readingTime}</span>
        </div>
        <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: "0.75rem" }}>
          {post.title}
        </h2>
        <p style={{ fontSize: "0.9375rem", color: "var(--f-text-muted)", lineHeight: 1.75, fontWeight: 400, margin: "0 0 1.25rem", maxWidth: "680px" }}>
          {post.description}
        </p>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--f-blue)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
          Read article
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        className="calc-card"
        style={{
          background: "var(--f-card)",
          border: "1px solid var(--f-border)",
          borderRadius: "10px",
          padding: "1.375rem 1.5rem",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--f-text-faint)" }}>{formatDate(post.date)}</span>
          <span style={{ fontSize: "0.6875rem", color: "var(--f-text-faint)" }}>·</span>
          <span style={{ fontSize: "0.6875rem", color: "var(--f-text-faint)" }}>{post.readingTime}</span>
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--f-text-heading)", letterSpacing: "-0.015em", lineHeight: 1.35, marginBottom: "0.625rem" }}>
          {post.title}
        </h3>
        <p style={{ fontSize: "0.8125rem", color: "var(--f-text-muted)", lineHeight: 1.7, fontWeight: 400, margin: "0 0 1rem", flex: 1 }}>
          {post.description}
        </p>
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--f-blue)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
          Read more
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
            <path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
