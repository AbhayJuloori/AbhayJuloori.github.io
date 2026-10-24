import type { Metadata } from "next";
import Link from "next/link";
import { ContributionList, MaintainedProject, OpenSourceStats } from "@/components/open-source-index";
import { PageFrame } from "@/components/page-frame";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Open source — Abhay Juloori",
  description: "Fixes and features contributed to darts and scikit-survival, and the open problems in Catanator.",
};

export default function OpenSourcePage() {
  return (
    <PageFrame
      eyebrow="Open source"
      title="Fixes sent upstream from the libraries I actually use."
      note="Each one started as a wrong number or a crash in my own forecasting or survival work. Bug report first, then a fix with tests."
    >
      <section className="section-block section-block--flush shell" aria-label="Contribution summary">
        <OpenSourceStats />
      </section>

      <section className="section-block shell" id="contributions" aria-labelledby="contributions-title">
        <SectionHeading
          id="contributions-title"
          index="01"
          eyebrow="Contributions"
          title="Done, in review, and reported."
          note="Time-series forecasting in Unit8's darts and survival analysis in scikit-survival."
        />
        <ContributionList />
      </section>

      <section className="section-block shell" id="maintained" aria-labelledby="maintained-title">
        <SectionHeading
          id="maintained-title"
          index="02"
          eyebrow="Maintained"
          title="A project with its open problems in public."
          note="Pick one up, or tell me where you are stuck."
        />
        <MaintainedProject />
      </section>

      <section className="section-block shell oss-cta" aria-label="Get in touch">
        <p>Hit a problem in one of these libraries, or in something I built?</p>
        <Link className="text-action" href="/contact/">Send me a message <span aria-hidden="true">→</span></Link>
      </section>
    </PageFrame>
  );
}
