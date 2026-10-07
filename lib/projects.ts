import type { ProjectSlug, ProjectSummary, SecondaryProject } from "@/lib/types";

export const projects = [
  {
    slug: "wikipulse",
    tier: "flagship",
    title: "WikiPulse",
    premise: "Deciding which live Wikipedia edits a human patroller should inspect first, as they happen.",
    category: "Streaming system",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/wikipulse",
    demoUrl: "https://abhayjuloori.github.io/wikipulse/",
    preview: "wiki",
    palette: "wiki",
    contribution:
      "I built the Kafka → Spark Structured Streaming → Iceberg pipeline, an explainable review score and alert rules, and a browser port of that logic checked against real captured edits.",
    technologies: ["Kafka", "Spark Structured Streaming", "Apache Iceberg"],
  },
  {
    slug: "warehouse-digital-twin",
    tier: "flagship",
    title: "Warehouse Fulfillment Digital Twin",
    premise: "Finding the cheapest staffing and process plan that still keeps a two-hour delivery promise.",
    category: "Simulation & optimization",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/warehouse-fulfillment-digital-twin",
    demoUrl: "https://abhayjuloori.github.io/warehouse-fulfillment-digital-twin/",
    preview: "warehouse",
    palette: "warehouse",
    contribution:
      "I modelled a grocery fulfillment shift as a discrete-event simulation, searched staffing and process levers with Optuna, and only accepted plans that held on seeds never used to choose them.",
    technologies: ["Discrete-event simulation", "Optimization", "Decision interface"],
  },
  {
    slug: "graph-fraud-detection",
    tier: "flagship",
    title: "Graph-Aware Fraud Detection",
    premise: "Testing whether transaction-graph features earn their complexity—and keeping the simpler model when they don't.",
    category: "ML system & monitoring",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/graph-aware-fraud-detection",
    demoUrl: "https://abhayjuloori.github.io/graph-aware-fraud-detection/",
    preview: "fraud",
    palette: "fraud",
    contribution:
      "I built time-safe graph features, a validation gate for promoting the graph model, an MLflow-registered champion served through FastAPI with TreeSHAP reasons, and drift monitoring.",
    technologies: ["Graph features", "Model registry & serving", "Drift monitoring"],
  },
  {
    slug: "freight-kpi-tracker",
    tier: "flagship",
    title: "Freight KPI Tracker",
    premise: "Finding costly or late freight shipments, explaining why they need review, and helping an analyst decide what to do next.",
    category: "Operational analytics",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/freight-kpi-tracker",
    preview: "freight",
    palette: "freight",
    contribution:
      "I rebuilt the analysis around authoritative cost reconciliation, leakage-safe baselines, held-out evaluation, and a portable investigation workbench with inspectable evidence.",
    technologies: ["Leakage-safe detection", "Operational prioritization", "Evidence design"],
  },
  {
    slug: "retail-demand-intelligence",
    tier: "other",
    title: "Retail Demand Intelligence",
    premise: "Turning realistic demand behavior into forecasting and inventory decisions.",
    category: "Forecasting system",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/retail-demand-intelligence",
    demoUrl: "https://abhayjuloori.github.io/retail-demand-intelligence/",
    preview: "retail",
    palette: "retail",
    contribution:
      "I designed the demand environment, forecasting workflow, and inventory translation so the project could test planning decisions rather than display isolated predictions.",
    technologies: ["Forecasting", "Inventory planning", "Decision interface"],
  },
  {
    slug: "loansurv",
    tier: "other",
    title: "LoanSurv",
    premise: "Modelling when risk arrives—not only whether it arrives.",
    category: "Survival modelling",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/loansurv",
    demoUrl: "https://abhayjuloori.github.io/loansurv/",
    preview: "loan",
    palette: "loan",
    contribution:
      "I reframed loan default as a time-to-event problem and carried the analysis into an interactive product that makes changing risk visible over time.",
    technologies: ["Survival analysis", "Credit risk", "Interactive product"],
  },
  {
    slug: "caretarget",
    tier: "other",
    title: "CareTarget",
    premise: "Finding who may benefit from intervention, not merely who appears risky.",
    category: "Decision science",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/hospital-readmission-targeting",
    preview: "care",
    palette: "care",
    contribution:
      "I separated baseline readmission risk from estimated intervention benefit and made that distinction inspectable through a decision-support interface.",
    technologies: ["Treatment effects", "Survival analysis", "Fairness"],
  },
] as const satisfies readonly ProjectSummary[];

export const flagshipProjects = projects.filter((project) => project.tier === "flagship");

const toolProjects = [
  {
    title: "Credit Recourse Engine",
    category: "ML system",
    summary: "Confidence-aware credit decisions paired with feasible counterfactual actions.",
    href: "https://github.com/AbhayJuloori/credit-recourse-engine",
    external: true,
  },
  {
    title: "Controlled Document Retrieval",
    category: "Governed RAG",
    summary: "Role, jurisdiction, version, and effective-date controls around retrieval.",
    href: "https://github.com/AbhayJuloori/controlled-document-retrieval-compliance-tracking-system",
    external: true,
  },
  {
    title: "Codex–Claude Bridge",
    category: "Personal tool",
    summary: "A local orchestration layer for handing structured work between coding agents.",
    href: "https://github.com/AbhayJuloori/codex-claude-bridge",
    external: true,
  },
  {
    title: "Mac Session Loader",
    category: "Personal tool",
    summary: "Scheduling and monitoring local Codex and Claude sessions from a phone-safe surface.",
    href: "https://github.com/AbhayJuloori/mac-session-loader",
    external: true,
  },
  {
    title: "NIFTY–S&P Evidence Desk",
    category: "Experiment",
    summary: "A compact market-research desk for comparing two indices and their surrounding evidence.",
    href: "https://github.com/AbhayJuloori/nifty-spx-evidence-desk",
    external: true,
  },
] as const satisfies readonly SecondaryProject[];

export const secondaryProjects: readonly SecondaryProject[] = [
  ...projects
    .filter((project) => project.tier === "other")
    .map((project) => ({
      title: project.title,
      category: project.category,
      summary: project.premise,
      href: `/work/${project.slug}`,
      external: false,
    })),
  ...toolProjects,
];

export function isProjectSlug(value: string): value is ProjectSlug {
  return projects.some((project) => project.slug === value);
}

export function getProject(slug: ProjectSlug): ProjectSummary {
  return projects.find((project) => project.slug === slug)!;
}
