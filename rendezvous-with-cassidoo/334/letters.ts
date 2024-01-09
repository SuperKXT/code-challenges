const _letters = (input: string[], prefix: string = ''): string[] => {
	const res: string[] = [];
	for (let i = 0; i < input.length; i++) {
		const curr = input[i] as string;
		const rest = input.slice(0, i).concat(input.slice(i + 1));
		const currPrefix = `${prefix}${curr}`;
		res.push(...[currPrefix, ..._letters(rest, currPrefix)]);
	}
	return res;
};

export const letters = <const Input extends string[]>(
	input: Input,
): string[] => {
	return [...new Set(_letters(input))];
};
