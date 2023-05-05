import { addEventDigits, addEventDigitsSinglePass } from './add-even-digits';

type Test = {
	input: number;
	output: number;
}

const TESTS: Test[] = [
	{ input: 548915381, output: 26 },
	{ input: 10, output: 0 },
	{ input: 1010.11, output: 1 },
	{ input: 0, output: 0 },
	{ input: -123.456, output: 12 },
];

describe('testing maxSubArray', () => {
	it.each(TESTS)(
		'should return the sub array with the biggest sum',
		({ input, output }) => {
			expect(addEventDigits(input)).toStrictEqual(output);
			expect(addEventDigitsSinglePass(input)).toStrictEqual(output);
		}
	);
});
