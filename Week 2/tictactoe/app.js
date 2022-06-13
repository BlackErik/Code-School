var allTiles = document.querySelectorAll(".tile");
var whosTurnDisplay = document.querySelector(".whos-turn");
var restartButton = document.querySelector("#restart-button");

var maximumTurns = 9;
var turnCounter = 0;

var xTurn = true;

var gameOver = false;

console.log("all tiles: ", allTiles);

// for tile in tiles:
allTiles.forEach(function (tile) {
  whosTurnX();
  tile.onclick = function () {
    if (gameOver == false) {
      if ((xTurn == true) & (tile.innerHTML == "")) {
        tile.innerHTML = "X";
        tile.classList.add("x-occupied");
        whosTurnO();
        xTurn = false;
        if (checkWinner("x-occupied") == true) {
          xWinsGame();
          gameOver = true;
        }
        turnCounter++;
        if (
          (turnCounter == maximumTurns) &
          (checkWinner("x-occupied") == false)
        ) {
          whosTurnDisplay.innerHTML = "DRAW";
          whosTurnDisplay.classList.add("draw-text");
        }
      } else if ((xTurn == false) & (tile.innerHTML == "")) {
        tile.innerHTML = "O";
        tile.classList.add("o-occupied");
        whosTurnX();
        xTurn = true;
        if (checkWinner("o-occupied") == true) {
          oWinsGame();
          gameOver = true;
        }
        turnCounter++;
      }
    }
  };
});

restartButton.onclick = function () {
  allTiles.forEach(function (tile) {
    tile.innerHTML = "";
    tile.classList.remove("x-occupied");
    tile.classList.remove("o-occupied");
  });
  whosTurnX();
  whosTurnDisplay.classList.remove("win-color");
  whosTurnDisplay.classList.remove("draw-text");
  xTurn = true;
  gameOver = false;
  turnCounter = 0;
};

//Changes whos turn text to different text and color depending on who's turn
function whosTurnO() {
  whosTurnDisplay.classList.remove("x-occupied");
  whosTurnDisplay.classList.add("o-occupied");
  whosTurnDisplay.innerHTML = "O's Turn";
}

function whosTurnX() {
  whosTurnDisplay.classList.remove("o-occupied");
  whosTurnDisplay.classList.add("x-occupied");
  whosTurnDisplay.innerHTML = "X's Turn";
}

function xWinsGame() {
  whosTurnDisplay.classList.remove("o-occupied");
  whosTurnDisplay.classList.add("win-color");
  whosTurnDisplay.innerHTML = "X WINS";
}

function oWinsGame() {
  whosTurnDisplay.classList.remove("x-occupied");
  whosTurnDisplay.classList.add("win-color");
  whosTurnDisplay.innerHTML = "O WINS";
}

function checkWinner(player) {
  var sets = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"];

  var winner = false;
  sets.forEach(function (set) {
    var selector = "." + set + "." + player;
    var tiles = document.querySelectorAll(selector);
    if (tiles.length == 3) {
      winner = true;
    }
    console.log(winner);
  });
  return winner;
}
