export const supplyStacks = async (
	input: string
): Promise<{
	part1: string,
	part2: string,
}> => {

	const parts = input.split('\n\n');
	const stackRows = parts[0]?.split('\n').slice(0, -1) ?? [];
	const stacks = stackRows.reduce(
		(array: string[][], row) => {
			let index = 0;
			for (let i = 1; i < row.length; i += 4) {
				const current = row[i];
				const lastIndex = index++;
				if (!array[lastIndex]) array.push([]);
				if (!current || current === ' ') continue;
				array[lastIndex]?.push(current);
			}
			return array as any;
		}
		, []
	);

	const part1Stacks = structuredClone(stacks);
	const part2Stacks = structuredClone(stacks);

	const moveRows = parts[1]?.split('\n').filter(Boolean) ?? [];
	const moves = moveRows.reduce(
		(array: [number, number, number][], row) => [
			...array,
			row.match(/[0-9]+/g)?.map(Number) as any,
		]
		, []
	);

	for (const [amount, from, to] of moves) {
		const part1From = part1Stacks[from - 1] as string[];
		const part1To = part1Stacks[to - 1] as string[];
		const part2From = part2Stacks[from - 1] as string[];
		const part2To = part2Stacks[to - 1] as string[];
		part1To.unshift(
			...part1From.splice(0, amount).reverse()
		);
		part2To.unshift(
			...part2From.splice(0, amount)
		);
	}

	return {
		part1: part1Stacks.map((stack: string[]) => stack[0]).join(''),
		part2: part2Stacks.map((stack: string[]) => stack[0]).join(''),
	};

};
