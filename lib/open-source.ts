export type ContributionStatus = "merged" | "in-review" | "open" | "fixed";

export type Contribution = {
  repo: string;
  number: number;
  kind: "Pull request" | "Issue";
  status: ContributionStatus;
  date: string;
  title: string;
  summary: string;
  url: string;
};

export type OpenProblem = {
  number: number;
  title: string;
  url: string;
};

export const statusLabels: Record<ContributionStatus, string> = {
  merged: "Merged",
  "in-review": "In review",
  open: "Open",
  fixed: "Fixed",
};

export const contributions: Contribution[] = [
  {
    repo: "unit8co/darts",
    number: 3243,
    kind: "Pull request",
    status: "merged",
    date: "Oct 2026",
    title: "Fix NegativeBinomialLikelihood parameter order for multivariate series",
    summary:
      "Multivariate negative binomial forecasts returned their parameters grouped by parameter instead of by component, so a named output could hold another component's value. Reordered them to match the base class.",
    url: "https://github.com/unit8co/darts/pull/3243",
  },
  {
    repo: "unit8co/darts",
    number: 3244,
    kind: "Pull request",
    status: "merged",
    date: "Oct 2026",
    title: "Fix single-parameter likelihoods training on the first sample of each batch only",
    summary:
      "Six single-parameter likelihoods, including Bernoulli, Exponential and Geometric, only learned from the first sample of every batch. Found while working on the negative binomial fix.",
    url: "https://github.com/unit8co/darts/pull/3244",
  },
  {
    repo: "unit8co/darts",
    number: 3246,
    kind: "Pull request",
    status: "merged",
    date: "Oct 2026",
    title: "Fix run_onnx_prediction for integer-indexed series",
    summary:
      "ONNX inference failed for any series with an integer index, even a plain model without covariates. Found while trying the new ONNX export on integer-indexed data.",
    url: "https://github.com/unit8co/darts/pull/3246",
  },
  {
    repo: "unit8co/darts",
    number: 3245,
    kind: "Pull request",
    status: "merged",
    date: "Oct 2026",
    title: "Add ZeroInflatedLikelihood",
    summary:
      "A wrapper that adds a per-component zero-inflation probability to any univariate likelihood, for series with many more zeros than the base distribution expects.",
    url: "https://github.com/unit8co/darts/pull/3245",
  },
  {
    repo: "sebp/scikit-survival",
    number: 654,
    kind: "Pull request",
    status: "in-review",
    date: "Oct 2026",
    title: "Fix cumulative incidence estimation with time_min",
    summary:
      "Recomputes the output length after the time_min filter and filters the counts behind all three variance estimators, with regression tests.",
    url: "https://github.com/sebp/scikit-survival/pull/654",
  },
  {
    repo: "unit8co/darts",
    number: 3239,
    kind: "Issue",
    status: "fixed",
    date: "Oct 2026",
    title: "NegativeBinomialLikelihood: wrong parameter order for multivariate series",
    summary: "The report behind the first merged fix.",
    url: "https://github.com/unit8co/darts/issues/3239",
  },
  {
    repo: "sebp/scikit-survival",
    number: 652,
    kind: "Issue",
    status: "open",
    date: "Oct 2026",
    title: "cumulative_incidence_competing_risks crashes with time_min",
    summary: "A broadcast error whenever time_min removes a time point. Fix proposed in #654.",
    url: "https://github.com/sebp/scikit-survival/issues/652",
  },
  {
    repo: "sebp/scikit-survival",
    number: 651,
    kind: "Issue",
    status: "open",
    date: "Oct 2026",
    title: "Unsorted times silently misalign 2D estimate columns in survival metrics",
    summary: "Several metrics sort times internally without reordering the estimate columns, so unsorted input returns wrong scores without an error.",
    url: "https://github.com/sebp/scikit-survival/issues/651",
  },
  {
    repo: "sebp/scikit-survival",
    number: 653,
    kind: "Issue",
    status: "open",
    date: "Oct 2026",
    title: "predict_proba raises IndexError for confidence intervals past the last time",
    summary: "Fails when the Kaplan–Meier curve reaches zero and a query time falls after the last observed time.",
    url: "https://github.com/sebp/scikit-survival/issues/653",
  },
];

export const maintained = {
  title: "Catanator",
  repo: "AbhayJuloori/catanator",
  url: "https://github.com/AbhayJuloori/catanator",
  summary:
    "A two-player Catan bot: a Rust engine checked move by move against the reference, a whole-turn planner, and a self-play-tuned evaluation. The open problems are written up as issues for anyone who wants to take one on.",
  problems: [
    { number: 1, title: "A value function that beats the tuned linear evaluation", url: "https://github.com/AbhayJuloori/catanator/issues/1" },
    { number: 2, title: "Opponent lookahead makes the bot weaker", url: "https://github.com/AbhayJuloori/catanator/issues/2" },
    { number: 3, title: "Passivity: it ends turns it should not end", url: "https://github.com/AbhayJuloori/catanator/issues/3" },
    { number: 4, title: "Development card strategy", url: "https://github.com/AbhayJuloori/catanator/issues/4" },
    { number: 5, title: "Opening resource coverage", url: "https://github.com/AbhayJuloori/catanator/issues/5" },
    { number: 6, title: "Measuring small gains cheaply", url: "https://github.com/AbhayJuloori/catanator/issues/6" },
  ] satisfies OpenProblem[],
};
