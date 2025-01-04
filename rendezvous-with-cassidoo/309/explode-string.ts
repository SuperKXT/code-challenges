export const explodeString = (string: string): string[] => {
	const sorted = string.split("").sort();
	const result: string[] = [];
	while (sorted[0])
		result.push(sorted.splice(0, result.lastIndexOf(sorted[0])).join(""));
	return result;
};
