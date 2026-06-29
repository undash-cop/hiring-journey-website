import {
  AdminApi,
  ApplicationsApi,
  Configuration as GeneratedApiConfiguration,
  DashboardApi,
  JobsApi,
  SettingsApi,
  UsersApi,
} from '@/lib/generated/api-client';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type {
  DashboardStats,
  Job,
  Application,
  ResumeData,
  CreditUsage,
  AdminStats,
  PublishJobData,
  PublishJobResponse,
  Candidate,
  Plan,
  PlatformSettings,
  CreatePlanData,
  UpdatePlanData,
  LegalDocument,
  CodingChallenge,
  CodingChallengeDetail,
  CodingSubmitResult,
  NegotiationFramework,
  UserProfile,
  UserSettings,
  PaginatedResponse,
  AutoApplyProfile,
  BulkApplyRequest,
  ParsedResume,
  ResumeAnalysis,
  ResumeVersion,
  ResumeTemplate,
  ResumeBuilderData,
  AdminAuditLog,
  BillingPlan,
  UserSubscription,
  BillingInvoice,
  CheckoutSession,
} from '../types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:8000';

/** Phase 2+ demo data — set NEXT_PUBLIC_USE_MOCK_API=true for local demos only. */
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function requireMockApi(feature: string): void {
  if (!USE_MOCK_API) {
    throw new Error(
      `${feature} is not available via the API yet. Set NEXT_PUBLIC_USE_MOCK_API=true for local demos only.`,
    );
  }
}

function getAccessToken(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  const fromStore = useAuthStore.getState().token;
  if (fromStore) {
    return fromStore;
  }
  const authStorage = window.localStorage.getItem('auth-storage');
  if (!authStorage) {
    return '';
  }
  try {
    const parsed = JSON.parse(authStorage);
    return parsed?.state?.token ?? '';
  } catch {
    return '';
  }
}

