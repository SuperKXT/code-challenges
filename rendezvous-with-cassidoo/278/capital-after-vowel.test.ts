import { capitalAfterVowel } from './capital-after-vowel';

interface Test {
	input: string;
	output: string;
}

const tests: Test[] = [
	{ input: 'hello world', output: 'heLlo WoRld' },
	/** cSpell: disable-next-line */
	{ input: 'xaabeuekadii', output: 'xaaBeueKaDii' },
	{ input: 'ab', output: 'aB' },
];

describe('testing capitalAfterVowel', () => {
	it.each(tests)(
		'should return correct both with and without RegEx',
		({ input, output }) => {
			expect(capitalAfterVowel(input)).toStrictEqual({
				withRegex: output,
				withoutRegex: output,
			});
		}
	);
});
