import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
  href: string;
  className?: string;
}

export function BentoCard({ title, description, icon: Icon, count, href, className }: BentoCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "corner-accent group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {count !== undefined && (
          <Badge variant="secondary">{count} articles</Badge>
        )}
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:gap-2">
        Browse <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
