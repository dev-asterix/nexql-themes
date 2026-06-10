import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PREVIEW_COLOR_KEYS } from "../src/preview-workbench.mjs";
import { contrastPairs } from "../src/color-keys.mjs";
import { contrastRatio } from "../src/utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const themes = packageJson.contributes?.themes ?? [];

const MIN_COLOR_KEYS = 80;
const MIN_TOKEN_RULES = 10;

if (!themes.length) {
  throw new Error("package.json must contribute at least one theme.");
}

const seenLabels = new Set();
const validUiThemes = new Set(["vs", "vs-dark", "hc-black", "hc-light"]);
const validTypes = new Set(["light", "dark", "hc"]);
const HEX_COLOR = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

/**
 * @param {string} value
 * @returns {string}
 */
function solidColor(value) {
  if (!value || !HEX_COLOR.test(value)) {
    throw new Error(`Invalid color value: ${value}`);
  }
  if (value.length === 9) {
    const alpha = Number.parseInt(value.slice(7, 9), 16) / 255;
    if (alpha < 0.35) {
      throw new Error(`Color alpha too low for contrast check: ${value}`);
    }
    return value.slice(0, 7);
  }
  return value;
}

/**
 * @param {Record<string, string>} colors
 * @param {string} key
 * @returns {string | undefined}
 */
function resolveColor(colors, key) {
  const value = colors[key];
  if (!value) {
    return undefined;
  }
  return solidColor(value);
}

/** @type {string[]} */
const errors = [];

for (const theme of themes) {
  if (!theme.label || seenLabels.has(theme.label)) {
    errors.push(`Theme label is missing or duplicated: ${theme.label}`);
    continue;
  }
  seenLabels.add(theme.label);

  if (!validUiThemes.has(theme.uiTheme)) {
    errors.push(`${theme.label} uses invalid uiTheme "${theme.uiTheme}".`);
  }

  const themePath = path.join(root, theme.path);
  const themeJson = JSON.parse(await readFile(themePath, "utf8"));

  if (themeJson.name !== theme.label) {
    errors.push(`${theme.path} name must match package label "${theme.label}".`);
  }

  if (!validTypes.has(themeJson.type)) {
    errors.push(`${theme.path} has invalid type "${themeJson.type}".`);
  }

  const colorCount = Object.keys(themeJson.colors ?? {}).length;
  if (colorCount < MIN_COLOR_KEYS) {
    errors.push(`${theme.path} should define at least ${MIN_COLOR_KEYS} workbench colors (has ${colorCount}).`);
  }

  for (const key of PREVIEW_COLOR_KEYS) {
    if (!themeJson.colors?.[key]) {
      errors.push(`${theme.path} is missing required preview key "${key}".`);
    }
  }

  if (!Array.isArray(themeJson.tokenColors) || themeJson.tokenColors.length < MIN_TOKEN_RULES) {
    errors.push(`${theme.path} should define at least ${MIN_TOKEN_RULES} token color rules.`);
  }

  if (!themeJson.semanticTokenColors || Object.keys(themeJson.semanticTokenColors).length < 8) {
    errors.push(`${theme.path} should define semantic token colors.`);
  }

  for (const [key, value] of Object.entries(themeJson.colors ?? {})) {
    if (typeof value !== "string" || !HEX_COLOR.test(value)) {
      errors.push(`${theme.path} color "${key}" is not a valid hex color: ${value}`);
    }
  }

  for (const pair of contrastPairs(themeJson.colors, themeJson.type)) {
    const fg = resolveColor(themeJson.colors, pair.fg);
    const bg = resolveColor(themeJson.colors, pair.bg);
    if (!fg || !bg) {
      continue;
    }
    try {
      const ratio = contrastRatio(fg, bg);
      if (ratio < pair.min) {
        errors.push(
          `${theme.label}: ${pair.label} contrast ${ratio.toFixed(2)} < ${pair.min} (${pair.fg} on ${pair.bg}).`,
        );
      }
    } catch (error) {
      errors.push(`${theme.label}: contrast check failed for ${pair.label}: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):\n`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${themes.length} NexQL theme(s).`);
