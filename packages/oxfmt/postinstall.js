#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get the consuming project's root directory (where package.json is)
const projectRoot = process.env.INIT_CWD || process.cwd();

// Skip if we're in the package itself (during development/publishing)
if (projectRoot === __dirname) {
  console.log("Skipping postinstall in package directory");
  process.exit(0);
}

const targetConfigPath = join(projectRoot, ".oxfmtrc.jsonc");
const sourceConfigPath = join(__dirname, ".oxfmtrc.jsonc");

/**
 * Try to resolve the oxfmt binary path.
 * Works with npm, yarn, pnpm, and Yarn PnP.
 */
function resolveOxfmtBin() {
  try {
    const require = createRequire(join(projectRoot, "package.json"));
    return require.resolve("oxfmt/bin/oxfmt");
  } catch {
    // Fallback to npx which should work in most cases
    return null;
  }
}

/**
 * Run oxfmt to format the config file
 */
function formatWithOxfmt() {
  try {
    const oxfmtBin = resolveOxfmtBin();
    const cmd = oxfmtBin ? `node "${oxfmtBin}" "${targetConfigPath}"` : `npx oxfmt "${targetConfigPath}"`;

    execSync(cmd, {
      cwd: projectRoot,
      stdio: "pipe",
    });
    console.log("✓ Formatted .oxfmtrc.jsonc with oxfmt");
  } catch {
    // Silently ignore formatting errors - the file is still valid
    console.log("⚠ Could not format with oxfmt (oxfmt may not be installed yet)");
  }
}

/**
 * Try to resolve the oxfmt schema path relative to the project root.
 * Works with npm, yarn, pnpm, and Yarn PnP.
 */
function resolveSchemaPath() {
  try {
    // Create a require function that resolves from the project root
    const require = createRequire(join(projectRoot, "package.json"));
    const oxfmtPath = require.resolve("oxfmt/configuration_schema.json");

    // Make it relative to the project root for portability
    const relativePath = relative(projectRoot, oxfmtPath);

    // Use ./ prefix for clarity and ensure forward slashes
    return `./${relativePath.replace(/\\/g, "/")}`;
  } catch {
    // Fallback to the traditional path if resolution fails
    return "./node_modules/oxfmt/configuration_schema.json";
  }
}

/**
 * Parse JSONC (JSON with comments) content
 */
function parseJsonc(content) {
  // Remove single-line comments
  let cleaned = content.replace(/\/\/.*$/gm, "");
  // Remove multi-line comments
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove trailing commas
  cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1");

  return JSON.parse(cleaned);
}

/**
 * Merge two objects deeply
 */
function deepMerge(target, source) {
  const output = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

/**
 * Format the config object back to JSONC format with comments
 */
function formatConfig(config) {
  const schemaPath = resolveSchemaPath();
  const lines = ["{", `  "$schema": "${schemaPath}",`, "  // Configuration managed by @rewardstyle/oxfmt-config"];

  const configEntries = Object.entries(config).filter(([key]) => key !== "$schema");

  configEntries.forEach(([key, value], index) => {
    const isLast = index === configEntries.length - 1;
    const jsonValue = JSON.stringify(value, null, 2);
    const indentedValue = jsonValue
      .split("\n")
      .map((line, i) => (i === 0 ? line : `  ${line}`))
      .join("\n");

    lines.push(`  "${key}": ${indentedValue}${isLast ? "" : ","}`);
  });

  lines.push("}");
  lines.push(""); // Final newline

  return lines.join("\n");
}

try {
  const sourceContent = readFileSync(sourceConfigPath, "utf-8");
  const sourceConfig = parseJsonc(sourceContent);

  if (existsSync(targetConfigPath)) {
    console.log("Found existing .oxfmtrc.jsonc, merging with shared config...");

    const existingContent = readFileSync(targetConfigPath, "utf-8");
    const existingConfig = parseJsonc(existingContent);

    // Merge: existing config takes precedence over shared config
    const mergedConfig = deepMerge(sourceConfig, existingConfig);

    const formattedConfig = formatConfig(mergedConfig);
    writeFileSync(targetConfigPath, formattedConfig, "utf-8");

    console.log("✓ Merged .oxfmtrc.jsonc with shared configuration");
    formatWithOxfmt();
  } else {
    console.log("Creating .oxfmtrc.jsonc in project root...");

    // Copy the source config with a comment indicating it's from the package
    const formattedConfig = formatConfig(sourceConfig);
    writeFileSync(targetConfigPath, formattedConfig, "utf-8");

    console.log("✓ Created .oxfmtrc.jsonc with shared configuration");
    formatWithOxfmt();
  }
} catch (error) {
  console.error("Error setting up .oxfmtrc.jsonc:", error.message);
  // Don't fail the installation
  process.exit(0);
}
