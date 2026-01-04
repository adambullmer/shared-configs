import type { PluginSpec } from "semantic-release";

/**
 * Configured github plugin for creating releases
 */
export const yarnPlugin: PluginSpec = [
  "semantic-release-yarn",
  {
    // Disable so that a follow up publish command can be used with npm's --provenance flag
    // This adds confidence to the ecosystem for this package's supply chain authenticity
    npmPublish: false,
    tarballDir: "artifacts/package",
  },
];
