import { repeatedGroups } from './repeated-groups';

type Test = {
	input: number[];
	output: number[][];
}

const TESTS: Test[] = [
	{ input: [1, 2, 2, 4, 5], output: [[2, 2]] },
	{
		input: [1, 1, 0, 0, 8, 4, 4, 4, 3, 2, 1, 9, 9],
		output: [
			[1, 1],
			[0, 0],
			[4, 4, 4],
			[9, 9],
		],
	},
];

describe('testing repeatedGroups', () => {
	it.each(TESTS)(
		'should return the group of repeated numbers',
		({ input, output }) => {
			expect(repeatedGroups(input)).toStrictEqual(output);
		}
	);
});
