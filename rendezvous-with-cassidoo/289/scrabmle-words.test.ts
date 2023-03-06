import { scrambleWords } from './scramble-words';

const TESTS: string[] = [
	'A quick brown fox jumped over the lazy dog.',
	'this is sparta',
	'this is a multi-sentence string. this should work as well.',
	'following the light of the sun, we left the old world.',
];

test.each(TESTS)('should return the sentence with scrambled words', (input) => {
	const output = scrambleWords(input);
	const sortedInput = output
		.split(' ')
		.map((row) => row.split('').sort().join(''))
		.join(' ');
	const sortedOutput = output
		.split(' ')
		.map((row) => row.split('').sort().join(''))
		.join(' ');
	expect(sortedInput).toStrictEqual(sortedOutput);
});
