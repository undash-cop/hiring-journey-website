import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-gray-950 px-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Hiring Journey
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
        Public home. Sign in to access the app.
      </p>
      <div className="flex gap-4">
        <Link
          href="/app/about"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          About
        </Link>
        <Link
          href="/app/login"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
