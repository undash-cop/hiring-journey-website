const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/blog/1", destination: "/blog/ai-tools/india-guide-2026", permanent: true },
      { source: "/blog/2", destination: "/blog/interview-questions/india-guide-2026", permanent: true },
      { source: "/blog/3", destination: "/blog/career-growth/india-guide-2026", permanent: true },
      { source: "/blog/4", destination: "/blog/ai-tools/auto-apply-job-search-2026", permanent: true },
      { source: "/blog/5", destination: "/blog/salary-guides/india-guide-2026", permanent: true },
      { source: "/blog/6", destination: "/blog/ai-tools/ai-credit-systems-usage-pricing-2026", permanent: true },
      { source: "/careers/1", destination: "/careers/senior-frontend-developer", permanent: true },
      { source: "/careers/2", destination: "/careers/product-designer", permanent: true },
      { source: "/careers/3", destination: "/careers/ai-ml-engineer", permanent: true },
      { source: "/careers/4", destination: "/careers/content-marketing-manager", permanent: true },
      { source: "/careers/5", destination: "/careers/backend-developer", permanent: true },
      { source: "/careers/6", destination: "/careers/ux-researcher", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
