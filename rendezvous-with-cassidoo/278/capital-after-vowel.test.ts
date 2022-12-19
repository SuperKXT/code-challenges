import { capitalAfterVowel } from './capital-after-vowel';

interface Test {
	input: string,
	output: string,
}

const tests: Test[] = [
	{ input: 'hello world', output: 'heLlo WoRld' },
	{ input: 'xaabeuekadii', output: 'xaaBeueKaDii' }, /** cSpell: disable-line */
	{ input: 'ab', output: 'aB' },
];

describe('testing capitalAfterVowel', () => {
	it.each(tests)('should return correct both with and without RegEx', ({ input, output }) => {
		expect(capitalAfterVowel(input)).toStrictEqual({
			withRegex: output,
			withoutRegex: output,
		});
	});
});
