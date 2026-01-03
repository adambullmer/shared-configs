import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

import { toolConfigs } from "./index.ts";
import type { Tool } from "./types.ts";

// Create a require function for ESM compatibility
// eslint-disable-next-line ex/no-unhandled
const require = createRequire(import.meta.url);

/**
 * Checks if a tool's binary is available via npm (node_modules)
 */
function isNpmBinaryInstalled(tool: Tool): boolean {
  const config = toolConfigs[tool];
  // Use packageName if specified, otherwise fall back to tool name
  const packageName = config.packageName ?? config.binary ?? tool;
  try {
    require.resolve(packageName);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a tool's binary is available in PATH
 */
function isPathBinaryInstalled(tool: Tool): boolean {
  const config = toolConfigs[tool];
  const binary = config.binary ?? tool;
  try {
    // Cross-platform: use 'where' on Windows, 'which' elsewhere
    const command = process.platform === "win32" ? `where ${binary}` : `which ${binary}`;
    execSync(command, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a tool's binary is available
 */
export function isBinaryInstalled(tool: Tool): boolean {
  const config = toolConfigs[tool];
  return config.detectMethod === "npm" ? isNpmBinaryInstalled(tool) : isPathBinaryInstalled(tool);
}

/**
 * Checks if a tool has a configuration file in the consuming project
 */
export function hasConfigFile(tool: Tool): boolean {
  const config = toolConfigs[tool];
  // Handle tools that don't require config files
  if (!config.configFiles || config.configFiles.length === 0) {
    return true;
  }
  return config.configFiles.some((configFile) => existsSync(resolve(process.cwd(), configFile)));
}

/**
 * Checks if a tool is valid (has both binary installed and config file present)
 */
export function isToolAvailable(tool: Tool): boolean {
  return isBinaryInstalled(tool) && hasConfigFile(tool);
}

/**
 * Gets the full command for a tool
 */
export function getToolCommand(tool: Tool, stagedFiles: readonly string[]): string {
  return toolConfigs[tool].command(stagedFiles);
}
