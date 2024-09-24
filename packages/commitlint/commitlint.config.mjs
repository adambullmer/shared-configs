import { RuleConfigSeverity } from "@commitlint/types";
import semanticCommitEmojiPreset from "commitlint-config-semantic-commit-emoji";
import { parserPreset } from "commitlint-plugin-semantic-commit-emoji/parser";

/**
 * @type {import('@commitlint/types').UserConfig}
 */
export const config = {
  extends: ["@commitlint/config-conventional", "semantic-commit-emoji"],
  parserPreset: parserPreset,
  rules: {
    ...semanticCommitEmojiPreset.rules,
    "subject-case": [RuleConfigSeverity.Error, "always", "sentence-case"],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", Number.POSITIVE_INFINITY],
    "footer-max-line-length": [RuleConfigSeverity.Error, "always", Number.POSITIVE_INFINITY],
  },
};
