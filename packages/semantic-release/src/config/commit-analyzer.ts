import { parserPreset } from "commitlint-plugin-semantic-commit-emoji/parser";
import type { PluginSpec } from "semantic-release";

const preset = "conventionalcommits";

const releaseRules = [
  { type: "types", release: "minor" },
  { type: "types", release: "minor", scope: "*" },
  { type: "refactor", release: "minor" },
  { type: "refactor", release: "minor", scope: "*" },
  { type: "style", release: "patch" },
  { type: "style", release: "patch", scope: "*" },
  { type: "hotfix", release: "patch" },
  { type: "hotfix", release: "patch", scope: "*" },
  { type: "locale", release: "patch" },
  { type: "locale", release: "patch", scope: "*" },
  { type: "docs", release: "patch" },
  { type: "docs", release: "patch", scope: "*" },
];

/**
 * Configured analyzer for a client repo
 */
export const commitAnalyzerPlugin: PluginSpec = [
  "@semantic-release/commit-analyzer",
  { parserOpts: parserPreset.parserOpts, preset, releaseRules },
];
