export const onlyEvens = (input: number[]): number[] => {
	return input.filter((num) => num % 2 === 0).toSorted((a, b) => a - b);
};
