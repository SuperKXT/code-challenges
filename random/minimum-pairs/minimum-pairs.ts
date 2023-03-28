export type Pair = `${number} ${number}`;

export const minimumPairs = (numbers: number[]): Pair[] => {
	const sorted = numbers.sort((first, second) => first - second);
	let minimumDistance = Infinity;
	const pairs: Pair[] = [];

	for (let index = 1; index < sorted.length; index++) {
		const current = sorted[index] as number;
		const previous = sorted[index - 1] as number;
		const distance = current - previous;

		if (distance > minimumDistance) {
			continue;
		}

		pairs.push(`${previous} ${current}`);

		if (distance < minimumDistance) {
			minimumDistance = distance;
			pairs.splice(pairs.length);
		}
	}

	// // console.log(pairs.join('\n'));
	return pairs;
};
