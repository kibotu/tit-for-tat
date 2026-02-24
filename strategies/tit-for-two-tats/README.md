# Tit for Two Tats

**Built-in** · **Tournament rank: #3** (score: ~2966)

## Goal

A more forgiving variant of Tit for Tat. Only retaliate after the opponent defects
**twice in a row**. This prevents overreacting to a single accidental or exploratory
defection, at the cost of being slower to punish.

## How it works

1. **Cooperate** for the first 2 rounds unconditionally.
2. If the opponent defected on **both** of the last 2 rounds, **defect**.
3. Otherwise, **cooperate**.

## Head-to-head results (200 rounds)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Cooperate | 600 | 600 | Tie — mutual cooperation throughout |
| Always Defect | 198 | 208 | Loss — 2 free rounds for defector, then mutual D |
| Random | ~376 | ~606 | Loss — single Ds aren't punished, Random exploits |
| Tit for Tat | 600 | 600 | Tie — mutual cooperation throughout |
| Grudger | 600 | 600 | Tie — mutual cooperation throughout |
| Pavlov | 600 | 600 | Tie — mutual cooperation throughout |

## Why it ranks #3

TF2T achieves perfect cooperation with all nice strategies (600 each), same as TFT
and Grudger. But its leniency backfires against Random: since Random rarely defects
twice in a row (only 25% of consecutive pairs), TF2T keeps cooperating while Random
defects, losing ~230 points compared to Grudger's performance. It also gives Always
Defect 2 free rounds instead of 1.

## Pros

- **Nice** — never defects first.
- **Forgiving** — tolerates a single defection, avoiding overreaction.
- **Noise-resistant** — in a noisy environment, one accidental defection doesn't
  trigger retaliation (unlike TFT and Grudger).
- **Would excel with noise** — if moves had a 5% error rate, TF2T would outperform
  both TFT and Grudger.

## Cons

- **Exploitable by alternating defectors** — an opponent playing C-D-C-D never triggers
  retaliation since it's never two Ds in a row.
- **Slow to punish** — gives Always Defect 2 free rounds (10 points for free).
- **Loses badly to Random** — most random defection pairs aren't consecutive.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  if (theirs.length < 2) return "C";
  var last = theirs[theirs.length - 1];
  var secondLast = theirs[theirs.length - 2];
  if (last === "D" && secondLast === "D") return "D";
  return "C";
}
```
