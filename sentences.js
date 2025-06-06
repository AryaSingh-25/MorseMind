const morseCodeMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
  F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
  P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--",
  Z: "--..", " ": "/"
};

const sentenceLevels = {
  easy: [
    "HELLO",
    "GOOD MORNING",
    "THANK YOU",
    "I LOVE YOU",
    "YES PLEASE"
  ],
  moderate: [
    "HOW ARE YOU",
    "I AM FINE",
    "NICE TO MEET YOU",
    "SEE YOU SOON",
    "HAVE A NICE DAY"
  ],
  hard: [
    "PRACTICE MAKES PERFECT",
    "KNOWLEDGE IS POWER",
    "TIME WAITS FOR NO ONE",
    "A JOURNEY OF A THOUSAND MILES BEGINS WITH A SINGLE STEP",
    "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
  ]
};

let currentLevel = 'easy';
let sentences = sentenceLevels[currentLevel];
let currentIndex = 0;
let currentSentence = sentences[currentIndex];
let expectedMorse = convertSentenceToMorse(currentSentence);
let userInput = "";

let pressStart = null;
let lastTapTime = null;

const dotThreshold = 200; // below this = dot

function getLetterPauseThreshold() {
  const input = document.getElementById("letter-gap");
  return input ? parseInt(input.value) || 1000 : 1000;
}

function convertSentenceToMorse(sentence) {
  return sentence
    .split('')
    .map(char => morseCodeMap[char.toUpperCase()] || '')
    .join(' ');
}

function updateDisplay() {
  currentSentence = sentences[currentIndex];
  expectedMorse = convertSentenceToMorse(currentSentence);
  userInput = "";

  document.getElementById("current-sentence").textContent = currentSentence;
  document.getElementById("expected-sentence-morse").textContent = expectedMorse;
  document.getElementById("user-sentence-morse").textContent = "";
  document.getElementById("feedback-msg").textContent = "✨ Tap the spacebar to enter Morse.";
  const detailedFeedback = document.getElementById("detailed-feedback-msg");
  if (detailedFeedback) detailedFeedback.textContent = "";
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && pressStart === null) {
    pressStart = Date.now();
  }

  if (event.code === "Enter") {
    evaluateInput();
  }

  if (event.code === "Tab") {
    event.preventDefault();
    userInput += "/ ";
    document.getElementById("user-sentence-morse").textContent = userInput.trim();
    validateInput();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space" && pressStart !== null) {
    const now = Date.now();
    const duration = now - pressStart;
    const symbol = duration < dotThreshold ? "." : "-";

    const letterPauseThreshold = getLetterPauseThreshold();
    if (lastTapTime && now - lastTapTime > letterPauseThreshold * 1.5) {
      userInput += "/ "; // Insert slash between words
    } else if (lastTapTime && now - lastTapTime > letterPauseThreshold) {
      userInput += " "; // Insert space between letters
    }

    userInput += symbol;
    document.getElementById("user-sentence-morse").textContent = userInput.trim();

    lastTapTime = now;
    pressStart = null;

    validateInput();
  }
});

function validateInput() {
  const trimmedInput = userInput.trim();
  if (trimmedInput === expectedMorse) {
    document.getElementById("feedback-msg").textContent = "✅ Sentence matched!";
  } else if (!expectedMorse.startsWith(trimmedInput)) {
    document.getElementById("feedback-msg").textContent = "❌ Incorrect sequence. Press ↩️ to check.";
  } else {
    document.getElementById("feedback-msg").textContent = "🕐 Keep going...";
  }
}

function evaluateInput() {
  const expected = expectedMorse.trim();
  const input = userInput.trim();

  if (input === expected) {
    document.getElementById("feedback-msg").textContent = "🎉 Perfect! Morse matched!";
    const detailedFeedback = document.getElementById("detailed-feedback-msg");
    if (detailedFeedback) detailedFeedback.textContent = "💬 Excellent spacing and timing!";
    return;
  }

  let feedback = "🔍 Evaluation Results:\n";
  let detailed = "";

  const expectedSymbols = expected.split(" ");
  const inputSymbols = input.split(" ");

    for (let i = 0; i < expectedSymbols.length; i++) {
    const expectedChar = expectedSymbols[i];
    const inputChar = inputSymbols[i] || "";

    if (expectedChar === inputChar) {
      detailed += `✔ ${expectedChar}\n`;
    } else {
      detailed += `✖ Expected: ${expectedChar}, Got: ${inputChar || "(none)"}\n`;
    }
  }

  document.getElementById("feedback-msg").textContent = "⚠️ Some mismatches found.";
  const detailedFeedback = document.getElementById("detailed-feedback-msg");
  if (detailedFeedback) detailedFeedback.textContent = feedback + detailed;
}

function prevSentence() {
  currentIndex = (currentIndex - 1 + sentences.length) % sentences.length;
  updateDisplay();
}

function nextSentence() {
  currentIndex = (currentIndex + 1) % sentences.length;
  updateDisplay();
}

function resetInput() {
  userInput = "";
  lastTapTime = null;
  pressStart = null;
  document.getElementById("user-sentence-morse").textContent = "";
  document.getElementById("feedback-msg").textContent = "🔁 Reset. Start again.";
  const detailedFeedback = document.getElementById("detailed-feedback-msg");
  if (detailedFeedback) detailedFeedback.textContent = "";
}

function changeLevel(level) {
  if (!sentenceLevels[level]) return;
  currentLevel = level;
  sentences = sentenceLevels[currentLevel];
  currentIndex = 0;
  updateDisplay();
}

function setCustomSentence() {
  const inputBox = document.getElementById("custom-sentence");
  const value = inputBox.value.trim().toUpperCase();

  if (!value) {
    alert("Please enter a sentence.");
    return;
  }

  // Update current sentence & Morse
  currentSentence = value;
  expectedMorse = convertSentenceToMorse(currentSentence);
  userInput = "";

  document.getElementById("current-sentence").textContent = currentSentence;
  document.getElementById("expected-sentence-morse").textContent = expectedMorse;
  document.getElementById("user-sentence-morse").textContent = "";
  document.getElementById("feedback-msg").textContent = "📝 Custom sentence set!";
  const detailedFeedback = document.getElementById("detailed-feedback-msg");
  if (detailedFeedback) detailedFeedback.textContent = "";
}

// Initial load
updateDisplay();
// 🛑 Prevent spacebar from scrolling
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
  }
});

// ⌨️ Keep a hidden input focused to capture Morse typing
function focusMorseInput() {
  const input = document.getElementById("morse-capture");
  if (input) input.focus();
}

window.onload = () => {
  updateDisplay();
  focusMorseInput();
};

// 🧠 Re-focus input if user clicks or presses a key
["click", "keydown", "keyup"].forEach(evt =>
  document.addEventListener(evt, focusMorseInput)
);


 
