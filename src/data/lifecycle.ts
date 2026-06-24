import type { LucideIcon } from "lucide-react";
import {
  Binoculars,
  Blocks,
  ChartNoAxesCombined,
  CircleCheckBig,
  Rocket,
  SearchCheck,
} from "lucide-react";

export type PhaseId =
  | "discover"
  | "validate"
  | "build"
  | "pre-launch"
  | "launch"
  | "marketing-sales";

export interface SubPhase {
  id: string;
  title: string;
  description: string;
  topics?: string[];
}

export interface LifecyclePhase {
  id: PhaseId;
  number: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  goal: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
  accent: string;
  subPhases: SubPhase[];
}

export const lifecyclePhases: LifecyclePhase[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    shortTitle: "Discover",
    eyebrow: "Find the right problem",
    goal: "Identify a real problem worth solving.",
    description:
      "Understand the customer, the market, and the opportunity before you commit time or money.",
    outcome: "A specific customer, a painful problem, and an opportunity worth investigating.",
    icon: Binoculars,
    accent: "text-cyan-400",
    subPhases: [
      {
        id: "problem-discovery",
        title: "Problem Discovery",
        description: "Find recurring, expensive, and underserved problems.",
      },
      {
        id: "customer-research",
        title: "Customer Research",
        description: "Understand who experiences the problem and how it affects them.",
        topics: ["Ideal Customer Profile", "Customer Pain Points"],
      },
      {
        id: "competitor-analysis",
        title: "Competitor Analysis",
        description: "Map direct, indirect, and do-it-yourself alternatives.",
      },
      {
        id: "market-validation",
        title: "Market Validation",
        description: "Check whether the market is reachable, active, and growing.",
      },
      {
        id: "opportunity-assessment",
        title: "Opportunity Assessment",
        description: "Evaluate urgency, willingness to pay, timing, and founder fit.",
      },
    ],
  },
  {
    id: "validate",
    number: "02",
    title: "Validate",
    shortTitle: "Validate",
    eyebrow: "Prove demand",
    goal: "Prove there is demand before building.",
    description:
      "Pressure-test assumptions with evidence from existing solutions, differentiation, and real users.",
    outcome: "Evidence that a defined audience wants a meaningfully better solution.",
    icon: SearchCheck,
    accent: "text-violet-400",
    subPhases: [
      {
        id: "existing-solutions",
        title: "Existing Solutions Analysis",
        description: "Study what exists, what works, and what users still dislike.",
        topics: ["Current solutions", "Competitor behavior", "Unmet expectations"],
      },
      {
        id: "differentiation-strategy",
        title: "Differentiation Strategy",
        description: "Define why users would switch and what advantage you can sustain.",
        topics: ["Switching triggers", "Unique advantage", "Better outcomes"],
      },
      {
        id: "user-validation",
        title: "User Validation",
        description: "Interview target users, collect feedback, and test assumptions.",
        topics: ["10+ user interviews", "Feedback synthesis", "Assumption testing"],
      },
    ],
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    shortTitle: "Build",
    eyebrow: "Ship the useful 20%",
    goal: "Create the MVP with maximum speed and minimum complexity.",
    description:
      "Plan, design, develop, test, and document the smallest product that delivers the core value.",
    outcome: "A focused, usable MVP ready for real customers—not a miniature enterprise platform.",
    icon: Blocks,
    accent: "text-blue-400",
    subPhases: [
      {
        id: "product-planning",
        title: "Product Planning",
        description: "Turn validated needs into a focused, testable MVP scope.",
        topics: ["Scope definition", "Feature prioritization", "Now vs later"],
      },
      {
        id: "organization-setup",
        title: "Organization Setup",
        description: "Create the accounts and operating foundation your product needs.",
        topics: ["GitHub", "Hosting", "Domains", "Analytics", "Authentication"],
      },
      {
        id: "system-design",
        title: "System Design",
        description: "Choose a simple architecture and clear service boundaries.",
        topics: ["High-Level Design", "Architecture", "Service boundaries"],
      },
      {
        id: "database-design",
        title: "Database Design",
        description: "Model the data, relationships, constraints, and access patterns.",
      },
      {
        id: "ux-design",
        title: "UX Design",
        description: "Design the shortest path from intent to customer value.",
      },
      {
        id: "ui-design",
        title: "UI Design",
        description: "Build a clear, consistent, and accessible interface.",
      },
      {
        id: "mvp-development",
        title: "MVP Development",
        description: "Implement the smallest coherent version of the product.",
      },
      {
        id: "infrastructure",
        title: "Infrastructure Setup",
        description: "Configure deployment, environments, observability, and recovery.",
      },
      {
        id: "testing",
        title: "Testing",
        description: "Test internally, in development, with alpha users, and with beta users.",
        topics: ["Internal", "Development", "Alpha", "Beta"],
      },
      {
        id: "documentation",
        title: "Documentation",
        description: "Record architecture, decisions, product guidance, and legal essentials.",
        topics: ["HLD", "LLD", "Database design", "Privacy", "Terms"],
      },
    ],
  },
  {
    id: "pre-launch",
    number: "04",
    title: "Pre-Launch",
    shortTitle: "Pre-Launch",
    eyebrow: "Prepare for public use",
    goal: "Prepare everything required before public release.",
    description:
      "Review the product, finish the essentials, prepare launch assets, and make onboarding reliable.",
    outcome: "A release candidate, complete launch assets, and a first-user experience you trust.",
    icon: CircleCheckBig,
    accent: "text-amber-400",
    subPhases: [
      {
        id: "product-readiness",
        title: "Product Readiness Review",
        description: "Audit flows, security, authentication, errors, and broken links.",
      },
      {
        id: "documentation-review",
        title: "Documentation Review",
        description: "Complete legal pages, user guides, help content, and support material.",
      },
      {
        id: "brand-presence",
        title: "Brand & Presence Setup",
        description: "Claim social handles, company profiles, and community accounts.",
      },
      {
        id: "marketing-assets",
        title: "Marketing Asset Preparation",
        description: "Prepare launch posts, landing pages, social content, and email sequences.",
      },
      {
        id: "onboarding-preparation",
        title: "Initial User Onboarding",
        description: "Prepare onboarding flows, welcome emails, and support channels.",
      },
    ],
  },
  {
    id: "launch",
    number: "05",
    title: "Launch",
    shortTitle: "Launch",
    eyebrow: "Go public",
    goal: "Release the product publicly and generate visibility.",
    description:
      "Coordinate launch channels, activate your network, respond quickly, and learn from live behavior.",
    outcome: "A public product, an initial wave of users, and clear launch performance signals.",
    icon: Rocket,
    accent: "text-rose-400",
    subPhases: [
      {
        id: "product-hunt",
        title: "Product Hunt Launch",
        description: "Plan the listing, assets, timing, and launch-day engagement.",
      },
      {
        id: "hacker-news",
        title: "Hacker News Launch",
        description: "Write a credible founder story and engage technically curious users.",
      },
      {
        id: "reddit",
        title: "Reddit Launch",
        description: "Choose relevant communities and contribute without spamming.",
      },
      {
        id: "linkedin",
        title: "LinkedIn Launch",
        description: "Use founder-led storytelling and network distribution.",
      },
      {
        id: "community",
        title: "Community Launch",
        description: "Launch thoughtfully in communities where your audience already gathers.",
      },
      {
        id: "founder-network",
        title: "Founder Network Launch",
        description: "Activate peers, customers, advisors, and early supporters.",
      },
      {
        id: "launch-analytics",
        title: "Launch Analytics Review",
        description: "Review acquisition, activation, feedback, and channel performance.",
      },
    ],
  },
  {
    id: "marketing-sales",
    number: "06",
    title: "Marketing & Sales",
    shortTitle: "Grow",
    eyebrow: "Acquire and retain",
    goal: "Acquire, convert, retain, and grow customers.",
    description:
      "Build repeatable systems for positioning, demand generation, sales, success, and expansion.",
    outcome: "A measurable growth engine that turns attention into durable customer value.",
    icon: ChartNoAxesCombined,
    accent: "text-emerald-400",
    subPhases: [
      { id: "positioning", title: "Positioning", description: "Own a clear place in the customer's mind." },
      { id: "messaging", title: "Messaging", description: "Translate product value into language customers understand." },
      { id: "content-marketing", title: "Content Marketing", description: "Teach, earn trust, and create sustained demand." },
      { id: "seo", title: "SEO", description: "Capture high-intent demand through useful search content." },
      { id: "cold-outreach", title: "Cold Outreach", description: "Start relevant conversations with qualified prospects." },
      { id: "partnerships", title: "Partnerships", description: "Grow through aligned audiences and complementary products." },
      { id: "lead-generation", title: "Lead Generation", description: "Create repeatable sources of qualified opportunities." },
      { id: "sales-process", title: "Sales Process", description: "Move prospects through a clear, measurable pipeline." },
      { id: "demo-calls", title: "Demo Calls", description: "Diagnose needs and demonstrate the path to value." },
      { id: "conversion", title: "Conversion Optimization", description: "Remove friction across acquisition and activation." },
      { id: "customer-success", title: "Customer Success", description: "Help customers achieve their desired outcome." },
      { id: "retention", title: "Retention", description: "Reduce churn by improving value realization." },
      { id: "referrals", title: "Referral Programs", description: "Turn customer advocacy into a growth channel." },
      { id: "upselling", title: "Upselling", description: "Match growing customer needs with higher-value plans." },
      { id: "expansion", title: "Expansion", description: "Grow revenue inside healthy customer accounts." },
    ],
  },
];

export const phaseById = Object.fromEntries(
  lifecyclePhases.map((phase) => [phase.id, phase]),
) as Record<PhaseId, LifecyclePhase>;

export function getPhaseIndex(phaseId: PhaseId) {
  return lifecyclePhases.findIndex((phase) => phase.id === phaseId);
}
