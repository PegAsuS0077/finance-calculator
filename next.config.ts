// next.config.ts
import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const withMDX = createMDX({})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
}

export default withMDX(nextConfig)
