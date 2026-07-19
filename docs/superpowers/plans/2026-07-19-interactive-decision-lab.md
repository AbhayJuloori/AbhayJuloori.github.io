# Interactive Decision Lab — Implementation Plan

**Goal:** Deliver the first working version of Abhay Juloori's distinctive portfolio: a polished homepage and one complete CareTarget case-study page.

**Architecture:** A standalone Next.js App Router project inside `portfolio-codex`. Typed project content feeds reusable editorial project rows and case-study sections. A client-side decision-engine component provides the signature interaction while the page remains semantic and fully useful without JavaScript animation.

**Tech stack:** Next.js 15, React 19, TypeScript, Framer Motion, handwritten CSS, SVG.

---

## Task 1: Scaffold the isolated app

**Files:** `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

1. Add the smallest Next.js project configuration and scripts.
2. Establish metadata, root font variables, semantic shell, and global design tokens.
3. Install dependencies and confirm the empty app compiles.

## Task 2: Add typed portfolio content

**Files:** `lib/content.ts`, `lib/types.ts`

1. Model projects, experience evidence, principles, and live-signal entries.
2. Populate content from the existing portfolios' factual material only.
3. Keep current-employer fields intentionally absent.

## Task 3: Build the signature homepage

**Files:** `app/page.tsx`, `components/site-header.tsx`, `components/decision-engine.tsx`, `components/section-heading.tsx`, `components/project-row.tsx`, `components/reveal.tsx`, `app/globals.css`

1. Build accessible header and balanced hero CTAs.
2. Implement the responsive confidence-gated SVG/DOM engine.
3. Build Operator Profile, P&G Experience, Featured Systems, Live Signals, Off Duty, and Contact sections.
4. Add restrained scroll and pointer motion plus reduced-motion fallbacks.
5. Verify content hierarchy and keyboard focus order.

## Task 4: Build the CareTarget case study

**Files:** `app/work/caretarget/page.tsx`, `components/case-study-nav.tsx`, `components/causal-system-diagram.tsx`, `app/globals.css`

1. Add overview, decision framing, system design, evaluation, interface, and reflection sections.
2. Add a sticky section rail and a custom causal-targeting diagram.
3. Connect homepage and case-study navigation in both directions.

## Task 5: Verify and refine

**Files:** all created application files

1. Run dependency install, lint, TypeScript, and production build checks.
2. Launch the local app and inspect homepage and case study at desktop and mobile sizes.
3. Check keyboard navigation, visible focus, overflow, contrast, and reduced-motion behavior.
4. Fix defects, rerun checks, and record any remaining limitations in the handoff.

