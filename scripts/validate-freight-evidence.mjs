import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { validateFreightEvidence } from "../lib/freight/validate.ts";

const root = resolve(process.cwd(), "public/data/freight/v2");
const parse = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));

const manifest = await parse("manifest.json");
const laneEntries = await Promise.all(
  manifest.alert_details.map(async ({ path }) => [path, await parse(path)]),
);
const bundle = validateFreightEvidence({
  manifest,
  alerts: await parse("alerts.json"),
  network: await parse("network.json"),
  evaluation: await parse("evaluation.json"),
  lanes: Object.fromEntries(laneEntries),
});

for (const [path, expected] of Object.entries(bundle.manifest.artifact_hashes)) {
  const bytes = await readFile(resolve(root, path));
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== expected) throw new Error(`[freight evidence: ${path}] sha256 mismatch`);
}

console.log(
  `Freight evidence valid — ${bundle.alerts.row_count} alerts, ${bundle.network.row_count} lane-mode rows, run ${bundle.manifest.run_id}`,
);
