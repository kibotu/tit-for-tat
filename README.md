# Tit for Tat — Iterated Prisoner's Dilemma Tournament

Based on Robert Axelrod's tournament, as featured in the Veritasium video
*"This game theory problem will change the way you see the world"* and described in
*"The Evolution of Cooperation"* and *"A Passion for Cooperation: Adventures of a Wide-Ranging Scientist"*.

## Rules

Two players repeatedly face each other over multiple rounds. Each round, both players
**simultaneously** choose one of two actions:

- **Cooperate** (C)
- **Defect** (D)

## Payoff Matrix

|                    | Opponent Cooperates | Opponent Defects |
| ------------------ | ------------------- | ---------------- |
| **You Cooperate**  | 3, 3 (Reward)       | 0, 5 (Sucker)   |
| **You Defect**     | 5, 0 (Temptation)   | 1, 1 (Punishment)|

- **Mutual cooperation** — both get **3 points**
- **Mutual defection** — both get **1 point**
- **One defects, one cooperates** — defector gets **5 points**, cooperator gets **0 points**

## Key Properties

1. **Temptation to defect**: 5 > 3, so defecting is always better in a single round.
2. **Mutual cooperation beats mutual defection**: 3 + 3 > 1 + 1.
3. **The game is iterated**: you play many rounds against the same opponent, so past behavior matters.
4. **Full history**: each player can see what the other did in all previous rounds.

## Tournament Format

- Strategies are submitted as programs.
- Every strategy plays against every other strategy in a **round-robin** tournament.
- Each matchup consists of a fixed number of rounds (e.g. 200).
- The strategy with the highest **total score** across all matchups wins.

## The Winning Strategy: Tit for Tat

Submitted by Anatol Rapoport, **Tit for Tat** is remarkably simple:

1. **Start by cooperating.**
2. **Then do whatever your opponent did last round.**

It won because it is:

- **Nice** — never defects first.
- **Retaliatory** — punishes defection immediately.
- **Forgiving** — returns to cooperation as soon as the opponent does.
- **Clear** — easy for opponents to understand and adapt to.

## Challenger Strategies

Each folder contains a README with explanation, pros/cons, simulation data, and a
**copy-paste ready** `function play(...)` for the strategy editor.

### The winner

| Strategy | Beats Grudger? | Approach | Folder |
| --- | --- | --- | --- |
| **Endgame Grudger** | **Yes** | Grudger + defect last 2 rounds | [`strategies/endgame-grudger`](strategies/endgame-grudger) |

Exploits the known round count (200). Plays as a perfect Grudger for 198 rounds, then
defects on rounds 198–199 when opponents can't fully retaliate. Gains +2 to +4 points
per cooperative matchup, winning the tournament consistently.

### Other strategies (none beat the built-in top 3)

| Strategy | Type | Why it loses | Folder |
| --- | --- | --- | --- |
| **Generous Tit for Tat** | Noise-resistant TFT | No noise in this tournament | [`strategies/generous-tit-for-tat`](strategies/generous-tit-for-tat) |
| **Gradual** | Proportional punishment | No advantage over Grudger here | [`strategies/gradual`](strategies/gradual) |
| **Suspicious Tit for Tat** | Pessimistic TFT | Opening D triggers Grudger | [`strategies/suspicious-tit-for-tat`](strategies/suspicious-tit-for-tat) |
| **Hard Majority** | Trend-based (pessimistic) | Opening D triggers Grudger | [`strategies/hard-majority`](strategies/hard-majority) |
| **Soft Majority** | Trend-based (optimistic) | Too slow to punish | [`strategies/soft-majority`](strategies/soft-majority) |
| **Adaptive** | Probe then commit | Probe triggers Grudger | [`strategies/adaptive`](strategies/adaptive) |
| **Prober** | Test and exploit | Probe triggers Grudger | [`strategies/prober`](strategies/prober) |
| **Detective** | Classify then counter | Probe triggers Grudger | [`strategies/detective`](strategies/detective) |

### Why most strategies fail

In this specific tournament (200 rounds, no noise, this opponent pool), **Grudger is
king** because:

1. It scores 600 (maximum mutual cooperation) against 4 of 6 opponents.
2. It punishes defectors permanently, extracting ~200 against Always Defect and ~600
   against Random.
3. Any strategy that defects first — even once — triggers Grudger's permanent
   retaliation, losing ~400 points in that matchup alone.

The **only** exploit is the known round count: defect at the very end when opponents
can't retaliate.
