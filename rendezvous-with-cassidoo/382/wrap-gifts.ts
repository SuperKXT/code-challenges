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
	const combos = getCombos(gifts, width).sort((a, b) => b.length - a.length);
	return combos[0]?.length ?? 0;
};
