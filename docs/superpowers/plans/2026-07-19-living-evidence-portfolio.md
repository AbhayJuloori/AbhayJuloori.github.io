# Living Evidence Portfolio — Implementation Plan

## Goal

Replace the current generic “decision lab” presentation in `portfolio-codex` with the approved Living Evidence portfolio: a personal, media-led homepage with four animated flagship projects, project-specific case studies, two primary experience entries, a compact systems shelf, and restrained personal field notes.

## Architecture

- Keep the existing Next.js App Router application.
- Keep content and verified claims in typed modules under `lib/`.
- Render the homepage primarily as server components; isolate interactive navigation, preview playback, section tracking, and page-transition behavior in small client components.
- Give each flagship a dedicated preview component and case-study body while sharing the overall case-study shell.
- Use CSS/SVG/DOM animation for homepage previews. Use real repository images when available inside case studies.
- Implement project-to-case-study expansion as progressive enhancement; direct navigation remains the fallback.
- Use authored field notes in version one instead of adding a live GitHub API dependency.

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript 5.9
- Motion 12 for bounded client-side transitions and reduced-motion handling
- Scoped stylesheet files imported through a small global token/base layer
- Next Font using `Instrument_Sans` and `IBM_Plex_Mono`
- Existing Codex in-app browser for responsive and interaction verification

## Source design

Execute against:

- `docs/superpowers/specs/2026-07-19-living-evidence-portfolio-design.md`

Do not modify directories outside:

- `/Users/abhayjuloori/Documents/Portfolio Project/portfolio-codex`

## Prerequisite: content truth gate

Before publishing experience copy or disputed numbers, obtain and record:

1. Tayo AI: public-facing role title, start/end dates, two or three responsibilities, one outcome if publicly shareable, and confidentiality limits.
2. Earlier internship: company, role, dates, and one public-safe sentence.
3. P&G: confirmation or removal of the currently shown `~85%`, `−25%`, and `+30%` outcomes.
4. LoanSurv: the correct public dataset count, resolving 1.8M versus 2.2M.
5. Resume: a public PDF to place under `public/`, or confirmation that the navigation action should remain `Request résumé` by email.

Implementation may proceed on layout and verified project content while these are unresolved, but unresolved details must be omitted—not represented by filler copy.

## Task 1: Establish the new foundation

### Files

- Modify `app/layout.tsx`
- Replace `app/globals.css`
- Create `styles/home.css`
- Create `styles/previews.css`
- Create `styles/case-study.css`

### Implementation

1. Load `Instrument_Sans` for display/body and `IBM_Plex_Mono` for metadata through `next/font/google` in `app/layout.tsx`.
2. Update metadata to describe Abhay as an applied data scientist and ML systems builder without listing every method.
3. Preserve the skip link and `lang="en"`.
4. Reduce `app/globals.css` to reset, font variables, semantic tokens, focus states, selection, and shared layout primitives.
5. Remove the existing paper gradient, fixed grid, serif-emphasis formula, universal shadows, and decision-lab tokens.
6. Define the initial shell tokens:
   - canvas `#F2F4F1`
   - raised surface `#FAFBF8`
   - carbon foreground `#151918`
   - secondary text `#68706D`
   - hairline divider `#CBD1CD`
   - accessible focus blue `#215DFF`
   - Freight: carbon `#171A1D`, route red `#E7522D`, amber `#E0A62B`, label white `#F4F0E8`
   - Retail: plum `#351C45`, forecast blue `#4477D5`, stock green `#4F8E69`, neutral `#F0EBDD`
   - LoanSurv: ink `#1B1D20`, yellow `#E5B92F`, orange `#CE6435`, chart ground `#F8F6EF`
   - CareTarget: clinical ground `#EAF3F7`, blue `#286D92`, teal `#267F7B`, coral `#CC5C55`
   - shared spacing and shell widths
7. Import `styles/home.css`, `styles/previews.css`, and `styles/case-study.css` from the global stylesheet so route components do not accumulate large inline style blocks.
8. Add reduced-motion rules that disable non-essential transition and preview animation.

### Verify

- Run `npm run typecheck`.
- Run `npm run lint`.
- Confirm the root layout still exposes a visible skip link on keyboard focus.
- Confirm no old `--paper`, `page-grid`, or serif-emphasis styles remain referenced after later cleanup.

