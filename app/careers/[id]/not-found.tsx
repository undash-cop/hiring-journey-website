import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";

export default function CareerNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="text-center">
        <Briefcase className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Job Opening Not Found</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This job opening doesn&apos;t exist or has been filled.
        </p>
        <div className="mt-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    </div>
  );
}
