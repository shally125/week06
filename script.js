const CANTEENS = [
  "Tai Tai Foodtopia",
  "Communal Student Canteen",
  "Gourmet Shop",
  "The Forest",
];

const startScreen = document.querySelector("#start-screen");
const suggestionScreen = document.querySelector("#suggestion-screen");
const confirmedScreen = document.querySelector("#confirmed-screen");

const suggestionName = document.querySelector("#suggestion-name");
const confirmedName = document.querySelector("#confirmed-name");
const selectionStatus = document.querySelector("#selection-status");

const pickButton = document.querySelector("#pick-button");
const anotherButton = document.querySelector("#another-button");
const acceptButton = document.querySelector("#accept-button");
const resetButton = document.querySelector("#reset-button");
const confirmedResetButton = document.querySelector(
  "#confirmed-reset-button"
);
const soundButton = document.querySelector("#sound-button");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let selected = null;
let isPicking = false;
let soundEnabled = false;
let audioContext = null;

function showScreen(screen) {
  startScreen.hidden = screen !== startScreen;
  suggestionScreen.hidden = screen !== suggestionScreen;
  confirmedScreen.hidden = screen !== confirmedScreen;
}

function pickCanteen(previous = null) {
  const options = CANTEENS.filter(
    (canteen) => canteen !== previous
  );

  return options[Math.floor(Math.random() * options.length)];
}

function setPickingState(value) {
  isPicking = value;

  pickButton.disabled = value;
  anotherButton.disabled = value;
  acceptButton.disabled = value;
  resetButton.disabled = value;

  suggestionScreen.setAttribute("aria-busy", String(value));
}

async function prepareAudio() {
  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return false;
  }

  try {
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    return audioContext.state === "running";
  } catch {
    return false;
  }
}

function playTone(frequency, delay = 0) {
  if (
    !soundEnabled ||
    !audioContext ||
    audioContext.state !== "running"
  ) {
    return;
  }

  try {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.06, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      start + 0.18
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.2);

    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  } catch {
    // Visual feedback remains available if sound fails.
  }
}

function revealResult(finalChoice) {
  selected = finalChoice;
  suggestionName.textContent = selected;
  suggestionName.classList.remove("is-picking");

  suggestionName.classList.remove("result-reveal");
  void suggestionName.offsetWidth;
  suggestionName.classList.add("result-reveal");

  selectionStatus.textContent =
    "Accept this suggestion or try another.";

  setPickingState(false);
  playTone(660);
  acceptButton.focus();
}

function startPicking() {
  if (isPicking) {
    return;
  }

  if (soundEnabled) {
    void prepareAudio();
  }

  const finalChoice = pickCanteen(selected);

  showScreen(suggestionScreen);
  setPickingState(true);
  selectionStatus.textContent = "Picking your next stop...";

  if (reducedMotion.matches) {
    revealResult(finalChoice);
    return;
  }

  suggestionName.classList.remove("result-reveal");
  suggestionName.classList.add("is-picking");

  let changes = 0;
  let preview = selected;

  const timer = window.setInterval(() => {
    preview = pickCanteen(preview);
    suggestionName.textContent = preview;
    changes += 1;

    if (changes >= 7) {
      window.clearInterval(timer);
      revealResult(finalChoice);
    }
  }, 100);
}

function startAgain() {
  if (isPicking) {
    return;
  }

  selected = null;
  suggestionName.textContent = "";
  confirmedName.textContent = "";

  suggestionName.classList.remove(
    "is-picking",
    "result-reveal"
  );

  showScreen(startScreen);
  pickButton.focus();
}

soundButton.addEventListener("click", async () => {
  if (soundEnabled) {
    soundEnabled = false;
    soundButton.textContent = "Sound: Off";
    soundButton.setAttribute("aria-pressed", "false");
    return;
  }

  soundButton.disabled = true;
  const available = await prepareAudio();
  soundButton.disabled = false;

  if (available) {
    soundEnabled = true;
    soundButton.textContent = "Sound: On";
    soundButton.setAttribute("aria-pressed", "true");
    playTone(520);
  } else {
    soundEnabled = false;
    soundButton.textContent = "Sound unavailable";
    soundButton.setAttribute("aria-pressed", "false");
  }
});

pickButton.addEventListener("click", startPicking);
anotherButton.addEventListener("click", startPicking);

acceptButton.addEventListener("click", () => {
  if (isPicking || selected === null) {
    return;
  }

  confirmedName.textContent = selected;
  showScreen(confirmedScreen);

  playTone(660);
  playTone(880, 0.13);

  confirmedResetButton.focus();
});

resetButton.addEventListener("click", startAgain);
confirmedResetButton.addEventListener("click", startAgain);
