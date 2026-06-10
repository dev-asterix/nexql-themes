/** @typedef {{ r: number, g: number, b: number, a?: number }} Rgb */

const HEX6 = /^#([0-9a-fA-F]{6})$/;
const HEX8 = /^#([0-9a-fA-F]{8})$/;

/**
 * @param {string} hex
 * @returns {Rgb}
 */
export function parseHex(hex) {
  const value = hex.trim();
  const match6 = HEX6.exec(value);
  if (match6) {
    const raw = match6[1];
    return {
      r: Number.parseInt(raw.slice(0, 2), 16),
      g: Number.parseInt(raw.slice(2, 4), 16),
      b: Number.parseInt(raw.slice(4, 6), 16),
      a: 1,
    };
  }

  const match8 = HEX8.exec(value);
  if (match8) {
    const raw = match8[1];
    return {
      r: Number.parseInt(raw.slice(0, 2), 16),
      g: Number.parseInt(raw.slice(2, 4), 16),
      b: Number.parseInt(raw.slice(4, 6), 16),
      a: Number.parseInt(raw.slice(6, 8), 16) / 255,
    };
  }

  throw new Error(`Invalid hex color: ${hex}`);
}

/**
 * @param {Rgb} rgb
 * @param {number} [alpha]
 * @returns {string}
 */
export function toHex(rgb, alpha) {
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
  const r = clamp(rgb.r).toString(16).padStart(2, "0");
  const g = clamp(rgb.g).toString(16).padStart(2, "0");
  const b = clamp(rgb.b).toString(16).padStart(2, "0");

  if (alpha !== undefined) {
    const a = clamp(alpha * 255).toString(16).padStart(2, "0");
    return `#${r}${g}${b}${a}`;
  }

  if (rgb.a !== undefined && rgb.a < 1) {
    const a = clamp(rgb.a * 255).toString(16).padStart(2, "0");
    return `#${r}${g}${b}${a}`;
  }

  return `#${r}${g}${b}`;
}

/**
 * @param {string} hex
 * @param {number} alpha 0-1
 * @returns {string}
 */
export function withAlpha(hex, alpha) {
  const rgb = parseHex(hex);
  return toHex(rgb, alpha);
}

/**
 * @param {string} hex
 * @param {number} amount -1..1
 * @returns {string}
 */
export function mix(hex, other, amount) {
  const a = parseHex(hex);
  const b = parseHex(other);
  const t = Math.max(0, Math.min(1, amount));
  return toHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
    a: a.a ?? 1,
  });
}

/**
 * @param {string} hex
 * @param {number} amount -1..1
 * @returns {string}
 */
export function lighten(hex, amount) {
  return mix(hex, "#FFFFFF", amount);
}

/**
 * @param {string} hex
 * @param {number} amount -1..1
 * @returns {string}
 */
export function darken(hex, amount) {
  return mix(hex, "#000000", amount);
}

/**
 * @param {Rgb} rgb
 * @returns {number}
 */
function relativeLuminance({ r, g, b }) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * @param {string} fg
 * @param {string} bg
 * @returns {number}
 */
export function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(parseHex(fg));
  const l2 = relativeLuminance(parseHex(bg));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * @param {Record<string, string>} colors
 * @returns {Record<string, string>}
 */
export function sortColors(colors) {
  return Object.fromEntries(
    Object.entries(colors).sort(([a], [b]) => a.localeCompare(b)),
  );
}
