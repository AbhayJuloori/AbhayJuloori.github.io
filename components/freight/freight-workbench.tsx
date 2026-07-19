"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import type {
  FlagEvidence,
  FreightAlert,
  FreightEvidenceBundle,
  FreightLaneFile,
  LaneShipment,
  NetworkLane,
  SensitivityPoint,
} from "@/lib/freight/types";
import { freightReducer, type MobileStep } from "./freight-reducer";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });
const decisions = [
  "Escalate carrier",
  "Review contract / rate",
  "Monitor lane",
  "Dismiss as explainable",
  "Mark for data-quality review",
] as const;

function SignalMark({ signal }: { signal: string }) {
  const service = signal.toLowerCase().includes("service");
  return <span className="fw-status" aria-label={service ? "Service signal" : "Cost signal"}>{service ? "△" : "◇"}</span>;
}

function alertSummary(alert: FreightAlert) {
  const shipments = `${alert.affected_shipment_count} shipment${alert.affected_shipment_count === 1 ? "" : "s"}`;
  const weeks = `${alert.observed_week_count} observed week${alert.observed_week_count === 1 ? "" : "s"}`;
  const impact = alert.estimated_excess_cost > 0
    ? `${money.format(alert.estimated_excess_cost)} estimated excess`
    : `${alert.affected_service_shipment_count} service-affected shipment${alert.affected_service_shipment_count === 1 ? "" : "s"}`;
  return `${alert.primary_signal} across ${shipments} and ${weeks}; ${impact}.`;
}

