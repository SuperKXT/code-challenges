export const rollCall = (names: string[]): string[] => {
	return names.map((name) => name.split("").reverse().join("")).sort();
};
