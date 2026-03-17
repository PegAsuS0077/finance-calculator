// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'
import { blogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${config.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: config.siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${config.siteUrl}/calculators`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${config.siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${config.siteUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${config.siteUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${config.siteUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${config.siteUrl}/fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/fire-number-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/coast-fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/savings-rate-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/4-percent-rule-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/compound-interest-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/investment-growth-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/retirement-timeline-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/lean-fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${config.siteUrl}/barista-fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...blogEntries,
  ]
}
