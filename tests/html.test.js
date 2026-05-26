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

test("welcome screen includes a falling confetti layer", () => {
  assert.match(html, /class="welcome-confetti"/);
  assert.match(html, /class="confetti-piece/);
});

test("cake hint appears below the cake stage with shooting stars in the scene", () => {
  assert.match(html, /class="shooting-stars"/);
  assert.ok(html.indexOf('class="cake-stage"') < html.indexOf('class="cake-hint"'));
});

test("photo reveal modal appears before the letter modal in the markup", () => {
  assert.match(html, /id="photoModal"/);
  assert.match(html, /id="photoRevealImage"/);
  assert.match(html, /assets\/images\/kyla-photo\.jpg/);
  assert.ok(html.indexOf('id="photoModal"') < html.indexOf('id="letterModal"'));
});
