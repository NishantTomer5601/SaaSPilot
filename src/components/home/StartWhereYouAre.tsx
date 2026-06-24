import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";
import { phaseById, type PhaseId } from "@/data/lifecycle";

const startingPoints: { prompt: string; phase: PhaseId }[] = [
  { prompt: "I have an idea but need to understand the problem", phase: "discover" },
  { prompt: "I need proof that customers actually want this", phase: "validate" },
  { prompt: "I am ready to plan and build the MVP", phase: "build" },
  { prompt: "My product works and I am preparing to release it", phase: "pre-launch" },
  { prompt: "I am ready to put the product in front of the world", phase: "launch" },
  { prompt: "I need more customers, revenue, or retention", phase: "marketing-sales" },
];

export function StartWhereYouAre() {
  return (
    <AnimatedSection id="start-where-you-are" className="border-y border-border/70 bg-card/25">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <FadeUpItem>
          <SectionHeader
            number="02"
            title="Start where you are"
            subtitle="You do not need to begin at phase one. Choose the statement that sounds most like your current situation."
          />
        </FadeUpItem>

        <div className="grid gap-3 md:grid-cols-2">
          {startingPoints.map(({ prompt, phase }) => {
            const phaseInfo = phaseById[phase];
            return (
              <FadeUpItem key={prompt}>
                <Link
                  to={`/${phase}`}
                  className="group flex items-center justify-between gap-5 rounded-xl border border-border bg-background/60 p-5 transition-colors hover:border-primary/50 hover:bg-card"
                >
                  <div>
                    <p className="text-sm leading-relaxed text-foreground">{prompt}</p>
                    <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      Go to {phaseInfo.title}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </FadeUpItem>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
