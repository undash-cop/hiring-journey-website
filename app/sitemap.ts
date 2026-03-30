import { MetadataRoute } from "next";
import { roleRoadmaps, salaryLocations } from "@/lib/seo-data";
import { blogSummaries } from "@/lib/content-data";
import { careerDetails } from "@/lib/careers-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hiringjourney.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/features`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/comparison/ai-resume-builder-vs-manual`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${baseUrl}/use-cases/career-switch`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/legal/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const blogCategories = Array.from(new Set(blogSummaries.map((post) => post.categorySlug)));

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/${category}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = blogSummaries.map((post) => ({
    url: `${baseUrl}/blog/${post.categorySlug}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools/ai-resume-builder`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/ai-interview-coach`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/salary-negotiation-assistant`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const careerRoadmaps: MetadataRoute.Sitemap = roleRoadmaps.map((role) => ({
    url: `${baseUrl}/career/${role}/roadmap`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const salaryPages: MetadataRoute.Sitemap = roleRoadmaps.flatMap((role) =>
    salaryLocations.map((location) => ({
      url: `${baseUrl}/salary/${role}/${location}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: location === "india" ? 0.7 : 0.6,
    }))
  );

  const interviewPages: MetadataRoute.Sitemap = roleRoadmaps.map((role) => ({
    url: `${baseUrl}/interview-questions/${role}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const resumeExamplePages: MetadataRoute.Sitemap = roleRoadmaps.map((role) => ({
    url: `${baseUrl}/resume-examples/${role}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const careerDetailPages: MetadataRoute.Sitemap = careerDetails.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogCategoryPages,
    ...blogPosts,
    ...toolPages,
    ...careerRoadmaps,
    ...salaryPages,
    ...interviewPages,
    ...resumeExamplePages,
    ...careerDetailPages,
  ];
}
