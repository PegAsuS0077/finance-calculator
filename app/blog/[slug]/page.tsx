// app/blog/[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { config } from "@/lib/config"
import { blogPosts, getBlogPost, formatDate } from "@/lib/blog"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${config.siteUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${config.siteUrl}/blog/${slug}`,
      siteName: "FreedomCalc",
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  // Dynamically import the MDX content
  let Content: React.ComponentType
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`)
    Content = mod.default
  } catch {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <div style={{ background: "var(--f-page)", minHeight: "100vh", fontFamily: "var(--font-inter), ui-sans-serif, sans-serif" }}>

      {/* ── Breadcrumb + meta ── */}
      <div style={{ borderBottom: "1px solid var(--f-border)", background: "var(--f-card)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem clamp(1.5rem, 4vw, 2rem) 0" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8125rem", color: "var(--f-text-faint)", marginBottom: "1.75rem" }}>
            <Link href="/" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>Home</Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link href="/blog" style={{ color: "var(--f-blue)", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "var(--f-text-faint)" }}>{post.category}</span>
          </nav>

          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-blue)", marginBottom: "0.625rem" }}>
            {post.category}
          </p>
          <h1 style={{ fontSize: "clamp(1.625rem, 4vw, 2.375rem)", fontWeight: 800, color: "var(--f-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1rem" }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)" }}>{formatDate(post.date)}</span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--f-border-strong)" }} />
            <span style={{ fontSize: "0.8125rem", color: "var(--f-text-faint)" }}>{post.readingTime}</span>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2rem)" }}>
        <article className="prose-blog">
          <Content />
        </article>

        {/* ── Related articles ── */}
        <div style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid var(--f-border)" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--f-text-heading)", letterSpacing: "-0.02em", marginBottom: "1.125rem" }}>
            More Articles
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: "0.875rem" }}>
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="calc-card"
                  style={{
                    background: "var(--f-card)",
                    border: "1px solid var(--f-border)",
                    borderRadius: "9px",
                    padding: "1.125rem 1.25rem",
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  <p style={{ fontSize: "0.6875rem", color: "var(--f-blue)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.4rem" }}>
                    {related.category}
                  </p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--f-text-heading)", lineHeight: 1.35, margin: "0 0 0.375rem", letterSpacing: "-0.01em" }}>
                    {related.title}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--f-text-faint)", margin: 0 }}>{related.readingTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Back link ── */}
        <div style={{ marginTop: "2rem" }}>
          <Link href="/blog" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--f-blue)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All articles
          </Link>
        </div>
      </div>

    </div>
  )
}
