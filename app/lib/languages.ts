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
    version: "3.10.0",
    defaultCode: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    monacoLanguage: "javascript",
    pistonRuntime: "javascript",
    version: "18.15.0",
    defaultCode: `function main() {
  console.log("Hello, World!");
}

main();`,
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
    version: "1.50.0",
    defaultCode: `fn main() {
    println!("Hello, World!");
}`,
  },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

export function getLanguageById(id: string): Language | undefined {
  return LANGUAGES.find((lang) => lang.id === id);
}
