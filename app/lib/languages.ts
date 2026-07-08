import type { Language } from "@/types/editor";

export const LANGUAGES: Language[] = [
  {
    id: "go",
    label: "Go",
    monacoLanguage: "go",
    pistonRuntime: "go",
    version: "1.16.2",
    defaultCode: `package main

import "fmt"

func main() {
\tfmt.Println("Hello, World!")
}`,
  },
  {
    id: "python",
    label: "Python",
    monacoLanguage: "python",
    pistonRuntime: "python",
    version: "3.12.0",
    defaultCode: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    monacoLanguage: "typescript",
    pistonRuntime: "typescript",
    version: "5.0.3",
    defaultCode: `function main(): void {
  console.log("Hello, World!");
}

main();`,
  },
  {
    id: "rust",
    label: "Rust",
    monacoLanguage: "rust",
    pistonRuntime: "rust",
    version: "1.68.2",
    defaultCode: `fn main() {
    println!("Hello, World!");
}`,
  },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

export function getLanguageById(id: string): Language | undefined {
  return LANGUAGES.find((lang) => lang.id === id);
}
