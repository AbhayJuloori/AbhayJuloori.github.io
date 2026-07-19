import { LivingProjectCard } from "@/components/living-project-card";
import { flagshipProjects } from "@/lib/projects";

export function LivingProjectGrid() {
  return (
    <div className="living-grid">
      {flagshipProjects.map((project, index) => (
        <LivingProjectCard project={project} index={index} key={project.slug} />
      ))}
    </div>
  );
}
