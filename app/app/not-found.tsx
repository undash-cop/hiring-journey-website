import Link from "next/link";

export default function AppNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">App page not found</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The requested app route does not exist.
        </p>
        <Link href="/app" className="mt-6 inline-block text-sm font-medium text-primary-600">
          Go to app home
        </Link>
      </div>
    </div>
  );
}
