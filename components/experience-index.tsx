import { experience } from "@/lib/experience";

export function ExperienceIndex() {
  return (
    <div className="experience-index">
      <p className="eyebrow experience-index__label">Experience index</p>
      <div className="experience-list">
        {experience.map((entry, index) => (
          <article className="experience-entry" key={entry.company}>
            <span className="experience-entry__index">0{index + 1}</span>
            <h3>{entry.company}</h3>
            <div className="experience-entry__meta">
              {entry.role ? <p className="experience-entry__role">{entry.role}</p> : null}
              {entry.dates ? <p className="experience-entry__date">{entry.dates}</p> : null}
            </div>
            {entry.summary ? <p className="experience-entry__summary">{entry.summary}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
