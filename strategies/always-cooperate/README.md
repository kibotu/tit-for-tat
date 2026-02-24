# Always Cooperate

**Built-in** · **Tournament rank: #6** (score: ~2696)

## Goal

The ultimate pacifist. Cooperate unconditionally, every round, no matter what the
opponent does. Represents blind trust and is the theoretical maximum for collective
welfare — if both players did this, they'd maximize total points.

## How it works

1. Return "C" every round. Ignore history completely.

## Head-to-head results (200 rounds)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Defect | 0 | 1000 | Catastrophic loss — 200 rounds of 0 vs 5 |
| Random | ~285 | ~810 | Loss — every opponent D costs 0 while they get 5 |
| Tit for Tat | 600 | 600 | Tie — mutual cooperation throughout |
| Grudger | 600 | 600 | Tie — mutual cooperation throughout |
| Pavlov | 600 | 600 | Tie — mutual cooperation throughout |
| Tit for Two Tats | 600 | 600 | Tie — mutual cooperation throughout |

## Why it ranks #6

Always Cooperate achieves perfect scores (600) against every cooperative strategy. But
it's **catastrophically exploited** by Always Defect (0 points — the worst possible
matchup in the tournament) and heavily punished by Random (~285). These two matchups
alone cost it ~1000+ points compared to Grudger.

## Pros

- **Maximizes mutual welfare** — if both cooperate, both get 3/round (the Pareto optimum).
- **Perfect against nice strategies** — scores 600 against TFT, Grudger, Pavlov, TF2T.
- **Dead simple** — no logic, no state, no bugs.

## Cons

- **Maximally exploitable** — any defector gets 5 per round for free, forever.
- **0 points against Always Defect** — the worst possible single-matchup score.
- **No learning** — never adapts, never punishes, invites exploitation.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  return "C";
}
```
