const morseCodeMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
  F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
  P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--",
  Z: "--.."
};

let letters = Object.keys(morseCodeMap);
let currentIndex = 0;
let currentLetter = letters[currentIndex];
let expectedMorse = morseCodeMap[currentLetter];

let userInputArray = [];
let currentMorseLetter = "";
let pressStart = null;
let lastTapTime = null;

const dotThreshold = 200;        // max ms for a dot
const letterGapThreshold = 800;  // ms to separate letters

function updateDisplay() {
  currentLetter = letters[currentIndex];
  expectedMorse = morseCodeMap[currentLetter];

  userInputArray = [];
  currentMorseLetter = "";
  pressStart = null;
  lastTapTime = null;

  document.getElementById("current-letter").textContent = currentLetter;
  document.getElementById("expected-morse").textContent = expectedMorse;
  document.getElementById("user-morse").textContent = "";
  document.getElementById("feedback-msg").textContent = "Waiting for input...";
  document.getElementById("tap-prompt").textContent = `Start tapping for: ${currentLetter}`;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && pressStart === null) {
    pressStart = Date.now();
    e.preventDefault();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space" && pressStart !== null) {
    const now = Date.now();
    const duration = now - pressStart;
    const timeSinceLastTap = lastTapTime ? now - lastTapTime : 0;

    const symbol = duration < dotThreshold ? "." : "-";

    if (lastTapTime && timeSinceLastTap > letterGapThreshold) {
      if (currentMorseLetter) {
        userInputArray.push(currentMorseLetter.trim());
      }
      currentMorseLetter = "";
    }

    currentMorseLetter += symbol;
    lastTapTime = now;
    pressStart = null;

    updateUserInputDisplay();
    checkMatch();
    updatePrompt();
    e.preventDefault();
  }
});

function updateUserInputDisplay() {
  const full = [...userInputArray, currentMorseLetter].join(" ").trim();
  document.getElementById("user-morse").textContent = full;
}

function checkMatch() {
  const fullInput = [...userInputArray, currentMorseLetter].join("").trim();
  if (fullInput === expectedMorse) {
    setFeedback("✅ Correct!", "success");
  } else if (!expectedMorse.startsWith(fullInput)) {
    setFeedback("❌ Incorrect. Try again.", "error");
  } else {
    setFeedback("... Keep going.", "neutral");
  }
}

function updatePrompt() {
  const morseLetters = expectedMorse.split("");
  const index = [...userInputArray, currentMorseLetter].join("").length;

  const prompt = index < morseLetters.length
    ? `Tap for: ${morseLetters[index]}`
    : "";

  document.getElementById("tap-prompt").textContent = prompt;
}

function setFeedback(message, type) {
  const feedbackEl = document.getElementById("feedback-msg");
  feedbackEl.textContent = message;
  feedbackEl.className = "feedback " + type;
}

function nextLetter() {
  currentIndex = (currentIndex + 1) % letters.length;
  updateDisplay();
}

function prevLetter() {
  currentIndex = (currentIndex - 1 + letters.length) % letters.length;
  updateDisplay();
}

function resetInput() {
  userInputArray = [];
  currentMorseLetter = "";
  pressStart = null;
  lastTapTime = null;

  document.getElementById("user-morse").textContent = "";
  setFeedback("Input reset. Try again.", "neutral");
  document.getElementById("tap-prompt").textContent = `Start again for: ${currentLetter}`;
}

window.onload = updateDisplay;