async function apiRequest<T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  body?: unknown,
): Promise<T> {
  const token = getAccessToken();
  const { data } = await axios.request<T>({
    method,
    url: `${API_BASE_URL}${path}`,
    data: body,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}

type ResumeSummaryApiResponse = {
  score: number;
  suggestions: string[];
  last_updated: string;
  target_role?: string | null;
  role_specific_score?: number | null;
  ats_score: number;
  keyword_match: number;
  skills_gap: string[];
};

const generatedApiConfig = new GeneratedApiConfiguration({
  basePath: API_BASE_URL,
  accessToken: () => {
    if (typeof window === 'undefined') {
      return '';
    }
    const fromStore = useAuthStore.getState().token;
    if (fromStore) {
      return fromStore;
    }
    const authStorage = window.localStorage.getItem('auth-storage');
    if (!authStorage) {
      return '';
    }
    try {
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.token ?? '';
    } catch {
      return '';
    }
  },
});

const jobsApi = new JobsApi(generatedApiConfig);
const applicationsApi = new ApplicationsApi(generatedApiConfig);
const usersApi = new UsersApi(generatedApiConfig);
const dashboardApi = new DashboardApi(generatedApiConfig);
const settingsApi = new SettingsApi(generatedApiConfig);
const adminApi = new AdminApi(generatedApiConfig);

const toFrontendApplicationStatus = (
  status: string,
): Application['status'] => {
  switch (status) {
    case 'interview-scheduled':
    case 'interview-completed':
    case 'offer':
    case 'rejected':
    case 'applied':
    case 'submitted':
      return 'applied';
    default:
      return 'applied';
  }
};

const toActivityType = (
  type: string,
): DashboardStats['recentActivity'][number]['type'] => {
  switch (type) {
    case 'application':
    case 'interview':
    case 'offer':
    case 'rejection':
      return type;
    default:
      return 'application';
  }
};

// Candidate APIs
export const getCandidateDashboard = async (): Promise<DashboardStats> => {
  const { data } = await dashboardApi.getCandidateDashboardDashboardCandidateGet();
  return {
    resumeScore: data.resume_score,
    creditsRemaining: data.credits_remaining,
    applicationsCount: data.applications_count,
    interviewsCount: data.interviews_count,
    recentActivity: data.recent_activity.map((item) => ({
      id: item.id,
      type: toActivityType(item.type),
      message: item.message,
      timestamp: item.timestamp,
    })),
    applicationsTrend: data.applications_trend.map((item) => ({
      date: item.date,
      count: item.count,
    })),
  };
};

export const getJobs = async (): Promise<Job[]> => {
  const { data } = await jobsApi.listJobsJobsGet({ limit: 50 });
  return data.items.map((job) => {
    const created = job.created_at;
    return {
      id: job.id,
      title: job.title,
      description: job.description ?? '',
      skills: job.skills ?? [],
      location: job.location,
      salaryRange: {
        min: job.salary_range?.min ?? 0,
        max: job.salary_range?.max ?? 0,
      },
      employmentType: job.employment_type as Job['employmentType'],
      status: job.status as Job['status'],
      source: (job.source ?? 'internal') as Job['source'],
      createdAt: created,
      postedDate: created,
      isSaved: false,
    };
  });
};

export const applyToJob = async (jobId: number): Promise<{ success: boolean }> => {
  await applicationsApi.createApplicationApplicationsPost({
    createApplicationRequest: { job_id: jobId },
  });
  return { success: true };
};

export const getResumeData = async (): Promise<ResumeData> => {
  const data = await apiRequest<ResumeSummaryApiResponse>('get', '/resume');
  return {
    score: data.score,
    suggestions: data.suggestions,
    lastUpdated: data.last_updated,
    targetRole: data.target_role ?? undefined,
    roleSpecificScore: data.role_specific_score ?? undefined,
    atsScore: data.ats_score,
    keywordMatch: data.keyword_match,
    skillsGap: data.skills_gap,
  };
};

export const improveResume = async (): Promise<{ success: boolean; newScore: number }> => {
  const data = await apiRequest<{ success: boolean; new_score: number }>('post', '/resume/improve');
  return { success: data.success, newScore: data.new_score };
};

export const optimizeResumeForRole = async (
  targetRole: string,
): Promise<{ success: boolean; newScore: number; roleSpecificScore: number }> => {
  const data = await apiRequest<{
    success: boolean;
    new_score: number;
    role_specific_score: number;
  }>('post', '/resume/optimize-role', { target_role: targetRole });
  return {
    success: data.success,
    newScore: data.new_score,
    roleSpecificScore: data.role_specific_score,
  };
};

type ParsedResumeApi = {
  personal_info: ParsedResume['personalInfo'];
  summary: string;
  experience: ParsedResume['experience'];
  education: ParsedResume['education'];
  skills: ParsedResume['skills'];
  certifications: ParsedResume['certifications'];
  projects: ParsedResume['projects'];
};

type ResumeBuilderApiResponse = ParsedResumeApi & {
  version_id: number;
  template: string;
  sections: Array<{
    id: string;
    type: string;
    title: string;
    content: string;
    order: number;
    is_visible: boolean;
  }>;
};

function mapParsedResume(data: ParsedResumeApi): ParsedResume {
  return {
    personalInfo: data.personal_info,
    summary: data.summary,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    certifications: data.certifications,
    projects: data.projects,
  };
}

function mapBuilderData(data: ResumeBuilderApiResponse): ResumeBuilderData {
  return {
    versionId: data.version_id,
    template: data.template,
    sections: data.sections.map((section) => ({
      id: section.id,
      type: section.type as ResumeBuilderData['sections'][number]['type'],
      title: section.title,
      content: section.content,
      order: section.order,
      isVisible: section.is_visible,
    })),
    personalInfo: data.personal_info,
    summary: data.summary,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    certifications: data.certifications,
    projects: data.projects,
  };
}

function builderToApiPayload(data: ResumeBuilderData) {
  return {
    template: data.template,
    sections: data.sections.map((section) => ({
      id: section.id,
      type: section.type,
      title: section.title,
      content: section.content,
      order: section.order,
      is_visible: section.isVisible,
    })),
    personal_info: data.personalInfo,
    summary: data.summary,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    certifications: data.certifications,
    projects: data.projects,
  };
}

async function resolveResumeVersionId(versionId?: number): Promise<number> {
  if (versionId) {
    return versionId;
  }
  const versions = await getResumeVersions();
  const selected = versions.find((version) => version.isDefault) ?? versions[0];
  if (!selected) {
    throw new Error('No resume version available.');
  }
  return selected.id;
}

// Resume Parsing & Analysis APIs
export const parseResume = async (file: File): Promise<ParsedResume> => {
  if (USE_MOCK_API) {
    await delay(1500);
    return {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, India',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        portfolio: 'johndoe.dev',
      },
      summary: 'Experienced Frontend Developer with 5+ years of expertise in React, TypeScript, and modern web technologies.',
      experience: [],
      education: [],
      skills: { technical: [], soft: [], languages: [] },
      certifications: [],
      projects: [],
    };
  }

  const token = getAccessToken();
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post<ParsedResumeApi & { version_id: number }>(
    `${API_BASE_URL}/resume/parse`,
    formData,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return mapParsedResume(data);
};

export const analyzeResume = async (targetRole?: string, versionId?: number): Promise<ResumeAnalysis> => {
  if (USE_MOCK_API) {
    await delay(1000);
    const parsed = await parseResume(new File([], 'resume.pdf'));
    return {
      overallScore: 85,
      atsScore: 82,
      keywordMatch: 75,
      formattingScore: 90,
      contentScore: 80,
      strengths: ['Strong technical skills', 'Clear work experience'],
      weaknesses: ['Missing quantifiable metrics'],
      missingKeywords: ['TypeScript', 'GraphQL'],
      skillsGap: ['TypeScript'],
      recommendations: [],
      parsedData: parsed,
    };
  }

  const params = new URLSearchParams();
  if (targetRole) {
    params.set('target_role', targetRole);
  }
  if (versionId) {
    params.set('version_id', String(versionId));
  }
  const query = params.toString();
  const data = await apiRequest<{
    overall_score: number;
    ats_score: number;
    keyword_match: number;
    formatting_score: number;
    content_score: number;
    strengths: string[];
    weaknesses: string[];
    missing_keywords: string[];
    skills_gap: string[];
    recommendations: ResumeAnalysis['recommendations'];
    parsed_data: ParsedResumeApi;
  }>('get', `/resume/analysis${query ? `?${query}` : ''}`);

  return {
    overallScore: data.overall_score,
    atsScore: data.ats_score,
    keywordMatch: data.keyword_match,
    formattingScore: data.formatting_score,
    contentScore: data.content_score,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    missingKeywords: data.missing_keywords,
    skillsGap: data.skills_gap,
    recommendations: data.recommendations,
    parsedData: mapParsedResume(data.parsed_data),
  };
};

export const getResumeVersions = async (): Promise<ResumeVersion[]> => {
  if (USE_MOCK_API) {
    await delay(400);
    return [
      {
        id: 1,
        name: 'Default Resume',
        targetRole: 'Frontend Developer',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        score: 85,
        isDefault: true,
      },
    ];
  }

  const data = await apiRequest<{
    items: Array<{
      id: number;
      name: string;
      target_role: string;
      created_at: string;
      score: number;
      is_default: boolean;
      template_id: string;
    }>;
  }>('get', '/resume/versions');

  return data.items.map((version) => ({
    id: version.id,
    name: version.name,
    targetRole: version.target_role,
    createdAt: version.created_at,
    score: version.score,
    isDefault: version.is_default,
    templateId: version.template_id,
  }));
};

export const createResumeVersion = async (data: {
  name: string;
  targetRole: string;
  templateId?: string;
}): Promise<ResumeVersion> => {
  if (USE_MOCK_API) {
    await delay(800);
    return {
      id: Math.floor(Math.random() * 1000),
      name: data.name,
      targetRole: data.targetRole,
      createdAt: new Date().toISOString(),
      score: 0,
      isDefault: false,
    };
  }

  const created = await apiRequest<{
    id: number;
    name: string;
    target_role: string;
    created_at: string;
    score: number;
    is_default: boolean;
    template_id: string;
  }>('post', '/resume/versions', {
    name: data.name,
    target_role: data.targetRole,
    template_id: data.templateId ?? 'modern-blue',
  });

  return {
    id: created.id,
    name: created.name,
    targetRole: created.target_role,
    createdAt: created.created_at,
    score: created.score,
    isDefault: created.is_default,
    templateId: created.template_id,
  };
};

export const getResumeTemplates = async (): Promise<ResumeTemplate[]> => {
  if (USE_MOCK_API) {
    await delay(500);
    return [
      {
        id: 'modern-blue',
        name: 'Modern Blue',
        category: 'modern',
        description: 'Clean and contemporary design perfect for tech roles',
        preview: 'modern-blue-preview.jpg',
        atsFriendly: true,
        isPopular: true,
      },
    ];
  }

  const data = await apiRequest<{
    items: Array<{
      id: string;
      name: string;
      category: ResumeTemplate['category'];
      description: string;
      preview: string;
      ats_friendly: boolean;
      is_popular: boolean;
    }>;
  }>('get', '/resume/templates');

  return data.items.map((template) => ({
    id: template.id,
    name: template.name,
    category: template.category,
    description: template.description,
    preview: template.preview,
    atsFriendly: template.ats_friendly,
    isPopular: template.is_popular,
  }));
};

export const getResumeBuilderData = async (versionId?: number): Promise<ResumeBuilderData> => {
  if (USE_MOCK_API) {
    await delay(600);
    const parsed = await parseResume(new File([], 'resume.pdf'));
    return {
      versionId: 1,
      template: 'modern-blue',
      sections: [
        { id: 'personal', type: 'personal', title: 'Personal Information', content: '', order: 1, isVisible: true },
        { id: 'summary', type: 'summary', title: 'Professional Summary', content: parsed.summary, order: 2, isVisible: true },
        { id: 'experience', type: 'experience', title: 'Work Experience', content: '', order: 3, isVisible: true },
        { id: 'education', type: 'education', title: 'Education', content: '', order: 4, isVisible: true },
        { id: 'skills', type: 'skills', title: 'Skills', content: '', order: 5, isVisible: true },
        { id: 'certifications', type: 'certifications', title: 'Certifications', content: '', order: 6, isVisible: true },
        { id: 'projects', type: 'projects', title: 'Projects', content: '', order: 7, isVisible: true },
      ],
      personalInfo: parsed.personalInfo,
      summary: parsed.summary,
      experience: parsed.experience,
      education: parsed.education,
      skills: parsed.skills,
      certifications: parsed.certifications,
      projects: parsed.projects,
    };
  }

  const resolvedId = await resolveResumeVersionId(versionId);
  const data = await apiRequest<ResumeBuilderApiResponse>('get', `/resume/versions/${resolvedId}/builder`);
  return mapBuilderData(data);
};

export const saveResumeBuilderData = async (
  data: ResumeBuilderData,
  versionId?: number,
): Promise<ResumeBuilderData> => {
  const resolvedId = versionId ?? data.versionId;
  if (!resolvedId) {
    throw new Error('Resume version id is required to save builder data.');
  }

  if (USE_MOCK_API) {
    await delay(400);
    return { ...data, versionId: resolvedId };
  }

  const saved = await apiRequest<ResumeBuilderApiResponse>(
    'put',
    `/resume/versions/${resolvedId}/builder`,
    builderToApiPayload(data),
  );
  return mapBuilderData(saved);
};

export const getContentSuggestions = async (section: string, targetRole: string): Promise<string[]> => {
  if (USE_MOCK_API) {
    await delay(800);
    return [`Add relevant ${section} content for ${targetRole}.`];
  }

  const params = new URLSearchParams({ section, target_role: targetRole });
  const data = await apiRequest<{ items: string[] }>('get', `/resume/suggestions?${params.toString()}`);
  return data.items;
};

export const exportResume = async (
  format: 'pdf' | 'docx' | 'txt',
  versionId?: number,
): Promise<{ url: string; filename?: string }> => {
  if (USE_MOCK_API) {
    await delay(1000);
    return { url: `https://api.hiringjourney.com/resume/export/${format}`, filename: `resume.${format}` };
  }

  const resolvedId = await resolveResumeVersionId(versionId);
  const data = await apiRequest<{
    content: string;
    filename: string;
    mime_type: string;
    encoding?: string;
  }>('post', `/resume/versions/${resolvedId}/export`, { format });
  const blobContent =
    data.encoding === 'base64'
      ? Uint8Array.from(atob(data.content), (char) => char.charCodeAt(0))
      : data.content;
  const blob = new Blob([blobContent], { type: data.mime_type });
  return { url: URL.createObjectURL(blob), filename: data.filename };
};

export const getCreditUsage = async (): Promise<CreditUsage> => {
  const { data } = await settingsApi.getCreditUsageUsersMeCreditsUsageGet();
  return {
    total: data.total,
    used: data.used,
    remaining: data.remaining,
    breakdown: {
      resumeOptimization: data.breakdown.resumeOptimization ?? 0,
      interviewPrep: data.breakdown.interviewPrep ?? 0,
      autoApply: data.breakdown.autoApply ?? 0,
      negotiation: data.breakdown.negotiation ?? 0,
    },
  };
};

export const getApplications = async (): Promise<Application[]> => {
  const [{ data: applicationsResponse }, jobs] = await Promise.all([
    applicationsApi.listApplicationsApplicationsGet(),
    getJobs(),
  ]);
  const titleById = new Map(jobs.map((job) => [job.id, job.title]));
  return applicationsResponse.items.map((application) => {
    const jobId = application.job_id;
    return {
      id: application.id,
      jobId,
      jobTitle: titleById.get(jobId) ?? String(application.job_id),
      candidateId: 0,
      candidateName: 'Current User',
      status: toFrontendApplicationStatus(application.status),
      appliedAt: application.created_at,
      resumeScore: 0,
    };
  });
};

// Admin APIs
export const getAdminStats = async (): Promise<AdminStats> => {
  const { data } = await adminApi.getAdminStatsAdminStatsGet();
  return {
    totalCandidates: data.total_candidates,
    activeJobs: data.active_jobs,
    applications: data.applications,
    creditUsage: data.credit_usage,
    funnel: {
      applied: data.funnel.applied || 0,
      interviewScheduled: data.funnel.interviewScheduled || 0,
      interviewCompleted: data.funnel.interviewCompleted || 0,
      offer: data.funnel.offer || 0,
    },
    jobPerformance: data.job_performance.map((item) => ({
      jobId: item.job_id,
      jobTitle: item.job_title,
      applications: item.applications,
      conversions: item.conversions,
    })),
  };
};

export const publishJob = async (data: PublishJobData): Promise<PublishJobResponse> => {
  const response = await apiRequest<{ success: boolean; external_posting_ids?: Record<string, string> }>(
    'post',
    '/admin/jobs/publish',
    {
      title: data.title,
      description: data.description,
      skills: data.skills,
      location: data.location,
      salary_range: data.salaryRange,
      employment_type: data.employmentType,
      publish_to: data.publishTo,
      status: data.status ?? 'published',
    },
  );
  return {
    success: response.success,
    externalPostingIds: response.external_posting_ids || undefined,
  };
};

const mapAdminJob = (item: {
  id: number;
  title: string;
  description: string;
  skills: string[];
  location: string;
  salary_range?: { min?: number; max?: number };
  employment_type: string;
  status: string;
  applicant_count: number;
  created_at: string;
  source: string;
}): Job => ({
  id: item.id,
  title: item.title,
  description: item.description,
  skills: item.skills,
  location: item.location,
  salaryRange: {
    min: item.salary_range?.min ?? 0,
    max: item.salary_range?.max ?? 0,
  },
  employmentType: item.employment_type as Job['employmentType'],
  status: item.status as Job['status'],
  applicantCount: item.applicant_count,
  createdAt: item.created_at,
  source: item.source as Job['source'],
});

export const getAdminJob = async (jobId: number): Promise<Job> => {
  const data = await apiRequest<Parameters<typeof mapAdminJob>[0]>('get', `/admin/jobs/${jobId}`);
  return mapAdminJob(data);
};

export const updateAdminJob = async (
  jobId: number,
  data: PublishJobData & { status?: Job['status'] },
): Promise<Job> => {
  const response = await apiRequest<Parameters<typeof mapAdminJob>[0]>('patch', `/admin/jobs/${jobId}`, {
    title: data.title,
    description: data.description,
    skills: data.skills,
    location: data.location,
    salary_range: data.salaryRange,
    employment_type: data.employmentType,
    status: data.status,
  });
  return mapAdminJob(response);
};

export const updateJobStatus = async (
  jobId: number,
  status: Job['status'],
): Promise<{ success: boolean }> => {
  const data = await apiRequest<{ success: boolean }>('patch', `/admin/jobs/${jobId}/status`, { status });
  return { success: Boolean(data.success) };
};

export const getAdminJobs = async (): Promise<Job[]> => {
  const { data } = await adminApi.getAdminJobsAdminJobsGet();
  return data.map((item) => mapAdminJob(item));
};

export const getAllApplications = async (): Promise<Application[]> => {
  const { data } = await adminApi.getAdminApplicationsAdminApplicationsGet();
  return data.map((item) => ({
    id: item.id,
    jobId: item.job_id,
    jobTitle: item.job_title,
    candidateId: item.candidate_id,
    candidateName: item.candidate_name,
    status: toFrontendApplicationStatus(item.status),
    appliedAt: item.applied_at,
    resumeScore: item.resume_score || undefined,
  }));
};

export const getCandidates = async (): Promise<Candidate[]> => {
  const { data } = await adminApi.getAdminCandidatesAdminCandidatesGet();
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    resumeScore: item.resume_score,
    creditsUsed: item.credits_used,
    creditsTotal: item.credits_total,
    status: item.status as Candidate['status'],
    joinedAt: item.joined_at,
  }));
};

