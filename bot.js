const bot = {
	class: O_CLASS,
	moves: Array.from(document.querySelectorAll('.box')),
	draw: function() {
		console.log(this.moves);
		let randIndex = Math.floor(Math.random() * this.moves.length);
		this.moves[randIndex].classList.add(this.class);
		this.moves[randIndex].removeEventListener('click', gameLogic);
		this.moves.splice(randIndex, 1);
		tracker++;
		if (evaluateWin(this.class)) {
			winningMessage(this.class);
		}
	}
};
