import { create } from "zustand";
import type { Strategy, MatchResult, StrategyStanding } from "@/engine/types";
import { builtInStrategies } from "@/engine/strategies";
import { runTournament, computeStandings } from "@/engine/tournament";

export type SimulationStatus = "idle" | "running" | "paused" | "finished";

interface TournamentState {
  strategies: Strategy[];
  matches: MatchResult[];
  standings: StrategyStanding[];
  status: SimulationStatus;
  roundsPerMatch: number;
  speed: number; // ms delay between match steps
  currentMatchIndex: number;
  totalMatches: number;

  // User strategy
  userCode: string;
  userName: string;
  compileError: string | null;

  // Actions
  setUserCode: (code: string) => void;
  setUserName: (name: string) => void;
  setCompileError: (error: string | null) => void;
  setRoundsPerMatch: (rounds: number) => void;
  setSpeed: (speed: number) => void;
  setUserStrategy: (strategy: Strategy) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  runInstant: () => void;
  addMatchResult: (match: MatchResult, matchIndex: number, totalMatches: number) => void;
  finishSimulation: () => void;
}

const DEFAULT_CODE = `// Return "C" to cooperate or "D" to defect
function play({ mine, theirs, round }) {
  // Tit for Tat: cooperate first, then mirror
  if (theirs.length === 0) return "C";
  return theirs[theirs.length - 1];
}`;

export const useTournamentStore = create<TournamentState>((set, get) => ({
  strategies: [...builtInStrategies],
  matches: [],
  standings: [],
  status: "idle",
  roundsPerMatch: 200,
  speed: 100,
  currentMatchIndex: 0,
  totalMatches: 0,
  userCode: DEFAULT_CODE,
  userName: "My Strategy",
  compileError: null,

  setUserCode: (code) => set({ userCode: code }),
  setUserName: (name) => set({ userName: name }),
  setCompileError: (error) => set({ compileError: error }),
  setRoundsPerMatch: (rounds) => set({ roundsPerMatch: rounds }),
  setSpeed: (speed) => set({ speed }),

  setUserStrategy: (strategy) => {
    const strategies = get().strategies.filter((s) => s.isBuiltIn);
    strategies.push(strategy);
    set({ strategies, compileError: null });
  },

  startSimulation: () => {
    set({ status: "running", matches: [], standings: [], currentMatchIndex: 0 });
  },

  pauseSimulation: () => set({ status: "paused" }),
  resumeSimulation: () => set({ status: "running" }),

  resetSimulation: () =>
    set({
      status: "idle",
      matches: [],
      standings: [],
      currentMatchIndex: 0,
      totalMatches: 0,
    }),

  runInstant: () => {
    const { strategies, roundsPerMatch } = get();
    const matches: MatchResult[] = [];
    for (const step of runTournament(strategies, roundsPerMatch)) {
      matches.push(step.match);
    }
    const standings = computeStandings(strategies, matches);
    set({
      status: "finished",
      matches,
      standings,
      currentMatchIndex: matches.length,
      totalMatches: matches.length,
    });
  },

  addMatchResult: (match, matchIndex, totalMatches) => {
    const matches = [...get().matches, match];
    const standings = computeStandings(get().strategies, matches);
    set({ matches, standings, currentMatchIndex: matchIndex + 1, totalMatches });
  },

  finishSimulation: () => set({ status: "finished" }),
}));

// Run the animated simulation outside of React
let animationCancelToken = { cancelled: false };

export function startAnimatedSimulation() {
  const store = useTournamentStore.getState();
  store.startSimulation();

  animationCancelToken.cancelled = true;
  const token = { cancelled: false };
  animationCancelToken = token;

  const gen = runTournament(store.strategies, store.roundsPerMatch);

  const step = () => {
    if (token.cancelled) return;

    const state = useTournamentStore.getState();
    if (state.status === "paused") {
      const checkResume = () => {
        if (token.cancelled) return;
        const s = useTournamentStore.getState();
        if (s.status === "running") {
          step();
        } else if (s.status === "paused") {
          setTimeout(checkResume, 50);
        }
      };
      setTimeout(checkResume, 50);
      return;
    }

    if (state.status !== "running") return;

    const next = gen.next();
    if (next.done) {
      useTournamentStore.getState().finishSimulation();
      return;
    }

    const { match, matchIndex, totalMatches } = next.value;
    useTournamentStore.getState().addMatchResult(match, matchIndex, totalMatches);

    const speed = useTournamentStore.getState().speed;
    if (speed === 0) {
      requestAnimationFrame(step);
    } else {
      setTimeout(step, speed);
    }
  };

  requestAnimationFrame(step);
}

export function cancelSimulation() {
  animationCancelToken.cancelled = true;
}
