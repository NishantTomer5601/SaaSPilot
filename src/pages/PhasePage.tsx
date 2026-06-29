import { Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ListChecks,
  Target,
} from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { ContentCard } from "@/components/content/ContentCard";
import { LearningPath } from "@/components/phase/LearningPath";
import { LifecycleProgress } from "@/components/shared/LifecycleProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contentForPhase } from "@/data/content";
import { useContent } from "@/lib/content-store";
import {
  getPhaseIndex,
  lifecyclePhases,
  phaseById,
  type PhaseId,
} from "@/data/lifecycle";

export function PhasePage({ phaseId }: { phaseId: PhaseId }) {
  const phase = phaseById[phaseId];
  const { items } = useContent();
  if (!phase) return <Navigate to="/" replace />;

  const content = contentForPhase(phaseId, items);
  const featured = content.filter((item) => item.featured);
  const recommended = (featured.length ? featured : content).slice(0, 3);
  const index = getPhaseIndex(phaseId);
  const previous = lifecyclePhases[index - 1];
  const next = lifecyclePhases[index + 1];
  const Icon = phase.icon;

  return (
    <>
      <SeoHead
        title={`${phase.title} — SaaSPilot Lifecycle`}
        description={`${phase.goal} Follow the SaaSPilot ${phase.title} learning path, guides, templates, and checklists.`}
        path={`/${phase.id}`}
        ogType="website"
      />

      <section className="relative overflow-hidden border-b border-border/70">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <nav className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{phase.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <Badge className="mb-5 w-fit border-primary/20 bg-primary/5">
                Phase {phase.number} of 06
              </Badge>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className={`h-7 w-7 ${phase.accent}`} />
                </div>
                <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl">
                  {phase.title}
                </h1>
              </div>
              <p className="mt-7 max-w-3xl text-xl font-medium text-foreground">{phase.goal}</p>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {phase.description}
              </p>
            </div>

            <div className="rounded-xl border border-primary/25 bg-card/80 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Target className="h-4 w-4" />
                Phase outcome
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{phase.outcome}</p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-background/65 p-4 backdrop-blur-sm">
            <LifecycleProgress activePhase={phaseId} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Learning path
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Complete this phase in order
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Each step builds evidence or capability for the next. Click any step to see the
              curated links for it.
            </p>
          </div>

          <LearningPath phase={phase} phaseId={phaseId} content={content} />
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 font-heading text-lg font-semibold">
              <ListChecks className="h-5 w-5 text-primary" />
              In this phase
            </div>
            <nav className="mt-5 space-y-1">
              {phase.subPhases.map((subPhase, subIndex) => (
                <a
                  key={subPhase.id}
                  href={`#${subPhase.id}`}
                  className="flex gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  <span className="text-primary">{String(subIndex + 1).padStart(2, "0")}</span>
                  {subPhase.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      <section className="border-y border-border/70 bg-card/25">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Put it into practice
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold">Recommended resources</h2>
            </div>
            <Link to={`/resources?phase=${phaseId}`}>
              <Button variant="outline">
                Browse all {content.length}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommended.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-16 sm:flex-row sm:justify-between">
        {previous ? (
          <Link
            to={`/${previous.id}`}
            className="group flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/50"
          >
            <ArrowLeft className="h-5 w-5 text-primary transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Previous phase</p>
              <p className="mt-1 font-heading text-lg font-semibold">{previous.title}</p>
            </div>
          </Link>
        ) : <span />}

        {next ? (
          <Link
            to={`/${next.id}`}
            className="group flex items-center justify-end gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5 text-right transition-colors hover:border-primary/60"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Next phase</p>
              <p className="mt-1 font-heading text-lg font-semibold">{next.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link
            to="/resources"
            className="group flex items-center justify-end gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5 text-right transition-colors hover:border-primary/60"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Keep learning</p>
              <p className="mt-1 font-heading text-lg font-semibold">Explore all content</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary" />
          </Link>
        )}
      </nav>
    </>
  );
}
