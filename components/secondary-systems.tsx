import { secondaryProjects } from "@/lib/projects";

export function SecondarySystems() {
  return (
    <div className="secondary-layout">
      <p className="eyebrow">Smaller systems</p>
      <div className="secondary-list">
        {secondaryProjects.map((project, index) => (
          <a
            className="secondary-item"
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            key={project.title}
          >
            <span>0{index + 1} / {project.category}</span>
            <strong>{project.title}</strong>
            <p>{project.summary}</p>
            <small aria-hidden="true">↗</small>
          </a>
        ))}
      </div>
    </div>
  );
}
