const url = "http://localhost:3000";
let word = "";
let hiddenWord = [];
let attempts = 6;
let guessedLetters = [];


const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const newGameBtn = document.getElementById("new-game-btn");
const attemptsDisplay = document.getElementById("attempts");
const messageDisplay = document.getElementById("message");



const fetchNewWord = async () => {
  const response = await fetch(`${url}/word`);
  const data = await response.json();
  word = data.word;
  console.log("Chosen word:", word);
  hiddenWord = Array(word.length).fill("_");
  wordDisplay.textContent = hiddenWord.join(" ");
  attempts = 6;
  attemptsDisplay.textContent = attempts;
  messageDisplay.textContent = "";
  guessedLetters = [];
};


const checkGuess = async () => {
  const letter = letterInput.value.toUpperCase();
  if (!letter || letter.length !== 1 || guessedLetters.includes(letter)) {
    letterInput.value = "";
    return;
  }
  guessedLetters.push(letter);
  const response = await fetch(`${url}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ letter, word }),
  });
  const data = await response.json();
  if (data.indices.length > 0) {
    data.indices.forEach((index) => (hiddenWord[index] = letter));
    wordDisplay.textContent = hiddenWord.join(" ");
    if (!hiddenWord.includes("_")) {
      messageDisplay.textContent = "You won! :tada:";
    }
  } else {
    attempts--;
    attemptsDisplay.textContent = attempts;
    messageDisplay.textContent = "Wrong guess!";
    if (attempts === 0) {
      messageDisplay.textContent = `Game Over! The word was ${word}. 😭`;
      wordDisplay.textContent = word.split("").join(" ");
    }
  }
  letterInput.value = "";
};


const resetGame = () => {
  fetchNewWord();
};


letterInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  });
guessBtn.addEventListener("click", checkGuess);
newGameBtn.addEventListener("click", resetGame);
fetchNewWord();
