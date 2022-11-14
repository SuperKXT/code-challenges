import { combineStrings } from './combine-strings';

interface Test {
	input: [string[], number],
	output: string[],
}

const tests: Test[] = [
	{ input: [['a', 'b', 'c', 'd', 'e', 'f', 'g'], 5], output: ['a b c', 'd e f', 'g'] },
	{ input: [['a', 'b', 'c', 'd', 'e', 'f', 'g'], 12], output: ['a b c d e f', 'g'] },
	{ input: [['alpha', 'beta', 'gamma', 'delta', 'epsilon'], 20], output: ['alpha beta gamma', 'delta epsilon'] },
];

describe('testing combineStrings', () => {
	it.each(tests)('should return combined string array', ({ input, output }) => {
		expect(combineStrings(...input)).toStrictEqual(output);
	});
});
