import { Tool } from "#tools";

import type { LanguageConfig } from "./types.js";

export const json: LanguageConfig = {
  files: "*.json?(c|5)",
  linters: [],
  formatters: [Tool.Dprint, Tool.Oxfmt, Tool.Prettier],
};
