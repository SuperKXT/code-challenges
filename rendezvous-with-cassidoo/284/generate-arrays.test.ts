import { generateArrays } from './generate-arrays';

type Test = {
	input: number;
	output: number[][];
}

const TESTS: Test[] = [
	{
		input: 4,
		output: [[1], [1, 2], [1, 2, 3], [1, 2, 3, 4]],
	},
	{
		input: 1,
		output: [[1]],
	},
	{
		input: -1,
		output: [],
	},
	{
		input: 0,
		output: [],
	},
];

describe('testing generateArrays', () => {
	it.each(TESTS)(
		'should return array of arrays for given integer',
		({ input, output }) => {
			expect(generateArrays(input)).toStrictEqual(output);
		}
	);
});
