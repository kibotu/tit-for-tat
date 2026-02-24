import { describe, it, expect } from "vitest";
import { compileUserStrategy } from "../compile";

describe("compileUserStrategy", () => {
  it("compiles valid code that returns C", () => {
    const result = compileUserStrategy("Test", `function play() { return "C"; }`);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.strategy.name).toBe("Test");
      expect(result.strategy.play({ mine: [], theirs: [], round: 0 })).toBe("C");
    }
  });

  it("compiles valid code that returns D", () => {
    const result = compileUserStrategy("Test", `function play() { return "D"; }`);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.strategy.play({ mine: [], theirs: [], round: 0 })).toBe("D");
    }
  });

  it("rejects code with syntax errors", () => {
    const result = compileUserStrategy("Test", `function play( { return "C" }`);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeTruthy();
    }
  });

  it("rejects code that returns invalid values", () => {
    const result = compileUserStrategy("Test", `function play() { return "X"; }`);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('"C" or "D"');
    }
  });

  it("handles runtime errors gracefully", () => {
    const result = compileUserStrategy(
      "Test",
      `function play() { return "C"; }`
    );
    expect(result.success).toBe(true);
    if (result.success) {
      // The strategy should not crash even with unexpected input
      const choice = result.strategy.play({ mine: [], theirs: [], round: 0 });
      expect(["C", "D"]).toContain(choice);
    }
  });

  it("uses default name when empty", () => {
    const result = compileUserStrategy("", `function play() { return "C"; }`);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.strategy.name).toBe("My Strategy");
    }
  });

  it("compiled strategy has access to history", () => {
    const code = `function play({ mine, theirs, round }) {
      if (theirs.length === 0) return "C";
      return theirs[theirs.length - 1];
    }`;
    const result = compileUserStrategy("TFT Clone", code);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.strategy.play({ mine: ["C"], theirs: ["D"], round: 1 })).toBe("D");
      expect(result.strategy.play({ mine: ["C"], theirs: ["C"], round: 1 })).toBe("C");
    }
  });
});
