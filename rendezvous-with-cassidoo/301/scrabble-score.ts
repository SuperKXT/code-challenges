const onePoints = ['E', 'A', 'I', 'O', 'N', 'R', 'T', 'L', 'S', 'U'];
const twoPoints = ['D', 'G'];
const threePoints = ['B', 'C', 'M', 'P'];
const fourPoints = ['F', 'H', 'V', 'W', 'Y'];
const fivePoints = ['K'];
const eightPoints = ['J', 'X'];
const tenPoints = ['Q', 'Z'];

export const scrabbleScore = (input: string): number => {
	let score = 0;
	for (const curr of input.split('')) {
		const letter = curr.toUpperCase();
		if (onePoints.includes(letter)) score += 1;
		else if (twoPoints.includes(letter)) score += 2;
		else if (threePoints.includes(letter)) score += 3;
		else if (fourPoints.includes(letter)) score += 4;
		else if (fivePoints.includes(letter)) score += 5;
		else if (eightPoints.includes(letter)) score += 8;
		else if (tenPoints.includes(letter)) score += 10;
		else throw new Error('invalid letter');
	}
	return score;
};
