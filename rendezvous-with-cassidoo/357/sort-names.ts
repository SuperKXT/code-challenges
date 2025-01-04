export const sortNames = (input: string[]): string[] => {
	return input.toSorted((a, b) => {
		const aCount = a.replace(/[^aeiou]/giu, "").length; // cSpell: disable-line
		const bCount = b.replace(/[^aeiou]/giu, "").length; // cSpell: disable-line
		return bCount - aCount || a.localeCompare(b);
	});
};
