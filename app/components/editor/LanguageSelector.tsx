"use client";

import type { Language } from "@/types/editor";
import { LANGUAGES } from "@/lib/languages";

interface LanguageSelectorProps {
  value: Language;
  onChange: (language: Language) => void;
  disabled?: boolean;
}

export function LanguageSelector({
  value,
  onChange,
  disabled = false,
}: LanguageSelectorProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value.id}
        onChange={(e) => {
          const lang = LANGUAGES.find((l) => l.id === e.target.value);
          if (lang) onChange(lang);
        }}
        disabled={disabled}
        aria-label="Select programming language"
        className="h-8 rounded px-2 pr-7 text-xs font-mono font-medium bg-surface-overlay text-text-muted border border-border-default appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:border-border-strong"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.label}
          </option>
        ))}
      </select>
      {/* Chevron — pointer-events-none so clicks pass through to the select */}
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute right-2 h-3 w-3 text-text-faint"
      >
        <path d="M2 4l4 4 4-4" />
      </svg>
    </div>
  );
}