## Task 2: Replace the content model with verified portfolio data

### Files

- Replace `lib/types.ts`
- Replace `lib/content.ts`
- Create `lib/projects.ts`
- Create `lib/experience.ts`
- Create `lib/field-notes.ts`

### Implementation

1. Define `ProjectSlug` as the four flagship slugs.
2. Define `ProjectSummary` with:
   - slug
   - title
   - premise
   - category
   - year/status
   - repository URL
   - optional reliable demo URL
   - preview component key
   - palette key
   - short contribution statement
   - technologies
   - ordered case-study section IDs
3. Define `SecondaryProject`, `ExperienceEntry`, and `FieldNote` separately instead of overloading one card model.
4. Store the four flagship projects in the approved order: Freight, Retail, LoanSurv, CareTarget.
5. Omit CareTarget’s demo until the deployment is public.
6. Store secondary entries for Credit Recourse, Controlled Document Retrieval, Codex–Claude Bridge, Mac Session Loader, and NIFTY–S&P as an experiment.
7. Keep AlphaForge out until public disclosure is approved.
8. Encode evidence as attributed values or narrative claims; do not promote targets or expected values as results.
9. Add lookup helpers `getProject(slug)`, `getAdjacentProjects(slug)`, and `isProjectSlug(value)`.
10. Express arrays with `satisfies` so missing or invalid fields fail type checking.

### Verify

- Run `npm run typecheck`.
- Search `lib/` for `TODO`, placeholder text, expected/target metrics presented as outcomes, and the CareTarget gated demo URL.
- Confirm the flagship array contains exactly four unique slugs in the approved order.

## Task 3: Rebuild the site header and page-level navigation

### Files

- Replace `components/site-header.tsx`
- Create `components/mobile-menu.tsx`
- Create `components/section-indicator.tsx`

### Implementation

1. Build a quiet sticky header with identity, Work, Experience, About, and Resume. Link Resume to the confirmed PDF, otherwise label the mail action `Request résumé` rather than implying a document download.
2. Use real links that work from both the homepage and case-study routes.
3. Build the mobile menu as a focused client component:
   - explicit open/close state
   - Escape closes
   - focus returns to the trigger
   - body scrolling is contained only while open
4. Build a small active-section indicator using `IntersectionObserver`; it should update text/state without animating a progress bar.
5. Ensure header and menu function when reduced motion is enabled.

### Verify

- Run `npm run typecheck` and `npm run lint`.
- Keyboard-test every header item and the mobile menu.
- Verify current-section state does not replace the accessible name of navigation links.

## Task 4: Build the new homepage structure

### Files

- Replace `app/page.tsx`
- Replace `components/section-heading.tsx`
- Create `components/intro-hero.tsx`
- Create `components/hero-signal.tsx`
- Create `components/experience-index.tsx`
- Create `components/contact-footer.tsx`
- Modify `styles/home.css`

### Implementation

1. Assemble the approved order: header, introduction, experience snapshot, flagship work, secondary systems, field notes, about/contact.
2. Use the approved lead: `I’m Abhay. I build analytical systems that turn uncertain data into decisions.`
3. Build `HeroSignal` from four restrained motifs: route, forecast interval, survival curve, and intervention split.
4. Keep the hero visual secondary to the copy and disable its loop for reduced motion.
5. Render verified experience facts only. Do not insert generic prose for missing Tayo or internship information.
6. Make `View selected work` the primary action and `About my work` secondary.
7. Remove the current principles manifesto, confidence-engine hero, “operator” language, and “lab” framing.

### Verify

- Run `npm run typecheck` and `npm run lint`.
- Confirm the heading outline has one `h1` and logical `h2` sections.
- Confirm the primary call to action reaches the flagship grid with native scrolling.

## Task 5: Build shared preview behavior

### Files

- Create `components/living-project-grid.tsx`
- Create `components/living-project-card.tsx`
- Create `components/project-preview.tsx`
- Create `components/project-transition-link.tsx`
- Create `hooks/use-preview-visibility.ts`
- Create `types/view-transitions.d.ts`
- Modify `styles/previews.css`

### Implementation

