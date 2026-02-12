# Quick Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Build Verification
- ✅ Build passes locally (`npm run build`)
- ✅ No TypeScript errors
- ✅ All pages render correctly

### 2. Git Repository Status
Your code needs to be committed and pushed to Git before deploying to Netlify.

**Current Status**: You have uncommitted changes. Commit them first:

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Update blog posts with AI content and prepare for deployment"

# Push to repository
git push origin main
```

### 3. Netlify Configuration
- ✅ `netlify.toml` is configured correctly
- ✅ Node.js version set to 22
- ✅ Build command: `npm run build`
- ✅ Next.js plugin configured

## 🚀 Deployment Steps

### Method 1: Netlify Dashboard (Easiest)

1. **Go to [Netlify](https://app.netlify.com)** and sign in

2. **Click "Add new site" → "Import an existing project"**

3. **Connect your Git provider** (GitHub/GitLab/Bitbucket)

4. **Select your repository**: `hiring-journey-website`

5. **Build settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `.next` (or leave empty - plugin handles it)
   - Node version: `22`

6. **Environment Variables**:
   Click "Show advanced" → "New variable"
   - Key: `NEXT_PUBLIC_APP_URL`
   - Value: `https://your-site-name.netlify.app` (update after first deploy)

7. **Click "Deploy site"**

8. **Wait for build** (~2-5 minutes)

9. **Update Environment Variable**:
   After first deploy, update `NEXT_PUBLIC_APP_URL` to your actual Netlify URL

### Method 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```

## 📋 Post-Deployment

After deployment, verify:

- [ ] Site loads at Netlify URL
- [ ] All pages accessible (Home, Features, Pricing, Blog, About, Contact)
- [ ] Images load correctly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Forms work (Contact form)
- [ ] Navigation works
- [ ] SEO metadata present (check page source)

## 🔧 Environment Variables Setup

In Netlify Dashboard → Site settings → Environment variables:

**Required:**
```
NEXT_PUBLIC_APP_URL=https://your-actual-netlify-url.netlify.app
```

**Optional (for future):**
```
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify Node.js version is 22
- Ensure all dependencies are in package.json

### Site Not Loading
- Check environment variables
- Verify build succeeded
- Check Netlify status page

### Images Not Loading
- Verify image URLs are correct
- Check if using external URLs (Unsplash should work)

## 📝 Next Steps After Deployment

1. Set up custom domain (if you have one)
2. Configure analytics
3. Set up error monitoring (Sentry)
4. Test all functionality
5. Share the URL with your team!

---

**Ready to deploy?** Make sure your code is committed and pushed to Git, then follow the steps above! 🚀
