export const balanceParens = (input: string): number => {
	return Math.abs(
		(input.match(/\(/gu)?.length ?? 0) - (input.match(/\)/gu)?.length ?? 0),
	);
};
