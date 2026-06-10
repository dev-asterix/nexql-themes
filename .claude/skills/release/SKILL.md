---
name: release
description: Package the NexQL extension into a .vsix — optional version bump + CHANGELOG entry, then compile and `make package`. Use when the user wants to cut a release or build the installable package.
disable-model-invocation: true
---

# Release / package NexQL

Releases are manual and loosely tracked — there is no enforced version/CHANGELOG convention. `$ARGUMENTS` may be a target version (e.g. `2.3.0`); if omitted, ask whether to bump or package the current version as-is.

## Steps

1. **Confirm working tree is clean** (`git status`) and you are on `main`.

2. **(Optional) Version bump** — if the user wants one:
   - Set `version` in `package.json`.
   - Prepend a new section to `CHANGELOG.md` summarizing the change.
   - Note: historically `package.json` version and CHANGELOG headings have diverged — don't assume the latest CHANGELOG heading is the current version. Confirm with the user rather than guessing the next number.

3. **Build the package**: `make package`. This runs `npm run compile` (generate + validate) then `npx @vscode/vsce package`, producing `nexql-themes-<version>.vsix` in the repo root.

4. **Report** the resulting `.vsix` path. Do not publish to the Marketplace or push/tag unless the user explicitly asks.
