import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (jowhe.github.io is a user site, served from the
  // root, so no basePath is needed). Output goes to ./out.
  output: "export",
  images: { unoptimized: true },
}

export default nextConfig
