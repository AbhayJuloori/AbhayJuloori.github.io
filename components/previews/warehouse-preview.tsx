const zones = Array.from({ length: 12 }, (_, index) => ({
  x: 64 + (index % 4) * 104,
  y: 92 + Math.floor(index / 4) * 84,
  label: String.fromCharCode(65 + index),
}));

export function WarehousePreview() {
  return (
    <div className="project-preview preview-still warehouse-preview">
      <div className="preview-topline">
        <span>Fulfillment shift / 12-zone floor</span>
        <span>Wave → pick → pack → ship</span>
      </div>
      <svg viewBox="0 0 720 440" role="img" aria-labelledby="warehouse-preview-title warehouse-preview-description">
        <title id="warehouse-preview-title">Simulated fulfillment floor</title>
        <desc id="warehouse-preview-description">
          Pickers move through a twelve-zone floor in batched routes toward packing; the readout compares the current crew with the recommended plan.
        </desc>
        <g aria-hidden="true">
          {zones.map((zone) => (
            <g key={zone.label}>
              <rect x={zone.x} y={zone.y} width="84" height="60" className="warehouse-preview__zone" />
              <text x={zone.x + 8} y={zone.y + 16} className="warehouse-preview__label">{zone.label}</text>
            </g>
          ))}
          <rect x="500" y="92" width="64" height="228" className="warehouse-preview__pack" />
          <text x="512" y="112" className="warehouse-preview__label warehouse-preview__label--light">PACK</text>
          <rect x="590" y="92" width="64" height="228" className="warehouse-preview__ship" />
          <text x="602" y="112" className="warehouse-preview__label">SHIP</text>

          <path id="warehouse-route-a" className="warehouse-preview__route" d="M48 82H468V156H48V240H500" />
          <path id="warehouse-route-b" className="warehouse-preview__route" d="M48 330V156H260V82H468V240H500" />
          <circle className="warehouse-preview__picker warehouse-preview__picker--a" r="7" />
          <circle className="warehouse-preview__picker warehouse-preview__picker--b" r="7" />
          <circle className="warehouse-preview__picker warehouse-preview__picker--c" r="7" />
          <rect className="warehouse-preview__order warehouse-preview__order--one" x="606" y="140" width="32" height="20" />
          <rect className="warehouse-preview__order warehouse-preview__order--two" x="606" y="172" width="32" height="20" />
          <rect className="warehouse-preview__order warehouse-preview__order--three" x="606" y="204" width="32" height="20" />
        </g>
      </svg>
      <div className="warehouse-preview__kpis" aria-hidden="true">
        <div><span>Crew</span><strong>8 + 4 → 6 + 3</strong></div>
        <div><span>p95 cycle</span><strong>91 / 120 min</strong></div>
        <div className="warehouse-preview__kpi--win"><span>Labor</span><strong>−22%</strong></div>
      </div>
    </div>
  );
}
