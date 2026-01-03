import type { ToolConfig } from "./types.js";

export const oxfmtToolConfig: ToolConfig = {
  command: (files) => `oxfmt --write ${files.join(" ")}`,
  configFiles: [".oxfmtrc.json", ".oxfmtrc.jsonc"],
  detectMethod: "npm",
};
