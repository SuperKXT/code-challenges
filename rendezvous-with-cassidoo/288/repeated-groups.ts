export const repeatedGroups = (input: number[]): number[][] => {
	const groups: number[][] = [];
	let current: null | number = null;
	for (let i = 0; i < input.length; i++) {
		const last = input[i - 1];
		const number = input[i] as number;
		const next = input[i + 1];
		if (next === number) {
			if (number === current) {
				groups.at(-1)?.push(number);
			} else {
				groups.push([number]);
				current = number;
			}
		} else if (last === number) {
			groups.at(-1)?.push(number);
		}
	}
	return groups;
};
