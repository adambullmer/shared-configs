import { Tool } from "#tools";

import type { LanguageConfig } from "./types.js";

export const html: LanguageConfig = {
  files: "*.htm?(l|x)",
  linters: [Tool.Oxlint, Tool.Eslint, Tool.Biome],
  formatters: [Tool.Dprint, Tool.Oxfmt, Tool.Prettier],
};
