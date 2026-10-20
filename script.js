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
let selected = null;

function showScreen(screen) {
  startScreen.hidden = screen !== startScreen;
  suggestionScreen.hidden = screen !== suggestionScreen;
  confirmedScreen.hidden = screen !== confirmedScreen;
}

function pickCanteen(previous = null) {
  const options = CANTEENS.filter((canteen) => canteen !== previous);
  return options[Math.floor(Math.random() * options.length)];
}

function showSuggestion(canteen) {
  selected = canteen;
  suggestionName.textContent = selected;
  showScreen(suggestionScreen);
}

document.querySelector("#pick-button").addEventListener("click", () => {
  showSuggestion(pickCanteen());
});

document.querySelector("#another-button").addEventListener("click", () => {
  showSuggestion(pickCanteen(selected));
});

document.querySelector("#accept-button").addEventListener("click", () => {
  confirmedName.textContent = selected;
  showScreen(confirmedScreen);
});

function startAgain() {
  selected = null;
  showScreen(startScreen);
}

document.querySelector("#reset-button").addEventListener("click", startAgain);
document
  .querySelector("#confirmed-reset-button")
  .addEventListener("click", startAgain);
