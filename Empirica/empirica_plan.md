# Empirica Plan: Lean Prisoner's Dilemma Replication of Social Networking Agency

Status: design approved 2026-08-08, not yet implemented.

## 1. Purpose

This is Project 1 of a 3-project portfolio thread being built to strengthen an
application for an Aalto University postdoc position ("Social networking in
the era of artificially intelligent agents," funded by the Research Council
of Finland). The posting asks for experience with: (1) online experiments via
Empirica or similar, (2) AI-agent social simulations via Concordia or
similar, (3) Python for simulation, visualization, and causal inference.

The three projects form one connected research thread, all built on the same
paradigm:

1. **Empirica replication** (this document) — a lean, bot-driven Empirica
   implementation of a single economic game from a real published paradigm.
2. **Concordia mirror** — an LLM-agent simulation of the same paradigm, for
   comparison against the Empirica bot-play data.
3. **Python causal-inference comparison** — analysis comparing the
   human-paradigm-shaped Empirica data against the Concordia agent data.

None of these projects involve collecting data from real human participants.
They are ready-to-implement demonstrations of methodological competence, not
an active research study.

## 2. Source study

Jia, D., Romić, I., Shi, L., Su, Q., Liu, C., Liu, J., Holme, P., Li, X., &
Wang, Z. (2025). Social networking agency and prosociality are inextricably
linked in economic games. *Nature Human Behaviour*, 9, 2620–2631.
https://doi.org/10.1038/s41562-025-02289-0

The paper ran three repeated economic games on lattice networks — prisoner's
dilemma, trust game, and ultimatum game — each contrasting **constrained**
players (who must act identically toward every neighbor) against **free**
players (who can act differently toward each individual neighbor). Granting
players this "social networking agency" universally increased cooperation,
trust, and fairness across all three games.

This plan scopes down to **the prisoner's dilemma only**, kept lean:

- One game, not three.
- Two treatment arms (all-constrained vs. all-free), not the paper's five
  population-mix arms (0/25/50/75/100% free).
- A 3×3 toroidal lattice (9 players), not the paper's 7×7 (49 players).
- Bot self-play, not real recruited participants.

## 3. Experimental design

**Game.** Repeated prisoner's dilemma, one game instance = one full run
against all neighbors, over 10 rounds by default (configurable factor).

**Network.** 3×3 toroidal (wraparound) square lattice. Each player has
exactly 4 neighbors (N/S/E/W), computed once in `onGameStart` and stored per
player as `player.set("neighbors", [...])`.

**Payoffs** (from Fig. 1A of the paper):

| Focal action | Neighbor action | Focal payoff | Neighbor payoff |
|---|---|---|---|
| Cooperate | Cooperate | 4 | 4 |
| Cooperate | Defect | −2 | 6 |
| Defect | Cooperate | 6 | −2 |
| Defect | Defect | 0 | 0 |

Payoffs per player per round are the sum across all 4 neighbor interactions.

**Player types.**

- **Constrained**: chooses one action (C or D) each round, applied
  identically to all 4 neighbors.
- **Free**: chooses an action independently for each of its 4 neighbors each
  round.

**Treatments** (`.empirica/treatments.yaml`):

- `AllConstrained` — control group, `playerType: constrained` for all 9
  players.
- `AllFree` — treatment group, `playerType: free` for all 9 players.

Factors: `playerCount` (fixed at 9), `playerType`, `rounds` (default 10).

## 4. Bot phenotypes and self-play mechanics

Bots run entirely server-side — no browsers, no human clicks. Each Empirica
`Player` object is real (appears in the admin panel, exports normally to
CSV), but its move is computed and submitted by the server itself.

At `onGameStart`, each player is assigned a phenotype, sampled from
proportions reported in the paper (Results, "Behavioural phenotypes"):

