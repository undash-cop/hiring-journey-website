import { APP_ROUTES, MARKETING_ROUTES } from "@/lib/marketing-routes";

export type NavLink = {
  name: string;
  href: string;
  external?: boolean;
};

export const HEADER_NAV: NavLink[] = [
  { name: "Features", href: MARKETING_ROUTES.features },
  { name: "Pricing", href: MARKETING_ROUTES.pricing },
  { name: "Blog", href: MARKETING_ROUTES.blog },
  { name: "About", href: MARKETING_ROUTES.about },
  { name: "Contact", href: MARKETING_ROUTES.contact },
];

export const FOOTER_NAV = {
  product: [
    { name: "Features", href: MARKETING_ROUTES.features },
    { name: "Pricing", href: MARKETING_ROUTES.pricing },
    { name: "How it Works", href: "/#how-it-works" },
  ] satisfies NavLink[],
  company: [
    { name: "About", href: MARKETING_ROUTES.about },
    { name: "Blog", href: MARKETING_ROUTES.blog },
    { name: "Careers", href: MARKETING_ROUTES.careers },
    { name: "Contact", href: MARKETING_ROUTES.contact },
    { name: "FAQ", href: MARKETING_ROUTES.faq },
    { name: "Undash-cop", href: "https://undash-cop.com", external: true },
  ] satisfies NavLink[],
  legal: [
    { name: "Privacy", href: MARKETING_ROUTES.privacy },
    { name: "Terms", href: MARKETING_ROUTES.terms },
    { name: "Cookie Policy", href: MARKETING_ROUTES.cookies },
  ] satisfies NavLink[],
};

export const MARKETING_CTAS = {
  login: APP_ROUTES.login,
  signup: APP_ROUTES.signup,
} as const;
