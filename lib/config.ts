// lib/config.ts
export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
}
