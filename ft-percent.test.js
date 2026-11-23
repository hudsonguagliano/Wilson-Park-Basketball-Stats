// Tests for the Free Throw % leaders.
// Run with:  node --test
//
// The stat math lives inside index.html, so this file reads index.html,
// copies out the real functions and the season categories, and runs them.
// Nothing on the site is changed, and no packages are needed.

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

// Copy a block of code out of index.html: from `start` to the bracket that
// closes the first `open` bracket after it.
function extract(start, open, close) {
  const begin = html.indexOf(start);
  if (begin === -1) throw new Error(`Couldn't find "${start}" in index.html`);
  let depth = 0;
  for (let i = html.indexOf(open, begin); i < html.length; i++) {
    if (html[i] === open) depth++;
    if (html[i] === close && --depth === 0) return html.slice(begin, i + 1);
  }
  throw new Error(`Couldn't find the end of "${start}" in index.html`);
}

const code = [
  extract("function statValue(", "{", "}"),
  extract("function formatValue(", "{", "}"),
  extract("function rankCategory(", "{", "}"),
  extract("const GP_COLUMN =", "{", "}") + ";",
  extract("const seasonCategories =", "[", "]") + ";",
  "({ formatValue, rankCategory, seasonCategories })",
].join("\n");

const { formatValue, rankCategory, seasonCategories } = vm.runInNewContext(code);

// The real season Free Throw % category, minimum and all
const ft = seasonCategories.find(c => c.stat === "ft");

// A made-up player (gp defaults to 5 games)
function player(name, ftm, fta, gp = 5) {
  return { name, gp, ftm, fta, pts: 0, threes: 0, reb: 0, stl: 0, blk: 0 };
}

// Names on a ranked list, in order.
// (Array.from turns the sandbox's list into a normal array, so
// deepEqual can compare it with the expected list.)
function names(rows) {
  return Array.from(rows, row => row.player.name);
}

test("7 of 10 shows 70.0%", () => {
  const rows = rankCategory([player("Seven", 7, 10)], ft);
  assert.equal(rows.length, 1);
  assert.equal(formatValue(rows[0].value, ft), "70.0%");
});

test("9 attempts doesn't make the season list, 10 does", () => {
  const rows = rankCategory([player("Nine", 9, 9), player("Ten", 5, 10)], ft);
  assert.deepEqual(names(rows), ["Ten"]);
});

test("a player with more makes than attempts is left out", () => {
  const rows = rankCategory([player("Impossible", 12, 10), player("Normal", 6, 10)], ft);
  assert.deepEqual(names(rows), ["Normal"]);
});

test("a player with 0 games is skipped", () => {
  const rows = rankCategory([player("No Games", 8, 10, 0), player("Played", 6, 10)], ft);
  assert.deepEqual(names(rows), ["Played"]);
});

test("leaders are sorted highest to lowest", () => {
  const rows = rankCategory(
    [player("Fifty", 5, 10), player("Ninety", 9, 10), player("Seventy", 7, 10)],
    ft
  );
  assert.deepEqual(names(rows), ["Ninety", "Seventy", "Fifty"]);
  assert.deepEqual(Array.from(rows, row => formatValue(row.value, ft)), ["90.0%", "70.0%", "50.0%"]);
});
