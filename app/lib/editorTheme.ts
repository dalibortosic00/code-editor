/**
 * Design tokens for the Monaco editor theme.
 * These mirror the CSS custom properties defined in globals.css @theme.
 * Monaco accepts raw hex strings, so we can't use CSS variables directly —
 * keep these in sync if you change the palette.
 */
export const EDITOR_COLORS = {
  // Surfaces
  surfaceBase: "#0d0d0f",
  surfaceRaised: "#141416",
  surfaceOverlay: "#1e1e22",

  // Borders
  borderDefault: "#2e2e34",

  // Accent
  accent: "#6366f1",

  // Text
  textPrimary: "#e4e4e7",
  textFaint: "#6b7280",

  // Syntax
  syntaxComment: "#4b5563",
  syntaxKeyword: "#818cf8",
  syntaxString: "#6ee7b7",
  syntaxNumber: "#fb923c",
  syntaxType: "#67e8f9",
  syntaxFunction: "#c4b5fd",
} as const;
