import { careerDetails } from "@/lib/careers-data";
import { blogPostBodiesById } from "@/lib/blog-post-bodies";

export type BlogSummary = {
  id: number;
  categorySlug: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  content: string;
  faq: Array<{ question: string; answer: string }>;
};

type BlogSummarySeed = Omit<BlogSummary, "content" | "faq">;

const blogSummarySeed: BlogSummarySeed[] = [
  {
    id: 1,
    categorySlug: "ai-tools",
    slug: "india-guide-2026",
    title: "How AI Resume Analyzers Are Revolutionizing Job Applications in 2026",
    excerpt:
      "Discover how AI-powered resume analysis tools are helping candidates optimize their resumes for ATS systems and land more interviews in India's competitive job market.",
    author: "Hiring Journey Team",
    date: "2026-02-08",
    category: "AI & Technology",
    readTime: "6 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    imageAlt: "AI analyzing resume documents",
  },
  {
    id: 2,
    categorySlug: "interview-questions",
    slug: "india-guide-2026",
    title: "AI Mock Interviews: The Future of Interview Preparation",
    excerpt:
      "Learn how AI-powered mock interview platforms are transforming interview prep, providing instant feedback and personalized coaching for technical and HR rounds.",
    author: "Hiring Journey Team",
    date: "2026-02-01",
    category: "AI & Technology",
    readTime: "7 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    imageAlt: "AI-powered interview preparation",
  },
  {
    id: 3,
    categorySlug: "career-growth",
    slug: "india-guide-2026",
    title: "Smart Job Matching: How AI Finds Your Perfect Role",
    excerpt:
      "Explore how machine learning algorithms analyze your skills, experience, and preferences to match you with the right opportunities in India's tech sector.",
    author: "Hiring Journey Team",
    date: "2026-01-25",
    category: "AI & Technology",
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    imageAlt: "AI job matching technology",
  },
  {
    id: 4,
    categorySlug: "ai-tools",
    slug: "auto-apply-job-search-2026",
    title: "AI-Powered Auto-Apply: Streamlining Your Job Search",
    excerpt:
      "Understand how intelligent automation is helping candidates apply to multiple positions efficiently while maintaining personalized application quality.",
    author: "Hiring Journey Team",
    date: "2026-01-18",
    category: "AI & Technology",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    imageAlt: "Automated job application process",
  },
  {
    id: 5,
    categorySlug: "salary-guides",
    slug: "india-guide-2026",
    title: "The Role of AI in HR Negotiation: Getting Better Offers",
    excerpt:
      "Discover how AI tools analyze market data and provide negotiation strategies to help you secure competitive salary packages in Indian tech companies.",
    author: "Hiring Journey Team",
    date: "2026-01-12",
    category: "AI & Technology",
    readTime: "8 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    imageAlt: "AI-assisted salary negotiation",
  },
  {
    id: 6,
    categorySlug: "ai-tools",
    slug: "ai-credit-systems-usage-pricing-2026",
    title: "AI Credit Systems: Understanding Usage-Based Pricing in Career Platforms",
    excerpt:
      "Learn how AI credit systems work, why they're cost-effective for job seekers, and how to maximize your credits for resume fixes, interviews, and applications.",
    author: "Hiring Journey Team",
    date: "2026-01-05",
    category: "AI & Technology",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
    imageAlt: "AI credit system dashboard",
  },
  {
    id: 7,
    categorySlug: "resume-tips",
    slug: "resume-headline-examples-india-2026",
    title: "15 Resume Headline Examples for Indian Job Seekers in 2026",
    excerpt:
      "Use recruiter-tested headline formats to improve ATS match rates and increase interview callbacks in competitive Indian hiring markets.",
    author: "Hiring Journey Team",
    date: "2026-02-15",
    category: "Resume Tips",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    imageAlt: "Resume headline editing on laptop",
  },
  {
    id: 8,
    categorySlug: "interview-questions",
    slug: "hr-interview-questions-india-tech-2026",
    title: "Top HR Interview Questions in India Tech Hiring (2026 Edition)",
    excerpt:
      "Prepare concise STAR-based answers for the most common HR interview rounds across startups and enterprise teams in India.",
    author: "Hiring Journey Team",
    date: "2026-02-22",
    category: "Interview Prep",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=600&fit=crop",
    imageAlt: "Candidate preparing for HR interview",
  },
  {
    id: 9,
    categorySlug: "career-growth",
    slug: "career-switch-to-qa-roadmap-india",
    title: "Career Switch to QA: 90-Day Roadmap for India",
    excerpt:
      "A practical weekly roadmap to transition into software testing with skill milestones, project ideas, and interview prep checkpoints.",
    author: "Hiring Journey Team",
    date: "2026-03-01",
    category: "Career Growth",
    readTime: "8 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
    imageAlt: "Career switching roadmap planning",
  },
  {
    id: 10,
    categorySlug: "salary-guides",
    slug: "software-engineer-salary-india-2026",
    title: "Software Engineer Salary in India 2026: City-wise Breakdown",
    excerpt:
      "Compare fresher to senior salary ranges across Bangalore, Hyderabad, Pune, and remote-first roles to benchmark your next move.",
    author: "Hiring Journey Team",
    date: "2026-03-08",
    category: "Salary Negotiation",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop",
    imageAlt: "Salary report charts and analytics",
  },
  {
    id: 11,
    categorySlug: "job-market-india",
    slug: "india-tech-hiring-trends-march-2026",
    title: "India Tech Hiring Trends: March 2026 Weekly Signals",
    excerpt:
      "Role demand insights across product, engineering, QA, and data with practical actions to align your profile for current openings.",
    author: "Hiring Journey Team",
    date: "2026-03-15",
    category: "Technology",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    imageAlt: "Indian tech hiring trend dashboard",
  },
  {
    id: 12,
    categorySlug: "software-engineering",
    slug: "system-design-prep-for-2-years-experience",
    title: "System Design Prep Plan for Engineers with 2+ Years Experience",
    excerpt:
      "A focused preparation plan with architecture fundamentals, scaling patterns, and mock discussion prompts for interviews.",
    author: "Hiring Journey Team",
    date: "2026-03-22",
    category: "Interview Prep",
    readTime: "9 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800&h=600&fit=crop",
    imageAlt: "System design architecture diagram on screen",
  },
  {
    id: 13,
    categorySlug: "freshers-guide",
    slug: "first-job-preparation-checklist-april-2026",
    title: "First Job Preparation Checklist for Freshers (April 2026)",
    excerpt:
      "Weekly checklist covering resume updates, GitHub profile, interview practice, and application tracking for first-time job seekers.",
    author: "Hiring Journey Team",
    date: "2026-03-29",
    category: "Career Growth",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop",
    imageAlt: "Fresher job preparation checklist",
  },
  {
    id: 14,
    categorySlug: "data-science",
    slug: "data-analyst-roadmap-april-2026",
    title: "Data Analyst Roadmap for India: Skills to Build in Q2 2026",
    excerpt:
      "Learn what hiring teams expect in SQL, BI tools, dashboards, and storytelling with a structured learning path for analysts.",
    author: "Hiring Journey Team",
    date: "2026-04-05",
    category: "Career Growth",
    readTime: "8 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imageAlt: "Data analyst roadmap and dashboard",
  },
  {
    id: 15,
    categorySlug: "devops",
    slug: "devops-interview-questions-kubernetes-april-2026",
    title: "DevOps Interview Questions: Kubernetes & CI/CD (April 2026)",
    excerpt:
      "Role-focused DevOps interview questions with practical answers across Kubernetes, observability, pipelines, and incident response.",
    author: "Hiring Journey Team",
    date: "2026-04-12",
    category: "Interview Prep",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    imageAlt: "DevOps interview preparation with cloud infrastructure",
  },
  {
    id: 16,
    categorySlug: "product-management",
    slug: "product-manager-interview-frameworks-april-2026",
    title: "Product Manager Interview Frameworks for India Startups",
    excerpt:
      "Master product thinking, prioritization, and metric-driven answers with framework templates used in PM interviews.",
    author: "Hiring Journey Team",
    date: "2026-04-19",
    category: "Career Growth",
    readTime: "8 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    imageAlt: "Product manager interview framework notes",
  },
  {
    id: 17,
    categorySlug: "ai-tools",
    slug: "ai-career-tools-roundup-april-2026",
    title: "Best AI Career Tools Roundup for India (April 2026)",
    excerpt:
      "A curated weekly roundup of AI tools for resume optimization, interview practice, salary benchmarking, and application tracking.",
    author: "Hiring Journey Team",
    date: "2026-04-26",
    category: "Technology",
    readTime: "6 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800&h=600&fit=crop",
    imageAlt: "AI career tools roundup for April 2026",
  },
];

