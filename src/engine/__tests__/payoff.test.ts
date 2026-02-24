import { describe, it, expect } from "vitest";
import { getPayoff, PAYOFF } from "../types";

describe("getPayoff", () => {
  it("returns (R, R) for mutual cooperation", () => {
    expect(getPayoff("C", "C")).toEqual([PAYOFF.R, PAYOFF.R]);
    expect(getPayoff("C", "C")).toEqual([3, 3]);
  });

  it("returns (S, T) when I cooperate and they defect", () => {
    expect(getPayoff("C", "D")).toEqual([PAYOFF.S, PAYOFF.T]);
    expect(getPayoff("C", "D")).toEqual([0, 5]);
  });

  it("returns (T, S) when I defect and they cooperate", () => {
    expect(getPayoff("D", "C")).toEqual([PAYOFF.T, PAYOFF.S]);
    expect(getPayoff("D", "C")).toEqual([5, 0]);
  });

  it("returns (P, P) for mutual defection", () => {
    expect(getPayoff("D", "D")).toEqual([PAYOFF.P, PAYOFF.P]);
    expect(getPayoff("D", "D")).toEqual([1, 1]);
  });

  it("is symmetric: swapping players swaps payoffs", () => {
    const [a1, b1] = getPayoff("C", "D");
    const [a2, b2] = getPayoff("D", "C");
    expect(a1).toBe(b2);
    expect(b1).toBe(a2);
  });
});
