# NexQL Themes

**NexQL Spectrum** — flagship dark theme for the NexQL database client. Near-black warm chrome, spectrum syntax (cool structure → warm data), single indigo UI accent.

## Philosophy

- **Warm base** — editor `#101016`, sidebar/panel `#0C0C11`, not blue-gray
- **Spectrum in code only** — keywords indigo → functions sky → types violet → strings amber → numbers orange
- **One UI accent** — `#8A8CFF` indigo for focus rings, active tab border, badges, progress bars

## Token tiers (frequency ∝ inverse saturation)

| Tier | Tokens | Hex |
| --- | --- | --- |
| Quiet | Keywords, operators, punctuation | `#8E8FB8` |
| Body | Variables, parameters, tables | `#D8D6E0` |
| Scan | Functions / methods | `#7AA8E8` |
| Data | Strings + numbers | `#D9A86C` |
| Rare | Types / classes / interfaces | `#B68CDB` |
| Reserved | Errors only | `#E85FBF` |

## Development

```bash
npm run compile    # generate themes/*.json + validate
```

Generated workbench/token keys come from `src/`. Any **extra** keys already in a theme JSON (e.g. `widget.border`) are kept on compile — only generator-owned keys are refreshed.

Press **F5** → **Launch NexQL Theme Extension**, then `Preferences: Color Theme` → **NexQL Spectrum**.

## Architecture

```
src/directions/spectrum.mjs   theme spec (surfaces, syntax, accents)
src/preview-workbench.mjs     workbench color builder
src/preview-tokens.mjs          SQL-first token rules
scripts/generate-previews.mjs
```
