const X_CLASS = 'x';
const O_CLASS = 'o';
let tracker = 0;
const WIN_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
let playerMadeMoves = [];
let circleTurn = false;
let singlePlayer = true;
let gameOver = false;

function gameLogic(e) {
	const cell = e.target;
	const classToApply = circleTurn ? O_CLASS : X_CLASS;
	if (e.target.classList.contains('box')) {
		tracker++;
		placeMark(cell, classToApply);
		if (evaluateWin(classToApply)) {
			winningMessage(classToApply);
		}
		if (tracker == 9 && !evaluateWin(classToApply)) {
			winModal.classList.remove('hidden');
			winMessage.innerHTML = "It's a DRAW!!!";
		}
		swapTurns();
	}
}
function winningMessage(winner) {
	winModal.classList.remove('hidden');
	let message = `${winner} WINS!!!`;
	winMessage.innerHTML = message;
}

function swapTurns() {
	circleTurn = !circleTurn;
	swapBoardHover();
}
function swapBoardHover() {
	board.classList.remove(O_CLASS);
	board.classList.remove(X_CLASS);
	circleTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS);
}

function evaluateWin(cls) {
	return WIN_COMBINATIONS.some(combinations => {
		return combinations.every(index => {
			return cells[index].classList.contains(cls);
		});
	});
}
function gameRestart() {
	tracker = 0;
	winMessage.innerHTML = '';
	gameOver = false;
	circleTurn = false;
	swapBoardHover();
	cells.forEach(cell => {
		cell.classList.remove('o');
		cell.classList.remove('x');
		cell.removeEventListener('click', gameLogic);
		cell.addEventListener('click', gameLogic, { once: true });
		winModal.classList.add('hidden');
	});
	bot.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	bot.madeMoves = [];
	playerMadeMoves = [];
}
function placeMark(cell, c) {
	cell.classList.add(c);
	if (singlePlayer) {
		playerMadeMoves.push(cells.indexOf(cell));
		console.log(cells.indexOf(cell));
		bot.availableMoves = bot.availableMoves.filter(x => x !== cells.indexOf(cell));
		if (evaluateWin(bot.class) || evaluateWin(c) || tracker == 9) {
			gameOver = true;
		}
		if (!gameOver) {
			setTimeout(() => {
				bot.draw();
			}, 500);
			swapTurns();
		}
	}
}