export const updateCredits = async (
  candidateId: number,
  credits: number
): Promise<{ success: boolean }> => {
  const { data } = await adminApi.updateCandidateCreditsAdminCandidatesCandidateIdCreditsPatch({
    candidateId,
    updateCandidateCreditsRequest: { credits_total: credits },
  });
  return { success: Boolean(data.success) };
};

export const updateCandidateStatus = async (
  candidateId: number,
  status: 'active' | 'suspended'
): Promise<{ success: boolean }> => {
  const { data } = await adminApi.updateCandidateStatusAdminCandidatesCandidateIdStatusPatch({
    candidateId,
    updateCandidateStatusRequest: { status },
  });
  return { success: Boolean(data.success) };
};

export const closeJob = async (jobId: number): Promise<{ success: boolean }> => {
  const { data } = await adminApi.updateJobStatusAdminJobsJobIdStatusPatch({
    jobId,
    updateJobStatusRequest: { status: 'archived' },
  });
  return { success: Boolean(data.success) };
};

export const updateApplicationStatus = async (
  applicationId: number,
  status: Application['status']
): Promise<{ success: boolean }> => {
  const { data } = await adminApi.updateApplicationStatusAdminApplicationsApplicationIdStatusPatch({
    applicationId,
    updateApplicationStatusRequest: { status },
  });
  return { success: Boolean(data.success) };
};

