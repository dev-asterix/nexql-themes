import { sortColors } from "../src/utils.mjs";

/**
 * Keep keys present only in `previous` (hand-authored JSON extensions).
 * Generated values win for keys the builder already emits.
 *
 * @param {Record<string, string>} generated
 * @param {Record<string, string> | undefined} previous
 * @returns {Record<string, string>}
 */
export function preserveCustomColorKeys(generated, previous) {
  if (!previous) {
    return generated;
  }

  const merged = { ...generated };
  for (const [key, value] of Object.entries(previous)) {
    if (!(key in generated)) {
      merged[key] = value;
    }
  }
  return merged;
}

/**
 * Append token rules from `previous` whose `name` is not produced by the generator.
 *
 * @param {Array<{ name?: string, scope?: string | string[], settings?: Record<string, string> }>} generated
 * @param {Array<{ name?: string, scope?: string | string[], settings?: Record<string, string> }> | undefined} previous
 */
export function preserveCustomTokenRules(generated, previous) {
  if (!previous?.length) {
    return generated;
  }

  const generatedNames = new Set(generated.map((rule) => rule.name).filter(Boolean));
  const customRules = previous.filter((rule) => rule.name && !generatedNames.has(rule.name));
  return customRules.length ? [...generated, ...customRules] : generated;
}

/**
 * @param {Record<string, unknown>} generated
 * @param {Record<string, unknown>} previous
 */
export function mergeThemeJson(generated, previous) {
  return {
    ...generated,
    colors: sortColors(preserveCustomColorKeys(generated.colors, previous.colors)),
    tokenColors: preserveCustomTokenRules(generated.tokenColors, previous.tokenColors),
    semanticTokenColors: preserveCustomColorKeys(
      generated.semanticTokenColors ?? {},
      previous.semanticTokenColors,
    ),
  };
}
