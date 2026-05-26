const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const css = readFileSync("style.css", "utf8");

test("style.css has balanced curly braces so modal rules parse", () => {
  let depth = 0;

  for (const char of css) {
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    assert.ok(depth >= 0, "CSS contains an unmatched closing brace");
  }

  assert.equal(depth, 0, "CSS contains an unclosed rule block");
});

test("letter modal has a fixed overlay base rule", () => {
  assert.match(css, /\.letter-modal\s*{[^}]*position:\s*fixed;[^}]*display:\s*grid;/s);
});

test("photo reveal modal has a fixed overlay and fade-out state", () => {
  assert.match(css, /\.photo-modal\s*{[^}]*position:\s*fixed;[^}]*display:\s*grid;/s);
  assert.match(css, /\.photo-modal\.is-leaving\s*{[^}]*opacity:\s*0;/s);
});
