# Grudger (Grim Trigger)

**Built-in** · **Tournament rank: #1** (score: ~3188)

## Goal

Cooperate in good faith, but if the opponent **ever** defects — even once — defect
forever. Zero tolerance. No forgiveness. Also known as "Grim Trigger" or
"Friedman" strategy.

## How it works

1. **Cooperate** on the first round.
2. If the opponent has defected in **any** previous round, **defect forever**.
3. Otherwise, cooperate.

## Head-to-head results (200 rounds)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Cooperate | 600 | 600 | Tie — mutual cooperation throughout |
| Always Defect | 199 | 204 | Loss — suckered round 0, then mutual defection |
| Random | ~573 | ~113 | Win — first D triggers permanent punishment |
| Tit for Tat | 600 | 600 | Tie — mutual cooperation throughout |
| Pavlov | 600 | 600 | Tie — mutual cooperation throughout |
| Tit for Two Tats | 600 | 600 | Tie — mutual cooperation throughout |

## Why it ranks #1

Grudger achieves the maximum cooperative score (600) against 4 opponents, identical to
TFT. The difference is against Random: Grudger triggers on the very first defection
(usually round 1–2) and then plays D forever, averaging 3 points/round against
Random's 50/50 mix (0.5×5 + 0.5×1 = 3). TFT mirrors Random's moves and averages
only ~2.25/round. This ~125-point edge against Random pushes Grudger to #1.

## Pros

- **Nice** — cooperates first, never triggers retaliation from other nice strategies.
- **Maximally punitive** — a single defection costs the opponent all future cooperation.
  This is the strongest possible deterrent.
- **Simple** — trivial to implement and understand.
- **Tournament winner** — #1 in this specific field.

## Cons

- **Unforgiving** — a single accidental defection triggers permanent mutual defection.
  In a noisy environment, this is catastrophic.
- **Can never recover** — even if the opponent reforms and cooperates, Grudger keeps
  defecting, losing 2 points per round vs mutual cooperation.
- **Fragile to noise** — the most noise-sensitive strategy in the field.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "C";
  for (let i = 0; i < theirs.length; i++) {
    if (theirs[i] === "D") return "D";
  }
  return "C";
}
```
