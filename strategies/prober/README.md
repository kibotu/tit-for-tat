# Prober

## Goal

Test whether the opponent retaliates by sneaking in an early defection. If they
don't punish it, switch to full exploitation (Always Defect). If they do punish,
fall back to Tit for Tat behavior.

## How it works

1. **Round 1**: Cooperate.
2. **Round 2**: Defect (the probe).
3. **Round 3**: Cooperate.
4. If the opponent cooperated on **both** rounds 2 and 3 (didn't punish the probe),
   treat them as exploitable — **always defect** from now on.
5. Otherwise, play **Tit for Tat** (copy opponent's last move).

## Pros

- **Identifies pushovers** — detects unconditional cooperators and exploits them for
  maximum points.
- **Falls back safely** — against retaliatory opponents, settles into TFT which is
  a proven strong strategy.
- **Only costs 1 round** — the probe is a single defection, minimizing the damage
  if the opponent is retaliatory.

## Cons

- **Not nice** — defects on round 2, which triggers retaliation from TFT, Grudger, etc.
- **Can misread** — if TFT-like opponents retaliate on round 3 (mirroring the round-2
  defection), Prober correctly falls back. But against Tit for Two Tats, the single
  probe isn't punished, and Prober wrongly assumes exploitation is safe.
- **Permanent commitment** — once it decides to exploit, it never goes back. If it
  misjudged, it's stuck defecting against an opponent who would have cooperated.
- **Loses to Grudger** — the round-2 defection triggers permanent retaliation.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  // Opening probe sequence
  if (round === 0) return "C";
  if (round === 1) return "D";
  if (round === 2) return "C";

  // After probe: did opponent cooperate on rounds 2 and 3?
  if (theirs[1] === "C" && theirs[2] === "C") {
    return "D"; // exploit
  }

  // Otherwise fall back to Tit for Tat
  return theirs[theirs.length - 1];
}
```
