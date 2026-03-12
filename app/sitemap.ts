// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: config.siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
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
  ]
}
