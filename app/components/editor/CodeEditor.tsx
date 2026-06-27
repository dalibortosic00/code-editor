"use client";

import dynamic from "next/dynamic";
import type { OnMount } from "@monaco-editor/react";
import { EDITOR_COLORS } from "@/lib/editorTheme";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false },
);

interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
}

const MONACO_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  lineHeight: 22,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontLigatures: true,
  padding: { top: 20, bottom: 20 },
  scrollBeyondLastLine: false,
  renderLineHighlight: "line" as const,
  lineNumbers: "on" as const,
  glyphMargin: false,
  folding: false,
  lineDecorationsWidth: 16,
  lineNumbersMinChars: 3,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: "on" as const,
  cursorBlinking: "smooth" as const,
  smoothScrolling: true,
  contextmenu: false,
  overviewRulerLanes: 0,
} as const;

const handleEditorMount: OnMount = (_, monaco) => {
  monaco.editor.defineTheme("coderun-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "comment",
        foreground: EDITOR_COLORS.syntaxComment,
        fontStyle: "italic",
      },
      { token: "keyword", foreground: EDITOR_COLORS.syntaxKeyword },
      { token: "string", foreground: EDITOR_COLORS.syntaxString },
      { token: "number", foreground: EDITOR_COLORS.syntaxNumber },
      { token: "type", foreground: EDITOR_COLORS.syntaxType },
      { token: "function", foreground: EDITOR_COLORS.syntaxFunction },
    ],
    colors: {
      "editor.background": EDITOR_COLORS.surfaceBase,
      "editor.foreground": EDITOR_COLORS.textPrimary,
      "editor.lineHighlightBackground": EDITOR_COLORS.surfaceRaised,
      "editor.selectionBackground": `${EDITOR_COLORS.accent}33`,
      "editor.inactiveSelectionBackground": `${EDITOR_COLORS.accent}1a`,
      "editorLineNumber.foreground": EDITOR_COLORS.borderDefault,
      "editorLineNumber.activeForeground": EDITOR_COLORS.accent,
      "editorCursor.foreground": EDITOR_COLORS.accent,
      "editorIndentGuide.background1": EDITOR_COLORS.surfaceOverlay,
      "editorIndentGuide.activeBackground1": EDITOR_COLORS.borderDefault,
    },
  });
  monaco.editor.setTheme("coderun-dark");
};

export function CodeEditor({ value, language, onChange }: CodeEditorProps) {
  return (
    <MonacoEditor
      value={value}
      language={language}
      onMount={handleEditorMount}
      onChange={(val) => onChange(val ?? "")}
      options={MONACO_OPTIONS}
      loading={
        <div className="flex h-full items-center justify-center bg-surface-base">
          <span className="text-xs text-text-faint font-mono">
            Loading editor…
          </span>
        </div>
      }
    />
  );
}
