# Interactive Decision Lab — Design Specification

## Intent

Build a portfolio that feels authored by Abhay Juloori: a newly graduated data scientist who thinks beyond model scores and builds decision systems around uncertainty. The experience should be memorable without hiding the work behind spectacle.

This is a new project. Existing Claude-built portfolio folders are read-only factual references and must not be modified or visually cloned.

## Positioning

Primary line: **I build ML systems that turn uncertain signals into useful decisions.**

Supporting idea: Abhay works across causal inference, credit risk, survival analysis, forecasting, and decision-support products—from modeling and evaluation to APIs and interfaces.

The tone is precise, curious, and early-career credible. It must show unusual product thinking without presenting him as a senior leader or founder.

## Concept

The site is an **Interactive Decision Lab**: an abstract instrument where raw signals move through models, confidence gates, and human review before becoming actions. It borrows spatial confidence from itomdev, clean interface hierarchy from PostHog, playful scroll moments from Josh Jamili, personal live data from Balaj Marius, and case-study clarity from Rachel Chen—without reproducing any one site.

The central visual metaphor is a confidence-gated decision engine:

`observations → model → act / review / defer`

This makes Abhay's philosophy visible before it is explained. The site uses native scrolling and shallow 2.5D depth rather than a full WebGL world, preserving accessibility, performance, and direct navigation.

## Visual Language

- Warm mineral paper background rather than black or generic white.
- Graphite typography and structural lines.
- Cool blue for signals, green for action, amber for review, muted coral for defer.
- Editorial humanist sans for large statements and body copy; monospaced labels for states, metrics, and navigation.
- Fine grid, registration marks, traces, stamps, and restrained paper grain. These should feel like a working notebook/instrument, not a sci-fi dashboard.
- Mostly square or slightly clipped corners. Avoid a page made of interchangeable rounded cards.
- Large type and asymmetry provide drama; content surfaces remain calm and readable.

## Information Architecture

### Homepage

1. **Hero / Decision Engine**
   - Name and clear positioning.
   - Balanced entry points: Explore the lab, View projects, Resume, GitHub.
   - Interactive SVG/DOM decision engine with observations flowing toward Act, Review, and Defer.
   - Status copy says available/working in general terms; no employer is named until Abhay explicitly provides it.

2. **Operator Profile**
   - Compact biography and four principles: start from the decision, expose uncertainty, ship the interface, document tradeoffs.
   - Presented as a field note rather than four generic feature cards.

3. **Experience / Deployment**
   - P&G surrogate-model story: expensive simulation bottleneck, hundreds of joined tables, proprietary feature engineering, confidence-gated routing.
   - Outcome metrics may use information already present in Abhay's existing public portfolio, with measured wording and a confidentiality note.

4. **Featured Systems**
   - CareTarget, Credit Recourse Engine, LoanSurv, and Retail Demand Intelligence.
   - Alternating project rows expose decision, uncertainty, system, evidence, and links.
   - The first project links to a complete case-study route.

5. **Live Signals**
   - A small, personal feed for what Abhay is building, learning, and reading.
   - First version uses transparent static content and GitHub links; future versions can fetch activity without making productivity theater.

6. **Off Duty / Contact**
   - A human closing note and direct contact path.

### First Case Study: CareTarget

The page uses a sticky section rail and a readable narrative:

- Context and decision
- Why prediction alone is insufficient
- Causal targeting system
- Survival and fairness evaluation
- Product interface
- Outcomes, constraints, and reflection

## Interaction and Motion

- The hero engine reacts subtly to pointer position and selection; its semantic states remain readable without motion.
- Scroll reveals should be short and directional, connected to the section's trace line.
- Project rows may shift their diagram or evidence strip slightly on hover; text must never move enough to impair reading.
- Buttons use tactile label/plate behavior, not glow effects.
- Motion respects `prefers-reduced-motion`, keyboard navigation, and touch input.
- On mobile, the engine becomes a compact vertical flow and all important content remains in document order.

## Content Rules

- Prefer concrete decisions and constraints over tool lists.
- Do not claim every personal project is production-grade.
- Separate measured outcomes, project goals, and technical choices.
- Do not disclose a current employer or role without explicit approval.
- Keep proprietary P&G details abstract and note confidentiality.
- Every major case study should answer: what decision changed, where uncertainty appears, what was built around the model, and what Abhay learned.

## Technical Direction

- Next.js App Router, React, TypeScript.
- Handwritten global CSS and CSS modules/structured classes; no component-kit look and no Tailwind dependency.
- Framer Motion only where it improves spatial continuity; CSS/SVG for the core engine.
- Semantic HTML, visible focus states, reduced-motion handling, responsive layouts.
- Content stored as typed local data so project narratives can evolve without redesigning components.

## Acceptance Criteria

- The first viewport communicates Abhay's ML decision-system point of view within seconds.
- The site does not resemble a generic dark AI dashboard, glassmorphism landing page, or card-grid template.
- Homepage and CareTarget case study work at desktop and mobile widths.
- All major navigation is keyboard accessible and reduced motion is supported.
- Production build succeeds with no TypeScript or lint errors.
- Existing portfolio directories remain untouched.

