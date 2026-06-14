import type { ReactNode } from "react";
import { Button } from "./ui";

export function PageErrorState({
  title,
  message,
  onRetry,
}: {
  title: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="card p-6 sm:p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h2>
        {message ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>
        ) : null}
        {onRetry ? (
          <Button onClick={onRetry}>Try Again</Button>
        ) : null}
      </div>
    </div>
  );
}

export function PageEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="card p-8 text-center">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
