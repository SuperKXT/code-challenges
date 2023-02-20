import { balanceParens } from './balance-parens';

interface Test {
	input: string;
	output: number;
}

const tests: Test[] = [
	{ input: '()', output: 0 },
	{ input: '(()', output: 1 },
	{ input: '))()))))()', output: 6 },
	{ input: ')))))', output: 5 },
];

describe('testing balanceParens', () => {
	it.each(tests)(
		'should return the number of required parens to balance string',
		({ input, output }) => {
			expect(balanceParens(input)).toStrictEqual(output);
		}
	);
});
