# Hiring Journey Website

Production-grade AI SaaS website for Hiring Journey by Undash-cop Private Limited.

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

## Deployment

This project is configured for Netlify deployment. Push to your repository and Netlify will automatically build and deploy.
