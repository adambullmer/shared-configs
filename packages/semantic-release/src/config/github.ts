import type { PluginSpec } from "semantic-release";

/**
 * Configured github plugin for creating releases
 */
export const githubPlugin: PluginSpec = [
  "@semantic-release/github",
  {
    assets: [],
    failComment: false,
    failTitle: false,
    labels: false,
  },
];
