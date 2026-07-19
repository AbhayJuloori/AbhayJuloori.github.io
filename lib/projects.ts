import type { ProjectSlug, ProjectSummary, SecondaryProject } from "@/lib/types";

export const flagshipProjects = [
  {
    slug: "freight-kpi-tracker",
    title: "Freight KPI Tracker",
    premise: "Finding where operations break before the summary report does.",
    category: "Operational analytics",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/freight-kpi-tracker",
    preview: "freight",
    palette: "freight",
    contribution:
      "I rebuilt the analysis around authoritative cost reconciliation, leakage-safe baselines, held-out evaluation, and a portable investigation workbench with inspectable evidence.",
    technologies: ["Leakage-safe detection", "Operational prioritization", "Evidence design"],
    sections: ["question", "data", "system", "evidence", "interface", "limitations"],
  },
  {
    slug: "retail-demand-intelligence",
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
    sections: ["question", "data", "system", "evidence", "interface", "limitations"],
  },
  {
    slug: "loansurv",
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
    sections: ["question", "data", "system", "evidence", "interface", "limitations"],
  },
  {
    slug: "caretarget",
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
    sections: ["question", "data", "system", "evidence", "interface", "limitations"],
  },
] as const satisfies readonly ProjectSummary[];

export const secondaryProjects = [
  {
    title: "Credit Recourse Engine",
    category: "ML system",
    summary: "Confidence-aware credit decisions paired with feasible counterfactual actions.",
    repositoryUrl: "https://github.com/AbhayJuloori/credit-recourse-engine",
  },
  {
    title: "Controlled Document Retrieval",
    category: "Governed RAG",
    summary: "Role, jurisdiction, version, and effective-date controls around retrieval.",
    repositoryUrl:
      "https://github.com/AbhayJuloori/controlled-document-retrieval-compliance-tracking-system",
  },
  {
    title: "Codex–Claude Bridge",
    category: "Personal tool",
    summary: "A local orchestration layer for handing structured work between coding agents.",
    repositoryUrl: "https://github.com/AbhayJuloori/codex-claude-bridge",
  },
  {
    title: "Mac Session Loader",
    category: "Personal tool",
    summary: "Scheduling and monitoring local Codex and Claude sessions from a phone-safe surface.",
    repositoryUrl: "https://github.com/AbhayJuloori/mac-session-loader",
  },
  {
    title: "NIFTY–S&P Evidence Desk",
    category: "Experiment",
    summary: "A compact market-research desk for comparing two indices and their surrounding evidence.",
    repositoryUrl: "https://github.com/AbhayJuloori/nifty-spx-evidence-desk",
  },
] as const satisfies readonly SecondaryProject[];

export function isProjectSlug(value: string): value is ProjectSlug {
  return flagshipProjects.some((project) => project.slug === value);
}

export function getProject(slug: ProjectSlug): ProjectSummary {
  return flagshipProjects.find((project) => project.slug === slug)!;
}

export function getAdjacentProjects(slug: ProjectSlug) {
  const index = flagshipProjects.findIndex((project) => project.slug === slug);
  const previous = flagshipProjects[(index - 1 + flagshipProjects.length) % flagshipProjects.length];
  const next = flagshipProjects[(index + 1) % flagshipProjects.length];
  return { previous, next };
}
