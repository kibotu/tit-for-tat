# Suspicious Tit for Tat (STFT)

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Test whether the opponent is a pushover by **defecting first**, then mirror their
moves just like regular Tit for Tat.

## How it works

1. **Defect** on the first round.
2. From round 2 onward, copy whatever the opponent did last round.

## Why it doesn't win here

The opening defection triggers retaliation from Grudger (permanent), TFT (one round),
and others. Against Grudger, this creates mutual defection for 199 rounds (199 points
instead of 600). Against TFT, it creates an alternating D-C-D-C pattern that averages
2.5 per round instead of 3. The 5-point first-round bonus against cooperators doesn't
compensate for the massive losses against retaliatory strategies.

## Pros

- **Exploits naive cooperators** — gains 5 points in the opening move.
- **Simple** — easy to understand.

## Cons

- **Not nice** — triggers retaliation from most good strategies.
- **Catastrophic against Grudger** — loses ~400 points vs mutual cooperation.
- **Poor total score** — first-round advantage doesn't compensate.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length === 0) return "D";
  return theirs[theirs.length - 1];
}
```
