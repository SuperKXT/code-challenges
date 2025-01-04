import { oddSquareNumbers } from "./odd-square-sum.js";

type Test = {
	input: number;
	output: number;
};

const tests: Test[] = [
	{
		input: 1,
		output: 0,
	},
	{
		input: 2,
		output: 1,
	},
	{
		input: 44,
		output: 35,
	},
	{
		input: 250,
		output: 680,
	},
	{
		input: -250,
		output: 0,
	},
];

test.each(tests)(
	"should return the sum of odd squares",
	({ input, output }) => {
		const response = oddSquareNumbers(input);
		expect(response).toStrictEqual(output);
	},
);
