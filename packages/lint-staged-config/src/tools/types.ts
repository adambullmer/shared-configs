export enum Tool {
  /**
   * @see https://dprint.dev/
   */
  Dprint = "dprint",

  /**
   * @see https://oxc.rs/docs/guide/usage/formatter.html
   */
  Oxfmt = "oxfmt",

  /**
   * @see https://oxc.rs/docs/guide/usage/linter.html
   */
  Oxlint = "oxlint",

  /**
   * @see https://stylelint.io/
   */
  Stylelint = "stylelint",

  /****************************************************************************
   * DEPRECATED
   ***************************************************************************/
  /**
   * @see https://eslint.org/
   * @deprecated Switch to oxlint for performant linting
   */
  Eslint = "eslint",

  /**
   * @see https://prettier.io/
   * @deprecated Switch to dprint and oxfmt for performant, cross filetype formatting
   */
  Prettier = "prettier",

  /**
   * @see https://biomejs.dev/
   * @deprecated Switch to oxlint and oxfmt to maintain for performant linting and formatting
   */
  Biome = "biome",
}

export interface ToolConfig {
  /**
   * The command to run, including any necessary arguments.
   * Use {files} as a placeholder if the tool needs files in a specific position,
   * otherwise files will be appended to the end.
   */
  command: (files: readonly string[]) => string;

  /**
   * List of possible config files for this tool.
   */
  configFiles: string[];

  /**
   * How to detect if the tool is available.
   * - "npm": Check if the package is installed via require.resolve
   * - "path": Check if the binary exists in PATH (e.g., via `which`)
   */
  detectMethod: "npm" | "path";

  /**
   * The binary or package name to check for availability.
   * Defaults to the tool name if not specified.
   */
  binary?: string;

  /**
   * npm package name if different from binary
   */
  packageName?: string;
}
