import { useQuery } from '@tanstack/react-query';
import { getCandidateDashboard } from '../../../services/api';
import { Card, LoadingCard } from '../../../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CandidateDashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['candidate-dashboard'],
    queryFn: getCandidateDashboard,
  });

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
        <div>
          <h1 className="section-title text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="section-subtitle mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Welcome back! Here&apos;s your hiring journey overview.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="card p-6 sm:p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Failed to load dashboard</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="section-title text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="section-subtitle mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Welcome back! Here&apos;s your hiring journey overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Resume Score</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.resumeScore}</p>
            </div>
            <div className="w-9 h-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">AI Credits</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.creditsRemaining}</p>
            </div>
            <div className="w-9 h-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Applications</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.applicationsCount}</p>
            </div>
            <div className="w-9 h-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Interviews</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.interviewsCount}</p>
            </div>
            <div className="w-9 h-9 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Applications Trend</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.applicationsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'offer' ? 'bg-green-500' :
                  activity.type === 'interview' ? 'bg-blue-500' :
                  activity.type === 'rejection' ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100">{activity.message}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
