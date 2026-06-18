export interface FeaturedArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  href: string;
  featured?: boolean;
}

export const featuredArticles: FeaturedArticle[] = [
  {
    id: "saas-architecture-2026",
    title: "The Modern SaaS Architecture Stack for 2026",
    excerpt:
      "From monolith to microservices — a practical guide to choosing the right architecture for your stage, team size, and growth trajectory.",
    category: "Development",
    readTime: "12 min read",
    href: "#",
    featured: true,
  },
  {
    id: "plg-playbook",
    title: "Product-Led Growth: A Founder's Playbook",
    excerpt:
      "How to design onboarding, activation loops, and viral mechanics that turn free users into paying customers.",
    category: "Distribution",
    readTime: "8 min read",
    href: "#",
  },
  {
    id: "pricing-psychology",
    title: "Pricing Psychology for B2B SaaS",
    excerpt:
      "Anchor pricing, tier design, and packaging strategies that maximize revenue without killing conversion.",
    category: "Sales",
    readTime: "10 min read",
    href: "#",
  },
];
