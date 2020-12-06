const X_CLASS = "x";
const O_CLASS = "o";
const board = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".box"));
const restart = document.getElementById("restart");
const winModal = document.getElementById("winModal");
const winMessage = document.getElementById("winMessage");
let tracker = 0;
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;
cells.forEach((cell) => {
  cell.addEventListener("click", gameLogic, { once: true });
});
function gameLogic(e) {
  const cell = e.target;
  const classToApply = circleTurn ? O_CLASS : X_CLASS;
  if (e.target.classList.contains("box")) {
    placeMark(cell, classToApply);
    tracker++;
    if (evaluateWin(classToApply)) {
      winModal.classList.remove("hidden");
      winMessage.innerHTML = classToApply + " wins!!!";
    }
    if (tracker == 9 && !evaluateWin(classToApply)) {
      winModal.classList.remove("hidden");
      winMessage.innerHTML = "It's a DRAW!!!";
    }
    swapTurns();
  }
}
restart.addEventListener("click", () => {
  tracker = 0;
  winMessage.innerHTML = "";
  cells.forEach((cell) => {
    cell.classList.remove("o");
    cell.classList.remove("x");
    cell.removeEventListener("click", gameLogic);
    cell.addEventListener("click", gameLogic, { once: true });
    winModal.classList.add("hidden");
  });
});
function swapTurns() {
  circleTurn = !circleTurn;
  swapBoardHover();
}
function swapBoardHover() {
  board.classList.remove(O_CLASS);
  board.classList.remove(X_CLASS);
  circleTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS);
}
function placeMark(cell, c) {
  cell.classList.add(c);
}
function evaluateWin(cls) {
  return WIN_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cells[index].classList.contains(cls);
    });
  });
}
