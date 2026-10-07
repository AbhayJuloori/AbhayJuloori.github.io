export type MobileStep = "pulse" | "queue" | "investigation" | "decision" | "evidence";

export interface DecisionEntry {
  alertId: string;
  action: string;
  rationale: string;
  sequence: number;
}

export interface FreightState {
  selectedAlertId: string;
  sensitivityConfigId: string;
  signalFilter: "all" | "cost" | "service";
  decisions: DecisionEntry[];
  evidenceOpen: boolean;
  mobileStep: MobileStep;
}

export type FreightAction =
  | { type: "select_alert"; alertId: string }
  | { type: "select_sensitivity"; configId: string }
  | { type: "set_filter"; filter: FreightState["signalFilter"] }
  | { type: "record_decision"; alertId: string; action: string; rationale: string }
  | { type: "toggle_evidence"; open: boolean }
  | { type: "set_mobile_step"; step: MobileStep };

export function freightReducer(state: FreightState, action: FreightAction): FreightState {
  switch (action.type) {
    case "select_alert":
      return { ...state, selectedAlertId: action.alertId, mobileStep: "investigation" };
    case "select_sensitivity":
      return { ...state, sensitivityConfigId: action.configId };
    case "set_filter":
      return { ...state, signalFilter: action.filter };
    case "record_decision":
      return {
        ...state,
        decisions: [
          ...state.decisions.filter((entry) => entry.alertId !== action.alertId),
          {
            alertId: action.alertId,
            action: action.action,
            rationale: action.rationale,
            sequence: state.decisions.length + 1,
          },
        ],
      };
    case "toggle_evidence":
      return {
        ...state,
        evidenceOpen: action.open,
        mobileStep: action.open
          ? "evidence"
          : state.mobileStep === "evidence"
            ? "investigation"
            : state.mobileStep,
      };
    case "set_mobile_step":
      return { ...state, mobileStep: action.step };
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}
