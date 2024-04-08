const rollDice = (
	dice: number,
	sides: number,
	combo: number,
	curDie: number = 1,
	currSum: number = 0,
): number => {
	let count = 0;
	for (let side = 1; side <= sides; side++) {
		if (curDie === dice) {
			if (currSum + side === combo) count++;
			continue;
		} else {
			count += rollDice(dice, sides, combo, curDie + 1, currSum + side);
		}
	}
	return count;
};

export const diceSum = (dice: number, sides: number, combo: number): number => {
	return rollDice(dice, sides, combo);
};
