export type Choice = "C" | "D";

export interface RoundHistory {
  mine: Choice[];
  theirs: Choice[];
  round: number;
}

export type PlayFunction = (history: RoundHistory) => Choice;

export interface Strategy {
  name: string;
  description: string;
  play: PlayFunction;
  isBuiltIn: boolean;
}

export interface RoundResult {
  round: number;
  choiceA: Choice;
  choiceB: Choice;
  scoreA: number;
  scoreB: number;
}

export interface MatchResult {
  strategyA: string;
  strategyB: string;
  rounds: RoundResult[];
  totalScoreA: number;
  totalScoreB: number;
}

export interface StrategyStanding {
  name: string;
  totalScore: number;
  matchesPlayed: number;
  cooperateCount: number;
  defectCount: number;
  totalRounds: number;
  isBuiltIn: boolean;
}

export interface TournamentResult {
  matches: MatchResult[];
  standings: StrategyStanding[];
}

export const PAYOFF = {
  R: 3, // Reward: both cooperate
  T: 5, // Temptation: I defect, they cooperate
  S: 0, // Sucker: I cooperate, they defect
  P: 1, // Punishment: both defect
} as const;

export function getPayoff(mine: Choice, theirs: Choice): [number, number] {
  if (mine === "C" && theirs === "C") return [PAYOFF.R, PAYOFF.R];
  if (mine === "C" && theirs === "D") return [PAYOFF.S, PAYOFF.T];
  if (mine === "D" && theirs === "C") return [PAYOFF.T, PAYOFF.S];
  return [PAYOFF.P, PAYOFF.P];
}
