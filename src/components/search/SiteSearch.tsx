import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { ArrowUpRight, Search } from "lucide-react";
import { useContent } from "@/lib/content-store";
import { phaseById } from "@/data/lifecycle";
import type { ContentItem } from "@/data/content";
import { cn } from "@/lib/utils";

const MAX_RESULTS = 8;

export function SiteSearch() {
  const { items } = useContent();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build the fuzzy index. Rebuilds only when the link set changes.
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "tags", weight: 0.25 },
          { name: "description", weight: 0.15 },
          { name: "type", weight: 0.1 },
        ],
        threshold: 0.4, // typo tolerance: lower = stricter, higher = fuzzier
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items],
  );

  // When empty, suggest featured links; otherwise fuzzy-rank.
  const results: ContentItem[] = useMemo(() => {
    const q = query.trim();
    if (!q) return items.filter((i) => i.featured).slice(0, MAX_RESULTS);
    return fuse.search(q, { limit: MAX_RESULTS }).map((r) => r.item);
  }, [query, fuse, items]);

  // Global ⌘K / Ctrl+K to open, Esc to close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the input + reset state each time the palette opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Wait for the element to mount before focusing.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keep the active index in range as results change.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)));
  }, [results.length]);

  function openResult(item: ContentItem | undefined) {
    if (!item) return;
    setOpen(false);
    // Same outbound path as the cards, so the click is tracked.
    window.open(`/r/${item.slug}`, "_blank", "noopener,noreferrer");
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      openResult(results[active]);
    }
  }

  return (
    <>
      {/* Trigger — full pill on desktop, icon-only on small screens */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className={cn(
          "flex shrink-0 items-center gap-2 rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
          "p-2 sm:px-3 sm:py-2",
        )}
      >
        <Search className="h-4 w-4" />
        <span className="hidden text-sm sm:inline">Search</span>
        <kbd className="ml-1 hidden rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </button>

      {!open ? null : (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search the library"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search guides, templates, tools…"
                className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
                Esc
              </kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No links match “{query}”.
                </p>
              ) : (
                <>
                  {!query.trim() && (
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Featured
                    </p>
                  )}
                  <ul>
                    {results.map((item, i) => {
                      const phase = phaseById[item.primaryPhase];
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onClick={() => openResult(item)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                              i === active ? "bg-primary/10" : "hover:bg-background",
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">
                                {item.title}
                              </p>
                              <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="text-primary">{item.type}</span>
                                <span>·</span>
                                <span className="truncate">{phase?.title}</span>
                                {item.sourceDomain && item.sourceDomain !== "google.com" && (
                                  <>
                                    <span>·</span>
                                    <span className="truncate">{item.sourceDomain}</span>
                                  </>
                                )}
                              </p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> open</span>
              <span><kbd className="font-mono">esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
