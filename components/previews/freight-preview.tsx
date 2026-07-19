export function FreightPreview({ active }: { active: boolean }) {
  return (
    <div className="project-preview freight-preview" data-paused={!active}>
      <div className="preview-topline">
        <span>Freight network / operating view</span>
        <span>Lane monitor</span>
      </div>
      <svg
        className="freight-preview__map"
        viewBox="0 0 720 440"
        role="img"
        aria-labelledby="freight-preview-title freight-preview-description"
      >
        <title id="freight-preview-title">Freight lane anomaly monitor</title>
        <desc id="freight-preview-description">
          Shipments move through a route network. One lane drifts, turns amber, and is isolated in the KPI readout.
        </desc>
        <g className="freight-preview__grid" aria-hidden="true">
          <path d="M0 88H720M0 176H720M0 264H720M0 352H720M90 0V440M180 0V440M270 0V440M360 0V440M450 0V440M540 0V440M630 0V440" />
        </g>
        <path
          className="freight-preview__land"
          d="M72 110L154 73L242 91L302 65L389 86L438 69L506 104L637 74L680 134L640 196L665 259L590 334L479 322L414 365L322 322L238 346L163 292L91 278L52 210Z"
        />
        <path className="freight-preview__route freight-preview__route--active" d="M120 260C220 195 286 212 370 144C450 80 530 120 620 95" />
        <path className="freight-preview__route" d="M182 120C260 160 330 165 416 230C480 278 548 260 650 300" />
        <path className="freight-preview__route freight-preview__route--alert" d="M120 260C230 280 310 306 416 230" />
        <path className="freight-preview__route" d="M182 120C160 180 150 215 120 260" />
        <circle className="freight-preview__node" cx="120" cy="260" r="7" />
        <circle className="freight-preview__node" cx="182" cy="120" r="7" />
        <circle className="freight-preview__node" cx="370" cy="144" r="7" />
        <circle className="freight-preview__node freight-preview__node--alert" cx="416" cy="230" r="8" />
        <circle className="freight-preview__node" cx="620" cy="95" r="7" />
        <circle className="freight-preview__node" cx="650" cy="300" r="7" />
        <circle className="freight-preview__shipment freight-preview__shipment--one" r="5" />
        <circle className="freight-preview__shipment freight-preview__shipment--two" r="4" />
        <circle className="freight-preview__shipment freight-preview__shipment--three" r="5" />
        <text className="freight-preview__label" x="102" y="285">WEST HUB</text>
        <text className="freight-preview__label" x="388" y="216">CENTRAL / 04</text>
        <text className="freight-preview__label" x="590" y="80">NORTHEAST</text>
      </svg>
      <div className="freight-preview__kpis" aria-hidden="true">
        <div className="freight-preview__kpi"><span>On-time</span><strong>94.1%</strong></div>
        <div className="freight-preview__kpi freight-preview__kpi--alert"><span>Lane 04</span><strong>+2.8σ</strong></div>
        <div className="freight-preview__kpi"><span>In transit</span><strong>1,284</strong></div>
      </div>
    </div>
  );
}
