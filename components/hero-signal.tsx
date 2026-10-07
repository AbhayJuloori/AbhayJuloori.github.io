export function HeroSignal() {
  return (
    <figure className="hero-signal" aria-labelledby="hero-signal-caption">
      <div className="hero-signal__head">
        <span>Four systems / one practice</span>
        <span>Live evidence</span>
      </div>
      <div className="hero-signal__stage" aria-hidden="true">
        <svg viewBox="0 0 520 440" preserveAspectRatio="xMidYMid meet">
          <g className="hero-signal__grid">
            <path d="M0 88H520M0 176H520M0 264H520M0 352H520M104 0V440M208 0V440M312 0V440M416 0V440" />
          </g>
          <path className="hero-signal__route" d="M52 104C126 60 180 122 238 88S352 72 410 118" />
          <path className="hero-signal__forecast" d="M70 224C118 238 152 190 194 212S274 250 312 204S390 178 452 196" />
          <path className="hero-signal__survival" d="M72 306H136V320H212V342H288V364H372V390H452" />
          <path className="hero-signal__split" d="M292 92C312 92 318 116 340 116M292 92C312 92 318 68 340 68" />
          <circle className="hero-signal__node" cx="52" cy="104" r="6" />
          <circle className="hero-signal__node" cx="238" cy="88" r="6" />
          <circle className="hero-signal__node" cx="410" cy="118" r="6" />
          <text x="52" y="84">STREAM</text>
          <text x="70" y="198">OPERATIONS</text>
          <text x="72" y="290">SIMULATION</text>
          <text x="350" y="72">GRAPH</text>
          <text x="350" y="120">BASELINE</text>
        </svg>
      </div>
      <figcaption className="hero-signal__caption" id="hero-signal-caption">
        Stream · operations · simulation · graph
      </figcaption>
    </figure>
  );
}
