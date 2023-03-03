export const getColumnNumber = (string: string): number => {
	return Array.from(string).reduce((sum, char, index) => {
		const code = char.charCodeAt(0) - 64;
		const weight = 26 ** (string.length - 1 - index);
		const number = code * weight;
		return sum + number;
	}, 0);
};
