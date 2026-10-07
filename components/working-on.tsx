import { currentBuild } from "@/lib/working-on";

export function WorkingOn() {
  return (
    <div className="notes-layout">
      <p className="eyebrow">Current build</p>
      <article className="build-log">
        <header className="build-log__header">
          <span className="build-log__status"><i aria-hidden="true" />{currentBuild.status}</span>
          <h3>{currentBuild.title}</h3>
          <p>{currentBuild.premise}</p>
        </header>

        <div className="build-log__headline">
          <strong>{currentBuild.headline.value}</strong>
          <div>
            <p>{currentBuild.headline.label}</p>
            <small>{currentBuild.headline.note}</small>
          </div>
        </div>

        <div className="build-log__columns">
          <section aria-labelledby="build-built">
            <h4 id="build-built">Built so far</h4>
            <ul>{currentBuild.built.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-labelledby="build-stuck">
            <h4 id="build-stuck">Where it is stuck</h4>
            <ul>{currentBuild.stuck.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <footer className="build-log__footer">
          <p><span>Next</span>{currentBuild.next}</p>
          <small>{currentBuild.stats}</small>
        </footer>
      </article>
    </div>
  );
}
