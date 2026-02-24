# Pavlov (Win-Stay, Lose-Shift)

**Built-in** · **Tournament rank: #4** (score: ~2949)

## Goal

Use a simple reinforcement learning rule: if your last move scored well (3 or 5
points), **repeat it**. If it scored poorly (0 or 1 points), **switch**. This creates
adaptive behavior without explicitly tracking opponent patterns.

## How it works

1. **Cooperate** on the first round.
2. Look at your last move and the opponent's last move:
   - If they were the **same** (both C or both D), cooperate.
   - If they were **different** (one C, one D), defect.

The logic: CC → 3 points (good, stay with C) → C. DD → 1 point (bad, shift from D) → C.
CD → 0 points (bad, shift from C) → D. DC → 5 points (good, stay with D) → D.

## Head-to-head results (200 rounds)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Cooperate | 600 | 600 | Tie — mutual cooperation throughout |
| Always Defect | 100 | 600 | Loss — alternates C/D, Always Defect exploits |
| Random | ~428 | ~473 | Loss — noise confuses the switching logic |
| Tit for Tat | 600 | 600 | Tie — mutual cooperation throughout |
| Grudger | 600 | 600 | Tie — mutual cooperation throughout |
| Tit for Two Tats | 600 | 600 | Tie — mutual cooperation throughout |

## Why it ranks #4

Pavlov has a catastrophic weakness against Always Defect: it alternates C-D-C-D
forever (cooperate → get suckered → switch to D → mutual defection → switch to C →
repeat). This yields only 100 points over 200 rounds. It also loses slightly to
Random. These two matchups drag it below Grudger and TFT.

## Pros

- **Nice** — cooperates first.
- **Self-correcting** — recovers from mistakes without explicit forgiveness logic.
- **Can exploit unconditional cooperators** — in theory (though here it just cooperates
  back since CC is "good").
- **Elegant** — the simplest possible reinforcement learning rule.

## Cons

- **Catastrophic against Always Defect** — alternating C-D scores only 100 points (vs
  Grudger's 199).
- **Confused by Random** — the switching logic produces erratic behavior against noise.
- **Less robust** than Grudger or TFT in this opponent field.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (mine.length === 0) return "C";
  var lastMine = mine[mine.length - 1];
  var lastTheirs = theirs[theirs.length - 1];
  return lastMine === lastTheirs ? "C" : "D";
}
```
