const assert = require("node:assert/strict");
const test = require("node:test");

const {
  createInitialState,
  startExperience,
  blowCandles,
  openCard,
  toggleSound,
  greeting,
  cakeDesign,
  cardDesign,
  birthdaySong,
  sceneEffects,
} = require("../script.js");

test("initial state starts at the welcome screen with candles lit", () => {
  assert.deepEqual(createInitialState(), {
    screen: "welcome",
    candlesLit: true,
    cardOpen: false,
    celebrating: false,
    sceneLit: false,
    soundEnabled: true,
  });
});

test("startExperience moves from welcome to cake", () => {
  const state = startExperience(createInitialState());

  assert.equal(state.screen, "cake");
  assert.equal(state.candlesLit, true);
  assert.equal(state.cardOpen, false);
});

test("blowCandles extinguishes flames and starts celebration", () => {
  const state = blowCandles(startExperience(createInitialState()));

  assert.equal(state.candlesLit, false);
  assert.equal(state.celebrating, true);
});

test("blowCandles lights the room and opens the letter modal", () => {
  const state = blowCandles(startExperience(createInitialState()));

  assert.equal(state.sceneLit, true);
  assert.equal(state.cardOpen, true);
});

test("openCard marks the greeting card as open", () => {
  const state = openCard(createInitialState());

  assert.equal(state.cardOpen, true);
});

test("toggleSound flips the sound preference", () => {
  const muted = toggleSound(createInitialState());
  const unmuted = toggleSound(muted);

  assert.equal(muted.soundEnabled, false);
  assert.equal(unmuted.soundEnabled, true);
});

test("greeting is a sweet romantic custom message for Kyla", () => {
  assert.match(greeting.recipient, /Kyla/);
  assert.match(greeting.message, /love/i);
  assert.match(greeting.message, /birthday/i);
});

test("greeting uses the requested 21st birthday letter for Kylatottt", () => {
  assert.match(greeting.message, /happy happy birthday my gorgeous kylatottttt/i);
  assert.match(greeting.message, /finally 21 babyyyy/i);
  assert.match(greeting.message, /mahal na mahal kita/i);
  assert.match(greeting.message, /I LOVE YOUUUUUUUU BABYYYYYY SOOOO MUCH/);
});

test("cake design uses a 21 number candle", () => {
  assert.equal(cakeDesign.candleLabel, "21");
});

test("card design matches the hand drawn cake style", () => {
  assert.equal(cardDesign.theme, "hand-drawn-cake");
  assert.equal(cardDesign.accent, "pink-frosting");
});

test("birthday song is configured for generated background playback", () => {
  assert.equal(birthdaySong.title, "Happy Birthday");
  assert.equal(birthdaySong.loop, true);
  assert.ok(birthdaySong.notes.length >= 20);
  assert.deepEqual(birthdaySong.notes.slice(0, 4).map((note) => note.pitch), ["G4", "G4", "A4", "G4"]);
});

test("cake scene has richer interactive motion effects configured", () => {
  assert.equal(sceneEffects.movingBackground, true);
  assert.equal(sceneEffects.pointerResponsiveCandleLight, true);
  assert.ok(sceneEffects.layers.includes("drifting-sprinkles"));
  assert.ok(sceneEffects.layers.includes("candle-light-rays"));
});
