import { binaryPal } from './binary-pal';

type Test = {
	input: number;
	output: boolean;
};

const tests: Test[] = [
	{
		input: 5,
		output: true,
	},
	{
		input: 10,
		output: false,
	},
	{
		input: 23,
		output: false,
	},
	{
		input: 152,
		output: false,
	},
	{
		input: -250,
		output: false,
	},
];

test.each(tests)(
	'should return if the binary of number is palindrome',
	({ input, output }) => {
		const response = binaryPal(input);
		expect(response).toStrictEqual(output);
	}
);
