export const INVALID_ERROR = new Error(
	"the given string must be non-empty and can only contain `/` or `\\`",
);

export const verticalSlashes = (slashes: string): string => {
	if (!/^[\\/]+$/u.test(slashes)) throw INVALID_ERROR;

	let offset: number = 0;
	return Array.from(
		slashes,
		(character) =>
			" ".repeat(character === "/" ? (offset ? --offset : 0) : offset++) +
			character,
	).join("\n");
};
