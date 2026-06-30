export const ADMIN_SECTIONS = [
  'dashboard',
  'jobs',
  'publish',
  'applications',
  'candidates',
  'analytics',
  'audit',
  'contact',
  'newsletter',
  'plans',
  'settings',
] as const;

export type AdminSection = (typeof ADMIN_SECTIONS)[number];

export function isAdminSection(value: string): value is AdminSection {
  return (ADMIN_SECTIONS as readonly string[]).includes(value);
}
