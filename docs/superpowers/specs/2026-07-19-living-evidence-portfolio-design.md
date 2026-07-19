# Living Evidence Portfolio — Design Specification

**Date:** 2026-07-19  
**Status:** Approved by user  
**Project boundary:** `/Users/abhayjuloori/Documents/Portfolio Project/portfolio-codex` only

## 1. Product intent

Build a personal portfolio for Abhay Juloori that presents applied data science and ML work as decision systems people can inspect, not as a generic collection of technology cards.

The central design idea is **Living Evidence**: each flagship project appears first as a compact, animated system that shows the project doing something meaningful. Selecting it expands into a case study that explains the problem, modelling choice, engineering, evidence, limitations, and outcome.

The site should leave a visitor with three impressions:

1. Abhay chooses useful problem formulations, not just popular algorithms.
2. He can build the data, model, interface, and operational workflow around a decision.
3. His work is thoughtful about uncertainty, limitations, and what is genuinely proven.

## 2. Scope and constraints

### In scope

- Redesign the existing `portfolio-codex` Next.js application.
- A homepage with four flagship project previews.
- Dedicated case-study routes for all four projects.
- A two-entry primary experience section for P&G and Tayo AI.
- A compact earlier-experience entry without a full report.
- A secondary systems/tools section.
- A small personal activity/field-notes surface.
- Responsive, keyboard-accessible, reduced-motion-aware behavior.

### Out of scope

- Modifying any Claude-built portfolio directory.
- Presenting six projects as equally important merely to fill a grid.
- Inventing metrics, outcomes, screenshots, employers, or responsibilities.
- Publishing gated or sleeping demos as reliable live experiences.
- A faux desktop, generic browser-window collage, terminal-themed portfolio, or decorative 3D hero.
- A blog or CMS for the first version.

### Content dependencies

- Tayo AI title, dates, work summary, public-safe evidence, and confidentiality limits must be supplied and approved before its detailed experience route is published. If unavailable at launch, show only confirmed facts or omit the detailed route.
- P&G outcomes currently present in the prototype must be reconfirmed before publication.
- CareTarget must not display a live-demo action while its Vercel deployment requires authentication.
- LoanSurv must resolve the 1.8M versus 2.2M dataset-size inconsistency before that number is emphasized.

## 3. Reference-site translation

The design borrows principles, not recognizable layouts or styling.

### Rachel Chen

Borrow:

- Large rectangular media previews that demonstrate the work before a click.
- A short, confident one-line project premise.
- A clear project-detail structure with persistent section orientation.
- Media-led storytelling with restrained supporting copy.

Do not copy:

- Her exact grid proportions, typography, navigation placement, labels, case-study rail, or white/gray visual system.

### Itom Dev

Borrow:

- Navigation that feels spatial and deliberate.
- Strong continuity between the object selected and the destination reached.

Translation:

- The selected project surface expands into its case-study world; the visitor should feel they entered the project rather than loaded an unrelated article.

### PostHog Products

Borrow:

- Clean framing of complex product surfaces.
- Legible hierarchy inside dense interfaces.

Translation:

- Project previews use purposeful frames and crops, but avoid repeatedly imitating operating-system windows.

### Josh Jamili

Borrow:

- Small moments of play and responsive scroll feedback.
- Motion that rewards exploration.

Translation:

- Project signals respond subtly to hover, focus, and scroll position. Scrolling is never hijacked and remains fully usable on touch and keyboard.

### Balaj Marius

Borrow:

- Personal information that could not belong to another portfolio.
- Lightweight public activity as evidence of an active practice.

Translation:

- Include a restrained field-notes/activity area showing current work, selected public GitHub activity, and one human interest. Do not use contribution counts as a productivity score.

## 4. Information architecture

### Primary routes

- `/` — homepage
- `/work/freight-kpi-tracker`
- `/work/retail-demand-intelligence`
- `/work/loansurv`
- `/work/caretarget`
- `/experience/pg`
- `/experience/tayo-ai` only when approved public content exists

### Homepage order

1. Persistent navigation
2. Introduction / identity
3. Experience snapshot
4. Flagship Living Evidence Grid
5. Secondary systems and personal tools
6. Field notes / public activity
7. About and contact

This order establishes professional context before asking visitors to inspect the work, then adds breadth and personality after the four strongest cases.

## 5. Homepage design

### 5.1 Navigation

Desktop navigation remains quiet and fixed or sticky:

- Abhay Juloori / role descriptor
- Work
- Experience
- About
- Resume

As the visitor scrolls, a small section indicator updates without becoming a progress gimmick. On mobile, use a compact menu with an obvious close state, focus management, and no full-screen animation dependency.

### 5.2 Introduction

Working lead:

> I’m Abhay. I build analytical systems that turn uncertain data into decisions.

Supporting copy should mention the model-to-interface range without listing every method. Avoid generic claims such as “passionate data scientist,” “crafting intelligent experiences,” or “bridging creativity and technology.”

The accompanying visual is a restrained signal composition derived from the four projects: a route segment, forecast interval, survival curve, and intervention split. It is not a fifth interactive demo and should never overshadow the introduction.

