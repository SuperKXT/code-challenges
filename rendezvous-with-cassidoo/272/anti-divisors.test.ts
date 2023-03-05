import { findAntiDivisors } from './anti-divisors';

interface Test {
	input: number;
	output: number[];
}

const TESTS: Test[] = [
	{ input: 1, output: [] },
	{ input: 2, output: [] },
	{ input: 3, output: [2] },
	{ input: 4, output: [3] },
	{ input: 5, output: [2, 3] },
	{ input: 6, output: [4] },
	{ input: 7, output: [2, 3, 5] },
	{ input: 8, output: [3, 5] },
	{ input: 9, output: [2, 6] },
	{ input: 10, output: [3, 4, 7] },
	{ input: 234, output: [4, 7, 12, 36, 52, 67, 156] },
];

describe('testing findAntiDivisors', () => {
	it.each(TESTS)(
		'should return anti-divisor array for given number',
		({ input, output }) => {
			expect(findAntiDivisors(input)).toStrictEqual(output);
		}
	);
});
