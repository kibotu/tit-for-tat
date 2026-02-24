# Soft Majority

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Like Hard Majority, but **optimistic**: cooperate first and cooperate whenever
the opponent has cooperated at least as much as they've defected.

## How it works

1. **Cooperate** on the first round.
2. Count the opponent's total cooperations and defections.
3. If cooperations **≥** defections, cooperate. Otherwise, defect.

## Why it doesn't win here

Soft Majority is nice (cooperates first), so it doesn't lose against Grudger the way
Hard Majority does. However, it's **too slow to punish**: an opponent can defect
several times before the balance tips. Against Always Defect, it takes 1 round to
react (good), but against alternating strategies it can be exploited for a long time.
Against the existing opponent pool it scores close to TFT but not better than Grudger,
because Grudger's permanent punishment extracts more value against defectors.

## Pros

- **Nice** — cooperates first, no retaliation from Grudger.
- **Trend-based** — evaluates overall behavior, noise-resistant.

## Cons

- **Slow to punish** — needs multiple defections before retaliating.
- **Exploitable** — alternating C/D keeps the ratio balanced while extracting surplus.
- **No edge over Grudger** — in this specific field.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "C";
  let coopCount = 0;
  for (let i = 0; i < theirs.length; i++) {
    if (theirs[i] === "C") coopCount++;
  }
  return coopCount >= theirs.length / 2 ? "C" : "D";
}
```
