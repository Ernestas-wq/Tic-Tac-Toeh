const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.box'));
const restart = document.getElementById('restart');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const gameMenu = document.getElementById('gameMenu');
const singleBtn = document.getElementById('singlePlayer');
const twoPlayerBtn = document.getElementById('twoPlayers');
singleBtn.addEventListener('click', () => {
	gameMenu.classList.add('hidden');
	singlePlayer = true;
});

cells.forEach(cell => {
	cell.addEventListener('click', gameLogic, { once: true });
});
twoPlayerBtn.addEventListener('click', () => {
	gameMenu.classList.add('hidden');
	singlePlayer = false;
});
restart.addEventListener('click', () => {
	gameMenu.classList.remove('hidden');
	gameRestart();
	console.log(bot.moves);
});
