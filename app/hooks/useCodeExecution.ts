"use client";

import { useState, useCallback } from "react";
import { executeCode } from "@/lib/piston";
import type {
  Language,
  ExecutionResult,
  ExecutionStatus,
} from "@/types/editor";

interface UseCodeExecutionReturn {
  result: ExecutionResult | null;
  status: ExecutionStatus;
  error: string | null;
  run: (code: string, language: Language) => Promise<void>;
}

export function useCodeExecution(): UseCodeExecutionReturn {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [status, setStatus] = useState<ExecutionStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (code: string, language: Language) => {
    setStatus("running");
    setError(null);
    setResult(null);

    try {
      const executionResult = await executeCode({
        language: language.pistonRuntime,
        version: language.version,
        files: [{ content: code }],
      });

      setResult(executionResult);
      setStatus(executionResult.code === 0 ? "success" : "error");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setStatus("error");
    }
  }, []);

  return { result, status, error, run };
}