1. Render a two-column grid above 960px and one column below it.
2. Keep all media surfaces near 16:10 with square/modest corners.
3. Make the full project item a semantic link with visible focus and a text premise below the media.
4. Use `IntersectionObserver` in `usePreviewVisibility` to pause client preview timelines outside the viewport.
5. Dispatch the four preview components by typed preview key.
6. Implement `ProjectTransitionLink` using `document.startViewTransition` when available and ordinary Next navigation otherwise.
7. Skip the expansion entirely for `prefers-reduced-motion`.
8. Preserve link semantics, modifier-click behavior, new-tab behavior, and browser history.
9. Reveal the case-study affordance on hover/focus while keeping the title and premise always visible.

### Verify

- Run `npm run typecheck` and `npm run lint`.
- Keyboard-open each card.
- Confirm Command-click/Control-click still opens a new tab.
- Confirm offscreen previews pause and reduced-motion mode shows a meaningful static state.

## Task 6: Build the Freight preview

### Files

- Create `components/previews/freight-preview.tsx`
- Modify `styles/previews.css`

### Implementation

1. Draw a small route network as semantic SVG with a concise accessible description.
2. Animate shipment markers along two or three routes.
3. Update a compact KPI readout.
4. Move one lane into an amber anomaly state and isolate the affected KPI.
5. Reset without a flashing or hard visual cut.
6. Expose an `active` prop so the shared visibility hook controls animation.

### Verify

- Confirm the loop reads as `network → drift → detection`, not as decorative dots.
- Confirm the preview remains understandable from the static reduced-motion state.
- Inspect at desktop and mobile card widths for clipped labels.

## Task 7: Build the Retail preview

### Files

- Create `components/previews/retail-preview.tsx`
- Modify `styles/previews.css`

### Implementation

1. Draw a historical demand series with promotion and seasonal markers.
2. Extend a forecast and uncertainty band.
3. Connect the forecast to reorder timing, quantity, and stockout-risk status.
4. Ensure the animation highlights synthetic demand behavior and inventory translation, distinguishing it from Freight’s monitoring story.
5. Expose the shared `active` prop and a reduced-motion static endpoint.

### Verify

- Confirm the preview reads as `history → forecast → inventory action`.
- Confirm it does not reuse Freight’s node/route visual grammar.
- Inspect labels and chart contrast at mobile width.

## Task 8: Build the LoanSurv preview

### Files

- Create `components/previews/loansurv-preview.tsx`
- Modify `styles/previews.css`

### Implementation

1. Show a compact borrower profile with only safe, synthetic example values.
2. Draw the survival curve and comparison cohort over time.
3. Update risk percentile and time horizon together.
4. End on a selected horizon that can visually continue into the case-study hero.
5. Do not show the disputed dataset count in the preview.

### Verify

- Confirm the curve direction and labels are statistically sensible.
- Confirm the preview explains time-to-event risk without relying on the one-line premise.
- Confirm reduced-motion state displays the completed curve and selected horizon.

## Task 9: Build the CareTarget preview

### Files

- Create `components/previews/caretarget-preview.tsx`
- Modify `styles/previews.css`

### Implementation

1. Render a small set of synthetic patient records without identifiable or realistic personal details.
2. Animate a baseline-risk ranking.
3. Introduce an intervention-benefit ranking alongside it.
4. Reorder at least two records so the conceptual difference is visible.
5. Resolve records into intervene, review, and monitor tiers.
6. Keep the language explicitly decision-support oriented, not clinical diagnosis.

### Verify

- Confirm the central `risk ≠ benefit` idea is visible before reading copy.
- Confirm no live-demo action is present while Vercel authentication remains required.
- Confirm color is not the only signal differentiating decision tiers.

## Task 10: Add secondary systems and field notes

### Files

- Create `components/secondary-systems.tsx`
- Create `components/field-notes.tsx`
- Modify `styles/home.css`

### Implementation

1. Render secondary systems as a compact editorial list/horizontal shelf, not a miniature card grid.
2. Give each entry a category, one sentence, and repository link.
3. Label NIFTY–S&P as an experiment.
4. Render authored field notes from `lib/field-notes.ts`.
5. Include one current build, one meaningful recent public update, one technical question, and one specific human note when verified.
6. Do not add a live GitHub API, contribution heatmap, streak, or commit count in version one.

### Verify

- Confirm no secondary item visually competes with a flagship preview.
- Confirm repository links open safely in a new tab.
- Confirm the field notes still render when JavaScript is disabled.

## Task 11: Create the shared case-study route and shell

