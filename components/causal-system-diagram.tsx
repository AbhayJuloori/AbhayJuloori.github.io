export function CausalSystemDiagram() {
  return (
    <figure className="causal-diagram">
      <div className="causal-diagram__header">
        <span>SYSTEM MAP / CAUSAL TARGETING</span>
        <span>COUNTERFACTUAL ESTIMATION</span>
      </div>
      <svg viewBox="0 0 920 430" role="img" aria-labelledby="causal-title causal-desc">
        <title id="causal-title">CareTarget causal treatment-effect system</title>
        <desc id="causal-desc">Patient context branches into treated and untreated outcome models. Their difference estimates uplift, which is checked for survival and fairness before targeting.</desc>
        <g className="causal-grid">
          <path d="M0 85H920M0 170H920M0 255H920M0 340H920M115 0V430M230 0V430M345 0V430M460 0V430M575 0V430M690 0V430M805 0V430" />
        </g>
        <g className="causal-node causal-node--input" transform="translate(34 155)">
          <path d="M0 14L14 0H180V120H0Z" />
          <text className="node-label" x="20" y="36">PATIENT CONTEXT</text>
          <text x="20" y="66">history · conditions</text>
          <text x="20" y="86">care pathway · constraints</text>
        </g>
        <g className="causal-paths">
          <path d="M214 195C270 195 274 102 338 102" />
          <path d="M214 235C270 235 274 310 338 310" />
          <path d="M535 102C605 102 595 190 650 190" />
          <path d="M535 310C605 310 595 230 650 230" />
          <path d="M782 210H840" />
        </g>
        <g className="causal-node causal-node--treatment" transform="translate(338 45)">
          <rect width="197" height="114" />
          <text className="node-label" x="18" y="34">TREATMENT MODEL</text>
          <text x="18" y="64">E[Y | X, T = 1]</text>
          <text className="node-meta" x="18" y="90">INTERVENTION OUTCOME</text>
        </g>
        <g className="causal-node causal-node--control" transform="translate(338 253)">
          <rect width="197" height="114" />
          <text className="node-label" x="18" y="34">CONTROL MODEL</text>
          <text x="18" y="64">E[Y | X, T = 0]</text>
          <text className="node-meta" x="18" y="90">EXPECTED BASELINE</text>
        </g>
        <g className="causal-node causal-node--uplift" transform="translate(650 150)">
          <path d="M0 0H112L132 20V120H0Z" />
          <text className="node-label" x="18" y="34">UPLIFT</text>
          <text className="node-big" x="18" y="74">τ(X)</text>
          <text className="node-meta" x="18" y="101">DIFFERENCE</text>
        </g>
        <g className="causal-node causal-node--target" transform="translate(840 178)">
          <rect width="54" height="64" />
          <text className="node-label" transform="translate(20 50) rotate(-90)">TARGET</text>
        </g>
        <g className="causal-checks">
          <text x="650" y="318">SURVIVAL CHECK</text><circle cx="762" cy="314" r="5" />
          <text x="650" y="348">FAIRNESS AUDIT</text><circle cx="762" cy="344" r="5" />
        </g>
      </svg>
      <figcaption><span>FIG. 02</span> Two outcome models estimate the missing counterfactual. Their difference changes the ranking from “highest risk” to “highest expected benefit.”</figcaption>
    </figure>
  );
}
