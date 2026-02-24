# Generous Tit for Tat (GTFT)

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Fix Tit for Tat's biggest weakness: **noise sensitivity**. When a single accidental
defection triggers an endless `D-D-D-D` retaliation spiral, both players lose. GTFT
breaks these spirals by occasionally forgiving a defection.

## How it works

1. **Cooperate** on the first round.
2. If the opponent cooperated last round, **cooperate**.
3. If the opponent defected last round, **cooperate anyway with ~10% probability**;
   otherwise defect.

## Why it doesn't win here

This tournament has **no noise** — moves are never mis-executed. GTFT's forgiveness
is its strength in noisy environments, but here it only helps opponents who defect on
purpose. The random forgiveness occasionally lets Always Defect and Random steal free
points, dragging the total score down compared to Grudger's zero-tolerance approach.

## When it WOULD win

Add noise to the simulation (e.g., 5% chance any move flips). GTFT would dominate
because Grudger and TFT would spiral into permanent mutual defection after a single
random flip, while GTFT recovers.

## Pros

- **Noise-resistant** — breaks retaliation spirals (irrelevant in this tournament).
- **Still retaliatory** — punishes consistent defection 90% of the time.
- **Nice** — never defects first.
- **Outperforms TFT** in noisy environments (Nowak & Sigmund, 1992).

## Cons

- **Slightly exploitable** — a defector gets forgiven ~10% of the time.
- **Randomness** — outcomes vary between runs.
- **No advantage without noise** — in a clean tournament, the forgiveness only hurts.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "C";
  if (theirs[theirs.length - 1] === "C") return "C";
  // Forgive with ~10% probability
  return Math.random() < 0.1 ? "C" : "D";
}
```
