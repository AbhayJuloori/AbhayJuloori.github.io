const pairs = [
  [70, 110, 132, 96], [160, 132, 214, 160], [86, 196, 140, 230], [196, 214, 252, 188],
  [72, 284, 128, 304], [170, 276, 226, 300], [100, 348, 156, 326], [204, 352, 258, 372],
  [250, 112, 300, 138], [262, 250, 312, 228],
];

export function FraudPreview() {
  return (
    <div className="project-preview preview-still fraud-preview">
      <div className="preview-topline">
        <span>PaySim / time-split cohort</span>
        <span>Promotion gate</span>
      </div>
      <svg viewBox="0 0 720 440" role="img" aria-labelledby="fraud-preview-title fraud-preview-description">
        <title id="fraud-preview-title">Graph features fail the promotion gate</title>
        <desc id="fraud-preview-description">
          A transaction graph made of isolated sender and receiver pairs sits beside a comparison where validation graph lift of −0.0020 falls far short of the 0.01 gate, so the transaction-only model remains champion.
        </desc>
        <g aria-hidden="true">
          <text x="60" y="86" className="fraud-preview__label">GRAPH · 99.85% OF SENDERS SEEN ONCE</text>
          {pairs.map(([x1, y1, x2, y2], index) => (
            <g key={index} className="fraud-preview__pair" style={{ animationDelay: `${index * 0.35}s` }}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="fraud-preview__edge" />
              <circle cx={x1} cy={y1} r="5" className="fraud-preview__node" />
              <circle cx={x2} cy={y2} r="5" className={index === 3 ? "fraud-preview__node fraud-preview__node--fraud" : "fraud-preview__node"} />
            </g>
          ))}

          <text x="380" y="86" className="fraud-preview__label">TEST PR-AUC</text>
          <text x="380" y="112" className="fraud-preview__label">TRANSACTION ONLY</text>
          <rect x="380" y="122" width="290" height="14" className="fraud-preview__bar" />
          <text x="670" y="112" className="fraud-preview__value" textAnchor="end">0.9785</text>
          <text x="380" y="166" className="fraud-preview__label">+ GRAPH FEATURES</text>
          <rect x="380" y="176" width="290" height="14" className="fraud-preview__bar fraud-preview__bar--graph" />
          <text x="670" y="166" className="fraud-preview__value" textAnchor="end">0.9789</text>

          <line x1="380" y1="226" x2="670" y2="226" className="fraud-preview__rule" />
          <text x="380" y="256" className="fraud-preview__label">VALIDATION LIFT NEEDED</text>
          <rect x="380" y="266" width="232" height="10" className="fraud-preview__gate" />
          <text x="670" y="276" className="fraud-preview__value" textAnchor="end">0.01</text>
          <text x="380" y="304" className="fraud-preview__label">GRAPH LIFT ON VALIDATION</text>
          <rect x="380" y="310" width="3" height="18" className="fraud-preview__lift" />
          <text x="670" y="324" className="fraud-preview__value" textAnchor="end">−0.0020</text>

          <rect x="380" y="346" width="290" height="40" className="fraud-preview__verdict" />
          <text x="396" y="371" className="fraud-preview__verdict-text">KEPT · TRANSACTION-ONLY XGBOOST</text>
        </g>
      </svg>
    </div>
  );
}
