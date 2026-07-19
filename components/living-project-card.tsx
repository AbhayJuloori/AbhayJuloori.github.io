import { ProjectPreview } from "@/components/project-preview";
import { ProjectTransitionLink } from "@/components/project-transition-link";
import type { ProjectSummary } from "@/lib/types";

export function LivingProjectCard({ project, index }: { project: ProjectSummary; index: number }) {
  return (
    <article className={`living-card living-card--${project.palette}`}>
      <ProjectTransitionLink className="living-card__link" href={`/work/${project.slug}`}>
        <div
          className="living-card__media"
          style={{ viewTransitionName: `project-${project.slug}` }}
        >
          <ProjectPreview preview={project.preview} />
        </div>
        <div className="living-card__meta">
          <span className="living-card__index">0{index + 1} / {project.category}</span>
          <span className="living-card__open">Open case study <span aria-hidden="true">↗</span></span>
          <h3>{project.title}</h3>
          <span className="living-card__category">{project.status}</span>
          <p className="living-card__premise">{project.premise}</p>
        </div>
      </ProjectTransitionLink>
    </article>
  );
}
