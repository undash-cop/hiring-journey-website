import axios from 'axios';
import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
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
} from '../types';

const api = axios.create({
  // Keep API requests same-origin in development (via Vite proxy) to avoid CORS issues.
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    try {
      const parsed = JSON.parse(token);
      if (parsed.state?.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`;
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  return config;
});

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth APIs
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await delay(800);
  return {
    token: 'mock-jwt-token',
    user: {
      id: 1,
      name: credentials.email === 'admin@test.com' ? 'Admin User' : 'Test User',
      email: credentials.email,
      role: credentials.email === 'admin@test.com' ? 'admin' : 'candidate',
    },
  };
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  await delay(1000);
  return {
    token: 'mock-jwt-token',
    user: {
      id: Math.floor(Math.random() * 1000),
      name: data.name,
      email: data.email,
      role: data.role || 'candidate',
    },
  };
};

export const forgotPassword = async (_email: string): Promise<{ success: boolean }> => {
  await delay(800);
  return { success: true };
};

// Candidate APIs
export const getCandidateDashboard = async (): Promise<DashboardStats> => {
  await delay(600);
  return {
    resumeScore: 85,
    creditsRemaining: 150,
    applicationsCount: 12,
    interviewsCount: 3,
    recentActivity: [
      {
        id: 1,
        type: 'interview',
        message: 'Interview scheduled for Software Engineer at Tech Corp',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        type: 'application',
        message: 'Applied to Frontend Developer at Startup Inc',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        type: 'offer',
        message: 'Received offer from Big Tech Company',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    applicationsTrend: [
      { date: '2024-01-01', count: 2 },
      { date: '2024-01-08', count: 4 },
      { date: '2024-01-15', count: 6 },
      { date: '2024-01-22', count: 8 },
      { date: '2024-01-29', count: 10 },
      { date: '2024-02-05', count: 12 },
    ],
  };
};

export const getJobs = async (): Promise<Job[]> => {
  await delay(500);
  const now = new Date();
  return [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer to join our dynamic team. You will work on cutting-edge web applications using React and modern JavaScript frameworks.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'],
      location: 'Bangalore, India',
      salaryRange: { min: 1200000, max: 1800000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 92,
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'linkedin',
      company: 'TechCorp India',
      companySize: '501-1000 employees',
      companyIndustry: 'Technology',
      experienceRequired: '5-8 years',
      externalUrl: 'https://linkedin.com/jobs/view/123456',
      postedDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 245,
      applicants: 12,
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      description: 'Join our team to build amazing products. We need someone who can work across the entire stack and contribute to both frontend and backend development.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      location: 'Remote',
      salaryRange: { min: 1000000, max: 1500000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 78,
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'indeed',
      company: 'StartupHub',
      companySize: '51-200 employees',
      companyIndustry: 'Software Development',
      experienceRequired: '3-6 years',
      externalUrl: 'https://indeed.com/viewjob?jk=abc123',
      postedDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 189,
      applicants: 8,
    },
    {
      id: 3,
      title: 'React Developer',
      description: 'Looking for a React developer with strong JavaScript skills. You will be responsible for building user interfaces and reusable components.',
      skills: ['React', 'JavaScript', 'CSS', 'Redux', 'HTML'],
      location: 'Mumbai, India',
      salaryRange: { min: 900000, max: 1300000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 85,
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'naukri',
      company: 'Digital Solutions Pvt Ltd',
      companySize: '201-500 employees',
      companyIndustry: 'IT Services',
      experienceRequired: '2-4 years',
      externalUrl: 'https://naukri.com/job-listings-react-developer-12345',
      postedDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 156,
      applicants: 5,
    },
    {
      id: 4,
      title: 'Frontend Engineer - React/TypeScript',
      description: 'We are seeking a talented Frontend Engineer to join our product team. You will work on building scalable web applications.',
      skills: ['React', 'TypeScript', 'GraphQL', 'Jest', 'Webpack'],
      location: 'Hyderabad, India',
      salaryRange: { min: 1100000, max: 1600000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 88,
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'glassdoor',
      company: 'InnovateTech',
      companySize: '1001-5000 employees',
      companyIndustry: 'Cloud Computing',
      experienceRequired: '3-5 years',
      externalUrl: 'https://glassdoor.com/job-listing/frontend-engineer-xyz',
      postedDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 312,
      applicants: 18,
    },
    {
      id: 5,
      title: 'Senior React Developer',
      description: 'Join our engineering team to build next-generation web applications. We value clean code and best practices.',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'],
      location: 'Delhi, India',
      salaryRange: { min: 1300000, max: 1900000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 90,
      createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'monster',
      company: 'Global Tech Services',
      companySize: '501-1000 employees',
      companyIndustry: 'Technology',
      experienceRequired: '4-7 years',
      externalUrl: 'https://monster.com/jobs/senior-react-developer-123',
      postedDate: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 421,
      applicants: 25,
    },
    {
      id: 6,
      title: 'React.js Developer',
      description: 'We are hiring a React.js Developer to work on our client-facing applications. Experience with modern React patterns required.',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
      location: 'Pune, India',
      salaryRange: { min: 800000, max: 1200000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 75,
      createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'shine',
      company: 'WebDev Solutions',
      companySize: '11-50 employees',
      companyIndustry: 'Web Development',
      experienceRequired: '1-3 years',
      externalUrl: 'https://shine.com/jobs/react-developer-456',
      postedDate: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 98,
      applicants: 3,
    },
    {
      id: 7,
      title: 'Full Stack React Developer',
      description: 'Looking for a full stack developer with React expertise. You will work on both frontend and backend systems.',
      skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
      location: 'Chennai, India',
      salaryRange: { min: 950000, max: 1400000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 82,
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'timesjobs',
      company: 'Enterprise Solutions',
      companySize: '201-500 employees',
      companyIndustry: 'Enterprise Software',
      experienceRequired: '2-5 years',
      externalUrl: 'https://timesjobs.com/job-detail/full-stack-react-developer-789',
      postedDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 278,
      applicants: 15,
    },
    {
      id: 8,
      title: 'React Native Developer',
      description: 'Join our mobile team to build cross-platform applications using React Native. Experience with mobile development preferred.',
      skills: ['React Native', 'JavaScript', 'Redux', 'Firebase', 'iOS', 'Android'],
      location: 'Remote',
      salaryRange: { min: 1000000, max: 1500000 },
      employmentType: 'full-time',
      status: 'published',
      skillMatch: 70,
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'linkedin',
      company: 'MobileFirst Inc',
      companySize: '51-200 employees',
      companyIndustry: 'Mobile Development',
      experienceRequired: '2-5 years',
      externalUrl: 'https://linkedin.com/jobs/view/789012',
      postedDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isSaved: false,
      views: 167,
      applicants: 7,
    },
  ];
};

export const applyToJob = async (_jobId: number): Promise<{ success: boolean }> => {
  await delay(800);
  return { success: true };
};

export const getResumeData = async (): Promise<ResumeData> => {
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
  await delay(1500);
  return { success: true, newScore: 92 };
};

export const optimizeResumeForRole = async (_targetRole: string): Promise<{ success: boolean; newScore: number; roleSpecificScore: number }> => {
  await delay(2000);
  return { success: true, newScore: 90, roleSpecificScore: 95 };
};

// Resume Parsing & Analysis APIs
export const parseResume = async (_file: File): Promise<ParsedResume> => {
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
  await delay(1000);
  return { url: `https://api.hiringjourney.com/resume/export/${format}` };
};

export const getCreditUsage = async (): Promise<CreditUsage> => {
  await delay(400);
  return {
    total: 200,
    used: 50,
    remaining: 150,
    breakdown: {
      resumeOptimization: 20,
      interviewPrep: 15,
      autoApply: 10,
      negotiation: 5,
    },
  };
};

export const getApplications = async (): Promise<Application[]> => {
  await delay(500);
  return [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      candidateId: 1,
      candidateName: 'Test User',
      status: 'interview-scheduled',
      appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      interviewDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      resumeScore: 85,
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'Full Stack Engineer',
      candidateId: 1,
      candidateName: 'Test User',
      status: 'applied',
      appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      resumeScore: 78,
    },
    {
      id: 3,
      jobId: 3,
      jobTitle: 'React Developer',
      candidateId: 1,
      candidateName: 'Test User',
      status: 'offer',
      appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      interviewDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      resumeScore: 90,
    },
  ];
};

// Admin APIs
export const getAdminStats = async (): Promise<AdminStats> => {
  await delay(600);
  return {
    totalCandidates: 1250,
    activeJobs: 45,
    applications: 320,
    creditUsage: 12500,
    funnel: {
      applied: 320,
      interviewScheduled: 85,
      interviewCompleted: 60,
      offer: 25,
    },
    jobPerformance: [
      { jobId: 1, jobTitle: 'Senior Frontend Developer', applications: 45, conversions: 12 },
      { jobId: 2, jobTitle: 'Full Stack Engineer', applications: 38, conversions: 8 },
      { jobId: 3, jobTitle: 'React Developer', applications: 52, conversions: 15 },
    ],
  };
};

export const publishJob = async (data: PublishJobData): Promise<PublishJobResponse> => {
  await delay(1200);
  const response: PublishJobResponse = {
    success: true,
  };
  if (data.publishTo.includes('linkedin')) {
    response.externalPostingIds = { ...response.externalPostingIds, linkedin: 'mock-123' };
  }
  if (data.publishTo.includes('indeed')) {
    response.externalPostingIds = {
      ...response.externalPostingIds,
      indeed: 'mock-456',
    };
  }
  return response;
};

export const getAdminJobs = async (): Promise<Job[]> => {
  await delay(500);
  return [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer...',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      location: 'San Francisco, CA',
      salaryRange: { min: 1200000, max: 1800000 },
      employmentType: 'full-time',
      status: 'published',
      applicantCount: 45,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'internal',
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      description: 'Join our team to build amazing products...',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      location: 'Remote',
      salaryRange: { min: 1000000, max: 1500000 },
      employmentType: 'full-time',
      status: 'draft',
      applicantCount: 0,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'internal',
    },
    {
      id: 3,
      title: 'React Developer',
      description: 'Looking for a React developer...',
      skills: ['React', 'JavaScript', 'CSS'],
      location: 'New York, NY',
      salaryRange: { min: 900000, max: 1300000 },
      employmentType: 'full-time',
      status: 'archived',
      applicantCount: 52,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'internal',
    },
  ];
};

export const getAllApplications = async (): Promise<Application[]> => {
  await delay(500);
  return [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      candidateId: 1,
      candidateName: 'John Doe',
      status: 'interview-scheduled',
      appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      interviewDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      resumeScore: 85,
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'Full Stack Engineer',
      candidateId: 2,
      candidateName: 'Jane Smith',
      status: 'applied',
      appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      resumeScore: 78,
    },
    {
      id: 3,
      jobId: 3,
      jobTitle: 'React Developer',
      candidateId: 3,
      candidateName: 'Bob Johnson',
      status: 'offer',
      appliedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      interviewDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      resumeScore: 90,
    },
  ];
};

