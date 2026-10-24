import Link from "next/link";
import { LivingProjectCard } from "@/components/living-project-card";
import { flagshipProjects, secondaryProjects } from "@/lib/projects";

export function LivingProjectGrid() {
  return (
    <div className="living-grid">
      {flagshipProjects.map((project, index) => (
        <LivingProjectCard project={project} index={index} key={project.slug} />
      ))}
      {flagshipProjects.length % 2 === 1 ? (
        <Link className="living-grid__more" href="/projects/#other-work">
          <span className="living-card__index">Other work / {String(secondaryProjects.length).padStart(2, "0")}</span>
          <span className="living-grid__more-title">Earlier case studies, smaller systems, and tools.</span>
          <span className="living-card__open">See all <span aria-hidden="true">→</span></span>
        </Link>
      ) : null}
    </div>
  );
}
