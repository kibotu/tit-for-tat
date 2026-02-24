# Adaptive

**Tournament rank: does NOT beat Grudger/TFT/TF2T in this field.**

## Goal

Probe the opponent for 10 rounds with a mix of cooperation and defection, then commit
to whichever pure strategy (Always Cooperate or Always Defect) would have scored best.

## How it works

1. Play `C, C, C, C, C, D, D, D, D, D` for the first 10 rounds.
2. Calculate hypothetical scores for always-cooperate vs always-defect against the
   opponent's actual history.
3. Commit to the more profitable pure strategy for the remaining 190 rounds.

## Why it doesn't win here

The 5 defection rounds (6–10) trigger Grudger's permanent retaliation, losing ~570
points of mutual cooperation. Against TFT, the defection rounds cause costly
retaliation spirals. The probe data is useful but the cost of gathering it is too
high in this field where the dominant strategies are unforgiving.

## Pros

- **Data-driven** — makes an informed decision based on actual behavior.
- **Exploits predictable opponents** — can lock into defection against cooperators.

## Cons

- **Costly probe** — 5 defection rounds trigger permanent retaliation from Grudger.
- **Binary choice** — commits entirely to C or D with no middle ground.
- **Not nice** — defects during rounds 6–10.

## Copy-Paste Strategy

```javascript
function play({ mine, theirs, round }) {
  const probe = ["C","C","C","C","C","D","D","D","D","D"];
  if (round < 10) return probe[round];

  let coopScore = 0;
  let defectScore = 0;
  for (let i = 0; i < theirs.length; i++) {
    coopScore  += theirs[i] === "C" ? 3 : 0;
    defectScore += theirs[i] === "C" ? 5 : 1;
  }
  return coopScore >= defectScore ? "C" : "D";
}
```