function NetworkPulse({ lanes, selected }: { lanes: NetworkLane[]; selected: FreightAlert }) {
  const reducedMotion = useReducedMotionSafe();
  const selectedLanes = lanes.filter((lane) => lane.lane_id === selected.lane_id && (selected.mode === "ALL" || lane.mode === selected.mode));
  const shown = Array.from(new Map([...selectedLanes, ...lanes].map((lane) => [`${lane.lane_id}-${lane.mode}`, lane])).values()).slice(0, 18);
  const states = Array.from(new Set(shown.flatMap((lane) => lane.lane_id.split("-"))));
  const positions = new Map(states.map((state, index) => {
    const angle = (index / states.length) * Math.PI * 2 - Math.PI / 2;
    return [state, { x: 300 + Math.cos(angle) * 218, y: 185 + Math.sin(angle) * 132 }] as const;
  }));
  return (
    <section className="fw-panel fw-network" aria-labelledby="network-title">
      <div className="fw-panel__head">
        <div><p className="fw-kicker">01 / Network pulse</p><h2 id="network-title">Where exceptions concentrate</h2></div>
        <span className="fw-live"><i /> validated snapshot</span>
      </div>
      <svg viewBox="0 0 600 370" role="img" aria-labelledby="network-svg-title network-svg-desc">
        <title id="network-svg-title">Schematic freight network</title>
        <desc id="network-svg-desc">The eighteen exported lane-mode rows with the highest flagged shipment counts. The selected lane is emphasized.</desc>
        {shown.map((lane, index) => {
          const [origin, destination] = lane.lane_id.split("-");
          const start = positions.get(origin)!;
          const end = positions.get(destination)!;
          const active = lane.lane_id === selected.lane_id && (selected.mode === "ALL" || lane.mode === selected.mode);
          return <line key={`${lane.lane_id}-${lane.mode}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} className={active ? "fw-route is-active" : "fw-route"} style={{ "--route-delay": `${index * -0.16}s` } as React.CSSProperties} data-motion={reducedMotion ? "off" : "on"} />;
        })}
        {states.map((state) => {
          const point = positions.get(state)!;
          return <g key={state} transform={`translate(${point.x} ${point.y})`}><circle r="15" /><text y="4" textAnchor="middle">{state}</text></g>;
        })}
      </svg>
      <div className="fw-network__summary" aria-label="Selected network route">
        <strong>{selected.lane_id}</strong><span>{selected.mode} · {selected.carrier_scope}</span><span>{selected.primary_signal}</span>
      </div>
    </section>
  );
}

function ExceptionQueue({ alerts, selectedId, filter, decisionsByAlert, onFilter, onSelect }: {
  alerts: FreightAlert[];
  selectedId: string;
  filter: "all" | "cost" | "service";
  decisionsByAlert: Set<string>;
  onFilter: (filter: "all" | "cost" | "service") => void;
  onSelect: (id: string) => void;
}) {
  const filtered = alerts.filter((alert) => filter === "all" || alert.primary_signal.toLowerCase().includes(filter));
  return (
    <section className="fw-panel fw-queue" aria-labelledby="queue-title">
      <div className="fw-panel__head"><div><p className="fw-kicker">02 / Ranked queue</p><h2 id="queue-title">Operational exceptions</h2></div><span>{filtered.length} shown</span></div>
      <div className="fw-segmented" aria-label="Filter exception queue">
        {(["all", "cost", "service"] as const).map((value) => <button key={value} aria-pressed={filter === value} onClick={() => onFilter(value)}>{value}</button>)}
      </div>
      <ol className="fw-queue__list">
        {filtered.map((alert, index) => <li key={alert.alert_id}>
          <button className={alert.alert_id === selectedId ? "fw-alert is-selected" : "fw-alert"} onClick={() => onSelect(alert.alert_id)} aria-current={alert.alert_id === selectedId ? "true" : undefined}>
            <span className="fw-alert__rank">{String(index + 1).padStart(2, "0")}</span>
            <span className="fw-alert__body"><strong><SignalMark signal={alert.primary_signal} /> {alert.lane_id} · {alert.mode}</strong><small>{alert.carrier_scope} · {alert.observed_week_count} observed weeks</small><span>{alertSummary(alert)}</span></span>
            <span className="fw-alert__score"><b>{alert.priority_score.toFixed(1)}</b><small>priority</small>{decisionsByAlert.has(alert.alert_id) ? <em>decided</em> : null}</span>
          </button>
        </li>)}
      </ol>
      {!filtered.length ? <div className="fw-empty">No exported alerts match this filter. <button onClick={() => onFilter("all")}>Reset filter</button></div> : null}
    </section>
  );
}

function ObservedHistory({ shipments }: { shipments: LaneShipment[] }) {
  const ordered = [...shipments].sort((a, b) => a.ship_date.localeCompare(b.ship_date)).slice(-32);
  const values = ordered.map((row) => row.total_cost);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = ordered.map((row, index) => {
    const x = ordered.length === 1 ? 12 : 12 + (index / (ordered.length - 1)) * 456;
    const y = 126 - ((row.total_cost - min) / Math.max(max - min, 1)) * 104;
    return `${x},${y}`;
  }).join(" ");
  return <div className="fw-chart"><div className="fw-chart__label"><strong>Observed shipment totals</strong><span>last {ordered.length} exported rows</span></div><svg viewBox="0 0 480 145" role="img" aria-label={`Observed total cost history from ${money.format(min)} to ${money.format(max)}. No expected-cost series was exported.`}><polyline points={points} /><line x1="12" y1="126" x2="468" y2="126" /></svg><p>Observed only. The public lane file does not export a counterfactual cost series.</p></div>;
}

function MethodEvidence({ evidence }: { evidence: FlagEvidence[] }) {
  const unique = Array.from(new Map(evidence.map((row) => [row.evidence_unit_id, row])).values()).slice(0, 6);
  return <div className="fw-methods"><h3>Other flagged evidence in this representative lane</h3>{unique.map((row) => <article key={row.evidence_unit_id}><span>{row.method.replaceAll("_", " ")}</span><strong>{row.score.toFixed(2)} <i>/ {row.threshold.toFixed(2)}</i></strong><p>{row.reason}</p></article>)}</div>;
}

function Investigation({ alert, lane }: { alert: FreightAlert; lane?: FreightLaneFile }) {
  const components = [
    ["Exposure", alert.exposure_component], ["Persistence", alert.persistence_component],
    ["Service", alert.service_impact_component], ["Agreement", alert.method_agreement_component],
    ["Data quality", alert.data_quality_component], ["Support", alert.support_component],
  ] as const;
  if (!lane) return <section id="freight-investigation" tabIndex={-1} className="fw-panel fw-investigation"><p className="fw-kicker">03 / Investigation</p><h2>Representative detail unavailable</h2><p>The ranked queue remains usable, but this alert has no lane file in the bounded public bundle.</p></section>;
  const shipments = [...lane.shipments].sort((a, b) => Number(b.flagged) - Number(a.flagged)).slice(0, 8);
  return <section id="freight-investigation" tabIndex={-1} className="fw-panel fw-investigation" aria-labelledby="investigation-title">
    <div className="fw-investigation__lead"><p className="fw-kicker">03 / Representative investigation</p><h2 id="investigation-title">{alert.lane_id} <span>{alert.mode}</span></h2><p>{alertSummary(alert)}</p></div>
    <div className="fw-facts"><article><span>Observed</span><strong>{alert.affected_shipment_count}</strong><p>distinct affected shipments</p></article><article><span>Inferred</span><strong>{money.format(alert.estimated_excess_cost)}</strong><p>estimated excess exposure</p></article><article><span>Uncertainty</span><strong>{percent.format(alert.confidence_score)}</strong><p>evidence confidence</p></article></div>
    <div className="fw-components" aria-label="Priority score components">{components.map(([label, value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value * 100}%` }} /></i><strong>{value.toFixed(2)}</strong></div>)}</div>
    <ObservedHistory shipments={lane.shipments} />
    <MethodEvidence evidence={lane.flag_evidence} />
    <div className="fw-table-wrap"><table><caption>Shipment evidence · representative export</caption><thead><tr><th>Shipment</th><th>Date</th><th>Mode</th><th>Carrier</th><th>Total</th><th>Service</th></tr></thead><tbody>{shipments.map((row) => <tr key={row.shipment_id}><td>{row.shipment_id}</td><td>{row.ship_date.slice(0, 10)}</td><td>{row.mode}</td><td>{row.carrier_id}</td><td>{money.format(row.total_cost)}</td><td>{row.on_time_flag ? "On time" : `${row.transit_days} days · late`}</td></tr>)}</tbody></table></div>
  </section>;
}

function SensitivityLab({ points, selectedId, onSelect }: { points: SensitivityPoint[]; selectedId: string; onSelect: (id: string) => void }) {
  const selected = points.find((point) => point.config_id === selectedId) ?? points[0];
  return <section className="fw-panel fw-sensitivity" aria-labelledby="sensitivity-title"><p className="fw-kicker">04 / Sensitivity lab</p><h2 id="sensitivity-title">Three exported operating points</h2><div className="fw-sensitivity__choices">{points.map((point, index) => <button key={point.config_id} aria-pressed={selected.config_id === point.config_id} onClick={() => onSelect(point.config_id)}><span>{index === 0 ? "Selected" : index === 1 ? "More sensitive" : "Balanced"}</span><strong>R {point.robust_threshold} · IQR {point.iqr_multiplier}</strong></button>)}</div><div className="fw-sensitivity__result" aria-live="polite"><article><span>Recall</span><strong>{percent.format(selected.evaluation_recall)}</strong></article><article><span>False-positive rate</span><strong>{percent.format(selected.evaluation_false_positive_rate)}</strong></article><article><span>Review load</span><strong>{selected.evaluation_review_volume.toLocaleString()}</strong></article><p>Exact result for {selected.config_id}. No interpolation.</p></div></section>;
}

function DecisionDesk({ alert, trail, onRecord }: { alert: FreightAlert; trail: Array<{ alertId: string; action: string; rationale: string; sequence: number }>; onRecord: (action: string, rationale: string) => void }) {
  const [action, setAction] = useState<(typeof decisions)[number]>(decisions[0]);
  const [rationale, setRationale] = useState("");
  return <section className="fw-panel fw-decision" aria-labelledby="decision-title"><p className="fw-kicker">05 / Human decision</p><h2 id="decision-title">Record a temporary disposition</h2><label>Action<select value={action} onChange={(event) => setAction(event.target.value as typeof action)}>{decisions.map((value) => <option key={value}>{value}</option>)}</select></label><label>Rationale<textarea value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder="What makes this action proportionate?" /></label><button className="fw-primary" onClick={() => { onRecord(action, rationale.trim()); setRationale(""); }}>Add to session trail</button><p className="fw-note">Session only. Reloading resets decisions.</p><div className="fw-trail" aria-live="polite"><h3>Investigation trail</h3>{trail.length ? <ol>{trail.map((entry) => <li key={`${entry.alertId}-${entry.sequence}`}><span>{entry.sequence}</span><div><strong>{entry.action}</strong><small>{entry.alertId === alert.alert_id ? "Current alert" : entry.alertId}</small>{entry.rationale ? <p>{entry.rationale}</p> : null}</div></li>)}</ol> : <p>No decisions recorded in this session.</p>}</div></section>;
}

function EvidenceDrawer({ bundle, onClose, opener }: { bundle: FreightEvidenceBundle; onClose: () => void; opener: React.RefObject<HTMLButtonElement | null> }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const openerElement = opener.current;
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => openerElement?.focus();
  }, [opener]);
  function trap(event: React.KeyboardEvent) {
    if (event.key === "Escape") onClose();
    if (event.key !== "Tab" || !panel.current) return;
    const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>("button, a[href]"));
    if (!focusable.length) return;
    const first = focusable[0]; const last = focusable.at(-1)!;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  return <div className="fw-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div ref={panel} className="fw-drawer" role="dialog" aria-modal="true" aria-labelledby="evidence-title" onKeyDown={trap}><button className="fw-drawer__close" onClick={onClose}>Close evidence <span aria-hidden="true">×</span></button><p className="fw-kicker">Evidence mode</p><h2 id="evidence-title">One run. Inspectable lineage.</h2><dl><div><dt>Run</dt><dd>{bundle.manifest.run_id}</dd></div><div><dt>Schema</dt><dd>{bundle.manifest.schema_version}</dd></div><div><dt>Source manifest</dt><dd>{bundle.manifest.source_manifest_sha256}</dd></div><div><dt>Split windows</dt><dd>Baseline 2023 · calibration Jan–Mar 2024 · evaluation Apr–Jun 2024</dd></div></dl><h3>Held-out evaluation</h3><ul><li>Precision {percent.format(bundle.evaluation.overall.precision)}</li><li>Recall {percent.format(bundle.evaluation.overall.recall)}</li><li>F1 {bundle.evaluation.overall.f1.toFixed(3)}</li><li>False-positive rate {percent.format(bundle.evaluation.overall.false_positive_rate)}</li><li>Review volume {bundle.evaluation.overall.review_volume.toLocaleString()} shipments</li></ul><h3>Artifact hashes</h3><ul className="fw-hashes">{Object.entries(bundle.manifest.artifact_hashes).map(([file, hash]) => <li key={file}><span>{file}</span><code>{hash}</code></li>)}</ul><h3>Methods & limitations</h3><p>Robust residual, IQR, trailing lane-week, service deterioration, and explicit data-quality rules use strictly prior support where required. Public lane files are representative and bounded; they do not contain raw FAF5 data, hidden truth labels, or a complete expected-cost series.</p><p>Snowflake warehousing and Power BI reporting belong to the project&apos;s first architecture. This portfolio runtime uses static, validated evidence and has no database dependency.</p></div></div>;
}

