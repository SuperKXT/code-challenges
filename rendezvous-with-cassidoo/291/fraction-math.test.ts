import { fractionMath } from './fraction-math.js';

type Test = {
	args: Parameters<typeof fractionMath>;
	output: Parameters<typeof fractionMath>[0];
};

const TESTS: Test[] = [
	{
		args: ['3/4', 'add', '3/4'],
		output: '3/2',
	},
	{
		args: ['3/4', 'subtract', '3/4'],
		output: '0/16',
	},
	{
		args: ['3/4', 'multiply', '3/4'],
		output: '9/16',
	},
	{
		args: ['3/4', 'divide', '3/4'],
		output: '1/1',
	},
	{
		args: ['1/8', 'add', '2/2'],
		output: '9/8',
	},
	{
		args: ['1/8', 'subtract', '2/2'],
		output: '-7/8',
	},
	{
		args: ['1/8', 'multiply', '2/2'],
		output: '1/8',
	},
	{
		args: ['1/8', 'divide', '2/2'],
		output: '1/8',
	},
];

test.each(TESTS)(
	'should return the resulting fraction in the simplest form',
	({ args, output }) => {
		const response = fractionMath(...args);
		expect(response).toStrictEqual(output);
	},
);
