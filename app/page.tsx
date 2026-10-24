import Link from "next/link";
import { ContactFooter } from "@/components/contact-footer";
import { IntroHero } from "@/components/intro-hero";
import { LivingProjectGrid } from "@/components/living-project-grid";
import { SectionIndicator } from "@/components/section-indicator";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

const elsewhere = [
  { href: "/projects/", label: "Projects", summary: "The system I am building now, with its open problems, plus earlier case studies and smaller tools." },
  { href: "/open-source/", label: "Open source", summary: "Fixes merged into darts, work in review for scikit-survival, and bugs reported upstream." },
  { href: "/experience/", label: "Experience", summary: "Research, data platform, and risk work across three teams." },
  { href: "/notes/", label: "Notes", summary: "Field notes and the ladder behind the Catan bot." },
  { href: "/contact/", label: "Contact", summary: "Email me about a role, a library question, or a problem in something I built." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <IntroHero />

        <section className="section-block shell" id="work" aria-labelledby="work-title">
          <SectionHeading
            id="work-title"
            index="01"
            eyebrow="Selected work"
            title="Five systems, each with something real at stake."
            note="The previews show the behavior first. The case studies trace what produced it."
          />
          <div className="work-intro" aria-hidden="true">
            <span>Case studies / 05</span>
            <span>Select one to open</span>
          </div>
          <LivingProjectGrid />
        </section>

        <section className="section-block shell" id="elsewhere" aria-labelledby="elsewhere-title">
          <SectionHeading
            id="elsewhere-title"
            index="02"
            eyebrow="Elsewhere"
            title="The rest of the work, one page each."
            note="What I am building now, fixes sent upstream, past roles, and how to reach me."
          />
          <div className="secondary-layout">
            <p className="eyebrow">Pages</p>
            <div className="secondary-list">
              {elsewhere.map((page, index) => (
                <Link className="secondary-item" href={page.href} key={page.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{page.label}</strong>
                  <p>{page.summary}</p>
                  <small aria-hidden="true">→</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
      <SectionIndicator />
    </>
  );
}
