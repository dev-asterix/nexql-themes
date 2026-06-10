# Changelog

## 0.5.0

**11 hand-authored themes** — scenario-anchored names, `NexQL` prefix in picker labels.

### Themes (current lineup)

| Theme | Type |
| --- | --- |
| NexQL Mute Dark | dark |
| NexQL OLED Dark | dark |
| NexQL Ember Dark | dark |
| NexQL Drift Dark | dark |
| NexQL Break of Dawn | light |
| NexQL Claudy Day | light |
| NexQL Claudy Night | dark |
| NexQL Postgres Homage Dark | dark |
| NexQL Postgres Homage Day | light |
| NexQL Sage Day | light |
| NexQL Sage at Night | dark |

### Added

- **NexQL OLED Dark** — true-black AMOLED variant (Mute Dark chrome + Break of Dawn syntax, brightened for `#000000` canvas).
- **NexQL Sage Day** / **NexQL Sage at Night** — sage-green light pair; night is a true dark counterpart with sage-tinted depth ladder.
- **NexQL Postgres Homage Dark** / **NexQL Postgres Homage Day** — Postgres `#336791` homage; slate-blue base, ivory foreground, amber data.
- **NexQL Claudy Day** / **NexQL Claudy Night** — Claude Code–inspired pair (warm parchment light, ink dark).

### Renamed (quirky → scenario slugs)

| Was | Now |
| --- | --- |
| NexQL Indoor Voice | NexQL Mute Dark |
| NexQL Spicy Query | NexQL Ember Dark |
| NexQL Fog Bank | NexQL Drift Dark |
| NexQL Solar Powered | NexQL Break of Dawn |
| NexQL Claudy's Brunch | NexQL Claudy Day |
| NexQL Claudy After Hours | NexQL Claudy Night |
| NexQL Elephant | NexQL Postgres Homage Dark |
| NexQL Savanna Sun | NexQL Postgres Homage Day |

### Removed

- **NexQL Spectrum** — duplicate of Mute Dark in the theme picker.
- **NexQL Sentry Goose** (sentinel), **NexQL Existential Dread** (void).
- **NexQL OpenAI Day** / **NexQL OpenAI Night**.
- **NexQL Grainy Day** (film-photography light).
- **NexQL Mint Cream**.

### Build & dev

- `scripts/merge-theme-customizations.mjs` — compile preserves hand-authored JSON keys not owned by the generator.
- F5 workflow: `.vscode/launch.json`, `.vscode/tasks.json`, `Makefile` targets (`build`, `package`, `debug`).
- Pure theme manifest — dropped `extension.js` / `activationEvents`; `extensionKind: ["workspace", "ui"]` for WSL dev host.
- Repo cleanup — removed legacy matrix generator (`generate-themes.mjs`), one-off scaffolds, and stale `.vsix` artifacts; added `*.vsix` to `.gitignore`.

## 0.4.0

- Import six scenario-anchored variants from the theme-family pack with quirky picker names.
- Added `src/static-themes.mjs` — hand-authored themes survive `npm run generate`.
- `generate-previews.mjs` registers static + generated themes; no longer deletes unrecognized JSON files.
- Seven themes total: Spectrum + Indoor Voice, Spicy Query, Sentry Goose, Fog Bank, Solar Powered, Existential Dread.

## 0.3.2

- Calm syntax hierarchy: quiet indigo-gray keywords, merged data amber, desaturated scan colors.
- Magenta (`#E85FBF`) reserved for errors only — exits high-frequency syntax.

## 0.3.1

- Replace four direction previews with flagship **NexQL Spectrum** dark theme.
- Warm near-black surfaces, cool→warm syntax ribbon, single indigo UI accent (`#8A8CFF`).

## 0.3.0

- Pivot from 28 generic variants to 4 hand-tuned direction previews.
- Directions: Chromatic, Noir, Cartography, Density.
- Curated ~120 workbench keys per preview + SQL-first syntax per direction.
- Generator: `scripts/generate-previews.mjs`.
- Relaxed validation for preview scope; contrast checks on critical pairs retained.

## 0.2.0

- Generator-driven 28-theme matrix (Dark, Midnight, Soft Dark, Light, HC × accent × italic).

## 0.1.0

- Initial demo themes (hand-authored).
