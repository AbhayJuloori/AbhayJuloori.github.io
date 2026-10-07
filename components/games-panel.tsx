import { colonist } from "@/lib/games";

export function GamesPanel() {
  return (
    <div className="notes-layout">
      <p className="eyebrow">Off the clock</p>
      <article className="games-panel">
        <header>
          <span>{colonist.mode} · as of {colonist.asOf}</span>
          <a href={colonist.profileUrl} target="_blank" rel="noreferrer">
            {colonist.handle} <span aria-hidden="true">↗</span>
          </a>
        </header>
        <dl>
          {colonist.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p>{colonist.note}</p>
      </article>
    </div>
  );
}