### Files

- Create `app/work/[slug]/page.tsx`
- Create `components/case-study/case-study-shell.tsx`
- Replace and move `components/case-study-nav.tsx` with `components/case-study/case-study-nav.tsx`
- Create `components/case-study/case-study-hero.tsx`
- Create `components/case-study/case-section.tsx`
- Create `components/case-study/project-pagination.tsx`
- Modify `styles/case-study.css`
- Remove `app/work/caretarget/page.tsx` after the dynamic route is complete

### Implementation

1. Add `generateStaticParams` for all four flagship slugs.
2. Add slug-specific metadata and `notFound()` for invalid slugs.
3. Build a shared shell with back-to-work, project metadata, hero preview, section content, links, and previous/next navigation.
4. Build a desktop sticky section rail and mobile in-flow section index.
5. Track the active section with `IntersectionObserver` without changing native anchors.
6. Match the hero media’s `view-transition-name` to the selected homepage preview.
7. Render GitHub for every project and demo only when `demoUrl` exists and is reliable.
8. Keep project-specific content components separate from the shared shell.

### Verify

- Run `npm run typecheck` and `npm run lint`.
- Run `npm run build` and confirm all four routes are statically generated.
- Open an invalid slug and confirm the 404 path.
- Verify Back, section anchors, previous, and next navigation with mouse and keyboard.

## Task 12: Build the Freight case study

### Files

- Create `components/case-studies/freight-case-study.tsx`
- Create `components/case-study/visuals/freight-architecture.tsx`
- Add verified media under `public/media/freight/`

### Implementation

1. Follow the approved narrative: operational problem, data/warehouse design, realistic shipment generation, KPI/anomaly system, validation/results, limitations.
2. Use existing repository screenshots only if they are legible and accurately labelled.
3. Build one architecture visual that connects source distributions, generated shipments, dimensional model, KPIs, anomaly detection, and dashboard outputs.
4. Clearly distinguish real FAF5 source distributions from synthetic shipments.
5. Attribute actual detection and test results to repository evidence.
6. State Abhay’s contribution and the project’s operational decision explicitly.

### Verify

- Cross-check every numeric claim against the repository README/artifacts.
- Confirm the architecture visual is comprehensible without animation.
- Confirm screenshots have useful alt text or explanatory captions.

## Task 13: Build the Retail case study

### Files

- Create `components/case-studies/retail-case-study.tsx`
- Create `components/case-study/visuals/retail-data-generator.tsx`
- Add verified media under `public/media/retail/`

### Implementation

1. Follow the approved narrative: realism challenge, data behavior, forecast architecture/evaluation, inventory translation, interface, caveats.
2. Make the data-generation effort the editorial center of the case study.
3. Diagram seasonality, hierarchy, promotions, intermittency, and stock behavior only when supported by the project implementation.
4. Explain the simplified WRMSSE caveat adjacent to the score; do not imply official leaderboard comparability.
5. Clearly identify any synthetic starting inventory or synthetic inputs.
6. Use real dashboard imagery where it communicates better than reconstruction.

### Verify

- Cross-check the WRMSSE value and caveat against repository documentation.
- Confirm generated versus source data is labelled consistently.
- Confirm the story does not collapse into another anomaly-monitoring project.

## Task 14: Build the LoanSurv case study

### Files

- Create `components/case-studies/loansurv-case-study.tsx`
- Create `components/case-study/visuals/survival-comparison.tsx`
- Add verified media under `public/media/loansurv/`

### Implementation

1. Follow the approved narrative: framing, censoring/time-to-event, model comparison, evaluation, interactive product, limitations.
2. Explain Cox and Random Survival Forest in decision-oriented language.
3. Use verified C-index and Brier results with clear labels.
4. Show the live product interface and survival curve behavior.
5. Use the resolved dataset count consistently across homepage, case study, metadata, and captions.

### Verify

- Cross-check every metric against the repository README/artifacts.
- Confirm the live demo loads publicly before showing the demo action.
- Confirm the curve visual and horizon labels remain readable on mobile.

## Task 15: Build the CareTarget case study

### Files

- Create `components/case-studies/caretarget-case-study.tsx`
- Move/refactor `components/causal-system-diagram.tsx` to `components/case-study/visuals/caretarget-causal-system.tsx`
- Add verified media under `public/media/caretarget/`

### Implementation

