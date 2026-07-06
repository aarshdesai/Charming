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
  // Embed the base path so components can prefix local /public images correctly
  // in the static export where next/image can't apply assetPrefix automatically.
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? "/Charming" : "",
  },
  images: {
    // Static export can't run the image optimizer
    unoptimized: isPages,
  },
};

export default nextConfig;
