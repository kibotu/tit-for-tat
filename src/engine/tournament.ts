import type { Strategy, MatchResult, StrategyStanding, TournamentResult } from "./types";
import { runMatch } from "./match";

export interface TournamentStep {
  matchIndex: number;
  totalMatches: number;
  match: MatchResult;
}

function randomRounds(min: number, max: number): number {
  if (min >= max) return min;
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function* runTournament(
  strategies: Strategy[],
  roundsMin: number,
  roundsMax: number = roundsMin
): Generator<TournamentStep> {
  const pairs: [number, number][] = [];
  for (let i = 0; i < strategies.length; i++) {
    for (let j = i + 1; j < strategies.length; j++) {
      pairs.push([i, j]);
    }
  }

  for (let idx = 0; idx < pairs.length; idx++) {
    const [i, j] = pairs[idx];
    const rounds = randomRounds(roundsMin, roundsMax);
    const match = runMatch(strategies[i], strategies[j], rounds);
    yield {
      matchIndex: idx,
      totalMatches: pairs.length,
      match,
    };
  }
}

export function computeStandings(
  strategies: Strategy[],
  matches: MatchResult[]
): StrategyStanding[] {
  const standingsMap = new Map<string, StrategyStanding>();

  for (const s of strategies) {
    standingsMap.set(s.name, {
      name: s.name,
      totalScore: 0,
      matchesPlayed: 0,
      cooperateCount: 0,
      defectCount: 0,
      totalRounds: 0,
      isBuiltIn: s.isBuiltIn,
    });
  }

  for (const match of matches) {
    const a = standingsMap.get(match.strategyA);
    const b = standingsMap.get(match.strategyB);
    if (!a || !b) continue;

    a.totalScore += match.totalScoreA;
    a.matchesPlayed++;
    b.totalScore += match.totalScoreB;
    b.matchesPlayed++;

    for (const round of match.rounds) {
      a.totalRounds++;
      b.totalRounds++;
      if (round.choiceA === "C") a.cooperateCount++;
      else a.defectCount++;
      if (round.choiceB === "C") b.cooperateCount++;
      else b.defectCount++;
    }
  }

  return Array.from(standingsMap.values()).sort(
    (a, b) => b.totalScore - a.totalScore
  );
}

export function runTournamentFull(
  strategies: Strategy[],
  roundsMin: number,
  roundsMax: number = roundsMin
): TournamentResult {
  const matches: MatchResult[] = [];
  for (const step of runTournament(strategies, roundsMin, roundsMax)) {
    matches.push(step.match);
  }
  return {
    matches,
    standings: computeStandings(strategies, matches),
  };
}
