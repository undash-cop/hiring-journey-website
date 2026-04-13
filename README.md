# Hiring Journey Website

Production-grade AI SaaS website for Hiring Journey by Undash-cop Private Limited.

## Current Auth Architecture

- Authentication is handled by Keycloak.
- App entry routes `/app/login`, `/app/signup`, and `/app/forgot-password` are redirect-only handlers.
- Local auth form pages/components are intentionally removed to avoid duplicate auth surfaces.

## Requirements

- **Node.js**: >= 22.0.0
- **npm**: >= 10.0.0

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Deployment**: Netlify

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

**Note**: Make sure you're using Node.js 22 or higher. You can use `nvm` to manage Node versions:
```bash
nvm use 22
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Documentation

### Setup & Deployment
- **[Deployment Guide](DEPLOYMENT.md)** - Complete guide for deploying to Netlify

### Architecture & Features
- **[Architecture Decisions](ARCHITECTURE_DECISION.md)** - Key architectural decisions
- **[Pricing to Signup Flow](PRICING_TO_SIGNUP_FLOW.md)** - How plan selection flows to signup
- **[Middleware Setup](MIDDLEWARE_SETUP.md)** - Configuring optional redirects

### Configuration
- **[Analytics Setup](ANALYTICS_SETUP.md)** - Setting up Google Analytics and Plausible
- **[Team Data](TEAM_DATA.md)** - Updating team member information

### Development
- **[Next Steps](NEXT_STEPS.md)** - Development roadmap and backend integration
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions

## Deployment

This project is configured for Netlify deployment. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.
