import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Clock, ArrowLeft, ArrowRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { careerDetails } from "@/lib/careers-data";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return careerDetails.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = careerDetails.find((item) => item.slug === slug);
  if (!job) {
    return createPageMetadata({
      path: `/careers/${slug}`,
      title: "Job Not Found - Hiring Journey",
      description: "Career listing was not found.",
    });
  }
  return createPageMetadata({
    path: `/careers/${slug}`,
    title: `${job.title} - Careers | Hiring Journey`,
    description: `Join Hiring Journey as a ${job.title} in ${job.department}. ${job.location}`,
    keywords: [job.title, "hiring journey careers", "jobs in india"],
  });
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = careerDetails.find((item) => item.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <Link
          href="/careers"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {job.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {job.department}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {job.type}
            </span>
            <span>
              Posted {new Date(job.posted).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="whitespace-pre-line text-gray-600 dark:text-gray-300 leading-7">
            {job.description.split("\n").map((line: string, index: number) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                    {line.substring(3)}
                  </h2>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {line.substring(2)}
                  </li>
                );
              }
              if (line.trim() === "") {
                return <br key={index} />;
              }
              return (
                <p key={index} className="mb-4">
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/20 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ready to Apply?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Send your resume and cover letter to our careers team. We&apos;ll review your application and get back to
            you soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:careers@hiringjourney.com?subject=Application for ${job.title}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Apply Now
            </a>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white dark:bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View Other Positions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
