import { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllApplications, updateApplicationStatus } from '../../../services/api';
import { Card, StatusBadge, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Button, Pagination, LoadingTable, SearchBar } from '../../../components/ui';
import type { Application } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

export default function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingAction, setPendingAction] = useState<{ id: number; status: Application['status'] } | null>(null);
  const itemsPerPage = 10;
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: applications, isLoading, isError } = useQuery({
    queryKey: ['admin-applications'],
    queryFn: getAllApplications,
  });

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    return applications.filter((app: Application) => {
      if (statusFilter && app.status !== statusFilter) return false;
      if (jobFilter && !app.jobTitle.toLowerCase().includes(jobFilter.toLowerCase())) return false;
      return true;
    });
  }, [applications, statusFilter, jobFilter]);

  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredApplications.slice(start, end);
  }, [filteredApplications, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const updateStatusMutation = useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: number; status: Application['status'] }) =>
      updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
      showToast('Application status updated.', 'success');
    },
    onError: () => {
      showToast('Failed to update application status.', 'error');
    },
    onSettled: () => {
      setPendingAction(null);
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Applications</h1>
          <p className="section-subtitle">View and manage all job applications</p>
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
            Failed to load applications
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Applications</h1>
        <p className="section-subtitle">View and manage all job applications</p>
      </div>

      <SearchBar
        placeholder="Search by job title..."
        onSearch={setJobFilter}
        filters={[
          {
            label: 'Status',
            key: 'status',
            options: [
              { value: '', label: 'All Statuses' },
              { value: 'applied', label: 'Applied' },
              { value: 'interview-scheduled', label: 'Interview Scheduled' },
              { value: 'interview-completed', label: 'Interview Completed' },
              { value: 'offer', label: 'Offer' },
              { value: 'rejected', label: 'Rejected' },
            ],
          },
        ]}
        onFilterChange={(key, value) => {
          if (key === 'status') setStatusFilter(value);
        }}
        className="mb-4"
      />

      <Card padding="none">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Candidate</TableHeader>
              <TableHeader>Job Title</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Resume Score</TableHeader>
              <TableHeader>Applied Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedApplications.map((app: Application) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{app.candidateName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {app.candidateId}</p>
                  </div>
                </TableCell>
                <TableCell>{app.jobTitle}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>{app.resumeScore || 'N/A'}</TableCell>
                <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        (setPendingAction({ id: app.id, status: 'offer' }),
                        updateStatusMutation.mutate({ applicationId: app.id, status: 'offer' }))
                      }
                      isLoading={updateStatusMutation.isPending && pendingAction?.id === app.id && pendingAction?.status === 'offer'}
                    >
                      Mark Offer
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        (setPendingAction({ id: app.id, status: 'rejected' }),
                        updateStatusMutation.mutate({ applicationId: app.id, status: 'rejected' }))
                      }
                      isLoading={updateStatusMutation.isPending && pendingAction?.id === app.id && pendingAction?.status === 'rejected'}
                    >
                      Reject
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
              totalItems={filteredApplications.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
