import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Filter, Search, X } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { ContentCard } from "@/components/content/ContentCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  contentItems,
  contentTypes,
  difficulties,
  type ContentType,
  type Difficulty,
} from "@/data/content";
import { lifecyclePhases, phaseById, type PhaseId } from "@/data/lifecycle";
import { getSeoRoute } from "@/lib/seo-routes";
import { cn } from "@/lib/utils";

type ReadTime = "quick" | "medium" | "deep";

export function ResourcesPage() {
  const seo = getSeoRoute("/resources");
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const activePhase = (searchParams.get("phase") as PhaseId | null) ?? "all";
  const activeSubPhase = searchParams.get("subPhase") ?? "all";
  const activeType = (searchParams.get("type") as ContentType | null) ?? "all";
  const activeDifficulty = (searchParams.get("difficulty") as Difficulty | null) ?? "all";
  const activeTime = (searchParams.get("time") as ReadTime | null) ?? "all";

  const activePhaseData = activePhase === "all" ? null : phaseById[activePhase];
  const subPhases = activePhaseData?.subPhases ?? [];

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    if (key === "phase") next.delete("subPhase");
    next.delete("content");
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return contentItems.filter((item) => {
      const phaseClassification =
        activePhase === "all"
          ? null
          : item.classifications.find((classification) => classification.phase === activePhase);
      const matchesPhase = activePhase === "all" || Boolean(phaseClassification);
      const matchesSubPhase =
        activeSubPhase === "all" || phaseClassification?.subPhases.includes(activeSubPhase);
      const matchesType = activeType === "all" || item.type === activeType;
      const matchesDifficulty =
        activeDifficulty === "all" || item.difficulty === activeDifficulty;
      const matchesTime =
        activeTime === "all" ||
        (activeTime === "quick" && item.estimatedMinutes <= 15) ||
        (activeTime === "medium" &&
          item.estimatedMinutes > 15 &&
          item.estimatedMinutes <= 30) ||
        (activeTime === "deep" && item.estimatedMinutes > 30);
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));
      return (
        matchesPhase &&
        matchesSubPhase &&
        matchesType &&
        matchesDifficulty &&
        matchesTime &&
        matchesSearch
      );
    });
  }, [activeDifficulty, activePhase, activeSubPhase, activeTime, activeType, search]);

  const hasFilters =
    activePhase !== "all" ||
    activeSubPhase !== "all" ||
    activeType !== "all" ||
    activeDifficulty !== "all" ||
    activeTime !== "all" ||
    search.length > 0;

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        path="/resources"
        ogType={seo.ogType}
      />

      <section className="border-b border-border/70 bg-card/20">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">All content</span>
          </nav>
          <div className="mt-9 max-w-3xl">
            <Badge className="mb-5 border-primary/20 bg-primary/5">SaaSPilot Library</Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              Find the right next step
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Browse the complete SaaS journey by phase first, then narrow by sub-phase, format,
              difficulty, or time available.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="relative mb-7">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search titles, topics, and tags..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-13 rounded-xl bg-card pl-12 text-base"
          />
        </div>

        <div className="mb-8 rounded-xl border border-border bg-card/60 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-heading font-semibold">
              <Filter className="h-4 w-4 text-primary" />
              Filter the library
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <X className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>

          <FilterRow label="Phase">
            <FilterButton active={activePhase === "all"} onClick={() => updateFilter("phase", "all")}>
              All phases
            </FilterButton>
            {lifecyclePhases.map((phase) => (
              <FilterButton
                key={phase.id}
                active={activePhase === phase.id}
                onClick={() => updateFilter("phase", phase.id)}
              >
                {phase.title}
              </FilterButton>
            ))}
          </FilterRow>

          {activePhaseData && (
            <FilterRow label="Sub-phase">
              <FilterButton active={activeSubPhase === "all"} onClick={() => updateFilter("subPhase", "all")}>
                All {activePhaseData.title}
              </FilterButton>
              {subPhases.map((subPhase) => (
                <FilterButton
                  key={subPhase.id}
                  active={activeSubPhase === subPhase.id}
                  onClick={() => updateFilter("subPhase", subPhase.id)}
                >
                  {subPhase.title}
                </FilterButton>
              ))}
            </FilterRow>
          )}

          <FilterRow label="Content type">
            <FilterButton active={activeType === "all"} onClick={() => updateFilter("type", "all")}>
              All types
            </FilterButton>
            {contentTypes.map((type) => (
              <FilterButton
                key={type}
                active={activeType === type}
                onClick={() => updateFilter("type", type)}
              >
                {type}
              </FilterButton>
            ))}
          </FilterRow>

          <div className="grid gap-5 border-t border-border/70 pt-5 md:grid-cols-2">
            <FilterRow label="Difficulty" compact>
              <FilterButton active={activeDifficulty === "all"} onClick={() => updateFilter("difficulty", "all")}>
                Any
              </FilterButton>
              {difficulties.map((difficulty) => (
                <FilterButton
                  key={difficulty}
                  active={activeDifficulty === difficulty}
                  onClick={() => updateFilter("difficulty", difficulty)}
                >
                  {difficulty}
                </FilterButton>
              ))}
            </FilterRow>

            <FilterRow label="Time" compact>
              <FilterButton active={activeTime === "all"} onClick={() => updateFilter("time", "all")}>
                Any
              </FilterButton>
              <FilterButton active={activeTime === "quick"} onClick={() => updateFilter("time", "quick")}>
                ≤ 15 min
              </FilterButton>
              <FilterButton active={activeTime === "medium"} onClick={() => updateFilter("time", "medium")}>
                16–30 min
              </FilterButton>
              <FilterButton active={activeTime === "deep"} onClick={() => updateFilter("time", "deep")}>
                30+ min
              </FilterButton>
            </FilterRow>
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {activePhaseData ? activePhaseData.title : "Complete library"}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </h2>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <h3 className="font-heading text-xl font-semibold">No content matches those filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another phase, broaden the time range, or clear the filters.
            </p>
            <Button variant="outline" className="mt-6" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function FilterRow({
  label,
  children,
  compact = false,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={cn(!compact && "mb-5")}>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
