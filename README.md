# MorseMind: Sentence-Level Morse Typing Trainer

**MorseMind** is an original, sentence-level Morse code typing trainer that allows users to practice encoding full English sentences into Morse code using the spacebar. It leverages timing-based input to differentiate between dots, dashes, letters, and words. This interactive web application is designed to be educational, engaging, and supportive of deep Morse code learning through real-time feedback and difficulty levels.

---

## 🌟 Features

- ✅ Tap the **spacebar** to input Morse code based on press duration:
  - Short tap = `.` (dot)
  - Long press = `-` (dash)
- 🔠 Supports **letter separation** (short pause) and **word separation** (longer pause).
- 📖 Built-in **15 sentences**, categorized into:
  - Easy  
  - Moderate  
  - Hard
- 🧠 Custom sentence mode: type your own sentence and convert it to Morse.
- 🎯 Live feedback on your Morse accuracy.
- 🧪 Evaluation and breakdown of where you went wrong or right.
- 🔒 Keyboard-safe: blocks page scroll when using spacebar.
- 📝 Simple UI with tutorial capability (planned).

---

## 🚀 How to Use

1. Open the webpage.
2. Select a sentence level (easy, moderate, hard) or input your own custom sentence.
3. Tap the **spacebar** to begin typing the Morse code:
   - Use **timing** to distinguish dot, dash, letter, and word gaps.
4. Press **Enter** to evaluate your answer.
5. Press **Tab** to manually insert a `/` (word separator) if needed.
6. Get instant feedback and try again or move to the next sentence.

---

## 🛠️ Developer Notes

- Hidden input (`#morse-capture`) ensures consistent key capture even if the user clicks elsewhere.
- Uses `keypress` timestamps to classify dot (`.`), dash (`-`), letter gap (` `), and word gap (`/`).
- All logic is implemented in plain HTML, CSS, and vanilla JS for maximum portability and customization.

---

## 📜 License & Usage Terms

### ⚠️ Original Innovation Notice

This project represents an **original idea** by the creator. The sentence-level Morse input mechanism based on **timing-based spacebar tapping**, integrated with **live sentence feedback and progression**, is a **novel approach** not derived from any known open-source project or prior art.

---

### 📛 License: Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 (CC BY-NC-ND 4.0)

> You are free to **share** this project with proper credit, but:

- ❌ **You may not use this for commercial purposes**.
- ❌ **You may not modify or build upon this work**.
- ❌ **You may not redistribute derivatives or adaptations**.
- ✅ **You must give appropriate credit to the original author**.

License details: [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)

---

## 🙅 No Contribution Policy

This project is currently **closed to external contributions** in order to preserve its originality and integrity for future research or patent publication. If you'd like to discuss licensing or collaboration, please contact the author directly.

---

## 👤 Author

- **Name**: Arya Singh  
- **Project**: MorseMind - Sentence-Level Morse Typing Trainer  
- **Role**: Sole creator and developer  
- **Status**: Private research & experimentation  

---
