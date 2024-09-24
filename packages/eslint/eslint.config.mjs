import { env } from "node:process";

import pluginJs from "@eslint/js";
import { plugin as ex } from "eslint-plugin-exception-handling";
import importPlugin from "eslint-plugin-import";
import unicornPlugin from "eslint-plugin-unicorn";
import pluginTs from "typescript-eslint";

export const config = pluginTs.config(
  {
    name: "@adambullmer/input-files",
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["**/node_modules/*", "**/.yarn/*", "**/dist/*", "**/artifacts/*"],
  },
  { name: "@adambullmer/plugin-exception-handling", plugins: { ex }, rules: { "ex/no-unhandled": "error" } },
  { name: "@adambullmer/plugin-imports", plugins: { import: importPlugin }, rules: {} },
  { name: "@adambullmer/plugin-unicorn", plugins: { unicorn: unicornPlugin }, rules: {} },
  // {
  //   name: "@adambullmer/environment-globals",
  //   languageOptions: { globals: { ...globals.browser, ...globals.node } },
  // },

  pluginJs.configs.recommended,
  ...pluginTs.configs.strict,
  ...pluginTs.configs.stylistic,

  {
    name: "@adambullmer/universal-config",
    files: ["**/*.{{m,c}?j,c?t}sx?"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "no-console": env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": env.NODE_ENV === "production" ? "error" : "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  {
    name: "@adambullmer/test-files",
    files: ["**/*.spec.{j,t}s", "**/__mocks__/**/*.{j,t}s"],
    rules: {},
  },
);
