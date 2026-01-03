import type { Configuration } from "lint-staged";

import { fallback, html, javascript, json, markdown, style, taskFactory, yaml } from "#tasks";

const config: Configuration = {
  [javascript.files]: taskFactory(javascript),
  [style.files]: taskFactory(style),
  [html.files]: taskFactory(html),
  [markdown.files]: taskFactory(markdown),
  [json.files]: taskFactory(json),
  [yaml.files]: taskFactory(yaml),
  [fallback.files]: taskFactory(fallback),
};

export default config;
