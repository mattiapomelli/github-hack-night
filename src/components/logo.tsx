import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  onlyIcon?: boolean;
  className?: string;
}

export function Logo({ onlyIcon = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="white" />
      </svg>
      {!onlyIcon && <span className="mt-1 font-heading font-bold">{siteConfig.name}</span>}
    </div>
  );
}