Primary action: `View selected work`  
Secondary action: `About my work`

### 5.3 Experience snapshot

Show two primary experience entries with company, role, dates, and one precise sentence:

- Procter & Gamble
- Tayo AI

Each may open a dedicated experience report when enough public information exists. The earlier internship appears as a single quieter line labelled `Earlier`, without an animated feature or full case study.

### 5.4 Living Evidence Grid

Use a two-column grid above 960px and one column below it. Cards have a consistent media ratio near 16:10 so the system feels intentional and does not reproduce Rachel Chen’s masonry rhythm.

Each item contains:

1. Animated media surface
2. Project name
3. One-line premise
4. Short discipline/status metadata
5. A quiet case-study affordance revealed on hover/focus but never required for comprehension

Flagship order:

1. Freight KPI Tracker
2. Retail Demand Intelligence
3. LoanSurv
4. CareTarget

Working premises:

- **Freight KPI Tracker:** `Finding where operations break before the summary report does.`
- **Retail Demand Intelligence:** `Turning realistic demand behavior into forecasting and inventory decisions.`
- **LoanSurv:** `Modelling when risk arrives—not only whether it arrives.`
- **CareTarget:** `Finding who may benefit from intervention, not merely who appears risky.`

Final copy must remain concise, factual, and understandable without ML vocabulary.

### 5.5 Secondary systems

Use a compact editorial list or horizontal shelf, not smaller copies of the flagship cards. Initial candidates:

- Credit Recourse Engine
- Controlled Document Retrieval
- Codex–Claude Bridge
- Mac Session Loader
- AlphaForge as `Currently building` only if public disclosure is approved
- NIFTY–S&P Evidence Desk under experiments, not flagship work

Each entry gets a title, category, one sentence, and GitHub link. These entries do not receive expensive animated previews in version one.

### 5.6 Field notes

This is the Balaj Marius-inspired personal surface. It may show:

- Current build
- One or two recent meaningful public repository updates
- A current technical question or area of study
- A human note such as manga/reading, written specifically rather than as a generic hobby list

If GitHub data is fetched dynamically, it must be cached and fail silently to authored fallback content. No contribution heatmap, streak counter, or commit-count leaderboard.

## 6. Flagship preview storyboards

Homepage previews should run as six-to-twelve-second muted loops. Use actual project surfaces or faithful project-specific reconstructions. They pause when offscreen and provide static posters for reduced motion.

### Freight KPI Tracker

Sequence:

1. Shipment nodes and routes establish the network.
2. KPI ticks update for a small set of lanes.
3. One lane drifts outside its normal range.
4. The lane turns amber, an anomaly marker appears, and the relevant KPI is isolated.
5. The loop resets without a visible hard cut.

Visual character: carbon, route red, safety amber, shipping-label white.

### Retail Demand Intelligence

Sequence:

1. Historical demand draws across several weeks.
2. Seasonality and promotion markers appear.
3. A forecast and uncertainty band extend forward.
4. Inventory policy reacts with reorder timing and quantity.
5. A stockout-risk state resolves into a recommended action.

Visual character: deep plum, forecasting blue, stock green, warm neutral ground.

### LoanSurv

Sequence:

1. A compact borrower profile enters.
2. A survival curve draws over time.
3. A comparison cohort appears.
4. The risk percentile and time horizon update together.
5. The selected horizon becomes the bridge into the case study.

Visual character: ink, warm yellow, statistical orange, clean chart ground.

### CareTarget

Sequence:

1. Several patient cases appear as neutral records.
2. A risk ranking orders them.
3. An intervention-benefit ranking appears beside it.
4. Two patients change position, exposing the central distinction.
5. Decision tiers resolve into intervene, review, and monitor states.

Visual character: clinical blue, teal, intervention coral, crisp white.

## 7. Motion and interaction model

### Card behavior

- Previews animate independently of hover so touch users receive the same evidence.
- Hover or keyboard focus adds one meaningful response: emphasize the active signal, reveal the case-study affordance, and slightly change depth or border treatment.
- No tilt effects, magnetic cursor, particle trail, or perpetual parallax.

### Page transition

Selecting a flagship project should preserve object continuity:

1. The media surface enlarges toward the viewport.
2. Its project palette becomes the destination background.
3. Title and case-study metadata enter after the media has established place.
4. The URL changes to the dedicated `/work/[slug]` route.

Implement this as progressive enhancement. Modern browsers may receive a shared-element/View Transition treatment; unsupported browsers navigate immediately with a short destination fade. `prefers-reduced-motion` bypasses the expansion and performs direct navigation.

### Scroll behavior

- Native scroll remains intact.
- Section entrances are short and local.
- Case-study progress updates based on visible sections.
- Motion explains state or relationship; it is not a substitute for hierarchy.

## 8. Case-study system

All case studies share a recognizable shell but not identical story content.

### Shared shell

- Back to work
- Project title, premise, role, timeframe, status, and links
- Large opening media surface continuing the homepage preview
- Compact sticky section rail on wide screens
- In-flow section index on mobile
- Previous/next project navigation
- GitHub and live-demo actions only when reliable

### Editorial rules

