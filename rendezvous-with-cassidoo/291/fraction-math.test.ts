import { fractionMath } from './fraction-math';

interface Test {
	args: Parameters<typeof fractionMath>;
	output: Parameters<typeof fractionMath>[0];
}

const TESTS: Test[] = [
	{
		args: ['3/4', 'add', '3/4'],
		output: '3/2',
	},
	{
		args: ['1/8', 'multiply', '2/2'],
		output: '1/8',
	},
];

test.each(TESTS)(
	'should return the resulting fraction in the simplest form',
	({ args, output }) => {
		const response = fractionMath(...args);
		expect(response).toStrictEqual(output);
	}
);
