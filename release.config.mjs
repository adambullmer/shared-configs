import { parserPreset } from "commitlint-plugin-semantic-commit-emoji/parser";

// Requires a first party dependency on conventional-changelog-conventionalcommits
const preset = "conventionalcommits";

const semanticReleaseMonorepoPath = import.meta.resolve("semantic-release-monorepo");

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  extends: semanticReleaseMonorepoPath,
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "next",
    "next-major",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset,
        parserOpts: parserPreset.parserOpts,
        releaseRules: [
          { type: "types", scope: "*", release: "minor" },
          { type: "refactor", release: "minor" },
          { type: "style", release: "patch" },
          { type: "hotfix", release: "patch" },
          { type: "locale", release: "patch" },
          { type: "docs", scope: "*", release: "patch" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset,
        parserOpts: parserPreset.parserOpts,
      },
    ],
    [
      "semantic-release-yarn",
      {
        // Disable so that a follow up publish command can be used with npm's --provenance flag
        // This adds confidence to the ecosystem for this package's supply chain authenticity
        npmPublish: true,
        tarballDir: "artifacts/package",
      },
    ],
    [
      "@semantic-release/github",
      {
        failComment: false,
        failTitle: false,
        labels: false,
        assets: "artifacts/package/*.tgz",
      },
    ],
  ],
};
