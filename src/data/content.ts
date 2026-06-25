import type { PhaseId } from "./lifecycle";

export type ContentType =
  | "Article"
  | "Guide"
  | "Checklist"
  | "Template"
  | "Framework"
  | "Case Study"
  | "Course"
  | "Video"
  | "Resource"
  | "Tool Collection";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ContentClassification {
  phase: PhaseId;
  subPhases: string[];
}

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** External destination this link points to (added by the API). */
  url?: string;
  /** Host of the external URL, e.g. "stripe.com" (added by the API). */
  sourceDomain?: string | null;
  type: ContentType;
  primaryPhase: PhaseId;
  classifications: ContentClassification[];
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  featured?: boolean;
}

export const contentItems: ContentItem[] = [
  {
    id: "problem-worth-solving",
    slug: "find-a-problem-worth-solving",
    title: "Find a SaaS Problem Worth Solving",
    description: "A practical system for spotting recurring, urgent problems with real business value.",
    type: "Guide",
    primaryPhase: "discover",
    classifications: [{ phase: "discover", subPhases: ["problem-discovery", "opportunity-assessment"] }],
    difficulty: "Beginner",
    estimatedMinutes: 12,
    tags: ["Ideas", "Problem discovery", "Founder fit"],
    featured: true,
  },
  {
    id: "icp-workbook",
    slug: "saas-icp-workbook",
    title: "SaaS Ideal Customer Profile Workbook",
    description: "Define a focused customer segment using firmographics, behaviors, triggers, and pain.",
    type: "Template",
    primaryPhase: "discover",
    classifications: [{ phase: "discover", subPhases: ["customer-research"] }],
    difficulty: "Beginner",
    estimatedMinutes: 25,
    tags: ["ICP", "Customer research", "Segmentation"],
  },
  {
    id: "competitor-map",
    slug: "competitor-analysis-map",
    title: "Competitor Analysis Map",
    description: "Compare direct, indirect, and manual alternatives without building a feature spreadsheet nobody uses.",
    type: "Framework",
    primaryPhase: "discover",
    classifications: [
      { phase: "discover", subPhases: ["competitor-analysis"] },
      { phase: "validate", subPhases: ["existing-solutions"] },
    ],
    difficulty: "Beginner",
    estimatedMinutes: 18,
    tags: ["Competition", "Market research"],
  },
  {
    id: "customer-interviews",
    slug: "customer-discovery-interview-guide",
    title: "Customer Discovery Interview Guide",
    description: "Interview scripts and synthesis prompts for learning from users without leading them.",
    type: "Template",
    primaryPhase: "validate",
    classifications: [
      { phase: "discover", subPhases: ["customer-research"] },
      { phase: "validate", subPhases: ["user-validation"] },
    ],
    difficulty: "Beginner",
    estimatedMinutes: 20,
    tags: ["Interviews", "Validation", "Research"],
    featured: true,
  },
  {
    id: "validation-scorecard",
    slug: "saas-validation-scorecard",
    title: "SaaS Validation Scorecard",
    description: "Score problem urgency, switching intent, willingness to pay, access, and market evidence.",
    type: "Checklist",
    primaryPhase: "validate",
    classifications: [{ phase: "validate", subPhases: ["user-validation", "differentiation-strategy"] }],
    difficulty: "Intermediate",
    estimatedMinutes: 15,
    tags: ["Demand", "Evidence", "Decision making"],
  },
  {
    id: "positioning-wedge",
    slug: "find-your-positioning-wedge",
    title: "Find Your Positioning Wedge",
    description: "Turn customer frustrations and your unfair advantage into a credible reason to switch.",
    type: "Guide",
    primaryPhase: "validate",
    classifications: [
      { phase: "validate", subPhases: ["differentiation-strategy"] },
      { phase: "marketing-sales", subPhases: ["positioning", "messaging"] },
    ],
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    tags: ["Differentiation", "Positioning"],
  },
  {
    id: "mvp-scope",
    slug: "mvp-scope-template",
    title: "MVP Scope & Feature Prioritization",
    description: "Define the 20% of your product that delivers 80% of the customer value.",
    type: "Template",
    primaryPhase: "build",
    classifications: [{ phase: "build", subPhases: ["product-planning"] }],
    difficulty: "Beginner",
    estimatedMinutes: 30,
    tags: ["MVP", "Scope", "Prioritization"],
    featured: true,
  },
  {
    id: "saas-architecture",
    slug: "modern-saas-architecture",
    title: "Modern SaaS Architecture Without Premature Scale",
    description: "Choose a maintainable architecture for your stage, team, and growth assumptions.",
    type: "Guide",
    primaryPhase: "build",
    classifications: [{ phase: "build", subPhases: ["system-design", "infrastructure"] }],
    difficulty: "Intermediate",
    estimatedMinutes: 16,
    tags: ["Architecture", "System design", "Tech stack"],
    featured: true,
  },
  {
    id: "database-design",
    slug: "saas-database-design-checklist",
    title: "SaaS Database Design Checklist",
    description: "Review tenancy, data ownership, constraints, migrations, indexes, and recovery.",
    type: "Checklist",
    primaryPhase: "build",
    classifications: [{ phase: "build", subPhases: ["database-design"] }],
    difficulty: "Advanced",
    estimatedMinutes: 22,
    tags: ["Database", "Multi-tenancy", "Reliability"],
  },
  {
    id: "stack-evaluator",
    slug: "tech-stack-evaluation-matrix",
    title: "Tech Stack Evaluation Matrix",
    description: "Compare implementation options against team skill, speed, cost, lock-in, and scalability.",
    type: "Framework",
    primaryPhase: "build",
    classifications: [{ phase: "build", subPhases: ["organization-setup", "system-design"] }],
    difficulty: "Intermediate",
    estimatedMinutes: 20,
    tags: ["Tech stack", "Architecture", "Decision making"],
  },
  {
    id: "launch-readiness",
    slug: "saas-launch-readiness-checklist",
    title: "SaaS Launch Readiness Checklist",
    description: "Audit product flows, security, analytics, legal pages, support, and onboarding.",
    type: "Checklist",
    primaryPhase: "pre-launch",
    classifications: [{ phase: "pre-launch", subPhases: ["product-readiness", "documentation-review"] }],
    difficulty: "Beginner",
    estimatedMinutes: 35,
    tags: ["QA", "Security", "Launch readiness"],
    featured: true,
  },
  {
    id: "launch-content-kit",
    slug: "launch-content-kit",
    title: "Multi-Channel Launch Content Kit",
    description: "Adapt one launch narrative into posts for Product Hunt, Reddit, LinkedIn, and email.",
    type: "Template",
    primaryPhase: "pre-launch",
    classifications: [
      { phase: "pre-launch", subPhases: ["marketing-assets"] },
      { phase: "launch", subPhases: ["product-hunt", "reddit", "linkedin"] },
    ],
    difficulty: "Beginner",
    estimatedMinutes: 28,
    tags: ["Launch copy", "Social", "Distribution"],
  },
  {
    id: "onboarding-audit",
    slug: "onboarding-flow-audit",
    title: "First-User Onboarding Audit",
    description: "Evaluate signup-to-value friction before your first public traffic arrives.",
    type: "Checklist",
    primaryPhase: "pre-launch",
    classifications: [
      { phase: "pre-launch", subPhases: ["onboarding-preparation"] },
      { phase: "marketing-sales", subPhases: ["conversion", "customer-success"] },
    ],
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    tags: ["Onboarding", "Activation", "UX"],
  },
  {
    id: "product-hunt",
    slug: "product-hunt-launch-playbook",
    title: "Product Hunt Launch Playbook",
    description: "Plan your page, media, maker story, outreach, launch day, and follow-up.",
    type: "Guide",
    primaryPhase: "launch",
    classifications: [{ phase: "launch", subPhases: ["product-hunt", "launch-analytics"] }],
    difficulty: "Beginner",
    estimatedMinutes: 18,
    tags: ["Product Hunt", "Launch", "Analytics"],
    featured: true,
  },
  {
    id: "launch-command-center",
    slug: "launch-day-command-center",
    title: "Launch Day Command Center",
    description: "Track channel activity, feedback, bugs, activation, and owner assignments in one place.",
    type: "Template",
    primaryPhase: "launch",
    classifications: [{ phase: "launch", subPhases: ["community", "founder-network", "launch-analytics"] }],
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    tags: ["Operations", "Launch analytics", "Feedback"],
  },
  {
    id: "first-customers",
    slug: "first-ten-saas-customers",
    title: "Get Your First 10 SaaS Customers",
    description: "A founder-led path from positioning and prospecting to demos and customer success.",
    type: "Course",
    primaryPhase: "marketing-sales",
    classifications: [{ phase: "marketing-sales", subPhases: ["positioning", "cold-outreach", "sales-process", "demo-calls"] }],
    difficulty: "Beginner",
    estimatedMinutes: 90,
    tags: ["First customers", "Sales", "Founder-led growth"],
    featured: true,
  },
  {
    id: "content-engine",
    slug: "saas-content-engine",
    title: "Build a Sustainable SaaS Content Engine",
    description: "Create topic pillars, distribution loops, and a useful publishing rhythm.",
    type: "Framework",
    primaryPhase: "marketing-sales",
    classifications: [{ phase: "marketing-sales", subPhases: ["content-marketing", "seo"] }],
    difficulty: "Intermediate",
    estimatedMinutes: 24,
    tags: ["Content", "SEO", "Distribution"],
  },
  {
    id: "churn-reduction",
    slug: "reduce-saas-churn",
    title: "Reduce SaaS Churn at the Root",
    description: "Diagnose churn by segment, expectation, activation, product usage, and customer outcome.",
    type: "Guide",
    primaryPhase: "marketing-sales",
    classifications: [{ phase: "marketing-sales", subPhases: ["customer-success", "retention", "expansion"] }],
    difficulty: "Advanced",
    estimatedMinutes: 19,
    tags: ["Churn", "Retention", "Customer success"],
  },
  {
    id: "demo-framework",
    slug: "b2b-saas-demo-framework",
    title: "B2B SaaS Demo Call Framework",
    description: "Structure discovery, value mapping, product proof, objections, and next steps.",
    type: "Framework",
    primaryPhase: "marketing-sales",
    classifications: [{ phase: "marketing-sales", subPhases: ["sales-process", "demo-calls"] }],
    difficulty: "Intermediate",
    estimatedMinutes: 17,
    tags: ["Demo", "Sales", "Objections"],
  },
];

export const contentTypes: ContentType[] = [
  "Article",
  "Guide",
  "Checklist",
  "Template",
  "Framework",
  "Case Study",
  "Course",
  "Video",
  "Resource",
  "Tool Collection",
];

export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

export function contentForPhase(phase: PhaseId, items: ContentItem[] = contentItems) {
  return items.filter((item) =>
    item.classifications.some((classification) => classification.phase === phase),
  );
}

export function getSubPhaseIds(item: ContentItem, phase: PhaseId) {
  return item.classifications.find((classification) => classification.phase === phase)?.subPhases ?? [];
}
