export const repeatedGroups = (input: number[]): number[][] => {
	const groups: number[][] = [];
	let current: number | null = null;
	for (const number of input) {
		if (number === current) {
			groups.at(-1)?.push(number);
		} else {
			groups.push([number]);
			current = number;
		}
	}

	return groups.filter((group) => group.length > 1);
};
