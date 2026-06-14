import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/logo";
import { FOOTER_NAV } from "@/lib/marketing-nav";
import type { NavLink } from "@/lib/marketing-nav";

const social = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "GitHub", href: "#", icon: Github },
  { name: "Email", href: "mailto:contact@hiringjourney.com", icon: Mail },
];

function FooterLink({ item }: { item: NavLink }) {
  const className =
    "text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.name}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.name}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <Logo width={40} height={40} variant="monochrome" className="h-10 mb-4" />
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Your complete career success platform. Built for India&apos;s job seekers.
              </p>
            </div>
            <div className="flex space-x-6">
              {social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {FOOTER_NAV.product.map((item) => (
                    <li key={item.name}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {FOOTER_NAV.company.map((item) => (
                    <li key={item.name}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {FOOTER_NAV.legal.map((item) => (
                    <li key={item.name}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 dark:border-gray-100/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://undash-cop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Undash-cop Private Limited
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
