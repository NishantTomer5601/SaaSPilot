import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Check, ChevronDown, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getSubPhaseIds, type ContentItem } from "@/data/content";
import type { LifecyclePhase, PhaseId } from "@/data/lifecycle";
import { cn } from "@/lib/utils";

export function LearningPath({
  phase,
  phaseId,
  content,
}: {
  phase: LifecyclePhase;
  phaseId: PhaseId;
  content: ContentItem[];
}) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Map each sub-phase to the links classified under it.
  const linksBySubPhase = useMemo(() => {
    const map = new Map<string, ContentItem[]>();
    for (const sub of phase.subPhases) {
      map.set(
        sub.id,
        content.filter((item) => getSubPhaseIds(item, phaseId).includes(sub.id)),
      );
    }
    return map;
  }, [phase, content, phaseId]);

  // When the URL hash points at a sub-phase (e.g. from the sidebar), open it and scroll to it.
  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (id && phase.subPhases.some((s) => s.id === id)) {
      setExpanded((prev) => new Set(prev).add(id));
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [location.hash, phase]);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {phase.subPhases.map((subPhase, subIndex) => {
        const links = linksBySubPhase.get(subPhase.id) ?? [];
        const isOpen = expanded.has(subPhase.id);
        return (
          <article
            key={subPhase.id}
            id={subPhase.id}
            className={cn(
              "scroll-mt-28 rounded-xl border bg-card/60 transition-colors",
              isOpen ? "border-primary/40" : "border-border hover:border-primary/30",
            )}
          >
            <button
              type="button"
              onClick={() => toggle(subPhase.id)}
              aria-expanded={isOpen}
              className="flex w-full gap-4 p-5 text-left sm:p-6"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                {String(subIndex + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-semibold">{subPhase.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {subPhase.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant={links.length ? "secondary" : "outline"} className="w-fit">
                      {links.length} {links.length === 1 ? "link" : "links"}
                    </Badge>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isOpen && "rotate-180 text-primary",
                      )}
                    />
                  </div>
                </div>

                {subPhase.topics && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {subPhase.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs text-muted-foreground"
                      >
                        <Check className="h-3 w-3 text-primary" />
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-border/70 px-5 pb-5 pt-4 sm:px-6">
                {links.length > 0 ? (
                  <ul className="space-y-2">
                    {links.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`/r/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50 hover:bg-background"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                              {item.title}
                            </p>
                            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="text-primary">{item.type}</span>
                              <span>·</span>
                              <span>{item.estimatedMinutes} min</span>
                              {item.sourceDomain && item.sourceDomain !== "google.com" && (
                                <>
                                  <span>·</span>
                                  <span className="truncate">{item.sourceDomain}</span>
                                </>
                              )}
                            </p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
                    <FolderOpen className="h-4 w-4 shrink-0" />
                    No links for this step yet — check back soon.
                  </div>
                )}

                <Link
                  to={`/resources?phase=${phaseId}&subPhase=${subPhase.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Browse this step in the full library
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
