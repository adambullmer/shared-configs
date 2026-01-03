import { Tool } from "#tools";

import { html } from "./html.js";
import { javascript } from "./javascript.js";
import { json } from "./json.js";
import { markdown } from "./markdown.js";
import { style } from "./style.js";
import { LanguageConfig } from "./types.js";
import { yaml } from "./yaml.js";

/**
 * All language configs for iteration
 */
export const languageConfigs: LanguageConfig[] = [javascript, style, html, markdown, json, yaml];

/**
 * Fallback pattern that matches any file NOT matched by the language-specific patterns.
 * Used to run dprint on miscellaneous files.
 */
export const fallbackFiles: string = languageConfigs.map((config) => `${config.files}`).join(",");

export const fallback: LanguageConfig = {
  files: `!{${fallbackFiles}}`,
  linters: [],
  formatters: [Tool.Dprint],
};
