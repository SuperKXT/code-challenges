const getCombos = (
	gifts: number[],
	width: number,
	currentCombo: number[] = [],
	currentSum: number = 0,
): number[][] => {
	const combos: number[][] = [];
	for (let idx = 0; idx < gifts.length; idx++) {
		const curr = gifts[idx] as number;
		const sum = currentSum + curr;
		if (sum > width) {
			combos.push(currentCombo);
			continue;
		}
		const newCombos = getCombos(
			gifts.filter((_, i) => i !== idx),
			width,
			[...currentCombo, curr],
			sum,
		);
		combos.push(...newCombos);
	}
	return combos;
};

export const wrapGifts = (gifts: number[], width: number): number => {
	const sorted = gifts.toSorted((a, b) => a - b);
	let count = 0;
	let sum = 0;
	for (const curr of sorted) {
		sum += curr;
		if (sum > width) break;
		count++;
	}
	return count;
};
