import { minimumPairs } from './minimum-pairs';

import type { Pair } from './minimum-pairs';

interface Test {
	input: number[];
	solution: Pair[];
}

const TESTS: Test[] = [
	{
		input: [4, 3, 2, 1],
		solution: ['1 2', '2 3', '3 4'],
	},
	{
		input: [10, 1, 9, 2, 15, 3, 14],
		solution: ['1 2', '2 3', '9 10', '14 15'],
	},
	{
		input: [4, 7, 2, 9],
		solution: ['2 4', '7 9'],
	},
];

describe('testing minimumPairs', () => {
	it.each(TESTS)(
		'should find minimum difference pairs for the given array',
		({ input, solution }) => {
			const response = minimumPairs(input);
			expect(response).toStrictEqual(solution);
		}
	);
});
