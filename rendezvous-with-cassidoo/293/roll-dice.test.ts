import { rollDice } from './roll-dice';

interface Test {
	input: string;
	output: number;
}

const TESTS: Test[] = [
	{
		input: '4d4',
		output: 13,
	},
	{
		input: '3d20',
		output: 28,
	},
	{
		input: '1d8+2d10',
		output: 21,
	},
];

test.each(TESTS)(
	'should return the result of die roll',
	({ input, output }) => {
		const response = rollDice(input);
		expect(response).toStrictEqual(output);
	}
);
