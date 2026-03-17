// app/blog/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { config } from "@/lib/config"
import { blogPosts, formatDate, type BlogPost } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog — FIRE & Financial Independence Articles",
  description:
    "In-depth articles on financial independence, the FIRE movement, safe withdrawal rates, index fund investing, and retirement planning strategies.",
  alternates: { canonical: `${config.siteUrl}/blog` },
  openGraph: {
    title: "FreedomCalc Blog — Financial Independence Articles",
    description:
      "In-depth guides on FIRE, safe withdrawal rates, savings rate, index investing, and early retirement planning.",
    url: `${config.siteUrl}/blog`,
    siteName: "FreedomCalc",
    type: "website",
  },
}

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; label: string }> = {
  "FIRE Fundamentals": {
    color: "var(--f-blue)",
    bg: "var(--f-blue-light)",
    border: "var(--f-blue-border)",
    label: "Fundamentals",
  },
  "FIRE Strategy": {
    color: "oklch(0.52 0.18 145)",
    bg: "oklch(0.96 0.04 145)",
    border: "oklch(0.82 0.09 145)",
    label: "Strategy",
  },
  "FIRE Types": {
    color: "oklch(0.55 0.19 38)",
    bg: "oklch(0.96 0.04 38)",
    border: "oklch(0.84 0.09 38)",
    label: "FIRE Types",
  },
  Investing: {
    color: "oklch(0.50 0.18 300)",
    bg: "oklch(0.96 0.03 300)",
    border: "oklch(0.83 0.08 300)",
    label: "Investing",
  },
  Tutorial: {
    color: "oklch(0.48 0.17 220)",
    bg: "oklch(0.96 0.03 220)",
    border: "oklch(0.83 0.08 220)",
    label: "Tutorial",
  },
}

function getCatMeta(cat: string) {
  return (
    CATEGORY_META[cat] ?? {
      color: "var(--f-blue)",
      bg: "var(--f-blue-light)",
      border: "var(--f-blue-border)",
      label: cat,
    }
  )
}

const TYPE_ICONS: Record<string, string> = {
  Tutorial: "◈",
  "List/affiliate": "◇",
  Guide: "◉",
  "Keyword-rich blog": "◎",
  Storytelling: "◐",
}

export default function BlogPage() {
  const featured = blogPosts[blogPosts.length - 1]
  const secondFeatured = blogPosts[blogPosts.length - 2]
  const rest = [...blogPosts].reverse().slice(2)

  const categories = Array.from(new Set(blogPosts.map((p) => p.category)))

  return (
    <div className="blog-index-root">
      {/* ── Masthead ── */}
      <header className="blog-masthead">
        <div className="blog-masthead-inner">
          <div className="blog-masthead-left">
            <span className="blog-eyebrow">FreedomCalc / Learning Center</span>
            <h1 className="blog-masthead-title">
              Financial
              <br />
              Independence
              <br />
              <em>Library</em>
            </h1>
            <p className="blog-masthead-sub">
              Guides, strategies, and deep dives on reaching FIRE — from calculating your
              number to retiring by 40.
            </p>
            <div className="blog-category-pills">
              {categories.map((cat) => {
                const m = getCatMeta(cat)
                return (
                  <span
                    key={cat}
                    className="blog-cat-pill"
                    style={{
                      color: m.color,
                      background: m.bg,
                      borderColor: m.border,
                    }}
                  >
                    {m.label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="blog-masthead-right">
            <div className="blog-stat-block">
              <div className="blog-stat">
                <span className="blog-stat-num">{blogPosts.length}</span>
                <span className="blog-stat-label">Articles</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">{categories.length}</span>
                <span className="blog-stat-label">Topics</span>
              </div>
              <div className="blog-stat">
                <span className="blog-stat-num">Free</span>
                <span className="blog-stat-label">Always</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero double feature ── */}
      <section className="blog-hero-section">
        <div className="blog-hero-inner">
          <div className="blog-hero-label">
            <span className="blog-section-tag">Featured</span>
          </div>
          <div className="blog-hero-grid">
            <HeroCard post={featured} size="large" />
            <HeroCard post={secondFeatured} size="small" />
          </div>
        </div>
      </section>

      {/* ── All articles ── */}
      <section className="blog-articles-section">
        <div className="blog-articles-inner">
          <div className="blog-articles-header">
            <span className="blog-section-tag">All Articles</span>
            <span className="blog-articles-count">{blogPosts.length} guides</span>
          </div>
          <div className="blog-card-grid">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="blog-cta-strip">
        <div className="blog-cta-inner">
          <div className="blog-cta-text">
            <p className="blog-cta-headline">Put the theory to work.</p>
            <p className="blog-cta-body">
              Run the numbers on your own FIRE timeline with our free calculators.
            </p>
          </div>
          <div className="blog-cta-actions">
            <Link href="/fire-calculator" className="blog-cta-btn blog-cta-btn--primary">
              FIRE Calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M2 7h10M7.5 2.5l4.5 4.5-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/fire-number-calculator" className="blog-cta-btn blog-cta-btn--ghost">
              FIRE Number
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────────────── Components ─────────────────────────────── */

function HeroCard({ post, size }: { post: BlogPost; size: "large" | "small" }) {
  const m = getCatMeta(post.category)
  return (
    <Link href={`/blog/${post.slug}`} className={`blog-hero-card blog-hero-card--${size}`}>
      <div className="blog-hero-card-img">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes={size === "large" ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          className="blog-hero-card-img-inner"
        />
        <div className="blog-hero-card-img-overlay" />
      </div>
      <div className="blog-hero-card-body">
        <div className="blog-hero-card-meta">
          <span
            className="blog-cat-badge"
            style={{ color: m.color, background: m.bg, borderColor: m.border }}
          >
            {m.label}
          </span>
          <span className="blog-hero-card-read">{post.readingTime}</span>
        </div>
        <h2 className="blog-hero-card-title">{post.title}</h2>
        <p className="blog-hero-card-desc">{post.description}</p>
        <div className="blog-hero-card-footer">
          <span className="blog-hero-card-date">{formatDate(post.date)}</span>
          <span className="blog-read-link">
            Read
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArticleCard({ post }: { post: BlogPost }) {
  const m = getCatMeta(post.category)
  return (
    <Link href={`/blog/${post.slug}`} className="blog-article-card">
      <div className="blog-article-card-img">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="blog-article-card-img-inner"
        />
        <div className="blog-article-card-img-overlay" />
      </div>
      <div className="blog-article-card-body">
        <div className="blog-article-card-top">
          <span
            className="blog-cat-badge"
            style={{ color: m.color, background: m.bg, borderColor: m.border }}
          >
            {m.label}
          </span>
          <span className="blog-article-card-read">{post.readingTime}</span>
        </div>
        <h3 className="blog-article-card-title">{post.title}</h3>
        <p className="blog-article-card-desc">{post.description}</p>
        <div className="blog-article-card-footer">
          <span className="blog-article-card-date">{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  )
}
