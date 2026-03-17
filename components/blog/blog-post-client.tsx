"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatDate, type BlogPost } from "@/lib/blog"

type CatMeta = { color: string; bg: string; border: string }

type Heading = { id: string; text: string; level: number }

interface Props {
  slug: string
  title: string
  description: string
  category: string
  date: string
  readingTime: string
  coverImage: string
  catMeta: CatMeta
  relatedPosts: BlogPost[]
  children: React.ReactNode
}

export function BlogPostClient({
  title,
  category,
  date,
  readingTime,
  coverImage,
  catMeta,
  relatedPosts,
  children,
}: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      setProgress(Math.min(100, (scrolled / total) * 100))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Extract headings for TOC
  useEffect(() => {
    const el = articleRef.current
    if (!el) return
    const nodes = el.querySelectorAll("h2, h3")
    const extracted: Heading[] = []
    nodes.forEach((node) => {
      const text = node.textContent ?? ""
      let id = node.id
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
        node.id = id
      }
      extracted.push({ id, text, level: parseInt(node.tagName[1]) })
    })
    setHeadings(extracted)
  }, [])

  // Active heading highlight
  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <div className="bpost-root">
      {/* Progress bar */}
      <div className="bpost-progress-track">
        <div className="bpost-progress-bar" style={{ width: `${progress}%`, background: catMeta.color }} />
      </div>

      {/* Header */}
      <header className="bpost-header">
        <div className="bpost-header-inner">
          <nav className="bpost-breadcrumb" aria-label="breadcrumb">
            <Link href="/" className="bpost-breadcrumb-link">Home</Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="bpost-breadcrumb-sep">
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link href="/blog" className="bpost-breadcrumb-link">Blog</Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="bpost-breadcrumb-sep">
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="bpost-breadcrumb-cat"
              style={{ color: catMeta.color }}
            >
              {category}
            </span>
          </nav>

          <div className="bpost-header-meta">
            <span
              className="bpost-cat-badge"
              style={{ color: catMeta.color, background: catMeta.bg, borderColor: catMeta.border }}
            >
              {category}
            </span>
          </div>

          <h1 className="bpost-title">{title}</h1>

          <div className="bpost-byline">
            <span className="bpost-byline-date">{formatDate(date)}</span>
            <span className="bpost-byline-dot" />
            <span className="bpost-byline-read">{readingTime}</span>
            {progress > 5 && (
              <>
                <span className="bpost-byline-dot" />
                <span className="bpost-byline-progress" style={{ color: catMeta.color }}>
                  {Math.round(progress)}% read
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Body: article + sidebar */}
      <div className="bpost-layout">
        <div className="bpost-layout-inner">
          {/* Article */}
          <article ref={articleRef} className="bpost-article prose-blog">
            {/* Cover image — inside the article column */}
            <div className="bpost-cover">
              <Image
                src={coverImage}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 65vw, 800px"
                className="bpost-cover-img"
              />
              <div className="bpost-cover-overlay" style={{ background: catMeta.color }} />
            </div>
            {children}
          </article>

          {/* Sidebar */}
          {headings.length > 0 && (
            <aside className="bpost-sidebar">
              <div className="bpost-toc">
                <p className="bpost-toc-label">Contents</p>
                <nav className="bpost-toc-nav">
                  {headings.map(({ id, text, level }) => (
                    <button
                      key={id}
                      className={`bpost-toc-item bpost-toc-item--h${level}${activeId === id ? " bpost-toc-item--active" : ""}`}
                      style={activeId === id ? { color: catMeta.color, borderLeftColor: catMeta.color } : {}}
                      onClick={() => scrollTo(id)}
                    >
                      {text}
                    </button>
                  ))}
                </nav>
                <div className="bpost-toc-progress">
                  <div className="bpost-toc-progress-bar" style={{ height: `${progress}%`, background: catMeta.color }} />
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Related articles */}
      {allRelated(relatedPosts).length > 0 && (
        <section className="bpost-related">
          <div className="bpost-related-inner">
            <p className="bpost-related-label">Continue Reading</p>
            <div className="bpost-related-grid">
              {allRelated(relatedPosts).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="bpost-related-card">
                  <div className="bpost-related-img">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="bpost-related-img-inner"
                    />
                  </div>
                  <div className="bpost-related-body">
                    <span className="bpost-related-cat" style={{ color: catMeta.color }}>{p.category}</span>
                    <p className="bpost-related-title">{p.title}</p>
                    <span className="bpost-related-read">{p.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="bpost-back">
              <Link href="/blog" className="bpost-back-link">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M12 7H2M6.5 2.5L2 7l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function allRelated(posts: BlogPost[]) {
  return posts.slice(0, 3)
}
