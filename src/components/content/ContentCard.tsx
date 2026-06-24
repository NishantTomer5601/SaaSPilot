import { ArrowUpRight, Clock3, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { ContentItem } from "@/data/content";
import { phaseById } from "@/data/lifecycle";
import { cn } from "@/lib/utils";

const typeColors: Partial<Record<ContentItem["type"], string>> = {
  Guide: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  Checklist: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Template: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Framework: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  Course: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export function ContentCard({
  item,
  compact = false,
}: {
  item: ContentItem;
  compact?: boolean;
}) {
  const phase = phaseById[item.primaryPhase];

  return (
    <Link
      to={`/resources?phase=${item.primaryPhase}&content=${item.slug}`}
      className={cn(
        "corner-accent group flex h-full flex-col rounded-xl border border-border bg-card/80 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card",
        compact ? "p-5" : "p-6",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={cn("border", typeColors[item.type])}>{item.type}</Badge>
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {phase.title}
        </span>
      </div>

      <h3
        className={cn(
          "font-heading font-semibold leading-snug text-foreground transition-colors group-hover:text-primary",
          compact ? "mt-4 text-lg" : "mt-5 text-xl",
        )}
      >
        {item.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" />
            {item.difficulty}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {item.estimatedMinutes} min
          </span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
