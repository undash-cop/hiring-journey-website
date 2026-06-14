export type UserRole = 'candidate' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  experience?: string;
  education?: string;
}

export interface UserProfile extends User {
  resumeScore?: number;
  applicationsCount?: number;
  interviewsCount?: number;
  joinedAt: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  autoApplyEnabled: boolean;
  skillMatchThreshold: number;
  preferredLocations: string[];
  preferredJobTypes: string[];
  theme: 'light' | 'dark' | 'system';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  skills: string[];
  location: string;
  salaryRange: {
    min: number;
    max: number;
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'draft' | 'published' | 'archived';
  skillMatch?: number;
  applicantCount?: number;
  createdAt: string;
  // Job board information
  source?: 'internal' | 'linkedin' | 'indeed' | 'naukri' | 'glassdoor' | 'monster' | 'shine' | 'timesjobs';
  company?: string;
  companyLogo?: string;
  companySize?: string;
  companyIndustry?: string;
  experienceRequired?: string;
  externalUrl?: string;
  postedDate?: string;
  jobBoardLogo?: string;
  isSaved?: boolean;
  views?: number;
  applicants?: number;
}

export interface Application {
  id: number;
  jobId: number;
  jobTitle: string;
  candidateId: number;
  candidateName: string;
  status: 'applied' | 'interview-scheduled' | 'interview-completed' | 'offer' | 'rejected';
  appliedAt: string;
  interviewDate?: string;
  resumeScore?: number;
}

export interface ResumeData {
  score: number;
  suggestions: string[];
  lastUpdated: string;
  targetRole?: string;
  roleSpecificScore?: number;
  atsScore?: number;
  keywordMatch?: number;
  skillsGap?: string[];
}

export interface ParsedResume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  experience: {
    company: string;
    title: string;
    duration: string;
    location: string;
    description: string;
    achievements: string[];
    skills: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
    gpa?: string;
  }[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }[];
}

export interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;
  keywordMatch: number;
  formattingScore: number;
  contentScore: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  skillsGap: string[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    suggestion: string;
    impact: string;
  }[];
  parsedData: ParsedResume;
}

export interface ResumeVersion {
  id: number;
  name: string;
  targetRole: string;
  createdAt: string;
  score: number;
  isDefault: boolean;
  templateId?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'modern' | 'professional' | 'creative' | 'minimalist' | 'executive';
  description: string;
  preview: string;
  atsFriendly: boolean;
  isPopular: boolean;
}

export interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages';
  title: string;
  content: string;
  order: number;
  isVisible: boolean;
}

export interface ResumeBuilderData {
  template: string;
  sections: ResumeSection[];
  personalInfo: ParsedResume['personalInfo'];
  summary: string;
  experience: ParsedResume['experience'];
  education: ParsedResume['education'];
  skills: ParsedResume['skills'];
  certifications: ParsedResume['certifications'];
  projects: ParsedResume['projects'];
}

export interface LegalDocument {
  id: number;
  type: 'offer-letter' | 'employment-contract' | 'nda' | 'non-compete' | 'other';
  name: string;
  status: 'pending' | 'validated' | 'issues-found';
  uploadedAt: string;
  issues?: string[];
}

export interface CodingChallenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'arrays' | 'strings' | 'algorithms' | 'data-structures' | 'system-design';
  tags: string[];
  solved: boolean;
  attempts: number;
}

export interface NegotiationFramework {
  id: number;
  title: string;
  description: string;
  steps: string[];
  tips: string[];
  templates: string[];
}

export interface CreditUsage {
  total: number;
  used: number;
  remaining: number;
  breakdown: {
    resumeOptimization: number;
    interviewPrep: number;
    autoApply: number;
    negotiation: number;
  };
}

export interface DashboardStats {
  resumeScore: number;
  creditsRemaining: number;
  applicationsCount: number;
  interviewsCount: number;
  recentActivity: Activity[];
  applicationsTrend: { date: string; count: number }[];
}

export interface Activity {
  id: number;
  type: 'application' | 'interview' | 'offer' | 'rejection';
  message: string;
  timestamp: string;
}

export interface AdminStats {
  totalCandidates: number;
  activeJobs: number;
  applications: number;
  creditUsage: number;
  funnel: {
    applied: number;
    interviewScheduled: number;
    interviewCompleted: number;
    offer: number;
  };
  jobPerformance: { jobId: number; jobTitle: string; applications: number; conversions: number }[];
}

export interface PublishJobData {
  title: string;
  description: string;
  skills: string[];
  location: string;
  salaryRange: {
    min: number;
    max: number;
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  publishTo: ('internal' | 'linkedin' | 'indeed')[];
}

export interface PublishJobResponse {
  success: boolean;
  externalPostingIds?: {
    linkedin?: string;
    indeed?: string;
  };
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  resumeScore: number;
  creditsUsed: number;
  creditsTotal: number;
  status: 'active' | 'suspended';
  joinedAt: string;
}

export interface Plan {
  id: number;
  name: string;
  creditLimit: number;
  price: number;
  usage: number;
}

export interface AdminAuditLog {
  id: number;
  actorSub: string;
  action: string;
  resourceType: string;
  resourceId: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}

export interface AutoApplyProfile {
  id: number;
  name: string;
  isActive: boolean;
  minSalary: number;
  locations: string[];
  jobTypes: string[];
  requiredSkills: string[];
  skillMatchThreshold: number;
  jobBoards: string[];
  excludeCompanies: string[];
  excludeKeywords: string[];
  resumeVersion?: string;
  dailyApplyLimit: number;
  applySchedule: 'daily' | 'weekly' | 'custom';
  createdAt: string;
  appliedCount: number;
}

export interface BulkApplyRequest {
  jobIds: number[];
  resumeVersion?: string;
  customCoverLetter?: string;
}
