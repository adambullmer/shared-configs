import type { ToolConfig } from "./types.js";

export const eslintToolConfig: ToolConfig = {
  command: (files) => `eslint --fix ${files.join(" ")}`,
  configFiles: [
    "eslint.config.js",
    "eslint.config.mjs",
    "eslint.config.cjs",
    "eslint.config.ts",
    "eslint.config.mts",
    "eslint.config.cts",
    ".eslintrc",
    ".eslintrc.js",
    ".eslintrc.cjs",
    ".eslintrc.json",
    ".eslintrc.yml",
    ".eslintrc.yaml",
  ],
  detectMethod: "npm",
};
