export type ProjectSlug =
  | "freight-kpi-tracker"
  | "retail-demand-intelligence"
  | "loansurv"
  | "caretarget";

export type ProjectPalette = "freight" | "retail" | "loan" | "care";
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
  sections: readonly CaseStudySectionId[];
};

export type SecondaryProject = {
  title: string;
  category: string;
  summary: string;
  repositoryUrl: string;
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
