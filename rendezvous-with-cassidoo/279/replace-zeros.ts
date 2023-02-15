export const replaceZeros = (input: string): string =>
	input.replace(/0+/g, (match) => String(match.length));
