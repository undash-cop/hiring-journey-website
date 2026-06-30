# GA4 setup checklist (production)

Operator steps to finish analytics after code deploy. Events are already wired in `lib/analytics.ts`; this checklist configures GA4 to measure them.

**Prerequisite:** `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` set on Netlify (production already uses `G-PXT7N5WDPH` in `.env.prod.local`).

## 1. Verify realtime events (5 min)

1. Open [Google Analytics](https://analytics.google.com/) → your property → **Reports → Realtime**.
2. Visit `https://hiringjourney.com` in an incognito window (disable ad blockers).
3. Confirm **page_view** and at least one custom event within 30 seconds.
4. Click a marketing CTA (e.g. Pricing) and confirm `click_pricing` in Realtime → **Event count by Event name**.

## 2. Mark conversion events (10 min)

GA4 → **Admin** → **Data display** → **Events**.

Wait until each event has fired at least once in Realtime (or trigger manually in staging), then toggle **Mark as conversion**:

| Event | Funnel |
|-------|--------|
| `sign_up` | Acquisition |
| `google_sign_up` | Acquisition (when Google OAuth enabled) |
| `click_signup` | Top-of-funnel intent |
| `resume_upload` | Activation |
| `job_application` | Core value |
| `checkout_started` | Monetization intent |
| `subscription_started` | Revenue |
| `contact_form_submit` | Lead gen |
| `newsletter_subscribe` | Lead gen |

## 3. Funnel exploration (10 min)

1. **Explore** → **Funnel exploration** → new report.
2. Steps (in order):
   - `click_signup`
   - `sign_up`
   - `resume_upload`
   - `job_application`
   - `checkout_started`
   - `subscription_started`
3. Breakdown dimension: `device category` (optional).
4. Save as **Product funnel**.

## 4. Executive dashboard (15 min)

1. **Reports** → **Library** → **Create new report** → **Detail report**.
2. Add scorecards:
   - Conversions: `sign_up` (last 7 days)
   - Conversions: `job_application` (last 7 days)
   - Conversions: `subscription_started` (last 28 days)
3. Add time series: daily `job_application` events.
4. Pin to **Home** for the property.

## 5. Alerts (optional)

**Admin** → **Data display** → **Custom insights** (or linked Looker Studio):

- Week-over-week drop in `sign_up` > 40%
- Zero `job_application` events for 24h on a weekday

## 6. Plausible parity (if used)

Site settings → **Goals** → add the same event names as above.

## 7. Post-setup smoke

| Action | Expected event |
|--------|----------------|
| Footer newsletter submit | `newsletter_subscribe` |
| Contact form success | `contact_form_submit` |
| Login via Keycloak | `login` |
| Apply to a job | `job_application` |
| Start paid checkout | `checkout_started` |

## Related

- [analytics.md](../development/analytics.md) — env vars and event catalog
- [release-readiness.md](./release-readiness.md) — observability section
- [observability.md](../development/observability.md) — Sentry + GA together
