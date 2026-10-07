import Link from "next/link";
import { secondaryProjects } from "@/lib/projects";

export function SecondarySystems() {
  return (
    <div className="secondary-layout">
      <p className="eyebrow">Case studies & tools</p>
      <div className="secondary-list">
        {secondaryProjects.map((project, index) => {
          const content = (
            <>
              <span>{String(index + 1).padStart(2, "0")} / {project.category}</span>
              <strong>{project.title}</strong>
              <p>{project.summary}</p>
              <small aria-hidden="true">{project.external ? "↗" : "→"}</small>
            </>
          );
          return project.external ? (
            <a className="secondary-item" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
              {content}
            </a>
          ) : (
            <Link className="secondary-item" href={project.href} key={project.title}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
