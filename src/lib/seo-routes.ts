export const SITE_NAME = "SaaSPilot";
export const SITE_DOMAIN = "https://saaspilot.online";
export const SITE_TAGLINE =
  "A structured SaaS knowledge hub for founders, developers, and operators.";
export const SITE_DESCRIPTION =
  "Build, validate, launch, market, and scale SaaS products through structured learning paths, practical guides, templates, checklists, and frameworks.";

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
    title: "SaaS Content Library — SaaSPilot",
    description:
      "Browse SaaS guides, templates, frameworks, checklists, courses, and resources by lifecycle phase, difficulty, and estimated time.",
    ogType: "website",
  },
];

export function getSeoRoute(path: string): SeoRoute {
  return SEO_ROUTES.find((route) => route.path === path) ?? SEO_ROUTES[0];
}
