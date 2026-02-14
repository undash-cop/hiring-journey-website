/**
 * Utility to fetch team data from Undash-cop website
 * This can be updated to parse HTML or use an API if available
 */

export interface TeamMember {
  name: string;
  title: string;
  about: string;
  photo: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string | null;
  github?: string | null;
}

/**
 * Fetch team data from Undash-cop website
 * Currently returns static data, but can be extended to parse HTML or use API
 */
export async function fetchTeamDataFromUndashCop(): Promise<TeamMember[]> {
  // Team data from https://undash-cop.com/about
  return [
    {
      name: "Suman KN",
      title: "Founder | Chief Executive Officer",
      about:
        "I started Undash-cop to build software that helps startups and founders ship faster. We focus on engineering-first delivery and products where AI is built in for reliability and outcomes. Outside work, I race and pursue motorsport.",
      photo: "https://drive.google.com/thumbnail?id=1UmzllytJ3x5RRhgawS53AEntf-uXe68Y",
      website: "https://sumankn.undash-cop.com",
      linkedin: "https://in.linkedin.com/in/suman-kn",
      instagram: "https://www.instagram.com/suman_kn_racer",
      twitter: "https://twitter.com/suman_kn",
      facebook: "https://www.facebook.com/suman.kn.585",
    },
    {
      name: "Yashwanth H R",
      title: "Co-Founder | Chief Operating Officer",
      about:
        "Co-founder with deep experience in operations and resource management. Eight years in sourcing and team coordination.",
      photo:
        "https://drive.google.com/thumbnail?id=1W1ARN1r2w0xlH-vA0B04mhlUkDJ3LlIz",
      website: "",
      linkedin: "https://in.linkedin.com/in/yashwanth-hr-naidu-b6a4b4149",
      instagram: "https://www.instagram.com/yashwanth_hr_naidu",
      twitter: "https://twitter.com/hrnaidu",
      facebook: "https://www.facebook.com/yashwanth.naidu.587",
    },
    {
      name: "Mohammed Nawaz A",
      title: "Co-Founder | Chief Financial Officer",
      about:
        "Co-founder with over nine years in finance and operations, focused on running lean and scaling efficiently.",
      photo:
        "https://drive.google.com/thumbnail?id=1Ox51HTawBCKXSQprsm-Tfd_Vt992KzVx",
      website: "",
      linkedin: "https://in.linkedin.com/in/nawaz-a",
      instagram: "https://www.instagram.com/nawazf37",
      twitter: "",
      facebook: "https://www.facebook.com/mohammed.nawaz.921677",
    },
    {
      name: "Karthik",
      title: "Chief Technological Officer",
      about:
        "Leads technology strategy and engineering. Focused on stable, scalable systems and products where AI is a core capability.",
      photo: "https://drive.google.com/thumbnail?id=1Yc3h-zx7RVFckE-eRgQkZOoet7nv6_zS",
      website: "",
      linkedin: "https://www.linkedin.com/in/karthik-r-352600103",
      instagram: "https://www.instagram.com/karthikhr7",
      twitter: "https://twitter.com/karthikbdb",
      facebook: "https://www.facebook.com/karthik.bdb",
    },
    {
      name: "Purushottam Gour",
      title: "Chief Product Officer",
      about:
        "Product management and roadmap. Ensures our products stay aligned with customer needs and engineering capacity.",
      photo:
        "https://drive.google.com/thumbnail?id=1XNO92CHpgnSGwM38hzYOfOUKhGREeuLq",
      website: "",
      linkedin: "https://www.linkedin.com/in/purushottam-gour-2a96ab148/",
      instagram: "https://www.instagram.com/purushottam.gour/",
      twitter: "",
      facebook: "https://www.facebook.com/prince.gour.50",
    },
  ];
}

/**
 * Parse team data from HTML (if needed in the future)
 * This would require a library like cheerio or jsdom
 */
function parseTeamDataFromHTML(html: string): TeamMember[] {
  // Implementation would go here if HTML parsing is needed
  // Example with cheerio:
  // const $ = cheerio.load(html);
  // const teamMembers: TeamMember[] = [];
  // $('.team-member').each((i, elem) => {
  //   teamMembers.push({
  //     name: $(elem).find('.name').text(),
  //     role: $(elem).find('.role').text(),
  //     ...
  //   });
  // });
  // return teamMembers;
  return [];
}