- Lead with the decision or question, not the tech stack.
- Separate actual outcomes from goals, targets, or expected values.
- Show one architecture diagram only when it clarifies relationships.
- Include limitations near results, not buried at the end.
- State Abhay’s contribution explicitly.
- Use real interfaces, charts, code excerpts, and evidence; avoid decorative mockups.

### Freight narrative

1. Operational problem
2. Shipment-data and warehouse design
3. Realism strategy for generated data
4. KPI and anomaly system
5. Validation and results
6. Limitations and next iteration

### Retail narrative

1. Why believable demand data was difficult
2. Data-generation assumptions and behavior
3. Forecasting architecture and evaluation
4. Inventory translation
5. Product/interface walkthrough
6. Results, caveats, and next iteration

### LoanSurv narrative

1. Why binary default prediction was insufficient
2. Censoring and time-to-event formulation
3. Cox versus Random Survival Forest
4. Evaluation and model behavior
5. Interactive borrower experience
6. Limitations and next iteration

### CareTarget narrative

1. Risk versus intervention benefit
2. Cohort and observational-data limitations
3. Risk, survival, and treatment-effect methods
4. Decision tiers and fairness considerations
5. Product walkthrough
6. What the evidence does and does not support

## 9. Visual system

### Portfolio shell

The shell should feel like a calm gallery for technical work, not a branded SaaS landing page.

- No global gradient field or decorative page grid.
- Use a cool, nearly neutral canvas and a carbon text color.
- Reserve saturated color for project media, active navigation, and meaningful status.
- Use one modern sans family with a restrained mono companion; do not use the common oversized-sans-plus-italic-serif AI-portfolio formula.
- Corners should be modest or square. Avoid a universal field of heavily rounded cards.
- Dividers, whitespace, and alignment create hierarchy more than shadows.

Exact tokens will be chosen during visual prototyping and reviewed in the browser before they are propagated across the site.

### Project worlds

Each flagship owns an accent palette and motion vocabulary, but typography, spacing, interaction states, and editorial framing remain shared. This provides variety without making the portfolio feel like four unrelated microsites.

## 10. Responsive and accessibility requirements

- Fully navigable by keyboard, including project cards, menus, case-study rail, and media controls where present.
- Visible focus states that do not rely only on color.
- Semantic headings and landmark structure.
- Preview meaning remains understandable from text and static posters.
- `prefers-reduced-motion` disables looping and shared-element transitions.
- Video previews are muted, `playsInline`, caption-independent, and never contain essential untranscribed speech.
- Project palettes meet WCAG AA contrast for text and controls.
- Desktop: two-column flagship grid.
- Tablet and mobile: one-column grid with media-first reading order.
- Sticky case-study navigation becomes an in-flow index on narrow screens.

## 11. Performance strategy

- Prefer CSS/SVG/DOM animation for diagrams and compact data behavior.
- Use short compressed WebM/MP4 loops only when real product footage communicates more effectively.
- Supply poster images for every video.
- Lazy-load media below the fold and pause previews outside the viewport.
- Avoid WebGL and large animation libraries beyond the existing Motion dependency unless a measured need emerges.
- Preserve useful content and navigation when JavaScript or animation support is limited.

## 12. Content and data model

The current `Project` type is too focused on a generic decision-lab row. Replace it with a content model supporting:

- slug
- title
- short premise
- project category and date/status
- repository and optional reliable demo
- preview type and preview asset/component
- project palette
- case-study section definitions
- evidence/results with provenance
- limitations
- technologies as secondary metadata
- next/previous ordering

Project-specific animation components stay separate from project copy so media can be iterated without rewriting content data.

## 13. Existing-code disposition

- Keep the Next.js 15, React 19, TypeScript, and Motion foundation.
- Replace the current homepage hierarchy and project-row presentation.
- Remove the global paper/gradient/grid styling and current generic `DecisionEngine` hero from the final experience.
- Reuse accessibility utilities or structural components only where they fit the new design.
- Do not preserve components merely because they already exist.
- Make no changes outside `portfolio-codex`.

## 14. Acceptance criteria

The first implementation is successful when:

1. The homepage clearly presents exactly four flagship projects in the approved order.
2. Every flagship has a project-specific preview that communicates its central system without reading the description.
3. Each project opens a dedicated, navigable case-study route.
4. The visual design no longer resembles the existing beige decision-lab prototype or a generic AI portfolio.
5. Freight and Retail feel complementary rather than redundant.
6. NIFTY–S&P is not presented as flagship work.
7. P&G and Tayo AI are the only primary experience entries; the earlier internship remains compact.
8. No unverified metric or unreliable demo is presented as established evidence.
9. The experience works across desktop and mobile, keyboard navigation, and reduced-motion mode.
10. Lint, type checking, and production build pass, followed by visual review at representative desktop and mobile widths.

## 15. Deferred expansion

The grid and content model must accept a fifth and sixth flagship later without redesign. A project earns that status only when it has:

- A distinct problem and narrative role
- Credible evidence or a meaningful working product
- Enough visual material for a living preview
- A complete case study with limitations

Until then, four strong flagship cases are intentional rather than incomplete.
