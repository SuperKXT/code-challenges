import { humanizeToken, humanizeCases } from './humanize-token.helpers';

import type { HumanizeCase } from './humanize-token.helpers';

interface Test {
	input: string;
	output: Record<HumanizeCase, string>;
}

const tests: Test[] = [
	{
		input: 'thisIsSomeTestString',
		output: {
			lower: 'this is some test string',
			sentence: 'This is some test string',
			title: 'This Is Some Test String',
			upper: 'THIS IS SOME TEST STRING',
		},
	},
	{
		input: 'this is a VERY     badly   -----formatted.......## STRING.',
		output: {
			lower: 'this is a very badly formatted string',
			sentence: 'This is a very badly formatted string',
			title: 'This Is A Very Badly Formatted String',
			upper: 'THIS IS A VERY BADLY FORMATTED STRING',
		},
	},
	{
		input: '----SaleOrderID-----',
		output: {
			lower: 'sale order',
			sentence: 'Sale order',
			title: 'Sale Order',
			upper: 'SALE ORDER',
		},
	},
];

describe.each(tests)('test humanizeToken helper', (test) => {
	it(`should return ${test.output.title} for humanizeToken(${test.input})`, () => {
		const output = humanizeToken(test.input);
		expect(output).toStrictEqual(test.output.title);
	});
	it.each(humanizeCases)(
		'should return humanized string by the given casing',
		(casing) => {
			const output = humanizeToken(test.input, casing);
			expect(output).toStrictEqual(test.output[casing]);
		}
	);
});
