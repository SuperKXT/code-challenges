import { replaceZeros } from './replace-zeros.js';

type Test = {
	input: string;
	output: string;
};

const TESTS: Test[] = [
	{ input: '1234500362000440', output: '1234523623441' },
	{ input: '123450036200044', output: '123452362344' },
	{ input: '000000000000', output: '12' },
	{ input: '123456789', output: '123456789' },
	{ input: '', output: '' },
	{ input: '33032420000', output: '33132424' },
];

test.each(TESTS)('testing replaceZeros', ({ input, output }) => {
	expect(replaceZeros(input)).toStrictEqual(output);
});
