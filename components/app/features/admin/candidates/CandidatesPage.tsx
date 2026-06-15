import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCandidates, updateCandidateStatus, updateCredits } from '../../../services/api';
import { Card, StatusBadge, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Button, Input, Modal, Pagination, LoadingTable } from '../../../components/ui';
import ConfirmActionModal from '../../../components/ConfirmActionModal';
import { useToast } from '../../../contexts/ToastContext';
import { useInvalidateAdminData } from '../../../hooks/invalidateAdminQueries';
import { adminQueryKeys } from '@/lib/admin-query-keys';
import type { Candidate } from '../../../types';

export default function CandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [creditsAmount, setCreditsAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidateToSuspend, setCandidateToSuspend] = useState<Candidate | null>(null);
  const itemsPerPage = 10;
  const invalidateAdminData = useInvalidateAdminData();
  const { showToast } = useToast();

  const { data: candidates, isLoading, isError } = useQuery({
    queryKey: adminQueryKeys.candidates,
    queryFn: getCandidates,
  });

  const paginatedCandidates = useMemo(() => {
    if (!candidates) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return candidates.slice(start, end);
  }, [candidates, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((candidates?.length || 0) / itemsPerPage);

  const updateCreditsMutation = useMutation({
    mutationFn: ({ candidateId, credits }: { candidateId: number; credits: number }) =>
      updateCredits(candidateId, credits),
    onSuccess: () => {
      invalidateAdminData();
      setIsModalOpen(false);
      setSelectedCandidate(null);
      setCreditsAmount('');
      showToast('Credits updated successfully!', 'success');
    },
    onError: () => {
      showToast('Failed to update credits. Please try again.', 'error');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ candidateId, status }: { candidateId: number; status: 'active' | 'suspended' }) =>
      updateCandidateStatus(candidateId, status),
    onSuccess: () => {
      invalidateAdminData();
      showToast('Candidate status updated successfully!', 'success');
      setCandidateToSuspend(null);
    },
    onError: () => {
      showToast('Failed to update candidate status.', 'error');
    },
  });

  const handleAdjustCredits = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleSubmitCredits = () => {
    if (selectedCandidate && creditsAmount) {
      updateCreditsMutation.mutate({
        candidateId: selectedCandidate.id,
        credits: parseInt(creditsAmount),
      });
    }
  };

  const suspendTarget = candidateToSuspend;
  const suspendNextStatus = suspendTarget?.status === 'active' ? 'suspended' : 'active';

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Candidates</h1>
          <p className="section-subtitle">Manage all candidates</p>
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
            Failed to load candidates
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Candidates</h1>
        <p className="section-subtitle">Manage all candidates</p>
      </div>

      <Card padding="none">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Resume Score</TableHeader>
              <TableHeader>Credits Used</TableHeader>
              <TableHeader>Credits Total</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCandidates.map((candidate: Candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.resumeScore}</TableCell>
                <TableCell>{candidate.creditsUsed}</TableCell>
                <TableCell>{candidate.creditsTotal}</TableCell>
                <TableCell>
                  <StatusBadge status={candidate.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleAdjustCredits(candidate)}>
                      Adjust Credits
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCandidateToSuspend(candidate)}
                    >
                      {candidate.status === 'active' ? 'Suspend' : 'Activate'}
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
              totalItems={candidates?.length || 0}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCandidate(null);
          setCreditsAmount('');
        }}
        title="Adjust Credits"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitCredits} isLoading={updateCreditsMutation.isPending}>
              Update Credits
            </Button>
          </>
        }
      >
        {selectedCandidate && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adjusting credits for <strong>{selectedCandidate.name}</strong>
            </p>
            <Input
              label="New Credit Amount"
              type="number"
              value={creditsAmount}
              onChange={(e) => setCreditsAmount(e.target.value)}
              placeholder={selectedCandidate.creditsTotal.toString()}
            />
          </div>
        )}
      </Modal>

      <ConfirmActionModal
        isOpen={suspendTarget != null}
        title={suspendNextStatus === 'suspended' ? 'Suspend candidate?' : 'Activate candidate?'}
        description={
          suspendTarget
            ? suspendNextStatus === 'suspended'
              ? `Suspend ${suspendTarget.name}? They will lose access to candidate features until reactivated.`
              : `Reactivate ${suspendTarget.name}? They will regain access to candidate features.`
            : ''
        }
        confirmLabel={suspendNextStatus === 'suspended' ? 'Suspend' : 'Activate'}
        variant={suspendNextStatus === 'suspended' ? 'danger' : 'primary'}
        isLoading={updateStatusMutation.isPending}
        onClose={() => setCandidateToSuspend(null)}
        onConfirm={() => {
          if (suspendTarget) {
            updateStatusMutation.mutate({
              candidateId: suspendTarget.id,
              status: suspendNextStatus,
            });
          }
        }}
      />
    </div>
  );
}
