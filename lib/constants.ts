import {
  Clock,
  AlertTriangle,
  EyeOff,
  Database,
  Network,
  FileText,
  History,
  Link,
  Cpu,
  Rocket,
  Target,
  LineChart,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation ──────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Product", href: "#features" },
  { label: "Why UNCHAIN", href: "#problem" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
] as const;

// ─── Hero ────────────────────────────────────────────────

export const HERO = {
  eyebrow: "Decision Intelligence for Product Teams",
  h1: "Stop Burying Decisions in Noise.",
  h2: "UNCHAIN is an AI-powered Decision System of Record that ingests signals from Slack, Jira, Notion, user interviews, and more — then uses multi-agent AI to synthesize insights and produce decision-ready artifacts like PRDs, tickets, and strategy briefs.",
  ctaPrimary: "Start Free Workspace",
  ctaSecondary: "Watch Demo",
  trustLine: "Trusted by product teams at fast-moving B2B SaaS companies",
} as const;

// ─── Trust Logos ─────────────────────────────────────────

export const TRUST_LOGOS = [
  "Slack",
  "Jira",
  "Notion",
  "Linear",
  "GitHub",
  "Confluence",
  "Google Docs",
  "HubSpot",
] as const;

// ─── Pain Points ─────────────────────────────────────────

export interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
  borderColor: string;
}

export const PAIN_POINTS: PainPoint[] = [
  {
    icon: Clock,
    title: "Time lost to alignment theater",
    description:
      "PMs spend 30–50% of their time summarizing and re-aligning stakeholders instead of making decisions.",
    borderColor: "border-red-500/50",
  },
  {
    icon: AlertTriangle,
    title: "Decisions re-litigated endlessly",
    description:
      "Decisions are re-litigated because context is lost in Slack threads and doc comments that no one can find.",
    borderColor: "border-amber-500/50",
  },
  {
    icon: EyeOff,
    title: "No visibility into the 'why'",
    description:
      "Executives can't see WHY decisions were made — only the output. Strategy reviews become guesswork.",
    borderColor: "border-red-500/50",
  },
];

// ─── Feature Tabs ────────────────────────────────────────

export interface FeatureTab {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
}

export const FEATURE_TABS: FeatureTab[] = [
  {
    id: "signal-ingestion",
    label: "Signal Ingestion",
    icon: Database,
    title: "Ingest every signal. Miss nothing.",
    description:
      "UNCHAIN connects to your existing tools and automatically captures product signals — Slack feedback, user interviews, support tickets, analytics events, competitor mentions, and more.",
    bullets: [
      "Slack channels & threads",
      "Jira tickets & comments",
      "Notion docs & databases",
      "User interview transcripts",
      "Support tickets & NPS data",
    ],
  },
  {
    id: "multi-agent-synthesis",
    label: "Multi-Agent Synthesis",
    icon: Network,
    title: "AI agents that challenge each other.",
    description:
      "Unlike single-model tools, UNCHAIN uses adversarial multi-agent AI. Agents argue, validate, and stress-test insights — so you get recommendations that have survived scrutiny, not just pattern matching.",
    bullets: [
      "Adversarial validation between agents",
      "Confidence scoring on every insight",
      "Bias detection & assumption flagging",
      "Evidence-linked recommendations",
    ],
  },
  {
    id: "decision-artifacts",
    label: "Decision Artifacts",
    icon: FileText,
    title: "From signals to ship-ready artifacts.",
    description:
      "UNCHAIN doesn't just analyze — it produces. Get draft PRDs, prioritized tickets, decision briefs, and strategy memos that you can review, refine, and export directly to Jira, Linear, or Notion.",
    bullets: [
      "Auto-generated PRDs",
      "Prioritized ticket drafts",
      "Decision briefs with evidence trails",
      "Strategy memos for leadership",
      "Export to Jira / Linear / Notion",
    ],
  },
  {
    id: "memory-traceability",
    label: "Memory & Traceability",
    icon: History,
    title: "Institutional memory that never fades.",
    description:
      "Every decision is linked back to the signals, discussions, and agent reasoning that produced it. Six months from now, anyone can trace WHY a decision was made — not just that it was.",
    bullets: [
      "Full decision audit trail",
      "Signal-to-decision lineage",
      "Agent reasoning logs",
      "Searchable decision history",
      "Onboarding-friendly context",
    ],
  },
];

// ─── How It Works Steps ──────────────────────────────────

export interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    number: 1,
    icon: Link,
    title: "Connect",
    description:
      "Link your Slack, Jira, Notion workspace in minutes. UNCHAIN starts ingesting signals immediately.",
  },
  {
    number: 2,
    icon: Cpu,
    title: "Synthesize",
    description:
      "Multi-agent AI analyzes signals and drafts decision artifacts — with adversarial validation built in.",
  },
  {
    number: 3,
    icon: Rocket,
    title: "Ship",
    description:
      "Export PRDs and tickets back to Jira/Linear/Notion with full traceability. Ship with confidence.",
  },
];

// ─── Stakeholder Value Cards ─────────────────────────────

export interface StakeholderCard {
  icon: LucideIcon;
  role: string;
  title: string;
  description: string;
}

export const STAKEHOLDER_CARDS: StakeholderCard[] = [
  {
    icon: Target,
    role: "Product Leadership",
    title: "Higher-quality decisions, faster",
    description:
      "See the full evidence trail behind every product decision. Run strategy reviews backed by data, not opinions. Ensure consistency across squads.",
  },
  {
    icon: LineChart,
    role: "Founders & Executives",
    title: "Evidence-backed strategy",
    description:
      "Stop relying on summaries of summaries. Get direct visibility into why teams are building what they're building — with the receipts to back it up.",
  },
  {
    icon: Zap,
    role: "Product Managers",
    title: "Less busywork, more impact",
    description:
      "Stop writing PRDs from scratch. Stop re-explaining decisions. UNCHAIN drafts artifacts and maintains context so you can focus on what matters — shipping.",
  },
];

// ─── Testimonials ────────────────────────────────────────

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  stars: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "UNCHAIN gave us a source of truth for why we built what we built. Our board reviews have never been cleaner.",
    name: "Sarah Chen",
    title: "VP of Product",
    company: "ScaleAI Co.",
    stars: 5,
  },
  {
    quote:
      "We cut our decision-to-ship cycle by 40%. The multi-agent synthesis catches blind spots our team routinely missed.",
    name: "Marcus Rivera",
    title: "Head of Product",
    company: "Nexus SaaS",
    stars: 5,
  },
  {
    quote:
      "Onboarding new PMs used to take weeks of context transfer. Now they search UNCHAIN and have full decision history in minutes.",
    name: "Priya Patel",
    title: "CPO",
    company: "VelocityHQ",
    stars: 5,
  },
];

// ─── Integrations ────────────────────────────────────────

export const INTEGRATIONS = [
  "Slack",
  "Jira",
  "Notion",
  "Linear",
  "GitHub",
  "Confluence",
  "Google Workspace",
  "HubSpot",
  "Discord",
  "Figma",
] as const;

// ─── Footer ──────────────────────────────────────────────

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Community", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];
