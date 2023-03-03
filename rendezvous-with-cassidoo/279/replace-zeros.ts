export const replaceZeros = (input: string): string =>
	input.replace(/0+/gu, (match) => String(match.length));
