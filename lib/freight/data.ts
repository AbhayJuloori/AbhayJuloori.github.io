import alerts from "@/public/data/freight/v2/alerts.json";
import evaluation from "@/public/data/freight/v2/evaluation.json";
import dataQualityLane from "@/public/data/freight/v2/lanes/data_quality-in-oh-ftl.json";
import highLane from "@/public/data/freight/v2/lanes/high-pa-ny-all.json";
import mediumLane from "@/public/data/freight/v2/lanes/medium-pa-oh-all.json";
import manifest from "@/public/data/freight/v2/manifest.json";
import network from "@/public/data/freight/v2/network.json";
import { validateFreightEvidence } from "./validate";

export const freightEvidence = validateFreightEvidence({
  manifest,
  alerts,
  evaluation,
  network,
  lanes: {
    "lanes/high-pa-ny-all.json": highLane,
    "lanes/medium-pa-oh-all.json": mediumLane,
    "lanes/data_quality-in-oh-ftl.json": dataQualityLane,
  },
});
