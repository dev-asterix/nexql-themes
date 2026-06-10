---
name: preview
description: Compile the themes then launch the VS Code Extension Development Host to eyeball them. Use when the user wants to preview/test themes live (the F5 / make debug flow).
disable-model-invocation: true
---

# Preview NexQL themes live

1. **Compile**: `npm run compile` (regenerates `themes/*.json` and validates). Stop and report if validation fails — don't launch a broken build.

2. **Launch the Extension Development Host**: `make debug`, which runs
   `code --new-window --extensionDevelopmentPath="$PWD" "$PWD"`.
   This opens a second VS Code window with the in-development extension loaded. (Equivalent to pressing **F5** → "Run Extension" inside VS Code.)

3. Tell the user: in the new window, run **`Preferences: Color Theme`** and pick a `NexQL …` theme to inspect.

Note: `make debug` needs the `code` CLI on PATH (override with `VSCODE=...` if it's named differently). It does not block — the dev host runs as a separate window.
