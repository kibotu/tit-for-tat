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

Strategies that can outperform Tit for Tat under certain conditions. Each folder
contains a README with explanation, pros/cons, and a **copy-paste ready** strategy
for the simulation editor.

| Strategy | Type | Folder |
| --- | --- | --- |
| **Generous Tit for Tat** | Noise-resistant TFT variant | [`strategies/generous-tit-for-tat`](strategies/generous-tit-for-tat) |
| **Gradual** | Proportional punishment | [`strategies/gradual`](strategies/gradual) |
| **Suspicious Tit for Tat** | Pessimistic TFT variant | [`strategies/suspicious-tit-for-tat`](strategies/suspicious-tit-for-tat) |
| **Hard Majority** | Trend-based (pessimistic) | [`strategies/hard-majority`](strategies/hard-majority) |
| **Soft Majority** | Trend-based (optimistic) | [`strategies/soft-majority`](strategies/soft-majority) |
| **Adaptive** | Probe then commit | [`strategies/adaptive`](strategies/adaptive) |
| **Prober** | Test and exploit | [`strategies/prober`](strategies/prober) |
| **Detective** | Classify then counter | [`strategies/detective`](strategies/detective) |
