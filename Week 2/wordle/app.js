// var newElement = document.createElement("div");
// newElement.innerHTML = "Hi, I'm new here.";
// newElement.classList.add("something-new");

// var parentElement = document.querySelector("#guesses");

// parentElement.appendChild(newElement);

var ATTEMPTS = 6;
var LENGTH = 5;

var correctWord = ""; //save this
var guesses = []; //save this
var gameOver = false; //save this
var currentGuess = "";

var wordContainsLetter = [];
var letterMatchesWord = [];
var letterIsWrong = [];

var gamesPlayed = 0;
var gamesWon = 0;
var gamesLost = 0;

var gamesPlayedNumber = document.querySelector("#games-played-number");
var gamesWonNumber = document.querySelector("#games-won-number");
var gamesLostNumber = document.querySelector("#games-lost-number");

var keyboardLetterRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["", "z", "x", "c", "v", "b", "n", "m", "", ""],
];

//list of words that are allowed as inputs
var allowed = [];
//list of words that could possibly be the correct word
var answers = [];

var getGuesses = document.querySelector("#guesses");
var getKeyboard = document.querySelector("#keyboard");
var userInput = document.querySelector("#user-input");
var submitInput = document.querySelector("#submit-input");
var message = document.querySelector("#message");
var newWordButton = document.querySelector("#new-word-button");

var statsButton = document.querySelector("#stats-button");
var statsContainer = document.querySelector("#stats-container");

var closeStatsContainer = document.querySelector("#close-stats-container");

function resetGame() {
  correctWord = "";
  guesses = [];
  wordContainsLetter = [];
  letterMatchesWord = [];
  letterIsWrong = [];

  gameOver = false;
}

function saveState() {
  localStorage.setItem("correctWord", JSON.stringify(correctWord));
  localStorage.setItem("guesses", JSON.stringify(guesses));
  localStorage.setItem("gameOver", JSON.stringify(gameOver));
  localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed));
  localStorage.setItem("gamesWon", JSON.stringify(gamesWon));
  localStorage.setItem("gamesLost", JSON.stringify(gamesLost));
}

function loadState() {
  correctWord = JSON.parse(localStorage.getItem("correctWord"));
  guesses = JSON.parse(localStorage.getItem("guesses"));
  gameOver = JSON.parse(localStorage.getItem("gameOver"));
  gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));
  gamesWon = JSON.parse(localStorage.getItem("gamesWon"));
  gamesLost = JSON.parse(localStorage.getItem("gamesLost"));

  if (!guesses) {
    guesses = [];
  }
  if (!gameOver) {
    gameOver = false;
  }
}

function getWordOfTheMinute() {
  var dateString = moment().format("YYYMMDDHHmmss");
  var dateNumber = parseInt(dateString, 10);
  var word = answers[dateNumber % answers.length];
  console.log(dateString, dateNumber, word);
}

function getRandomCorrectWord() {
  if (correctWord) {
    console.log("the answer is still", correctWord);
  } else {
    var randomIndex = Math.floor(Math.random() * answers.length);
    correctWord = answers[randomIndex];
    console.log(correctWord);
    saveState();
  }
}

function fetchWordList() {
  fetch("https://api.jsonbin.io/b/629f9937402a5b38021f6b38").then(function (
    response
  ) {
    response.json().then(function (data) {
      allowed = data.allowed.concat(data.answers);
      answers = data.answers;
      getRandomCorrectWord();
    });
  });
}

function populateKeyboard() {
  getKeyboard.innerHTML = "";

  for (var i = 0; i < keyboardLetterRows.length; i++) {
    var newRow = document.createElement("div");
    newRow.classList.add("keyboardRow");
    getKeyboard.appendChild(newRow);

    if (i < guesses.length) {
      result = checkWord(correctWord, guesses[i]);
    }

    for (var j = 0; j < keyboardLetterRows[i].length; j++) {
      let letterValue = keyboardLetterRows[i][j];
      var newLetter = document.createElement("div");
      newLetter.classList.add("keyboardLetter");

      letterValue = keyboardLetterRows[i][j];
      console.log("before:", letterValue);

      if (wordContainsLetter.includes(newLetter.innerHTML)) {
        newLetter.classList.add("contains");
      } else if (letterMatchesWord.includes(newLetter.innerHTML)) {
        newLetter.classList.add("match");
      } else if (letterIsWrong.includes(newLetter.innerHTML)) {
        newLetter.classList.add("wrong");
      }

      newLetter.innerHTML = letterValue;

      if (letterValue == "") {
        newLetter.style.border = "none";
      }

      newLetter.onclick = function () {
        currentGuess += letterValue;
        populateGrid();
      };

      newRow.appendChild(newLetter);
    }
  }
}

