import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../../../services/api';
import { Card } from '../../../components/ui';
import { PageErrorState } from '../../../components/QueryStateViews';
import { adminQueryKeys } from '@/lib/admin-query-keys';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminDashboard() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: adminQueryKeys.stats,
    queryFn: getAdminStats,
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <PageErrorState
        title="Failed to load dashboard"
        message="We could not load admin statistics. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data) return null;

  const funnelData = [
    { name: 'Applied', value: data.funnel.applied, fill: COLORS[0] },
    { name: 'Interview Scheduled', value: data.funnel.interviewScheduled, fill: COLORS[1] },
    { name: 'Interview Completed', value: data.funnel.interviewCompleted, fill: COLORS[2] },
    { name: 'Offer', value: data.funnel.offer, fill: COLORS[3] },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Overview of your hiring platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Candidates</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.totalCandidates.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Jobs</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.activeJobs}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Applications</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.applications.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">AI Credit Usage</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.creditUsage.toLocaleString()}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Hiring Funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9">
                {funnelData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#0ea5e9', '#0284c7', '#0369a1', '#075985'][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.jobPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jobTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#0ea5e9" />
              <Bar dataKey="conversions" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
