import { combineStrings, invalidError } from './combine-strings';

interface Test {
	input: [string[], number],
	output: string[],
}

const tests: Test[] = [
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

describe('testing combineStrings', () => {
	it.each(tests)('should return combined string array', ({ input, output }) => {
		expect(combineStrings(...input)).toStrictEqual(output);
	});
	it('should throw for invalid size', () => {
		expect(() =>
			combineStrings(['ab', 'base', 'gh'], 2)
		).toThrow(invalidError);
	});
});