1. Follow the approved narrative: risk versus benefit, cohort limitations, methods, tiers/fairness, walkthrough, evidence boundaries.
2. Reuse the useful causal-system explanation only after restyling it into the new project world.
3. Include actual risk, Brier, uplift, and survival metrics with plain-language interpretation.
4. Place observational-data limitations adjacent to the treatment-effect claims.
5. Use a recorded or reconstructed public-safe interface walkthrough until a reliable public deployment exists.
6. Do not show a live-demo action while the deployment is gated.

### Verify

- Cross-check all metrics and dataset statements against repository documentation.
- Confirm the page never describes the project as clinically validated.
- Confirm `risk` and `benefit` are not conflated anywhere in copy or visuals.

## Task 16: Add experience detail behavior

### Files

- Create `app/experience/[slug]/page.tsx`
- Create `components/experience/experience-report.tsx`
- Modify `lib/experience.ts`
- Modify `styles/case-study.css`

### Implementation

1. Generate experience routes only for entries with approved public content.
2. Build P&G as a confidentiality-aware report covering problem, contribution, workflow, confidence gating, and confirmed outcomes.
3. Build Tayo AI only after the content truth gate is satisfied.
4. Keep the earlier internship on the homepage only.
5. Use a shared editorial shell without making experience pages look like project cards.

### Verify

- Confirm missing/unapproved experience slugs return 404 rather than filler.
- Confirm no proprietary variable, threshold, implementation, or employer-sensitive detail is exposed.
- Cross-check all public outcomes with the user’s confirmation.

## Task 17: Remove obsolete presentation code

### Files

- Delete `components/decision-engine.tsx`
- Delete `components/project-row.tsx`
- Delete `components/reveal.tsx` if the new system no longer imports it
- Delete old `components/case-study-nav.tsx` after its replacement is active
- Delete or refactor `components/causal-system-diagram.tsx` after CareTarget migration
- Remove obsolete selectors from all stylesheets

### Implementation

1. Use `rg` to prove each old component is unreferenced before deleting it.
2. Remove generic lab/operator/signal terminology from user-facing copy unless it describes a real project.
3. Remove unused types, content arrays, classes, and animation keyframes.
4. Preserve unrelated configuration and user-owned files.

### Verify

- Run `rg 'DecisionEngine|ProjectRow|operator|Explore the lab|page-grid|--paper' app components lib styles` and inspect every remaining match.
- Run `npm run lint`, `npm run typecheck`, and `npm run build`.

## Task 18: Responsive, accessibility, and interaction QA

### Files

- Modify affected components and styles only when a verified issue is found

### Implementation

1. Run the production build locally.
2. Inspect representative widths:
   - 1440 × 900 desktop
   - 1024 × 768 tablet/compact desktop
   - 390 × 844 mobile
3. Verify:
   - no horizontal overflow
   - readable flagship media and titles
   - mobile menu behavior
   - case-study index conversion
   - image/media loading states
   - external link behavior
4. Keyboard-test the entire homepage and one full case-study route.
5. Emulate reduced motion and verify static previews/direct navigation.
6. Inspect browser console for hydration, image, and animation errors.
7. Check color contrast and heading/landmark structure.
8. Confirm preview animations pause outside the viewport.

### Verify

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Browser screenshots at all three widths
- Browser console contains no errors attributable to the application
- Document any unavailable live-demo or unresolved content checks in the handoff

## Task 19: Final content and visual review

### Files

- Modify content and style files only for issues discovered during review

### Implementation

1. Compare the completed site against the approved design spec and all ten acceptance criteria.
2. Verify that each flagship can be identified from its preview without relying on the title.
3. Verify Freight and Retail have distinct stories and motion languages.
4. Remove any generic AI-portfolio phrasing, ornamental component, or duplicated interaction that survived implementation.
5. Confirm all GitHub/demo/resume/contact links.
6. Record what was validated and what still depends on the user or an external deployment.

### Verify

- Repeat lint, typecheck, and production build after final edits.
- Perform a final desktop and mobile visual pass.
- Do not declare completion while content gates or broken internal routes remain unreported.

## Execution handoff

Execute this plan inline with the `executing-plans` skill. Do not use subagents unless the user explicitly changes the collaboration request. Implement in vertical slices so the user can review the homepage foundation and first flagship preview before all case-study content is completed.
