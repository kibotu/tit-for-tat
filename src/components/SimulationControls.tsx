import { Play, Pause, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useTournamentStore,
  startAnimatedSimulation,
  cancelSimulation,
} from "@/store/tournamentStore";
import { compileUserStrategy } from "@/engine/compile";

export function SimulationControls() {
  const status = useTournamentStore((s) => s.status);
  const roundsPerMatch = useTournamentStore((s) => s.roundsPerMatch);
  const speed = useTournamentStore((s) => s.speed);
  const currentMatchIndex = useTournamentStore((s) => s.currentMatchIndex);
  const totalMatches = useTournamentStore((s) => s.totalMatches);

  const setRoundsPerMatch = useTournamentStore((s) => s.setRoundsPerMatch);
  const setSpeed = useTournamentStore((s) => s.setSpeed);
  const pauseSimulation = useTournamentStore((s) => s.pauseSimulation);
  const resumeSimulation = useTournamentStore((s) => s.resumeSimulation);

  const compileAndRun = (instant: boolean) => {
    const { userCode, userName, setUserStrategy, setCompileError, runInstant } =
      useTournamentStore.getState();
    const result = compileUserStrategy(userName, userCode);
    if (!result.success) {
      setCompileError(result.error);
      return;
    }
    setUserStrategy(result.strategy);

    if (instant) {
      runInstant();
    } else {
      startAnimatedSimulation();
    }
  };

  const handleReset = () => {
    cancelSimulation();
    useTournamentStore.getState().resetSimulation();
  };

  const isConfigurable = status === "idle" || status === "finished";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Simulation Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Rounds per match</span>
            <span className="font-mono text-foreground">{roundsPerMatch}</span>
          </div>
          <Slider
            value={[roundsPerMatch]}
            onValueChange={([v]) => setRoundsPerMatch(v)}
            min={10}
            max={500}
            step={10}
            disabled={!isConfigurable}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Speed</span>
            <span className="font-mono text-foreground">
              {speed === 0 ? "Max" : `${speed}ms`}
            </span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([v]) => setSpeed(v)}
            min={0}
            max={500}
            step={10}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {status === "idle" || status === "finished" ? (
            <>
              <Button onClick={() => compileAndRun(false)} className="flex-1">
                <Play className="h-4 w-4" />
                Play
              </Button>
              <Button
                variant="secondary"
                onClick={() => compileAndRun(true)}
                className="flex-1"
              >
                <Zap className="h-4 w-4" />
                Instant
              </Button>
            </>
          ) : status === "running" ? (
            <Button onClick={pauseSimulation} variant="secondary" className="flex-1">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button onClick={resumeSimulation} className="flex-1">
              <Play className="h-4 w-4" />
              Resume
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={status === "idle"}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {(status === "running" || status === "paused") && totalMatches > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>
                {currentMatchIndex} / {totalMatches}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{
                  width: `${(currentMatchIndex / totalMatches) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
