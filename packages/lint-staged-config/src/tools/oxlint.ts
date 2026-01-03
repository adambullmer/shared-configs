import type { ToolConfig } from "./types.js";

export const oxlintToolConfig: ToolConfig = {
  command: (files) => `oxlint --fix ${files.join(" ")}`,
  configFiles: [".oxlintrc.json"],
  detectMethod: "npm",
};
