# Random

**Built-in** · **Tournament rank: #7 (last)** (score: ~2545)

## Goal

The null hypothesis of strategies. Flip a coin each round — cooperate or defect
with equal 50% probability, regardless of history. Useful as a baseline to measure
whether a strategy is doing better than chance.

## How it works

1. Every round, return "C" or "D" with 50% probability each.
2. Ignore all history.

## Head-to-head results (200 rounds, averaged)

| Opponent | Score | Opponent's score | Outcome |
|---|---|---|---|
| Always Cooperate | ~810 | ~285 | Win — free defections against a pacifist |
| Always Defect | ~101 | ~596 | Loss — defector exploits cooperative rounds |
| Tit for Tat | ~447 | ~447 | Tie — TFT mirrors the randomness |
| Grudger | ~113 | ~573 | Loss — first D triggers permanent retaliation |
| Pavlov | ~473 | ~428 | Slight win — Pavlov gets confused by noise |
| Tit for Two Tats | ~606 | ~376 | Win — single Ds aren't punished |

## Why it ranks last

Random cooperates half the time against strategies that punish defection. Against
Grudger, the first defection (which comes almost immediately) triggers permanent
mutual defection for the rest of the game. Against Always Defect, the cooperative
rounds are just free points for the opponent. The wins against Always Cooperate and
TF2T can't compensate.

## Pros

- **Unpredictable** — no opponent can perfectly counter it.
- **Useful baseline** — any viable strategy should beat Random.
- **Exploits lenient strategies** — scores well against TF2T and Always Cooperate.

## Cons

- **No memory** — ignores all information, leaving points on the table.
- **Self-destructive against Grudger** — triggers permanent punishment almost immediately.
- **Inconsistent** — scores vary wildly between runs.
- **Worst overall performance** — finishes last in the tournament.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  return Math.random() < 0.5 ? "C" : "D";
}
```
