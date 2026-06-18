export const SITE_NAME = "SaaSPilot";
export const SITE_DOMAIN = "https://saaspilot.online";
export const SITE_TAGLINE =
  "The go-to knowledge hub for SaaS founders, developers, and operators.";
export const SITE_DESCRIPTION =
  "Expert guides, frameworks, and resources on SaaS development, marketing, distribution, sales, and MVP building. Your compass for building and scaling software products.";

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
}

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: "/",
    title: "SaaSPilot — The SaaS Knowledge Hub",
    description: SITE_DESCRIPTION,
    ogType: "website",
  },
  {
    path: "/resources",
    title: "Resources — SaaSPilot",
    description:
      "Browse templates, frameworks, and checklists for SaaS development, marketing, distribution, sales, and MVP validation.",
    ogType: "website",
  },
];

export function getSeoRoute(path: string): SeoRoute {
  return SEO_ROUTES.find((route) => route.path === path) ?? SEO_ROUTES[0];
}