export const getPlans = async (): Promise<Plan[]> => {
  const data = await apiRequest<Array<{
    id: number;
    name: string;
    credit_limit: number;
    price: number;
    usage: number;
  }>>('get', '/admin/plans');
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    creditLimit: item.credit_limit,
    price: item.price,
    usage: item.usage,
  }));
};

export const createPlan = async (data: CreatePlanData): Promise<Plan> => {
  const response = await apiRequest<{
    id: number;
    name: string;
    credit_limit: number;
    price: number;
    usage: number;
  }>('post', '/admin/plans', {
    name: data.name,
    credit_limit: data.creditLimit,
    price: data.price,
    is_active: data.isActive ?? true,
  });
  return {
    id: response.id,
    name: response.name,
    creditLimit: response.credit_limit,
    price: response.price,
    usage: response.usage,
  };
};

export const updatePlan = async (planId: number, data: UpdatePlanData): Promise<Plan> => {
  const response = await apiRequest<{
    id: number;
    name: string;
    credit_limit: number;
    price: number;
    usage: number;
  }>('patch', `/admin/plans/${planId}`, {
    name: data.name,
    credit_limit: data.creditLimit,
    price: data.price,
    is_active: data.isActive,
  });
  return {
    id: response.id,
    name: response.name,
    creditLimit: response.credit_limit,
    price: response.price,
    usage: response.usage,
  };
};

