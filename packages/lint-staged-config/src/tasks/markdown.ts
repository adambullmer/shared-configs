import { Tool } from "#tools";

import type { LanguageConfig } from "./types.js";

export const markdown: LanguageConfig = {
  files: "*.md",
  linters: [],
  formatters: [Tool.Dprint, Tool.Oxfmt, Tool.Prettier],
};