function assertDetailedBlogBody(post: BlogSummarySeed, content: string, faq: BlogSummary["faq"]): void {
  const headingCount = content
    .split("\n")
    .filter((line) => line.startsWith("## ")).length;
  const minCharacters = 600;
  const minHeadings = 5;
  const minFaqItems = 2;

  if (content.trim().length < minCharacters) {
    throw new Error(
      `Blog content too short for post id ${post.id} (${post.categorySlug}/${post.slug}). Expected at least ${minCharacters} characters.`
    );
  }

  if (headingCount < minHeadings) {
    throw new Error(
      `Blog content needs deeper structure for post id ${post.id} (${post.categorySlug}/${post.slug}). Expected at least ${minHeadings} sections.`
    );
  }

  if (faq.length < minFaqItems) {
    throw new Error(
      `Blog FAQ is incomplete for post id ${post.id} (${post.categorySlug}/${post.slug}). Expected at least ${minFaqItems} items.`
    );
  }
}

export const blogSummaries: BlogSummary[] = blogSummarySeed.map((post) => {
  const body = blogPostBodiesById[post.id];
  if (!body) {
    throw new Error(`Missing blog body for post id ${post.id} (${post.categorySlug}/${post.slug})`);
  }
  assertDetailedBlogBody(post, body.content, body.faq);
  return {
    ...post,
    content: body.content,
    faq: body.faq,
  };
});

export type CareerSummary = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  experience: string;
  salary: string;
};

export const careerSummaries: CareerSummary[] = careerDetails.map(
  ({ id, title, department, location, type, posted, experience, salary }) => ({
    id,
    title,
    department,
    location,
    type,
    posted,
    experience,
    salary,
  })
);
