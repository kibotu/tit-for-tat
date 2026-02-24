# Always Defect

**Built-in** · **Tournament rank: #5** (score: ~2809)

## Goal

The pure egoist. Defect every round, maximizing short-term gain. In a single-round
game this would be the Nash equilibrium. In an iterated game, it tests whether
opponents can punish sustained defection.

## How it works

1. Return "D" every round. Ignore history completely.

## Head-to-head results (200 rounds)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Cooperate | 1000 | 0 | Domination — 200 rounds of 5 vs 0 |
| Random | ~596 | ~101 | Win — exploits every cooperative round |
| Tit for Tat | 204 | 199 | Slight win — sucker punch round 0, then mutual D |
| Grudger | 204 | 199 | Slight win — same pattern |
| Pavlov | 600 | 100 | Win — Pavlov keeps switching, gets exploited |
| Tit for Two Tats | 208 | 198 | Slight win — 2 free rounds, then mutual D |

## Why it ranks #5

Always Defect **wins or ties every single matchup** — it never loses head-to-head. Yet
it ranks only #5 because its wins are mostly narrow (204 vs 199) while Grudger's ties
are at 600. Against retaliatory strategies, mutual defection yields only 1 point per
round. The massive win against Always Cooperate (1000) and Pavlov (600) isn't enough
to compensate for the 199-point ceiling against 3 other opponents.

## Pros

- **Never loses a matchup** — always scores ≥ opponent in head-to-head.
- **Maximally exploits cooperators** — 1000 points against Always Cooperate.
- **Simple** — no logic, no state.
- **Dominant in single-round games** — Nash equilibrium strategy.

## Cons

- **Destroys cooperation** — forces mutual defection (1/round) against smart opponents.
- **Low ceiling** — 199–204 against retaliatory strategies, far below the 600 from
  mutual cooperation.
- **Poor tournament performance** — wins matchups but loses the tournament because
  small margins don't compensate for the cooperation it forfeits.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  return "D";
}
```
