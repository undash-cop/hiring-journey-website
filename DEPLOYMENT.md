# Deployment Guide - Hiring Journey Website

This guide will help you deploy the Hiring Journey website to Netlify.

## Prerequisites

1. **GitHub/GitLab/Bitbucket Account**: Your code should be in a Git repository
2. **Netlify Account**: Sign up at [netlify.com](https://www.netlify.com)
3. **Node.js 22+**: Ensure your local environment matches

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for First Time)

1. **Push Code to Git Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect Repository to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub/GitLab/Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   Netlify should auto-detect Next.js, but verify:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (handled by plugin)
   - **Node version**: `22` (set in netlify.toml)

4. **Set Environment Variables**
   In Netlify Dashboard → Site settings → Environment variables, add:
   ```
   NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
   ```
   (Replace with your actual Netlify URL after first deployment)

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in Your Project**
   ```bash
   netlify init
   ```
   Follow the prompts:
   - Create & configure a new site
   - Link to existing site (if you already have one)
   - Set build command: `npm run build`
   - Set publish directory: `.next`

4. **Set Environment Variables**
   ```bash
   netlify env:set NEXT_PUBLIC_APP_URL https://your-site-name.netlify.app
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Environment Variables

### Required for Production

Set these in Netlify Dashboard → Site settings → Environment variables:

```env
NEXT_PUBLIC_APP_URL=https://your-actual-domain.com
```

### Optional (for future backend integration)

```env
# Backend API (when ready)
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Analytics (when ready)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Post-Deployment Checklist

- [ ] Verify site is accessible
- [ ] Test all pages (Home, Features, Pricing, Blog, About, Contact)
- [ ] Check mobile responsiveness
- [ ] Verify dark mode works
- [ ] Test form submissions (Contact form)
- [ ] Check SEO metadata (view page source)
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt
- [ ] Test navigation and links
- [ ] Verify images load correctly

## Custom Domain Setup

1. **In Netlify Dashboard**:
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `hiringjourney.com`)

2. **Configure DNS**:
   - Add CNAME record pointing to your Netlify site
   - Or use Netlify DNS (recommended)

3. **SSL Certificate**:
   - Netlify automatically provisions SSL certificates via Let's Encrypt
   - HTTPS will be enabled automatically

## Build Optimization

The current setup includes:
- ✅ Next.js 15 with App Router
- ✅ Netlify Next.js plugin for optimization
- ✅ Node.js 22 specified in netlify.toml
- ✅ Automatic image optimization
- ✅ Static page generation where possible

## Troubleshooting

### Build Fails

1. **Check Node Version**:
   - Ensure `NODE_VERSION = "22"` in netlify.toml
   - Or set in Netlify UI: Site settings → Build & deploy → Environment

2. **Check Build Logs**:
   - Go to Deploys → Click on failed deploy → View logs
   - Look for specific error messages

3. **Common Issues**:
   - Missing environment variables
   - Node version mismatch
   - Dependency installation failures

### Site Not Updating

1. **Clear Cache**:
   - Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy site

2. **Check Git Connection**:
   - Ensure Netlify is connected to correct branch
   - Verify latest commits are pushed

### Performance Issues

1. **Check Build Output**:
   - Look for large bundle sizes
   - Optimize images if needed

2. **Enable Netlify Analytics**:
   - Site settings → Analytics → Enable

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:
- Push to `main` → Automatic deploy
- Create pull request → Deploy preview
- Merge PR → Production deploy

## Next Steps After Deployment

1. **Set up Custom Domain** (if you have one)
2. **Configure Analytics** (Google Analytics, Plausible, etc.)
3. **Set up Error Monitoring** (Sentry)
4. **Configure Backend APIs** (when ready)
5. **Set up Payment Gateway** (when ready)

## Support

For issues:
1. Check Netlify build logs
2. Review Next.js documentation
3. Check Netlify status page
4. Contact Netlify support if needed

---

**Your site is now live! 🎉**
