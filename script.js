document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const gameContainer = document.querySelector(".game-container");

  setTimeout(() => {
    loader.style.display = "none";
    gameContainer.style.display = "block";
    initGame();
  }, 1500); // Simulate loading
});

let currentPlayer = "X";
let gameBoard = Array(9).fill("");
const board = document.getElementById("game-board");

function initGame() {
  board.innerHTML = "";
  gameBoard = Array(9).fill("");
  currentPlayer = "X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
  }
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    showResult(`${currentPlayer} wins!`);
  } else if (!gameBoard.includes("")) {
    showResult("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => gameBoard[i] === currentPlayer)
  );
}

function showResult(message) {
  document.getElementById("result-message").textContent = message;
  document.getElementById("result-popup").style.display = "flex";
}

function restartGame() {
  document.getElementById("result-popup").style.display = "none";
  initGame();
}
