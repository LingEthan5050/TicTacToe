const statusDisplay = document.querySelector(".game--status");

let board = true;
let player = "X";
let status = ["", "", "", "", "", "", "", "", ""];

const win = () => `Player ${player} has won!`;
const draw = () => `Game ended in a draw!`;
const playerTurn = () => `It's ${player}'s turn`;

statusDisplay.innerHTML = playerTurn();

const checkWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  status[clickedCellIndex] = player;
  clickedCell.innerHTML = player;
}

function turn() {
  player = player === "X" ? "O" : "X";
  statusDisplay.innerHTML = playerTurn();
}

function checksConditions() {
  let roundWon = false;
  for (let i = 0; i < checkWin.length; i++) {
    const winCondition = checkWin[i];
    let a = status[winCondition[0]];
    let b = status[winCondition[1]];
    let c = status[winCondition[2]]; 
    console.log(a, b, c);
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = win();
    board = false;
    return;
  }

  let roundDraw = !status.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = draw();
    board = false;
    return;
  }

  turn();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.index);

  if (status[clickedCellIndex] !== "" || !board) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  checksConditions();
}

function handleRestartGame() {
  board = true;
  player = "X";
  status = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = playerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);