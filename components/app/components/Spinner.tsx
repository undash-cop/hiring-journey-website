export function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
