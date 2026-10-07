# New Flagships + Site QA — Design

**Date:** 2026-10-07
**Status:** Approved by user ("whatever you think is best")
**Scope:** `portfolio-codex` only.

## Goal

Add three new projects as flagship case studies, rebalance Selected Work, and leave the whole site free of bugs, broken links, and unsupported claims.

## Selection

Rule from user: exciting, big, complex work → Selected Work; smaller/easier → Other Work. Demoted projects keep their preview, route, and page — nothing is deleted.

| Tier | Project | Why |
|---|---|---|
| Flagship | WikiPulse | Kafka → Spark Structured Streaming → Iceberg; live in-browser stream demo with Python↔TS parity suite |
| Flagship | Warehouse Fulfillment Digital Twin | SimPy DES + Optuna search with three seed sets; 22% labor finding; surrogate rejected on evidence |
| Flagship | Graph-Aware Fraud Detection | MLflow registry, FastAPI + TreeSHAP, Evidently drift; honest null result on graph lift |
| Flagship | Freight KPI Tracker | Existing full interactive workbench |
| Other work (page kept) | Retail Demand Intelligence | Smaller evidence base; README compares scores across different samples |
| Other work (page kept) | LoanSurv | ~1.4k LOC |
| Other work (page kept) | CareTarget | 5 commits, no demo |

Four flagships keeps the "four systems / one practice" framing intact.

## Architecture

- `lib/types.ts`: `ProjectSlug` and `ProjectPalette` gain `wikipulse`, `warehouse-digital-twin`, `graph-fraud-detection` / `wiki`, `warehouse`, `fraud`. `ProjectSummary` gains `tier: "flagship" | "other"`.
- `lib/projects.ts`: one `projects` list (all seven detailed projects). `flagshipProjects` / `archivedProjects` are derived by tier. Static params and adjacency cover all detailed projects so demoted pages stay reachable.
- `lib/case-studies.ts`: typed per-slug content for the three new projects — lede, decision question, 3–4 headline stats (each traceable to a repo file), ordered sections (question, data, system, evidence, interface, limitations), and links (repo, live demo, methodology).
- `components/case-study-page.tsx`: generic case-study layout used when a slug has case-study content; reuses `project-entry-page` styles plus new rules in `styles/case-study.css`. Freight keeps its bespoke page; Retail, LoanSurv, CareTarget keep their existing entry page.
- `components/previews/{wiki,warehouse,fraud}-preview.tsx`: animated SVG previews in the existing preview style, paused when off-screen and static under reduced motion.
- `components/secondary-systems.tsx`: renders demoted projects first (internal links to their pages) followed by the existing repo-linked tools.
- Copy updates: hero signal labels, Selected Work heading, field note "current build".

## Accuracy rule

Every number on the site must appear in the source repo's README, `docs/results*.json`, or `docs/results/summary.json`. Synthetic/simulated results are labelled as such.

## QA

`tsc --noEmit`, `eslint`, `next build` (runs freight evidence validation), HTTP check of every outbound link, browser pass on every route (console errors, hydration), mobile width, reduced motion. Remove unused components (`case-study-nav`, `causal-system-diagram`, `decision-engine`, `reveal`) if still unreferenced.
