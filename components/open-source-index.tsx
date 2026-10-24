import Link from "next/link";
import { contributions, maintained, statusLabels, type Contribution } from "@/lib/open-source";

const groups: { id: string; label: string; items: Contribution[] }[] = [
  { id: "merged", label: "Merged", items: contributions.filter((item) => item.status === "merged") },
  { id: "in-review", label: "In review", items: contributions.filter((item) => item.status === "in-review") },
  { id: "issues", label: "Issues reported", items: contributions.filter((item) => item.kind === "Issue") },
];

const libraries = new Set(contributions.map((item) => item.repo)).size;

export function OpenSourceStats() {
  const stats = [
    [groups[0].items.length, "Pull requests merged"],
    [groups[1].items.length, "In review"],
    [groups[2].items.length, "Issues reported"],
    [libraries, "Libraries"],
  ] as const;

  return (
    <dl className="oss-stats">
      {stats.map(([value, label]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ContributionList() {
  return (
    <div className="oss-groups">
      {groups.map((group) => (
        <div className="oss-group" key={group.id}>
          <p className="eyebrow">{group.label} <span>{String(group.items.length).padStart(2, "0")}</span></p>
          <ul className="oss-list">
            {group.items.map((item) => (
              <li key={`${item.repo}-${item.number}`}>
                <a className="oss-item" href={item.url} target="_blank" rel="noreferrer">
                  <span className="oss-item__ref">{item.repo} #{item.number}</span>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                  <span className={`oss-status oss-status--${item.status}`}>{statusLabels[item.status]}</span>
                  <small aria-hidden="true">↗</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function MaintainedProject() {
  return (
    <div className="oss-maintained">
      <div className="oss-maintained__copy">
        <p className="eyebrow">{maintained.repo}</p>
        <h3>{maintained.title}</h3>
        <p>{maintained.summary}</p>
        <div className="oss-maintained__actions">
          <a className="text-action" href={maintained.url} target="_blank" rel="noreferrer">Open the repository <span aria-hidden="true">↗</span></a>
          <Link className="text-action text-action--quiet" href="/contact/">Ask about a problem <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <ol className="oss-problems">
        {maintained.problems.map((problem) => (
          <li key={problem.number}>
            <a href={problem.url} target="_blank" rel="noreferrer">
              <span>Open problem {problem.number}</span>
              <strong>{problem.title}</strong>
              <small aria-hidden="true">↗</small>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
