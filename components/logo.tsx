"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "primary" | "monochrome" | "outline";
  forceTheme?: "light" | "dark";
  showText?: boolean;
  textClassName?: string;
  priority?: boolean;
}

export function Logo({ 
  className, 
  width = 150, 
  height = 40, 
  variant = "primary", 
  forceTheme,
  showText = true,
  textClassName,
  priority = false
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const theme = forceTheme || resolvedTheme;

  // Determine which logo to use based on variant and theme
  const getLogoSrc = () => {
    if (variant === "monochrome") {
      return theme === "dark"
        ? "/logos/Hiring_Journey_Monochrome_Light.svg"
        : "/logos/Hiring_Journey_Monochrome_Dark.svg";
    }
    if (variant === "outline") {
      return "/logos/HireBuddy_Outline.svg";
    }
    // Default to primary
    return "/logos/Hiring_Journey_Primary.svg";
  };

  const logoSrc = getLogoSrc();
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoSrc}
        alt="Hiring Journey"
        width={width}
        height={height}
        className="object-contain"
        priority={priority}
        // Only preload if priority is true AND we're using a static source
        // Dynamic theme-based logos shouldn't use priority to avoid preload warnings
        fetchPriority={priority ? "high" : "auto"}
      />
      {showText && (
        <span className={cn(
          "text-xl font-display font-bold",
          variant === "monochrome" 
            ? "text-gray-900 dark:text-white"
            : "bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent",
          textClassName
        )}>
          Hiring Journey
        </span>
      )}
    </div>
  );
}