export const getPlatformSettings = async (): Promise<PlatformSettings> => {
  const data = await apiRequest<{
    platform_display_name: string;
    support_email: string;
    default_candidate_credits: number;
    linkedin_integration_enabled: boolean;
    indeed_integration_enabled: boolean;
    updated_at: string;
  }>('get', '/admin/platform-settings');
  return {
    platformDisplayName: data.platform_display_name,
    supportEmail: data.support_email,
    defaultCandidateCredits: data.default_candidate_credits,
    linkedinIntegrationEnabled: data.linkedin_integration_enabled,
    indeedIntegrationEnabled: data.indeed_integration_enabled,
    updatedAt: data.updated_at,
  };
};

export const updatePlatformSettings = async (
  settings: Omit<PlatformSettings, 'updatedAt'>,
): Promise<PlatformSettings> => {
  const data = await apiRequest<{
    platform_display_name: string;
    support_email: string;
    default_candidate_credits: number;
    linkedin_integration_enabled: boolean;
    indeed_integration_enabled: boolean;
    updated_at: string;
  }>('put', '/admin/platform-settings', {
    platform_display_name: settings.platformDisplayName,
    support_email: settings.supportEmail,
    default_candidate_credits: settings.defaultCandidateCredits,
    linkedin_integration_enabled: settings.linkedinIntegrationEnabled,
    indeed_integration_enabled: settings.indeedIntegrationEnabled,
  });
  return {
    platformDisplayName: data.platform_display_name,
    supportEmail: data.support_email,
    defaultCandidateCredits: data.default_candidate_credits,
    linkedinIntegrationEnabled: data.linkedin_integration_enabled,
    indeedIntegrationEnabled: data.indeed_integration_enabled,
    updatedAt: data.updated_at,
  };
};

export const getAdminAuditLogs = async (limit: number = 50): Promise<AdminAuditLog[]> => {
  const { data } = await adminApi.getAdminAuditLogsAdminAuditLogsGet({ limit });
  return data.map((item) => ({
    id: item.id,
    actorSub: item.actor_sub,
    action: item.action,
    resourceType: item.resource_type,
    resourceId: item.resource_id,
    oldValue: item.old_value || undefined,
    newValue: item.new_value || undefined,
    createdAt: item.created_at,
  }));
};

// Legal Readiness APIs
export const getLegalDocuments = async (): Promise<LegalDocument[]> => {
  const data = await apiRequest<{ items: Array<{
    id: number;
    type: string;
    name: string;
    status: string;
    uploaded_at: string;
    issues?: string[] | null;
    has_file?: boolean;
    size_bytes?: number | null;
  }> }>('get', '/legal/documents');
  return data.items.map((doc) => ({
    id: doc.id,
    type: doc.type as LegalDocument['type'],
    name: doc.name,
    status: doc.status as LegalDocument['status'],
    uploadedAt: doc.uploaded_at,
    issues: doc.issues ?? undefined,
    hasFile: doc.has_file ?? false,
    sizeBytes: doc.size_bytes ?? undefined,
  }));
};

export const uploadLegalDocument = async (
  file: File,
  type: LegalDocument['type'],
): Promise<LegalDocument> => {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  const { data: doc } = await axios.post<{
    id: number;
    type: string;
    name: string;
    status: string;
    uploaded_at: string;
    issues?: string[] | null;
    has_file?: boolean;
    size_bytes?: number | null;
  }>(`${API_BASE_URL}/legal/documents`, formData, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'multipart/form-data',
    },
  });
  return {
    id: doc.id,
    type: doc.type as LegalDocument['type'],
    name: doc.name,
    status: doc.status as LegalDocument['status'],
    uploadedAt: doc.uploaded_at,
    issues: doc.issues ?? undefined,
    hasFile: doc.has_file ?? true,
    sizeBytes: doc.size_bytes ?? undefined,
  };
};

/** @deprecated Use uploadLegalDocument with the file bytes. */
export const createLegalDocument = async (data: {
  type: LegalDocument['type'];
  name: string;
}): Promise<LegalDocument> => {
  const doc = await apiRequest<{
    id: number;
    type: string;
    name: string;
    status: string;
    uploaded_at: string;
    issues?: string[] | null;
    has_file?: boolean;
    size_bytes?: number | null;
  }>('post', '/legal/documents/metadata', { type: data.type, name: data.name });
  return {
    id: doc.id,
    type: doc.type as LegalDocument['type'],
    name: doc.name,
    status: doc.status as LegalDocument['status'],
    uploadedAt: doc.uploaded_at,
    issues: doc.issues ?? undefined,
    hasFile: doc.has_file ?? false,
    sizeBytes: doc.size_bytes ?? undefined,
  };
};

