export const currentBuild = {
  title: "Colonist 1v1 Ranked Bot",
  status: "In progress since Jul 2026 · private repository",
  premise:
    "An AI for Colonist.io's ranked 1v1 Catan: 15 victory points, two players, bank and port trades only, balanced dice. It runs on a fork of the open-source Catanatron engine with the ranked rules rebuilt.",
  headline: {
    value: "74%",
    label: "Paired score against Catanatron's depth-2 AlphaBeta bot over 400 mirrored pairs (800 games)",
    note: "Paired improvement interval +21 to +27 points; identity control exactly 50%. Simulator result, not a ranked-ladder result.",
  },
  built: [
    "Ranked-rules engine fork with 15 VP and balanced dice, plus an evaluation that estimates the opponent's hidden victory points.",
    "A search player whose evaluation weights come from five independent searches; their consensus is the frozen champion.",
    "A promotion harness with mirrored seats, common random numbers, an identity control arm, and preregistered gates, with heavy runs on Kaggle.",
    "A hidden-information layer that tracks which opponent hands are still possible after discards, steals, and Monopolies, checked across 9,515 simulated actions.",
    "A video pipeline that turned 165 recorded ranked videos into 519 segmented games and recovered the winner in 472 of them.",
  ],
  stuck: [
    "Nothing has beaten the champion since August. Opening minimax scored 51.75% over 200 held-out pairs, a strategy-package arm 33/64, and phase-specific weights lost outright.",
    "Single-decision outcome labels drown in rollout noise: one trade comparison swung from +0.97 to −1.00 VP between seed halves, so learning a value function from simulated outcomes failed its gate.",
    "Simulator strength is not ranked strength. The bot is not connected to live Colonist games, and what a real player can see has not been fully modelled.",
  ],
  next: "Testing whether the choice between maritime trades—which build each trade unlocks—changes outcomes. The selection gate passed on 32 of 32 roots; the outcome pilot is frozen and ready to run.",
  stats: "≈27.5k lines of Python · 175 test files · 463 commits",
} as const;
