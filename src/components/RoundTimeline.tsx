import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTournamentStore } from "@/store/tournamentStore";
import { cn } from "@/lib/utils";
import type { MatchResult } from "@/engine/types";

function MatchRow({
  match,
  isExpanded,
  onToggle,
}: {
  match: MatchResult;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isUserMatch =
    !useTournamentStore.getState().strategies.find((s) => s.name === match.strategyA)?.isBuiltIn ||
    !useTournamentStore.getState().strategies.find((s) => s.name === match.strategyB)?.isBuiltIn;

  return (
    <div className={cn("border-b border-border last:border-b-0", isUserMatch && "bg-user-accent/5")}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-accent/50 transition-colors cursor-pointer"
      >
        <div className="w-28 shrink-0 truncate font-medium sm:w-36">
          {match.strategyA}
        </div>
        <div className="text-muted-foreground">vs</div>
        <div className="w-28 shrink-0 truncate font-medium sm:w-36">
          {match.strategyB}
        </div>
        <div className="ml-auto flex gap-2 font-mono text-xs">
          <span className={match.totalScoreA >= match.totalScoreB ? "text-cooperate" : "text-muted-foreground"}>
            {match.totalScoreA}
          </span>
          <span className="text-muted-foreground">-</span>
          <span className={match.totalScoreB >= match.totalScoreA ? "text-cooperate" : "text-muted-foreground"}>
            {match.totalScoreB}
          </span>
        </div>
        <div className="ml-2 text-muted-foreground">{isExpanded ? "▲" : "▼"}</div>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-28 truncate text-xs text-muted-foreground sm:w-36">
                {match.strategyA}
              </span>
              <div className="flex gap-px">
                {match.rounds.map((r) => (
                  <div
                    key={r.round}
                    className={cn(
                      "h-3 w-1.5 rounded-[1px] sm:h-4 sm:w-2",
                      r.choiceA === "C" ? "bg-cooperate" : "bg-defect"
                    )}
                    title={`Round ${r.round + 1}: ${r.choiceA} (${r.scoreA} pts)`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-28 truncate text-xs text-muted-foreground sm:w-36">
                {match.strategyB}
              </span>
              <div className="flex gap-px">
                {match.rounds.map((r) => (
                  <div
                    key={r.round}
                    className={cn(
                      "h-3 w-1.5 rounded-[1px] sm:h-4 sm:w-2",
                      r.choiceB === "C" ? "bg-cooperate" : "bg-defect"
                    )}
                    title={`Round ${r.round + 1}: ${r.choiceB} (${r.scoreB} pts)`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>
              {match.strategyA} cooperated{" "}
              {Math.round(
                (match.rounds.filter((r) => r.choiceA === "C").length / match.rounds.length) * 100
              )}
              %
            </span>
            <span>
              {match.strategyB} cooperated{" "}
              {Math.round(
                (match.rounds.filter((r) => r.choiceB === "C").length / match.rounds.length) * 100
              )}
              %
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function RoundTimeline() {
  const matches = useTournamentStore((s) => s.matches);
  const status = useTournamentStore((s) => s.status);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sortedMatches = useMemo(() => {
    return [...matches].sort((a, b) => {
      const aIsUser =
        !useTournamentStore.getState().strategies.find((s) => s.name === a.strategyA)?.isBuiltIn ||
        !useTournamentStore.getState().strategies.find((s) => s.name === a.strategyB)?.isBuiltIn;
      const bIsUser =
        !useTournamentStore.getState().strategies.find((s) => s.name === b.strategyA)?.isBuiltIn ||
        !useTournamentStore.getState().strategies.find((s) => s.name === b.strategyB)?.isBuiltIn;
      if (aIsUser && !bIsUser) return -1;
      if (!aIsUser && bIsUser) return 1;
      return 0;
    });
  }, [matches]);

  if (status === "idle") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Match Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            Run the simulation to see match results
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">
          Match Timeline
          {matches.length > 0 && (
            <span className="ml-2 font-normal text-muted-foreground">
              ({matches.length} matches)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-80 overflow-y-auto">
          {sortedMatches.map((match, i) => (
            <MatchRow
              key={`${match.strategyA}-${match.strategyB}`}
              match={match}
              isExpanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
