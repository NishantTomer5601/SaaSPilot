import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Megaphone,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  count: number;
  href: string;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: "development",
    title: "SaaS Development",
    description:
      "Architecture patterns, tech stacks, CI/CD pipelines, and production-ready code practices for scalable SaaS products.",
    icon: Code2,
    count: 42,
    href: "/resources?category=development",
    featured: true,
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    description:
      "Content strategy, SEO, positioning, and demand generation tactics that drive qualified signups.",
    icon: Megaphone,
    count: 38,
    href: "/resources?category=marketing",
  },
  {
    id: "distribution",
    title: "Distribution",
    description:
      "Product-led growth, channel partnerships, marketplaces, and go-to-market motions that scale.",
    icon: TrendingUp,
    count: 27,
    href: "/resources?category=distribution",
  },
  {
    id: "sales",
    title: "Sales & Revenue",
    description:
      "Pricing models, sales playbooks, demo frameworks, and revenue operations for B2B SaaS.",
    icon: Users,
    count: 31,
    href: "/resources?category=sales",
  },
  {
    id: "mvp",
    title: "MVP & Validation",
    description:
      "Lean startup methods, customer discovery, prototype testing, and finding product-market fit fast.",
    icon: Rocket,
    count: 24,
    href: "/resources?category=mvp",
  },
  {
    id: "operations",
    title: "Operations & Scaling",
    description:
      "Team building, metrics dashboards, customer success, and operational excellence at scale.",
    icon: Zap,
    count: 19,
    href: "/resources?category=operations",
  },
];
