export type ResourceType = "Template" | "Framework" | "Checklist";
export type ResourceCategory =
  | "development"
  | "marketing"
  | "distribution"
  | "sales"
  | "mvp"
  | "operations";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  featured?: boolean;
}

export const resources: Resource[] = [
  {
    id: "mvp-spec-template",
    title: "MVP Specification Template",
    description:
      "A structured template to define your minimum viable product scope, user stories, success metrics, and launch criteria before writing a single line of code.",
    type: "Template",
    category: "mvp",
    featured: true,
  },
  {
    id: "saas-pricing-framework",
    title: "SaaS Pricing Framework",
    description:
      "A decision framework for choosing between usage-based, seat-based, and hybrid pricing models based on your product's value delivery pattern.",
    type: "Framework",
    category: "sales",
    featured: true,
  },
  {
    id: "launch-checklist",
    title: "Product Launch Checklist",
    description:
      "A comprehensive 60-point checklist covering pre-launch validation, launch day operations, and post-launch monitoring for SaaS products.",
    type: "Checklist",
    category: "marketing",
    featured: true,
  },
  {
    id: "tech-stack-evaluator",
    title: "Tech Stack Evaluation Matrix",
    description:
      "Score and compare frontend, backend, and infrastructure options against your team's skills, budget, and scalability requirements.",
    type: "Framework",
    category: "development",
  },
  {
    id: "customer-discovery-guide",
    title: "Customer Discovery Interview Guide",
    description:
      "Question frameworks, interview scripts, and analysis templates for validating problem-solution fit with real potential customers.",
    type: "Template",
    category: "mvp",
  },
  {
    id: "content-calendar-template",
    title: "SaaS Content Calendar Template",
    description:
      "A 90-day content planning template with topic pillars, distribution channels, and KPI tracking for developer-focused SaaS brands.",
    type: "Template",
    category: "marketing",
  },
  {
    id: "onboarding-audit",
    title: "Onboarding Flow Audit Checklist",
    description:
      "Evaluate your signup-to-activation flow against 35 best practices used by top product-led SaaS companies.",
    type: "Checklist",
    category: "distribution",
  },
  {
    id: "sales-demo-script",
    title: "B2B Demo Script Framework",
    description:
      "A structured demo framework with discovery questions, value mapping, objection handling, and close techniques for enterprise sales.",
    type: "Framework",
    category: "sales",
  },
  {
    id: "metrics-dashboard",
    title: "SaaS Metrics Dashboard Template",
    description:
      "Track MRR, churn, LTV, CAC, and activation rate with this pre-built spreadsheet template and benchmark reference guide.",
    type: "Template",
    category: "operations",
  },
  {
    id: "security-checklist",
    title: "SOC 2 Readiness Checklist",
    description:
      "Prepare your SaaS infrastructure for security audits with this step-by-step checklist covering access control, encryption, and logging.",
    type: "Checklist",
    category: "development",
  },
  {
    id: "channel-partnership",
    title: "Channel Partnership Playbook",
    description:
      "Framework for identifying, evaluating, and launching distribution partnerships with integrators, resellers, and platform marketplaces.",
    type: "Framework",
    category: "distribution",
  },
  {
    id: "founder-operating-system",
    title: "Founder Operating System",
    description:
      "Weekly planning templates, OKR frameworks, and decision logs designed for solo founders and small SaaS teams.",
    type: "Template",
    category: "operations",
  },
];

export const resourceCategories: { id: ResourceCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "development", label: "Development" },
  { id: "marketing", label: "Marketing" },
  { id: "distribution", label: "Distribution" },
  { id: "sales", label: "Sales" },
  { id: "mvp", label: "MVP" },
  { id: "operations", label: "Operations" },
];

export const typeBadgeColors: Record<ResourceType, string> = {
  Template: "bg-emerald/15 text-emerald border-emerald/30",
  Framework: "bg-amber/15 text-amber border-amber/30",
  Checklist: "bg-violet/15 text-violet border-violet/30",
};