export function FreightWorkbench({ bundle }: { bundle: FreightEvidenceBundle }) {
  const defaultPoint = bundle.evaluation.sensitivity_grid.find((point) => point.selected) ?? bundle.evaluation.sensitivity_grid[0];
  const [state, dispatch] = useReducer(freightReducer, { selectedAlertId: bundle.alerts.alerts[0].alert_id, sensitivityConfigId: defaultPoint.config_id, signalFilter: "all", decisions: [], evidenceOpen: false, mobileStep: "pulse" });
  const evidenceButton = useRef<HTMLButtonElement>(null);
  const selected = bundle.alerts.alerts.find((alert) => alert.alert_id === state.selectedAlertId) ?? bundle.alerts.alerts[0];
  const lane = useMemo(() => {
    const representative = bundle.manifest.representative_lanes.find(
      (entry) => entry.alert_id === selected.alert_id,
    );
    return representative ? bundle.lanes[representative.path] : undefined;
  }, [bundle.lanes, bundle.manifest.representative_lanes, selected.alert_id]);
  const decisionIds = new Set(state.decisions.map((entry) => entry.alertId));
  const steps: MobileStep[] = ["pulse", "queue", "investigation", "decision", "evidence"];
  function selectAlert(id: string) { dispatch({ type: "select_alert", alertId: id }); requestAnimationFrame(() => document.getElementById("freight-investigation")?.focus()); }
  return <div className="freight-workbench">
    <header className="fw-header"><div><p className="fw-kicker">Freight KPI Tracker / operational instrument</p><h1>Review the network before the summary report does.</h1></div><div className="fw-header__actions"><span><i /> run validated · schema {bundle.manifest.schema_version}</span><button ref={evidenceButton} onClick={() => dispatch({ type: "toggle_evidence", open: true })}>Evidence / lineage</button></div></header>
    <div className="fw-command"><button className="fw-primary" onClick={() => selectAlert(bundle.alerts.alerts[0].alert_id)}>Review highest-priority exception <span aria-hidden="true">→</span></button><span>{bundle.alerts.row_count} ranked alerts · {bundle.network.row_count.toLocaleString()} lane-mode rows</span></div>
    <nav className="fw-mobile-steps" aria-label="Workbench steps">{steps.map((step) => <button key={step} aria-current={state.mobileStep === step ? "step" : undefined} onClick={() => step === "evidence" ? dispatch({ type: "toggle_evidence", open: true }) : dispatch({ type: "set_mobile_step", step })}>{step}</button>)}</nav>
    <div className="fw-grid" data-mobile-step={state.mobileStep}>
      <NetworkPulse lanes={bundle.network.lanes} selected={selected} />
      <ExceptionQueue alerts={bundle.alerts.alerts} selectedId={selected.alert_id} filter={state.signalFilter} decisionsByAlert={decisionIds} onFilter={(filter) => dispatch({ type: "set_filter", filter })} onSelect={selectAlert} />
      <Investigation alert={selected} lane={lane} />
      <SensitivityLab points={bundle.evaluation.sensitivity_grid} selectedId={state.sensitivityConfigId} onSelect={(configId) => dispatch({ type: "select_sensitivity", configId })} />
      <DecisionDesk alert={selected} trail={state.decisions} onRecord={(action, rationale) => dispatch({ type: "record_decision", alertId: selected.alert_id, action, rationale })} />
    </div>
    {state.evidenceOpen ? <EvidenceDrawer bundle={bundle} opener={evidenceButton} onClose={() => dispatch({ type: "toggle_evidence", open: false })} /> : null}
  </div>;
}
