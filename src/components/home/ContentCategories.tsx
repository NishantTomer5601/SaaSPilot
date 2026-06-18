import { categories } from "@/data/categories";
import { BentoCard } from "@/components/shared/BentoCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection, FadeUpItem } from "@/components/shared/AnimatedSection";

export function ContentCategories() {
  const featured = categories.find((c) => c.featured)!;
  const rest = categories.filter((c) => !c.featured);

  return (
    <AnimatedSection id="categories" className="mx-auto max-w-7xl px-6 py-24">
      <FadeUpItem>
        <SectionHeader
          number="01"
          title="Content Categories"
          subtitle="Deep dives across every stage of the SaaS lifecycle — from first commit to first million in ARR."
        />
      </FadeUpItem>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FadeUpItem className="sm:col-span-2 lg:row-span-2">
          <BentoCard
            title={featured.title}
            description={featured.description}
            icon={featured.icon}
            count={featured.count}
            href={featured.href}
            className="h-full min-h-[280px]"
          />
        </FadeUpItem>

        {rest.map((category) => (
          <FadeUpItem key={category.id}>
            <BentoCard
              title={category.title}
              description={category.description}
              icon={category.icon}
              count={category.count}
              href={category.href}
              className="h-full"
            />
          </FadeUpItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
