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

export function trackSignup(method = "email") {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "sign_up", { method });
  window.dataLayer?.push({ event: "sign_up", method });
}

export function trackConversion(label: string, value = 1) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", { event_label: label, value });
  window.dataLayer?.push({ event: "conversion", label, value });
}

export function trackBlogRelatedClick(payload: {
  currentPostSlug: string;
  currentCategorySlug: string;
  relatedPostSlug: string;
  relatedCategorySlug: string;
  position: number;
}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "blog_related_click", payload);
  window.dataLayer?.push({ event: "blog_related_click", ...payload });
}

export function trackBlogRelatedCategoryClick(payload: {
  currentPostSlug: string;
  currentCategorySlug: string;
}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "blog_related_category_click", payload);
  window.dataLayer?.push({ event: "blog_related_category_click", ...payload });
}
