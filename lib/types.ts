export type ProjectSlug =
  | "wikipulse"
  | "warehouse-digital-twin"
  | "graph-fraud-detection"
  | "freight-kpi-tracker"
  | "retail-demand-intelligence"
  | "loansurv"
  | "caretarget";

export type ProjectPalette = "wiki" | "warehouse" | "fraud" | "freight" | "retail" | "loan" | "care";
export type ProjectTier = "flagship" | "other";
export type PreviewKey = ProjectPalette;

export type CaseStudySectionId =
  | "question"
  | "data"
  | "system"
  | "evidence"
  | "interface"
  | "limitations";

export type ProjectSummary = {
  slug: ProjectSlug;
  tier: ProjectTier;
  title: string;
  premise: string;
  category: string;
  status: string;
  repositoryUrl: string;
  demoUrl?: string;
  preview: PreviewKey;
  palette: ProjectPalette;
  contribution: string;
  technologies: readonly string[];
};

export type SecondaryProject = {
  title: string;
  category: string;
  summary: string;
  href: string;
  external: boolean;
};

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudySection = {
  id: CaseStudySectionId;
  heading: string;
  body: readonly string[];
};

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudyContent = {
  headline: string;
  lede: string;
  question: string;
  stats: readonly CaseStudyStat[];
  statsNote: string;
  sections: readonly CaseStudySection[];
  links: readonly CaseStudyLink[];
};

export type ExperienceEntry = {
  company: string;
  role?: string;
  dates?: string;
  summary?: string;
};

export type FieldNote = {
  label: string;
  title: string;
  detail: string;
};
