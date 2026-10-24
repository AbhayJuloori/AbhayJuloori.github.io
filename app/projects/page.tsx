import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { SecondarySystems } from "@/components/secondary-systems";
import { SectionHeading } from "@/components/section-heading";
import { WorkingOn } from "@/components/working-on";

export const metadata: Metadata = {
  title: "Projects — Abhay Juloori",
  description: "What Abhay Juloori is building now, plus earlier case studies and smaller systems.",
};

export default function ProjectsPage() {
  return (
    <PageFrame
      eyebrow="Projects"
      title="What is being built now, and what came before."
      note="The flagship case studies live on the home page. This is the rest: the unfinished system and the smaller work around it."
    >
      <section className="section-block shell" id="working-on" aria-labelledby="working-title">
        <SectionHeading
          id="working-title"
          index="01"
          eyebrow="Working on"
          title="An unfinished system, shown with its open problems."
          note="What is built, what the evidence says, and where progress has stalled."
        />
        <WorkingOn />
      </section>

      <section className="section-block shell" id="other-work" aria-labelledby="secondary-title">
        <SectionHeading
          id="secondary-title"
          index="02"
          eyebrow="Other work"
          title="Earlier case studies, smaller systems, and tools built for a narrower need."
          note="Useful work does not have to pretend it is a flagship case study."
        />
        <SecondarySystems />
      </section>
    </PageFrame>
  );
}
