import { describe, it, expect } from "vitest";
import { runMatch } from "../match";
import { alwaysCooperate, alwaysDefect } from "../strategies";

describe("runMatch", () => {
  it("Always Cooperate vs Always Cooperate: both score 3 * rounds", () => {
    const result = runMatch(alwaysCooperate, alwaysCooperate, 10);
    expect(result.totalScoreA).toBe(30);
    expect(result.totalScoreB).toBe(30);
  });

  it("Always Defect vs Always Cooperate: defector scores 5 * rounds, cooperator scores 0", () => {
    const result = runMatch(alwaysDefect, alwaysCooperate, 10);
    expect(result.totalScoreA).toBe(50);
    expect(result.totalScoreB).toBe(0);
  });

  it("Always Defect vs Always Defect: both score 1 * rounds", () => {
    const result = runMatch(alwaysDefect, alwaysDefect, 10);
    expect(result.totalScoreA).toBe(10);
    expect(result.totalScoreB).toBe(10);
  });

  it("produces exactly N round results", () => {
    const result = runMatch(alwaysCooperate, alwaysDefect, 42);
    expect(result.rounds).toHaveLength(42);
  });

  it("records correct choices in each round", () => {
    const result = runMatch(alwaysCooperate, alwaysDefect, 5);
    for (const round of result.rounds) {
      expect(round.choiceA).toBe("C");
      expect(round.choiceB).toBe("D");
      expect(round.scoreA).toBe(0);
      expect(round.scoreB).toBe(5);
    }
  });

  it("records strategy names", () => {
    const result = runMatch(alwaysCooperate, alwaysDefect, 1);
    expect(result.strategyA).toBe("Always Cooperate");
    expect(result.strategyB).toBe("Always Defect");
  });
});
