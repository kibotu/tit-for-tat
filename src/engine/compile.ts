import type { Strategy, Choice, RoundHistory } from "./types";

export interface CompileResult {
  success: true;
  strategy: Strategy;
}

export interface CompileError {
  success: false;
  error: string;
}

export function compileUserStrategy(
  name: string,
  code: string
): CompileResult | CompileError {
  const trimmedName = name.trim() || "My Strategy";

  try {
    const fn = new Function(
      "history",
      `"use strict";
${code}
return play(history);`
    );

    const testHistory: RoundHistory = { mine: [], theirs: [], round: 0 };
    const testResult = fn(testHistory);
    if (testResult !== "C" && testResult !== "D") {
      return {
        success: false,
        error: `play() must return "C" or "D", got: ${JSON.stringify(testResult)}`,
      };
    }

    const strategy: Strategy = {
      name: trimmedName,
      description: "Custom user strategy",
      isBuiltIn: false,
      play: (history: RoundHistory): Choice => {
        try {
          const result = fn(history);
          if (result === "C" || result === "D") return result;
          return "C";
        } catch {
          return "C";
        }
      },
    };

    return { success: true, strategy };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
