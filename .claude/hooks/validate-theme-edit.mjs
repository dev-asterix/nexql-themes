// PostToolUse hook: run `npm run validate` after an edit to themes/ or src/.
// Reads the Claude Code hook payload on stdin; exits 0 (clean) for unrelated
// files so the hook stays quiet, and propagates validate's exit code so
// contrast/structure failures surface back to Claude immediately.
let raw = "";
process.stdin.on("data", (d) => (raw += d)).on("end", async () => {
  let filePath = "";
  try {
    filePath = JSON.parse(raw).tool_input?.file_path || "";
  } catch {}
  if (!/\/(themes|src)\//.test(filePath)) {
    process.exit(0);
  }
  const { spawnSync } = await import("node:child_process");
  const result = spawnSync("npm", ["run", "validate"], { stdio: "inherit" });
  process.exit(result.status ?? 1);
});
