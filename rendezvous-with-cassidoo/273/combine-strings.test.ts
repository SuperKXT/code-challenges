import { combineStrings, INVALID_ERROR } from './combine-strings';

type Test = {
	input: [string[], number];
	output: string[];
};

const TESTS: Test[] = [
	{
		input: [['a', 'b', 'c', 'd', 'e', 'f', 'g'], 5],
		output: ['a b c', 'd e f', 'g'],
	},
	{
		input: [['a', 'b', 'c', 'd', 'e', 'f', 'g'], 12],
		output: ['a b c d e f', 'g'],
	},
	{
		input: [['alpha', 'beta', 'gamma', 'delta', 'epsilon'], 20],
		output: ['alpha beta gamma', 'delta epsilon'],
	},
	{
		input: [['a', 'bce', 'ghs'], 3],
		output: ['a', 'bce', 'ghs'],
	},
	{
		input: [['a', 'b'], 1],
		output: ['a', 'b'],
	},
	{
		input: [['', ''], 1],
		output: ['', ''],
	},
];

test.each(TESTS)(
	'testing combineStrings for valid inputs',
	({ input, output }) => {
		expect(combineStrings(...input)).toStrictEqual(output);
	},
);

test('testing combineStrings for invalid inputs', () => {
	expect(() => combineStrings(['ab', 'base', 'gh'], 2)).toThrow(INVALID_ERROR);
});
