type MinRows<_Groups extends number[], _RowSize extends number> = number;

const getCombinations = (nums: number[], prev: number[] = []) => {
	const combinations: number[][] = [];
	for (let i = 0; i < nums.length; i++) {
		const curr = [...prev, nums[i] as number];
		combinations.push(curr);
		combinations.push(...getCombinations(nums.slice(i + 1), curr));
	}
	return combinations;
};

export const minRows = <
	const Groups extends [number, ...number[]],
	RowSize extends number,
>(
	groups: Groups,
	rowSize: RowSize,
): MinRows<Groups, RowSize> => {
	const combinations = getCombinations(groups.map((_, idx) => idx));
	const valid = [];
	for (const arr of combinations) {
		const sum = arr.reduce((a, b) => a + (groups[b] as number), 0);
		if (sum > rowSize) continue;
		valid.push({ size: arr.length, sum, arr });
	}
	const sorted = valid.sort((a, b) => {
		if (a.size === b.size) return b.sum - a.sum;
		return b.size - a.size;
	});
	let rows = 0;
	let remaining = groups.map((_, idx) => idx);
	for (const r of sorted) {
		if (!remaining.length) break;
		const filtered = remaining.filter((curr) => !r.arr.includes(curr));
		if (remaining.length - filtered.length !== r.size) continue;
		rows++;
		remaining = filtered;
	}
	return rows as never;
};
