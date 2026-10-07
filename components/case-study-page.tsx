import Link from "next/link";
import { ProjectPreview } from "@/components/project-preview";
import { SiteHeader } from "@/components/site-header";
import type { CaseStudyContent, CaseStudySectionId, ProjectSummary } from "@/lib/types";

const sectionLabels: Record<CaseStudySectionId, string> = {
  question: "The question",
  data: "Data",
  system: "System",
  evidence: "Evidence",
  interface: "Interface",
  limitations: "Limitations",
};

export function CaseStudyPage({ project, study }: { project: ProjectSummary; study: CaseStudyContent }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={`case-study case-study--${project.palette} shell`}>
        <Link className="project-entry-page__back" href="/#work">← Back to selected work</Link>

        <header className="case-study__header">
          <p className="eyebrow">{project.category} / {project.status}</p>
          <div>
            <h1>{project.title}</h1>
            <p className="case-study__headline">{study.headline}</p>
          </div>
        </header>

        <div className="project-entry-page__media" style={{ viewTransitionName: `project-${project.slug}` }}>
          <ProjectPreview preview={project.preview} />
        </div>

        <section className="case-study__intro" aria-label="Overview">
          <p className="eyebrow">The decision</p>
          <div>
            <p className="case-study__question">{study.question}</p>
            <p className="case-study__lede">{study.lede}</p>
            <ul className="project-entry-page__tags" aria-label="Methods and disciplines">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
          <div className="project-entry-page__links">
            {study.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="case-study__stats" aria-label="Headline numbers">
          <dl>
            {study.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <p>{study.statsNote}</p>
        </section>

        <nav className="case-study__nav" aria-label="Case study sections">
          {study.sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {sectionLabels[section.id]}
            </a>
          ))}
        </nav>

        <div className="case-study__body">
          {study.sections.map((section, index) => (
            <article id={section.id} key={section.id}>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {sectionLabels[section.id]}</p>
              <div>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>

        <footer className="case-study__footer">
          <p>{project.contribution}</p>
          <Link href="/#work">← All selected work</Link>
        </footer>
      </main>
    </>
  );
}
