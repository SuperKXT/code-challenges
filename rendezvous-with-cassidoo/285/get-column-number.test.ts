import { getColumnNumber } from './get-column-number';

interface Test {
	input: string;
	output: number;
}

const tests: Test[] = [
	{ input: 'A', output: 1 },
	{ input: 'B', output: 2 },
	{ input: 'C', output: 3 },
	{ input: 'Z', output: 26 },
	{ input: 'AA', output: 27 },
	{ input: 'AB', output: 28 },
	{ input: 'AH', output: 34 },
	{ input: 'BQ', output: 69 },
	{ input: 'DF', output: 110 },
	{ input: 'AAA', output: 703 },
];

describe('testing generateArrays', () => {
	it.each(tests)(
		'should return the column number corresponding to the name',
		({ input, output }) => {
			expect(getColumnNumber(input)).toStrictEqual(output);
		}
	);
});
