import { Tool } from "#tools";

import type { LanguageConfig } from "./types.js";

export const style: LanguageConfig = {
  files: "*.{sass,scss,css}",
  linters: [Tool.Oxlint, Tool.Stylelint, Tool.Eslint, Tool.Biome],
  formatters: [Tool.Dprint, Tool.Oxfmt, Tool.Prettier],
};
