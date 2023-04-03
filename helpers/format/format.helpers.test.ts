import { NUMBER_UNITS, numberToWords } from './format.helpers';

interface Test {
	input: number;
	output: string;
}

const TESTS: Test[] = [
	...NUMBER_UNITS.map((row, index) => ({
		input: index,
		output: row || 'zero',
	})),
	{
		input: 123_456_789,
		output:
			'one hundred twenty three million, four hundred fifty six thousand, seven hundred eighty nine',
	},
	{
		input: 100_000,
		output: 'one hundred thousand',
	},
	{
		input: -1_234_567_890,
		output:
			'minus one billion, two hundred thirty four million, five hundred sixty seven thousand, eight hundred ninety',
	},
	{
		input: 420,
		output: 'four hundred twenty',
	},
];

test.each(TESTS)(
	'should return the input number in words',
	({ input, output }) => {
		const response = numberToWords(input);
		expect(response).toBe(output);
	}
);
