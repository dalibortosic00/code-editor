"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { OutputPanel } from "@/components/editor/OutputPanel";
import { LanguageSelector } from "@/components/editor/LanguageSelector";
import { RunButton } from "@/components/editor/RunButton";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import { DEFAULT_LANGUAGE } from "@/lib/languages";
import type { Language } from "@/types/editor";

export default function EditorPage() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [code, setCode] = useState<string>(DEFAULT_LANGUAGE.defaultCode);
  const { result, status, error, run } = useCodeExecution();

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    setCode(lang.defaultCode);
  }, []);

  const handleRun = useCallback(() => {
    run(code, language);
  }, [code, language, run]);

  return (
    <div className="flex h-screen flex-col bg-surface-base text-text-primary">
      {/* Top bar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border-subtle px-4">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-1 rounded-sm bg-accent" />
            <span className="text-sm font-mono font-semibold text-text-primary tracking-tight">
              coderun
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector
            value={language}
            onChange={handleLanguageChange}
            disabled={status === "running"}
          />
          <RunButton status={status} onClick={handleRun} />
        </div>
      </header>

      {/* Editor + Output split */}
      <main className="flex flex-1 overflow-hidden">
        {/* Editor pane */}
        <div className="relative flex flex-1 flex-col overflow-hidden border-r border-border-subtle">
          {/* Active panel accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-accent" />
          <CodeEditor
            value={code}
            language={language.monacoLanguage}
            onChange={setCode}
          />
        </div>

        {/* Output pane */}
        <div className="flex w-[38%] min-w-64 flex-col overflow-hidden">
          <OutputPanel result={result} status={status} error={error} />
        </div>
      </main>
    </div>
  );
}
