/**
 * Analytics helpers for GA4 and Plausible.
 * Fire events only after the underlying action succeeds.
 */

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

function pushDataLayer(event: string, payload?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...payload });
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  props?: AnalyticsProps,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
      ...props,
    });
  }

  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(action, {
      props: {
        category,
        ...(label ? { label } : {}),
        ...(value != null ? { value: String(value) } : {}),
        ...Object.fromEntries(
          Object.entries(props ?? {}).map(([key, val]) => [key, String(val)]),
        ),
      },
    });
  }

  pushDataLayer(action, { category, label, value, ...props });
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: url,
    });
  }
};

export function trackSignup(method = "keycloak") {
  trackEvent("sign_up", "user", "user_signup", undefined, { method });
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "sign_up", { method });
  }
}

export function trackConversion(label: string, value = 1) {
  trackEvent("conversion", "conversion", label, value);
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", { event_label: label, value });
  }
}

export function trackBlogRelatedClick(payload: {
  currentPostSlug: string;
  currentCategorySlug: string;
  relatedPostSlug: string;
  relatedCategorySlug: string;
  position: number;
}) {
  trackEvent("blog_related_click", "engagement", payload.relatedPostSlug, payload.position, payload);
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "blog_related_click", payload);
  }
}

export function trackBlogRelatedCategoryClick(payload: {
  currentPostSlug: string;
  currentCategorySlug: string;
}) {
  trackEvent("blog_related_category_click", "engagement", payload.currentCategorySlug, undefined, payload);
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "blog_related_category_click", payload);
  }
}

export const analytics = {
  signup: () => trackSignup("keycloak"),
  login: () => trackEvent("login", "user", "user_login"),
  logout: () => trackEvent("logout", "user", "user_logout"),

  resumeUpload: () => trackEvent("resume_upload", "feature", "resume_upload"),
  resumeAnalysis: (role?: string) =>
    trackEvent("resume_analysis", "feature", role || "resume_analysis"),
  jobApplication: (jobId?: string | number) =>
    trackEvent("job_application", "feature", jobId != null ? String(jobId) : "job_application"),
  mockInterviewStart: (type: string) =>
    trackEvent("mock_interview_start", "feature", type),
  mockInterviewFeedback: (type: string, score: number) =>
    trackEvent("mock_interview_feedback", "feature", type, score),
  autoApply: () => trackEvent("auto_apply", "feature", "auto_apply"),
  codingChallengeSolved: (challengeId: number) =>
    trackEvent("coding_challenge_solved", "feature", String(challengeId)),

  clickPricing: () => trackEvent("click_pricing", "navigation", "pricing_page"),
  clickFeatures: () => trackEvent("click_features", "navigation", "features_page"),
  clickBlog: () => trackEvent("click_blog", "navigation", "blog_page"),
  clickAbout: () => trackEvent("click_about", "navigation", "about_page"),
  clickSignup: (source: string) => trackEvent("click_signup", "navigation", source),
  clickLogin: (source: string) => trackEvent("click_login", "navigation", source),
  googleSignIn: () => trackEvent("google_sign_in", "auth", "google"),
  googleSignUp: () => trackEvent("google_sign_up", "auth", "google"),

  planSelected: (planName: string) => trackEvent("plan_selected", "conversion", planName),
  checkoutStarted: (planName: string) =>
    trackEvent("checkout_started", "conversion", planName),
  creditPurchase: (amount: number) =>
    trackEvent("credit_purchase", "conversion", "credit_purchase", amount),
  subscriptionStarted: (planName: string) =>
    trackEvent("subscription_started", "conversion", planName),

  contactFormSubmit: () => trackEvent("contact_form_submit", "form", "contact_form"),
  newsletterSubscribe: () => trackEvent("newsletter_subscribe", "form", "newsletter"),

  blogPostView: (postId: string) => trackEvent("blog_post_view", "engagement", postId),
  blogPostShare: (postId: string) => trackEvent("blog_post_share", "engagement", postId),
  videoPlay: (videoId: string) => trackEvent("video_play", "engagement", videoId),
};

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string> },
    ) => void;
  }
}
