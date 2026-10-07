import type { ExperienceEntry } from "@/lib/types";

export const experience: readonly ExperienceEntry[] = [
  {
    company: "Procter & Gamble",
    role: "Research Data Scientist, Engineering Analytics",
    dates: "May 2025 — Apr 2026",
    summary:
      "Built a public-safe surrogate-modelling workflow for an expensive packaging-engineering process, with confidence determining when the shortcut should be trusted or escalated.",
  },
  {
    company: "Taiyo.AI",
    role: "Data Engineer & Scientist, Analytics & Data Platforms",
    dates: "May 2023 — Jul 2024",
    summary:
      "Ran Airflow-orchestrated pipelines landing 30+ external web and API sources in an S3 data lake, with deduplication that kept tender data fresh and reliable for live client analytics.",
  },
  {
    company: "Technocolabs",
    role: "Data Science Intern",
    dates: "Aug 2022 — Apr 2023",
    summary:
      "Modelled mortgage-backed-security prepayment risk under severe class imbalance and turned the results into portfolio-level views that non-technical reviewers could act on.",
  },
] as const;