export const downloadLegalDocument = async (documentId: number, filename: string): Promise<void> => {
  const token = getAccessToken();
  const { data } = await axios.get<Blob>(`${API_BASE_URL}/legal/documents/${documentId}/download`, {
    responseType: 'blob',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const validateLegalDocument = async (documentId: number): Promise<{ success: boolean; issues?: string[] }> => {
  return apiRequest<{ success: boolean; issues?: string[] }>(
    'post',
    `/legal/documents/${documentId}/validate`,
  );
};

// Coding Arena APIs
export const getCodingChallenges = async (): Promise<CodingChallenge[]> => {
  if (USE_MOCK_API) {
    await delay(500);
    return [
      {
        id: 1,
        title: 'Two Sum',
        description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        difficulty: 'easy',
        category: 'arrays',
        tags: ['hash-table', 'arrays'],
        solved: false,
        attempts: 0,
        executable: true,
      },
    ];
  }

  const data = await apiRequest<{
    items: Array<{
      id: number;
      title: string;
      description: string;
      difficulty: CodingChallenge['difficulty'];
      category: CodingChallenge['category'];
      tags: string[];
      solved: boolean;
      attempts: number;
      executable?: boolean;
    }>;
  }>('get', '/coding/challenges');

  return data.items.map((item) => ({
    ...item,
    executable: item.executable ?? false,
  }));
};

export const getCodingChallenge = async (challengeId: number): Promise<CodingChallengeDetail> => {
  const data = await apiRequest<{
    id: number;
    title: string;
    description: string;
    difficulty: CodingChallenge['difficulty'];
    category: CodingChallenge['category'];
    tags: string[];
    solved: boolean;
    attempts: number;
    executable?: boolean;
    starter_code?: string | null;
    function_name?: string | null;
  }>('get', `/coding/challenges/${challengeId}`);

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    category: data.category,
    tags: data.tags,
    solved: data.solved,
    attempts: data.attempts,
    executable: data.executable ?? false,
    starterCode: data.starter_code,
    functionName: data.function_name,
  };
};

export const submitCodingSolution = async (
  challengeId: number,
  code: string,
): Promise<CodingSubmitResult> => {
  const data = await apiRequest<{
    challenge_id: number;
    passed: number;
    total: number;
    results: Array<{
      case: number;
      pass: boolean;
      expected?: unknown;
      actual?: unknown;
      error?: string;
    }>;
    solved: boolean;
    attempts: number;
    error?: string | null;
  }>('post', `/coding/challenges/${challengeId}/submit`, { code });

  return {
    challengeId: data.challenge_id,
    passed: data.passed,
    total: data.total,
    results: data.results,
    solved: data.solved,
    attempts: data.attempts,
    error: data.error,
  };
};

export const recordCodingAttempt = async (
  challengeId: number,
  solved = false,
): Promise<{ challengeId: number; solved: boolean; attempts: number }> => {
  const data = await apiRequest<{
    challenge_id: number;
    solved: boolean;
    attempts: number;
  }>('post', `/coding/challenges/${challengeId}/attempts`, { solved });
  return {
    challengeId: data.challenge_id,
    solved: data.solved,
    attempts: data.attempts,
  };
};

// Negotiation APIs
export const getNegotiationFrameworks = async (): Promise<NegotiationFramework[]> => {
  const data = await apiRequest<{ items: NegotiationFramework[] }>('get', '/negotiation/frameworks');
  return data.items;
};

export const getNegotiationMarketInsights = async (): Promise<{
  averageSalary: number;
  yourOffer: number;
  marketRange: { min: number; max: number };
}> => {
  const data = await apiRequest<{
    average_salary: number;
    your_offer: number;
    market_range: { min: number; max: number };
  }>('get', '/negotiation/market-insights');
  return {
    averageSalary: data.average_salary,
    yourOffer: data.your_offer,
    marketRange: data.market_range,
  };
};

// Interview APIs
export const getInterviewQuestions = async (type: 'hr' | 'technical'): Promise<string[]> => {
  const data = await apiRequest<{ items: string[] }>('get', `/interview/questions?type=${type}`);
  return data.items;
};

export const getInterviewSessions = async (): Promise<{
  items: Array<{ id: number; type: 'hr' | 'technical'; score: number; date: string; questionsAnswered: number }>;
  averageScore: number;
  totalSessions: number;
}> => {
  const data = await apiRequest<{
    items: Array<{
      id: number;
      type: string;
      score: number;
      date: string;
      questions_answered: number;
    }>;
    average_score: number;
    total_sessions: number;
  }>('get', '/interview/sessions');
  return {
    items: data.items.map((item) => ({
      id: item.id,
      type: item.type as 'hr' | 'technical',
      score: item.score,
      date: item.date,
      questionsAnswered: item.questions_answered,
    })),
    averageScore: data.average_score,
    totalSessions: data.total_sessions,
  };
};

export const submitInterviewFeedback = async (payload: {
  interviewType: 'hr' | 'technical';
  question: string;
  answer: string;
}): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[]; source?: string }> => {
  return apiRequest('post', '/interview/feedback', {
    interview_type: payload.interviewType,
    question: payload.question,
    answer: payload.answer,
  });
};

export const createInterviewSession = async (payload: {
  interviewType: 'hr' | 'technical';
  score: number;
  questionsAnswered: number;
}): Promise<void> => {
  await apiRequest('post', '/interview/sessions', {
    interview_type: payload.interviewType,
    score: payload.score,
    questions_answered: payload.questionsAnswered,
  });
};

// User Profile APIs
export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await usersApi.getMyProfileUsersMeGet();
  const stats = data as typeof data & {
    applications_count?: number;
    interviews_count?: number;
    credits_remaining?: number;
  };
  return {
    id: 0,
    name: data.full_name || data.username || data.email || 'User',
    email: data.email || '',
    role: 'candidate',
    bio: data.headline || '',
    joinedAt: new Date(data.updated_at).toISOString(),
    applicationsCount: stats.applications_count ?? 0,
    interviewsCount: stats.interviews_count ?? 0,
  };
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  await usersApi.updateMyProfileUsersMePatch({
    updateUserProfileRequest: {
      full_name: data.name,
      headline: data.bio,
    },
  });
  return getUserProfile();
};

