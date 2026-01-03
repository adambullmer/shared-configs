import type { ToolConfig } from "./types.js";

export const biomeToolConfig: ToolConfig = {
  command: (files) => `biome check --write ${files.join(" ")}`,
  configFiles: ["biome.json", "biome.jsonc"],
  detectMethod: "npm",
};
