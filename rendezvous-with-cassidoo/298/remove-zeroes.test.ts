import { removeZeroes } from './remove-zeroes.js';

type Test = {
	input: number[];
	output: number[];
};

const tests: Test[] = [
	{
		input: [0, 0, 0, 3, 1, 4, 1, 5, 9, 0, 0, 0, 0],
		output: [3, 1, 4, 1, 5, 9],
	},
	{
		input: [0, 0, 0],
		output: [],
	},
	{
		input: [8],
		output: [8],
	},
];

test.each(tests)('should return the trimmed array', ({ input, output }) => {
	const response = removeZeroes(input);
	expect(response).toStrictEqual(output);
});
