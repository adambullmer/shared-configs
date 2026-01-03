import type { ToolConfig } from "./types.js";

export const dprintToolConfig: ToolConfig = {
  command: (files) => `dprint fmt --allow-no-files ${files.join(" ")}`,
  configFiles: [".dprint.json", ".dprint.jsonc"],
  detectMethod: "path",
};
