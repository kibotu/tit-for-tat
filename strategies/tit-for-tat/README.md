# Tit for Tat

**Built-in** · **Tournament rank: #3** (score: ~3642)

## Goal

The most famous strategy in game theory. Cooperate first, then simply mirror
whatever the opponent did last round. Submitted by Anatol Rapoport, it won
Axelrod's original tournament and remains the benchmark for all others.

## How it works

1. **Cooperate** on the first round.
2. **Copy** the opponent's previous move on every subsequent round.

## Head-to-head results (200 rounds)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Cooperate | 600 | 600 | Tie — mutual cooperation throughout |
| Always Defect | 199 | 204 | Loss — suckered round 0, then mutual defection |
| Random | ~447 | ~447 | Tie — mirrors randomness |
| Grudger | 600 | 600 | Tie — mutual cooperation throughout |
| Pavlov | 600 | 600 | Tie — mutual cooperation throughout |
| Tit for Two Tats | 600 | 600 | Tie — mutual cooperation throughout |

## Why it ranks #3

TFT **never wins a single matchup** — it can only tie or lose. It ties every cooperative
strategy (600 each) and loses to Always Defect (199 vs 204, since it cooperates
first and gets suckered). Grudger scores identically against cooperators but punishes
defectors more aggressively, pulling ahead overall.

## Pros

- **Nice** — never defects first.
- **Retaliatory** — punishes defection immediately (1-round lag).
- **Forgiving** — returns to cooperation as soon as the opponent does.
- **Clear** — opponents can easily understand and adapt to it.
- **Robust** — performs well across wildly different opponent fields.

## Cons

- **Can never win a matchup** — at best ties any opponent.
- **Noise-sensitive** — one accidental defection causes D-D-D-D retaliation spiral.
- **Loses to Grudger** in this field — identical cooperative scores, but Grudger
  handles Always Defect equally and scores better against Random.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "C";
  return theirs[theirs.length - 1];
}
```