export const getUserSettings = async (): Promise<UserSettings> => {
  const { data } = await settingsApi.getUserSettingsUsersMeSettingsGet();
  return {
    emailNotifications: data.email_notifications,
    smsNotifications: data.sms_notifications,
    marketingEmails: data.marketing_emails,
    autoApplyEnabled: data.auto_apply_enabled,
    skillMatchThreshold: data.skill_match_threshold,
    preferredLocations: data.preferred_locations,
    preferredJobTypes: data.preferred_job_types,
    theme: data.theme as UserSettings['theme'],
  };
};

export const updateUserSettings = async (settings: UserSettings): Promise<UserSettings> => {
  const { data } = await settingsApi.updateUserSettingsUsersMeSettingsPut({
    updateUserSettingsRequest: {
      email_notifications: settings.emailNotifications,
      sms_notifications: settings.smsNotifications,
      marketing_emails: settings.marketingEmails,
      auto_apply_enabled: settings.autoApplyEnabled,
      skill_match_threshold: settings.skillMatchThreshold,
      preferred_locations: settings.preferredLocations,
      preferred_job_types: settings.preferredJobTypes,
      theme: settings.theme,
    },
  });
  return {
    emailNotifications: data.email_notifications,
    smsNotifications: data.sms_notifications,
    marketingEmails: data.marketing_emails,
    autoApplyEnabled: data.auto_apply_enabled,
    skillMatchThreshold: data.skill_match_threshold,
    preferredLocations: data.preferred_locations,
    preferredJobTypes: data.preferred_job_types,
    theme: data.theme as UserSettings['theme'],
  };
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean }> => {
  const response = await settingsApi.changePasswordUsersMePasswordPost({
    changePasswordRequest: {
      current_password: data.currentPassword,
      new_password: data.newPassword,
    },
  });
  return { success: Boolean(response.data.success) };
};

// Paginated APIs
export const getJobsPaginated = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Job>> => {
  const allJobs = await getJobs();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedJobs = allJobs.slice(start, end);
  
  return {
    data: paginatedJobs,
    total: allJobs.length,
    page,
    pageSize,
    totalPages: Math.ceil(allJobs.length / pageSize),
  };
};

export const getApplicationsPaginated = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Application>> => {
  const allApplications = await getAllApplications();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedApplications = allApplications.slice(start, end);
  
  return {
    data: paginatedApplications,
    total: allApplications.length,
    page,
    pageSize,
    totalPages: Math.ceil(allApplications.length / pageSize),
  };
};

export const getCandidatesPaginated = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Candidate>> => {
  const allCandidates = await getCandidates();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCandidates = allCandidates.slice(start, end);
  
  return {
    data: paginatedCandidates,
    total: allCandidates.length,
    page,
    pageSize,
    totalPages: Math.ceil(allCandidates.length / pageSize),
  };
};

// Auto-Apply Profile APIs
const mapAutoApplyProfile = (profile: {
  id: number;
  name: string;
  is_active: boolean;
  min_salary: number;
  locations: string[];
  job_types: string[];
  required_skills: string[];
  skill_match_threshold: number;
  job_boards: string[];
  exclude_companies: string[];
  exclude_keywords: string[];
  resume_version?: string | null;
  daily_apply_limit: number;
  apply_schedule: string;
  created_at: string;
  applied_count: number;
}): AutoApplyProfile => ({
  id: profile.id,
  name: profile.name,
  isActive: profile.is_active,
  minSalary: profile.min_salary,
  locations: profile.locations,
  jobTypes: profile.job_types,
  requiredSkills: profile.required_skills,
  skillMatchThreshold: profile.skill_match_threshold,
  jobBoards: profile.job_boards,
  excludeCompanies: profile.exclude_companies,
  excludeKeywords: profile.exclude_keywords,
  resumeVersion: profile.resume_version ?? undefined,
  dailyApplyLimit: profile.daily_apply_limit,
  applySchedule: profile.apply_schedule as AutoApplyProfile['applySchedule'],
  createdAt: profile.created_at,
  appliedCount: profile.applied_count,
});

const toAutoApplyWriteBody = (data: Partial<AutoApplyProfile>) => {
  const body: Record<string, unknown> = {};
  if (data.name !== undefined) body.name = data.name;
  if (data.isActive !== undefined) body.is_active = data.isActive;
  if (data.minSalary !== undefined) body.min_salary = data.minSalary;
  if (data.locations !== undefined) body.locations = data.locations;
  if (data.jobTypes !== undefined) body.job_types = data.jobTypes;
  if (data.requiredSkills !== undefined) body.required_skills = data.requiredSkills;
  if (data.skillMatchThreshold !== undefined) body.skill_match_threshold = data.skillMatchThreshold;
  if (data.jobBoards !== undefined) body.job_boards = data.jobBoards;
  if (data.excludeCompanies !== undefined) body.exclude_companies = data.excludeCompanies;
  if (data.excludeKeywords !== undefined) body.exclude_keywords = data.excludeKeywords;
  if (data.resumeVersion !== undefined) body.resume_version = data.resumeVersion;
  if (data.dailyApplyLimit !== undefined) body.daily_apply_limit = data.dailyApplyLimit;
  if (data.applySchedule !== undefined) body.apply_schedule = data.applySchedule;
  return body;
};

export const getAutoApplyProfiles = async (): Promise<AutoApplyProfile[]> => {
  const data = await apiRequest<{ items: Parameters<typeof mapAutoApplyProfile>[0][] }>(
    'get',
    '/auto-apply/profiles',
  );
  return data.items.map(mapAutoApplyProfile);
};

export const createAutoApplyProfile = async (
  data: Omit<AutoApplyProfile, 'id' | 'createdAt' | 'appliedCount'>,
): Promise<AutoApplyProfile> => {
  const profile = await apiRequest<Parameters<typeof mapAutoApplyProfile>[0]>(
    'post',
    '/auto-apply/profiles',
    toAutoApplyWriteBody(data),
  );
  return mapAutoApplyProfile(profile);
};

