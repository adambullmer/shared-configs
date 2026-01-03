import type { ToolConfig } from "./types.js";

export const stylelintToolConfig: ToolConfig = {
  command: (files) => `stylelint --fix ${files.join(" ")}`,
  configFiles: [
    "stylelint.config.js",
    "stylelint.config.mjs",
    "stylelint.config.cjs",
    "stylelint.config.ts",
    "stylelint.config.mts",
    ".stylelintrc",
    ".stylelintrc.js",
    ".stylelintrc.cjs",
    ".stylelintrc.mjs",
    ".stylelintrc.json",
    ".stylelintrc.yml",
    ".stylelintrc.yaml",
  ],
  detectMethod: "npm",
};
