export type Pair = `${number} ${number}`;

export const minimumPairs = (numbers: number[]) => {

	const sorted = numbers.sort((a, b) => a - b);
	let minimumDistance = Infinity;
	const pairs: Pair[] = [];

	for (let i = 1; i < sorted.length; i++) {

		const current = sorted[i] as number;
		const previous = sorted[i - 1] as number;
		const distance = current - previous;

		if (distance > minimumDistance) continue;

		pairs.push(`${previous} ${current}`);

		if (distance < minimumDistance) {
			minimumDistance = distance;
			pairs.splice(pairs.length);
		}

	}

	console.log(pairs.join('\n'));
	return pairs;

};