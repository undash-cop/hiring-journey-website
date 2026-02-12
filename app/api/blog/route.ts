import { NextResponse } from "next/server";

// Mock blog posts - Replace with database queries
const blogPosts = [
  {
    id: 1,
    title: "How AI Resume Analyzers Are Revolutionizing Job Applications in 2026",
    excerpt:
      "Discover how AI-powered resume analysis tools are helping candidates optimize their resumes for ATS systems and land more interviews in India's competitive job market.",
    author: "Hiring Journey Team",
    date: "2026-02-08",
    category: "AI & Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    imageAlt: "AI analyzing resume documents",
  },
  {
    id: 2,
    title: "AI Mock Interviews: The Future of Interview Preparation",
    excerpt:
      "Learn how AI-powered mock interview platforms are transforming interview prep, providing instant feedback and personalized coaching for technical and HR rounds.",
    author: "Hiring Journey Team",
    date: "2026-02-01",
    category: "AI & Technology",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    imageAlt: "AI-powered interview preparation",
  },
  {
    id: 3,
    title: "Smart Job Matching: How AI Finds Your Perfect Role",
    excerpt:
      "Explore how machine learning algorithms analyze your skills, experience, and preferences to match you with the right opportunities in India's tech sector.",
    author: "Hiring Journey Team",
    date: "2026-01-25",
    category: "AI & Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imageAlt: "AI job matching technology",
  },
  {
    id: 4,
    title: "AI-Powered Auto-Apply: Streamlining Your Job Search",
    excerpt:
      "Understand how intelligent automation is helping candidates apply to multiple positions efficiently while maintaining personalized application quality.",
    author: "Hiring Journey Team",
    date: "2026-01-18",
    category: "AI & Technology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    imageAlt: "Automated job application process",
  },
];

export async function GET() {
  return NextResponse.json({ posts: blogPosts });
}
