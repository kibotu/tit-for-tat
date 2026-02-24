# Gradual

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Punish defection **proportionally** rather than reflexively. The *N*-th time the
opponent defects, retaliate with *N* consecutive defections, then extend an olive
branch of 2 cooperations to signal willingness to reconcile.

## How it works

1. **Cooperate** on the first round.
2. Track total number of opponent defections (`defectCount`).
3. When the opponent defects, enter **punishment mode**: defect for `defectCount`
   rounds, then cooperate for 2 rounds (the olive branch).
4. Outside punishment mode, cooperate.

## Why it doesn't win here

Against the current opponent pool, Gradual's proportional punishment doesn't offer
enough advantage over Grudger's simpler permanent punishment. The olive branch
cooperations after punishing give opponents like Always Defect free points. And
against cooperative opponents (TFT, Grudger, Pavlov), Gradual scores identically
to Grudger (mutual cooperation throughout). The added complexity doesn't pay off.

## When it WOULD win

In tournaments with more "probe-and-reform" strategies that defect occasionally
but can be brought back to cooperation. Gradual punishes enough to deter, but
doesn't permanently lock into defection like Grudger does.

## Pros

- **Proportional** — punishment scales with offense severity.
- **Forgiving** — olive branch signals willingness to return to cooperation.
- **Nice** — never defects first.

## Cons

- **Complex state tracking** — harder to understand and debug.
- **Olive branch is exploitable** — forced cooperation rounds after punishment.
- **No advantage in this field** — simpler Grudger achieves the same or better.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "C";

  let punishRemaining = 0;
  let oliveRemaining = 0;
  let defectsSoFar = 0;

  for (let i = 0; i < theirs.length; i++) {
    if (punishRemaining > 0) {
      punishRemaining--;
      if (punishRemaining === 0) oliveRemaining = 2;
    } else if (oliveRemaining > 0) {
      oliveRemaining--;
    } else if (theirs[i] === "D") {
      defectsSoFar++;
      punishRemaining = defectsSoFar - 1;
      if (punishRemaining === 0) oliveRemaining = 2;
    }
  }

  if (punishRemaining > 0) return "D";
  if (oliveRemaining > 0) return "C";
  return "C";
}
```
