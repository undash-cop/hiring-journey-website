/**
 * Analytics utility functions
 * Use these functions to track custom events throughout the application
 */

// Google Analytics event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Page view tracking (handled automatically by GA, but can be used for custom tracking)
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: url,
    });
  }
};

// Common event tracking functions
export const analytics = {
  // User actions
  signup: () => trackEvent("signup", "user", "user_signup"),
  login: () => trackEvent("login", "user", "user_login"),
  logout: () => trackEvent("logout", "user", "user_logout"),

  // Feature usage
  resumeUpload: () => trackEvent("resume_upload", "feature", "resume_upload"),
  resumeAnalysis: () => trackEvent("resume_analysis", "feature", "resume_analysis"),
  jobApplication: (jobId?: string) =>
    trackEvent("job_application", "feature", jobId || "job_application"),
  mockInterview: () => trackEvent("mock_interview", "feature", "mock_interview"),
  autoApply: () => trackEvent("auto_apply", "feature", "auto_apply"),

  // Navigation
  clickPricing: () => trackEvent("click_pricing", "navigation", "pricing_page"),
  clickFeatures: () => trackEvent("click_features", "navigation", "features_page"),
  clickBlog: () => trackEvent("click_blog", "navigation", "blog_page"),
  clickAbout: () => trackEvent("click_about", "navigation", "about_page"),

  // Conversion events
  planSelected: (planName: string) =>
    trackEvent("plan_selected", "conversion", planName),
  creditPurchase: (amount: number) =>
    trackEvent("credit_purchase", "conversion", "credit_purchase", amount),
  subscriptionStarted: (planName: string) =>
    trackEvent("subscription_started", "conversion", planName),

  // Form submissions
  contactFormSubmit: () =>
    trackEvent("contact_form_submit", "form", "contact_form"),
  newsletterSubscribe: () =>
    trackEvent("newsletter_subscribe", "form", "newsletter"),

  // Engagement
  blogPostView: (postId: string) =>
    trackEvent("blog_post_view", "engagement", postId),
  blogPostShare: (postId: string) =>
    trackEvent("blog_post_share", "engagement", postId),
  videoPlay: (videoId: string) =>
    trackEvent("video_play", "engagement", videoId),
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}