export const updateAutoApplyProfile = async (
  id: number,
  data: Partial<AutoApplyProfile>,
): Promise<AutoApplyProfile> => {
  const profile = await apiRequest<Parameters<typeof mapAutoApplyProfile>[0]>(
    'patch',
    `/auto-apply/profiles/${id}`,
    toAutoApplyWriteBody(data),
  );
  return mapAutoApplyProfile(profile);
};

export const deleteAutoApplyProfile = async (id: number): Promise<{ success: boolean }> => {
  await apiRequest('delete', `/auto-apply/profiles/${id}`);
  return { success: true };
};

export const bulkApplyToJobs = async (request: BulkApplyRequest): Promise<{
  success: number;
  failed: number;
  total: number;
}> => {
  const results = await Promise.allSettled(
    request.jobIds.map((id) => applyToJob(id))
  );
  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;
  return { success, failed, total: request.jobIds.length };
};

// Billing APIs
const mapBillingPlan = (item: {
  id: number;
  name: string;
  slug: string | null;
  description: string;
  credit_limit: number;
  price: number;
  yearly_price: number;
  features: string[];
  is_free: boolean;
  sort_order: number;
}): BillingPlan => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  description: item.description,
  creditLimit: item.credit_limit,
  price: item.price,
  yearlyPrice: item.yearly_price,
  features: item.features,
  isFree: item.is_free,
  sortOrder: item.sort_order,
});

const mapSubscription = (item: {
  id: number;
  plan_id: number;
  plan_name: string;
  plan_slug: string | null;
  status: string;
  billing_cycle: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  pending_plan_id: number | null;
  pending_plan_name: string | null;
  provider: string;
}): UserSubscription => ({
  id: item.id,
  planId: item.plan_id,
  planName: item.plan_name,
  planSlug: item.plan_slug,
  status: item.status as UserSubscription['status'],
  billingCycle: item.billing_cycle as UserSubscription['billingCycle'],
  currentPeriodStart: item.current_period_start,
  currentPeriodEnd: item.current_period_end,
  cancelAtPeriodEnd: item.cancel_at_period_end,
  pendingPlanId: item.pending_plan_id,
  pendingPlanName: item.pending_plan_name,
  provider: item.provider,
});

export const getBillingPlans = async (): Promise<BillingPlan[]> => {
  const data = await apiRequest<Parameters<typeof mapBillingPlan>[0][]>('get', '/billing/plans');
  return data.map(mapBillingPlan);
};

export const getBillingSubscription = async (): Promise<UserSubscription | null> => {
  const data = await apiRequest<{ subscription: Parameters<typeof mapSubscription>[0] | null }>(
    'get',
    '/billing/subscription',
  );
  return data.subscription ? mapSubscription(data.subscription) : null;
};

export const getBillingInvoices = async (): Promise<BillingInvoice[]> => {
  const data = await apiRequest<Array<{
    id: number;
    invoice_number: string;
    plan_id: number;
    plan_name: string;
    amount: number;
    currency: string;
    status: string;
    billing_cycle: string;
    failure_reason?: string | null;
    paid_at?: string | null;
    created_at: string;
  }>>('get', '/billing/invoices');
  return data.map((item) => ({
    id: item.id,
    invoiceNumber: item.invoice_number,
    planId: item.plan_id,
    planName: item.plan_name,
    amount: item.amount,
    currency: item.currency,
    status: item.status as BillingInvoice['status'],
    billingCycle: item.billing_cycle as BillingInvoice['billingCycle'],
    failureReason: item.failure_reason ?? undefined,
    paidAt: item.paid_at ?? undefined,
    createdAt: item.created_at,
  }));
};

const mapCheckoutSession = (data: {
  checkout_session_id: number | null;
  invoice_id: number | null;
  order_id?: string;
  amount: number;
  currency: string;
  plan_id: number;
  plan_name?: string;
  billing_cycle: string;
  key_id?: string;
  mock: boolean;
  free: boolean;
  subscription?: Parameters<typeof mapSubscription>[0];
}): CheckoutSession => ({
  checkoutSessionId: data.checkout_session_id,
  invoiceId: data.invoice_id,
  orderId: data.order_id,
  amount: data.amount,
  currency: data.currency,
  planId: data.plan_id,
  planName: data.plan_name,
  billingCycle: data.billing_cycle as CheckoutSession['billingCycle'],
  keyId: data.key_id,
  mock: data.mock,
  free: data.free,
  subscription: data.subscription ? mapSubscription(data.subscription) : undefined,
});

export const startBillingCheckout = async (
  planId: number,
  billingCycle: 'monthly' | 'yearly',
): Promise<CheckoutSession> => {
  const data = await apiRequest<Parameters<typeof mapCheckoutSession>[0]>('post', '/billing/checkout', {
    plan_id: planId,
    billing_cycle: billingCycle,
  });
  return mapCheckoutSession(data);
};

export const confirmBillingCheckout = async (
  invoiceId: number,
  paymentId?: string,
  signature?: string,
): Promise<{ success: boolean; subscription?: UserSubscription }> => {
  const data = await apiRequest<{
    success: boolean;
    subscription?: Parameters<typeof mapSubscription>[0];
  }>('post', '/billing/checkout/confirm', {
    invoice_id: invoiceId,
    payment_id: paymentId,
    signature,
  });
  return {
    success: data.success,
    subscription: data.subscription ? mapSubscription(data.subscription) : undefined,
  };
};

export const updateBillingSubscription = async (
  action: 'cancel' | 'resume' | 'change_plan',
  planId?: number,
): Promise<UserSubscription> => {
  const data = await apiRequest<{ subscription: Parameters<typeof mapSubscription>[0] }>(
    'patch',
    '/billing/subscription',
    { action, plan_id: planId },
  );
  return mapSubscription(data.subscription);
};

export const retryBillingPayment = async (): Promise<CheckoutSession> => {
  const data = await apiRequest<Parameters<typeof mapCheckoutSession>[0]>('post', '/billing/retry-payment');
  return mapCheckoutSession(data);
};
