/** Centralized React Query keys for admin app data consistency. */
export const adminQueryKeys = {
  stats: ['admin-stats'] as const,
  jobs: ['admin-jobs'] as const,
  applications: ['admin-applications'] as const,
  candidates: ['admin-candidates'] as const,
  plans: ['admin-plans'] as const,
  settings: ['admin-settings'] as const,
  auditLogs: ['admin-audit-logs'] as const,
  contactSubmissions: ['admin-contact-submissions'] as const,
  newsletterSubscribers: ['admin-newsletter-subscribers'] as const,
} as const;

/** Invalidate dashboards and lists after admin mutations. */
export const adminMutationInvalidations = [
  adminQueryKeys.stats,
  adminQueryKeys.jobs,
  adminQueryKeys.applications,
  adminQueryKeys.candidates,
  adminQueryKeys.plans,
  adminQueryKeys.settings,
  adminQueryKeys.auditLogs,
] as const;
