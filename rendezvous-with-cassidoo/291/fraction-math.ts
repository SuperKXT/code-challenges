type Fraction = `${number}/${number}`;

export const fractionMath = (
	fractionA: Fraction,
	operation: 'add' | 'divide' | 'multiply' | 'subtract',
	fractionB: Fraction,
): Fraction => {
	const parsedA = fractionA.split('/').map(Number) as [number, number];
	const parsedB = fractionB.split('/').map(Number) as [number, number];
	const solution: [number, number] = [0, 0];
	switch (operation) {
		case 'add': {
			solution[0] = parsedA[0] * parsedB[1] + parsedB[0] * parsedA[1];
			solution[1] = parsedA[1] * parsedB[1];
			break;
		}
		case 'subtract': {
			solution[0] = parsedA[0] * parsedB[1] - parsedB[0] * parsedA[1];
			solution[1] = parsedA[1] * parsedB[1];
			break;
		}
		case 'multiply': {
			solution[0] = parsedA[0] * parsedB[0];
			solution[1] = parsedA[1] * parsedB[1];
			break;
		}
		case 'divide': {
			solution[0] = parsedA[0] * parsedB[1];
			solution[1] = parsedA[1] * parsedB[0];
			break;
		}
	}
	const findFactors = (number: number) => {
		return [...new Array<undefined>(Math.abs(number))]
			.reduce<number[]>((array, _, index) => {
				return number % (index + 1) === 0 ? [...array, index + 1] : array;
			}, [])
			.sort((first, second) => second - first);
	};
	const numeratorFactors = findFactors(solution[0]);
	const denominatorFactors = findFactors(solution[1]);
	const hcf =
		numeratorFactors.find((factor) => denominatorFactors.includes(factor)) ?? 1;
	return `${solution[0] / hcf}/${solution[1] / hcf}`;
};
