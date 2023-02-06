export const getColumnNumber = (
	string: string
): number => {
	return Array.from(string).reduceRight(
		(sum, char, index) => {
			const code = char.charCodeAt(0) - 64;
			const weight = 26 ** (string.length - 1 - index);
			sum += code * weight;
			return sum;
		}
		, 0
	);
};
