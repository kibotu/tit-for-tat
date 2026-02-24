import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTournamentStore } from "@/store/tournamentStore";

const COLORS = [
  "#3b82f6", // blue (user)
  "#22c55e", // green
  "#ef4444", // red
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

export function ScoreChart() {
  const matches = useTournamentStore((s) => s.matches);
  const strategies = useTournamentStore((s) => s.strategies);
  const status = useTournamentStore((s) => s.status);

  const { data, strategyNames } = useMemo(() => {
    const scoreByStrategy = new Map<string, number>();
    const strategyNames = strategies.map((s) => s.name);
    for (const name of strategyNames) {
      scoreByStrategy.set(name, 0);
    }

    const data = matches.map((match, i) => {
      const prev = scoreByStrategy.get(match.strategyA) ?? 0;
      scoreByStrategy.set(match.strategyA, prev + match.totalScoreA);
      const prev2 = scoreByStrategy.get(match.strategyB) ?? 0;
      scoreByStrategy.set(match.strategyB, prev2 + match.totalScoreB);

      const point: Record<string, number | string> = { match: i + 1 };
      for (const [name, score] of scoreByStrategy) {
        point[name] = score;
      }
      return point;
    });

    return { data, strategyNames };
  }, [matches, strategies]);

  if (status === "idle") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Score Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            Scores will appear here during the simulation
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Score Progression</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <XAxis
              dataKey="match"
              tick={{ fontSize: 10, fill: "#a1a1aa" }}
              axisLine={{ stroke: "#27272a" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#a1a1aa" }}
              axisLine={{ stroke: "#27272a" }}
              tickLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0c",
                border: "1px solid #27272a",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#a1a1aa" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px" }}
              iconType="line"
            />
            {strategyNames.map((name, i) => {
              const strategy = strategies.find((s) => s.name === name);
              const isUser = strategy && !strategy.isBuiltIn;
              return (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={isUser ? COLORS[0] : COLORS[(i % (COLORS.length - 1)) + 1]}
                  strokeWidth={isUser ? 2.5 : 1.5}
                  dot={false}
                  strokeOpacity={isUser ? 1 : 0.7}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