function populateGrid() {
  getGuesses.innerHTML = "";
  for (var i = 0; i < ATTEMPTS; i++) {
    var newGuess = document.createElement("div");
    newGuess.classList.add("guess");
    getGuesses.appendChild(newGuess);

    var result;
    if (i < guesses.length) {
      result = checkWord(correctWord, guesses[i]);
    }

    for (var j = 0; j < LENGTH; j++) {
      var newLetter = document.createElement("div");

      newLetter.classList.add("letter");
      if (i < guesses.length) {
        newLetter.innerHTML = guesses[i][j];

        newLetter.classList.add("wrong");

        if (result[j] == 1) {
          newLetter.classList.remove("wrong");
          newLetter.classList.add("match");
          if (!letterMatchesWord.includes(newLetter.innerHTML)) {
            letterMatchesWord.push(newLetter.innerHTML);
          }
        } else if (result[j] == 2) {
          newLetter.classList.remove("wrong");
          newLetter.classList.add("contains");
          if (!wordContainsLetter.includes(newLetter.innerHTML)) {
            wordContainsLetter.push(newLetter.innerHTML);
          }
        } else {
          if (!letterIsWrong.includes(newLetter.innerHTML)) {
            letterIsWrong.push(newLetter.innerHTML);
          }
        }
      }
      if (i == guesses.length && j < currentGuess.length) {
        newLetter.innerHTML = currentGuess[j];
      }

      newGuess.appendChild(newLetter);
    }
  }
}

function setupInputs() {
  gameOver = false;
  currentGuess = "";
  document.onkeydown = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (currentGuess.length < 5) {
        currentGuess += event.key.toLowerCase();
      }
    } else if (event.keyCode == 8) {
      currentGuess = currentGuess.slice(0, -1);
    } else if (event.keyCode == 13 && gameOver == false) {
      var guessedWord = currentGuess;
      if (allowed.includes(guessedWord)) {
        if (guessedWord.length == 5) {
          guesses.push(guessedWord);
          currentGuess = "";
          message.innerHTML = "";
          console.log(guessedWord, correctWord);
          if (guessedWord == correctWord) {
            message.innerHTML = "YOU WIN";
            message.style.color = "green";
            gameOver = true;
            gamesWon++;
            gamesWonNumber.innerHTML = gamesWon;
            gamesPlayed++;
            gamesPlayedNumber.innerHTML = gamesPlayed;
          } else if (guesses.length >= ATTEMPTS) {
            message.innerHTML = "YOU LOSE";
            message.style.color = "red";
            gameOver = true;
            gamesLost++;
            gamesLostNumber.innerHTML = gamesLost;
            gamesPlayed++;
            gamesPlayedNumber.innerHTML = gamesPlayed;

            // increase losses here
          }
          populateGrid();
          // populateKeyboard();
          saveState();
        } else {
          if (gameOver == false) {
            message.innerHTML = "5 letters please.";
          }
        }
      } else {
        if (gameOver == false) {
          message.innerHTML = "Use A Real 5 Letter  Word";
        }
      }
    }
    if (gameOver == false) {
      populateGrid();
      // populateKeyboard();
      saveState();
    }
  };
}

function checkWord(correct, guess) {
  var result = [0, 0, 0, 0, 0];
  var letters = correct.split("");

  for (var i = 0; i < LENGTH; i += 1) {
    if (guess[i] == letters[i]) {
      letters[i] = null;
      result[i] = 1;
    }
  }

  for (var i = 0; i < LENGTH; i += 1) {
    var index = letters.indexOf(guess[i]);
    if (index >= 0 && result[i] == 0) {
      letters[index] = null;
      result[i] = 2;
    }
  }

  return result;
}

newWordButton.onclick = function () {
  resetGame();
  populateKeyboard();
  fetchWordList();
  guesses = [];
  setupInputs();
  populateGrid();

  message.innerHTML = "";
  message.style.color = "black";
};

statsButton.onclick = function () {
  statsContainer.style.display = "flex";
  gamesPlayedNumber.innerHTML = gamesPlayed;
  gamesWonNumber.innerHTML = gamesWon;
  gamesLostNumber.innerHTML = gamesLost;
};

closeStatsContainer.onclick = function () {
  statsContainer.style.display = "none";
};

loadState();

fetchWordList();

populateGrid();
populateKeyboard();
setupInputs();

getWordOfTheMinute();
