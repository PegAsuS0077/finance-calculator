"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { type BlogPost } from "@/lib/blog"

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
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

export function BlogFilter({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? posts.filter((p) => p.category === active) : posts

  return (
    <>
      {/* Category filter pills */}
      <div className="blog-category-pills">
        <button
          className="blog-cat-pill"
          onClick={() => setActive(null)}
          style={
            active === null
              ? { color: "var(--f-blue)", background: "var(--f-blue-light)", borderColor: "var(--f-blue-border)", fontWeight: 600 }
              : {}
          }
          aria-pressed={active === null}
        >
          All
        </button>
        {categories.map((cat) => {
          const m = getCatMeta(cat)
          const isActive = active === cat
          return (
            <button
              key={cat}
              className="blog-cat-pill"
              onClick={() => setActive(isActive ? null : cat)}
              style={
                isActive
                  ? { color: m.color, background: m.bg, borderColor: m.border, fontWeight: 600 }
                  : {}
              }
              aria-pressed={isActive}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Filtered articles grid */}
      <div className="blog-card-grid">
        {filtered.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
