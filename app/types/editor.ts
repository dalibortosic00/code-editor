export interface Language {
  id: string;
  label: string;
  monacoLanguage: string;
  pistonRuntime: string;
  version: string;
  defaultCode: string;
}

export type ExecutionStatus = "idle" | "running" | "success" | "error";

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  code: number | null;
  signal: string | null;
}
