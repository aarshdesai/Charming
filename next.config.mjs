/** @type {import('next').NextConfig} */

// When building for GitHub Pages we produce a fully static export served
// under /Charming. For local dev and the real (Vercel) deploy these stay off.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  ...(isPages && {
    output: "export",
    basePath: "/Charming",
    assetPrefix: "/Charming/",
  }),
  images: {
    // Static export can't run the image optimizer
    unoptimized: isPages,
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
