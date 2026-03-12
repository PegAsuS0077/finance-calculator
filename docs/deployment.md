# Deployment Guide — FIRE Tools

## Platform Overview

| Property | Value |
|---|---|
| Hosting | Cloudflare Pages |
| Next.js Adapter | OpenNext (`@opennextjs/cloudflare`) |
| CDN | Cloudflare global edge network (300+ locations) |
| Cost | Very low — pay-per-request, generous free tier |
| HTTPS | Automatic via Cloudflare |
| Domain | Custom domain via Cloudflare DNS |

### Why Cloudflare Pages + OpenNext

- **Global edge delivery** — pages served from the nearest Cloudflare data center
- **Extremely low cost** — free tier handles significant traffic; scales cheaply
- **No cold starts** — edge workers, not Lambda functions
- **Built-in CDN** — static assets cached automatically
- **OpenNext** — open-source adapter that makes Next.js run on non-Vercel platforms

---

## Local Development Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### First-Time Setup

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local
# Edit .env.local with your values (see below)

# Start development server
npm run dev
```

### Environment Variables (Local)

Create `.env.local` in the project root (never commit this file):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
```

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Full URL of the site (used in metadata and sitemap) | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | Yes (can be placeholder in dev) |

**Rules:**
- Never commit `.env.local` to git (`.gitignore` already excludes it)
- Never reference `process.env` directly in UI components — use `lib/config.ts`
- Never add secrets that need to be kept private as `NEXT_PUBLIC_*` variables

### Accessing Environment Variables

All environment variable access goes through `lib/config.ts`:

```ts
// lib/config.ts
export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  gaId: process.env.NEXT_PUBLIC_GA_ID!,
}
```

Usage in components or pages:
```ts
import { config } from '../lib/config'
const canonicalUrl = `${config.siteUrl}/fire-calculator`
```

---

## OpenNext Cloudflare Setup

### Install the Adapter

```bash
npm install @opennextjs/cloudflare
```

### Configure next.config.ts

The Next.js config needs specific settings for Cloudflare Pages compatibility:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages via OpenNext
  output: 'standalone',
}

export default nextConfig
```

> **Note:** OpenNext Cloudflare support is evolving. Verify the exact `next.config.ts` requirements against the current `@opennextjs/cloudflare` documentation before deploying.

### Build Command

OpenNext wraps the Next.js build:

```bash
npx opennextjs-cloudflare build
```

Or configure in `package.json`:
```json
{
  "scripts": {
    "build": "npx opennextjs-cloudflare build",
    "preview": "npx opennextjs-cloudflare preview"
  }
}
```

---

## Deploying to Cloudflare Pages

### Option A — Git Integration (Recommended)

1. Push code to GitHub repository
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect to your GitHub repository
4. Configure build settings:

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | `npx opennextjs-cloudflare build` |
| Build output directory | `.open-next` |
| Root directory | `/` (or `finance-calculator` if deploying subdirectory) |
| Node.js version | 18 |

5. Set environment variables in Cloudflare Pages dashboard (see below)
6. Click "Save and Deploy"

After first deploy, every push to the main branch triggers an automatic redeploy.

### Option B — Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npx opennextjs-cloudflare build
wrangler pages deploy .open-next
```

---

## Production Environment Variables

Set these in Cloudflare Pages dashboard:

**Dashboard path:** Pages → Your Project → Settings → Environment Variables

| Variable | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://preview.yourdomain.com` | Preview (optional) |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production |

**Important:**
- Production variables are only applied to production deployments (main branch)
- Preview deployments use Preview variables
- Never add secrets as `NEXT_PUBLIC_*` — they are exposed in the browser

---

## Custom Domain Setup

1. In Cloudflare Pages dashboard → Your Project → Custom domains
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `firetools.com`)
4. Follow DNS configuration instructions
5. Cloudflare automatically provisions HTTPS

If your domain is already on Cloudflare DNS:
- The CNAME record is added automatically
- HTTPS is active within minutes

---

## Caching Strategy

Cloudflare's CDN caches static assets automatically.

| Asset Type | Cache Behavior |
|---|---|
| Static files (JS, CSS, images) | Cached at edge, long TTL |
| HTML pages | Short TTL or no cache (for content freshness) |
| API routes | No cache (if added in future) |

For v1 (no API routes), all pages are static or server-rendered at the edge.

The Next.js App Router with OpenNext on Cloudflare renders pages at the edge — no origin server needed for most requests.

---

## Performance Targets

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5 seconds |
| First Input Delay (FID) / INP | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to First Byte (TTFB) | < 800ms |
| Google PageSpeed score | 90+ (mobile), 95+ (desktop) |

To maintain these targets:
- Keep page weight small (no large images, no heavy fonts)
- Lazy-load Recharts and any large components
- Minimize `'use client'` components
- Use `next/image` for any images added later

---

## CI/CD Approach

### v1 — Cloudflare Pages Git Integration

- Push to `main` → automatic production deployment
- Push to any branch → automatic preview deployment at unique URL
- No separate CI setup needed

### v2 — GitHub Actions (Future)

Add a GitHub Actions workflow to run tests before deploying:

```yaml
# .github/workflows/deploy.yml (future)
name: Test and Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npx vitest run  # Tests must pass
  deploy:
    needs: test
    # ... Cloudflare Pages deploy action
```

In v1, the test gate is enforced by developer discipline — run `npx vitest run` locally before pushing.

---

## Rollbacks

Cloudflare Pages keeps deployment history. To roll back:

1. Cloudflare Dashboard → Pages → Your Project → Deployments
2. Find the previous successful deployment
3. Click "Rollback to this deployment"

Rollback is instant — no rebuild required.
