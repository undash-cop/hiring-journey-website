import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hiringjourney.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/features", "/career", "/salary", "/tools"],
        disallow: ["/api/", "/dashboard/", "/admin/", "/internal/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