export const getCandidates = async (): Promise<Candidate[]> => {
  await delay(500);
  return [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      resumeScore: 85,
      creditsUsed: 50,
      creditsTotal: 200,
      status: 'active',
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      resumeScore: 92,
      creditsUsed: 120,
      creditsTotal: 200,
      status: 'active',
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      resumeScore: 78,
      creditsUsed: 30,
      creditsTotal: 200,
      status: 'suspended',
      joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export const updateCredits = async (
  _candidateId: number,
  _credits: number
): Promise<{ success: boolean }> => {
  await delay(600);
  return { success: true };
};

export const getPlans = async (): Promise<Plan[]> => {
  await delay(400);
  return [
    { id: 1, name: 'Basic', creditLimit: 100, price: 29000, usage: 45 },
    { id: 2, name: 'Professional', creditLimit: 200, price: 59000, usage: 120 },
    { id: 3, name: 'Enterprise', creditLimit: 500, price: 149000, usage: 320 },
  ];
};

// Legal Readiness APIs
export const getLegalDocuments = async (): Promise<LegalDocument[]> => {
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
  await delay(1500);
  return { success: true, issues: [] };
};

// Coding Arena APIs
export const getCodingChallenges = async (): Promise<CodingChallenge[]> => {
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
  await delay(500);
  const token = localStorage.getItem('auth-storage');
  let userEmail = 'test@example.com';
  if (token) {
    try {
      const parsed = JSON.parse(token);
      userEmail = parsed.state?.user?.email || userEmail;
    } catch (e) {
      // Ignore
    }
  }
  return {
    id: 1,
    name: userEmail === 'admin@test.com' ? 'Admin User' : 'Test User',
    email: userEmail,
    role: userEmail === 'admin@test.com' ? 'admin' : 'candidate',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    bio: 'Experienced software developer passionate about building great products.',
    linkedinUrl: 'https://linkedin.com/in/testuser',
    githubUrl: 'https://github.com/testuser',
    portfolioUrl: 'https://testuser.dev',
    experience: '5+ years of experience in full-stack development',
    education: 'B.Tech in Computer Science',
    resumeScore: 85,
    applicationsCount: 12,
    interviewsCount: 3,
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  };
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  await delay(800);
  const currentProfile = await getUserProfile();
  return { ...currentProfile, ...data };
};

export const getUserSettings = async (): Promise<UserSettings> => {
  await delay(400);
  const stored = localStorage.getItem('user-settings');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // Ignore
    }
  }
  return {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    autoApplyEnabled: false,
    skillMatchThreshold: 70,
    preferredLocations: [],
    preferredJobTypes: [],
    theme: 'system',
  };
};

export const updateUserSettings = async (settings: UserSettings): Promise<UserSettings> => {
  await delay(600);
  localStorage.setItem('user-settings', JSON.stringify(settings));
  return settings;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean }> => {
  await delay(800);
  // Mock validation
  if (data.currentPassword.length < 6) {
    throw new Error('Current password is incorrect');
  }
  return { success: true };
};

// Paginated APIs
export const getJobsPaginated = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Job>> => {
  await delay(500);
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
  await delay(500);
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
  await delay(500);
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
  await delay(600);
  const profiles = await getAutoApplyProfiles();
  const profile = profiles.find((p) => p.id === id);
  if (!profile) throw new Error('Profile not found');
  return { ...profile, ...data };
};

export const deleteAutoApplyProfile = async (_id: number): Promise<{ success: boolean }> => {
  await delay(500);
  return { success: true };
};

export const bulkApplyToJobs = async (request: BulkApplyRequest): Promise<{
  success: number;
  failed: number;
  total: number;
}> => {
  await delay(1000);
  const results = await Promise.allSettled(
    request.jobIds.map((id) => applyToJob(id))
  );
  const success = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;
  return { success, failed, total: request.jobIds.length };
};

export default api;
