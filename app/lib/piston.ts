import type { ExecutionResult } from "@/types/editor";

const PISTON_BASE_URL = "PLACEHOLDER_FOR_PISTON_API_URL"; // Replace with the actual Piston API URL

export interface PistonFile {
  name?: string;
  content: string;
}

export interface PistonExecuteRequest {
  language: string;
  version: string;
  files: PistonFile[];
  stdin?: string;
  args?: string[];
}

interface PistonRunResult {
  stdout: string;
  stderr: string;
  code: number | null;
  signal: string | null;
  output: string;
}

interface PistonExecuteResponse {
  language: string;
  version: string;
  run: PistonRunResult;
}

export async function executeCode(
  request: PistonExecuteRequest,
): Promise<ExecutionResult> {
  const response = await fetch(`${PISTON_BASE_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`Piston API error ${response.status}: ${text}`);
  }

  const data: PistonExecuteResponse = await response.json();

  return {
    stdout: data.run.stdout,
    stderr: data.run.stderr,
    code: data.run.code,
    signal: data.run.signal,
  };
}
