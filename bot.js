const bot = {
	class: O_CLASS,
	availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
	madeMoves: [],
	draw: function() {
		// let randIndex = Math.floor(Math.random() * this.availableMoves.length);
		// console.log('SMART BOT SAYS ' + this.smartBot());
		let markIndex = this.smartBot();
		cells[markIndex].classList.add(this.class);
		cells[markIndex].removeEventListener('click', gameLogic);
		this.madeMoves.push(markIndex);
		this.availableMoves = this.availableMoves.filter(el => el !== markIndex);
		console.log(this.madeMoves);
		tracker++;
		if (evaluateWin(this.class)) {
			winningMessage(this.class);
		}
	},
	smartBot: function() {
		// Index to block opponent
		if (this.madeMoves.length === 0) {
			let random = Math.floor(Math.random() * this.availableMoves.length);
			return this.availableMoves[random];
		}
		const blockIndex = getPlacement(playerMadeMoves);
		// Get the index of a possible win
		const winIndex = getPlacement(this.madeMoves);

		// Some logic to prevent undefineds returns, giving winning the priorioty, then blocking..
		if (blockIndex === undefined && winIndex !== undefined) return winIndex;
		else if (blockIndex !== undefined && winIndex !== undefined) return winIndex;
		else if (blockIndex !== undefined && winIndex === undefined) return blockIndex;
		else if (blockIndex === undefined && winIndex === undefined)
			return getPlacementNoPair(this.madeMoves);
	}
};

// Get placement index if bot has no pairs
function getPlacementNoPair(arr) {
	let sets = subset(arr, 2);
	let index;
	sets.forEach(set => {
		let x = set[0];
		let y = set[1] || undefined;
		WIN_COMBINATIONS.forEach(combo => {
			if ((combo.includes(x) || combo.includes(y)) && compareEvery(combo, playerMadeMoves)) {
				// console.log(combo);
				index = combo.filter(num => num !== x && num !== y)[0];
			}
		});
	});
	return index;
}
// Get placement of a possible win or a possible block for enemy...
function getPlacement(arr) {
	let sets = subset(arr, 2);
	let index;
	sets.forEach(set => {
		// console.log(set);
		let x = set[0];
		let y = set[1] || undefined;
		WIN_COMBINATIONS.forEach(combo => {
			if (combo.includes(x) && combo.includes(y)) {
				// console.log('X IS ' + x + ' Y IS ' + y);
				bot.availableMoves.forEach(move => {
					combo.includes(move) ? (index = move) : undefined;
					// return combo.includes(move) ? move : undefined;
				});
			}
		});
	});
	return index;
}

// Method to get all subsets to check winning combinations for bot
function subset(arra, arra_size) {
	var result_set = [],
		result;

	for (var x = 0; x < Math.pow(2, arra.length); x++) {
		result = [];
		i = arra.length - 1;
		do {
			if ((x & (1 << i)) !== 0) {
				result.push(arra[i]);
			}
		} while (i--);

		if (result.length >= arra_size) {
			result_set.push(result);
		}
	}
	return arra.length === 1 ? [arra[0]] : result_set.filter(el => el.length === 2);
}
// Method to check if any element in arr2 includes arr1 to get partial index
function compareEvery(arr1, arr2) {
	let count = 0;
	for (let i = 0; i < arr2.length; i++) {
		if (!arr1.every(el => el !== arr2[i])) {
			count++;
		}
	}
	return count > 0 ? false : true;
}
