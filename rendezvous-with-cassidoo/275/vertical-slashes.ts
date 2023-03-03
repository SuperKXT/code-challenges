export const invalidError = new Error(
	'the given string must be non-empty and can only contain `/` or `\\`'
);

export const verticalSlashes = (slashes: string): string => {
	if (!/^[\\/]+$/u.test(slashes)) throw invalidError;

	let offset: number = 0;
	return Array.from(
		slashes,
		(character) =>
			' '.repeat(character === '/' ? (offset ? --offset : 0) : offset++) +
			character
	).join('\n');
};
