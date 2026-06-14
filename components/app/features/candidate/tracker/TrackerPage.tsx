import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getApplications } from '../../../services/api';
import { Card, StatusBadge, Select, Pagination, LoadingCard, Button } from '../../../components/ui';
import { PageEmptyState, PageErrorState } from '../../../components/QueryStateViews';
import Link from 'next/link';
import { queryKeys } from '@/lib/query-keys';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Application } from '../../../types';

const statusOrder = ['applied', 'interview-scheduled', 'interview-completed', 'offer', 'rejected'];
const COLORS = ['#0ea5e9', '#f59e0b', '#6366f1', '#10b981', '#ef4444'];

export default function TrackerPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: applications, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.applications,
    queryFn: getApplications,
  });

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    return applications.filter((app: Application) => {
      if (statusFilter === 'all') return true;
      return app.status === statusFilter;
    });
  }, [applications, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / itemsPerPage));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedApplications = useMemo(() => {
    const start = (effectivePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredApplications.slice(start, end);
  }, [filteredApplications, effectivePage, itemsPerPage]);

  const statusCounts = applications?.reduce((acc: Record<string, number>, app: Application) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {}) || {};

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.replace('-', ' '),
    value: count,
  }));

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Application Tracker</h1>
          <p className="section-subtitle">Track your entire application journey</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <PageErrorState
        title="Failed to load applications"
        message={error instanceof Error ? error.message : 'Please try again later'}
        onRetry={() => queryClient.invalidateQueries({ queryKey: queryKeys.applications })}
      />
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Application Tracker</h1>
        <p className="section-subtitle">Track your entire application journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{applications?.length || 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400">Interviews</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {applications?.filter((a: Application) => a.status.includes('interview')).length || 0}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400">Offers</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {applications?.filter((a: Application) => a.status === 'offer').length || 0}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {applications && applications.length > 0
              ? Math.round((applications.filter((a: Application) => a.status === 'offer').length / applications.length) * 100)
              : 0}%
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Applications</h2>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'applied', label: 'Applied' },
                { value: 'interview-scheduled', label: 'Interview Scheduled' },
                { value: 'interview-completed', label: 'Interview Completed' },
                { value: 'offer', label: 'Offer' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
          </div>
          <div className="space-y-4">
        {paginatedApplications.length === 0 ? (
          <PageEmptyState
            title="No applications yet"
            description={
              statusFilter === 'all'
                ? 'Browse jobs and apply to start tracking your hiring journey.'
                : 'No applications match this status filter.'
            }
            action={
              statusFilter === 'all' ? (
                <Link href="/app/jobs">
                  <Button>Browse Jobs</Button>
                </Link>
              ) : undefined
            }
          />
        ) : paginatedApplications.map((app: Application) => {
          const statusIndex = statusOrder.indexOf(app.status);
          return (
            <Card key={app.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{app.jobTitle}</h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                  </p>

                  <div className="flex items-center gap-2">
                    {statusOrder.map((status, index) => (
                      <div key={status} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            index <= statusIndex
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < statusOrder.length - 1 && (
                          <div
                            className={`w-12 h-1 ${
                              index < statusIndex ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Applied</span>
                    <span>Interview Scheduled</span>
                    <span>Interview Done</span>
                    <span>Offer</span>
                    <span>Rejected</span>
                  </div>
                  {app.interviewDate && (
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Interview scheduled: {new Date(app.interviewDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {app.resumeScore && (
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resume Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{app.resumeScore}</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
          </div>
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={effectivePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredApplications.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
