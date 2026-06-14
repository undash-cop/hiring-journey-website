import { Card } from './ui';

export default function FeatureUnavailable({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="p-6 sm:p-8 text-center max-w-lg mx-auto">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description ?? 'This feature is not available yet. Check back soon.'}
        </p>
      </Card>
    </div>
  );
}
