// next.config.ts
import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import path from "path"

const withMDX = createMDX({
  options: {
    remarkPlugins: [path.resolve("./lib/remark-gfm-tables.mjs")],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
}

export default withMDX(nextConfig)
