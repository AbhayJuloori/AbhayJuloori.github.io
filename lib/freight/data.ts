import { readFileSync } from "node:fs";
import path from "node:path";
import { validateFreightEvidence } from "./validate";

const evidenceRoot = path.join(process.cwd(), "public", "data", "freight", "v2");

function readEvidenceFile(relativePath: string): unknown {
  return JSON.parse(readFileSync(path.join(evidenceRoot, relativePath), "utf8"));
}

const manifest = readEvidenceFile("manifest.json") as {
  alert_details?: Array<{ alert_id: string; path: string }>;
};
const lanes = Object.fromEntries(
  (manifest.alert_details ?? []).map(({ path: lanePath }) => [lanePath, readEvidenceFile(lanePath)]),
);

export const freightEvidence = validateFreightEvidence({
  manifest,
  alerts: readEvidenceFile("alerts.json"),
  evaluation: readEvidenceFile("evaluation.json"),
  network: readEvidenceFile("network.json"),
  lanes,
});
