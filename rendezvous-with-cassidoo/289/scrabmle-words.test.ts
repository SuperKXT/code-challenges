import { scrambleWords } from './scramble-words';

const TESTS: string[] = [
	'A quick brown fox jumped over the lazy dog.',
	'this is sparta',
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
