# Detective

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Run a 4-round diagnostic sequence (C, D, C, C) to classify the opponent, then
play the best counter-strategy. Made famous by Nicky Case's *The Evolution of Trust*.

## How it works

1. Play **C, D, C, C** for the first 4 rounds.
2. If the opponent **never defected** during the opening → always defect (exploit).
3. If the opponent **defected at least once** → play Tit for Tat.

## Why it doesn't win here

Same problem as Prober: the round-1 defection triggers Grudger's permanent retaliation.
Against Grudger, this means 196 rounds of mutual defection (196 points) instead of
200 rounds of cooperation (600 points). The ~400 point loss is devastating and can't
be recovered by exploiting Always Cooperate.

## Pros

- **Richer probe** — 4-round diagnostic is more informative than Prober's single defection.
- **Fully exploits naive cooperators** — maximum points against Always Cooperate.
- **Deterministic** — no randomness.

## Cons

- **Catastrophic against Grudger** — round-1 defection triggers permanent retaliation.
- **Binary classification** — only "never defects" vs "sometimes defects".
- **Known pattern** — easily countered if opponents recognize C-D-C-C.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  const opening = ["C", "D", "C", "C"];
  if (round < 4) return opening[round];

  const opponentRetaliates =
    theirs[0] === "D" || theirs[1] === "D" ||
    theirs[2] === "D" || theirs[3] === "D";

  if (opponentRetaliates) {
    return theirs[theirs.length - 1];
  }
  return "D";
}
```
