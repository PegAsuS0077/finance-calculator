// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: config.siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${config.siteUrl}/fire-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
