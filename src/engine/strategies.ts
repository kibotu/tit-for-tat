import type { Strategy } from "./types";

export const titForTat: Strategy = {
  name: "Tit for Tat",
  description: "Cooperate first, then mirror opponent's last move",
  isBuiltIn: true,
  play: ({ theirs }) => {
    if (theirs.length === 0) return "C";
    return theirs[theirs.length - 1];
  },
};

export const random: Strategy = {
  name: "Random",
  description: "50/50 coin flip each round",
  isBuiltIn: true,
  play: () => (Math.random() < 0.5 ? "C" : "D"),
};

export const alwaysCooperate: Strategy = {
  name: "Always Cooperate",
  description: "Always cooperate, no matter what",
  isBuiltIn: true,
  play: () => "C",
};

export const alwaysDefect: Strategy = {
  name: "Always Defect",
  description: "Always defect, no matter what",
  isBuiltIn: true,
  play: () => "D",
};

export const grudger: Strategy = {
  name: "Grudger",
  description: "Cooperate until betrayed, then defect forever",
  isBuiltIn: true,
  play: ({ theirs }) => {
    if (theirs.includes("D")) return "D";
    return "C";
  },
};

export const pavlov: Strategy = {
  name: "Pavlov",
  description: "Win-Stay, Lose-Shift: repeat last choice if it scored well, switch otherwise",
  isBuiltIn: true,
  play: ({ mine, theirs }) => {
    if (mine.length === 0) return "C";
    const lastMine = mine[mine.length - 1];
    const lastTheirs = theirs[theirs.length - 1];
    // "Won" if both cooperated or I defected and they cooperated
    if (lastMine === lastTheirs) return "C";
    return "D";
  },
};

export const titForTwoTats: Strategy = {
  name: "Tit for Two Tats",
  description: "Only retaliates after opponent defects twice in a row",
  isBuiltIn: true,
  play: ({ theirs }) => {
    if (theirs.length < 2) return "C";
    const last = theirs[theirs.length - 1];
    const secondLast = theirs[theirs.length - 2];
    if (last === "D" && secondLast === "D") return "D";
    return "C";
  },
};

export const builtInStrategies: Strategy[] = [
  titForTat,
  random,
  alwaysCooperate,
  alwaysDefect,
  grudger,
  pavlov,
  titForTwoTats,
];
