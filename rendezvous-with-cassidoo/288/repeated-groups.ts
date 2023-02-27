export const repeatedGroups = (input: number[]): number[][] => {
	const groups: number[][] = [];
	let current: null | number = null;
	for (let i = 0; i < input.length; i++) {
		const number = input[i] as number;
		if (number === current) {
			groups.at(-1)?.push(number);
		} else {
			groups.push([number]);
			current = number;
		}
	}
	return groups.filter((group) => group.length > 1);
};
