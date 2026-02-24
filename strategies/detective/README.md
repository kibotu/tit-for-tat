# Detective

## Goal

Run a 4-round diagnostic sequence to classify the opponent, then choose the best
counter-strategy. Made famous by Nicky Case's *The Evolution of Trust* interactive.

## How it works

1. Play a fixed 4-round opening: **C, D, C, C**.
2. Observe the opponent's responses during these 4 rounds.
3. **If the opponent never defected** during the opening → they're a pushover →
   **Always Defect** for the rest of the game.
4. **If the opponent defected at least once** during the opening → they're retaliatory
   → play **Tit for Tat** for the rest of the game.

## Pros

- **Smart classification** — the 4-round probe is richer than Prober's single defection,
  giving a more reliable read.
- **Fully exploits naive cooperators** — extracts maximum points from Always Cooperate.
- **Safe fallback** — against competent opponents, reverts to TFT which is battle-tested.
- **Deterministic** — no randomness, fully reproducible results.

## Cons

- **Not nice** — defects on round 2, triggering retaliation from TFT and Grudger.
- **Binary classification** — only distinguishes "never defects" from "sometimes defects";
  can't handle nuanced strategies.
- **Permanent exploitation** — once it decides to exploit, it never reconsiders, even
  if the opponent is a forgiving strategy that would cooperate again.
- **Known weakness** — easily countered by anyone who recognizes the C-D-C-C pattern
  and retaliates specifically on round 2.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  // Diagnostic sequence
  const opening = ["C", "D", "C", "C"];
  if (round < 4) return opening[round];

  // Did opponent ever defect during the opening?
  const opponentRetaliates =
    theirs[0] === "D" || theirs[1] === "D" ||
    theirs[2] === "D" || theirs[3] === "D";

  if (opponentRetaliates) {
    // Tit for Tat fallback
    return theirs[theirs.length - 1];
  }

  // Exploit: always defect
  return "D";
}
```
