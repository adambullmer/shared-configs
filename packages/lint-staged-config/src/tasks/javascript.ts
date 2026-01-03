import { Tool } from "#tools";

import type { LanguageConfig } from "./types.js";

export const javascript: LanguageConfig = {
  files: "*.{?(m|c)@(t|j)s?(x),vue}",
  linters: [Tool.Oxlint, Tool.Eslint, Tool.Biome],
  formatters: [Tool.Dprint, Tool.Oxfmt, Tool.Prettier],
};
