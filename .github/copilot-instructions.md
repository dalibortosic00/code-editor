# Copilot Instructions for coderun

This is a Next.js-based online code editor that executes code across multiple languages using the Piston API.

## Build, Test & Lint

**Development:**

```bash
yarn dev          # Start dev server at http://localhost:3000
```

**Production:**

```bash
yarn build        # Build for production
yarn start        # Start production server
```

**Code Quality:**

```bash
yarn lint         # Run ESLint on all files
yarn lint --fix   # Fix linting issues automatically
```

## High-Level Architecture

The application follows a client-heavy architecture with minimal server-side logic:

- **Main Page** (`app/page.tsx`): Orchestrates the editor layout and manages code state
- **Monaco Editor Integration** (`app/components/editor/CodeEditor.tsx`): Displays code with syntax highlighting and editing capabilities using `@monaco-editor/react` with dynamic loading (SSR disabled)
- **Code Execution Flow**: User code → `useCodeExecution()` hook → `piston.ts` API wrapper → Piston external API → execution result
- **Language Configuration** (`app/lib/languages.ts`): Maps language metadata between Monaco (UI), Piston (execution), and UI labels. Supports Go, Python, JavaScript, TypeScript, and Rust
- **Type System** (`app/types/editor.ts`): Centralized type definitions for Language, ExecutionResult, and ExecutionStatus

**Key Components:**

- `CodeEditor`: Monaco editor wrapper with custom styling and options
- `OutputPanel`: Displays execution results, stderr, and errors
- `LanguageSelector`: Dropdown to switch languages
- `RunButton`: Triggers code execution

## Key Conventions

1. **Client Components**: Always use `"use client"` at the top of components that use React hooks (state, effects, event handlers)

2. **Dynamic Imports**: Browser-only components (like Monaco Editor) must use `next/dynamic` with `{ ssr: false }` to avoid SSR issues

3. **Type-First Design**: Place shared types in `app/types/` rather than defining them inline. Example: `Language`, `ExecutionResult`, `ExecutionStatus`

4. **Utility Functions**: General utilities go in `app/lib/` (e.g., `languages.ts` for language metadata, `piston.ts` for API interactions)

5. **Custom Hooks**: Keep stateful logic in `app/hooks/` (e.g., `useCodeExecution` for execution state management)

6. **Component Organization**: Group related components by feature under `app/components/{feature}/`

7. **Styling**: Uses Tailwind CSS v4 with PostCSS. Arbitrary colors used for dark theme (e.g., `bg-[#0d0d0f]`, `text-[#e4e4e7]`)

8. **React Compiler**: Enabled in `next.config.ts`. Memoization may be optimized automatically; avoid premature manual optimization

9. **Piston API Integration**: `executeCode()` accepts a `PistonExecuteRequest` with language, version, and file content. Always include the language version matching the runtime in `languages.ts`. The public Piston API is whitelist-only; configure `PISTON_BASE_URL` in `app/lib/piston.ts` for self-hosted instances.

10. **Next.js Version**: This is Next.js 16.2.9 with potentially breaking changes. Refer to `node_modules/next/dist/docs/` before using unfamiliar APIs
