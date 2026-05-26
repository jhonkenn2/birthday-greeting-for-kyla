const greeting = {
  recipient: "Kyla",
  message:
    "happy happy birthday my gorgeous kylatottttt! today is such a special day because God blessed this world with you, and i truly thank Him for that every single day. you're finally 21 babyyyy (tanders ka na rin like me duh), and i just want you to know how proud i am of you and the young woman you've become.\n\n" +
    "you've been through so much, and nakita ko lahat 'yon. you fought battles that a lot of people would never understand, and yet you're still here, still growing, still pushing forward and that says so much about your strength.\n\n" +
    "i really believe the universe has such a beautiful plan for your life, and this next chapter is going to show you just how much it has been working in your story this whole time. i pray and hope this year brings you more peace, more happiness, more healing, and more love than ever before.\n\n" +
    "you deserve a day full of joy, genuine smiles, and people reminding you just how special you are. thank you for being you, for having such a beautiful soul, and for being my amazing girlfriend.\n\n" +
    "i hope and pray God protects you, guides you, and keeps blessing you in every way possible. happy 21st birthday my kylatottt, and never forget na mahal na mahal kita sooo much. I LOVE YOUUUUUUUU BABYYYYYY SOOOO MUCH! MWA 💗",
};

const cakeDesign = {
  candleLabel: "21",
  floatingHearts: true,
  details: ["frosting-drips", "fruit-dots", "cream-highlights"],
};

const cardDesign = {
  theme: "hand-drawn-cake",
  accent: "pink-frosting",
};

const birthdaySong = {
  title: "Happy Birthday",
  loop: true,
  tempo: 1,
  notes: [
    { pitch: "G4", beats: 0.5 },
    { pitch: "G4", beats: 0.5 },
    { pitch: "A4", beats: 1 },
    { pitch: "G4", beats: 1 },
    { pitch: "C5", beats: 1 },
    { pitch: "B4", beats: 2 },
    { pitch: "G4", beats: 0.5 },
    { pitch: "G4", beats: 0.5 },
    { pitch: "A4", beats: 1 },
    { pitch: "G4", beats: 1 },
    { pitch: "D5", beats: 1 },
    { pitch: "C5", beats: 2 },
    { pitch: "G4", beats: 0.5 },
    { pitch: "G4", beats: 0.5 },
    { pitch: "G5", beats: 1 },
    { pitch: "E5", beats: 1 },
    { pitch: "C5", beats: 1 },
    { pitch: "B4", beats: 1 },
    { pitch: "A4", beats: 2 },
    { pitch: "F5", beats: 0.5 },
    { pitch: "F5", beats: 0.5 },
    { pitch: "E5", beats: 1 },
    { pitch: "C5", beats: 1 },
    { pitch: "D5", beats: 1 },
    { pitch: "C5", beats: 2 },
  ],
};

const sceneEffects = {
  movingBackground: true,
  pointerResponsiveCandleLight: true,
  layers: ["drifting-sprinkles", "candle-light-rays", "twinkling-stars", "cake-hover-motion"],
};

function createInitialState() {
  return {
    screen: "welcome",
    candlesLit: true,
    cardOpen: false,
    celebrating: false,
    sceneLit: false,
    soundEnabled: true,
  };
}

function startExperience(state) {
  return {
    ...state,
    screen: "cake",
  };
}

function blowCandles(state) {
  return {
    ...state,
    candlesLit: false,
    cardOpen: true,
    celebrating: true,
    sceneLit: true,
  };
}

function openCard(state) {
  return {
    ...state,
    cardOpen: true,
  };
}

function toggleSound(state) {
  return {
    ...state,
    soundEnabled: !state.soundEnabled,
  };
}

if (typeof module !== "undefined") {
  module.exports = {
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
  };
}

