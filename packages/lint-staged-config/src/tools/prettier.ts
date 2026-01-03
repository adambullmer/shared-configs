import type { ToolConfig } from "./types.js";

export const prettierToolConfig: ToolConfig = {
  command: (files) => `prettier --write ${files.join(" ")}`,
  configFiles: [
    "prettier.config.js",
    "prettier.config.mjs",
    "prettier.config.cjs",
    "prettier.config.ts",
    "prettier.config.mts",
    ".prettierrc",
    ".prettierrc.js",
    ".prettierrc.cjs",
    ".prettierrc.mjs",
    ".prettierrc.json",
    ".prettierrc.yml",
    ".prettierrc.yaml",
    ".prettierrc.json5",
    ".prettierrc.toml",
  ],
  detectMethod: "npm",
};
