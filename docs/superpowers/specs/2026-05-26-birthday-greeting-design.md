# Birthday Greeting Design

## Goal

Build a cute and colorful interactive birthday webpage for Kyla with an animated cake, candle interaction, celebratory effects, and a sweet romantic greeting card reveal.

## Experience

The page starts on a full-screen welcome scene with a bright birthday palette, floating decorations, and a clear start button. After the user starts, the page transitions to a cake scene with a layered cake, glowing candles, and a button to blow the candles out. Once the candles are blown out, the flames disappear, confetti appears, and the greeting card opens to reveal the custom message.

## Visual Direction

The chosen style is cute and colorful. The design should use cheerful pinks, yellows, mint, sky blue, and warm cream tones. Motion should feel playful and soft: floating balloons, sparkles, candle flicker, confetti, and a smooth folding card transition.

## Message

The greeting is for Kyla. The card tone is sweet and romantic. The first version will include a polished custom message written directly into the webpage so it works without any setup.

## Architecture

Use a static frontend with `index.html`, `style.css`, and `script.js`. Keep behavior in small JavaScript functions so core state transitions can be tested with Node's built-in test runner. Avoid external dependencies so the page works offline.

## Main Behaviors

1. Start button moves the experience from welcome screen to cake screen.
2. Blow-candles button extinguishes candle flames.
3. Blowing candles triggers celebration visuals.
4. Greeting card opens after the candle interaction.
5. Music button is present as a UI control, but the first version uses a generated chime-like Web Audio tone instead of bundled music files.
6. Layout adapts to mobile and desktop screen sizes.

## Testing

Automated tests will cover the pure JavaScript state transitions: initial state, starting the experience, blowing candles, opening the card, and toggling sound. Browser verification will check that the page opens, the primary buttons are visible, and the main interaction completes.
