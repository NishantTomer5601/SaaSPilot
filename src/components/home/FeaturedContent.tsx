import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentCard } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";
import { useContent } from "@/lib/content-store";

export function FeaturedContent() {
  const { items } = useContent();
  const featured = items.filter((item) => item.featured).slice(0, 6);

  return (
    <AnimatedSection id="featured" className="mx-auto max-w-7xl px-6 py-24">
      <FadeUpItem>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            number="03"
            title="Recommended starting points"
            subtitle="Practical guides, templates, and checklists selected from across the journey."
          />
          <Link to="/resources" className="mb-12 shrink-0">
            <Button variant="outline">
              Explore all content
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FadeUpItem>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <FadeUpItem key={item.id}>
            <ContentCard item={item} />
          </FadeUpItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
