import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../../../services/api';
import { Card } from '../../../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAdminStats,
  });

  if (isLoading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  if (!data) return null;

  const funnelData = [
    { name: 'Applied', value: data.funnel.applied },
    { name: 'Interview Scheduled', value: data.funnel.interviewScheduled },
    { name: 'Interview Completed', value: data.funnel.interviewCompleted },
    { name: 'Offer', value: data.funnel.offer },
  ];

  const conversionRates = [
    {
      stage: 'Applied → Interview',
      rate: ((data.funnel.interviewScheduled / data.funnel.applied) * 100).toFixed(1),
    },
    {
      stage: 'Interview → Completed',
      rate: ((data.funnel.interviewCompleted / data.funnel.interviewScheduled) * 100).toFixed(1),
    },
    {
      stage: 'Completed → Offer',
      rate: ((data.funnel.offer / data.funnel.interviewCompleted) * 100).toFixed(1),
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Detailed analytics and insights</p>
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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Conversion Rates</h2>
          <div className="space-y-4">
            {conversionRates.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.stage}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.rate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.jobPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jobTitle" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="#0ea5e9" name="Applications" />
            <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Credit Usage Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.creditUsage.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Credits Used</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {((data.creditUsage / (data.totalCandidates * 200)) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Usage Rate</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {(data.creditUsage / data.totalCandidates).toFixed(0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Credits per Candidate</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
