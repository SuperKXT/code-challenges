export const balanceParens = (input: string): number => {
	return Math.abs(
		(input.match(/\(/g)?.length ?? 0) - (input.match(/\)/g)?.length ?? 0)
	);
};
