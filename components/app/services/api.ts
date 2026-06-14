import {
  AdminApi,
  ApplicationsApi,
  Configuration as GeneratedApiConfiguration,
  DashboardApi,
  JobsApi,
  SettingsApi,
  UsersApi,
} from '@/lib/generated/api-client';
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
  LegalDocument,
  CodingChallenge,
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
      return status;
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
  requireMockApi('Resume optimization');
  await delay(500);
  return {
    score: 85,
    suggestions: [
      'Add more quantifiable achievements',
      'Include relevant keywords from job descriptions',
      'Highlight leadership experience',
      'Add certifications and courses',
    ],
    lastUpdated: new Date().toISOString(),
    targetRole: 'Frontend Developer',
    roleSpecificScore: 88,
    atsScore: 82,
    keywordMatch: 75,
    skillsGap: ['TypeScript', 'GraphQL', 'AWS'],
  };
};

export const improveResume = async (): Promise<{ success: boolean; newScore: number }> => {
  requireMockApi('Resume optimization');
  await delay(1500);
  return { success: true, newScore: 92 };
};

export const optimizeResumeForRole = async (_targetRole: string): Promise<{ success: boolean; newScore: number; roleSpecificScore: number }> => {
  requireMockApi('Resume optimization');
  await delay(2000);
  return { success: true, newScore: 90, roleSpecificScore: 95 };
};

// Resume Parsing & Analysis APIs
export const parseResume = async (_file: File): Promise<ParsedResume> => {
  requireMockApi('Resume parsing');
  await delay(1500);
  // Mock parsing - in real app, this would parse PDF/DOCX
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
    experience: [
      {
        company: 'Tech Corp',
        title: 'Senior Frontend Developer',
        duration: '2020 - Present',
        location: 'Bangalore',
        description: 'Led frontend development for multiple products',
        achievements: [
          'Reduced page load time by 40%',
          'Mentored team of 5 developers',
          'Implemented design system used by 10+ products',
        ],
        skills: ['React', 'TypeScript', 'Node.js'],
      },
      {
        company: 'Startup Inc',
        title: 'Frontend Developer',
        duration: '2018 - 2020',
        location: 'Mumbai',
        description: 'Developed responsive web applications',
        achievements: [
          'Built 5+ production applications',
          'Improved user engagement by 25%',
        ],
        skills: ['React', 'JavaScript', 'CSS'],
      },
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'B.Tech',
        field: 'Computer Science',
        duration: '2014 - 2018',
        gpa: '8.5/10',
      },
    ],
    skills: {
      technical: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML'],
      soft: ['Leadership', 'Communication', 'Problem Solving'],
      languages: ['English', 'Hindi'],
    },
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon',
        date: '2022',
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution',
        technologies: ['React', 'Node.js', 'MongoDB'],
        url: 'github.com/johndoe/ecommerce',
      },
    ],
  };
};

export const analyzeResume = async (_targetRole?: string): Promise<ResumeAnalysis> => {
  requireMockApi('Resume analysis');
  await delay(1000);
  const parsed = await parseResume(new File([], 'resume.pdf'));
  return {
    overallScore: 85,
    atsScore: 82,
    keywordMatch: 75,
    formattingScore: 90,
    contentScore: 80,
    strengths: [
      'Strong technical skills',
      'Clear work experience',
      'Good formatting',
      'Relevant projects',
    ],
    weaknesses: [
      'Missing quantifiable metrics',
      'Limited leadership examples',
      'Could add more keywords',
    ],
    missingKeywords: ['TypeScript', 'GraphQL', 'Microservices', 'CI/CD'],
    skillsGap: ['TypeScript', 'GraphQL'],
    recommendations: [
      {
        priority: 'high',
        category: 'Keywords',
        suggestion: 'Add missing keywords: TypeScript, GraphQL',
        impact: 'Increase ATS score by 8-10 points',
      },
      {
        priority: 'high',
        category: 'Achievements',
        suggestion: 'Add quantifiable metrics to experience',
        impact: 'Improve content score by 5-7 points',
      },
      {
        priority: 'medium',
        category: 'Skills',
        suggestion: 'Highlight leadership and soft skills',
        impact: 'Better match for senior roles',
      },
      {
        priority: 'low',
        category: 'Formatting',
        suggestion: 'Optimize section ordering',
        impact: 'Minor ATS improvement',
      },
    ],
    parsedData: parsed,
  };
};

export const getResumeVersions = async (): Promise<ResumeVersion[]> => {
  requireMockApi('Resume versions');
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
    {
      id: 2,
      name: 'Senior Frontend Resume',
      targetRole: 'Senior Frontend Developer',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      score: 88,
      isDefault: false,
    },
    {
      id: 3,
      name: 'Full Stack Resume',
      targetRole: 'Full Stack Developer',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      score: 82,
      isDefault: false,
    },
  ];
};

