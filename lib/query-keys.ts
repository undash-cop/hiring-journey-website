/** Centralized React Query keys for candidate app data consistency. */
export const queryKeys = {
  candidateDashboard: ['candidate-dashboard'] as const,
  jobs: ['jobs'] as const,
  applications: ['applications'] as const,
  creditUsage: ['credit-usage'] as const,
  userProfile: ['user-profile'] as const,
  userSettings: ['user-settings'] as const,
  resumeData: ['resume-data'] as const,
  resumeVersions: ['resume-versions'] as const,
  resumeTemplates: ['resume-templates'] as const,
  resumeBuilder: ['resume-builder'] as const,
  autoApplyProfiles: ['auto-apply-profiles'] as const,
  negotiationFrameworks: ['negotiation-frameworks'] as const,
  legalDocuments: ['legal-documents'] as const,
  codingChallenges: ['coding-challenges'] as const,
} as const;

/** Invalidate dashboard, tracker, and credits after job/application mutations. */
export const applicationMutationInvalidations = [
  queryKeys.jobs,
  queryKeys.applications,
  queryKeys.candidateDashboard,
  queryKeys.creditUsage,
] as const;

/** Invalidate score and credits after resume optimization actions. */
export const resumeMutationInvalidations = [
  queryKeys.resumeData,
  queryKeys.candidateDashboard,
  queryKeys.creditUsage,
  queryKeys.userProfile,
] as const;
