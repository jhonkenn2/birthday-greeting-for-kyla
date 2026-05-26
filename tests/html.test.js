const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const html = readFileSync("index.html", "utf8");

test("welcome screen uses natural girlfriend-specific copy", () => {
  assert.match(html, /For my favorite girl/i);
  assert.match(html, /I made this little birthday page for you, Kyla/i);
  assert.doesNotMatch(html, /A little birthday surprise/i);
  assert.doesNotMatch(html, /I made this tiny celebration just for you/i);
});
