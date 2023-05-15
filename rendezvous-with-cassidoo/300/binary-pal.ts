export const binaryPal = (input: number) => {
	return input.toString(2) === input.toString(2).split('').reverse().join('');
};
