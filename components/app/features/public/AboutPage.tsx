import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-950 px-4">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">About</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
        Public about page.
      </p>
      <Link
        href="/app"
        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        Home
      </Link>
    </div>
  );
}