- **All-free population**: ~57% conditional (tit-for-tat: mirrors each
  neighbor's previous-round move, cooperates on round 1), ~36% prosocial
  (cooperates with high fixed probability, e.g. 0.9), ~7% antisocial (defects
  with high fixed probability, e.g. 0.9).
- **All-constrained population**: ~84% antisocial, remainder split evenly
  between prosocial and conditional (exact split not broken out in the
  paper's reported figures — approximated as an even split for this demo).

Constrained bots apply their phenotype's logic once per round (single
decision, e.g. a conditional-constrained bot mirrors the majority of its
neighbors' previous moves). Free bots apply their phenotype's logic
independently per neighbor.

Mechanics, per round, in `onRoundStart`/`onStageStart`:

1. Server computes each bot's move(s) from its phenotype and current
   neighbor history.
2. Server calls `player.round.set("moves", {...})` and
   `player.round.set("submit", true)` to advance the round without waiting
   for any human input.
3. `onRoundEnded` computes and stores payoffs per player from the payoff
   table above.

This is a deliberate simplification of Empirica's normal flow (built for
real human players submitting through the React client) but exercises the
same server-side API — `Game`/`Round`/`Stage`/`Player` objects, `.set()`/
`.get()`, `treatments.yaml`, lifecycle callbacks — that a real human-facing
study would use. The client UI can stay minimal (a spectator/log view), since
no human input is required to drive the game.

## 5. Implementation architecture (sketch)

Separate repo, outside `WebsiteW`, scaffolded via `empirica create`:

```
empirica-social-agency-pd/
├── .empirica/
│   └── treatments.yaml       # AllConstrained / AllFree factors
├── server/
│   └── src/
│       ├── index.js          # lifecycle callbacks (onGameStart, onRoundStart, onRoundEnded, ...)
│       ├── lattice.js        # 3x3 toroidal neighbor computation
│       ├── phenotypes.js     # bot decision logic (conditional/prosocial/antisocial)
│       └── payoffs.js        # PD payoff table lookup
└── client/
    └── src/                 # minimal spectator view (optional for this use case)
```

`empirica_plan.md` (this document) stays in `WebsiteW/Empirica/` as the
planning artifact. Once built, the code repo is linked from the site's
Projects section the same way Scroll Master and Market Shift & FVG are.

## 6. Data output and handoff to Project 3

Run plan: script `empirica` to auto-run N replicate games per treatment (20
`AllConstrained` + 20 `AllFree` games) back-to-back, no manual intervention.

`empirica export` produces `players.csv` and `rounds.csv`, with per-player,
per-round cooperation frequency and payoff, tagged by treatment
(`playerType`) and phenotype. This becomes the "human-paradigm" dataset that
Project 3's causal-inference analysis compares against the Concordia
agent-simulation data from Project 2 — e.g., estimating the treatment effect
of `playerType` (free vs. constrained) on cooperation rate, and comparing
that estimate across the Empirica-bot and Concordia-agent data sources.

## 7. Non-goals

- No real human participant recruitment.
- No IRB/ethics review (not applicable — no human subjects).
- No production deployment or public participant-facing link.
- No replication of the trust game or ultimatum game (out of scope for this
  project; could be a future extension).
- No dynamic network rewiring (the paper's "free" condition is about
  differentiated actions per neighbor on a fixed lattice, not about changing
  who is connected to whom).

## 8. Rough build timeline (within the 10-day window)

- **Day 1–2**: Empirica install, scaffold project, work through official
  tutorial, get a trivial 2-player game running end to end.
- **Day 3–4**: Implement lattice/neighbor logic, payoff table, treatments.yaml.
- **Day 5–6**: Implement bot phenotypes and server-side auto-submit flow for
  both constrained and free player types.
- **Day 7**: Run replicate games across both treatments, validate exported
  data reproduces the expected direction of effect (free > constrained
  cooperation).
- **Day 8**: Write README, clean up code, prepare for site/GitHub linking.
- **Day 9–10**: Buffer / carry into Project 2 (Concordia) scoping.
