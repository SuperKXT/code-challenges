import { missingBits } from './missing-bits';

interface Test {
	input: number[];
	output: string;
}

const tests: Test[] = [
	{
		input: [1, 2, 3, 4, 20, 21, 22, 23],
		output: '[1,2,3,4,...,20,21,22,23]',
	},
	{
		input: [1, 2, 3, 5, 6],
		output: '[1,2,3,4,5,6]',
	},
	{
		input: [1, 3, 20, 27],
		output: '[1,2,3,...,20,...,27]',
	},
	{
		input: [],
		output: '[]',
	},
	{
		input: [-3, 0, 5],
		output: '[-3,...,0,...,5]',
	},
];

describe('testing missingBits', () => {
	it.each(tests)(
		'should return string with missing range bits',
		({ input, output }) => {
			expect(missingBits(input)).toBe(output);
		}
	);
});
