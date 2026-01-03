import { Tool } from "#tools";

import type { LanguageConfig } from "./types.js";

export const yaml: LanguageConfig = {
  files: "*.y?(a)ml",
  linters: [],
  formatters: [Tool.Dprint, Tool.Oxfmt, Tool.Prettier],
};
