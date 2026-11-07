// Automatic email review: runs Claude Code headless on a campaign folder.
//
//   node scripts/review.mjs campaigns/<campaign>
//
// Saves the findings to review/findings.json and prints a one-line summary.
// Exit codes: 0 = no high-severity problems, 1 = at least one high-severity
// problem, 2 = the review itself could not run.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

function fail(message) {
  console.error(`Review could not run: ${message}`);
  process.exit(2);
}

const folder = (process.argv[2] || "").replace(/[\\/]+$/, "");
if (!folder) fail("give a campaign folder, for example: node scripts/review.mjs campaigns/winter-2026-launch");
if (!existsSync(folder) || !statSync(folder).isDirectory()) fail(`${folder} is not a folder.`);

const schemaText = readFileSync("review/findings.schema.json", "utf8");
const prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. ` +
  `Report only real problems.`;

const run = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schemaText,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024, timeout: 10 * 60 * 1000 }
);

if (run.error) fail(`could not start claude (${run.error.message}).`);
if (run.status !== 0) fail(`claude exited with code ${run.status}. ${(run.stderr || "").trim()}`);

// The output is either one result object, or a list whose last item is the result.
let output;
try {
  output = JSON.parse(run.stdout);
} catch {
  fail("claude's output was not valid JSON.");
}
const result = Array.isArray(output) ? output[output.length - 1] : output;

if (!result || result.is_error) fail(`claude reported an error: ${result?.result ?? "no result"}`);
const structured = result.structured_output;
if (!structured || !Array.isArray(structured.findings)) fail("claude's answer had no findings list.");

mkdirSync("review", { recursive: true });
writeFileSync("review/findings.json", JSON.stringify(structured, null, 2) + "\n");

const count = (level) => structured.findings.filter((f) => f.severity === level).length;
const high = count("high");
console.log(
  `Review of ${folder}: ${structured.findings.length} finding(s): ` +
    `${high} high, ${count("medium")} medium, ${count("low")} low. Saved to review/findings.json.`
);

process.exit(high > 0 ? 1 : 0);
