export const FREIGHT_SCHEMA_VERSION = "2.0.0" as const;

export type Severity = "low" | "medium" | "high" | "critical";
export type EvidenceMethod =
  | "robust_residual"
  | "iqr"
  | "lane_week_deviation"
  | "service_deterioration"
  | "service_sla_breach"
  | "data_quality";
export type MethodFamily =
  | "cost_reconciliation"
  | "lane_cost_trend"
  | "carrier_service_trend"
  | "service_reconciliation"
  | "data_quality";

export interface FreightManifest {
  run_id: string;
  schema_version: typeof FREIGHT_SCHEMA_VERSION;
  source_manifest_sha256: string;
  artifact_hashes: Record<string, string>;
  alert_details: Array<{
    alert_id: string;
    path: string;
  }>;
  representative_lanes: Array<{
    alert_id: string;
    path: string;
    role: "high" | "medium" | "data_quality";
  }>;
}

export interface FreightAlert {
  run_id: string;
  schema_version: typeof FREIGHT_SCHEMA_VERSION;
  alert_id: string;
  lane_id: string;
  mode: string;
  carrier_scope: string;
  window_start: string;
  window_end: string;
  primary_signal: string;
  reason: string;
  severity: Severity;
  affected_shipment_count: number;
  affected_service_shipment_count: number;
  data_quality_shipment_count: number;
  estimated_excess_cost: number;
  confidence_score: number;
  priority_score: number;
  method_family_count: number;
  evidence_unit_count: number;
  observed_week_count: number;
  evidence_support: number;
  exposure_component: number;
  persistence_component: number;
  service_impact_component: number;
  method_agreement_component: number;
  data_quality_component: number;
  support_component: number;
}

export interface FreightAlertsFile {
  run_id: string;
  schema_version: typeof FREIGHT_SCHEMA_VERSION;
  row_count: number;
  alerts: FreightAlert[];
}

export interface NetworkLane {
  lane_id: string;
  mode: string;
  shipment_count: number;
  flagged_shipment_count: number;
  on_time_rate: number;
  total_spend: number;
}

export interface FreightNetworkFile {
  run_id: string;
  schema_version: typeof FREIGHT_SCHEMA_VERSION;
  row_count: number;
  lanes: NetworkLane[];
}

export interface EvaluationMetrics {
  shipment_count: number;
  positive_count: number;
  negative_count: number;
  true_positives: number;
  false_positives: number;
  true_negatives: number;
  false_negatives: number;
  precision: number;
  recall: number;
  f1: number;
  false_positive_rate: number;
  review_volume: number;
  review_rate: number;
  excess_cost_coverage: number;
}

export interface SensitivityPoint {
  config_id: string;
  selected: boolean;
  robust_threshold: number;
  iqr_multiplier: number;
  lane_week_threshold: number;
  service_drop_threshold: number;
  trailing_observed_weeks: number;
  minimum_trailing_weeks: number;
  service_current_observed_weeks: number;
  minimum_service_current_shipments: number;
  trend_scale_floor: number;
  maximum_trusted_weight_lbs: number;
  calibration_recall: number;
  calibration_false_positive_rate: number;
  calibration_review_rate: number;
  calibration_review_volume: number;
  calibration_excess_cost_coverage: number;
  calibration_selection_score: number;
  evaluation_precision: number;
  evaluation_recall: number;
  evaluation_f1: number;
  evaluation_false_positive_rate: number;
  evaluation_review_rate: number;
  evaluation_review_volume: number;
  evaluation_excess_cost_coverage: number;
}

export interface FreightEvaluationFile {
  run_id: string;
  schema_version: typeof FREIGHT_SCHEMA_VERSION;
  row_count: number;
  overall: EvaluationMetrics;
  by_anomaly_type: Array<EvaluationMetrics & { anomaly_type: string }>;
  selected_config: Omit<SensitivityPoint, `config_id` | `selected` | `calibration_${string}` | `evaluation_${string}`>;
  selection_rule: string;
  review_trigger_methods: EvidenceMethod[];
  sensitivity_grid: SensitivityPoint[];
}

export interface LaneShipment {
  shipment_id: string;
  ship_date: string;
  carrier_id: string;
  mode: string;
  total_cost: number;
  on_time_flag: 0 | 1;
  transit_days: number;
  flagged: boolean;
  selected_alert: boolean;
}

export interface FlagEvidence {
  shipment_id: string;
  evidence_unit_id: string;
  method: EvidenceMethod;
  method_family: MethodFamily;
  score: number;
  threshold: number;
  reason: string;
}

export interface FreightLaneFile {
  run_id: string;
  schema_version: typeof FREIGHT_SCHEMA_VERSION;
  alert_id: string;
  lane_id: string;
  mode: string;
  carrier_scope: string;
  window_start: string;
  window_end: string;
  representative_role: "high" | "medium" | "data_quality" | "alert";
  alert_ids: string[];
  selected_alert_shipment_count: number;
  shipment_count: number;
  shipments: LaneShipment[];
  flag_evidence: FlagEvidence[];
}

export interface FreightEvidenceBundle {
  manifest: FreightManifest;
  alerts: FreightAlertsFile;
  network: FreightNetworkFile;
  evaluation: FreightEvaluationFile;
  lanes: Record<string, FreightLaneFile>;
}
