import type { FreightEvidenceBundle } from "./types";

const FREIGHT_SCHEMA_VERSION = "2.0.0";

const severities = new Set(["low", "medium", "high", "critical"]);
const methods = new Set([
  "robust_residual",
  "iqr",
  "lane_week_deviation",
  "service_deterioration",
  "service_sla_breach",
  "data_quality",
]);

function fail(file: string, message: string): never {
  throw new Error(`[freight evidence: ${file}] ${message}`);
}

function object(value: unknown, file: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(file, "expected object");
  return value as Record<string, unknown>;
}

function string(value: unknown, file: string, field: string): string {
  if (typeof value !== "string" || !value.trim()) fail(file, `${field} must be a string`);
  return value;
}

function finite(value: unknown, file: string, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) fail(file, `${field} must be finite`);
  return value;
}

function unit(value: unknown, file: string, field: string): number {
  const number = finite(value, file, field);
  if (number < 0 || number > 1) fail(file, `${field} must be in [0, 1]`);
  return number;
}

export function validateFreightEvidence(raw: unknown): FreightEvidenceBundle {
  const bundle = object(raw, "bundle");
  const manifest = object(bundle.manifest, "manifest.json");
  const runId = string(manifest.run_id, "manifest.json", "run_id");
  if (manifest.schema_version !== FREIGHT_SCHEMA_VERSION) {
    fail("manifest.json", `schema_version must be ${FREIGHT_SCHEMA_VERSION}`);
  }

  const files = [
    ["alerts.json", bundle.alerts],
    ["network.json", bundle.network],
    ["evaluation.json", bundle.evaluation],
  ] as const;
  for (const [file, value] of files) {
    const record = object(value, file);
    if (record.run_id !== runId) fail(file, `run_id does not match manifest (${runId})`);
    if (record.schema_version !== FREIGHT_SCHEMA_VERSION) {
      fail(file, `schema_version must be ${FREIGHT_SCHEMA_VERSION}`);
    }
  }

  const alertsFile = object(bundle.alerts, "alerts.json");
  if (!Array.isArray(alertsFile.alerts)) fail("alerts.json", "alerts must be an array");
  if (finite(alertsFile.row_count, "alerts.json", "row_count") !== alertsFile.alerts.length) {
    fail("alerts.json", "row_count does not match alerts length");
  }
  const alertIds = new Set<string>();
  for (const [index, value] of alertsFile.alerts.entries()) {
    const alert = object(value, "alerts.json");
    const id = string(alert.alert_id, "alerts.json", `alerts[${index}].alert_id`);
    if (alertIds.has(id)) fail("alerts.json", `duplicate alert_id ${id}`);
    alertIds.add(id);
    if (!severities.has(String(alert.severity))) fail("alerts.json", `${id} has invalid severity`);
    unit(alert.confidence_score, "alerts.json", `${id}.confidence_score`);
    const priority = finite(alert.priority_score, "alerts.json", `${id}.priority_score`);
    if (priority < 0 || priority > 100) fail("alerts.json", `${id}.priority_score must be in [0, 100]`);
    for (const field of [
      "exposure_component",
      "persistence_component",
      "service_impact_component",
      "method_agreement_component",
      "data_quality_component",
      "support_component",
    ]) unit(alert[field], "alerts.json", `${id}.${field}`);
  }

  const network = object(bundle.network, "network.json");
  if (!Array.isArray(network.lanes)) fail("network.json", "lanes must be an array");
  if (finite(network.row_count, "network.json", "row_count") !== network.lanes.length) {
    fail("network.json", "row_count does not match lanes length");
  }
  for (const [index, value] of network.lanes.entries()) {
    const lane = object(value, "network.json");
    string(lane.lane_id, "network.json", `lanes[${index}].lane_id`);
    unit(lane.on_time_rate, "network.json", `lanes[${index}].on_time_rate`);
  }

  const evaluation = object(bundle.evaluation, "evaluation.json");
  const overall = object(evaluation.overall, "evaluation.json");
  for (const field of ["precision", "recall", "f1", "false_positive_rate", "review_rate", "excess_cost_coverage"]) {
    unit(overall[field], "evaluation.json", `overall.${field}`);
  }
  if (!Array.isArray(evaluation.sensitivity_grid) || evaluation.sensitivity_grid.length !== 3) {
    fail("evaluation.json", "sensitivity_grid must contain exactly three exported points");
  }
  const configs = new Set<string>();
  for (const value of evaluation.sensitivity_grid) {
    const point = object(value, "evaluation.json");
    const id = string(point.config_id, "evaluation.json", "sensitivity_grid.config_id");
    if (configs.has(id)) fail("evaluation.json", `duplicate config_id ${id}`);
    configs.add(id);
    for (const field of ["evaluation_precision", "evaluation_recall", "evaluation_f1", "evaluation_false_positive_rate", "evaluation_review_rate", "evaluation_excess_cost_coverage"]) {
      unit(point[field], "evaluation.json", `${id}.${field}`);
    }
  }

  const lanes = object(bundle.lanes, "lanes");
  if (!Array.isArray(manifest.alert_details)) {
    fail("manifest.json", "alert_details must be an array");
  }
  const detailIds = new Set<string>();
  for (const value of manifest.alert_details) {
    const reference = object(value, "manifest.json");
    const alertId = string(reference.alert_id, "manifest.json", "alert_details.alert_id");
    const path = string(reference.path, "manifest.json", "alert_details.path");
    if (!alertIds.has(alertId)) fail("manifest.json", `unknown alert detail ${alertId}`);
    if (detailIds.has(alertId)) fail("manifest.json", `duplicate alert detail ${alertId}`);
    detailIds.add(alertId);
    const lane = object(lanes[path], path);
    if (lane.run_id !== runId) fail(path, `run_id does not match manifest (${runId})`);
    if (lane.schema_version !== FREIGHT_SCHEMA_VERSION) fail(path, "schema_version mismatch");
    if (lane.alert_id !== alertId) fail(path, `alert_id does not match detail (${alertId})`);
    if (!Array.isArray(lane.shipments) || !Array.isArray(lane.flag_evidence)) {
      fail(path, "shipments and flag_evidence must be arrays");
    }
    for (const evidence of lane.flag_evidence) {
      const row = object(evidence, path);
      if (!methods.has(String(row.method))) fail(path, `invalid method ${String(row.method)}`);
      finite(row.score, path, "flag_evidence.score");
      finite(row.threshold, path, "flag_evidence.threshold");
    }
  }
  if (detailIds.size !== alertIds.size) {
    fail("manifest.json", "every public alert must have one detail file");
  }
  return raw as FreightEvidenceBundle;
}
