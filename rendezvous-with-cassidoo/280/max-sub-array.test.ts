import { maxSubArray } from './max-sub-array';

type Test = {
	input: [number[], number];
	output: number[];
}

const TESTS: Test[] = [
	{ input: [[-4, 2, -5, 1, 2, 3, 6, -5, 1], 4], output: [1, 2, 3, 6] },
	{ input: [[1, 2, 0, 5], 2], output: [0, 5] },
	{ input: [[1, 2, 0, 5], 4], output: [1, 2, 0, 5] },
	{ input: [[1, 2, 0, 5], 4], output: [1, 2, 0, 5] },
	{ input: [[1, 1, 1, 1], 2], output: [1, 1] },
];

describe('testing maxSubArray', () => {
	it.each(TESTS)(
		'should return the sub array with the biggest sum',
		({ input, output }) => {
			expect(maxSubArray(...input)).toStrictEqual(output);
		}
	);
});
