"use client";

import { useState, type MouseEvent } from "react";

const states = {
  act: {
    label: "ACT",
    score: "0.91",
    copy: "Evidence is strong enough to move the workflow forward.",
  },
  review: {
    label: "REVIEW",
    score: "0.63",
    copy: "The useful answer is a human second look—not forced certainty.",
  },
  defer: {
    label: "DEFER",
    score: "0.28",
    copy: "The system knows when the available signal is not enough.",
  },
} as const;

type EngineState = keyof typeof states;

export function DecisionEngine() {
  const [active, setActive] = useState<EngineState>("review");

  function handlePointer(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--engine-x", `${x * 7}px`);
    event.currentTarget.style.setProperty("--engine-y", `${y * 5}px`);
  }

  return (
    <div className="engine-shell" data-active={active} onMouseMove={handlePointer} onMouseLeave={(event) => {
      event.currentTarget.style.setProperty("--engine-x", "0px");
      event.currentTarget.style.setProperty("--engine-y", "0px");
    }}>
      <div className="engine-topline">
        <span>CONFIDENCE GATE / 04</span>
        <span className="engine-live"><i /> SYSTEM ONLINE</span>
      </div>

      <svg className="engine-map" viewBox="0 0 720 440" role="img" aria-labelledby="engine-title engine-desc">
        <title id="engine-title">Confidence-gated machine learning decision engine</title>
        <desc id="engine-desc">Observations enter a model and are routed to act, review, or defer based on confidence.</desc>
        <defs>
          <pattern id="engine-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.55" />
          </pattern>
          <filter id="soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect className="engine-grid" width="720" height="440" fill="url(#engine-grid)" />

        <g className="engine-inputs">
          <text x="34" y="63">OBSERVATIONS</text>
          <g transform="translate(35 104)"><circle r="5" /><text x="16" y="5">behavior</text></g>
          <g transform="translate(35 169)"><circle r="5" /><text x="16" y="5">context</text></g>
          <g transform="translate(35 234)"><circle r="5" /><text x="16" y="5">history</text></g>
          <g transform="translate(35 299)"><circle r="5" /><text x="16" y="5">constraints</text></g>
        </g>

        <g className="engine-paths engine-paths--input">
          <path d="M 130 104 C 210 104, 205 172, 270 190" />
          <path d="M 130 169 C 212 169, 215 196, 270 205" />
          <path d="M 130 234 C 212 234, 215 218, 270 218" />
          <path d="M 130 299 C 205 299, 210 248, 270 232" />
        </g>

        <g className="engine-model" transform="translate(270 143)">
          <path d="M 0 20 L 20 0 H 178 V 150 L 158 170 H 0 Z" />
          <text className="engine-model__kicker" x="24" y="40">MODEL / EVALUATE</text>
          <text className="engine-model__name" x="24" y="82">DECISION</text>
          <text className="engine-model__name" x="24" y="110">SYSTEM</text>
          <line x1="24" y1="132" x2="153" y2="132" />
          <text className="engine-model__meta" x="24" y="151">CALIBRATED · CONSTRAINED</text>
        </g>

        <g className="engine-paths engine-paths--output">
          <path className="path-act" d="M 448 188 C 512 188, 512 102, 578 102" />
          <path className="path-review" d="M 448 218 C 520 218, 515 218, 578 218" />
          <path className="path-defer" d="M 448 248 C 512 248, 512 334, 578 334" />
        </g>

        <g className="engine-outputs">
          <g className="output-act" transform="translate(578 77)"><rect width="108" height="50" /><text x="17" y="30">ACT</text><circle cx="91" cy="25" r="4" /></g>
          <g className="output-review" transform="translate(578 193)"><rect width="108" height="50" /><text x="17" y="30">REVIEW</text><circle cx="91" cy="25" r="4" /></g>
          <g className="output-defer" transform="translate(578 309)"><rect width="108" height="50" /><text x="17" y="30">DEFER</text><circle cx="91" cy="25" r="4" /></g>
        </g>

        <circle className="signal-dot signal-dot--one" r="4" filter="url(#soft-glow)" />
        <circle className="signal-dot signal-dot--two" r="4" filter="url(#soft-glow)" />
      </svg>

      <div className="engine-controls" aria-label="Inspect decision states">
        {(Object.keys(states) as EngineState[]).map((state) => (
          <button key={state} className={`engine-control engine-control--${state}`} type="button" aria-pressed={active === state} onClick={() => setActive(state)}>
            <span>{states[state].label}</span>
            <strong>{states[state].score}</strong>
          </button>
        ))}
      </div>

      <p className="engine-readout" aria-live="polite">
        <span>{states[active].label} /</span> {states[active].copy}
      </p>
    </div>
  );
}
