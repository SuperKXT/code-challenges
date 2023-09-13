import { humanizeCases, humanizeToken } from './humanize-token.helpers';

import type { HumanizeCase } from './humanize-token.helpers';

type Test = {
	input: string;
	output: Record<HumanizeCase, string>;
};

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
			sentence: 'This is a VERY badly formatted STRING',
			title: 'This Is A VERY Badly Formatted STRING',
			upper: 'THIS IS A VERY BADLY FORMATTED STRING',
		},
	},
	{
		input: '----SaleOrderID-----',
		output: {
			lower: 'sale order id',
			sentence: 'Sale order ID',
			title: 'Sale Order ID',
			upper: 'SALE ORDER ID',
		},
	},
	{
		/* cSpell: disable-next-line  */
		input: 'someSMVelse',
		output: {
			lower: 'some smv else',
			sentence: 'Some SMV else',
			title: 'Some SMV Else',
			upper: 'SOME SMV ELSE',
		},
	},
];

describe.each(tests)('test humanizeToken helper', ({ input, output }) => {
	it(`should return ${output.title} for humanizeToken(${input})`, () => {
		const response = humanizeToken(input);
		expect(response).toStrictEqual(output.title);
	});
	it.each(humanizeCases)(
		'should return humanized string by the given casing',
		(casing) => {
			const response = humanizeToken(input, casing);
			expect(response).toStrictEqual(output[casing]);
		},
	);
});
