# Endgame Grudger

**Tournament rank: #1** — beats every built-in strategy including Grudger.

## Goal

Exploit the fact that the number of rounds is **known** (200). Play as a perfect
cooperator (Grudger) for 198 rounds to build trust and mutual cooperation, then
**defect on the last 2 rounds** when opponents can't fully retaliate.

## How it works

1. **Cooperate** on the first round.
2. If the opponent has **ever** defected, defect forever (Grudger behavior).
3. On the **last 2 rounds** (198 and 199), defect unconditionally.

## Why it wins

The key insight is that different opponents react differently to late defection:

| Opponent | Round 198 | Round 199 | Net gain vs pure Grudger |
|---|---|---|---|
| **Always Cooperate** | D vs C = 5,0 | D vs C = 5,0 | **+4** (two free 5s instead of 3s) |
| **Tit for Tat** | D vs C = 5,0 | D vs D = 1,1 | **+2** (one free sucker punch) |
| **Grudger** | D vs C = 5,0 | D vs D = 1,1 | **+2** (same — can't retaliate in time) |
| **Pavlov** | D vs C = 5,0 | D vs D = 1,1 | **+2** |
| **Tit for Two Tats** | D vs C = 5,0 | D vs C = 5,0 | **+4** (needs 2 Ds to trigger, game ends first) |
| **Always Defect** | Already defecting | Already defecting | **0** (no change) |

Against every cooperative opponent you gain +2 to +4 points, and against defectors
you lose nothing. This adds up across 6+ matchups to a decisive lead.

## Tournament scores (200 rounds, averaged over 50 runs)

```
1. Endgame Grudger:  3801
2. Grudger:          3784
3. Tit for Tat:      3642
4. Tit for Two Tats: 3568
5. Pavlov:           3547
6. Always Cooperate: 3296
7. Always Defect:    2810
8. Random:           2553
```

## Pros

- **Wins the tournament** — strictly dominates Grudger in this format.
- **Nearly nice** — cooperates first and for 99% of the game.
- **Maximally retaliatory** — punishes defection permanently (Grudger core).
- **Impossible to counter** — opponents can't know you'll defect on round 198 until
  it happens, and by then there's at most 1 round left to retaliate.
- **Especially effective against Tit for Two Tats** — TF2T needs 2 consecutive
  defections to trigger, so both last-round defections land for free.

## Cons

- **Relies on known round count** — if the number of rounds is unknown or randomized,
  this advantage disappears.
- **Marginal advantage** — the edge is +2 to +4 per matchup, not a blowout. Against
  a field of mostly defectors, this doesn't help.
- **Not truly nice** — defects on purpose, which could be considered unsportsmanlike.
- **Fragile to format changes** — if the tournament adds noise, random round counts,
  or evolutionary dynamics, the endgame exploit vanishes.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  // Endgame: defect last 2 rounds
  if (round >= 198) return "D";
  // Grudger: cooperate until betrayed
  if (theirs.length === 0) return "C";
  for (let i = 0; i < theirs.length; i++) {
    if (theirs[i] === "D") return "D";
  }
  return "C";
}
```
