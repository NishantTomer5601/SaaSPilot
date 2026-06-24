import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { lifecyclePhases } from "@/data/lifecycle";
import { contentForPhase } from "@/data/content";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";

export function ContentCategories() {
  return (
    <AnimatedSection id="lifecycle" className="mx-auto max-w-7xl px-6 py-24">
      <FadeUpItem>
        <SectionHeader
          number="01"
          title="The complete SaaS lifecycle"
          subtitle="Move through the work in the right order. Each phase gives you a clear outcome, a practical learning path, and the tools to complete it."
        />
      </FadeUpItem>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lifecyclePhases.map((phase) => {
          const Icon = phase.icon;
          const contentCount = contentForPhase(phase.id).length;
          return (
            <FadeUpItem key={phase.id}>
              <Link
                to={`/${phase.id}`}
                className="corner-accent group flex h-full min-h-[310px] flex-col rounded-xl border border-border bg-card/75 p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-heading text-sm font-bold tracking-[0.2em] text-primary">
                    PHASE {phase.number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <Icon className={`h-5 w-5 ${phase.accent}`} />
                  </div>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {phase.eyebrow}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {phase.goal}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                  <span className="text-xs text-muted-foreground">
                    {phase.subPhases.length} steps · {contentCount} resources
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </FadeUpItem>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
