import type { Strategy, Choice, RoundResult, MatchResult } from "./types";
import { getPayoff } from "./types";

export function runMatch(
  strategyA: Strategy,
  strategyB: Strategy,
  rounds: number
): MatchResult {
  const historyA: Choice[] = [];
  const historyB: Choice[] = [];
  const roundResults: RoundResult[] = [];
  let totalScoreA = 0;
  let totalScoreB = 0;

  for (let i = 0; i < rounds; i++) {
    const choiceA = safePlay(strategyA, {
      mine: [...historyA],
      theirs: [...historyB],
      round: i,
    });
    const choiceB = safePlay(strategyB, {
      mine: [...historyB],
      theirs: [...historyA],
      round: i,
    });

    const [scoreA, scoreB] = getPayoff(choiceA, choiceB);
    totalScoreA += scoreA;
    totalScoreB += scoreB;

    historyA.push(choiceA);
    historyB.push(choiceB);

    roundResults.push({
      round: i,
      choiceA,
      choiceB,
      scoreA,
      scoreB,
    });
  }

  return {
    strategyA: strategyA.name,
    strategyB: strategyB.name,
    rounds: roundResults,
    totalScoreA,
    totalScoreB,
  };
}

function safePlay(
  strategy: Strategy,
  history: { mine: Choice[]; theirs: Choice[]; round: number }
): Choice {
  try {
    const result = strategy.play(history);
    if (result === "C" || result === "D") return result;
    return "C";
  } catch {
    return "C";
  }
}
