# Analytics Setup Guide

This guide explains how to set up and use analytics on the Hiring Journey website.

## Supported Analytics Providers

### 1. Google Analytics 4 (GA4) - Recommended

Google Analytics 4 is the default analytics solution, providing comprehensive tracking of user behavior, conversions, and engagement.

**Setup Steps:**

1. **Create a Google Analytics Account**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Sign in with your Google account
   - Create a new property for your website

2. **Get Your Measurement ID**
   - In GA4, go to Admin → Data Streams
   - Click on your web stream
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

3. **Add to Environment Variables**
   - Add to `.env.local` for local development:
     ```env
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     ```
   - Add to Netlify environment variables for production:
     - Go to Site settings → Environment variables
     - Add `NEXT_PUBLIC_GA_ID` with your Measurement ID

4. **Verify Installation**
   - Deploy your site
   - Visit your website
   - Go to GA4 → Reports → Realtime
   - You should see your visit appear within seconds

### 2. Plausible Analytics (Privacy-Friendly Alternative)

Plausible is a privacy-friendly, GDPR-compliant analytics solution that doesn't use cookies.

**Setup Steps:**

1. **Sign up for Plausible**
   - Go to [Plausible](https://plausible.io/)
   - Create an account and add your domain

2. **Add to Environment Variables**
   - Add to `.env.local`:
     ```env
     NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
     ```
   - Add to Netlify environment variables for production

3. **Verify Installation**
   - Visit your website
   - Check Plausible dashboard for real-time stats

## Automatic Tracking

The following events are automatically tracked:

### Page Views
- All page navigations are automatically tracked
- No additional code needed

### User Actions
- **Signup**: When users create an account
- **Login**: When users log in
- **Contact Form**: When contact form is submitted

### Feature Usage
- **Resume Upload**: When users upload a resume
- **Resume Analysis**: When resume analysis is requested
- **Job Application**: When users apply to jobs
- **Mock Interview**: When users start mock interviews
- **Auto-Apply**: When auto-apply is activated

### Navigation
- **Pricing Clicks**: When users click on pricing plans
- **Feature Page Views**: When users visit features page
- **Blog Views**: When users view blog posts

### Conversions
- **Plan Selection**: When users select a pricing plan
- **Credit Purchase**: When users purchase credits
- **Subscription Started**: When users start a subscription

## Custom Event Tracking

You can track custom events using the analytics utility:

```typescript
import { analytics } from "@/lib/analytics";

// Track a custom event
analytics.trackEvent("button_click", "engagement", "header_cta");

// Track plan selection
analytics.planSelected("Pro");

// Track feature usage
analytics.resumeUpload();
```

## Available Analytics Functions

### Basic Tracking
- `trackEvent(action, category, label?, value?)` - Track custom events
- `trackPageView(url)` - Track page views manually

### Pre-built Events
- `analytics.signup()` - User signup
- `analytics.login()` - User login
- `analytics.logout()` - User logout
- `analytics.contactFormSubmit()` - Contact form submission
- `analytics.planSelected(planName)` - Pricing plan selection
- `analytics.resumeUpload()` - Resume upload
- `analytics.jobApplication(jobId?)` - Job application
- `analytics.mockInterview()` - Mock interview started
- `analytics.blogPostView(postId)` - Blog post viewed
- `analytics.blogPostShare(postId)` - Blog post shared

## Privacy & Compliance

### GDPR Compliance
- Analytics respects user privacy preferences
- Cookie consent can be integrated (see cookie policy page)
- Users can opt-out of tracking

### Data Collection
- No personally identifiable information (PII) is collected
- IP addresses are anonymized
- User behavior is tracked anonymously

## Testing Analytics

### Local Development
1. Set `NEXT_PUBLIC_GA_ID` in `.env.local`
2. Run `npm run dev`
3. Visit your site
4. Check GA4 Realtime reports

### Production
1. Deploy with environment variables set
2. Visit your live site
3. Verify events in GA4 dashboard

## Common Events to Track

### Conversion Funnels
1. Landing page view → Feature page view → Pricing page view → Signup
2. Blog post view → Newsletter subscribe → Signup
3. Pricing plan click → Signup → Subscription

### Engagement Metrics
- Time on page
- Scroll depth
- Video plays
- Form interactions
- Button clicks

### Feature Adoption
- Resume analysis usage
- Job application frequency
- Mock interview completions
- Credit usage patterns

## Troubleshooting

### Events Not Showing
1. **Check Environment Variables**
   - Verify `NEXT_PUBLIC_GA_ID` is set correctly
   - Ensure no typos in the Measurement ID

2. **Check Browser Console**
   - Open browser DevTools → Console
   - Look for analytics-related errors

3. **Verify Script Loading**
   - Check Network tab for `gtag/js` requests
   - Ensure scripts are loading from `googletagmanager.com`

4. **Ad Blockers**
   - Some ad blockers prevent analytics
   - Test in incognito mode or disable blockers

### GA4 Not Receiving Data
1. **Check Measurement ID Format**
   - Should be `G-XXXXXXXXXX`
   - Not `UA-XXXXXXXXX-X` (that's Universal Analytics, deprecated)

2. **Verify Property Setup**
   - Ensure web stream is configured correctly
   - Check that your domain is added

3. **Wait for Processing**
   - GA4 can take 24-48 hours for some reports
   - Realtime reports show immediately

## Best Practices

1. **Don't Over-Track**
   - Only track meaningful events
   - Avoid tracking every click

2. **Use Consistent Naming**
   - Use lowercase with underscores
   - Be descriptive: `resume_upload` not `ru`

3. **Test Before Deploying**
   - Test events in development
   - Verify in GA4 Realtime before going live

4. **Respect Privacy**
   - Don't track sensitive information
   - Follow GDPR guidelines
   - Provide opt-out options

## Next Steps

1. Set up Google Analytics account
2. Add Measurement ID to environment variables
3. Deploy and verify tracking
4. Set up custom dashboards in GA4
5. Configure conversion goals
6. Set up email reports

---

For questions or issues, refer to:
- [Google Analytics Help](https://support.google.com/analytics)
- [Plausible Documentation](https://plausible.io/docs)
