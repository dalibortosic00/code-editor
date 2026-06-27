"use client";

import type { ExecutionResult, ExecutionStatus } from "@/types/editor";

interface OutputPanelProps {
  result: ExecutionResult | null;
  status: ExecutionStatus;
  error: string | null;
}

export function OutputPanel({ result, status, error }: OutputPanelProps) {
  const isEmpty = status === "idle";
  const isRunning = status === "running";

  return (
    <div className="flex h-full flex-col bg-surface-muted">
      {/* Panel header */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border-subtle px-4">
        <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-text-ghost">
          Output
        </span>
        {status === "success" && (
          <span className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-400">
            exit 0
          </span>
        )}
        {status === "error" && result && (
          <span className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-mono bg-red-950 text-red-400">
            exit {result.code ?? "signal"}
          </span>
        )}
      </div>

      {/* Output body */}
      <div className="relative flex-1 overflow-auto p-4">
        {isEmpty && (
          <p className="text-xs font-mono text-text-placeholder">
            Run your code to see output here.
          </p>
        )}

        {isRunning && (
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-text-faint">
              Executing…
            </span>
          </div>
        )}

        {!isRunning && error && (
          <pre className="whitespace-pre-wrap break-words text-xs font-mono text-red-400 leading-relaxed">
            {error}
          </pre>
        )}

        {!isRunning && result && (
          <div className="space-y-4">
            {result.stdout && (
              <pre className="whitespace-pre-wrap break-words text-xs font-mono text-text-code leading-relaxed">
                {result.stdout}
              </pre>
            )}
            {result.stderr && (
              <div>
                {result.stdout && (
                  <div className="mb-2 text-[10px] font-mono uppercase tracking-widest text-text-ghost">
                    stderr
                  </div>
                )}
                <pre className="whitespace-pre-wrap break-words text-xs font-mono text-red-400 leading-relaxed">
                  {result.stderr}
                </pre>
              </div>
            )}
            {!result.stdout && !result.stderr && (
              <p className="text-xs font-mono text-text-ghost">
                No output produced.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
