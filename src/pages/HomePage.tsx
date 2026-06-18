import { SeoHead } from "@/components/SeoHead";
import { HeroSection } from "@/components/home/HeroSection";
import { ContentCategories } from "@/components/home/ContentCategories";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { getSeoRoute } from "@/lib/seo-routes";

export function HomePage() {
  const seo = getSeoRoute("/");

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        path="/"
        ogType={seo.ogType}
        isHome
      />
      <HeroSection />
      <ContentCategories />
      <FeaturedContent />
      <NewsletterCTA />
    </>
  );
}
