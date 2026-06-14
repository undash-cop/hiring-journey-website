/** Canonical product auth entry points (Keycloak redirect handlers). */
export const APP_ROUTES = {
  login: "/app/login",
  signup: "/app/signup",
  forgotPassword: "/app/forgot-password",
  dashboard: "/app/dashboard",
} as const;

export const MARKETING_ROUTES = {
  home: "/",
  features: "/features",
  pricing: "/pricing",
  about: "/about",
  blog: "/blog",
  careers: "/careers",
  contact: "/contact",
  faq: "/faq",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookie-policy",
} as const;
