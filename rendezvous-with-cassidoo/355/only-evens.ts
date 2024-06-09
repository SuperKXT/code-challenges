export const onlyEvens = <const Input extends number[]>(
	input: Input,
): number[] => {
	return input.filter((num) => num % 2 === 0).toSorted((a, b) => a - b);
};
