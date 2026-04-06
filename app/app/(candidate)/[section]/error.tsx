"use client";

export default function CandidateSectionError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Could not load this app page.</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-md bg-gray-900 px-3 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900"
      >
        Retry
      </button>
    </div>
  );
}
