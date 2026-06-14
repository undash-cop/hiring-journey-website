import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobs, applyToJob } from '../../../services/api';
import { Card, Button, Badge, Select, SearchBar, LoadingCard, Pagination } from '../../../components/ui';
import { PageErrorState } from '../../../components/QueryStateViews';
import { useInvalidateApplicationData } from '../../../hooks/invalidateCandidateQueries';
import { queryKeys } from '@/lib/query-keys';
import { useToast } from '../../../contexts/ToastContext';
import { formatIndianCurrencyRange } from '../../../utils/currency';
import { getRelativeTime } from '../../../utils/date';
import type { Job } from '../../../types';

const jobBoardColors: Record<string, string> = {
  linkedin: 'bg-blue-600',
  indeed: 'bg-blue-500',
  naukri: 'bg-green-600',
  glassdoor: 'bg-green-500',
  monster: 'bg-purple-600',
  shine: 'bg-orange-600',
  timesjobs: 'bg-red-600',
  internal: 'bg-gray-600',
};

const jobBoardLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  indeed: 'Indeed',
  naukri: 'Naukri',
  glassdoor: 'Glassdoor',
  monster: 'Monster',
  shine: 'Shine',
  timesjobs: 'TimesJobs',
  internal: 'Internal',
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [sortBy, setSortBy] = useState('best-match');
  const [salaryRange, setSalaryRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const itemsPerPage = 10;
  const queryClient = useQueryClient();
  const invalidateApplicationData = useInvalidateApplicationData();
  const { showToast } = useToast();

  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.jobs,
    queryFn: getJobs,
  });

  const applyMutation = useMutation({
    mutationFn: applyToJob,
    onSuccess: () => {
      invalidateApplicationData();
      showToast('Application submitted successfully!', 'success');
    },
    onError: (err: unknown) => {
      const status =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      const message =
        status === 402
          ? 'Not enough credits to apply. Visit Credits to review your balance.'
          : status === 409
            ? 'You have already applied to this job.'
            : 'Failed to apply. Please try again.';
      showToast(message, 'error');
    },
  });

  const bulkApplyMutation = useMutation({
    mutationFn: async (jobIds: number[]) => {
      const results = await Promise.allSettled(
        jobIds.map((id) => applyToJob(id))
      );
      return results;
    },
    onSuccess: (results) => {
      const successful = results.filter((r) => r.status === 'fulfilled').length;
      const failed = results.filter((r) => r.status === 'rejected').length;
      invalidateApplicationData();
      setSelectedJobs(new Set());
      setShowBulkActions(false);
      if (successful > 0) {
        showToast(`Successfully applied to ${successful} job${successful > 1 ? 's' : ''}!`, 'success');
      }
      if (failed > 0) {
        showToast(`${failed} application${failed > 1 ? 's' : ''} failed`, 'warning');
      }
    },
  });

  const handleApply = (job: Job) => {
    if (job.source === 'internal') {
      applyMutation.mutate(job.id);
    } else if (job.externalUrl) {
      window.open(job.externalUrl, '_blank');
      showToast('Opening job posting...', 'info');
    }
  };

  const handleSelectJob = (jobId: number) => {
    const newSelected = new Set(selectedJobs);
    if (newSelected.has(jobId)) {
      newSelected.delete(jobId);
    } else {
      newSelected.add(jobId);
    }
    setSelectedJobs(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedJobs.size === paginatedJobs.length) {
      setSelectedJobs(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedJobs(new Set(paginatedJobs.map((j) => j.id)));
      setShowBulkActions(true);
    }
  };

  const handleBulkApply = () => {
    const internalJobs = Array.from(selectedJobs).filter((id) => {
      const job = jobs?.find((j) => j.id === id);
      return job?.source === 'internal';
    });
    if (internalJobs.length === 0) {
      showToast('Selected jobs are from external sources. Please apply manually.', 'info');
      return;
    }
    bulkApplyMutation.mutate(internalJobs);
  };

  const handleSaveJob = (jobId: number) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
      showToast('Job removed from saved', 'info');
    } else {
      newSaved.add(jobId);
      showToast('Job saved successfully', 'success');
    }
    setSavedJobs(newSaved);
  };

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    const filtered = jobs
      .filter((job: Job) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesSearch =
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.company?.toLowerCase().includes(query) ||
            job.skills.some((skill) => skill.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        // Location filter
        if (locationFilter && job.location.toLowerCase() !== locationFilter.toLowerCase()) {
          return false;
        }

        // Type filter
        if (typeFilter && job.employmentType !== typeFilter) {
          return false;
        }

        // Source filter
        if (sourceFilter && job.source !== sourceFilter) {
          return false;
        }

        // Salary filter
        if (salaryRange.min && job.salaryRange.max < parseInt(salaryRange.min)) {
          return false;
        }
        if (salaryRange.max && job.salaryRange.min > parseInt(salaryRange.max)) {
          return false;
        }

        // Hide jobs without source in candidate view
        if (!sourceFilter && !job.source) {
          return false;
        }

        return true;
      })
      .sort((a: Job, b: Job) => {
        if (sortBy === 'best-match') {
          return (b.skillMatch || 0) - (a.skillMatch || 0);
        } else if (sortBy === 'salary-high') {
          return b.salaryRange.max - a.salaryRange.max;
        } else if (sortBy === 'salary-low') {
          return a.salaryRange.min - b.salaryRange.min;
        } else if (sortBy === 'recent') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });

    return filtered;
  }, [jobs, searchQuery, locationFilter, typeFilter, sourceFilter, salaryRange, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div>
          <h1 className="section-title">Job Discovery</h1>
          <p className="section-subtitle">AI-powered smart job matching</p>
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
        title="Failed to load jobs"
        message={error instanceof Error ? error.message : 'An error occurred'}
        onRetry={() => queryClient.invalidateQueries({ queryKey: queryKeys.jobs })}
      />
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="section-title">Job Discovery</h1>
        <p className="section-subtitle">AI-powered smart job matching</p>
      </div>

      <SearchBar
        placeholder="Search jobs by title, skills, company..."
        onSearch={setSearchQuery}
        filters={[
          {
            label: 'Location',
            key: 'location',
            options: [
              { value: '', label: 'All Locations' },
              { value: 'remote', label: 'Remote' },
              { value: 'bangalore', label: 'Bangalore' },
              { value: 'mumbai', label: 'Mumbai' },
              { value: 'delhi', label: 'Delhi' },
              { value: 'hyderabad', label: 'Hyderabad' },
              { value: 'pune', label: 'Pune' },
              { value: 'chennai', label: 'Chennai' },
            ],
          },
          {
            label: 'Type',
            key: 'type',
            options: [
              { value: '', label: 'All Types' },
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'internship', label: 'Internship' },
            ],
          },
          {
            label: 'Source',
            key: 'source',
            options: [
              { value: '', label: 'All Sources' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'indeed', label: 'Indeed' },
              { value: 'naukri', label: 'Naukri' },
              { value: 'glassdoor', label: 'Glassdoor' },
              { value: 'monster', label: 'Monster' },
              { value: 'shine', label: 'Shine' },
              { value: 'timesjobs', label: 'TimesJobs' },
              { value: 'internal', label: 'Internal' },
            ],
          },
        ]}
        onFilterChange={(key, value) => {
          if (key === 'location') setLocationFilter(value);
          if (key === 'type') setTypeFilter(value);
          if (key === 'source') setSourceFilter(value);
        }}
        className="mb-4"
      />

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            { value: 'best-match', label: 'Sort: Best Match' },
            { value: 'salary-high', label: 'Sort: Salary (High to Low)' },
            { value: 'salary-low', label: 'Sort: Salary (Low to High)' },
            { value: 'recent', label: 'Sort: Recent' },
          ]}
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Salary"
            value={salaryRange.min}
            onChange={(e) => setSalaryRange((prev) => ({ ...prev, min: e.target.value }))}
            className="px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent w-32"
          />
          <input
            type="number"
            placeholder="Max Salary"
            value={salaryRange.max}
            onChange={(e) => setSalaryRange((prev) => ({ ...prev, max: e.target.value }))}
            className="px-2.5 py-1.5 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent w-32"
          />
        </div>
      </div>

      {filteredJobs && filteredJobs.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Found <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredJobs.length}</span> jobs
              </p>
              {showBulkActions && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedJobs.size} selected
                  </span>
                  <Button
                    size="sm"
                    onClick={handleBulkApply}
                    isLoading={bulkApplyMutation.isPending}
                  >
                    Apply to {selectedJobs.size} Jobs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedJobs(new Set());
                      setShowBulkActions(false);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
            <button
              onClick={handleSelectAll}
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              {selectedJobs.size === paginatedJobs.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {paginatedJobs.map((job: Job) => (
            <Card key={job.id} className={`hover:shadow-md transition-shadow ${selectedJobs.has(job.id) ? 'ring-2 ring-gray-900 dark:ring-gray-100' : ''}`}>
              <div className="flex gap-4">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <span className="text-lg font-semibold text-gray-400 dark:text-gray-600">
                        {job.company?.charAt(0).toUpperCase() || 'J'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Job Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {job.title}
                        </h3>
                        {job.skillMatch && job.skillMatch >= 80 && (
                          <Badge variant="success" className="text-[10px]">
                            {job.skillMatch}% Match
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {job.company}
                        </p>
                        {job.source && (
                          <Badge
                            variant="info"
                            className={`text-[10px] ${jobBoardColors[job.source] || 'bg-gray-600'} text-white`}
                          >
                            {jobBoardLabels[job.source] || job.source}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatIndianCurrencyRange(job.salaryRange.min, job.salaryRange.max)}
                        </span>
                        {job.experienceRequired && (
                          <>
                            <span>•</span>
                            <span>{job.experienceRequired}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                      </div>
                      {job.postedDate && (
                        <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-2">
                          Posted {getRelativeTime(job.postedDate)}
                        </p>
                      )}
                      {job.companySize && (
                        <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-2">
                          {job.companySize}
                          {job.companyIndustry && ` • ${job.companyIndustry}`}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {job.skills.slice(0, 6).map((skill) => (
                          <Badge key={skill} variant="info" className="text-[10px]">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 6 && (
                          <Badge variant="default" className="text-[10px]">
                            +{job.skills.length - 6} more
                          </Badge>
                        )}
                      </div>
                      {job.views !== undefined && job.applicants !== undefined && (
                        <div className="flex items-center gap-4 text-[10px] text-gray-500 dark:text-gray-500">
                          <span>{job.views} views</span>
                          <span>•</span>
                          <span>{job.applicants} applicants</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedJobs.has(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          className="w-3 h-3 rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-100"
                        />
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title={savedJobs.has(job.id) ? 'Unsave job' : 'Save job'}
                        >
                          <svg
                            className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-current text-yellow-500' : 'text-gray-400'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                      </div>
                      <Button
                        onClick={() => handleApply(job)}
                        isLoading={applyMutation.isPending && job.source === 'internal'}
                        size="sm"
                        className="w-full sm:w-auto min-w-[100px]"
                      >
                        {job.source === 'internal' ? 'Apply Now' : job.source ? 'View on ' + jobBoardLabels[job.source] : 'Apply Now'}
                      </Button>
                      {job.source && job.source !== 'internal' && job.externalUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(job.externalUrl, '_blank')}
                          className="w-full sm:w-auto"
                        >
                          Open Original
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredJobs.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No jobs found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
