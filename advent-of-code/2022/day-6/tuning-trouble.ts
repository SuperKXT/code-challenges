export const tuningTrouble = (
	input: string
): {
	part1: number,
	part2: number,
} => {

	const solution = {
		part1: 0,
		part2: 0,
	};

	for (let index = 0; index < input.length; index++) {
		if (index <= 4) continue;
		const isMarker = [...new Set(
			input.slice(index - 4, index).split('')
		)].length === 4;
		if (isMarker) {
			solution.part1 = index;
			break;
		}
	}
	return solution;

};
