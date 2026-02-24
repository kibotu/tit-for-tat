import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useTournamentStore } from "@/store/tournamentStore";

const TEMPLATE = `// Return "C" to cooperate or "D" to defect
function play({ mine, theirs, round }) {
  // Tit for Tat: cooperate first, then mirror
  if (theirs.length === 0) return "C";
  return theirs[theirs.length - 1];
}`;

export function StrategyEditor() {
  const userCode = useTournamentStore((s) => s.userCode);
  const userName = useTournamentStore((s) => s.userName);
  const compileError = useTournamentStore((s) => s.compileError);
  const status = useTournamentStore((s) => s.status);
  const setUserCode = useTournamentStore((s) => s.setUserCode);
  const setUserName = useTournamentStore((s) => s.setUserName);

  const isDisabled = status === "running" || status === "paused";

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Your Strategy</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setUserCode(TEMPLATE);
              setUserName("My Strategy");
            }}
            disabled={isDisabled}
            className="h-7 px-2 text-xs text-muted-foreground"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isDisabled}
          placeholder="Strategy name"
          className="h-8 w-full rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
        />
        <div className="min-h-0 flex-1 overflow-hidden rounded-md border border-input">
          <CodeMirror
            value={userCode}
            onChange={setUserCode}
            extensions={[javascript()]}
            theme="dark"
            readOnly={isDisabled}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLine: true,
              autocompletion: false,
            }}
            height="100%"
            style={{ height: "100%" }}
          />
        </div>
        {compileError && (
          <div className="rounded-md border border-defect/30 bg-defect/10 px-3 py-2 text-xs text-defect">
            {compileError}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
