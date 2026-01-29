let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const HUMAN = "X";
const AI = "O";

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

statusText.textContent = "Your turn (X)";

cells.forEach(cell => cell.addEventListener("click", handleHumanMove));
restartBtn.addEventListener("click", restartGame);

// 🧠 HUMAN MOVE
function handleHumanMove(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  makeMove(index, HUMAN);

  if (gameActive) {
    statusText.textContent = "Computer thinking...";
    setTimeout(computerMove, 500);
  }
}

// 🤖 COMPUTER MOVE (SMART RANDOM)
function computerMove() {
  let available = board
    .map((v, i) => v === "" ? i : null)
    .filter(v => v !== null);

  if (available.length === 0) return;

  // Try to win
  for (let i of available) {
    board[i] = AI;
    if (checkWinner(AI)) {
      cells[i].textContent = AI;
      endGame("Computer wins 🤖");
      return;
    }
    board[i] = "";
  }

  // Try to block human
  for (let i of available) {
    board[i] = HUMAN;
    if (checkWinner(HUMAN)) {
      board[i] = AI;
      cells[i].textContent = AI;
      checkGameState();
      return;
    }
    board[i] = "";
  }

  // Random move
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  makeMove(randomIndex, AI);
}

// 🎯 MAKE MOVE
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  checkGameState();
}

// 🏆 CHECK GAME STATE
function checkGameState() {
  if (checkWinner(HUMAN)) {
    endGame("You win 🎉");
    return;
  }

  if (checkWinner(AI)) {
    endGame("Computer wins 🤖");
    return;
  }

  if (!board.includes("")) {
    endGame("Draw 🤝");
    return;
  }

  statusText.textContent = "Your turn (X)";
}

// ✅ CHECK WINNER
function checkWinner(player) {
  return winConditions.some(condition =>
    condition.every(index => board[index] === player)
  );
}

// ❌ END GAME
function endGame(message) {
  statusText.textContent = message;
  gameActive = false;
}

// 🔄 RESTART
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Your turn (X)";
  cells.forEach(cell => cell.textContent = "");
}
