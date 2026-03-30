"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, User, Clock } from "lucide-react";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogFilters } from "@/components/blog/blog-filters";
import { blogSummaries } from "@/lib/content-data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(blogSummaries.map((post) => post.category)));
    return ["All", ...unique.sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogSummaries
      .filter((post) => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch =
          searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const regularPosts = filteredPosts.slice(2);

  const getBlogHref = (post: (typeof blogSummaries)[number]) => {
    return `/blog/${post.categorySlug}/${post.slug}`;
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <BlogHero />
      <BlogFilters
        categories={categoryOptions}
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
                  href={getBlogHref(post)}
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
                        <Link href={getBlogHref(post)}>
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
                        href={getBlogHref(post)}
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
