import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/metadata";

type MetadataInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function createPageMetadata({
  path,
  title,
  description,
  keywords = [],
  type = "website",
}: MetadataInput): Metadata {
  const canonical = getCanonicalUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Hiring Journey",
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const schema = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hiring Journey",
    url: getCanonicalUrl("/"),
    logo: getCanonicalUrl("/logos/Hiring_Journey_Primary.svg"),
    sameAs: ["https://www.linkedin.com/company/hiring-journey"],
  }),
  product: (name: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: {
      "@type": "Brand",
      name: "Hiring Journey",
    },
    url: getCanonicalUrl(path),
  }),
  course: (name: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Hiring Journey",
      sameAs: getCanonicalUrl("/"),
    },
    url: getCanonicalUrl(path),
  }),
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }),
  blogPosting: (input: {
    title: string;
    description: string;
    path: string;
    publishedAt: string;
    authorName: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    mainEntityOfPage: getCanonicalUrl(input.path),
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Hiring Journey",
      logo: {
        "@type": "ImageObject",
        url: getCanonicalUrl("/logos/Hiring_Journey_Primary.svg"),
      },
    },
  }),
  breadcrumb: (items: Array<{ name: string; path: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  }),
  person: (name: string, path: string, role: string) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: getCanonicalUrl(path),
    jobTitle: role,
    worksFor: {
      "@type": "Organization",
      name: "Hiring Journey",
    },
  }),
  softwareApplication: (name: string, description: string, path: string) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: getCanonicalUrl(path),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  }),
};
