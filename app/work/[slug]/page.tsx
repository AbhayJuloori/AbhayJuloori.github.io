import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/project-preview";
import { SiteHeader } from "@/components/site-header";
import { FreightProjectPage } from "@/components/freight/freight-project-page";
import { flagshipProjects, getProject, isProjectSlug } from "@/lib/projects";

export function generateStaticParams() {
  return flagshipProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return {};
  const project = getProject(slug);
  return {
    title: `${project.title} — Abhay Juloori`,
    description: project.premise,
  };
}

export default async function ProjectEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const project = getProject(slug);
  if (slug === "freight-kpi-tracker") return <FreightProjectPage />;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="project-entry-page shell">
        <Link className="project-entry-page__back" href="/#work">← Back to selected work</Link>
        <header className="project-entry-page__header">
          <p className="eyebrow">{project.category} / {project.status}</p>
          <h1>{project.title}</h1>
        </header>
        <div
          className="project-entry-page__media"
          style={{ viewTransitionName: `project-${project.slug}` }}
        >
          <ProjectPreview preview={project.preview} />
        </div>
        <div className="project-entry-page__body">
          <p className="eyebrow">The project</p>
          <div>
            <p>{project.premise}</p>
            <p className="project-entry-page__contribution">{project.contribution}</p>
            <ul className="project-entry-page__tags" aria-label="Methods and disciplines">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
          <div className="project-entry-page__links">
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>
            {project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noreferrer">Open live system <span aria-hidden="true">↗</span></a> : null}
          </div>
        </div>
      </main>
    </>
  );
}
