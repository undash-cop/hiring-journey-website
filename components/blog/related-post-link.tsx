"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackBlogRelatedCategoryClick,
  trackBlogRelatedClick,
} from "@/lib/analytics";

type RelatedPostLinkProps = {
  href: string;
  currentPostSlug: string;
  currentCategorySlug: string;
  relatedPostSlug: string;
  relatedCategorySlug: string;
  position: number;
  className?: string;
  children: ReactNode;
};

export function RelatedPostLink({
  href,
  currentPostSlug,
  currentCategorySlug,
  relatedPostSlug,
  relatedCategorySlug,
  position,
  className,
  children,
}: RelatedPostLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackBlogRelatedClick({
          currentPostSlug,
          currentCategorySlug,
          relatedPostSlug,
          relatedCategorySlug,
          position,
        })
      }
    >
      {children}
    </Link>
  );
}

type RelatedCategoryLinkProps = {
  href: string;
  currentPostSlug: string;
  currentCategorySlug: string;
  className?: string;
  children: ReactNode;
};

export function RelatedCategoryLink({
  href,
  currentPostSlug,
  currentCategorySlug,
  className,
  children,
}: RelatedCategoryLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackBlogRelatedCategoryClick({
          currentPostSlug,
          currentCategorySlug,
        })
      }
    >
      {children}
    </Link>
  );
}
