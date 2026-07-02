"use client";

import type { ExecutionStatus } from "@/types/editor";

interface RunButtonProps {
  status: ExecutionStatus;
  onClick: () => void;
}

const LABEL: Record<ExecutionStatus, string> = {
  idle: "Run",
  running: "Running…",
  success: "Run",
  error: "Run",
};

export function RunButton({ status, onClick }: RunButtonProps) {
  const isRunning = status === "running";

  return (
    <button
      onClick={onClick}
      disabled={isRunning}
      aria-label="Run code"
      className="flex h-8 items-center gap-2 rounded px-3 bg-accent-hover text-white text-xs font-medium font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-active active:bg-accent-active focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface-base transition-colors"
    >
      {isRunning ? (
        <span className="inline-block h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      ) : (
        <svg
          viewBox="0 0 12 12"
          fill="currentColor"
          className="h-3 w-3"
          aria-hidden="true"
        >
          <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
        </svg>
      )}
      {LABEL[status]}
    </button>
  );
}