if (typeof window !== "undefined") {
  let state = createInitialState();
  let audioContext;
  let birthdaySongTimer;
  let birthdaySongPlaying = false;
  let confettiPieces = [];
  let confettiAnimation;

  const welcomeScene = document.getElementById("welcomeScene");
  const cakeScene = document.getElementById("cakeScene");
  const startButton = document.getElementById("startButton");
  const blowButton = document.getElementById("blowButton");
  const cakeButton = document.getElementById("cakeButton");
  const cakeStage = document.getElementById("cakeStage");
  const cake = document.querySelector(".cake");
  const card = document.getElementById("birthdayCard");
  const letterModal = document.getElementById("letterModal");
  const closeLetter = document.getElementById("closeLetter");
  const cardMessage = document.getElementById("cardMessage");
  const candleLabel = document.getElementById("candleLabel");
  const soundToggle = document.getElementById("soundToggle");
  const canvas = document.getElementById("confettiCanvas");
  const context = canvas.getContext("2d");

  cardMessage.textContent = greeting.message;
  candleLabel.textContent = cakeDesign.candleLabel;

  function render() {
    welcomeScene.classList.toggle("is-active", state.screen === "welcome");
    cakeScene.classList.toggle("is-active", state.screen === "cake");
    document.body.classList.toggle("wish-pending", state.screen === "cake" && !state.sceneLit);
    document.body.classList.toggle("wish-lit", state.sceneLit);
    cake.classList.toggle("candles-out", !state.candlesLit);
    letterModal.hidden = !state.cardOpen;
    letterModal.classList.toggle("is-visible", state.cardOpen);
    card.classList.toggle("is-visible", state.cardOpen);
    card.classList.toggle("is-open", state.cardOpen);
    soundToggle.setAttribute("aria-pressed", String(state.soundEnabled));
    blowButton.disabled = !state.candlesLit;
    cakeButton.disabled = !state.candlesLit;
    blowButton.textContent = state.candlesLit ? "Blow the candles" : "Wish sent";
  }

  function playTone(frequency, duration, delay = 0) {
    if (!state.soundEnabled) return;
    const context = ensureAudioContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = context.currentTime + delay;

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.04);
  }

  function noteFrequency(pitch) {
    const notes = {
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      F5: 698.46,
      G5: 783.99,
      A4: 440,
      B4: 493.88,
      G4: 392,
    };
    return notes[pitch];
  }

  function ensureAudioContext() {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return null;
    audioContext = audioContext || new AudioContextConstructor();
    return audioContext;
  }

  function playSongNote(frequency, duration, startAt) {
    const context = ensureAudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = "triangle";
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.045, startAt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.04);
  }

  function scheduleBirthdaySong() {
    if (!state.soundEnabled || birthdaySongPlaying) return;
    const context = ensureAudioContext();
    if (!context) return;
    birthdaySongPlaying = true;
    const beatSeconds = 0.42 * birthdaySong.tempo;
    let cursor = context.currentTime + 0.08;

    birthdaySong.notes.forEach((note) => {
      const duration = note.beats * beatSeconds;
      playSongNote(noteFrequency(note.pitch), Math.max(duration - 0.04, 0.12), cursor);
      cursor += duration;
    });

    const loopDelay = Math.max((cursor - context.currentTime + 0.75) * 1000, 1000);
    birthdaySongTimer = window.setTimeout(() => {
      birthdaySongPlaying = false;
      scheduleBirthdaySong();
    }, loopDelay);
  }

  function stopBirthdaySong() {
    window.clearTimeout(birthdaySongTimer);
    birthdaySongTimer = undefined;
    birthdaySongPlaying = false;
  }

  function playChime() {
    playTone(523.25, 0.22, 0);
    playTone(659.25, 0.22, 0.12);
    playTone(783.99, 0.34, 0.24);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function createConfetti() {
    const colors = ["#ff4f93", "#ffd166", "#72d2ff", "#6ee7b7", "#ffffff"];
    confettiPieces = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.5,
      size: 6 + Math.random() * 8,
      speed: 2 + Math.random() * 5,
      drift: -2 + Math.random() * 4,
      rotation: Math.random() * Math.PI,
      spin: -0.2 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  function drawConfetti() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confettiPieces.forEach((piece) => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      piece.rotation += piece.spin;

      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.rotation);
      context.fillStyle = piece.color;
      context.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.7);
      context.restore();
    });

    confettiPieces = confettiPieces.filter((piece) => piece.y < window.innerHeight + 40);

    if (confettiPieces.length > 0) {
      confettiAnimation = requestAnimationFrame(drawConfetti);
    } else {
      cancelAnimationFrame(confettiAnimation);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  function celebrate() {
    cake.classList.remove("celebrate");
    void cake.offsetWidth;
    cake.classList.add("celebrate");
    createConfetti();
    drawConfetti();
    playChime();
  }

  startButton.addEventListener("click", () => {
    state = startExperience(state);
    render();
    playTone(659.25, 0.18);
    scheduleBirthdaySong();
  });

  function blowOutCandles() {
    if (!state.candlesLit) return;
    state = blowCandles(state);
    render();
    celebrate();
  }

  blowButton.addEventListener("click", blowOutCandles);
  cakeButton.addEventListener("click", blowOutCandles);
  cakeStage.addEventListener("pointermove", (event) => {
    if (!state.candlesLit) return;
    const rect = cakeStage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    cakeStage.style.setProperty("--light-x", `${x}%`);
    cakeStage.style.setProperty("--light-y", `${y}%`);
  });

  cakeStage.addEventListener("pointerleave", () => {
    cakeStage.style.setProperty("--light-x", "50%");
    cakeStage.style.setProperty("--light-y", "28%");
  });

  closeLetter.addEventListener("click", () => {
    state = {
      ...state,
      cardOpen: false,
    };
    render();
  });

  soundToggle.addEventListener("click", () => {
    state = toggleSound(state);
    if (state.soundEnabled && state.screen === "cake") {
      scheduleBirthdaySong();
    } else {
      stopBirthdaySong();
    }
    render();
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  render();
}
