import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="border-b border-border px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tit for Tat
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Iterated Prisoner's Dilemma Tournament Simulator
              <span className="mx-1">·</span>
              <a
                href="https://www.youtube.com/watch?v=mScpHTIi-kM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-user-accent hover:underline"
              >
                Watch the Veritasium video
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-cooperate border-cooperate/30">
              C = Cooperate
            </Badge>
            <Badge variant="outline" className="text-defect border-defect/30">
              D = Defect
            </Badge>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-4">
          <div className="rounded-md border border-border p-2 text-center">
            <span className="text-cooperate font-medium">C</span> vs{" "}
            <span className="text-cooperate font-medium">C</span>
            <span className="ml-1 text-foreground">→ 3, 3</span>
          </div>
          <div className="rounded-md border border-border p-2 text-center">
            <span className="text-cooperate font-medium">C</span> vs{" "}
            <span className="text-defect font-medium">D</span>
            <span className="ml-1 text-foreground">→ 0, 5</span>
          </div>
          <div className="rounded-md border border-border p-2 text-center">
            <span className="text-defect font-medium">D</span> vs{" "}
            <span className="text-cooperate font-medium">C</span>
            <span className="ml-1 text-foreground">→ 5, 0</span>
          </div>
          <div className="rounded-md border border-border p-2 text-center">
            <span className="text-defect font-medium">D</span> vs{" "}
            <span className="text-defect font-medium">D</span>
            <span className="ml-1 text-foreground">→ 1, 1</span>
          </div>
        </div>
      </div>
    </header>
  );
}
