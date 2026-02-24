import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTournamentStore } from "@/store/tournamentStore";
import { cn } from "@/lib/utils";

export function ResultsTable() {
  const standings = useTournamentStore((s) => s.standings);
  const status = useTournamentStore((s) => s.status);

  if (status === "idle") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
            Run the simulation to see the leaderboard
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Leaderboard</CardTitle>
          {status === "finished" && standings.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400">
              <Trophy className="h-3.5 w-3.5" />
              <span className="font-medium">{standings[0].name}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-2 font-medium w-10">#</th>
                <th className="px-4 py-2 font-medium">Strategy</th>
                <th className="px-4 py-2 font-medium text-right">Score</th>
                <th className="hidden px-4 py-2 font-medium text-right sm:table-cell">Avg/Match</th>
                <th className="hidden px-4 py-2 font-medium text-right md:table-cell">Coop %</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => {
                const coopRate = s.totalRounds > 0
                  ? Math.round((s.cooperateCount / s.totalRounds) * 100)
                  : 0;
                const avg = s.matchesPlayed > 0
                  ? Math.round(s.totalScore / s.matchesPlayed)
                  : 0;
                const isWinner = i === 0 && status === "finished";

                return (
                  <tr
                    key={s.name}
                    className={cn(
                      "border-b border-border transition-colors",
                      !s.isBuiltIn && "bg-user-accent/5",
                      isWinner && "bg-amber-400/5"
                    )}
                  >
                    <td className="px-4 py-2.5 font-mono">
                      {isWinner ? (
                        <span className="text-amber-400">🏆</span>
                      ) : (
                        <span className="text-muted-foreground">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className={cn("font-medium", !s.isBuiltIn && "text-user-accent")}>
                          {s.name}
                        </span>
                        {!s.isBuiltIn && (
                          <Badge variant="outline" className="text-user-accent border-user-accent/30 text-[10px] px-1.5 py-0">
                            you
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-medium">
                      {s.totalScore.toLocaleString()}
                    </td>
                    <td className="hidden px-4 py-2.5 text-right font-mono text-muted-foreground sm:table-cell">
                      {avg}
                    </td>
                    <td className="hidden px-4 py-2.5 text-right md:table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-cooperate transition-all duration-300"
                            style={{ width: `${coopRate}%` }}
                          />
                        </div>
                        <span className="font-mono text-muted-foreground w-8 text-right">
                          {coopRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
