export const invalidError = new Error(
	'the given string must be non-empty and can only contain `/` or `\\`'
);

export const verticalSlashes = (
	slashes: string
): string => {
	if (!/^[\\/]+$/.test(slashes)) {
		throw invalidError;
	}
	const offset: ' '[] = [];
	return Array.from(
		slashes,
		(character, index) => {
			const current = offset.join('') + character;
			if (slashes[index + 1] === '\\') offset.push(' ');
			if (character === '/') offset.pop();
			return current;
		}
	).join('\n');
};
