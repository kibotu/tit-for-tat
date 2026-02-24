import { describe, it, expect } from "vitest";
import { runTournament, computeStandings, runTournamentFull } from "../tournament";
import { alwaysCooperate, alwaysDefect, titForTat, builtInStrategies } from "../strategies";

describe("runTournament", () => {
  it("generates correct number of matchups: n*(n-1)/2", () => {
    const strategies = [alwaysCooperate, alwaysDefect, titForTat];
    const matches = [];
    for (const step of runTournament(strategies, 10)) {
      matches.push(step.match);
    }
    expect(matches).toHaveLength(3); // 3 * 2 / 2
  });

  it("every strategy plays every other exactly once", () => {
    const strategies = [alwaysCooperate, alwaysDefect, titForTat];
    const matches = [];
    for (const step of runTournament(strategies, 10)) {
      matches.push(step.match);
    }

    const pairs = new Set(
      matches.map((m) => [m.strategyA, m.strategyB].sort().join(" vs "))
    );
    expect(pairs.size).toBe(3);
  });
});

describe("computeStandings", () => {
  it("ranks strategies by total score descending", () => {
    const strategies = [alwaysCooperate, alwaysDefect, titForTat];
    const result = runTournamentFull(strategies, 10);
    const standings = result.standings;

    for (let i = 1; i < standings.length; i++) {
      expect(standings[i - 1].totalScore).toBeGreaterThanOrEqual(standings[i].totalScore);
    }
  });

  it("correctly calculates cooperation rates", () => {
    const result = runTournamentFull([alwaysCooperate, alwaysDefect], 10);
    const coopStanding = result.standings.find((s) => s.name === "Always Cooperate")!;
    const defectStanding = result.standings.find((s) => s.name === "Always Defect")!;

    expect(coopStanding.cooperateCount).toBe(10);
    expect(coopStanding.defectCount).toBe(0);
    expect(defectStanding.cooperateCount).toBe(0);
    expect(defectStanding.defectCount).toBe(10);
  });
});

describe("known results", () => {
  it("Always Defect beats Always Cooperate in a 2-player tournament", () => {
    const result = runTournamentFull([alwaysCooperate, alwaysDefect], 100);
    expect(result.standings[0].name).toBe("Always Defect");
  });

  it("Tit for Tat wins in the classic Axelrod-like mix", () => {
    const result = runTournamentFull(builtInStrategies.filter(s => s.name !== "Random"), 200);
    expect(result.standings[0].name).toBe("Tit for Tat");
  });
});
