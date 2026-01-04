import type { Options } from "semantic-release";

import { commitAnalyzerPlugin } from "#config/commit-analyzer";
import { githubPlugin } from "#config/github";
import { releaseNotesPlugin } from "#config/release-notes";
import { yarnPlugin } from "#config/yarn";

/**
 * Release config built for general applications, like a backend.
 * Does not presume an ecosystem language, however presumes the use of git and github in the workflow
 */
export const config: Options = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "next",
    "next-major",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [commitAnalyzerPlugin, releaseNotesPlugin, yarnPlugin, githubPlugin],
};
