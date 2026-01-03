import type { GenerateTask } from "lint-staged";

import { getToolCommand, isToolAvailable } from "#tools";

import type { LanguageConfig } from "./types.js";

export function taskFactory(config: LanguageConfig): string | string[] | GenerateTask {
  return (stagedFiles) => {
    const commands: string[] = [];

    for (const linter of config.linters) {
      if (isToolAvailable(linter)) {
        commands.push(getToolCommand(linter, stagedFiles));
      }
    }

    for (const formatter of config.formatters) {
      if (isToolAvailable(formatter)) {
        commands.push(getToolCommand(formatter, stagedFiles));
      }
    }

    return commands;
  };
}