export const createResumeVersion = async (data: {
  name: string;
  targetRole: string;
}): Promise<ResumeVersion> => {
  requireMockApi('Resume versions');
  await delay(800);
  return {
    id: Math.floor(Math.random() * 1000),
    name: data.name,
    targetRole: data.targetRole,
    createdAt: new Date().toISOString(),
    score: 0,
    isDefault: false,
  };
};

// Resume Templates
export const getResumeTemplates = async (): Promise<ResumeTemplate[]> => {
  requireMockApi('Resume templates');
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
    {
      id: 'professional-classic',
      name: 'Professional Classic',
      category: 'professional',
      description: 'Traditional format trusted by ATS systems',
      preview: 'professional-classic-preview.jpg',
      atsFriendly: true,
      isPopular: true,
    },
    {
      id: 'minimalist-clean',
      name: 'Minimalist Clean',
      category: 'minimalist',
      description: 'Simple and elegant, great for creative industries',
      preview: 'minimalist-clean-preview.jpg',
      atsFriendly: true,
      isPopular: false,
    },
    {
      id: 'executive-bold',
      name: 'Executive Bold',
      category: 'executive',
      description: 'Powerful design for senior-level positions',
      preview: 'executive-bold-preview.jpg',
      atsFriendly: true,
      isPopular: false,
    },
    {
      id: 'creative-colorful',
      name: 'Creative Colorful',
      category: 'creative',
      description: 'Eye-catching design for design and marketing roles',
      preview: 'creative-colorful-preview.jpg',
      atsFriendly: false,
      isPopular: false,
    },
  ];
};

export const getResumeBuilderData = async (_versionId?: number): Promise<ResumeBuilderData> => {
  requireMockApi('Resume builder');
  await delay(600);
  const parsed = await parseResume(new File([], 'resume.pdf'));
  return {
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
};

export const getContentSuggestions = async (section: string, targetRole: string): Promise<string[]> => {
  requireMockApi('Resume content suggestions');
  await delay(800);
  const suggestions: Record<string, string[]> = {
    summary: [
      `Experienced ${targetRole} with proven track record in...`,
      `Results-driven ${targetRole} specializing in...`,
      `Dynamic ${targetRole} with expertise in...`,
    ],
    experience: [
      'Quantify achievements with numbers and percentages',
      'Use action verbs: Led, Developed, Implemented, Optimized',
      'Highlight impact on business metrics',
    ],
    skills: [
      'List technical skills first',
      'Include both hard and soft skills',
      'Match skills to job description keywords',
    ],
  };
  return suggestions[section] || ['Add relevant content for this section'];
};

export const exportResume = async (format: 'pdf' | 'docx' | 'txt'): Promise<{ url: string }> => {
  requireMockApi('Resume export');
  await delay(1000);
  return { url: `https://api.hiringjourney.com/resume/export/${format}` };
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
  const { data: response } = await adminApi.publishJobAdminJobsPublishPost({
    publishJobRequest: {
      title: data.title,
      description: data.description,
      skills: data.skills,
      location: data.location,
      salary_range: data.salaryRange,
      employment_type: data.employmentType,
      publish_to: data.publishTo,
    },
  });
  return {
    success: response.success,
    externalPostingIds: response.external_posting_ids || undefined,
  };
};

export const getAdminJobs = async (): Promise<Job[]> => {
  const { data } = await adminApi.getAdminJobsAdminJobsGet();
  return data.map((item) => ({
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
  }));
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
  const { data } = await adminApi.getAdminPlansAdminPlansGet();
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    creditLimit: item.credit_limit,
    price: item.price,
    usage: item.usage,
  }));
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
  requireMockApi('Legal documents');
  await delay(500);
  return [
    {
      id: 1,
      type: 'offer-letter',
      name: 'Offer_Letter_TechCorp.pdf',
      status: 'validated',
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      type: 'employment-contract',
      name: 'Employment_Contract.pdf',
      status: 'issues-found',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      issues: ['Notice period clause unclear', 'Non-compete duration exceeds standard'],
    },
    {
      id: 3,
      type: 'nda',
      name: 'NDA_Agreement.pdf',
      status: 'pending',
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export const validateLegalDocument = async (_documentId: number): Promise<{ success: boolean; issues?: string[] }> => {
  requireMockApi('Legal document validation');
  await delay(1500);
  return { success: true, issues: [] };
};

// Coding Arena APIs
export const getCodingChallenges = async (): Promise<CodingChallenge[]> => {
  requireMockApi('Coding challenges');
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
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      description: 'Reverse a singly linked list.',
      difficulty: 'medium',
      category: 'data-structures',
      tags: ['linked-list', 'recursion'],
      solved: true,
      attempts: 2,
    },
    {
      id: 3,
      title: 'Merge Intervals',
      description: 'Given a collection of intervals, merge all overlapping intervals.',
      difficulty: 'medium',
      category: 'arrays',
      tags: ['arrays', 'sorting'],
      solved: false,
      attempts: 1,
    },
    {
      id: 4,
      title: 'Design Twitter',
      description: 'Design a simplified version of Twitter where users can post tweets, follow/unfollow users.',
      difficulty: 'hard',
      category: 'system-design',
      tags: ['design', 'hash-table'],
      solved: false,
      attempts: 0,
    },
  ];
};

