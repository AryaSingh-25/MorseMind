const morseOutput = document.getElementById("morseOutput");
const textOutput = document.getElementById("textOutput");

let pressStart = 0;
let currentSequence = '';
let fullMorse = '';
let fullText = '';

const DOT_DURATION = 200; // ms
const LETTER_PAUSE = 1000; // ms

const morseMap = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D',
  '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
  '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
  '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
  '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
  '-.--': 'Y', '--..': 'Z'
};

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && pressStart === 0) {
    e.preventDefault(); // prevent scrolling
    pressStart = Date.now();
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    e.preventDefault(); // prevent scrolling
    const duration = Date.now() - pressStart;
    pressStart = 0;

    const symbol = duration < DOT_DURATION ? '.' : '-';
    currentSequence += symbol;
    morseOutput.textContent = currentSequence;

    // Clear previous decode timeout and start a new one
    clearTimeout(window.decodeTimeout);
    window.decodeTimeout = setTimeout(() => {
      const decoded = morseMap[currentSequence] || '?';
      fullText += decoded;
      fullMorse += currentSequence + ' ';
      textOutput.textContent = fullText;
      morseOutput.textContent = '';
      currentSequence = '';
    }, LETTER_PAUSE);
  }
});
