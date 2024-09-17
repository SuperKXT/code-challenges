const options = [6, 3, 2];

type Combination = { sum: number; combination: number[] };

const getCombinations = (
	targetSum: number,
	current: Combination = { sum: 0, combination: [] },
): Combination[] => {
	const combinations: Combination[] = [];
	for (const option of options) {
		const sum = current.sum + option;
		const combination = [...current.combination, option];
		if (sum === targetSum) combinations.push({ sum, combination });
		else if (sum < targetSum)
			combinations.push(...getCombinations(targetSum, { sum, combination }));
	}
	return combinations;
};

export const waysToScore = (target: number): number => {
	const candidates = getCombinations(target).map((r) =>
		r.combination.sort((a, b) => a - b),
	);
	const existSet = new Set<string>();
	let count = 0;
	for (const candidate of candidates) {
		const key = candidate.join(',');
		if (existSet.has(key)) continue;
		existSet.add(key);
		count++;
	}
	return count;
};
