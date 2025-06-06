const morseCodeMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
  F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
  P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--",
  Z: "--.."
};

let words = ["LOVE", "HUG", "HOPE", "CUTE", "BRIGHT", "LIGHT", "SWEET", "HAPPY"];
let currentWordIndex = 0;
let currentWord = words[currentWordIndex];
let expectedMorse = wordToMorse(currentWord);

let pressStart = null;
const dotThreshold = 200;

let holdInterval = null;
let holdDuration = 0;

let currentSymbol = "";
let userSymbols = [];
let gapTimeout = null;

function wordToMorse(word) {
  return word.split("").map(letter => morseCodeMap[letter.toUpperCase()] || "").join(" ");
}

function getLetterGapThreshold() {
  const input = document.getElementById("letter-gap");
  return input ? parseInt(input.value) || 600 : 600;
}

function updateDisplay() {
  currentWord = words[currentWordIndex];
  expectedMorse = wordToMorse(currentWord);
  currentSymbol = "";
  userSymbols = [];

  document.getElementById("current-word").textContent = currentWord;
  document.getElementById("expected-word-morse").textContent = expectedMorse;
  document.getElementById("user-word-morse").textContent = "";
  document.getElementById("feedback-msg").innerHTML = "⏳ Waiting for your input...";
  document.getElementById("morse-timer").textContent = "";
  document.getElementById("tap-prompt").textContent = "";
  updateTapPrompt();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && pressStart === null) {
    pressStart = Date.now();
    e.preventDefault();

    holdDuration = 0;
    holdInterval = setInterval(() => {
      holdDuration = Date.now() - pressStart;
      document.getElementById("morse-timer").textContent = `⏳ Holding: ${holdDuration} ms`;
    }, 10);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space" && pressStart !== null) {
    const duration = Date.now() - pressStart;
    clearInterval(holdInterval);
    document.getElementById("morse-timer").textContent = "";

    const symbol = duration < dotThreshold ? "." : "-";
    currentSymbol += symbol;

    document.getElementById("user-word-morse").textContent = [...userSymbols, currentSymbol].join(" / ");

    if (gapTimeout) clearTimeout(gapTimeout);

    const letterGapThreshold = getLetterGapThreshold();

    gapTimeout = setTimeout(() => {
      userSymbols.push(currentSymbol);
      currentSymbol = "";

      flashLetterGapCue();

      document.getElementById("user-word-morse").textContent = userSymbols.join(" / ");
      checkMatchWithDetails();
      updateTapPrompt();
    }, letterGapThreshold);

    pressStart = null;
    e.preventDefault();
  }
});

function checkMatchWithDetails() {
  const expectedLetters = expectedMorse.split(" ");
  const inputLetters = userSymbols;

  let feedback = "";
  let success = true;

  inputLetters.forEach((input, idx) => {
    const expected = expectedLetters[idx];
    if (!expected) {
      feedback += `❌ Extra letter at position ${idx + 1}: "${input}" not expected.<br>`;
      success = false;
    } else if (input !== expected) {
      feedback += `❌ Letter ${idx + 1} mismatch: expected "${expected}", got "${input}".<br>`;
      success = false;
    } else {
      feedback += `✅ Letter ${idx + 1} correct: "${input}".<br>`;
    }
  });

  if (inputLetters.length < expectedLetters.length) {
    feedback += `⏳ More letters to enter...<br>`;
    success = false;
  }

  document.getElementById("feedback-msg").innerHTML = success
    ? "🎉 Excellent! You completed the word correctly."
    : feedback;
}

function updateTapPrompt() {
  const sentence = currentWord.toUpperCase();
  const morse = wordToMorse(sentence).split(" ");
  const nextIndex = userSymbols.length;

  if (nextIndex < morse.length) {
    const char = sentence[nextIndex];
    const expected = morse[nextIndex];
    document.getElementById("tap-prompt").textContent = `Please enter: ${char} → ${expected}`;
  } else {
    document.getElementById("tap-prompt").textContent = "✔ Word complete. Press 'Try Again' or navigate words.";
  }
}

function flashLetterGapCue() {
  const timerBox = document.getElementById("morse-timer");
  timerBox.textContent = "⌛ Letter gap detected";
  timerBox.style.color = "#007acc";
  setTimeout(() => {
    timerBox.textContent = "";
    timerBox.style.color = "";
  }, 800);
}

function nextWord() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  updateDisplay();
}

function prevWord() {
  currentWordIndex = (currentWordIndex - 1 + words.length) % words.length;
  updateDisplay();
}

function resetInput() {
  currentSymbol = "";
  userSymbols = [];
  document.getElementById("user-word-morse").textContent = "";
  document.getElementById("feedback-msg").innerHTML = "⏳ Please try again.";
  updateTapPrompt();
}

window.onload = updateDisplay;
