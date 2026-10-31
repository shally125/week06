const CANTEENS = [
  "Tai Tai Foodtopia",
  "Communal Student Canteen",
  "Gourmet Shop",
  "The Forest",
];

const LUNCHBOX_STYLES = [
  { name: "Sakura", className: "sakura" },
  { name: "Matcha", className: "matcha" },
  { name: "Sunshine", className: "sunshine" },
  { name: "Ocean", className: "ocean" },
];

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
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
const confettiContainer = document.querySelector(
  "#confetti-container"
);
const mysteryCards = document.querySelector("#mystery-cards");
const gameStatus = document.querySelector("#game-status");
const drawCount = document.querySelector("#draw-count");
const gameBackButton = document.querySelector("#game-back-button");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let confettiTimer = null;
let selected = null;
let isPicking = false;
let soundEnabled = false;
let audioContext = null;
let drawNumber = 0;
let revealTimer = null;

function showScreen(screen) {
  [startScreen, gameScreen, suggestionScreen, confirmedScreen].forEach(
    (item) => {
      item.hidden = item !== screen;
    }
  );
}

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function clearConfetti() {
  window.clearTimeout(confettiTimer);
  confettiContainer.replaceChildren();
  confirmedScreen.classList.remove("confirmation-pop");
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

function celebrate() {
  clearConfetti();

  if (reducedMotion.matches) {
    return;
  }

  void confirmedScreen.offsetWidth;
  confirmedScreen.classList.add("confirmation-pop");

  const colors = [
    "#e9b44c",
    "#df705e",
    "#527d63",
    "#729fc4",
    "#b187bd",
  ];

  const pieces = document.createDocumentFragment();

  for (let i = 0; i < 45; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    piece.style.setProperty(
      "--left",
      `${Math.random() * 100}%`
    );

    piece.style.setProperty(
      "--color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    piece.style.setProperty(
      "--duration",
      `${1.5 + Math.random() * 0.7}s`
    );

    piece.style.setProperty(
      "--delay",
      `${Math.random() * 0.25}s`
    );

    piece.style.setProperty(
      "--drift",
      `${(Math.random() - 0.5) * 180}px`
    );

    piece.style.setProperty(
      "--rotation",
      `${(Math.random() - 0.5) * 1080}deg`
    );

    pieces.appendChild(piece);
  }

  confettiContainer.appendChild(pieces);
  confettiTimer = window.setTimeout(clearConfetti, 2600);
}

function openMysteryRound() {
  if (isPicking) {
    return;
  }

  clearConfetti();
  drawNumber += 1;

  const options = shuffle(
    CANTEENS.filter((canteen) => canteen !== selected)
  );

  drawCount.textContent = `DRAW ${drawNumber}`;
  gameStatus.textContent =
    "Choose a lunchbox to reveal your lunch stop.";

  mysteryCards.replaceChildren();

  options.forEach((canteen, index) => {
    const style = LUNCHBOX_STYLES[index];

    const card = document.createElement("button");
    card.type = "button";
    card.className = `mystery-card lunchbox-card ${style.className}`;
    card.setAttribute(
      "aria-label",
      `Open the ${style.name} mystery lunchbox`
    );

    const illustration = document.createElement("span");
    illustration.className = "lunchbox-art";
    illustration.setAttribute("aria-hidden", "true");
    illustration.innerHTML = `
      <span class="lunchbox-lid">
        <span class="lid-sticker">?</span>
      </span>

      <span class="lunchbox-tray">
        <span class="rice-section">
          <span class="rice-topping"></span>
        </span>

        <span class="side-section">
          <span class="veggie"></span>
          <span class="veggie"></span>
          <span class="veggie"></span>
        </span>

        <span class="snack-section">
          <span class="snack"></span>
          <span class="snack"></span>
        </span>
      </span>
    `;

    const label = document.createElement("span");
    label.className = "lunchbox-name";
    label.textContent = `${style.name} Box`;

    const hint = document.createElement("span");
    hint.className = "lunchbox-hint";
    hint.textContent = "Tap to discover";

    card.append(illustration, label, hint);

    card.addEventListener("click", () => {
      revealCard(card, canteen);
    });

    mysteryCards.appendChild(card);
  });

  showScreen(gameScreen);
  mysteryCards.querySelector("button").focus();
}

function revealCard(card, canteen) {
  if (isPicking) {
    return;
  }

  isPicking = true;

  if (soundEnabled) {
    void prepareAudio();
  }

  mysteryCards.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  card.classList.add("chosen");
  card.querySelector(".lunchbox-name").textContent = canteen;
  card.querySelector(".lunchbox-hint").textContent =
    "Lunch stop revealed!";
  card.setAttribute("aria-label", `Revealed: ${canteen}`);
  gameStatus.textContent = `You revealed ${canteen}!`;

  playTone(660);

  const finishReveal = () => {
    selected = canteen;
    suggestionName.textContent = selected;
    selectionStatus.textContent =
      `Draw ${drawNumber}: accept your discovery or open another card.`;

    isPicking = false;
    showScreen(suggestionScreen);
    acceptButton.focus();
  };

  revealTimer = window.setTimeout(
    finishReveal,
    reducedMotion.matches ? 0 : 900
  );
}

function startAgain() {
  window.clearTimeout(revealTimer);
  clearConfetti();

  isPicking = false;
  selected = null;
  drawNumber = 0;

  mysteryCards.replaceChildren();
  suggestionName.textContent = "";
  confirmedName.textContent = "";
  selectionStatus.textContent =
    "Accept this suggestion or try another.";

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

pickButton.addEventListener("click", openMysteryRound);
anotherButton.addEventListener("click", openMysteryRound);

acceptButton.addEventListener("click", () => {
  if (isPicking || selected === null) {
    return;
  }

  confirmedName.textContent = selected;
  showScreen(confirmedScreen);

  celebrate();

  playTone(660);
  playTone(880, 0.13);

  confirmedResetButton.focus();
});

gameBackButton.addEventListener("click", startAgain);
resetButton.addEventListener("click", startAgain);
confirmedResetButton.addEventListener("click", startAgain);
