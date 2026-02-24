# Hard Majority

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Decide based on the **overall trend** of the opponent's behavior. Defect if the
opponent has defected at least as much as they've cooperated; cooperate otherwise.
Start pessimistic (defect first).

## How it works

1. **Defect** on the first round.
2. Count the opponent's total cooperations and defections.
3. If cooperations **exceed** defections, cooperate. Otherwise, defect.

## Why it doesn't win here

The opening defection triggers permanent retaliation from Grudger, and since Grudger
is the top-scoring built-in strategy, losing that matchup (~400 points) is fatal.
Against TFT the opening defection also causes initial friction. The trend-based
approach doesn't provide enough upside against the remaining opponents to compensate.

## Pros

- **Trend-based** — not fooled by a single round of cooperation after many defections.
- **Noise-resistant** — a single random defection won't flip the decision.

## Cons

- **Not nice** — defects first, triggering Grudger's permanent retaliation.
- **Slow to adapt** — takes many defections to flip after a long cooperation streak.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "D";
  let coopCount = 0;
  for (let i = 0; i < theirs.length; i++) {
    if (theirs[i] === "C") coopCount++;
  }
  return coopCount > theirs.length / 2 ? "C" : "D";
}
```
