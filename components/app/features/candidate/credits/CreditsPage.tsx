import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCreditUsage } from '../../../services/api';
import { Card, LoadingCard } from '../../../components/ui';
import { PageErrorState } from '../../../components/QueryStateViews';
import { queryKeys } from '@/lib/query-keys';

export default function CreditsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.creditUsage,
    queryFn: getCreditUsage,
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Credits / Usage</h1>
          <p className="section-subtitle">Manage your AI credits</p>
        </div>
        <LoadingCard />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <PageErrorState
        title="Failed to load credits"
        message={error instanceof Error ? error.message : 'Please try again later'}
        onRetry={() => queryClient.invalidateQueries({ queryKey: queryKeys.creditUsage })}
      />
    );
  }

  const usagePercentage = data.total > 0 ? (data.used / data.total) * 100 : 0;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Credits / Usage</h1>
        <p className="section-subtitle">Manage your AI credits</p>
      </div>

      {/* Main Stats */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Remaining Credits</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {data.remaining}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Credits</p>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                {data.total}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Usage</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {data.used} / {data.total}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 dark:bg-gray-100 transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Usage Breakdown */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Usage Breakdown
        </h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-600 dark:text-gray-400">Resume Optimization</span>
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {data.breakdown.resumeOptimization}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-600 dark:text-gray-400">Interview Prep</span>
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {data.breakdown.interviewPrep}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-600 dark:text-gray-400">Auto-Apply</span>
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {data.breakdown.autoApply}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Negotiation</span>
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {data.breakdown.negotiation}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
