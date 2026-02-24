# Prober

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Sneak in an early defection to test if the opponent retaliates. If they don't,
exploit them forever. If they do, fall back to Tit for Tat.

## How it works

1. **Round 0**: Cooperate.
2. **Round 1**: Defect (the probe).
3. **Round 2**: Cooperate.
4. If the opponent cooperated on both rounds 1 and 2, **always defect** (exploit).
5. Otherwise, play **Tit for Tat**.

## Why it doesn't win here

The round-1 defection triggers Grudger's permanent retaliation (198 rounds of mutual
defection = 198 points vs 600 for mutual cooperation). This single probe costs ~400
points against Grudger alone. Against TFT, Prober correctly falls back to TFT, but
the probe still costs a few points. The exploitation of Always Cooperate (~1000 points)
doesn't compensate.

## Pros

- **Identifies pushovers** — detects and exploits unconditional cooperators.
- **Safe fallback** — reverts to TFT against retaliatory opponents.

## Cons

- **Catastrophic against Grudger** — single probe triggers permanent defection.
- **Not nice** — defects on round 1.
- **Permanent commitment** — once exploiting, never reconsiders.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (round === 0) return "C";
  if (round === 1) return "D";
  if (round === 2) return "C";

  if (theirs[1] === "C" && theirs[2] === "C") {
    return "D";
  }
  return theirs[theirs.length - 1];
}
```
