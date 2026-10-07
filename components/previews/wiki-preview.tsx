const tickHeights = [18, 42, 12, 26, 64, 20, 14, 34, 22, 88, 16, 30, 12, 48, 24, 18, 58, 14, 28, 20, 38, 12, 72, 22, 16, 44, 26, 14, 32, 18];
const flagged = new Set([4, 9, 16, 22]);
const tickGap = 12;
const loopWidth = tickHeights.length * tickGap;

const queue = [
  { page: "Edit war · 4 reverts", score: 85, alert: true },
  { page: "Logged-out · revert hint", score: 70, alert: false },
  { page: "Large change · 2.1 kB", score: 41, alert: false },
];

function Ticks({ offset }: { offset: number }) {
  return (
    <g transform={`translate(${offset} 0)`}>
      {tickHeights.map((height, index) => (
        <line
          key={index}
          className={flagged.has(index) ? "wiki-preview__tick wiki-preview__tick--flag" : "wiki-preview__tick"}
          x1={index * tickGap}
          x2={index * tickGap}
          y1={250}
          y2={250 - height * 1.6}
        />
      ))}
    </g>
  );
}

export function WikiPreview() {
  return (
    <div className="project-preview preview-still wiki-preview">
      <div className="preview-topline">
        <span>enwiki / recent changes</span>
        <span>Microbatch · 10 s</span>
      </div>
      <svg viewBox="0 0 720 440" role="img" aria-labelledby="wiki-preview-title wiki-preview-description">
        <title id="wiki-preview-title">Live edit seismograph and review queue</title>
        <desc id="wiki-preview-description">
          Wikipedia edits scroll past as ticks sized by review score; flagged edits turn red and the highest scores rise to a ranked review queue.
        </desc>
        <g aria-hidden="true">
          <text x="40" y="86" className="wiki-preview__label">THE WIRE · TICK HEIGHT = REVIEW SCORE</text>
          <line x1="40" y1="250" x2="430" y2="250" className="wiki-preview__axis" />
          <clipPath id="wiki-wire-clip">
            <rect x="40" y="90" width="390" height="170" />
          </clipPath>
          <g clipPath="url(#wiki-wire-clip)">
            <g className="wiki-preview__wire">
              <Ticks offset={40} />
              <Ticks offset={40 + loopWidth} />
              <Ticks offset={40 + loopWidth * 2} />
            </g>
          </g>
          <line x1="400" y1="96" x2="400" y2="258" className="wiki-preview__commit" />
          <text x="372" y="282" className="wiki-preview__label">COMMIT</text>
          <text x="40" y="306" className="wiki-preview__label">DUPLICATE</text>
          <line x1="120" y1="302" x2="430" y2="302" className="wiki-preview__lane" />
          <circle cx="262" cy="302" r="4" className="wiki-preview__dupe" />
          <text x="40" y="336" className="wiki-preview__label">LATE</text>
          <line x1="120" y1="332" x2="430" y2="332" className="wiki-preview__lane" />
          <circle cx="338" cy="332" r="4" className="wiki-preview__late" />

          <text x="466" y="86" className="wiki-preview__label">REVIEW QUEUE</text>
          {queue.map((row, index) => (
            <g key={row.page} className={`wiki-preview__row wiki-preview__row--${index + 1}`}>
              <rect x="466" y={92 + index * 74} width="214" height="60" className="wiki-preview__card" />
              <rect x="466" y={92 + index * 74} width="4" height="60" className={row.alert ? "wiki-preview__flag" : "wiki-preview__rail"} />
              <text x="482" y={114 + index * 74} className="wiki-preview__page">{row.page}</text>
              <rect x="482" y={128 + index * 74} width={row.score * 1.5} height="8" className={row.alert ? "wiki-preview__bar wiki-preview__bar--alert" : "wiki-preview__bar"} />
              <text x="652" y={136 + index * 74} className="wiki-preview__score" textAnchor="end">{row.score}</text>
            </g>
          ))}
          <text x="466" y="336" className="wiki-preview__label">KAFKA → SPARK → ICEBERG</text>
        </g>
      </svg>
    </div>
  );
}
