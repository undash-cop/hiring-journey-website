"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, User, Clock } from "lucide-react";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogFilters } from "@/components/blog/blog-filters";

// Mock blog posts - Replace with API calls
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
    featured: true,
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
    featured: true,
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
    featured: false,
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
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    imageAlt: "Automated job application process",
  },
  {
    id: 5,
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
    title: "AI Credit Systems: Understanding Usage-Based Pricing in Career Platforms",
    excerpt:
      "Learn how AI credit systems work, why they're cost-effective for job seekers, and how to maximize your credits for resume fixes, interviews, and applications.",
    author: "Hiring Journey Team",
    date: "2026-01-05",
    category: "AI & Technology",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imageAlt: "AI credit system dashboard",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="bg-white dark:bg-gray-950">
      <BlogHero />
      <BlogFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group relative flex flex-col rounded-2xl bg-white dark:bg-gray-950 overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="relative z-10 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-medium text-white">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-x-4 text-xs mb-3">
                      <time dateTime={post.date} className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="text-2xl font-display font-bold leading-6 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3">
                      {post.title}
                    </h3>
                    <p className="text-base leading-6 text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">All Articles</h2>
            <div className="space-y-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative isolate flex flex-col gap-8 lg:flex-row rounded-2xl bg-white dark:bg-gray-950 ring-1 ring-gray-200 dark:ring-gray-800 p-6 hover:ring-primary-500 dark:hover:ring-primary-400 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 256px"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl">📝</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4 text-xs mb-3">
                      <time dateTime={post.date} className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="relative z-10 rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 font-medium text-primary-600 dark:text-primary-400">
                        {post.category}
                      </span>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="text-xl font-display font-bold leading-6 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3">
                        <Link href={`/blog/${post.id}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-base leading-6 text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
                      <div className="relative flex items-center gap-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 dark:text-gray-400">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-2">Stay Updated</h3>
          <p className="text-primary-100 mb-6">Get the latest career tips and job market insights delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
