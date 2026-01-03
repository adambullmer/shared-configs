import type { Tool } from "#tools";

export interface LanguageConfig {
  /**
   * File matcher
   */
  files: string;

  /**
   * Ordered list of linter commands to be detected. Will run before formatters so that linting results are formatted.
   * Linters are considered tools that check for correctness/bugs but may have some overlap with formatters.
   */
  linters: Tool[];

  /**
   * Ordered list of formatter commands to be detected.
   * Formatters are considered tools that automatically format code, largely whitespace or import ordering changes.
   */
  formatters: Tool[];
}
