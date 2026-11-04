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
  {
    slug: "keystroke-mouse-anomaly",
    tier: "flagship",
    title: "Keystroke and Mouse Anomaly Detection",
    premise: "Telling whether the person typing a password and moving the mouse is the person who usually does.",
    category: "Behavioral biometrics",
    status: "Built 2026",
    repositoryUrl: "https://github.com/AbhayJuloori/keystroke-mouse-anomaly",
    demoUrl: "https://abhayjuloori.github.io/keystroke-mouse-anomaly/",
    preview: "signature",
    palette: "signature",
    contribution:
      "I fit per-user keystroke and mouse models on public benchmarks with a time split, combined them with synthetic device signals into one explained risk score, and served it through FastAPI with a per-user drift check.",
    technologies: ["Anomaly detection", "Risk scoring", "Drift monitoring"],
  },
] as const satisfies readonly ProjectSummary[];

export const flagshipProjects = projects.filter((project) => project.tier === "flagship");

const toolProjects = [
  {
    title: "Stats Reasoning Eval for LLMs",
    category: "LLM evaluation",
    summary: "150 data prompts and 60 planted methodology flaws; which open models catch peeking, leakage and Simpson's paradox, and how far to trust the judge.",
    href: "https://abhayjuloori.github.io/stats-reasoning-eval/",
    external: true,
  },
  {
    title: "Catanator",
    category: "Game AI",
    summary: "A two-player Catan bot: a Rust engine checked move by move against the reference, a whole-turn planner, and a self-play-tuned evaluation. Strong against bots in simulation, not yet against good humans.",
    href: "https://github.com/AbhayJuloori/catanator",
    external: true,
  },
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
    title: "NIFTY–S&P Evidence Desk",
    category: "Experiment",
    summary: "A compact market-research desk for comparing two indices and their surrounding evidence.",
    href: "https://github.com/AbhayJuloori/nifty-spx-evidence-desk",
    external: true,
  },
  {
    title: "GLP-1 Evidence Agent",
    category: "Graph RAG",
    summary: "A LangGraph agent that answers GLP-1 drug questions only from FAERS reports, ClinicalTrials.gov studies and FDA labels, with BM25, vector and Neo4j retrieval, checked citations, and an eval gate for retrieval, groundedness, refusals and prompt injection.",
    href: "https://abhayjuloori.github.io/glp1-faers-trials-graph-rag/",
    external: true,
  },
  {
    title: "Clinical Trial Termination Risk",
    category: "ML pipeline",
    summary: "Flagging trials likely to end early from what is known at registration: 609,811 ClinicalTrials.gov records through PySpark and Delta Lake, LightGBM on a start-year split, and an MLflow champion.",
    href: "https://abhayjuloori.github.io/trial-termination-risk-ctgov/",
    external: true,
  },
  {
    title: "GLP-1 Part D Lakehouse and Text to SQL",
    category: "Data engineering",
    summary: "A medallion pipeline over 128.5 million CMS Part D prescriber-drug rows with GLP-1 marts, and a text to SQL agent scored by execution accuracy on hand-written questions.",
    href: "https://abhayjuloori.github.io/glp1-partd-lakehouse-text2sql/",
    external: true,
  },
  {
    title: "Medicare Claims Data Mart",
    category: "Healthcare analytics",
    summary: "A claims mart and HEDIS style readmission, HbA1c testing and PMPM measures on CMS synthetic Medicare claims, reproduced exactly by an independent DuckDB rerun.",
    href: "https://abhayjuloori.github.io/medicare-claims-mart-synpuf/",
    external: true,
  },
  {
    title: "Claim Frequency and Severity Pricing",
    category: "Insurance pricing",
    summary: "Poisson and gamma GLMs against LightGBM on 678,013 French motor policies, a FastAPI and Next.js segment explorer, and llama3.1:8b segment notes rejected unless a checker matches them to the model output.",
    href: "https://abhayjuloori.github.io/claim-frequency-severity-fremtpl2/",
    external: true,
  },
  {
    title: "Pay Equity and Wage and Hour Study",
    category: "People analytics",
    summary: "Gender pay gap regressions in R on 71,343 Montgomery County payroll rows, with reduction in force adverse impact and meal break checks run on simulated data seeded from the real roster.",
    href: "https://abhayjuloori.github.io/pay-equity-montgomery-county-payroll/",
    external: true,
  },
  {
    title: "Card Transaction Enrichment",
    category: "Data quality",
    summary: "Merchant category mapping, audited transaction attributes and anomaly flags on 24.4 million synthetic card transactions (IBM TabFormer) in DuckDB, with post-refresh drift tests.",
    href: "https://abhayjuloori.github.io/card-transaction-enrichment-tabformer/",
    external: true,
  },
  {
    title: "Battery Pack Traceability",
    category: "Manufacturing analytics",
    summary: "Pack serial genealogy in DuckDB, SQL rules that catch broken traceability records, and returns root cause by cell lot and build week, with cell ageing from 124 real cells and synthetic packs.",
    href: "https://abhayjuloori.github.io/battery-pack-traceability-severson/",
    external: true,
  },
  {
    title: "Supply Chain Lakehouse",
    category: "Data engineering",
    summary: "A bronze, silver and gold Delta Lake pipeline over the AdventureWorks manufacturing ERP sample, reconciled back to source, feeding a Power BI semantic model with DAX measures.",
    href: "https://abhayjuloori.github.io/supply-chain-lakehouse-adventureworks/",
    external: true,
  },
  {
    title: "Early Grasp Outcome Prediction",
    category: "Robotics ML",
    summary: "Predicting whether a robot grasp will fail from its first few control steps on Open X-Embodiment kuka telemetry, plus failure mode classification on the UCI robot failure data.",
    href: "https://abhayjuloori.github.io/grasp-outcome-prediction-oxe/",
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
