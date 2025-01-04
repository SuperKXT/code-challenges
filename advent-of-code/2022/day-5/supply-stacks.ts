export const supplyStacks = (
	input: string,
): {
	part1: string;
	part2: string;
} => {
	const parts = input.split("\n\n");
	const stackRows = parts[0]?.split("\n").slice(0, -1) ?? [];
	const stacks = stackRows.reduce<string[][]>((array, row) => {
		let index = 0;
		for (let idx = 1; idx < row.length; idx += 4) {
			const current = row[idx];
			const lastIndex = index++;
			if (!array[lastIndex]) array.push([]);

			if (!current || current === " ") continue;

			array[lastIndex]?.push(current);
		}
		return array;
	}, []);

	const part1Stacks = structuredClone(stacks);
	const part2Stacks = structuredClone(stacks);

	const moveRows = parts[1]?.split("\n").filter(Boolean) ?? [];
	const moves = moveRows.reduce<[number, number, number][]>(
		(array, row) => [
			...array,
			row.match(/[0-9]+/gu)?.map(Number) as [number, number, number],
		],
		[],
	);

	for (const [amount, from, to] of moves) {
		const part1From = part1Stacks[from - 1] as string[];
		const part1To = part1Stacks[to - 1] as string[];
		const part2From = part2Stacks[from - 1] as string[];
		const part2To = part2Stacks[to - 1] as string[];
		part1To.unshift(...part1From.splice(0, amount).reverse());
		part2To.unshift(...part2From.splice(0, amount));
	}

	return {
		part1: part1Stacks.map((stack: string[]) => stack[0]).join(""),
		part2: part2Stacks.map((stack: string[]) => stack[0]).join(""),
	};
};
