import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { featuredArticles } from "@/data/featured";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

function ArticleCard({
  article,
  className,
}: {
  article: (typeof featuredArticles)[0];
  className?: string;
}) {
  return (
    <Link
      to={article.href}
      className={cn(
        "corner-accent group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <Badge variant="secondary">{article.category}</Badge>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {article.readTime}
        </span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
    </Link>
  );
}

export function FeaturedContent() {
  const [main, ...side] = featuredArticles;

  return (
    <AnimatedSection id="featured" className="mx-auto max-w-7xl px-6 py-24">
      <FadeUpItem>
        <SectionHeader
          number="02"
          title="Featured Content"
          subtitle="Hand-picked articles from our editorial team — actionable insights you can apply today."
        />
      </FadeUpItem>

      <div className="grid gap-4 lg:grid-cols-2">
        <FadeUpItem>
          <ArticleCard article={main} className="h-full min-h-[320px] lg:min-h-[420px]" />
        </FadeUpItem>

        <div className="flex flex-col gap-4">
          {side.map((article) => (
            <FadeUpItem key={article.id}>
              <ArticleCard article={article} className="flex-1" />
            </FadeUpItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
