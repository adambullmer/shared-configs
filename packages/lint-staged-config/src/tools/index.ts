import { biomeToolConfig } from "./biome.js";
import { dprintToolConfig } from "./dprint.js";
import { eslintToolConfig } from "./eslint.js";
import { oxfmtToolConfig } from "./oxfmt.js";
import { oxlintToolConfig } from "./oxlint.js";
import { prettierToolConfig } from "./prettier.js";
import { stylelintToolConfig } from "./stylelint.js";
import type { ToolConfig } from "./types.js";
import { Tool } from "./types.js";

export { getToolCommand, isToolAvailable } from "./tool-detection.js";

export { Tool };

export const toolConfigs: Record<Tool, ToolConfig> = {
  [Tool.Dprint]: dprintToolConfig,
  [Tool.Oxfmt]: oxfmtToolConfig,
  [Tool.Oxlint]: oxlintToolConfig,
  [Tool.Stylelint]: stylelintToolConfig,
  [Tool.Eslint]: eslintToolConfig,
  [Tool.Prettier]: prettierToolConfig,
  [Tool.Biome]: biomeToolConfig,
};
