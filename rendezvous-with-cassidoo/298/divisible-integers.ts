export const removeZeroes = (input: number[]) => {
	const first = input.findIndex((n) => n !== 0);
	const last = input.findLastIndex((n) => n !== 0);
	return input.slice(first, last + 1);
};
