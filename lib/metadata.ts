/**
 * Utility functions for generating metadata with canonical URLs
 */

const metadataBase = process.env.NEXT_PUBLIC_APP_URL 
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : new URL("https://hiringjourney.com");

/**
 * Generate canonical URL for a given path
 * @param path - The path relative to the root (e.g., "/about", "/pricing")
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string = "/"): string {
  const url = new URL(path, metadataBase);
  return url.toString();
}

/**
 * Generate metadata with canonical URL
 * @param path - The path relative to the root
 * @param title - Page title
 * @param description - Page description
 * @returns Metadata object with canonical URL
 */
export function generateMetadataWithCanonical(
  path: string,
  title: string,
  description: string
) {
  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(path),
    },
  };
}

export { metadataBase };
