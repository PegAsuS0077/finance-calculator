// app/blog/[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { config } from "@/lib/config"
import { blogPosts, getBlogPost, formatDate } from "@/lib/blog"
import { BlogPostClient } from "@/components/blog/blog-post-client"

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

const CATEGORY_META: Record<string, { color: string; bg: string; border: string }> = {
  "FIRE Fundamentals": {
    color: "var(--f-blue)",
    bg: "var(--f-blue-light)",
    border: "var(--f-blue-border)",
  },
  "FIRE Strategy": {
    color: "oklch(0.52 0.18 145)",
    bg: "oklch(0.96 0.04 145)",
    border: "oklch(0.82 0.09 145)",
  },
  "FIRE Types": {
    color: "oklch(0.55 0.19 38)",
    bg: "oklch(0.96 0.04 38)",
    border: "oklch(0.84 0.09 38)",
  },
  Investing: {
    color: "oklch(0.50 0.18 300)",
    bg: "oklch(0.96 0.03 300)",
    border: "oklch(0.83 0.08 300)",
  },
  Tutorial: {
    color: "oklch(0.48 0.17 220)",
    bg: "oklch(0.96 0.03 220)",
    border: "oklch(0.83 0.08 220)",
  },
}

function getCatMeta(cat: string) {
  return CATEGORY_META[cat] ?? { color: "var(--f-blue)", bg: "var(--f-blue-light)", border: "var(--f-blue-border)" }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  let Content: React.ComponentType
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`)
    Content = mod.default
  } catch {
    notFound()
  }

  const catMeta = getCatMeta(post.category)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2)
  const morePosts = blogPosts
    .filter((p) => p.slug !== slug && !relatedPosts.includes(p))
    .slice(0, 3 - relatedPosts.length)
  const allRelated = [...relatedPosts, ...morePosts].slice(0, 3)

  return (
    <BlogPostClient
      slug={slug}
      title={post.title}
      description={post.description}
      category={post.category}
      date={post.date}
      readingTime={post.readingTime}
      coverImage={post.coverImage}
      catMeta={catMeta}
      relatedPosts={allRelated}
    >
      <Content />
    </BlogPostClient>
  )
}
