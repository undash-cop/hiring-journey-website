# Team Data Update Guide

This guide explains how to update team member data from the Undash-cop website.

## Current Implementation

The team section fetches data from `/api/team` which pulls team information from Undash-cop's website structure.

## How to Update Team Data

### Option 1: Manual Update (Recommended)

1. **Visit https://undash-cop.com/about**
2. **Extract team member information:**
   - Name
   - Role/Position
   - Bio/Description
   - LinkedIn URL
   - Email
   - GitHub (if available)

3. **Update the data in `lib/fetch-team-data.ts`:**
   ```typescript
   return [
     {
       name: "Actual Name",
       role: "Actual Role",
       bio: "Actual bio from website",
       image: "👨‍💼", // or appropriate emoji
       linkedin: "https://linkedin.com/in/...",
       email: "email@undash-cop.com",
       github: null, // or GitHub URL
     },
     // Add more team members...
   ];
   ```

### Option 2: API Integration (If Available)

If Undash-cop provides an API endpoint for team data:

1. **Update `lib/fetch-team-data.ts`:**
   ```typescript
   const response = await fetch('https://undash-cop.com/api/team');
   if (response.ok) {
     return await response.json();
   }
   ```

2. **Ensure the API returns data in this format:**
   ```json
   [
     {
       "name": "Name",
       "role": "Role",
       "bio": "Bio",
       "image": "emoji or image URL",
       "linkedin": "LinkedIn URL",
       "email": "email@example.com",
       "github": "GitHub URL or null"
     }
   ]
   ```

### Option 3: HTML Parsing (Advanced)

If you need to parse HTML from the Undash-cop website:

1. **Install a parsing library:**
   ```bash
   npm install cheerio
   ```

2. **Update `lib/fetch-team-data.ts` to parse HTML:**
   ```typescript
   import * as cheerio from 'cheerio';
   
   const response = await fetch('https://undash-cop.com/about');
   const html = await response.text();
   const $ = cheerio.load(html);
   
   // Parse team members based on HTML structure
   const teamMembers: TeamMember[] = [];
   $('.team-member').each((i, elem) => {
     teamMembers.push({
       name: $(elem).find('.name').text().trim(),
       role: $(elem).find('.role').text().trim(),
       bio: $(elem).find('.bio').text().trim(),
       // ... extract other fields
     });
   });
   ```

## Data Structure

Each team member should have:

```typescript
interface TeamMember {
  name: string;           // Full name
  role: string;          // Job title/position
  bio: string;           // Short description
  image: string;          // Emoji or image URL
  linkedin: string | null; // LinkedIn profile URL
  email: string | null;   // Email address
  github?: string | null; // GitHub profile URL (optional)
}
```

## Testing

After updating team data:

1. **Restart development server:**
   ```bash
   npm run dev
   ```

2. **Visit `/about` page**
3. **Check team section displays correctly**
4. **Verify all links work**

## Current Team Data Source

- **Website**: https://undash-cop.com/about
- **API Route**: `/api/team`
- **Component**: `components/about/team-section.tsx`
- **Data Utility**: `lib/fetch-team-data.ts`

## Notes

- Team data is cached on the client side
- API route can be called directly: `GET /api/team`
- Fallback data ensures the page always displays something
- Update fallback data in `components/about/team-section.tsx` if needed

## Future Enhancements

- Add image URLs instead of emojis
- Implement caching for team data
- Add team member photos
- Support for team member profiles page
- Integration with Undash-cop CMS if available
