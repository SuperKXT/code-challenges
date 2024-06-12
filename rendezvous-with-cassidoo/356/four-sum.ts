const getCombinations = (
	input: number[],
	size: number,
	curr: number[] = [],
) => {
	const arrays = [] as number[][];
	for (let idx = 0; idx < input.length; idx++) {
		const row = input[idx] as number;
		const newCurr = [...curr, row];
		if (newCurr.length === size) arrays.push(newCurr);
		else arrays.push(...getCombinations(input.slice(idx + 1), size, newCurr));
	}
	return arrays;
};
export const fourSum = (input: number[], target: number): number[][] => {
	const combinations = getCombinations(input, 4);
	const correct = combinations.filter(
		(combination) => combination.reduce((a, b) => a + b, 0) === target,
	);
	return correct;
};
