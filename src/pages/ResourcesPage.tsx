import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";
import {
  resources,
  resourceCategories,
  typeBadgeColors,
  type ResourceCategory,
} from "@/data/resources";
import { getSeoRoute } from "@/lib/seo-routes";
import { cn } from "@/lib/utils";

export function ResourcesPage() {
  const seo = getSeoRoute("/resources");
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const activeCategory = (searchParams.get("category") ?? "all") as ResourceCategory | "all";

  const filtered = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all" || resource.category === activeCategory;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const featured = resources.filter((r) => r.featured);

  const setCategory = (category: ResourceCategory | "all") => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        path="/resources"
        ogType={seo.ogType}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Resources</span>
        </nav>

        <div className="relative mb-16">
          <span
            className="pointer-events-none absolute -left-2 -top-6 select-none font-heading text-[8rem] font-bold leading-none text-primary/[0.03] sm:text-[10rem]"
            aria-hidden="true"
          >
            04
          </span>
          <h1 className="relative font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Resources
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg text-muted-foreground">
            Templates, frameworks, and checklists to accelerate every stage of your SaaS journey.
          </p>
          <div className="section-divider mt-8" />
        </div>

        <AnimatedSection className="mb-16">
          <FadeUpItem>
            <h2 className="mb-6 font-heading text-xl font-semibold">Featured Resources</h2>
          </FadeUpItem>
          <div className="grid gap-4 sm:grid-cols-3">
            {featured.map((resource) => (
              <FadeUpItem key={resource.id}>
                <div className="corner-accent flex h-full flex-col rounded-lg border border-primary/30 bg-card p-6 transition-colors hover:border-primary/50">
                  <Badge className={cn("w-fit border", typeBadgeColors[resource.type])}>
                    {resource.type}
                  </Badge>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{resource.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
              </FadeUpItem>
            ))}
          </div>
        </AnimatedSection>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {resourceCategories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  activeCategory === id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <FadeUpItem key={resource.id}>
                <div className="corner-accent flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50">
                  <Badge className={cn("w-fit border", typeBadgeColors[resource.type])}>
                    {resource.type}
                  </Badge>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{resource.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Download <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </FadeUpItem>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No resources match your search. Try a different query or category.
            </p>
          )}
        </AnimatedSection>

        <div className="mt-20 rounded-xl border border-primary/30 bg-card p-8 text-center sm:p-12">
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h2 className="mt-8 font-heading text-2xl font-bold sm:text-3xl">
            Want new resources delivered weekly?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Subscribe to our newsletter for exclusive templates, frameworks, and SaaS insights.
          </p>
          <Link to="/#newsletter" className="mt-6 inline-block">
            <Button className="glow-pulse">
              Join Newsletter
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
