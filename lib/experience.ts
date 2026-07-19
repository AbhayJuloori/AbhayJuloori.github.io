import type { ExperienceEntry } from "@/lib/types";

export const experience: readonly ExperienceEntry[] = [
  {
    company: "Procter & Gamble",
    role: "Engineering Analytics",
    dates: "May 2025 — Apr 2026",
    summary:
      "Built a public-safe surrogate-modelling workflow for an expensive packaging-engineering process, with confidence determining when the shortcut should be trusted or escalated.",
  },
  {
    company: "Tayo AI",
  },
] as const;
