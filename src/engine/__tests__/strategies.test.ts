import { describe, it, expect } from "vitest";
import {
  titForTat,
  random,
  alwaysCooperate,
  alwaysDefect,
  grudger,
  pavlov,
  titForTwoTats,
} from "../strategies";
import type { Choice } from "../types";

function simulate(
  strategyPlay: (h: { mine: Choice[]; theirs: Choice[]; round: number }) => Choice,
  opponentMoves: Choice[]
): Choice[] {
  const mine: Choice[] = [];
  const theirs: Choice[] = [];
  const result: Choice[] = [];

  for (let i = 0; i < opponentMoves.length; i++) {
    const choice = strategyPlay({ mine: [...mine], theirs: [...theirs], round: i });
    result.push(choice);
    mine.push(choice);
    theirs.push(opponentMoves[i]);
  }

  return result;
}

describe("Always Cooperate", () => {
  it("always returns C", () => {
    const moves = simulate(alwaysCooperate.play, ["D", "D", "C", "D", "C"]);
    expect(moves).toEqual(["C", "C", "C", "C", "C"]);
  });
});

describe("Always Defect", () => {
  it("always returns D", () => {
    const moves = simulate(alwaysDefect.play, ["C", "C", "D", "C", "D"]);
    expect(moves).toEqual(["D", "D", "D", "D", "D"]);
  });
});

describe("Tit for Tat", () => {
  it("cooperates first, then mirrors", () => {
    const moves = simulate(titForTat.play, ["C", "C", "D", "C", "D"]);
    expect(moves).toEqual(["C", "C", "C", "D", "C"]);
  });

  it("cooperates on the first round", () => {
    expect(titForTat.play({ mine: [], theirs: [], round: 0 })).toBe("C");
  });
});

describe("Grudger", () => {
  it("cooperates until betrayed, then defects forever", () => {
    const moves = simulate(grudger.play, ["C", "C", "D", "C", "C"]);
    expect(moves).toEqual(["C", "C", "C", "D", "D"]);
  });
});

describe("Pavlov", () => {
  it("cooperates first", () => {
    expect(pavlov.play({ mine: [], theirs: [], round: 0 })).toBe("C");
  });

  it("win-stay: repeats C after mutual cooperation", () => {
    const result = pavlov.play({ mine: ["C"], theirs: ["C"], round: 1 });
    expect(result).toBe("C");
  });

  it("lose-shift: switches to D after being suckered", () => {
    const result = pavlov.play({ mine: ["C"], theirs: ["D"], round: 1 });
    expect(result).toBe("D");
  });

  it("win-stay: repeats D after exploiting cooperator", () => {
    const result = pavlov.play({ mine: ["D"], theirs: ["C"], round: 1 });
    expect(result).toBe("D");
  });

  it("lose-shift: switches to C after mutual defection", () => {
    const result = pavlov.play({ mine: ["D"], theirs: ["D"], round: 1 });
    expect(result).toBe("C");
  });
});

describe("Tit for Two Tats", () => {
  it("cooperates for first two rounds regardless", () => {
    const moves = simulate(titForTwoTats.play, ["D", "C", "C"]);
    expect(moves[0]).toBe("C");
    expect(moves[1]).toBe("C");
  });

  it("only retaliates after two consecutive defections", () => {
    const moves = simulate(titForTwoTats.play, ["C", "D", "C", "D", "D", "C"]);
    //                                           C    C    C    C    C    D
    expect(moves).toEqual(["C", "C", "C", "C", "C", "D"]);
  });

  it("tolerates a single defection", () => {
    const moves = simulate(titForTwoTats.play, ["D", "C", "D", "C", "D"]);
    expect(moves).toEqual(["C", "C", "C", "C", "C"]);
  });
});

describe("Random", () => {
  it("returns only C or D", () => {
    for (let i = 0; i < 100; i++) {
      const choice = random.play({ mine: [], theirs: [], round: i });
      expect(["C", "D"]).toContain(choice);
    }
  });

  it("produces roughly 50/50 distribution over many rounds", () => {
    let cCount = 0;
    const total = 2000;
    for (let i = 0; i < total; i++) {
      if (random.play({ mine: [], theirs: [], round: i }) === "C") cCount++;
    }
    const rate = cCount / total;
    expect(rate).toBeGreaterThan(0.35);
    expect(rate).toBeLessThan(0.65);
  });
});
