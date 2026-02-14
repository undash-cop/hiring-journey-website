import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoServerProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "primary" | "monochrome" | "outline";
  theme?: "light" | "dark";
  showText?: boolean;
  textClassName?: string;
  priority?: boolean;
}

export function LogoServer({ 
  className, 
  width = 150, 
  height = 40, 
  variant = "primary", 
  theme = "light",
  showText = true,
  textClassName,
  priority = false
}: LogoServerProps) {
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

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={getLogoSrc()}
        alt="Hiring Journey"
        width={width}
        height={height}
        className="object-contain"
        priority={priority}
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
