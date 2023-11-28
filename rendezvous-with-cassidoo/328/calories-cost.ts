export const caloriesCost = (
	calories: number[],
	prices: number[],
	goal: number,
): number => {
	const result: number[] = [];
	const sorted = calories
		.map((row, idx) => ({ count: row, price: prices[idx] as number }))
		.sort((a, b) => b.count / b.price - a.count / a.price);
	let remaining = goal;
	for (const row of sorted) {
		if (remaining < row.count) continue;
		remaining -= row.count;
		result.push(row.price);
		if (remaining === 0) break;
	}
	if (!result.length) return -1;
	return result.reduce((acc, curr) => acc + curr);
};
