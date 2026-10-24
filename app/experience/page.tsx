import type { Metadata } from "next";
import { ExperienceIndex } from "@/components/experience-index";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Experience — Abhay Juloori",
  description: "Research, data platform, and risk work across three teams.",
};

export default function ExperiencePage() {
  return (
    <PageFrame
      eyebrow="Experience"
      title="Work shaped by the decisions around the model."
      note="Three teams across research, data platforms, and risk. Public details stay deliberately narrower than the work itself."
    >
      <section className="section-block section-block--flush shell" id="experience" aria-label="Experience">
        <ExperienceIndex />
      </section>
    </PageFrame>
  );
}
