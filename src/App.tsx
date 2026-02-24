import { Header } from "@/components/Header";
import { StrategyEditor } from "@/components/StrategyEditor";
import { SimulationControls } from "@/components/SimulationControls";
import { RoundTimeline } from "@/components/RoundTimeline";
import { ScoreChart } from "@/components/ScoreChart";
import { ResultsTable } from "@/components/ResultsTable";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          {/* Left column: editor + controls */}
          <div className="flex flex-col gap-6">
            <StrategyEditor />
            <SimulationControls />
          </div>

          {/* Right column: visualizations */}
          <div className="flex flex-col gap-6">
            <RoundTimeline />
            <ScoreChart />
          </div>
        </div>

        <div className="mt-6">
          <ResultsTable />
        </div>
      </main>
    </div>
  );
}