// Negotiation APIs
export const getNegotiationFrameworks = async (): Promise<NegotiationFramework[]> => {
  requireMockApi('Negotiation frameworks');
  await delay(500);
  return [
    {
      id: 1,
      title: 'Salary Negotiation Framework',
      description: 'Step-by-step guide to negotiate your salary effectively',
      steps: [
        'Research market rates for your role and location',
        'Prepare your value proposition',
        'Set your target and walk-away numbers',
        'Practice your negotiation pitch',
        'Schedule the negotiation conversation',
        'Present your case professionally',
        'Handle counter-offers gracefully',
      ],
      tips: [
        'Never accept the first offer immediately',
        'Focus on total compensation, not just salary',
        'Use data to support your request',
        'Be prepared to walk away if needed',
        'Maintain a positive, collaborative tone',
      ],
      templates: [
        'Email template for salary negotiation',
        'Script for phone/video call negotiation',
        'Response template for counter-offers',
      ],
    },
    {
      id: 2,
      title: 'Benefits Negotiation',
      description: 'How to negotiate non-salary benefits',
      steps: [
        'Identify valuable benefits',
        'Prioritize your needs',
        'Research company policies',
        'Present your request',
        'Be flexible and creative',
      ],
      tips: [
        'Health insurance can be worth ₹50K+ annually',
        'Stock options can significantly increase total comp',
        'Remote work flexibility is highly valued',
        'Professional development budget',
        'Additional vacation days',
      ],
      templates: [
        'Benefits negotiation email',
        'Benefits comparison template',
      ],
    },
  ];
};

// User Profile APIs
export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await usersApi.getMyProfileUsersMeGet();
  return {
    id: 0,
    name: data.full_name || data.username || data.email || 'User',
    email: data.email || '',
    role: 'candidate',
    bio: data.headline || '',
    joinedAt: new Date(data.updated_at).toISOString(),
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
export const getAutoApplyProfiles = async (): Promise<AutoApplyProfile[]> => {
  requireMockApi('Auto-apply profiles');
  await delay(500);
  return [
    {
      id: 1,
      name: 'Frontend Developer - Remote',
      isActive: true,
      minSalary: 1000000,
      locations: ['Remote', 'Bangalore'],
      jobTypes: ['full-time'],
      requiredSkills: ['React', 'TypeScript', 'JavaScript'],
      skillMatchThreshold: 75,
      jobBoards: ['linkedin', 'indeed', 'naukri'],
      excludeCompanies: ['Company A'],
      excludeKeywords: ['intern', 'junior'],
      dailyApplyLimit: 50,
      applySchedule: 'daily',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      appliedCount: 245,
    },
    {
      id: 2,
      name: 'Full Stack Developer',
      isActive: false,
      minSalary: 1500000,
      locations: ['Bangalore', 'Mumbai', 'Delhi'],
      jobTypes: ['full-time', 'contract'],
      requiredSkills: ['Node.js', 'React', 'MongoDB'],
      skillMatchThreshold: 80,
      jobBoards: ['linkedin', 'glassdoor'],
      excludeCompanies: [],
      excludeKeywords: [],
      dailyApplyLimit: 30,
      applySchedule: 'daily',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      appliedCount: 89,
    },
  ];
};

export const createAutoApplyProfile = async (
  data: Omit<AutoApplyProfile, 'id' | 'createdAt' | 'appliedCount'>
): Promise<AutoApplyProfile> => {
  requireMockApi('Auto-apply profiles');
  await delay(800);
  return {
    id: Math.floor(Math.random() * 1000),
    ...data,
    createdAt: new Date().toISOString(),
    appliedCount: 0,
  };
};

export const updateAutoApplyProfile = async (
  id: number,
  data: Partial<AutoApplyProfile>
): Promise<AutoApplyProfile> => {
  requireMockApi('Auto-apply profiles');
  await delay(600);
  const profiles = await getAutoApplyProfiles();
  const profile = profiles.find((p) => p.id === id);
  if (!profile) throw new Error('Profile not found');
  return { ...profile, ...data };
};

export const deleteAutoApplyProfile = async (_id: number): Promise<{ success: boolean }> => {
  requireMockApi('Auto-apply profiles');
  await delay(500);
  return { success: true };
};

export const bulkApplyToJobs = async (request: BulkApplyRequest): Promise<{
  success: number;
  failed: number;
  total: number;
}> => {
  requireMockApi('Bulk apply');
  await delay(1000);
  const results = await Promise.allSettled(
    request.jobIds.map((id) => applyToJob(id))
  );
  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;
  return { success, failed, total: request.jobIds.length };
};
