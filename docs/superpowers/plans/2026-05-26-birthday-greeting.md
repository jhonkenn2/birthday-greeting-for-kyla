# Birthday Greeting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first working static birthday greeting webpage for Kyla.

**Architecture:** Use plain HTML, CSS, and JavaScript. Keep user-facing interaction in the browser and keep the state transition helpers pure enough to test with Node's built-in test runner.

**Tech Stack:** HTML5, CSS3, JavaScript, Node `node:test`.

---

## File Structure

- `index.html`: Page markup for welcome, cake, card, confetti canvas, and controls.
- `style.css`: Cute colorful responsive layout, animations, cake art, card fold, and celebration effects.
- `script.js`: State helpers, DOM event wiring, confetti animation, and sound toggle.
- `tests/script.test.js`: Node tests for state transitions and message content.

## Tasks

### Task 1: Test App State

- [ ] Create `tests/script.test.js` with failing tests for initial state, start, candle blow, card open, sound toggle, and Kyla message content.
- [ ] Run `node --test tests/script.test.js` and confirm it fails because `script.js` does not exist yet.

### Task 2: Implement Static Page

- [ ] Create `index.html` with semantic sections for the welcome screen, cake scene, greeting card, confetti canvas, and sound control.
- [ ] Create `style.css` with cute colorful styling, responsive layout, candle flame animation, extinguished candle state, and card open transition.
- [ ] Create `script.js` with pure state helpers and browser event wiring.
- [ ] Run `node --test tests/script.test.js` and confirm the tests pass.

### Task 3: Browser Verification

- [ ] Open `index.html` in the in-app browser.
- [ ] Verify the start button shows the cake scene.
- [ ] Verify the blow-candles button extinguishes flames, opens the card, and starts confetti.
- [ ] Check desktop and mobile-sized viewports for obvious overlap or unreadable controls.
