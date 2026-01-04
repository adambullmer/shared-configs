import { parserPreset } from "commitlint-plugin-semantic-commit-emoji/parser";
import type { PluginSpec } from "semantic-release";

const preset = "conventionalcommits";

export const releaseNotesPlugin: PluginSpec = [
  "@semantic-release/release-notes-generator",
  {
    preset,
    parserOpts: parserPreset.parserOpts,
  },
];
