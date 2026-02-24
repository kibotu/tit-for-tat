# Adaptive

## Goal

Start with a **predetermined probing sequence** to test the opponent's nature, then
switch to the most profitable response. The probe phase plays a mix of C and D to
gather data, then commits to whichever pure strategy (Always Cooperate or Always
Defect) would have earned more points against the opponent's observed behavior.

## How it works

1. Play a fixed opening sequence for the first 10 rounds:
   `C, C, C, C, C, D, D, D, D, D` (5 cooperations followed by 5 defections).
2. After round 10, calculate:
   - **Hypothetical cooperation score**: how many points you'd have earned by always
     cooperating against the opponent's actual history.
   - **Hypothetical defection score**: how many points you'd have earned by always
     defecting against the opponent's actual history.
3. If cooperation would have earned more, **cooperate**. Otherwise, **defect**.

## Pros

- **Data-driven** — makes an informed decision based on actual opponent behavior.
- **Exploits predictable opponents** — locks into Always Defect against cooperators
  if defection scores higher, or cooperates with fellow cooperators.
- **Simple decision after probe** — no complex state tracking after round 10.

## Cons

- **Rigid probe phase** — the 10-round opening is fixed and potentially wasteful;
  sophisticated opponents can detect and counter the probe.
- **Binary choice** — after probing, it commits entirely to C or D with no middle
  ground. Can't handle opponents who change behavior mid-game.
- **Not nice** — defects during rounds 6–10, triggering retaliation from TFT and
  similar strategies.
- **Loses points during probe** — the 5 defection rounds cost mutual cooperation
  points.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  // Probe phase: 5xC then 5xD
  const probe = ["C","C","C","C","C","D","D","D","D","D"];
  if (round < 10) return probe[round];

  // Calculate hypothetical scores
  let coopScore = 0;
  let defectScore = 0;
  for (let i = 0; i < theirs.length; i++) {
    coopScore  += theirs[i] === "C" ? 3 : 0;  // R or S
    defectScore += theirs[i] === "C" ? 5 : 1;  // T or P
  }
  return coopScore >= defectScore ? "C" : "D";
}
```
