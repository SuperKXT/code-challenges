import { getOrdinalNumber } from './get-ordinal-number';

import type { OrdinalNumber } from './get-ordinal-number';

type Test = {
	input: number;
	output: OrdinalNumber;
};

const TESTS: Test[] = [
	{ input: 0, output: '0th' },
	{ input: 1, output: '1st' },
	{ input: 2, output: '2nd' },
	{ input: 3, output: '3rd' },
	{ input: 4, output: '4th' },
	{ input: 11, output: '11th' },
	{ input: 12, output: '12th' },
	{ input: 13, output: '13th' },
	{ input: 4001, output: '4001st' },
	{ input: 542122, output: '542122nd' },
	{ input: 423, output: '423rd' },
	{ input: 1049, output: '1049th' },
];

test.each(TESTS)('testing getOrdinalNumber', ({ input, output }) => {
	const response = getOrdinalNumber(input);
	expect(response).toStrictEqual(output);
});
