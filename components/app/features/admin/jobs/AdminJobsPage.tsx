import { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { closeJob, getAdminJobs } from '../../../services/api';
import { Card, Button, StatusBadge, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Pagination, LoadingTable } from '../../../components/ui';
import type { Job } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

export default function AdminJobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [closingJobId, setClosingJobId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: getAdminJobs,
  });

  const paginatedJobs = useMemo(() => {
    if (!jobs) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return jobs.slice(start, end);
  }, [jobs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((jobs?.length || 0) / itemsPerPage);

  const closeJobMutation = useMutation({
    mutationFn: closeJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      showToast('Job closed successfully.', 'success');
    },
    onError: () => {
      showToast('Failed to close job.', 'error');
    },
    onSettled: () => {
      setClosingJobId(null);
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Job Management</h1>
          <p className="section-subtitle">Manage all job postings</p>
        </div>
        <LoadingTable rows={5} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <div className="card p-8 text-center">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Failed to load jobs
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="section-title">Job Management</h1>
          <p className="section-subtitle">Manage all job postings</p>
        </div>
        <Button className="w-full sm:w-auto">Create New Job</Button>
      </div>

      <Card padding="none">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Applicants</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobs.map((job: Job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{job.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{job.employmentType}</p>
                  </div>
                </TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <StatusBadge status={job.status} />
                </TableCell>
                <TableCell>{job.applicantCount || 0}</TableCell>
                <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setClosingJobId(job.id);
                        closeJobMutation.mutate(job.id);
                      }}
                      isLoading={closeJobMutation.isPending && closingJobId === job.id}
                    >
                      Close
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={jobs?.length || 0}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
