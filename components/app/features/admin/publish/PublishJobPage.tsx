'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAdminJob, publishJob, updateAdminJob } from '../../../services/api';
import { Card, Button, Input, Select } from '../../../components/ui';
import { useToast } from '../../../contexts/ToastContext';
import { useInvalidateAdminData } from '../../../hooks/invalidateAdminQueries';
import { adminQueryKeys } from '@/lib/admin-query-keys';
import type { Job, PublishJobData } from '../../../types';

const emptyForm = {
  title: '',
  description: '',
  skills: '',
  location: '',
  salaryMin: '',
  salaryMax: '',
  employmentType: '',
  publishTo: [] as string[],
};

function jobToForm(job: Job) {
  return {
    title: job.title,
    description: job.description,
    skills: job.skills.join(', '),
    location: job.location,
    salaryMin: String(job.salaryRange.min),
    salaryMax: String(job.salaryRange.max),
    employmentType: job.employmentType,
    publishTo: ['internal'] as string[],
  };
}

function formToPayload(formData: typeof emptyForm, status: 'draft' | 'published'): PublishJobData {
  return {
    title: formData.title,
    description: formData.description,
    skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
    location: formData.location,
    salaryRange: {
      min: parseInt(formData.salaryMin, 10),
      max: parseInt(formData.salaryMax, 10),
    },
    employmentType: formData.employmentType as PublishJobData['employmentType'],
    publishTo: formData.publishTo as PublishJobData['publishTo'],
    status,
  };
}

type JobFormState = typeof emptyForm;

function PublishJobForm({
  initialForm,
  isEditMode,
  editJobId,
  existingJobStatus,
}: {
  initialForm: JobFormState;
  isEditMode: boolean;
  editJobId: number | null;
  existingJobStatus?: Job['status'];
}) {
  const { showToast } = useToast();
  const invalidateAdminData = useInvalidateAdminData();
  const [formData, setFormData] = useState(initialForm);

  const publishMutation = useMutation({
    mutationFn: publishJob,
    onSuccess: (data, variables) => {
      if (variables.status === 'draft') {
        showToast('Job saved as draft.', 'success');
      } else {
        const linkedin = data.externalPostingIds?.linkedin ?? 'N/A';
        const indeed = data.externalPostingIds?.indeed ?? 'N/A';
        showToast(`Job published (LinkedIn: ${linkedin}, Indeed: ${indeed})`, 'success');
      }
      invalidateAdminData();
      if (!isEditMode) {
        setFormData(emptyForm);
      }
    },
    onError: () => {
      showToast('Failed to save job. Please try again.', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ status }: { status: 'draft' | 'published' }) =>
      updateAdminJob(editJobId!, { ...formToPayload(formData, status), status }),
    onSuccess: (_, variables) => {
      showToast(
        variables.status === 'draft' ? 'Draft updated.' : 'Job updated and published.',
        'success',
      );
      invalidateAdminData();
    },
    onError: () => {
      showToast('Failed to update job. Please try again.', 'error');
    },
  });

  const handlePublishToChange = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      publishTo: prev.publishTo.includes(platform)
        ? prev.publishTo.filter((p) => p !== platform)
        : [...prev.publishTo, platform],
    }));
  };

  const handleSaveDraft = () => {
    const payload = formToPayload(formData, 'draft');
    if (isEditMode) {
      updateMutation.mutate({ status: 'draft' });
      return;
    }
    publishMutation.mutate(payload);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = formToPayload(formData, 'published');
    if (isEditMode) {
      updateMutation.mutate({ status: 'published' });
      return;
    }
    publishMutation.mutate(payload);
  };

  const isSaving = publishMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit}>
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Details</h2>
          <div className="space-y-4">
            <Input
              label="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Senior Frontend Developer"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Job description..."
              />
            </div>
            <Input
              label="Required Skills (comma-separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
              placeholder="React, TypeScript, Node.js"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="San Francisco, CA or Remote"
              />
              <Select
                label="Employment Type"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                required
                options={[
                  { value: '', label: 'Select type' },
                  { value: 'full-time', label: 'Full-time' },
                  { value: 'part-time', label: 'Part-time' },
                  { value: 'contract', label: 'Contract' },
                  { value: 'internship', label: 'Internship' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Salary Min (₹)"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                required
                placeholder="1000000"
              />
              <Input
                label="Salary Max (₹)"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                required
                placeholder="1500000"
              />
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Publish To</h2>
          <div className="space-y-3">
            {['internal', 'linkedin', 'indeed'].map((platform) => (
              <label key={platform} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.publishTo.includes(platform)}
                  onChange={() => handlePublishToChange(platform)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </Card>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={handleSaveDraft} isLoading={isSaving}>
            Save as Draft
          </Button>
          <Button type="submit" isLoading={isSaving}>
            {isEditMode && existingJobStatus === 'draft' ? 'Publish Job' : isEditMode ? 'Save Changes' : 'Publish Job'}
          </Button>
        </div>
    </form>
  );
}

export default function PublishJobPage() {
  const searchParams = useSearchParams();
  const jobIdParam = searchParams.get('jobId');
  const editJobId = jobIdParam ? Number(jobIdParam) : null;
  const isEditMode = editJobId != null && !Number.isNaN(editJobId);

  const { data: existingJob, isLoading: isLoadingJob } = useQuery({
    queryKey: [...adminQueryKeys.jobs, editJobId],
    queryFn: () => getAdminJob(editJobId!),
    enabled: isEditMode,
  });

  if (isEditMode && isLoadingJob) {
    return <div className="p-4 sm:p-6">Loading job...</div>;
  }

  const formKey = isEditMode && existingJob ? String(existingJob.id) : 'new';
  const initialForm = existingJob ? jobToForm(existingJob) : emptyForm;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold gradient-text">
          {isEditMode ? 'Edit Job' : 'Publish Job'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {isEditMode ? 'Update an existing job posting' : 'Create and publish a new job posting'}
        </p>
      </div>

      <PublishJobForm
        key={formKey}
        initialForm={initialForm}
        isEditMode={isEditMode}
        editJobId={editJobId}
        existingJobStatus={existingJob?.status}
      />
    </div>
  );
}
