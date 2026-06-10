---
name: new-theme
description: Scaffold and register a new NexQL static color theme — create the themes/*.json file, add it to src/static-themes.mjs, then compile + validate. Use when the user wants to add a new theme variant.
disable-model-invocation: true
---

# Add a NexQL static theme

Use this for hand-authored themes (the STATIC_THEMES path). For generated themes, edit a `DirectionSpec` and `src/directions/index.mjs` instead.

`$ARGUMENTS` is the new theme's display label (e.g. "NexQL Frost Day"). If empty, ask for it.

## Steps

1. **Derive identifiers** from the label:
   - `label` = the display name, must start with `NexQL ` and be unique.
   - `filename` = kebab-case + `-color-theme.json`, e.g. `nexql-frost-day-color-theme.json`.
   - `uiTheme` = `vs` for light, `vs-dark` for dark (`hc-black`/`hc-light` for high-contrast).

2. **Create `themes/<filename>`** as a complete VS Code theme JSON. Easiest: copy the closest existing theme of the same `uiTheme` from `themes/`, then recolor. It MUST satisfy validation:
   - `"name"` exactly equal to the label.
   - `"type"`: `light` / `dark` / `hc`.
   - `colors`: ≥80 keys, all valid 6/8-digit hex, including every key in `PREVIEW_COLOR_KEYS` (`src/preview-workbench.mjs`).
   - `tokenColors`: ≥10 rules. `semanticTokenColors`: ≥8 entries.
   - Contrast pairs in `src/color-keys.mjs` must clear their minimum ratio.

3. **Register it** by adding one line to `STATIC_THEMES` in `src/static-themes.mjs`:
   ```js
   { label: "<label>", uiTheme: "<uiTheme>", filename: "<filename>" },
   ```
   Do not touch `package.json` `contributes.themes` — `generate` rewrites it from this list.

4. **Build**: `npm run compile`. `generate` registers the theme in `package.json` and `validate` enforces the rules above. Fix any reported errors (usually contrast or a missing preview key).

5. Optionally launch the Extension Development Host (`/preview` or `make debug`) to eyeball it.
