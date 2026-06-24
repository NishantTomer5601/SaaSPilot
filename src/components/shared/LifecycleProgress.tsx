import { Link } from "react-router-dom";
import { lifecyclePhases, type PhaseId } from "@/data/lifecycle";
import { cn } from "@/lib/utils";

export function LifecycleProgress({ activePhase }: { activePhase?: PhaseId }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[720px] items-center">
        {lifecyclePhases.map((phase, index) => {
          const isActive = phase.id === activePhase;
          return (
            <div key={phase.id} className="flex flex-1 items-center">
              <Link
                to={`/${phase.id}`}
                className={cn(
                  "group flex min-w-0 flex-1 items-center gap-3 rounded-lg px-2 py-2 transition-colors",
                  isActive ? "bg-primary/10" : "hover:bg-card",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground group-hover:border-primary/50",
                  )}
                >
                  {phase.number}
                </span>
                <span
                  className={cn(
                    "truncate text-sm font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {phase.shortTitle}
                </span>
              </Link>
              {index < lifecyclePhases.length - 1 && (
                <span className="h-px w-4 shrink-0 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
